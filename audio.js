/* ========================================
   CHIIKAWA RUNNER - MAIN STYLES
   Tema: Pastel Pink, Mint, Cream
   ======================================== */

/* CSS Variables - Chiikawa Pastel Theme */
:root {
    --pink-soft: #FFB8D0;
    --pink-light: #FFD4E5;
    --pink-dark: #FF8FB0;
    --mint-soft: #B8E0D2;
    --mint-light: #D4F0E8;
    --mint-dark: #8ECFB8;
    --cream: #FFF8E7;
    --cream-dark: #F5ECD8;
    --yellow-soft: #FFE4A1;
    --yellow-light: #FFF0C8;
    --lavender: #E8D4F0;
    --white: #FFFFFF;
    --text-dark: #5A4A42;
    --text-light: #8B7B73;
    --shadow-soft: rgba(90, 74, 66, 0.15);
    --shadow-medium: rgba(90, 74, 66, 0.25);
    
    --usagi-color: #FFB8D0;
    --hachiware-color: #B8E0D2;
    --chiikawa-color: #FFF8E7;
    
    --font-main: 'M PLUS Rounded 1c', 'Hiragino Maru Gothic Pro', 'Meiryo', sans-serif;
}

/* Reset & Base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    height: 100%;
    font-family: var(--font-main);
    background: var(--cream);
    color: var(--text-dark);
    overflow-x: hidden;
}

/* ========================================
   MAIN PAGE (INDEX.HTML)
   ======================================== */

.main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: linear-gradient(180deg, var(--pink-light) 0%, var(--cream) 50%, var(--mint-light) 100%);
    overflow: hidden;
}

/* Background Pattern */
.bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(circle at 20% 30%, var(--pink-soft) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, var(--mint-soft) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, var(--yellow-soft) 0%, transparent 40%);
    opacity: 0.6;
    pointer-events: none;
}

/* Floating Clouds */
.floating-clouds {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.cloud {
    position: absolute;
    font-size: 4rem;
    opacity: 0.7;
    animation: float 6s ease-in-out infinite;
}

.cloud-1 { top: 10%; left: 10%; animation-delay: 0s; }
.cloud-2 { top: 20%; right: 15%; animation-delay: 2s; }
.cloud-3 { bottom: 30%; left: 20%; animation-delay: 4s; }

@keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(-10px) translateX(-10px); }
    75% { transform: translateY(-30px) translateX(5px); }
}

/* Content Wrapper */
.content-wrapper {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 2rem;
}

/* Logo Container */
.logo-container {
    margin-bottom: 2rem;
}

.logo-chiikawa {
    font-size: 1.5rem;
    color: var(--pink-dark);
    font-weight: 700;
    letter-spacing: 0.3em;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px var(--shadow-soft);
}

.game-title {
    font-size: 4rem;
    font-weight: 900;
    color: var(--text-dark);
    line-height: 1.1;
    text-shadow: 
        3px 3px 0 var(--white),
        6px 6px 0 var(--pink-soft),
        -2px -2px 0 var(--mint-soft);
    margin-bottom: 0.5rem;
}

.runner-text {
    font-size: 3rem;
    color: var(--pink-dark);
    display: block;
}

.title-decoration {
    font-size: 1.5rem;
    margin-top: 1rem;
}

.title-decoration .star,
.title-decoration .heart {
    display: inline-block;
    animation: twinkle 1.5s ease-in-out infinite;
}

.title-decoration .heart {
    animation-delay: 0.5s;
    font-size: 2rem;
}

@keyframes twinkle {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
}

/* Character Preview */
.character-preview {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
}

.character-float {
    font-size: 4rem;
    animation: bounce 1s ease-in-out infinite;
    filter: drop-shadow(0 5px 10px var(--shadow-soft));
}

.character-float:nth-child(1) { animation-delay: 0s; }
.character-float:nth-child(2) { animation-delay: 0.3s; }
.character-float:nth-child(3) { animation-delay: 0.6s; }

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

/* Play Section */
.play-section {
    margin: 2rem 0;
}

.play-button {
    background: linear-gradient(135deg, var(--pink-soft) 0%, var(--pink-dark) 100%);
    border: none;
    border-radius: 50px;
    padding: 1.5rem 4rem;
    font-family: var(--font-main);
    font-size: 2rem;
    font-weight: 900;
    color: var(--white);
    cursor: pointer;
    box-shadow: 
        0 8px 0 var(--pink-dark),
        0 15px 30px var(--shadow-medium);
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
}

.play-button:hover {
    transform: translateY(-3px);
    box-shadow: 
        0 11px 0 var(--pink-dark),
        0 20px 40px var(--shadow-medium);
}

.play-button:active {
    transform: translateY(5px);
    box-shadow: 
        0 3px 0 var(--pink-dark),
        0 8px 15px var(--shadow-medium);
}

.play-icon {
    font-size: 1.5rem;
}

.instruction-text {
    margin-top: 1rem;
    color: var(--text-light);
    font-size: 1rem;
}

/* High Score Box */
.high-score-box {
    background: var(--white);
    border-radius: 20px;
    padding: 1rem 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 5px 20px var(--shadow-soft);
    margin-top: 1rem;
}

.trophy {
    font-size: 1.5rem;
}

.high-score-label {
    font-weight: 700;
    color: var(--text-light);
    font-size: 0.9rem;
}

.high-score-value {
    font-weight: 900;
    color: var(--pink-dark);
    font-size: 1.5rem;
}

/* Music Control */
.music-control {
    position: fixed;
    bottom: 80px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--white);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    box-shadow: 0 3px 15px var(--shadow-soft);
    z-index: 100;
}

.music-btn {
    background: var(--mint-soft);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.music-btn:hover {
    background: var(--mint-dark);
    transform: scale(1.1);
}

.music-btn.muted {
    background: var(--text-light);
}

.music-label {
    font-size: 0.8rem;
    color: var(--text-light);
}

/* Footer */
.main-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    font-size: 0.8rem;
    color: var(--text-light);
}

/* ========================================
   CHARACTER SELECT PAGE (SELECT.HTML)
   ======================================== */

.select-container {
    min-height: 100vh;
    background: linear-gradient(180deg, var(--mint-light) 0%, var(--cream) 100%);
    padding: 2rem;
    position: relative;
}

.select-header {
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
}

.back-button {
    position: absolute;
    left: 0;
    top: 0;
    background: var(--white);
    border: none;
    border-radius: 25px;
    padding: 0.8rem 1.5rem;
    font-family: var(--font-main);
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-dark);
    cursor: pointer;
    box-shadow: 0 3px 10px var(--shadow-soft);
    transition: all 0.3s ease;
}

.back-button:hover {
    background: var(--pink-light);
    transform: translateX(-5px);
}

.select-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--text-dark);
    text-shadow: 2px 2px 0 var(--white);
}

.select-subtitle {
    color: var(--text-light);
    margin-top: 0.5rem;
}

/* Character Grid */
.character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

/* Character Card */
.character-card {
    background: var(--white);
    border-radius: 30px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 30px var(--shadow-soft);
    position: relative;
    overflow: hidden;
}

.character-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.5) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.character-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 50px var(--shadow-medium);
}

.character-card:hover::before {
    opacity: 1;
}

.character-card.selected {
    border: 4px solid var(--pink-soft);
    transform: scale(1.05);
}

.character-card.selected .character-glow {
    opacity: 1;
}

.card-inner {
    position: relative;
    z-index: 1;
}

/* Character Image Container */
.character-image-container {
    position: relative;
    width: 150px;
    height: 150px;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.character-emoji {
    font-size: 6rem;
    z-index: 2;
    transition: transform 0.3s ease;
}

.character-card:hover .character-emoji {
    transform: scale(1.1) rotate(5deg);
}

.character-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.3;
    transition: opacity 0.3s ease;
}

.usagi-glow { background: radial-gradient(circle, var(--usagi-color) 0%, transparent 70%); }
.hachiware-glow { background: radial-gradient(circle, var(--hachiware-color) 0%, transparent 70%); }
.chiikawa-glow { background: radial-gradient(circle, var(--yellow-soft) 0%, transparent 70%); }

.character-name {
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--text-dark);
    text-align: center;
    margin-bottom: 0.5rem;
}

.character-desc {
    text-align: center;
    color: var(--text-light);
    font-size: 0.95rem;
    margin-bottom: 1rem;
    line-height: 1.5;
}

/* Coin Type */
.coin-type {
    background: var(--cream);
    border-radius: 15px;
    padding: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.coin-icon {
    font-size: 1.5rem;
}

.coin-label {
    font-weight: 700;
    color: var(--text-dark);
    font-size: 0.9rem;
}

/* Character Stats */
.character-stats {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.stat-label {
    font-size: 0.8rem;
    color: var(--text-light);
    min-width: 70px;
}

.stat-bar {
    flex: 1;
    height: 10px;
    background: var(--cream-dark);
    border-radius: 5px;
    overflow: hidden;
}

.stat-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--mint-soft) 0%, var(--mint-dark) 100%);
    border-radius: 5px;
    transition: width 0.5s ease;
}

/* Selected Info */
.selected-info {
    text-align: center;
    margin-top: 2rem;
    padding: 1rem;
}

#selectedText {
    color: var(--text-light);
    font-size: 1.1rem;
    font-weight: 700;
}

/* ========================================
   GAME PAGE (GAME.HTML)
   ======================================== */

.game-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, var(--cream) 100%);
}

#gameCanvas {
    display: block;
    width: 100%;
    height: 100%;
}

/* Game UI */
.game-ui {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    pointer-events: none;
    z-index: 10;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 0.8rem 1.5rem;
    box-shadow: 0 5px 20px var(--shadow-soft);
    backdrop-filter: blur(5px);
}

.score-display, .coin-display, .high-score-display {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.score-label, .hs-label {
    font-size: 0.7rem;
    color: var(--text-light);
    font-weight: 700;
}

.score-value, .coin-value, .hs-value {
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--text-dark);
}

.coin-display {
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
}

.coin-icon-game {
    font-size: 1.5rem;
}

/* Pause Button */
.pause-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;
    background: var(--white);
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 3px 15px var(--shadow-soft);
    transition: all 0.3s ease;
    pointer-events: auto;
}

.pause-button:hover {
    background: var(--pink-light);
    transform: scale(1.1);
}

/* Overlay Screens */
.overlay-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    backdrop-filter: blur(5px);
}

.overlay-screen.hidden {
    display: none;
}

.overlay-content {
    background: linear-gradient(135deg, var(--white) 0%, var(--cream) 100%);
    border-radius: 30px;
    padding: 3rem;
    text-align: center;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

/* Start Screen */
.ready-text {
    font-size: 3rem;
    font-weight: 900;
    color: var(--pink-dark);
    margin-bottom: 1rem;
    text-shadow: 2px 2px 0 var(--white);
}

.start-instruction {
    color: var(--text-light);
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.controls-hint {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
}

.control-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.key {
    background: var(--text-dark);
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1rem;
    min-width: 50px;
}

.control-item span:last-child {
    font-size: 0.8rem;
    color: var(--text-light);
}

/* Pause Screen */
.pause-text {
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--text-dark);
    margin-bottom: 2rem;
}

/* Game Over Screen */
.game-over-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.sad-emoji {
    font-size: 2.5rem;
    animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
}

.game-over-text {
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--pink-dark);
}

.final-stats {
    background: var(--white);
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.stat-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px dashed var(--cream-dark);
}

.stat-row:last-child {
    border-bottom: none;
}

.stat-row.highlight {
    background: var(--yellow-light);
    margin: 0.5rem -1rem;
    padding: 0.8rem 1rem;
    border-radius: 10px;
}

.stat-name {
    font-weight: 700;
    color: var(--text-light);
}

.stat-number {
    font-weight: 900;
    color: var(--text-dark);
    font-size: 1.2rem;
}

.new-record {
    margin-bottom: 1.5rem;
}

.new-record.hidden {
    display: none;
}

.record-badge {
    background: linear-gradient(135deg, var(--yellow-soft) 0%, #FFD700 100%);
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 900;
    color: var(--text-dark);
    display: inline-block;
    animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

/* Overlay Buttons */
.game-over-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.overlay-btn {
    background: var(--white);
    border: 3px solid var(--pink-soft);
    border-radius: 25px;
    padding: 1rem 2rem;
    font-family: var(--font-main);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-dark);
    cursor: pointer;
    transition: all 0.3s ease;
}

.overlay-btn:hover {
    background: var(--pink-soft);
    color: var(--white);
    transform: translateY(-3px);
}

.overlay-btn.primary {
    background: var(--pink-soft);
    color: var(--white);
}

.overlay-btn.primary:hover {
    background: var(--pink-dark);
}

.overlay-btn.quit {
    border-color: var(--text-light);
}

.overlay-btn.quit:hover {
    background: var(--text-light);
}

/* Mobile Controls */
.mobile-controls {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 50;
}

.swipe-area {
    position: absolute;
    pointer-events: auto;
    /* background: rgba(255, 0, 0, 0.1); Debugging */
}

.swipe-area.left {
    left: 0;
    top: 30%;
    width: 25%;
    height: 40%;
}

.swipe-area.right {
    right: 0;
    top: 30%;
    width: 25%;
    height: 40%;
}

.swipe-area.up {
    left: 25%;
    top: 0;
    width: 50%;
    height: 30%;
}

.swipe-area.down {
    left: 25%;
    bottom: 0;
    width: 50%;
    height: 30%;
}

/* Touch Hints */
.touch-hints {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 40;
}

.swipe-hint {
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    padding: 0.5rem 1rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--text-light);
    opacity: 0.7;
}

.swipe-left { left: 5%; top: 50%; }
.swipe-right { right: 5%; top: 50%; }
.swipe-up { left: 50%; top: 10%; transform: translateX(-50%); }
.swipe-down { left: 50%; bottom: 10%; transform: translateX(-50%); }

/* ========================================
   RESPONSIVE DESIGN
   ======================================== */

@media (max-width: 768px) {
    .game-title {
        font-size: 2.5rem;
    }
    
    .runner-text {
        font-size: 2rem;
    }
    
    .play-button {
        padding: 1rem 2.5rem;
        font-size: 1.5rem;
    }
    
    .character-float {
        font-size: 2.5rem;
    }
    
    .character-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .select-title {
        font-size: 1.8rem;
    }
    
    .back-button {
        position: relative;
        margin-bottom: 1rem;
    }
    
    .overlay-content {
        padding: 2rem 1.5rem;
    }
    
    .ready-text, .game-over-text {
        font-size: 2rem;
    }
    
    .controls-hint {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }
    
    .control-item {
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
    }
    
    .game-over-buttons {
        flex-direction: column;
    }
    
    .top-bar {
        padding: 0.5rem 1rem;
    }
    
    .score-value, .coin-value, .hs-value {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .character-preview {
        gap: 1rem;
    }
    
    .cloud {
        font-size: 2.5rem;
    }
    
    .high-score-box {
        padding: 0.8rem 1.5rem;
    }
    
    .music-control {
        bottom: 60px;
        right: 10px;
        padding: 0.3rem 0.8rem;
    }
    
    .music-label {
        display: none;
    }
}

/* Hide touch hints on desktop */
@media (min-width: 769px) {
    .touch-hints {
        display: none;
    }
}

/* Hide mobile controls on desktop */
@media (min-width: 769px) {
    .mobile-controls {
        display: none;
    }
}
