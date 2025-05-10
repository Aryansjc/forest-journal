
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.floating-leaf').forEach(leaf => {
        if (leaf.parentNode) leaf.parentNode.removeChild(leaf);
    });
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'magical-particles';
    document.body.prepend(particlesContainer);
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    const fireflyCount = 40;
    for (let i = 0; i < fireflyCount; i++) {
        createFirefly(particlesContainer);
    }
    createForestMist(particlesContainer);
    setInterval(() => {
        const rand = Math.random();
        if (rand > 0.5 && particlesContainer.querySelectorAll('.firefly').length < 60) {
            createFirefly(particlesContainer);
        } else if (particlesContainer.querySelectorAll('.particle').length < 20) {
            createParticle(particlesContainer);
        }
    }, 1000);
});
function createFirefly(container) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    firefly.style.left = `${posX}%`;
    firefly.style.top = `${posY}%`;
    const size = 2 + Math.random() * 3;
    firefly.style.width = `${size}px`;
    firefly.style.height = `${size}px`;
    const core = document.createElement('div');
    core.className = 'firefly-core';
    firefly.appendChild(core);
    const glow = document.createElement('div');
    glow.className = 'firefly-glow';
    firefly.appendChild(glow);
    const moveX = -50 + Math.random() * 100;
    const moveY = -50 + Math.random() * 100;
    firefly.style.setProperty('--x', `${moveX}px`);
    firefly.style.setProperty('--y', `${moveY}px`);
    const moveX2 = -30 + Math.random() * 60;
    const moveY2 = -30 + Math.random() * 60;
    firefly.style.setProperty('--x2', `${moveX2}px`);
    firefly.style.setProperty('--y2', `${moveY2}px`);
    const moveX3 = -40 + Math.random() * 80;
    const moveY3 = -40 + Math.random() * 80;
    firefly.style.setProperty('--x3', `${moveX3}px`);
    firefly.style.setProperty('--y3', `${moveY3}px`);
    const animDuration = 8 + Math.random() * 7;
    firefly.style.animationDuration = `${animDuration}s`;
    firefly.style.animationDelay = `${Math.random() * 8}s`;
    const pulseDuration = 0.8 + Math.random() * 1.2;
    core.style.animationDuration = `${pulseDuration}s`;
    glow.style.animationDuration = `${pulseDuration * (1.2 + Math.random() * 0.8)}s`;
    const iterCount = Math.random() > 0.7 ? 'infinite' : Math.floor(Math.random() * 3) + 2;
    core.style.animationIterationCount = iterCount;
    glow.style.animationIterationCount = iterCount;
    const baseHue = Math.random() > 0.8 ? 120 + Math.random() * 30 : 45 + Math.random() * 25; 
    const saturation = 70 + Math.random() * 30;
    const lightness = 60 + Math.random() * 30;
    firefly.style.boxShadow = `0 0 ${size * 4}px ${size * 3}px hsla(${baseHue}, ${saturation}%, ${lightness}%, ${0.1 + Math.random() * 0.15})`;
    core.style.backgroundColor = `hsla(${baseHue}, ${saturation}%, ${lightness}%, ${0.4 + Math.random() * 0.25})`;
    glow.style.backgroundColor = `hsla(${baseHue}, ${saturation-10}%, ${lightness+10}%, ${0.08 + Math.random() * 0.12})`;
    container.appendChild(firefly);
    setTimeout(() => {
        if (Math.random() > 0.3 && container.querySelectorAll('.firefly').length > 15) {
            firefly.style.opacity = 0;
            setTimeout(() => {
                if (firefly.parentNode === container) {
                    container.removeChild(firefly);
                }
            }, 2000);
        }
    }, animDuration * 1000 * 2);
}
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    const size = 2 + Math.random() * 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    const moveX = -20 + Math.random() * 40;
    const moveY = -20 + Math.random() * 40;
    particle.style.setProperty('--x', `${moveX}px`);
    particle.style.setProperty('--y', `${moveY}px`);
    const animDuration = 3 + Math.random() * 4;
    particle.style.animationDuration = `${animDuration}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    const hue = 80 + Math.random() * 40; 
    const saturation = 60 + Math.random() * 40;
    const lightness = 60 + Math.random() * 30;
    particle.style.background = `radial-gradient(circle, rgba(255,255,255,0.8) 0%, hsla(${hue}, ${saturation}%, ${lightness}%, 0.4) 70%, transparent 100%)`;
    container.appendChild(particle);
    setTimeout(() => {
        if (Math.random() > 0.7 && container.children.length > 20) {
            particle.style.opacity = 0;
            setTimeout(() => {
                if (particle.parentNode === container) {
                    container.removeChild(particle);
                }
            }, 1000);
        }
    }, animDuration * 1000 * 3);
}
function createFloatingLeaf(container) {
    const leaf = document.createElement('div');
    leaf.className = 'floating-leaf';
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    leaf.style.left = `${posX}%`;
    leaf.style.top = `${posY}%`;
    const size = 20 + Math.random() * 30;
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    leaf.innerHTML = `<img src="leaf-icon.svg" width="100%" height="100%">`;
    const rotation = Math.random() * 360;
    leaf.style.transform = `rotate(${rotation}deg)`;
    const moveX = -50 + Math.random() * 100;
    const moveY = -20 + Math.random() * 40;
    leaf.style.setProperty('--x', `${moveX}px`);
    leaf.style.setProperty('--y', `${moveY}px`);
    const animDuration = 15 + Math.random() * 25;
    leaf.style.animationDuration = `${animDuration}s`;
    leaf.style.animationDelay = `${Math.random() * 10}s`;
    leaf.style.opacity = 0.2 + Math.random() * 0.3;
    container.appendChild(leaf);
    setTimeout(() => {
        if (Math.random() > 0.3 && container.querySelectorAll('.floating-leaf').length > 10) {
            leaf.style.opacity = 0;
            setTimeout(() => {
                if (leaf.parentNode === container) {
                    container.removeChild(leaf);
                }
            }, 3000);
        }
    }, animDuration * 1000 * 0.8);
}
function createForestMist(container) {
    const mist = document.createElement('div');
    mist.className = 'forest-mist';
    for (let i = 0; i < 3; i++) {
        const mistLayer = document.createElement('div');
        mistLayer.className = 'mist-layer';
        mistLayer.style.opacity = 0.03 + (i * 0.01);
        mistLayer.style.animationDuration = `${80 - (i * 15)}s`;
        mistLayer.style.animationDelay = `${i * 5}s`;
        mist.appendChild(mistLayer);
    }
    container.appendChild(mist);
}
