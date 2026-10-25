import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { Client, GatewayIntentBits } from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const required = [
  'SESSION_SECRET',
  'DISCORD_CLIENT_ID',
  'DISCORD_CLIENT_SECRET',
  'DISCORD_REDIRECT_URI',
  'DISCORD_BOT_TOKEN',
  'DISCORD_GUILD_ID'
];

for (const key of required) {
  if (!process.env[key] || process.env[key].startsWith('replace-with-')) {
    throw new Error(`Missing configuration: ${key}. Copy .env.example to .env and set a real value.`);
  }
}

const port = Number(process.env.PORT || 3000);
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
const app = express();

if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

app.use(session({
  name: 'three-eck.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 12
  }
}));

function isDiscordUserId(value) {
  return /^\d{17,20}$/.test(String(value));
}

function isSafeReturnPath(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//');
}

function discordAuthorizeUrl(state) {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify',
    state
  });
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

async function exchangeDiscordCode(code) {
  const body = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI
  });

  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
  if (!tokenResponse.ok) throw new Error('Discord token exchange failed');
  const token = await tokenResponse.json();

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `${token.token_type} ${token.access_token}` }
  });
  if (!userResponse.ok) throw new Error('Discord user lookup failed');
  return userResponse.json();
}

async function isCurrentGuildMember(discordUserId) {
  try {
    const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID);
    await guild.members.fetch(discordUserId);
    return true;
  } catch {
    return false;
  }
}

async function requireGuildMembership(request, response, next) {
  const discordUserId = request.session.discordUserId;
  if (!discordUserId || !(await isCurrentGuildMember(discordUserId))) {
    request.session.destroy(() => response.redirect('/'));
    return;
  }
  request.discordUserId = discordUserId;
  next();
}

app.get('/', (_request, response) => response.sendFile(path.join(publicDir, 'index.html')));
app.get('/health', (_request, response) => response.json({
  status: 'ok',
  discordReady: client.isReady(),
  accessType: 'discord-server-membership'
}));

app.get('/auth/discord', (request, response) => {
  const state = crypto.randomBytes(32).toString('hex');
  request.session.discordOAuthState = state;
  request.session.returnTo = isSafeReturnPath(request.query.returnTo) ? request.query.returnTo : '/app';
  response.redirect(discordAuthorizeUrl(state));
});

app.get('/auth/discord/callback', async (request, response, next) => {
  try {
    const { code, state, error } = request.query;
    if (error || !code || !state || state !== request.session.discordOAuthState) {
      return response.redirect('/?login=failed');
    }

    const user = await exchangeDiscordCode(String(code));
    if (!isDiscordUserId(user.id) || !(await isCurrentGuildMember(user.id))) {
      return response.redirect('/?login=not-member');
    }

    const returnTo = request.session.returnTo || '/app';
    request.session.regenerate((sessionError) => {
      if (sessionError) return next(sessionError);
      // Store only the technical Discord ID required for membership checks.
      request.session.discordUserId = user.id;
      response.redirect(returnTo);
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/session/logout', (request, response) => {
  request.session.destroy(() => response.clearCookie('three-eck.sid').redirect('/'));
});

app.get('/api/session', requireGuildMembership, (request, response) => {
  response.json({ authenticated: true, access: 'discord-server-member' });
});

app.get('/app', requireGuildMembership, (_request, response) => response.sendFile(path.join(publicDir, 'ctrl.html')));
app.get('/app/:file', requireGuildMembership, (request, response) => {
  const allowedFiles = new Set([
    '2T.html', '756.html', 'bio.tel.html', 'ctrl.html', 'etage.html',
    'o.i.o.html', 'rad.Swap.3.x.756.html', 'soll.html', 'soll.js', 'ui.html'
  ]);
  if (!allowedFiles.has(request.params.file)) return response.status(404).end();
  response.sendFile(path.join(publicDir, request.params.file));
});

const protectedPublicFiles = new Set([
  '2T.html', '756.html', 'bio.tel.html', 'ctrl.html', 'etage.html',
  'o.i.o.html', 'rad.Swap.3.x.756.html', 'soll.html', 'soll.js', 'ui.html'
]);

app.use((request, response, next) => {
  if (protectedPublicFiles.has(path.basename(request.path))) return response.redirect('/');
  return express.static(publicDir, { index: false })(request, response, next);
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).send('Der Zugang konnte nicht geprüft werden. Bitte später erneut versuchen.');
});

await client.login(process.env.DISCORD_BOT_TOKEN);
await new Promise((resolve) => client.once('ready', resolve));
app.listen(port, () => console.log(`3.eck membership access service listening on port ${port}`));
