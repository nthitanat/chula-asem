/**
 * South Asia Centre JavaScript
 * ASEM LLL Hub
 * Enhanced interactive functionality with accessibility and performance optimizations
 */

(function() {
    'use strict';

    // Configuration object
    const CONFIG = {
        breakpoints: {
            mobile: 768,
            tablet: 1024
        },
        animation: {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        scroll: {
            offset: 80,
            throttleDelay: 16
        }
    };

    // Utility functions
    const Utils = {
        // Debounce function for performance optimization
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function for scroll events
        throttle(func, delay) {
            let timeoutId;
            let lastExecTime = 0;
            return function(...args) {
                const currentTime = Date.now();
                
                if (currentTime - lastExecTime > delay) {
                    func.apply(this, args);
                    lastExecTime = currentTime;
                } else {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        func.apply(this, args);
                        lastExecTime = Date.now();
                    }, delay - (currentTime - lastExecTime));
                }
            };
        },

        // Check if element is in viewport
        isInViewport(element, offset = 0) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top <= (windowHeight - offset) && rect.bottom >= 0;
        },

        // Smooth scroll to element
        smoothScrollTo(target, duration = 800) {
            const targetPosition = target.offsetTop - CONFIG.scroll.offset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        },

        // Generate unique ID
        generateId() {
            return 'id-' + Math.random().toString(36).substr(2, 9);
        },

        // Announce to screen readers
        announceToScreenReader(message) {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    };

    // Mobile Navigation Handler
    class MobileNavigation {
        constructor() {
            this.nav = document.querySelector('.mobile-nav');
            this.toggle = document.querySelector('.mobile-nav-toggle');
            this.close = document.querySelector('.mobile-nav-close');
            this.overlay = document.querySelector('.mobile-nav-overlay');
            this.hamburgerLines = document.querySelectorAll('.hamburger-line');
            this.isOpen = false;
            
            this.init();
        }

        init() {
            if (!this.nav || !this.toggle) return;

            // Set initial ARIA attributes
            this.toggle.setAttribute('aria-expanded', 'false');
            this.toggle.setAttribute('aria-controls', this.nav.id || Utils.generateId());
            
            if (!this.nav.id) {
                this.nav.id = Utils.generateId();
            }

            // Event listeners
            this.toggle.addEventListener('click', (e) => this.handleToggle(e));
            this.close?.addEventListener('click', (e) => this.handleClose(e));
            this.overlay?.addEventListener('click', (e) => this.handleClose(e));
            
            // Close on escape key
            document.addEventListener('keydown', (e) => this.handleKeydown(e));
            
            // Handle window resize
            window.addEventListener('resize', Utils.throttle(() => {
                if (window.innerWidth > CONFIG.breakpoints.mobile && this.isOpen) {
                    this.closeMobileNav();
                }
            }, 250));

            // Handle navigation links
            this.nav.addEventListener('click', (e) => {
                if (e.target.matches('a[href^="#"]')) {
                    this.handleNavLinkClick(e);
                }
            });
        }

        handleToggle(e) {
            e.preventDefault();
            this.isOpen ? this.closeMobileNav() : this.openMobileNav();
        }

        handleClose(e) {
            e.preventDefault();
            this.closeMobileNav();
        }

        handleKeydown(e) {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMobileNav();
                this.toggle.focus();
            }
        }

        handleNavLinkClick(e) {
            const href = e.target.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    this.closeMobileNav();
                    setTimeout(() => {
                        Utils.smoothScrollTo(target);
                        target.focus();
                    }, 300);
                }
            } else {
                this.closeMobileNav();
            }
        }

        openMobileNav() {
            this.isOpen = true;
            this.nav.classList.add('active');
            this.overlay?.classList.add('active');
            this.toggle.classList.add('active');
            
            // Update ARIA attributes
            this.toggle.setAttribute('aria-expanded', 'true');
            
            // Animate hamburger
            this.animateHamburger(true);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Focus first nav item
            const firstNavItem = this.nav.querySelector('a');
            if (firstNavItem) {
                setTimeout(() => firstNavItem.focus(), 100);
            }
            
            Utils.announceToScreenReader('Mobile navigation opened');
        }

        closeMobileNav() {
            this.isOpen = false;
            this.nav.classList.remove('active');
            this.overlay?.classList.remove('active');
            this.toggle.classList.remove('active');
            
            // Update ARIA attributes
            this.toggle.setAttribute('aria-expanded', 'false');
            
            // Animate hamburger
            this.animateHamburger(false);
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            Utils.announceToScreenReader('Mobile navigation closed');
        }

        animateHamburger(isOpen) {
            this.hamburgerLines.forEach((line, index) => {
                if (isOpen) {
                    line.style.transform = index === 0 ? 'rotate(45deg) translate(6px, 6px)' :
                                         index === 1 ? 'opacity(0)' :
                                         'rotate(-45deg) translate(6px, -6px)';
                } else {
                    line.style.transform = '';
                }
            });
        }
    }

    // Scroll Animation Handler
    class ScrollAnimations {
        constructor() {
            this.elements = [];
            this.observer = null;
            this.init();
        }

        init() {
            // Find all animatable elements
            this.elements = [
                ...document.querySelectorAll('.collaboration-card'),
                ...document.querySelectorAll('.stat-item'),
                ...document.querySelectorAll('.coordinator-card'),
                ...document.querySelectorAll('.collaboration-info'),
                ...document.querySelectorAll('.conference-content'),
                ...document.querySelectorAll('.about-content'),
                ...document.querySelectorAll('.cta-content')
            ];

            if (this.elements.length === 0) return;

            // Set up Intersection Observer for better performance
            this.setupIntersectionObserver();
        }

        setupIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '-50px 0px',
                threshold: 0.1
            };

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, options);

            // Observe all elements
            this.elements.forEach(element => {
                // Set initial state
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = `opacity 0.6s ${CONFIG.animation.easing}, transform 0.6s ${CONFIG.animation.easing}`;
                
                this.observer.observe(element);
            });
        }

        animateElement(element) {
            // Add staggered delay for grid items
            const delay = this.getAnimationDelay(element);
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }

        getAnimationDelay(element) {
            if (element.classList.contains('collaboration-card') || 
                element.classList.contains('stat-item')) {
                const siblings = [...element.parentNode.children];
                const index = siblings.indexOf(element);
                return index * 100;
            }
            return 0;
        }
    }

    // Smooth Scrolling Handler
    class SmoothScrolling {
        constructor() {
            this.init();
        }

        init() {
            // Handle all anchor links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="#"]');
                if (link) {
                    this.handleAnchorClick(e, link);
                }
            });

            // Handle desktop navigation dropdowns
            this.setupDesktopNav();
        }

        handleAnchorClick(e, link) {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                Utils.smoothScrollTo(target);
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
                
                // Announce navigation
                Utils.announceToScreenReader(`Navigating to ${target.getAttribute('aria-labelledby') || href}`);
            }
        }

        setupDesktopNav() {
            const dropdowns = document.querySelectorAll('.dropdown');
            
            dropdowns.forEach(dropdown => {
                const trigger = dropdown.querySelector('a');
                const menu = dropdown.querySelector('.dropdown-menu');
                
                if (!trigger || !menu) return;

                // Set up ARIA attributes
                const menuId = Utils.generateId();
                menu.id = menuId;
                trigger.setAttribute('aria-haspopup', 'true');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.setAttribute('aria-controls', menuId);

                // Mouse events
                dropdown.addEventListener('mouseenter', () => {
                    trigger.setAttribute('aria-expanded', 'true');
                });

                dropdown.addEventListener('mouseleave', () => {
                    trigger.setAttribute('aria-expanded', 'false');
                });

                // Keyboard events
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        trigger.setAttribute('aria-expanded', 'true');
                        const firstMenuItem = menu.querySelector('a');
                        if (firstMenuItem) firstMenuItem.focus();
                    }
                });

                // Menu keyboard navigation
                menu.addEventListener('keydown', (e) => {
                    const menuItems = [...menu.querySelectorAll('a')];
                    const currentIndex = menuItems.indexOf(e.target);

                    switch (e.key) {
                        case 'ArrowDown':
                            e.preventDefault();
                            const nextIndex = (currentIndex + 1) % menuItems.length;
                            menuItems[nextIndex].focus();
                            break;
                        case 'ArrowUp':
                            e.preventDefault();
                            const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
                            menuItems[prevIndex].focus();
                            break;
                        case 'Escape':
                            e.preventDefault();
                            trigger.setAttribute('aria-expanded', 'false');
                            trigger.focus();
                            break;
                    }
                });
            });
        }
    }

    // Header Scroll Handler
    class HeaderScroll {
        constructor() {
            this.header = document.querySelector('.header');
            this.lastScrollY = window.pageYOffset;
            this.init();
        }

        init() {
            if (!this.header) return;

            window.addEventListener('scroll', Utils.throttle(() => {
                this.handleScroll();
            }, CONFIG.scroll.throttleDelay));
        }

        handleScroll() {
            const currentScrollY = window.pageYOffset;
            
            // Add scrolled class for styling
            if (currentScrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            this.lastScrollY = currentScrollY;
        }
    }

    // Back to Top Button
    class BackToTop {
        constructor() {
            this.button = document.querySelector('.back-to-top');
            this.init();
        }

        init() {
            if (!this.button) return;

            // Set initial ARIA attributes
            this.button.setAttribute('aria-label', 'Go to top of page');

            // Show/hide on scroll
            window.addEventListener('scroll', Utils.throttle(() => {
                this.toggleVisibility();
            }, 100));

            // Click handler
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToTop();
            });

            // Keyboard handler
            this.button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.scrollToTop();
                }
            });
        }

        toggleVisibility() {
            const scrollY = window.pageYOffset;
            const isVisible = this.button.classList.contains('visible');

            if (scrollY > 500 && !isVisible) {
                this.button.classList.add('visible');
            } else if (scrollY <= 500 && isVisible) {
                this.button.classList.remove('visible');
            }
        }

        scrollToTop() {
            const startPosition = window.pageYOffset;
            const duration = 800;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuart(timeElapsed, startPosition, -startPosition, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function easeInOutQuart(t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t*t + b;
                t -= 2;
                return -c/2 * (t*t*t*t - 2) + b;
            }

            requestAnimationFrame(animation);
            Utils.announceToScreenReader('Scrolling to top of page');
        }
    }

    // Statistics Counter Animation
    class StatisticsCounter {
        constructor() {
            this.counters = document.querySelectorAll('.stat-number[data-count]');
            this.init();
        }

        init() {
            if (this.counters.length === 0) return;

            // Set up intersection observer for counters
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            this.counters.forEach(counter => {
                observer.observe(counter);
            });
        }

        animateCounter(counter) {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        }
    }

    // Search Functionality (for future enhancement)
    class SearchHandler {
        constructor() {
            this.searchInput = document.querySelector('.search-input');
            this.searchResults = document.querySelector('.search-results');
            this.init();
        }

        init() {
            if (!this.searchInput) return;

            this.searchInput.addEventListener('input', Utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));

            // Keyboard navigation for results
            this.searchInput.addEventListener('keydown', (e) => {
                this.handleSearchKeydown(e);
            });
        }

        handleSearch(query) {
            if (query.length < 2) {
                this.hideResults();
                return;
            }

            // Simple content search (can be enhanced with proper search implementation)
            const content = this.getPageContent();
            const results = this.searchContent(content, query);
            this.displayResults(results);
        }

        getPageContent() {
            const sections = document.querySelectorAll('section[aria-labelledby]');
            return [...sections].map(section => ({
                title: section.querySelector('h2, h3')?.textContent || '',
                content: section.textContent,
                element: section
            }));
        }

        searchContent(content, query) {
            const queryLower = query.toLowerCase();
            return content.filter(item => 
                item.title.toLowerCase().includes(queryLower) ||
                item.content.toLowerCase().includes(queryLower)
            ).slice(0, 5);
        }

        displayResults(results) {
            if (!this.searchResults) return;

            this.searchResults.innerHTML = results.map(result => `
                <div class="search-result">
                    <h4>${this.highlightMatch(result.title)}</h4>
                    <p>${this.highlightMatch(result.content.substring(0, 150))}...</p>
                </div>
            `).join('');

            this.showResults();
        }

        highlightMatch(text) {
            // Simple highlighting (can be enhanced)
            return text;
        }

        showResults() {
            if (this.searchResults) {
                this.searchResults.style.display = 'block';
            }
        }

        hideResults() {
            if (this.searchResults) {
                this.searchResults.style.display = 'none';
            }
        }

        handleSearchKeydown(e) {
            // Handle arrow keys for result navigation
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.focusNextResult();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.focusPrevResult();
                    break;
                case 'Escape':
                    this.hideResults();
                    break;
            }
        }

        focusNextResult() {
            // Implementation for keyboard navigation
        }

        focusPrevResult() {
            // Implementation for keyboard navigation
        }
    }

    // Accessibility Enhancements
    class AccessibilityEnhancements {
        constructor() {
            this.init();
        }

        init() {
            this.setupSkipLinks();
            this.setupFocusManagement();
            this.setupKeyboardNavigation();
            this.setupReducedMotion();
            this.setupHighContrast();
        }

        setupSkipLinks() {
            const skipLinks = document.querySelectorAll('.skip-link');
            skipLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.focus();
                        target.scrollIntoView();
                    }
                });
            });
        }

        setupFocusManagement() {
            // Ensure interactive elements are properly focusable
            const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
            
            interactiveElements.forEach(element => {
                element.addEventListener('focus', () => {
                    element.classList.add('focused');
                });

                element.addEventListener('blur', () => {
                    element.classList.remove('focused');
                });
            });
        }

        setupKeyboardNavigation() {
            // Global keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Alt + M for main content
                if (e.altKey && e.key === 'm') {
                    e.preventDefault();
                    const main = document.querySelector('main');
                    if (main) {
                        main.focus();
                        main.scrollIntoView();
                    }
                }

                // Alt + N for navigation
                if (e.altKey && e.key === 'n') {
                    e.preventDefault();
                    const nav = document.querySelector('nav');
                    if (nav) {
                        const firstLink = nav.querySelector('a');
                        if (firstLink) firstLink.focus();
                    }
                }
            });
        }

        setupReducedMotion() {
            // Check for reduced motion preference
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
                
                // Disable scroll animations
                const style = document.createElement('style');
                style.textContent = `
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                `;
                document.head.appendChild(style);
            }
        }

        setupHighContrast() {
            // Enhanced contrast support
            if (window.matchMedia('(prefers-contrast: high)').matches) {
                document.body.classList.add('high-contrast');
            }
        }
    }

    // Performance Optimizations
    class PerformanceOptimizer {
        constructor() {
            this.init();
        }

        init() {
            this.setupLazyLoading();
            this.setupResourcePreloading();
            this.setupErrorHandling();
            this.setupPageVisibility();
        }

        setupLazyLoading() {
            // Lazy load images
            const images = document.querySelectorAll('img[data-src]');
            if ('IntersectionObserver' in window && images.length > 0) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            }
        }

        setupResourcePreloading() {
            // Preload critical resources
            const criticalResources = [
                '/fonts/roboto-regular.woff2',
                '/fonts/poppins-semibold.woff2'
            ];

            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'font';
                link.type = 'font/woff2';
                link.href = resource;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
        }

        setupErrorHandling() {
            // Global error handling
            window.addEventListener('error', (e) => {
                console.error('JavaScript Error:', e.error);
                
                // Optional: Send error to analytics
                // Analytics.trackError(e.error);
            });

            window.addEventListener('unhandledrejection', (e) => {
                console.error('Unhandled Promise Rejection:', e.reason);
                
                // Optional: Send error to analytics
                // Analytics.trackError(e.reason);
            });
        }

        setupPageVisibility() {
            // Pause animations when page is not visible
            document.addEventListener('visibilitychange', () => {
                const isVisible = !document.hidden;
                
                if (!isVisible) {
                    // Pause resource-intensive operations
                    document.body.classList.add('page-hidden');
                } else {
                    document.body.classList.remove('page-hidden');
                }
            });
        }
    }

    // Main Application
    class SouthAsiaCentreApp {
        constructor() {
            this.components = [];
            this.init();
        }

        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
        }

        initializeComponents() {
            try {
                // Initialize all components
                this.components = [
                    new MobileNavigation(),
                    new ScrollAnimations(),
                    new SmoothScrolling(),
                    new HeaderScroll(),
                    new BackToTop(),
                    new StatisticsCounter(),
                    new SearchHandler(),
                    new AccessibilityEnhancements(),
                    new PerformanceOptimizer()
                ];

                // Mark app as initialized
                document.body.classList.add('app-initialized');
                
                Utils.announceToScreenReader('South Asia Centre page loaded and ready for interaction');

            } catch (error) {
                console.error('Error initializing South Asia Centre app:', error);
            }
        }

        // Public method to destroy the app (cleanup)
        destroy() {
            this.components.forEach(component => {
                if (typeof component.destroy === 'function') {
                    component.destroy();
                }
            });
            this.components = [];
        }
    }

    // Initialize the application
    const app = new SouthAsiaCentreApp();

    // Make app available globally for debugging
    if (typeof window !== 'undefined') {
        window.SouthAsiaCentreApp = app;
    }

    // Additional utility functions for future enhancements
    window.SouthAsiaCentreUtils = {
        smoothScrollTo: Utils.smoothScrollTo,
        announceToScreenReader: Utils.announceToScreenReader,
        debounce: Utils.debounce,
        throttle: Utils.throttle
    };

})();