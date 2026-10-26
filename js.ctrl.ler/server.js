# im Ordner mit index.html, mainboard.html, server.js etc.
npm install
npm run patch    # injiziert <script src="mainboard-hook.js" defer> in mainboard.html
npm start

# dann:
http://127.0.0.1:5500/mainboard.html
# unten rechts siehst du goldene Ω Panel
