document.addEventListener('DOMContentLoaded', function() {
    const hasVisitedBefore = localStorage.getItem('forest_journal_visited');
    if (!hasVisitedBefore) {
        showWelcomeScreen();
    }
    function showWelcomeScreen() {
        // Hide the journal container first to prevent it from showing alongside welcome screen
        const journalContainer = document.querySelector('.journal-container');
        if (journalContainer) {
            journalContainer.style.visibility = 'hidden';
        }
        
        // Create welcome overlay that will cover the entire viewport
        const welcomeOverlay = document.createElement('div');
        welcomeOverlay.className = 'welcome-overlay';
        welcomeOverlay.style.position = 'fixed';
        welcomeOverlay.style.top = '0';
        welcomeOverlay.style.left = '0';
        welcomeOverlay.style.width = '100vw';
        welcomeOverlay.style.height = '100vh';
        
        const welcomeContent = document.createElement('div');
        welcomeContent.className = 'welcome-content';
        const leafTopLeft = document.createElement('div');
        leafTopLeft.className = 'welcome-decorator leaf-top-left';
        const leafBottomRight = document.createElement('div');
        leafBottomRight.className = 'welcome-decorator leaf-bottom-right';
        
        // Add fireflies to the welcome screen
        createWelcomeFireflies(welcomeOverlay, 40);
        welcomeContent.innerHTML = `
            <h1 class="welcome-title">Whispers of the Forest</h1>
            <h2 class="welcome-subtitle">Your personal forest-themed journal</h2>
            <p class="welcome-description">Welcome to your magical forest journal. Here you can document your thoughts, dreams, and memories surrounded by the calming essence of nature. Enjoy the ambient firefly glow as you write, turning each page with the gentle rustle of leaves.</p>
            <button class="welcome-open-button">Open Journal</button>
        `;
        welcomeContent.appendChild(leafTopLeft);
        welcomeContent.appendChild(leafBottomRight);
        welcomeOverlay.appendChild(welcomeContent);
        document.body.appendChild(welcomeOverlay);
        const openButton = welcomeContent.querySelector('.welcome-open-button');
        openButton.addEventListener('click', function() {
            welcomeOverlay.style.opacity = '0';
            setTimeout(function() {
                welcomeOverlay.remove();
                // Show the journal container again
                const journalContainer = document.querySelector('.journal-container');
                if (journalContainer) {
                    journalContainer.style.visibility = 'visible';
                }
                localStorage.setItem('forest_journal_visited', 'true');
                startGuidedTour();
            }, 800);
        });
    }
    function startGuidedTour() {
        const tourOverlay = document.createElement('div');
        tourOverlay.className = 'tour-overlay';
        tourOverlay.style.pointerEvents = 'auto'; 
        const featuresPopup = document.createElement('div');
        featuresPopup.className = 'features-popup';
        featuresPopup.innerHTML = `
            <h2 class="features-title">Forest Journal Features</h2>
            <div class="features-content">
                <div class="feature-item">
                    <h3>Journal Management</h3>
                    <p>Click the <span class="highlight">leaf icon</span> in the top-left corner to access your journal collection. Create new journals or switch between existing ones.</p>
                </div>
                <div class="feature-item">
                    <h3>Page Navigation</h3>
                    <p>Use the <span class="highlight">Previous/Next Spread</span> buttons to navigate between pages. Each spread contains two facing pages.</p>
                </div>
                <div class="feature-item">
                    <h3>Writing & Editing</h3>
                    <p>Click on any page to write your thoughts. Your content is automatically saved when you navigate pages.</p>
                    <p>Use the <span class="highlight">pencil icon</span> near the journal title to rename your journal.</p>
                </div>
                <div class="feature-item">
                    <h3>Journal Actions</h3>
                    <p><span class="highlight">Add New Spread</span>: Add a new pair of pages to your journal.</p>
                    <p><span class="highlight">Save Journal</span>: Manually save your current journal.</p>
                    <p><span class="highlight">Export</span>: Export your journal content.</p>
                </div>
                <div class="feature-item">
                    <h3>Immersive Features</h3>
                    <p>Enjoy the gentle <span class="highlight">firefly animations</span> in the background that create a magical forest atmosphere.</p>
                    <p>Notice your custom <span class="highlight">leaf cursor</span> that responds to your movements.</p>
                </div>
            </div>
            <button class="features-close-btn">Start Writing</button>
        `;
        document.body.appendChild(tourOverlay);
        document.body.appendChild(featuresPopup);
        featuresPopup.style.top = '50%';
        featuresPopup.style.left = '50%';
        featuresPopup.style.transform = 'translate(-50%, -50%)';
        featuresPopup.style.opacity = '0';
        featuresPopup.style.transform = 'translate(-50%, -50%) scale(0.95)';
        setTimeout(() => {
            featuresPopup.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            featuresPopup.style.opacity = '1';
            featuresPopup.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
        const closeButton = featuresPopup.querySelector('.features-close-btn');
        closeButton.addEventListener('click', function() {
            featuresPopup.style.opacity = '0';
            featuresPopup.style.transform = 'translate(-50%, -50%) scale(0.95)';
            setTimeout(() => {
                featuresPopup.remove();
                showReloadMessagePopup(tourOverlay);
            }, 300);
        });
        function showReloadMessagePopup(overlay) {
            const reloadPopup = document.createElement('div');
            reloadPopup.className = 'features-popup reload-popup';
            reloadPopup.innerHTML = `
                <h2 class="features-title">Journal Ready to Explore</h2>
                <div class="reload-message">
                    <p>A journal has already been written for you to explore. Reload the page to view "Whispers of the Forest" - a rich forest-themed journal with 14 pages of content.</p>
                    <p>This journal contains reflections, stories, and activities that capture the essence of forest wisdom.</p>
                </div>
                <div class="reload-actions">
                    <button class="reload-now-btn">Reload Now</button>
                    <button class="continue-btn">Continue Without Reloading</button>
                </div>
            `;
            document.body.appendChild(reloadPopup);
            reloadPopup.style.top = '50%';
            reloadPopup.style.left = '50%';
            reloadPopup.style.transform = 'translate(-50%, -50%) scale(0.95)';
            setTimeout(() => {
                reloadPopup.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                reloadPopup.style.opacity = '1';
                reloadPopup.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
            const reloadBtn = reloadPopup.querySelector('.reload-now-btn');
            reloadBtn.addEventListener('click', function() {
                window.location.reload();
            });
            const continueBtn = reloadPopup.querySelector('.continue-btn');
            continueBtn.addEventListener('click', function() {
                overlay.style.opacity = '0';
                reloadPopup.style.opacity = '0';
                reloadPopup.style.transform = 'translate(-50%, -50%) scale(0.95)';
                setTimeout(() => {
                    overlay.remove();
                    reloadPopup.remove();
                    localStorage.setItem('forest_journal_tour_completed', 'true');
                }, 300);
            });
        }
        tourOverlay.addEventListener('click', function(e) {
            if (e.target === tourOverlay) {
                if (document.querySelector('.reload-popup')) {
                    return;
                }
                closeButton.click();
            }
        });
    }
    function addTourRestartButton() {
        const actionsDiv = document.querySelector('.journal-actions');
        if (actionsDiv) {
            const tourButton = document.createElement('button');
            tourButton.id = 'restart-tour';
            tourButton.className = 'secondary-btn';
            tourButton.textContent = 'Restart Tour';
            tourButton.addEventListener('click', function() {
                startGuidedTour();
            });
            actionsDiv.appendChild(tourButton);
        }
    }
    if (localStorage.getItem('forest_journal_tour_completed')) {
        addTourRestartButton();
    }
    window.startGuidedTour = startGuidedTour;
    
    // Function to create fireflies for the welcome screen
    function createWelcomeFireflies(container, count) {
        // Create the specified number of fireflies
        for (let i = 0; i < count; i++) {
            createWelcomeFirefly(container);
        }
        
        // Occasionally add new fireflies for a dynamic effect
        const intervalId = setInterval(() => {
            // Only add more if the container is still in the document
            if (!document.body.contains(container)) {
                clearInterval(intervalId);
                return;
            }
            
            // Add new fireflies occasionally
            if (Math.random() > 0.5 && container.querySelectorAll('.welcome-firefly').length < 60) {
                createWelcomeFirefly(container);
            }
        }, 1000);
    }
    
    // Create a single firefly element for the welcome screen
    function createWelcomeFirefly(container) {
        const firefly = document.createElement('div');
        firefly.className = 'welcome-firefly';
        
        // Position randomly
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        firefly.style.left = `${posX}%`;
        firefly.style.top = `${posY}%`;
        
        // Random size (slightly larger than regular fireflies)
        const size = 2 + Math.random() * 4;
        firefly.style.width = `${size}px`;
        firefly.style.height = `${size}px`;
        
        // Create core and glow elements
        const core = document.createElement('div');
        core.className = 'welcome-firefly-core';
        firefly.appendChild(core);
        
        const glow = document.createElement('div');
        glow.className = 'welcome-firefly-glow';
        firefly.appendChild(glow);
        
        // Set movement variables
        const moveX = -50 + Math.random() * 100;
        const moveY = -50 + Math.random() * 100;
        firefly.style.setProperty('--x', `${moveX}px`);
        firefly.style.setProperty('--y', `${moveY}px`);
        
        const moveX2 = -40 + Math.random() * 80;
        const moveY2 = -40 + Math.random() * 80;
        firefly.style.setProperty('--x2', `${moveX2}px`);
        firefly.style.setProperty('--y2', `${moveY2}px`);
        
        const moveX3 = -60 + Math.random() * 120;
        const moveY3 = -60 + Math.random() * 120;
        firefly.style.setProperty('--x3', `${moveX3}px`);
        firefly.style.setProperty('--y3', `${moveY3}px`);
        
        // Animation timing
        const animDuration = 10 + Math.random() * 8;
        firefly.style.animationDuration = `${animDuration}s`;
        firefly.style.animationDelay = `${Math.random() * 8}s`;
        
        const pulseDuration = 0.8 + Math.random() * 1.5;
        core.style.animationDuration = `${pulseDuration}s`;
        glow.style.animationDuration = `${pulseDuration * (1.2 + Math.random() * 0.8)}s`;
        
        // Color (forest theme colors - greens and warm yellows)
        const baseHue = Math.random() > 0.7 ? 120 + Math.random() * 40 : 45 + Math.random() * 30; 
        const saturation = 70 + Math.random() * 30;
        const lightness = 60 + Math.random() * 30;
        
        // Apply colors
        firefly.style.boxShadow = `0 0 ${size * 5}px ${size * 4}px hsla(${baseHue}, ${saturation}%, ${lightness}%, ${0.12 + Math.random() * 0.15})`;
        core.style.backgroundColor = `hsla(${baseHue}, ${saturation}%, ${lightness}%, ${0.5 + Math.random() * 0.3})`;
        glow.style.backgroundColor = `hsla(${baseHue}, ${saturation-10}%, ${lightness+10}%, ${0.1 + Math.random() * 0.15})`;
        
        // Add to container
        container.appendChild(firefly);
        
        // Remove some fireflies occasionally
        setTimeout(() => {
            if (Math.random() > 0.4 && container.contains(firefly)) {
                firefly.style.opacity = 0;
                setTimeout(() => {
                    if (container.contains(firefly)) {
                        container.removeChild(firefly);
                    }
                }, 2000);
            }
        }, animDuration * 1000);
    }
});
