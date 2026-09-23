/**
 * CHIIKAWA RUNNER - Game Engine
 * Subway Surfers style endless runner with Chiikawa theme
 */

// ========================================
// GAME CONSTANTS & CONFIG
// ========================================
const CONFIG = {
    LANES: 3,
    LANE_WIDTH: 0, // Calculated at runtime
    BASE_SPEED: 8,
    MAX_SPEED: 20,
    SPEED_INCREMENT: 0.001,
    JUMP_HEIGHT: 150,
    JUMP_DURATION: 600,
    DUCK_DURATION: 800,
    SPAWN_RATE: 120, // Frames between spawns
    COIN_SPAWN_RATE: 60,
    GRAVITY: 0.8,
    FPS: 60
};

// Game State
const STATE = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
};

// Lane positions (0 = left, 1 = center, 2 = right)
const LANES = [0, 1, 2];

// ========================================
// GAME VARIABLES
// ========================================
let canvas, ctx;
let gameState = STATE.MENU;
let frameCount = 0;
let score = 0;
let coins = 0;
let gameSpeed = CONFIG.BASE_SPEED;
let animationId = null;
let lastTime = 0;

// Player
let player = {
    lane: 1, // Center lane
    x: 0,
    y: 0,
    z: 0, // For jump/duck
    isJumping: false,
    isDucking: false,
    jumpStartTime: 0,
    duckStartTime: 0,
    character: null,
    width: 60,
    height: 80
};

// Game Objects
let obstacles = [];
let coinItems = [];
let particles = [];
let backgroundOffset = 0;

// Input
let keys = {};
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    // Get canvas
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Load character
    loadCharacter();
    
    // Initialize audio system
    if (typeof audioSystem !== 'undefined') {
        audioSystem.init();
    }
    
    // Setup controls
    setupControls();
    
    // Setup UI
    setupUI();
    
    // Start game loop
    gameLoop(0);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    CONFIG.LANE_WIDTH = canvas.width / CONFIG.LANES;
    
    // Update player position
    if (player) {
        player.x = getLaneX(player.lane);
        player.y = canvas.height - 150;
    }
}

function loadCharacter() {
    const characterData = sessionStorage.getItem('characterData');
    if (characterData) {
        player.character = JSON.parse(characterData);
    } else {
        // Default to Chiikawa
        player.character = {
            name: 'CHIIKAWA',
            emoji: '🍙',
            coin: '🍙',
            coinName: 'onigiri',
            color: '#FFF8E7'
        };
    }
    
    // Update coin icon in UI
    const coinIcon = document.getElementById('coinIcon');
    if (coinIcon && player.character) {
        coinIcon.textContent = player.character.coin;
    }
    
    // Update high score
    const highScoreValue = document.getElementById('highScoreValue');
    if (highScoreValue) {
        highScoreValue.textContent = localStorage.getItem('chiikawaHighScore') || '0';
    }
}

function playSound(soundName) {
    if (typeof audioSystem !== 'undefined' && audioSystem.isInitialized) {
        switch(soundName) {
            case 'jump':
                audioSystem.playJump();
                break;
            case 'coin':
                audioSystem.playCoin();
                break;
            case 'hit':
                audioSystem.playHit();
                break;
            case 'gameOver':
                audioSystem.playGameOver();
                break;
        }
    }
}

function playMusic() {
    if (typeof audioSystem !== 'undefined') {
        audioSystem.startMusic();
    }
}

function stopMusic() {
    if (typeof audioSystem !== 'undefined') {
        audioSystem.stopMusic();
    }
}

// ========================================
// CONTROLS
// ========================================
function setupControls() {
    // Keyboard controls
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Touch/Swipe controls
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Prevent default touch behaviors
    document.addEventListener('touchmove', (e) => {
        if (gameState === STATE.PLAYING) {
            e.preventDefault();
        }
    }, { passive: false });
}

function handleKeyDown(e) {
    keys[e.key] = true;
    
    if (gameState === STATE.MENU && e.code === 'Space') {
        startGame();
        return;
    }
    
    if (gameState === STATE.PLAYING) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                moveLane(-1);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                moveLane(1);
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
            case ' ':
                jump();
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                duck();
                break;
        }
    }
    
    if (gameState === STATE.GAME_OVER && e.code === 'Space') {
        restartGame();
    }
}

function handleKeyUp(e) {
    keys[e.key] = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
}

function handleTouchMove(e) {
    e.preventDefault();
}

function handleTouchEnd(e) {
    e.preventDefault();
    
    if (gameState === STATE.MENU) {
        startGame();
        return;
    }
    
    if (gameState !== STATE.PLAYING) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const deltaTime = Date.now() - touchStartTime;
    
    // Minimum swipe distance
    const minSwipe = 50;
    
    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipe) {
            if (deltaX > 0) {
                moveLane(1); // Right
            } else {
                moveLane(-1); // Left
            }
        }
    } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipe) {
            if (deltaY > 0) {
                duck(); // Down
            } else {
                jump(); // Up
            }
        }
    }
}

// ========================================
// UI SETUP
// ========================================
function setupUI() {
    // Pause button
    const pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.addEventListener('click', togglePause);
    
    // Resume button
    const resumeBtn = document.getElementById('resumeBtn');
    resumeBtn.addEventListener('click', togglePause);
    
    // Quit button
    const quitBtn = document.getElementById('quitBtn');
    quitBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Restart button
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', restartGame);
    
    // Home button
    const homeBtn = document.getElementById('homeBtn');
    homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

function togglePause() {
    if (gameState === STATE.PLAYING) {
        gameState = STATE.PAUSED;
        document.getElementById('pauseScreen').classList.remove('hidden');
        stopMusic();
    } else if (gameState === STATE.PAUSED) {
        gameState = STATE.PLAYING;
        document.getElementById('pauseScreen').classList.add('hidden');
        playMusic();
    }
}

// ========================================
// GAME ACTIONS
// ========================================
function moveLane(direction) {
    const newLane = player.lane + direction;
    if (newLane >= 0 && newLane < CONFIG.LANES) {
        player.lane = newLane;
        player.x = getLaneX(player.lane);
        
        // Add lane change particles
        createParticles(player.x, player.y, 5, player.character.color);
    }
}

function jump() {
    if (!player.isJumping && !player.isDucking) {
        player.isJumping = true;
        player.jumpStartTime = Date.now();
        playSound('jump');
        
        // Add jump particles
        createParticles(player.x, player.y + player.height, 8, '#FFFFFF');
    }
}

function duck() {
    if (!player.isDucking && !player.isJumping) {
        player.isDucking = true;
        player.duckStartTime = Date.now();
        playSound('jump');
    }
}

function getLaneX(lane) {
    return (lane * CONFIG.LANE_WIDTH) + (CONFIG.LANE_WIDTH / 2);
}

// ========================================
// GAME LOOP
// ========================================
function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    drawBackground();
    
    // Update and draw based on game state
    switch(gameState) {
        case STATE.PLAYING:
            update(deltaTime);
            draw();
            break;
        case STATE.MENU:
        case STATE.PAUSED:
        case STATE.GAME_OVER:
            // Just draw static game state
            draw();
            break;
    }
    
    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    // Initialize audio on first interaction
    if (typeof audioSystem !== 'undefined') {
        audioSystem.init();
        audioSystem.resume();
    }
    
    gameState = STATE.PLAYING;
    document.getElementById('startScreen').classList.add('hidden');
    
    // Reset game variables
    score = 0;
    coins = 0;
    gameSpeed = CONFIG.BASE_SPEED;
    frameCount = 0;
    obstacles = [];
    coinItems = [];
    particles = [];
    
    // Reset player
    player.lane = 1;
    player.x = getLaneX(1);
    player.y = canvas.height - 150;
    player.isJumping = false;
    player.isDucking = false;
    
    // Update UI
    updateUI();
    
    // Play music
    playMusic();
}

function restartGame() {
    document.getElementById('gameOverScreen').classList.add('hidden');
    startGame();
}

function update(deltaTime) {
    frameCount++;
    
    // Increase speed gradually
    gameSpeed = Math.min(CONFIG.MAX_SPEED, gameSpeed + CONFIG.SPEED_INCREMENT);
    
    // Update score
    score += Math.floor(gameSpeed / 10);
    
    // Update player
    updatePlayer();
    
    // Spawn obstacles
    if (frameCount % Math.floor(CONFIG.SPAWN_RATE / (gameSpeed / CONFIG.BASE_SPEED)) === 0) {
        spawnObstacle();
    }
    
    // Spawn coins
    if (frameCount % Math.floor(CONFIG.COIN_SPAWN_RATE / (gameSpeed / CONFIG.BASE_SPEED)) === 0) {
        spawnCoin();
    }
    
    // Update obstacles
    updateObstacles();
    
    // Update coins
    updateCoins();
    
    // Update particles
    updateParticles();
    
    // Check collisions
    checkCollisions();
    
    // Update UI
    updateUI();
    
    // Update background
    backgroundOffset += gameSpeed;
}

function updatePlayer() {
    const now = Date.now();
    
    // Update jump
    if (player.isJumping) {
        const jumpProgress = (now - player.jumpStartTime) / CONFIG.JUMP_DURATION;
        
        if (jumpProgress >= 1) {
            player.isJumping = false;
            player.z = 0;
        } else {
            // Parabolic jump
            player.z = Math.sin(jumpProgress * Math.PI) * CONFIG.JUMP_HEIGHT;
        }
    }
    
    // Update duck
    if (player.isDucking) {
        const duckProgress = (now - player.duckStartTime) / CONFIG.DUCK_DURATION;
        
        if (duckProgress >= 1) {
            player.isDucking = false;
        }
    }
    
    // Smooth lane transition
    const targetX = getLaneX(player.lane);
    player.x += (targetX - player.x) * 0.2;
}

function spawnObstacle() {
    const lane = Math.floor(Math.random() * CONFIG.LANES);
    const types = ['rakko', 'train', 'barrier'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    obstacles.push({
        x: getLaneX(lane),
        y: -100,
        lane: lane,
        type: type,
        width: 80,
        height: type === 'train' ? 150 : 80,
        passed: false
    });
}

function spawnCoin() {
    const lane = Math.floor(Math.random() * CONFIG.LANES);
    const pattern = Math.random();
    
    if (pattern < 0.33) {
        // Single coin
        coinItems.push({
            x: getLaneX(lane),
            y: -100,
            lane: lane,
            collected: false,
            rotation: 0
        });
    } else if (pattern < 0.66) {
        // Line of coins
        for (let i = 0; i < 3; i++) {
            coinItems.push({
                x: getLaneX(lane),
                y: -100 - (i * 80),
                lane: lane,
                collected: false,
                rotation: 0
            });
        }
    } else {
        // Coins across all lanes
        for (let i = 0; i < CONFIG.LANES; i++) {
            coinItems.push({
                x: getLaneX(i),
                y: -100,
                lane: i,
                collected: false,
                rotation: 0
            });
        }
    }
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += gameSpeed;
        
        // Remove if off screen
        if (obs.y > canvas.height + 200) {
            obstacles.splice(i, 1);
        }
    }
}

function updateCoins() {
    for (let i = coinItems.length - 1; i >= 0; i--) {
        const coin = coinItems[i];
        coin.y += gameSpeed;
        coin.rotation += 0.1;
        
        // Remove if off screen
        if (coin.y > canvas.height + 100) {
            coinItems.splice(i, 1);
        }
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.5; // Gravity
        p.life -= 0.02;
        p.alpha = p.life;
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10 - 5,
            life: 1,
            alpha: 1,
            color: color,
            size: Math.random() * 8 + 4
        });
    }
}

function checkCollisions() {
    const playerHitbox = {
        x: player.x - player.width / 2 + 10,
        y: player.y - player.height + (player.isDucking ? 40 : 0) - player.z,
        width: player.width - 20,
        height: player.isDucking ? player.height - 40 : player.height
    };
    
    // Check obstacle collisions
    for (const obs of obstacles) {
        const obsHitbox = {
            x: obs.x - obs.width / 2 + 10,
            y: obs.y - obs.height / 2 + 10,
            width: obs.width - 20,
            height: obs.height - 20
        };
        
        // Check if player is jumping over obstacle
        const canJumpOver = obs.type !== 'train' && player.z > obs.height - 20;
        
        if (rectIntersect(playerHitbox, obsHitbox) && !canJumpOver) {
            gameOver();
            return;
        }
    }
    
    // Check coin collisions
    for (const coin of coinItems) {
        if (coin.collected) continue;
        
        const coinHitbox = {
            x: coin.x - 25,
            y: coin.y - 25,
            width: 50,
            height: 50
        };
        
        if (rectIntersect(playerHitbox, coinHitbox)) {
            coin.collected = true;
            coins++;
            score += 50;
            playSound('coin');
            createParticles(coin.x, coin.y, 5, '#FFD700');
        }
    }
}

function rectIntersect(r1, r2) {
    return !(r2.x > r1.x + r1.width ||
             r2.x + r2.width < r1.x ||
             r2.y > r1.y + r1.height ||
             r2.y + r2.height < r1.y);
}

function gameOver() {
    gameState = STATE.GAME_OVER;
    playSound('hit');
    setTimeout(() => playSound('gameOver'), 300);
    stopMusic();
    
    // Check high score
    const currentHigh = parseInt(localStorage.getItem('chiikawaHighScore') || '0');
    const totalScore = score + (coins * 50);
    const isNewRecord = totalScore > currentHigh;
    
    if (isNewRecord) {
        localStorage.setItem('chiikawaHighScore', totalScore.toString());
    }
    
    // Show game over screen
    document.getElementById('gameOverScreen').classList.remove('hidden');
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalCoins').textContent = coins;
    document.getElementById('finalTotal').textContent = totalScore;
    
    const newRecordEl = document.getElementById('newRecord');
    if (isNewRecord) {
        newRecordEl.classList.remove('hidden');
    } else {
        newRecordEl.classList.add('hidden');
    }
}

function updateUI() {
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('coinValue').textContent = coins;
}

// ========================================
// RENDERING
// ========================================
function draw() {
    drawTrack();
    drawCoins();
    drawObstacles();
    drawPlayer();
    drawParticles();
}

function drawBackground() {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.5, '#E0F6FF');
    gradient.addColorStop(1, '#FFF8E7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw clouds
    ctx.font = '4rem Arial';
    ctx.textAlign = 'center';
    const cloudOffset = (backgroundOffset * 0.2) % (canvas.width + 200);
    ctx.globalAlpha = 0.6;
    ctx.fillText('☁️', canvas.width - cloudOffset, 100);
    ctx.fillText('☁️', (canvas.width * 0.5) - cloudOffset * 0.7, 150);
    ctx.fillText('☁️', (canvas.width * 0.3) - cloudOffset * 0.5, 80);
    ctx.globalAlpha = 1;
    
    // Draw distant buildings/landscape
    ctx.fillStyle = '#FFB8D040';
    for (let i = 0; i < 5; i++) {
        const x = ((i * 300) - (backgroundOffset * 0.1)) % (canvas.width + 300);
        const drawX = x < -150 ? x + canvas.width + 300 : x;
        ctx.beginPath();
        ctx.arc(drawX, canvas.height - 100, 80, 0, Math.PI, true);
        ctx.fill();
    }
}

function drawTrack() {
    // Track background
    ctx.fillStyle = '#E8D4C4';
    ctx.fillRect(0, canvas.height - 200, canvas.width, 200);
    
    // Lane dividers
    ctx.strokeStyle = '#FFFFFF60';
    ctx.lineWidth = 4;
    ctx.setLineDash([30, 30]);
    
    for (let i = 1; i < CONFIG.LANES; i++) {
        const x = i * CONFIG.LANE_WIDTH;
        const offset = backgroundOffset % 60;
        
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - 200 + offset);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    ctx.setLineDash([]);
    
    // Track borders
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 200);
    ctx.lineTo(canvas.width, canvas.height - 200);
    ctx.stroke();
}

function drawPlayer() {
    if (!player.character) return;
    
    const x = player.x;
    const y = player.y - player.z;
    const scale = player.isDucking ? 0.7 : 1;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(0, player.height / 2 + player.z, 30, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Character emoji
    ctx.font = '5rem Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add bounce animation
    const bounce = Math.sin(frameCount * 0.2) * 5;
    
    // Draw character
    ctx.fillText(player.character.emoji, 0, bounce - 10);
    
    // Jump effect
    if (player.isJumping) {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 60, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    ctx.restore();
}

function drawObstacles() {
    for (const obs of obstacles) {
        ctx.save();
        ctx.translate(obs.x, obs.y);
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.ellipse(0, obs.height / 2, obs.width / 2, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw obstacle based on type
        switch(obs.type) {
            case 'rakko':
                // RAKKO (the otter enemy from Chiikawa)
                ctx.font = '4rem Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('🦦', 0, 0);
                
                // Angry indicator
                ctx.font = '1.5rem Arial';
                ctx.fillText('💢', 20, -30);
                break;
                
            case 'train':
                // Chiikawa-style train
                ctx.fillStyle = '#FFB8D0';
                ctx.fillRect(-obs.width/2, -obs.height/2, obs.width, obs.height);
                
                // Train details
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(-obs.width/2 + 10, -obs.height/2 + 20, obs.width - 20, 30);
                
                // Cute face
                ctx.font = '2rem Arial';
                ctx.textAlign = 'center';
                ctx.fillText('◠‿◠', 0, 0);
                
                // Wheels
                ctx.fillStyle = '#5A4A42';
                ctx.beginPath();
                ctx.arc(-25, obs.height/2 - 10, 15, 0, Math.PI * 2);
                ctx.arc(25, obs.height/2 - 10, 15, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'barrier':
                // Barrier
                ctx.fillStyle = '#FF8FB0';
                ctx.fillRect(-obs.width/2, -obs.height/2, obs.width, obs.height);
                
                // Stripes
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.moveTo(-obs.width/2 + 10, -obs.height/2);
                ctx.lineTo(-obs.width/2 + 30, -obs.height/2);
                ctx.lineTo(-obs.width/2 + 10, obs.height/2);
                ctx.lineTo(-obs.width/2 - 10, obs.height/2);
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(obs.width/2 - 10, -obs.height/2);
                ctx.lineTo(obs.width/2 + 10, -obs.height/2);
                ctx.lineTo(obs.width/2 - 10, obs.height/2);
                ctx.lineTo(obs.width/2 - 30, obs.height/2);
                ctx.fill();
                
                // Warning sign
                ctx.font = '2rem Arial';
                ctx.textAlign = 'center';
                ctx.fillText('⚠️', 0, 0);
                break;
        }
        
        ctx.restore();
    }
}

function drawCoins() {
    for (const coin of coinItems) {
        if (coin.collected) continue;
        
        ctx.save();
        ctx.translate(coin.x, coin.y);
        
        // Rotation effect
        const scaleX = Math.abs(Math.cos(coin.rotation));
        ctx.scale(scaleX, 1);
        
        // Glow
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 20;
        
        // Draw coin
        ctx.font = '3rem Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(player.character ? player.character.coin : '🍙', 0, 0);
        
        ctx.restore();
    }
}

function drawParticles() {
    for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
