export function saveGame(data) {
  const saveData = {
    level: data.level,
    score: data.score,
    achievements: data.achievements,
    timestamp: Date.now()
  };
  localStorage.setItem('tiltSphereSave', JSON.stringify(saveData));

  const indicator = document.getElementById('saveIndicator');
  if (indicator) {
    indicator.classList.add('show');
    setTimeout(() => indicator.classList.remove('show'), 2000);
  }

  const status = document.getElementById('saveStatus');
  if (status) {
    status.textContent = `Last saved: ${new Date().toLocaleTimeString()}`;
  }
}

export function loadGame() {
  const raw = localStorage.getItem('tiltSphereSave');
  if (!raw) return null;

  try {
    const data = JSON.parse(raw);
    const status = document.getElementById('saveStatus');
    if (status) {
      const saveTime = new Date(data.timestamp).toLocaleString();
      status.textContent = `Loaded save from: ${saveTime}`;
    }
    return data;
  } catch (err) {
    console.error('Failed to load save data:', err);
    return null;
  }
}

export function saveSettings(settings) {
  localStorage.setItem('tiltSphereSettings', JSON.stringify(settings));
}

export function loadSettings() {
  const raw = localStorage.getItem('tiltSphereSettings');
  return raw ? JSON.parse(raw) : null;
}
