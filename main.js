/**
 * CHIIKAWA RUNNER - Audio System
 * Web Audio API based sound generation
 */

class AudioSystem {
    constructor() {
        this.context = null;
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.isInitialized = false;
        this.isMuted = false;
        
        // Music patterns
        this.musicNotes = [
            { freq: 523.25, duration: 0.25 }, // C5
            { freq: 587.33, duration: 0.25 }, // D5
            { freq: 659.25, duration: 0.25 }, // E5
            { freq: 523.25, duration: 0.25 }, // C5
            { freq: 783.99, duration: 0.5 },  // G5
            { freq: 659.25, duration: 0.25 }, // E5
            { freq: 587.33, duration: 0.25 }, // D5
            { freq: 523.25, duration: 0.5 },  // C5
        ];
        this.currentNote = 0;
        this.musicInterval = null;
    }
    
    init() {
        if (this.isInitialized) return;
        
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            
            // Master gain
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = 0.5;
            this.masterGain.connect(this.context.destination);
            
            // Music gain
            this.musicGain = this.context.createGain();
            this.musicGain.gain.value = 0.3;
            this.musicGain.connect(this.masterGain);
            
            // SFX gain
            this.sfxGain = this.context.createGain();
            this.sfxGain.gain.value = 0.4;
            this.sfxGain.connect(this.masterGain);
            
            this.isInitialized = true;
        } catch (e) {
            console.log('Audio initialization failed:', e);
        }
    }
    
    resume() {
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    }
    
    // Generate jump sound
    playJump() {
        if (!this.isInitialized || this.isMuted) return;
        this.resume();
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.sfxGain);
        
        osc.frequency.setValueAtTime(400, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.context.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.5, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.15);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.15);
    }
    
    // Generate coin sound
    playCoin() {
        if (!this.isInitialized || this.isMuted) return;
        this.resume();
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.sfxGain);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, this.context.currentTime);
        osc.frequency.setValueAtTime(1600, this.context.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.4, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.2);
    }
    
    // Generate hit sound
    playHit() {
        if (!this.isInitialized || this.isMuted) return;
        this.resume();
        
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.sfxGain);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.context.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.5, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.3);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.3);
    }
    
    // Generate game over sound
    playGameOver() {
        if (!this.isInitialized || this.isMuted) return;
        this.resume();
        
        const notes = [300, 250, 200, 150];
        notes.forEach((freq, i) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();
            
            osc.connect(gain);
            gain.connect(this.sfxGain);
            
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, this.context.currentTime + i * 0.2);
            
            gain.gain.setValueAtTime(0.4, this.context.currentTime + i * 0.2);
            gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + i * 0.2 + 0.18);
            
            osc.start(this.context.currentTime + i * 0.2);
            osc.stop(this.context.currentTime + i * 0.2 + 0.2);
        });
    }
    
    // Start background music
    startMusic() {
        if (!this.isInitialized || this.isMuted) return;
        this.resume();
        
        if (this.musicInterval) return;
        
        this.playMusicNote();
        this.musicInterval = setInterval(() => {
            this.playMusicNote();
        }, 250);
    }
    
    // Stop background music
    stopMusic() {
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
        this.currentNote = 0;
    }
    
    // Play a single music note
    playMusicNote() {
        if (!this.isInitialized || this.isMuted) return;
        
        const note = this.musicNotes[this.currentNote];
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        
        osc.connect(gain);
        gain.connect(this.musicGain);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, this.context.currentTime);
        
        gain.gain.setValueAtTime(0.2, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + note.duration);
        
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + note.duration);
        
        this.currentNote = (this.currentNote + 1) % this.musicNotes.length;
    }
    
    // Toggle mute
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain) {
            this.masterGain.gain.value = this.isMuted ? 0 : 0.5;
        }
        return this.isMuted;
    }
}

// Create global audio system instance
const audioSystem = new AudioSystem();
