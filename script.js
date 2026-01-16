// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Data Analytics Enthusiast',
        'Python Developer',
        'SQL & Excel Expert',
        'Problem Solver',
        'BCA Student'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect after a brief delay
    setTimeout(typeEffect, 1000);
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Animate skill level bars on scroll
    const skillLevels = document.querySelectorAll('.level-bar');
    
    function animateSkillBars() {
        skillLevels.forEach(bar => {
            const level = bar.getAttribute('data-level');
            const rect = bar.getBoundingClientRect();
            
            // Check if the element is in viewport
            if (rect.top < window.innerHeight - 100) {
                bar.style.width = level + '%';
            }
        });
    }
    
    // Initial animation check
    animateSkillBars();
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Form submission
    const contactForm = document.getElementById('messageForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // In a real application, you would send this data to a server
        // For demo purposes, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
        
        // Reset form
        this.reset();
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 3D cube interaction
    const cube = document.querySelector('.cube');
    
    // Pause cube animation on hover
    if (cube) {
        cube.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        cube.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Allow manual rotation with mouse
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        
        cube.addEventListener('mousedown', function(e) {
            isDragging = true;
            previousMousePosition.x = e.clientX;
            previousMousePosition.y = e.clientY;
            e.stopPropagation(); // Prevent interfering with other elements
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;
            
            // Get current rotation values
            const computedStyle = window.getComputedStyle(cube);
            const matrix = computedStyle.transform;
            
            let rotateX = 0;
            let rotateY = 0;
            
            if (matrix !== 'none') {
                const matrixValues = matrix.match(/matrix3d\(([^)]+)\)/) || 
                                    matrix.match(/matrix\(([^)]+)\)/);
                
                if (matrixValues) {
                    const values = matrixValues[1].split(',').map(parseFloat);
                    
                    // Extract rotation angles from matrix (simplified)
                    if (matrix.includes('matrix3d')) {
                        // For 3D matrix
                        rotateY = Math.atan2(values[8], values[10]) * (180 / Math.PI);
                        rotateX = Math.atan2(-values[9], Math.sqrt(values[10]*values[10] + values[11]*values[11])) * (180 / Math.PI);
                    }
                }
            }
            
            // Apply new rotation
            rotateY += deltaX * 0.5;
            rotateX -= deltaY * 0.5;
            
            cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            previousMousePosition.x = e.clientX;
            previousMousePosition.y = e.clientY;
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }
    
    // Add some floating particles to hero section
    createFloatingParticles();
    
    function createFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-shapes');
        
        // Create additional particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.classList.add('shape');
            
            // Random size and position
            const size = Math.random() * 20 + 10;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random animation
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.animation = `floatShape ${duration}s ease-in-out infinite ${delay}s`;
            particle.style.opacity = Math.random() * 0.1 + 0.05;
            particle.style.background = `linear-gradient(45deg, var(${Math.random() > 0.5 ? '--primary' : '--accent'}), rgba(255,255,255,0.3))`;
            
            particlesContainer.appendChild(particle);
        }
    }
});