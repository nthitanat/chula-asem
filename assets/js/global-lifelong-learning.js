// Global Lifelong Learning Week 2024 - Interactive Features

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initScrollEffects();
    initAccessibilityFeatures();
    initPerformanceOptimizations();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Handle escape key to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll([
        '.summary-card',
        '.content-card',
        '.sidebar-card',
        '.topic-card',
        '.conference-item'
    ].join(', '));
    
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
    
    // Add CSS for animations if not already present
    if (!document.querySelector('#scroll-animations-css')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations-css';
        style.textContent = `
            .animate-ready {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }
            
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .animate-ready:nth-child(1) { transition-delay: 0.1s; }
            .animate-ready:nth-child(2) { transition-delay: 0.2s; }
            .animate-ready:nth-child(3) { transition-delay: 0.3s; }
            .animate-ready:nth-child(4) { transition-delay: 0.4s; }
        `;
        document.head.appendChild(style);
    }
}

// Scroll Effects (Header background, etc.)
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background blur on scroll
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // Add corresponding CSS
    if (!document.querySelector('#scroll-effects-css')) {
        const style = document.createElement('style');
        style.id = 'scroll-effects-css';
        style.textContent = `
            .header {
                transition: all 0.3s ease;
            }
            
            .header.scrolled {
                backdrop-filter: blur(10px);
                background: linear-gradient(90deg, rgba(41,175,160,0.95) 0%, rgba(24,80,116,0.95) 56%, rgba(21,40,96,0.95) 100%);
            }
            
            .header.hidden {
                transform: translateY(-100%);
            }
        `;
        document.head.appendChild(style);
    }
}

// Content Section Interactions
function initContentInteractions() {
    // Add interactive hover effects to cards
    const interactiveCards = document.querySelectorAll('.summary-card, .topic-card, .conference-item');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add click handlers for expandable content
    const contentHeaders = document.querySelectorAll('.content-header');
    
    contentHeaders.forEach(header => {
        const card = header.closest('.content-card');
        const body = card.querySelector('.content-body');
        
        if (body && body.scrollHeight > 400) {
            header.style.cursor = 'pointer';
            header.setAttribute('aria-expanded', 'true');
            
            header.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    body.style.maxHeight = '400px';
                    body.style.overflow = 'hidden';
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    body.style.maxHeight = 'none';
                    body.style.overflow = 'visible';
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
}

// Accessibility Enhancements
function initAccessibilityFeatures() {
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #232d60;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhance focus management
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // Add focus styles
    if (!document.querySelector('#accessibility-css')) {
        const style = document.createElement('style');
        style.id = 'accessibility-css';
        style.textContent = `
            .focused {
                outline: 2px solid #27a29a !important;
                outline-offset: 2px !important;
            }
            
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Keyboard navigation for mobile menu
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.addEventListener('keydown', function(e) {
            const focusableElements = this.querySelectorAll('a');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounced resize handler
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Handle responsive adjustments
            const isMobile = window.innerWidth <= 768;
            const sidebar = document.querySelector('.content-sidebar');
            
            if (sidebar) {
                if (isMobile) {
                    sidebar.style.position = 'static';
                } else {
                    sidebar.style.position = 'sticky';
                }
            }
        }, 250);
    });
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Poppins:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Search and Filter Functionality (for future enhancement)
function initSearchFilter() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimer;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                const query = this.value.toLowerCase();
                const searchableElements = document.querySelectorAll('[data-searchable]');
                
                searchableElements.forEach(element => {
                    const text = element.textContent.toLowerCase();
                    const isVisible = text.includes(query) || query === '';
                    element.style.display = isVisible ? '' : 'none';
                });
            }, 300);
        });
    }
}

// Form Enhancements
function initFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add loading states
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
        });
        
        // Validate email fields
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            field.addEventListener('blur', function() {
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
                this.classList.toggle('invalid', !isValid && this.value !== '');
            });
        });
    });
}

// Cookie Consent (if needed)
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        const consentBanner = document.createElement('div');
        consentBanner.className = 'cookie-consent';
        consentBanner.innerHTML = `
            <div class="cookie-content">
                <p>This website uses cookies to improve your experience. <a href="#privacy" target="_blank">Learn more</a></p>
                <div class="cookie-actions">
                    <button class="cookie-accept">Accept</button>
                    <button class="cookie-decline">Decline</button>
                </div>
            </div>
        `;
        
        // Add styles
        consentBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #232d60;
            color: white;
            padding: 1rem;
            z-index: 10000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(consentBanner);
        
        // Show banner
        setTimeout(() => {
            consentBanner.style.transform = 'translateY(0)';
        }, 1000);
        
        // Handle consent
        consentBanner.querySelector('.cookie-accept').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            consentBanner.remove();
        });
        
        consentBanner.querySelector('.cookie-decline').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            consentBanner.remove();
        });
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.warn('Non-critical error occurred:', e.error);
    // Could implement error reporting here
});

// Page Visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause non-essential animations/processes
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations/processes
        document.body.classList.remove('page-hidden');
    }
});

// Initialize all features when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initContentInteractions();
        initSearchFilter();
        initFormEnhancements();
        
        // Optional: Initialize cookie consent
        // initCookieConsent();
    });
} else {
    // DOM is already loaded
    initContentInteractions();
    initSearchFilter();
    initFormEnhancements();
}

// Export functions for potential external use
window.GlobalLLLWeek = {
    initMobileNavigation,
    initScrollAnimations,
    initSmoothScrolling,
    initAccessibilityFeatures,
    initPerformanceOptimizations
};