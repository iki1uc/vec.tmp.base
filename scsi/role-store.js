import fs from 'node:fs/promises';
import path from 'node:path';

const storePath = path.resolve(process.cwd(), 'alpha-testers.json');

async function readStore() {
  try {
    return JSON.parse(await fs.readFile(storePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return {};
    throw error;
  }
}

async function writeStore(data) {
  const temporaryPath = `${storePath}.tmp`;
  await fs.writeFile(temporaryPath, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(temporaryPath, storePath);
}

export async function registerAlphaTester(discordUserId) {
  const store = await readStore();
  const registeredAt = store[discordUserId]?.registeredAt ?? Date.now();
  store[discordUserId] = { registeredAt };
  await writeStore(store);
  return store[discordUserId];
}

export async function unregisterAlphaTester(discordUserId) {
  const store = await readStore();
  delete store[discordUserId];
  await writeStore(store);
}

export async function getAlphaTester(discordUserId) {
  const store = await readStore();
  return store[discordUserId] ?? null;
}
