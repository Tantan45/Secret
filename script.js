const scene = document.querySelector('#cake-scene');
const wishButton = document.querySelector('#wish-button');
const gravityButton = document.querySelector('#gravity-button');
const dialog = document.querySelector('#wish-dialog');
const confetti = document.querySelector('#confetti');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const birthdayMusic = document.querySelector('#birthday-music');
birthdayMusic.volume = 0.45;

function sprinkleConfetti() {
  if (reducedMotion.matches) return;
  confetti.replaceChildren();
  const colors = ['#bc6575', '#d5ae7f', '#e9b9bb', '#9ba58c', '#e6d3b4'];
  const pieces = document.createDocumentFragment();
  for (let i = 0; i < 85; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.setProperty('--x', `${Math.random() * 100}%`);
    piece.style.setProperty('--size', `${4 + Math.random() * 5}px`);
    piece.style.setProperty('--color', colors[i % colors.length]);
    piece.style.setProperty('--duration', `${3 + Math.random() * 2}s`);
    piece.style.setProperty('--delay', `${Math.random() * 0.8}s`);
    piece.style.setProperty('--drift', `${Math.random() * 200 - 100}px`);
    piece.style.setProperty('--spin', `${Math.random() * 1080 - 540}deg`);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
    pieces.append(piece);
  }
  confetti.append(pieces);
}

wishButton.addEventListener('click', () => {
  scene.classList.add('candles-out');
  dialog.showModal();
  sprinkleConfetti();
});

document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  scene.classList.remove('candles-out');
  wishButton.focus();
});
document.querySelector('#celebrate-again').addEventListener('click', () => {
  dialog.close();
  sprinkleConfetti();
});

gravityButton.addEventListener('click', () => {
  const grounded = scene.classList.toggle('grounded');
  gravityButton.setAttribute('aria-pressed', String(!grounded));
  gravityButton.querySelector('span:nth-child(2)').textContent = `Gravity: ${grounded ? 'on' : 'off'}`;
  document.querySelector('.cake-caption').textContent = grounded ? 'Back to earth. Still a little magical.' : '100% sweetness. 0% gravity.';
});

// Audible autoplay may need a user gesture. Any tap or keypress can start it.
const musicGestures = ['click', 'pointerup', 'keydown'];

function waitForMusicGesture() {
  for (const eventName of musicGestures) {
    document.addEventListener(eventName, startMusic, { passive: true });
  }
}

function stopWaitingForMusicGesture() {
  for (const eventName of musicGestures) {
    document.removeEventListener(eventName, startMusic);
  }
}

async function startMusic() {
  if (document.hidden || !birthdayMusic.paused) return;
  try {
    await birthdayMusic.play();
    if (document.hidden) birthdayMusic.pause();
    else stopWaitingForMusicGesture();
  } catch (error) {
    if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
      waitForMusicGesture();
    } else {
      stopWaitingForMusicGesture();
      console.warn('Birthday music could not play:', error);
    }
  }
}

birthdayMusic.addEventListener('playing', () => {
  if (document.hidden) birthdayMusic.pause();
  else stopWaitingForMusicGesture();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) birthdayMusic.pause();
  else startMusic();
});

waitForMusicGesture();
startMusic();
