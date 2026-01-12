/**
 * Lotus View - Social Media Agency Portfolio
 * Main JavaScript File
 * 
 * Features:
 * - Hamburger menu toggle with smooth animation
 * - Hero slider with auto-play, pagination, and swipe support
 * - Smooth scroll for anchor links
 * - Reveal on scroll using IntersectionObserver
 * - Contact form handling
 * - Accessibility enhancements
 */

/* =====================================================
   UTILITIES & HELPERS
   ===================================================== */

/**
 * Debounce function to limit function calls
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttle function to limit function calls during scroll/resize
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/* =====================================================
   NAVIGATION / HAMBURGER MENU
   ===================================================== */

class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.menu = document.getElementById('navbar-menu');
        this.navLinks = document.querySelectorAll('.navbar-link');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.menu) return;

        // Toggle menu on hamburger click
        this.hamburger.addEventListener('click', () => this.toggleMenu());

        // Close menu when a nav link is clicked
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when ESC is pressed
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.menu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const isOpen = this.menu.classList.contains('active');
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.menu.classList.add('active');
        this.hamburger.classList.add('active');
        this.hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    closeMenu() {
        this.menu.classList.remove('active');
        this.hamburger.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scroll
    }
}

/* =====================================================
   HERO SLIDER
   ===================================================== */

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('slider-prev');
        this.nextBtn = document.getElementById('slider-next');
        this.sliderContainer = document.querySelector('.hero-slider');
        
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        this.isHovered = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }

    init() {
        // Show first slide
        this.showSlide(0);

        // Event listeners for buttons
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Event listeners for pagination dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });

        // Auto-play slider
        this.startAutoPlay();

        // Pause on hover
        if (this.sliderContainer) {
            this.sliderContainer.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Pause when slider is out of viewport
        this.setupIntersectionObserver();

        // Swipe support on mobile
        this.setupSwipeGestures();
    }

    showSlide(index) {
        // Validate index
        if (index < 0) {
            this.currentSlide = this.slides.length - 1;
        } else if (index >= this.slides.length) {
            this.currentSlide = 0;
        } else {
            this.currentSlide = index;
        }

        // Update slide visibility
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === this.currentSlide);
        });

        // Update dot indicators
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentSlide);
            dot.setAttribute('aria-pressed', i === this.currentSlide);
        });
    }

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }

    previousSlide() {
        this.showSlide(this.currentSlide - 1);
    }

    startAutoPlay() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAutoPlay();
                } else {
                    this.pauseAutoPlay();
                }
            });
        }, options);

        if (this.sliderContainer) {
            observer.observe(this.sliderContainer);
        }
    }

    setupSwipeGestures() {
        if (!this.sliderContainer) return;

        this.sliderContainer.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, false);

        this.sliderContainer.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, false);
    }

    handleSwipe() {
        const threshold = 50; // Minimum distance for swipe
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swiped left
                this.nextSlide();
            } else {
                // Swiped right
                this.previousSlide();
            }
        }
    }
}

/* =====================================================
   SMOOTH SCROLL & ANCHOR LINKS
   ===================================================== */

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        // Skip if href is just '#'
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        // Smooth scroll
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update URL without page jump
        if (window.history.pushState) {
            window.history.pushState(null, null, href);
        }
    }
}

/* =====================================================
   REVEAL ON SCROLL (IntersectionObserver)
   ===================================================== */

class RevealOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in');
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Stop observing after visibility
                    // observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(el => observer.observe(el));
    }
}

/* =====================================================
   CONTACT FORM HANDLING
   ===================================================== */

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.confirmation = document.getElementById('form-confirmation');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validation
        if (!this.validate(data)) {
            return;
        }

        // Show confirmation message
        this.showConfirmation();

        // Reset form
        this.form.reset();

        // In a real application, you would send the data to a backend
        console.log('Form submitted:', data);
    }

    validate(data) {
        // Check required fields
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    showConfirmation() {
        if (!this.confirmation) return;

        this.confirmation.textContent = 'Thank you! We\'ve received your message. We\'ll get back to you soon.';
        this.confirmation.style.display = 'block';

        // Hide after 5 seconds
        setTimeout(() => {
            this.confirmation.style.display = 'none';
        }, 5000);
    }
}

/* =====================================================
   FOOTER YEAR AUTO-UPDATE
   ===================================================== */

class FooterYear {
    constructor() {
        this.init();
    }

    init() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

/* =====================================================
   KEYBOARD ACCESSIBILITY
   ===================================================== */

class KeyboardNavigation {
    constructor() {
        this.init();
    }

    init() {
        // Hamburger menu keyboard support
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    hamburger.click();
                }
            });
        }

        // Slider button keyboard support
        const sliderBtns = document.querySelectorAll('.slider-btn');
        sliderBtns.forEach(btn => {
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });

        // Dot pagination keyboard support
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dot.click();
                } else if (e.key === 'ArrowRight' && index < dots.length - 1) {
                    dots[index + 1].click();
                    dots[index + 1].focus();
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    dots[index - 1].click();
                    dots[index - 1].focus();
                }
            });
        });
    }
}

/* =====================================================
   INITIALIZATION - RUN ON DOM READY
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new MobileMenu();
    new HeroSlider();
    new SmoothScroll();
    new RevealOnScroll();
    new ContactForm();
    new FooterYear();
    new KeyboardNavigation();

    console.log('✓ Lotus View Portfolio loaded successfully');
});

/* =====================================================
   ACCESSIBILITY ENHANCEMENTS
   ===================================================== */

// Detect if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Handle window resize for responsive menu
window.addEventListener('resize', debounce(() => {
    // Reset menu on desktop view
    if (window.innerWidth > 768) {
        const menu = document.getElementById('navbar-menu');
        const hamburger = document.getElementById('hamburger');
        if (menu && hamburger) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));
