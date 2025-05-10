
function createLeafCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    cursor.style.backgroundImage = 'url("leaf-icon.svg")'; 
    cursor.style.backgroundSize = 'contain';
    cursor.style.backgroundRepeat = 'no-repeat';
    cursor.style.backgroundPosition = 'center';
    const leafContainer = document.createElement('div');
    leafContainer.style.position = 'fixed';
    leafContainer.style.top = '0';
    leafContainer.style.left = '0';
    leafContainer.style.width = '100%';
    leafContainer.style.height = '100%';
    leafContainer.style.pointerEvents = 'none';
    leafContainer.style.zIndex = '9998';
    leafContainer.style.overflow = 'hidden';
    document.body.appendChild(leafContainer);
    const leafShapes = [
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#4caf50" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#8bc34a" d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M16,15V13H13.72C13.36,13.62 12.71,14 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10C12.71,10 13.36,10.38 13.72,11H16V9L19,12L16,15Z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#7cb342" d="M12,11.28C12.29,10.15 13.25,9.31 14.34,9.25C14.95,9.22 15.55,9.36 16.04,9.67C16.5,9.97 16.89,10.39 17.12,10.9C17.39,10.5 17.78,10.19 18.25,10.05C18.72,9.92 19.21,9.94 19.66,10.1C20.11,10.27 20.5,10.57 20.79,10.97C21.08,11.36 21.25,11.84 21.25,12.34C21.25,12.83 21.08,13.31 20.79,13.71C20.5,14.1 20.11,14.41 19.66,14.57C19.21,14.74 18.72,14.76 18.25,14.62C17.78,14.5 17.39,14.19 17.12,13.78C16.89,14.29 16.5,14.72 16.04,15.03C15.55,15.33 14.95,15.47 14.34,15.43C13.25,15.38 12.29,14.54 12,13.41C11.71,14.54 10.75,15.38 9.66,15.43C9.05,15.47 8.45,15.33 7.96,15.03C7.5,14.72 7.11,14.29 6.88,13.78C6.61,14.19 6.22,14.5 5.75,14.62C5.28,14.76 4.79,14.74 4.34,14.57C3.89,14.41 3.5,14.1 3.21,13.71C2.92,13.31 2.75,12.83 2.75,12.34C2.75,11.84 2.92,11.36 3.21,10.97C3.5,10.57 3.89,10.27 4.34,10.1C4.79,9.94 5.28,9.92 5.75,10.05C6.22,10.19 6.61,10.5 6.88,10.9C7.11,10.39 7.5,9.97 7.96,9.67C8.45,9.36 9.05,9.22 9.66,9.25C10.75,9.31 11.71,10.15 12,11.28Z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#388e3c" d="M19,10C19,11.38 16.88,12.5 15.5,12.5C14.12,12.5 12.75,11.38 12.75,10H11.25C11.25,11.38 9.88,12.5 8.5,12.5C7.12,12.5 5,11.38 5,10H4.25C4.09,10.64 4,11.31 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,11.31 19.91,10.64 19.75,10H19M12,4C9.04,4 6.45,5.61 5.08,8H18.92C17.55,5.61 14.96,4 12,4M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"/></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#a5d6a7" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/></svg>`
    ];
    const leafColors = [
        '#4caf50', 
        '#8bc34a', 
        '#7cb342', 
        '#388e3c', 
        '#a5d6a7', 
        '#3e2723'  
    ];
    let lastX = 0;
    let lastY = 0;
    let lastLeafTime = 0;
    let velocity = 0; 
    document.addEventListener('mousemove', function(e) {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            }
        });
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        velocity = velocity * 0.8 + distance * 0.2;
        const now = Date.now();
        const leafThreshold = velocity > 40 ? 150 : 250; 
        if (distance > 15 && now - lastLeafTime > leafThreshold) {
            const leafCount = velocity > 50 ? 2 : 1;
            createLeaf(e.clientX, e.clientY, leafContainer, leafShapes, leafColors, dx, dy);
            lastLeafTime = now;
        }
        lastX = e.clientX;
        lastY = e.clientY;
    });
    document.addEventListener('mouseout', function() {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseover', function() {
        cursor.style.opacity = '1';
    });
    function createLeaf(x, y, container, shapes, colors, dx, dy) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        const shapeIndex = Math.floor(Math.random() * shapes.length);
        let leafSvg = shapes[shapeIndex];
        if (shapeIndex !== 3) {
            const colorIndex = Math.floor(Math.random() * colors.length);
            leafSvg = leafSvg.replace(/fill="[^"]*"/, `fill="${colors[colorIndex]}"`); 
        }
        leaf.innerHTML = leafSvg;
        const offsetX = (Math.random() - 0.5) * 5;
        const offsetY = (Math.random() - 0.5) * 5;
        leaf.style.left = (x + offsetX) + 'px';
        leaf.style.top = (y + offsetY) + 'px';
        const size = Math.random() * 12 + 10;
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        container.appendChild(leaf);
        const moveAngle = Math.atan2(dy, dx) * 180 / Math.PI;
        const initialRotation = moveAngle + (Math.random() * 30 - 15); 
        const rotationAmount = Math.random() * 180 - 90; 
        const moveSpeed = Math.sqrt(dx * dx + dy * dy);
        const moveFactor = Math.min(moveSpeed / 10, 2); 
        const distance = Math.random() * 70 + 50; 
        const duration = Math.random() * 2 + 1.5; 
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const ndx = magnitude > 0 ? dx / magnitude : 0;
        const ndy = magnitude > 0 ? dy / magnitude : 1; 
        const endX = x + distance * ndx * moveFactor + (Math.random() * 30 - 15);
        const endY = y + distance * (ndy * 0.3 + 0.7) * moveFactor + distance * 0.7; 
        leaf.style.transform = `rotate(${initialRotation}deg)`;
        const leafId = 'leaf-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        leaf.id = leafId;
        const keyframes = `
            @keyframes fall-${leafId} {
                0% { transform: translate(0, 0) rotate(${initialRotation}deg); opacity: 0.7; }
                50% { transform: translate(${endX * 0.5 - x}px, ${endY * 0.4 - y}px) rotate(${initialRotation + rotationAmount * 0.5}deg); opacity: 0.5; }
                100% { transform: translate(${endX - x}px, ${endY - y}px) rotate(${initialRotation + rotationAmount}deg); opacity: 0; }
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = keyframes;
        document.head.appendChild(styleElement);
        leaf.style.animation = `fall-${leafId} ${duration}s cubic-bezier(0.4, 0.0, 0.2, 1) forwards`;
        setTimeout(() => {
            if (container.contains(leaf)) {
                container.removeChild(leaf);
            }
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        }, duration * 1000 + 100);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    createLeafCursor();
});
