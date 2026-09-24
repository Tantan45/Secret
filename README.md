# A little celebration for Ninya

Open **index.html** in a browser to see the website. No installation or build step is needed.

- `index.html` — birthday message and original SVG cake illustration.
- `styles.css` — responsive design and anti-gravity cake animations.
- `script.js` — wish dialog, confetti, gravity switch, and background music controls.

The cake is drawn in HTML with inline SVG and animated with CSS. JavaScript powers the interactive controls. Google Fonts is optional; the page uses local fallback fonts without an internet connection. The site respects the system's reduced-motion preference.

The provided birthday song is included at `birthday-music.mp3`, beside `index.html`. Tap the pictured Make a wish button to start the music and open the birthday message. Music loops after that tap, pauses when switching away, and resumes when returning. It does not start on page load or from unrelated clicks. Local audio works offline and when opening `index.html` directly.

For a local preview server, run `python -m http.server 4173` from this folder and open http://localhost:4173.
