document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const bgAudio = document.getElementById('bg-audio');
    const pageTurnAudio = document.getElementById('page-turn-audio');
    const toggleSoundBtn = document.getElementById('toggle-sound');
    const soundIcon = toggleSoundBtn.querySelector('.sound-icon');
    
    // Set initial volume (subtle background ambience)
    bgAudio.volume = 0.3;
    pageTurnAudio.volume = 0.7;
    
    // Initialize based on stored preference
    let soundEnabled = localStorage.getItem('forest_journal_sound_enabled');
    soundEnabled = soundEnabled === null ? true : soundEnabled === 'true';
    
    // Initialize the sound toggle button state
    function updateSoundToggleState() {
        if (soundEnabled) {
            soundIcon.textContent = '🔊';
            if (!bgAudio.paused) return; // Don't restart if already playing
            // Starting with a fade-in effect
            bgAudio.volume = 0;
            bgAudio.play()
                .catch(error => {
                    console.log('Autoplay prevented by browser, waiting for user interaction');
                });
            
            // Fade in gradually
            let fadeInInterval = setInterval(() => {
                if (bgAudio.volume < 0.3) {
                    bgAudio.volume += 0.01;
                } else {
                    clearInterval(fadeInInterval);
                }
            }, 100);
        } else {
            soundIcon.textContent = '🔇';
            // Fade out gradually
            let fadeOutInterval = setInterval(() => {
                if (bgAudio.volume > 0.01) {
                    bgAudio.volume -= 0.01;
                } else {
                    bgAudio.pause();
                    clearInterval(fadeOutInterval);
                }
            }, 50);
        }
    }
    
    // Update sound state on initial load
    updateSoundToggleState();
    
    // Toggle sound button functionality
    toggleSoundBtn.addEventListener('click', function() {
        soundEnabled = !soundEnabled;
        localStorage.setItem('forest_journal_sound_enabled', soundEnabled);
        updateSoundToggleState();
    });
    
    // Function to play page turn sound
    window.playPageTurnSound = function() {
        if (soundEnabled) {
            // Reset the audio to start (in case it's still playing)
            pageTurnAudio.currentTime = 0;
            pageTurnAudio.play()
                .catch(error => console.log('Could not play page turn sound:', error));
        }
    };
    
    // Handle autoplay restrictions (wait for first user interaction)
    document.addEventListener('click', function firstInteraction() {
        if (soundEnabled) {
            bgAudio.play()
                .then(() => {
                    // Success - remove this listener
                    document.removeEventListener('click', firstInteraction);
                })
                .catch(error => console.log('Could not start background audio:', error));
        }
    }, { once: false });
    
    // Expose sound control to global scope
    window.toggleSound = function(state) {
        if (state !== undefined) {
            soundEnabled = !!state;
        } else {
            soundEnabled = !soundEnabled;
        }
        localStorage.setItem('forest_journal_sound_enabled', soundEnabled);
        updateSoundToggleState();
        return soundEnabled;
    };
    
    // Add sound toggle to global window object
    window.soundEnabled = function() {
        return soundEnabled;
    };
});
