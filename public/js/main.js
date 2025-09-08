import { TiltBallGame } from './game.js';

const game = new TiltBallGame();
window.game = game; // for global access like nextLevel()

// Optional: bind global buttons
window.nextLevel = () => game.nextLevel();
