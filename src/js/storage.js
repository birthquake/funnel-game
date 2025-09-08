export function saveGame(data) {
  localStorage.setItem('tiltSphereSave', JSON.stringify(data));
}

export function loadGame() {
  const raw = localStorage.getItem('tiltSphereSave');
  return raw ? JSON.parse(raw) : null;
}
