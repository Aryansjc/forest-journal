document.addEventListener('DOMContentLoaded', function() {
    const hasVisitedBefore = localStorage.getItem('forest_journal_visited');
    if (!hasVisitedBefore) {
        showWelcomeScreen();
    }
    function showWelcomeScreen() {
        const welcomeOverlay = document.createElement('div');
        welcomeOverlay.className = 'welcome-overlay';
        const welcomeContent = document.createElement('div');
        welcomeContent.className = 'welcome-content';
        const leafTopLeft = document.createElement('div');
        leafTopLeft.className = 'welcome-decorator leaf-top-left';
        const leafBottomRight = document.createElement('div');
        leafBottomRight.className = 'welcome-decorator leaf-bottom-right';
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
});
