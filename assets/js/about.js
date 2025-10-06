// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    initializeNavigation();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Back to top button
    initializeBackToTop();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Header scroll effects
    initializeHeaderScrollEffects();
    
    // Image lazy loading and optimization
    initializeImageOptimization();
    
    // Accessibility improvements
    initializeAccessibility();
});

// Navigation Functions
function initializeNavigation() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger icon
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger icon
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.text-content, .visual-content, .partner-card, .document-link');
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                
                // Add staggered animation for partner cards
                if (entry.target.classList.contains('partner-card')) {
                    const index = Array.from(document.querySelectorAll('.partner-card')).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effects
function initializeHeaderScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        let lastScrollTop = 0;
        let ticking = false;
        
        function updateHeader() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }
}

// Image Optimization and Lazy Loading
function initializeImageOptimization() {
    const images = document.querySelectorAll('img');
    
    // Add loading animation to images
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.warn('Failed to load image:', this.src);
        });
        
        // Set initial opacity for smooth loading
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
    
    // Optimize PDF preview interactions
    const pdfLinks = document.querySelectorAll('.pdf-link');
    pdfLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Accessibility Improvements
function initializeAccessibility() {
    // Add keyboard navigation for dropdowns
    const dropdownTriggers = document.querySelectorAll('.nav-menu li:has(.dropdown)');
    
    dropdownTriggers.forEach(trigger => {
        const link = trigger.querySelector('a');
        const dropdown = trigger.querySelector('.dropdown');
        
        if (link && dropdown) {
            // Handle keyboard events
            link.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown' || e.key === 'Enter') {
                    e.preventDefault();
                    const firstDropdownLink = dropdown.querySelector('a');
                    if (firstDropdownLink) {
                        firstDropdownLink.focus();
                    }
                }
            });
            
            // Handle dropdown navigation
            const dropdownLinks = dropdown.querySelectorAll('a');
            dropdownLinks.forEach((dropdownLink, index) => {
                dropdownLink.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextLink = dropdownLinks[index + 1];
                        if (nextLink) {
                            nextLink.focus();
                        }
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (index === 0) {
                            link.focus();
                        } else {
                            const prevLink = dropdownLinks[index - 1];
                            if (prevLink) {
                                prevLink.focus();
                            }
                        }
                    } else if (e.key === 'Escape') {
                        e.preventDefault();
                        link.focus();
                    }
                });
            });
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #1d7184';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add ARIA labels for social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        const platform = link.querySelector('i').className.split('-')[1];
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `Visit our ${platform} page`);
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeScrollAnimations,
        initializeBackToTop,
        initializeSmoothScrolling,
        debounce,
        throttle
    };
}