/**
 * CHIIKAWA RUNNER - Character Select Script
 * Handles character selection and navigation to game
 */

// Character data
const CHARACTERS = {
    usagi: {
        name: 'USAGI',
        emoji: '🐰',
        coin: '🥕',
        coinName: 'wortel',
        color: '#FFB8D0'
    },
    hachiware: {
        name: 'HACHIWARE',
        emoji: '🐱',
        coin: '🐟',
        coinName: 'ikan',
        color: '#B8E0D2'
    },
    chiikawa: {
        name: 'CHIIKAWA',
        emoji: '🍙',
        coin: '🍙',
        coinName: 'onigiri',
        color: '#FFF8E7'
    }
};

let selectedCharacter = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio system
    if (typeof audioSystem !== 'undefined') {
        audioSystem.init();
    }
    
    // Initialize elements
    const backBtn = document.getElementById('backBtn');
    const characterCards = document.querySelectorAll('.character-card');
    const selectedText = document.getElementById('selectedText');
    
    // Back button
    backBtn.addEventListener('click', () => {
        navigateToHome();
    });
    
    // Character card selection
    characterCards.forEach(card => {
        card.addEventListener('click', () => {
            const character = card.dataset.character;
            selectCharacter(character, card);
        });
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            if (!selectedCharacter) {
                const character = card.dataset.character;
                selectedText.textContent = `${CHARACTERS[character].name} - Klik lagi untuk memilih!`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!selectedCharacter) {
                selectedText.textContent = 'Klik karakter untuk memilih';
            }
        });
    });
});

/**
 * Select a character
 */
function selectCharacter(character, cardElement) {
    const selectedText = document.getElementById('selectedText');
    const allCards = document.querySelectorAll('.character-card');
    
    // Remove previous selection
    allCards.forEach(c => c.classList.remove('selected'));
    
    // Add selection to clicked card
    cardElement.classList.add('selected');
    selectedCharacter = character;
    
    // Update text
    const charData = CHARACTERS[character];
    selectedText.innerHTML = `Kamu memilih <span style="color: ${charData.color}; font-weight: 900;">${charData.name}</span>! <br><small>Memuat game...</small>`;
    
    // Save to session storage
    sessionStorage.setItem('selectedCharacter', character);
    sessionStorage.setItem('characterData', JSON.stringify(charData));
    
    // Play selection sound effect
    playSelectSound();
    
    // Navigate to game after short delay
    setTimeout(() => {
        navigateToGame();
    }, 1000);
}

/**
 * Play selection sound
 */
function playSelectSound() {
    if (typeof audioSystem !== 'undefined' && audioSystem.isInitialized) {
        // Play a happy coin sound
        audioSystem.playCoin();
    }
}

/**
 * Navigate to home page
 */
function navigateToHome() {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 300);
}

/**
 * Navigate to game page
 */
function navigateToGame() {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        window.location.href = 'game.html';
    }, 300);
}
