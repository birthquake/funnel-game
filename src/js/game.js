import { playSound, hapticFeedback } from './audio.js';
import { saveGame, loadGame, saveSettings } from './storage.js';

export class TiltBallGame {
    constructor() {
        this.ball = document.getElementById('ball');
        this.funnel = document.getElementById('funnel');
        this.gameContainer = document.getElementById('gameContainer');
        this.startButton = document.getElementById('startButton');

        this.ballX = 165;
        this.ballY = 165;
        this.ballVelX = 0;
        this.ballVelY = 0;
        this.friction = 0.95;
        this.sensitivity = 0.5;

        this.level = 1;
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('tiltSphereBest') || '0');
        this.gameRunning = false;
        this.gamePaused = false;
        this.obstacles = [];
        this.particles = [];
        this.ballTrail = [];
        this.timeLeft = 0;
        this.timerInterval = null;
        this.achievements = JSON.parse(localStorage.getItem('tiltSphereAchievements') || '[]');

        this.settings = {
            sound: false,
            haptic: true,
            trail: true,
            sensitivity: 50
        };

        const savedSettings = localStorage.getItem('tiltSphereSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }

        this.containerWidth = 350;
        this.containerHeight = 350;
        this.ballSize = 20;

        this.levelConfigs = this.generateLevelConfigs();

        this.setupLevel();
        this.updateUI();
        this.loadGame();
        this.applySettings();

        this.startButton.addEventListener('click', () => this.requestPermission());

        let lastTap = 0;
        this.gameContainer.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 500 && tapLength > 0) {
                if (this.gameRunning && !this.gamePaused) {
                    this.pauseGame();
                }
            }
            lastTap = currentTime;
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.gameRunning && !this.gamePaused) {
                this.pauseGame();
            }
        });

        window.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    generateLevelConfigs() {
        const configs = [];
        for (let i = 1; i <= 100; i++) {
            const difficulty = i <= 20 ? 'easy' :
                               i <= 40 ? 'medium' :
                               i <= 60 ? 'hard' :
                               i <= 80 ? 'expert' : 'legendary';
            configs.push({
                funnelSize: Math.max(60 - i * 0.5, 8),
                obstacles: Math.min(Math.floor(i / 3), 20),
                timeLimit: i > 25 ? Math.max(60 - (i - 25) * 1.5, 10) : 0,
                movingObstacles: Math.min(Math.floor(i / 5), 8),
                ballSpeed: 1 + (i * 0.03),
                difficulty,
                specialMechanic: ['rotating', 'maze', 'teleport', 'shrinking', 'chaos'][i % 5]
            });
        }
        return configs;
    }

    requestPermission() {
        if (!localStorage.getItem('tiltSphereTutorialSeen')) {
            this.showTutorial();
            return;
        }

        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permission => {
                    if (permission === 'granted') this.startGame();
                })
                .catch(() => this.startGame());
        } else {
            this.startGame();
        }
    }

    showTutorial() {
        document.getElementById('tutorialOverlay').style.display = 'block';
    }

    closeTutorial() {
        document.getElementById('tutorialOverlay').style.display = 'none';
        localStorage.setItem('tiltSphereTutorialSeen', 'true');
        this.requestPermission();
    }

    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.startButton.style.display = 'none';
        document.getElementById('menuButtons').style.display = 'flex';

        window.addEventListener('deviceorientation', (e) => this.handleOrientation(e));

        this.gameLoop();
        this.startTimer();
        playSound('start', this.settings);
    }

    pauseGame() {
        if (!this.gameRunning) return;
        this.gamePaused = true;
        clearInterval(this.timerInterval);
        document.getElementById('pauseOverlay').style.display = 'block';
    }

    resumeGame() {
        this.gamePaused = false;
        document.getElementById('pauseOverlay').style.display = 'none';
        this.startTimer();
    }

    restartLevel() {
        this.gamePaused = false;
        document.getElementById('pauseOverlay').style.display = 'none';
        this.setupLevel();
        this.startTimer();
    }

    handleOrientation(event) {
        if (!this.gameRunning || this.gamePaused) return;
        const gamma = event.gamma || 0;
        const beta = event.beta || 0;
        const config = this.getCurrentConfig();
        const sensitivity = (this.settings.sensitivity / 100) * this.sensitivity * config.ballSpeed;
        this.ballVelX += gamma * sensitivity * 0.1;
        this.ballVelY += beta * sensitivity * 0.1;
    }

    handleKeyboard(event) {
        if (!this.gameRunning || this.gamePaused) return;
        const config = this.getCurrentConfig();
        const force = (this.settings.sensitivity / 100) * 0.5 * config.ballSpeed;
        switch(event.key) {
            case 'ArrowLeft': this.ballVelX -= force; break;
            case 'ArrowRight': this.ballVelX += force; break;
            case 'ArrowUp': this.ballVelY -= force; break;
            case 'ArrowDown': this.ballVelY += force; break;
            case ' ':
                event.preventDefault();
                this.gamePaused ? this.resumeGame() : this.pauseGame();
                break;
        }
    }

    getCurrentConfig() {
        return this.levelConfigs[Math.min(this.level - 1, this.levelConfigs.length - 1)];
    }

    // ... Add all remaining methods from your original TiltBallGame class here:
    // setupLevel(), addObstacles(), createObstacle(), clearObstacles(), clearParticles(),
    // gameLoop(), checkObstacleCollision(), checkFunnelCollision(), levelComplete(),
    // nextLevel(), endGame(), gameOver(), restart(), startTimer(), updateTimer(),
    // createParticles(), updateBallTrail(), updateDifficultyBadge(), showScorePopup(),
    // toggleSettings(), toggleSound(), toggleHaptic(), toggleTrail(), setSensitivity(),
    // applySettings(), saveGame(), loadGame(), resetProgress(), checkAchievements(),
    // updateAchievementDisplay(), updateUI()

    // You can paste them directly below this constructor block.
}
