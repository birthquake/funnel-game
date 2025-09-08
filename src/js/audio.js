export function playSound(type, settings) {
  if (!settings.sound) return;
  // Web Audio logic here...
}

export function hapticFeedback(duration = 50, settings) {
  if (!settings.haptic) return;
  if (navigator.vibrate) navigator.vibrate(duration);
}
