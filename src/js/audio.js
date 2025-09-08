export function playSound(type, settings) {
  if (!settings.sound) return;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  let frequency = 440;
  let duration = 0.1;

  switch (type) {
    case 'collision':
      frequency = 200;
      duration = 0.1;
      break;
    case 'success':
      frequency = 800;
      duration = 0.3;
      break;
    case 'start':
      frequency = 500;
      duration = 0.2;
      break;
  }

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

export function hapticFeedback(duration = 50, settings) {
  if (!settings.haptic) return;
  if (navigator.vibrate) navigator.vibrate(duration);
}
