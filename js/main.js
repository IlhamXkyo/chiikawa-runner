/**
 * CHIIKAWA RUNNER - Main Page Script
 * Handles main menu, music, and navigation
 */

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const playBtn = document.getElementById('playBtn');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const highScoreDisplay = document.getElementById('highScoreDisplay');
    
    // Initialize audio system
    if (typeof audioSystem !== 'undefined') {
        audioSystem.init();
    }
    
    // Load high score
    loadHighScore();
    
    // Play button click
    playBtn.addEventListener('click', async () => {
        // Initialize and play music
        if (typeof audioSystem !== 'undefined') {
            audioSystem.init();
            audioSystem.resume();
            audioSystem.startMusic();
        }
        
        // Navigate to character select
        navigateToSelect();
    });
    
    // Music toggle
    musicToggle.addEventListener('click', () => {
        if (typeof audioSystem !== 'undefined') {
            audioSystem.init();
            const isMuted = audioSystem.toggleMute();
            updateMusicIcon(isMuted);
        }
    });
    
    // Try to autoplay music on first interaction
    document.addEventListener('click', () => {
        if (typeof audioSystem !== 'undefined' && !audioSystem.isInitialized) {
            audioSystem.init();
            audioSystem.resume();
            audioSystem.startMusic();
        }
    }, { once: true });
});

/**
 * Update music icon based on state
 */
function updateMusicIcon(isMuted) {
    const musicIcon = document.getElementById('musicIcon');
    const musicToggle = document.getElementById('musicToggle');
    
    if (musicIcon) {
        musicIcon.textContent = isMuted ? '🔇' : '🎵';
    }
    if (musicToggle) {
        musicToggle.classList.toggle('muted', isMuted);
    }
}

/**
 * Load high score from localStorage
 */
function loadHighScore() {
    const highScoreDisplay = document.getElementById('highScoreDisplay');
    const highScore = localStorage.getItem('chiikawaHighScore') || '0';
    
    if (highScoreDisplay) {
        highScoreDisplay.textContent = highScore;
    }
}

/**
 * Navigate to character select page
 */
function navigateToSelect() {
    // Add transition effect
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'select.html';
    }, 300);
}

/**
 * Get high score
 */
function getHighScore() {
    return parseInt(localStorage.getItem('chiikawaHighScore') || '0');
}

/**
 * Set high score
 */
function setHighScore(score) {
    const currentHigh = getHighScore();
    if (score > currentHigh) {
        localStorage.setItem('chiikawaHighScore', score.toString());
        return true; // New record
    }
    return false;
}
