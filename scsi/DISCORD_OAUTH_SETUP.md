# 3.eck: finaler Discord-OAuth-, Alpha-Tester- und Consent-Flow

## Nutzerfluss

1. Die öffentliche Landingpage liegt unter `/` und zeigt den Einstieg **Mit Discord anmelden**.
2. `/auth/discord` leitet zum offiziellen Discord-Login weiter.
3. Discord ruft nach Zustimmung exakt die konfigurierte Callback-Adresse `/auth/discord/callback` auf.
4. Der Server prüft den OAuth-State, tauscht den Code ausschließlich serverseitig gegen ein Token und liest nur die Discord-Nutzer-ID und den Anzeigenamen aus.
5. Der Server prüft, ob der Nutzer als Alpha-Tester registriert ist und die Rolle **Alpha-Tester** auf deinem Discord-Server besitzt.
6. Berechtigte Nutzer landen bei `/app/gate` im HOME BIOS.
7. Erst bei `ICH = JA` und `DU = JA` speichert der Server die Einwilligung in der Session und erlaubt `/app`.
8. Bei Logout, fehlender Rolle oder fehlender Einwilligung bleibt die App gesperrt.

## Discord Developer Portal

1. Öffne deine Discord Application und gehe zu **OAuth2**.
2. Hinterlege unter **Redirects** exakt die Adresse aus `DISCORD_REDIRECT_URI`.
   - Lokal: `http://localhost:3000/auth/discord/callback`
   - Produktion: `https://DEINE-DOMAIN/auth/discord/callback`
3. Kopiere Client-ID und Client-Secret nur in deine lokale `.env` oder in die Geheimnisverwaltung des Hosters.
4. Der Bot muss auf deinem Server sein, **Rollen verwalten** dürfen und in der Rollenliste oberhalb von **Alpha-Tester** stehen.

## `.env` einrichten

Kopiere `.env.example` nach `.env` und trage eigene Werte ein. Alle Geheimnisse bleiben privat.

- `SESSION_SECRET` und `ACTIVATION_SECRET`: zwei unterschiedliche, lange Zufallswerte
- `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`: aus deiner Discord Application
- `DISCORD_REDIRECT_URI`: exakt gleich wie im Discord-Portal
- `DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID`, `DISCORD_ALPHA_TESTER_ROLE_ID`: Bot- und Serverkonfiguration

## Landingpage-Button

Füge in `public/index.html` einen Link ein:

```html
<a href="/auth/discord?returnTo=/app/gate">Mit Discord anmelden</a>
```

## Produktion

- Stelle die App ausschließlich über HTTPS bereit und setze `NODE_ENV=production`.
- Nutze bei mehreren Instanzen oder Neustarts einen persistenten Session-Store und eine Datenbank statt des Standardspeichers von `express-session` und der lokalen JSON-Datei.
- Begrenze administrative Endpunkte durch Rate Limits, Protokollierung und einen separaten Admin-Authentifizierungsweg.
- Die vorhandene Route `POST /api/session/discord` ist nur als interne, geheimnisgeschützte Verwaltungsbrücke vorgesehen. Nutzer melden sich über `/auth/discord` an.

## Abnahmetest

1. Ohne Session `/app` öffnen: Weiterleitung zur Landingpage.
2. Discord-Login mit nicht registriertem Konto: Rückkehr mit `?login=not-eligible`.
3. Discord-Login mit Alpha-Tester: Weiterleitung zu `/app/gate`.
4. Gate ohne beide JA: `/app` führt zurück zum Gate.
5. Beide JA setzen: Button **3.eck öffnen** erscheint; `/app` lädt.
6. Logout aufrufen: geschützte Routen sind wieder gesperrt.
