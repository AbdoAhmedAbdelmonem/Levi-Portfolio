document.addEventListener('DOMContentLoaded', function() {
    // Hide intro after 3 seconds
    setTimeout(function() {
        const intro = document.getElementById('introOverlay');
        intro.style.opacity = '0';

        // Remove intro from DOM after fade out completes
        setTimeout(function() {
            intro.remove();
        }, 1500);
    }, 3000);

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');

        // Toggle body overflow when menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    function setActiveSection(sectionId) {
        // Remove active class from all nav items and sections
        navItems.forEach(nav => nav.classList.remove('active'));
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });

        // Add active class to clicked nav item
        document.querySelectorAll(`.nav-item[data-section="${sectionId}"]`).forEach(item => {
            item.classList.add('active');
        });

        // Show corresponding section with animation
        const activeSection = document.getElementById(sectionId);
        activeSection.classList.add('active');

        // Trigger reflow to restart animation
        void activeSection.offsetWidth;

        activeSection.style.opacity = '1';
        activeSection.style.transform = 'translateY(0)';

        // Close mobile menu if open
        if (mobileNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            setActiveSection(sectionId);

            // Add ripple effect to the clicked nav item
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            item.appendChild(ripple);

            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Set home as default active section
    setActiveSection('home');

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Using a custom modal or message box instead of alert()
            const messageBox = document.createElement('div');
            messageBox.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: var(--void-black);
                color: var(--starlight);
                padding: 20px;
                border-radius: 10px;
                border: 1px solid var(--future-blue);
                box-shadow: 0 0 30px rgba(0, 240, 255, 0.5);
                z-index: 10000;
                text-align: center;
                font-family: 'Pixelify Sans', sans-serif;
            `;
            messageBox.innerHTML = `
                <p>Message sent to the future! (This is a demo)</p>
                <button style="
                    background: linear-gradient(90deg, var(--future-blue), var(--neon-pink));
                    color: black;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 15px;
                    font-family: inherit;
                " onclick="this.parentNode.remove()">OK</button>
            `;
            document.body.appendChild(messageBox);
            contactForm.reset();
        });
    }

    // Three.js Dynamic Background for Home Section
    let scene, camera, renderer, particles;
    const homeSection = document.getElementById('home');
    const canvas = document.getElementById('threejs-background');

    function initThreeJS() {
        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(75, homeSection.clientWidth / homeSection.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(homeSection.clientWidth, homeSection.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Particles
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const color1 = new THREE.Color(0x00f0ff); // future-blue
        const color2 = new THREE.Color(0xff00aa); // neon-pink

        for (let i = 0; i < particleCount; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            // Color interpolation
            const mixedColor = new THREE.Color();
            mixedColor.lerpColors(color1, color2, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        const width = homeSection.clientWidth;
        const height = homeSection.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function animateThreeJS() {
        requestAnimationFrame(animateThreeJS);

        // Animate particles
        if (particles) {
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;
        }

        renderer.render(scene, camera);
    }

    // Only initialize Three.js if on the home section
    // Check if the home section is active on initial load
    if (homeSection && homeSection.classList.contains('active')) {
        initThreeJS();
        animateThreeJS();
    }

    // Re-initialize and animate Three.js when navigating to the home section
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const sectionId = item.getAttribute('data-section');
            if (sectionId === 'home') {
                // Ensure canvas is available and not already initialized
                if (!scene) {
                    initThreeJS();
                    animateThreeJS();
                }
            } else {
                // Dispose Three.js resources when leaving home section to save performance
                if (scene) {
                    scene.clear();
                    renderer.dispose();
                    scene = null;
                    camera = null;
                    renderer = null;
                    particles = null;
                    window.removeEventListener('resize', onWindowResize);
                }
            }
        });
    });


    // Cursor Trail Effect
    const cursorTrailContainer = document.getElementById('cursor-trail-container');

    document.addEventListener('mousemove', (e) => {
        const particle = document.createElement('div');
        particle.classList.add('trail-particle');
        cursorTrailContainer.appendChild(particle);

        const size = Math.random() * 10 + 5; // Random size between 5px and 15px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${e.clientX - size / 2}px`;
        particle.style.top = `${e.clientY - size / 2}px`;

        // Trigger animation
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = `scale(0.5) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`; // Slight random movement
        }, 10); // Small delay to ensure initial state is rendered

        // Remove particle after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    });
});
