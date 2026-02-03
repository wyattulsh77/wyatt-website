// Initialize audio player
let audioPlayer = null;

window.addEventListener('DOMContentLoaded', function() {
    // Get or create audio element
    let audio = document.getElementById('bgAudio');
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'bgAudio';
        audio.src = 'sounds/forestbirds.mp3';
        audio.loop = true;
        document.body.appendChild(audio);
    }
    audioPlayer = audio;

    // Get the play/pause button
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        // Check if audio was playing before navigation
        const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
        const lastTime = parseFloat(localStorage.getItem('musicTime')) || 0;

        // Set the current time if we have one
        audio.addEventListener('loadedmetadata', function() {
            audio.currentTime = lastTime;
        });

        // Update localStorage when audio plays/pauses
        audio.addEventListener('play', function() {
            localStorage.setItem('musicPlaying', 'true');
        });

        audio.addEventListener('pause', function() {
            localStorage.setItem('musicPlaying', 'false');
        });

        // Update current time in localStorage periodically
        audio.addEventListener('timeupdate', function() {
            localStorage.setItem('musicTime', audio.currentTime);
        });

        // Toggle play/pause
        musicBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (audio.paused) {
                audio.play().catch(err => console.log('Autoplay prevented:', err));
            } else {
                audio.pause();
            }
        });

        // Save state before leaving page
        window.addEventListener('pagehide', function(event) {
            localStorage.setItem('musicTime', audio.currentTime);
            localStorage.setItem('musicPlaying', !audio.paused);
        });

        // Auto-play if it was playing before
        if (wasPlaying) {
            audio.play().catch(err => console.log('Autoplay prevented:', err));
        }
    }

    // Set up the back button
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Save audio state before navigating
            if (audioPlayer) {
                localStorage.setItem('musicTime', audioPlayer.currentTime);
                localStorage.setItem('musicPlaying', !audioPlayer.paused);
            }
            // Use history.back() which preserves audio context better
            window.history.back();
        });
    }
});
