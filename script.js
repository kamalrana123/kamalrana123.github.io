// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const currentYearSpan = document.getElementById('current-year');

// Set Current Year
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Mobile Navigation Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Accessibility
        const expanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', expanded);
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Event Handler (Navbar Shadow & Scroll to Top)
window.addEventListener('scroll', () => {
    // Navbar Shadow
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '1rem 0'; // Revert to original padding
    }

    // Scroll to Top Button
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
    
    // Active Navigation Link Highlighting
    highlightActiveNavLink();
});

// Scroll to Top Action
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Active Nav Link Highlighter
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Add animation to elements
document.querySelectorAll('.project-card, .skill-category, .stat-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing Effect
const typingTextElement = document.querySelector('.typing-text');
const textsToType = [
    "Software Engineer", 
    "Backend Developer", 
    "System Architect", 
    "Open Source Enthusiast"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    if (!typingTextElement) return;

    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Finished typing current text
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        typeSpeed = 500; // Pause before starting next
    }

    setTimeout(typeEffect, typeSpeed);
}

// Initialize Typing Effect
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect after a short delay
    setTimeout(typeEffect, 1000);
});

console.log('🚀 Portfolio website loaded successfully!');