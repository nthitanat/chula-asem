/* ================================
   ASEM Contact Page JavaScript
   Interactive Features & Functionality
   ================================ */

(function() {
    'use strict';

    // Global variables
    let isMenuOpen = false;
    let isSearchOpen = false;
    let scrollPosition = 0;

    // DOM elements
    const elements = {
        mobileMenuButton: null,
        mobileMenu: null,
        searchIcon: null,
        searchOverlay: null,
        searchClose: null,
        searchInput: null,
        scrollToTopButton: null,
        animateElements: null,
        socialButtons: null,
        mapIframe: null,
        contactForm: null
    };

    /* ================================
       INITIALIZATION
       ================================ */

    document.addEventListener('DOMContentLoaded', function() {
        initializeElements();
        setupEventListeners();
        initializeAnimations();
        initializeSocialButtons();
        initializeScrollEffects();
        initializeAccessibility();
        addLoadingEffects();
    });

    function initializeElements() {
        elements.mobileMenuButton = document.querySelector('.fusion-mobile-nav-item');
        elements.mobileMenu = document.querySelector('.fusion-mobile-menu');
        elements.searchIcon = document.querySelector('.fusion-main-menu-search .search-icon');
        elements.searchOverlay = document.querySelector('.fusion-overlay-search');
        elements.searchClose = document.querySelector('.fusion-close-search');
        elements.searchInput = document.querySelector('.fusion-search-field input');
        elements.scrollToTopButton = document.querySelector('.fusion-top-top-link');
        elements.animateElements = document.querySelectorAll('.animate-on-scroll, .fusion-button, .contact-map-wrapper');
        elements.socialButtons = document.querySelectorAll('.social-buttons-container .fusion-button');
        elements.mapIframe = document.querySelector('.contact-map');
        elements.contactForm = document.querySelector('.contact-form');
    }

    function setupEventListeners() {
        // Mobile menu toggle
        if (elements.mobileMenuButton) {
            elements.mobileMenuButton.addEventListener('click', toggleMobileMenu);
        }

        // Search functionality
        if (elements.searchIcon) {
            elements.searchIcon.addEventListener('click', openSearchOverlay);
        }

        if (elements.searchClose) {
            elements.searchClose.addEventListener('click', closeSearchOverlay);
        }

        if (elements.searchOverlay) {
            elements.searchOverlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeSearchOverlay();
                }
            });
        }

        // Scroll to top
        if (elements.scrollToTopButton) {
            elements.scrollToTopButton.addEventListener('click', scrollToTop);
        }

        // Window events
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        // ESC key handling
        document.addEventListener('keyup', function(e) {
            if (e.key === 'Escape') {
                if (isSearchOpen) closeSearchOverlay();
                if (isMenuOpen) closeMobileMenu();
            }
        });

        // Dropdown menu accessibility
        setupDropdownMenus();
        
        // Contact links enhancement
        enhanceContactLinks();
    }

    /* ================================
       MOBILE NAVIGATION
       ================================ */

    function toggleMobileMenu() {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        if (!elements.mobileMenu) return;
        
        isMenuOpen = true;
        elements.mobileMenu.classList.add('active');
        elements.mobileMenuButton.setAttribute('aria-expanded', 'true');
        elements.mobileMenuButton.classList.add('active');
        
        // Add animation class
        elements.mobileMenu.style.animation = 'slideDown 0.3s ease forwards';
        
        // Focus first menu item
        const firstMenuItem = elements.mobileMenu.querySelector('a');
        if (firstMenuItem) {
            firstMenuItem.focus();
        }
    }

    function closeMobileMenu() {
        if (!elements.mobileMenu) return;
        
        isMenuOpen = false;
        elements.mobileMenu.classList.remove('active');
        elements.mobileMenuButton.setAttribute('aria-expanded', 'false');
        elements.mobileMenuButton.classList.remove('active');
        
        // Add animation class
        elements.mobileMenu.style.animation = 'slideUp 0.3s ease forwards';
    }

    /* ================================
       SEARCH FUNCTIONALITY
       ================================ */

    function openSearchOverlay() {
        if (!elements.searchOverlay) return;
        
        isSearchOpen = true;
        elements.searchOverlay.classList.add('active');
        elements.searchOverlay.style.display = 'flex';
        
        // Animate in
        requestAnimationFrame(() => {
            elements.searchOverlay.style.opacity = '1';
        });
        
        // Focus search input
        setTimeout(() => {
            if (elements.searchInput) {
                elements.searchInput.focus();
            }
        }, 300);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeSearchOverlay() {
        if (!elements.searchOverlay) return;
        
        isSearchOpen = false;
        elements.searchOverlay.style.opacity = '0';
        
        setTimeout(() => {
            elements.searchOverlay.classList.remove('active');
            elements.searchOverlay.style.display = 'none';
        }, 300);
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Clear search input
        if (elements.searchInput) {
            elements.searchInput.value = '';
        }
    }

    /* ================================
       DROPDOWN MENUS
       ================================ */

    function setupDropdownMenus() {
        const dropdownItems = document.querySelectorAll('.menu-item-has-children');
        
        dropdownItems.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.sub-menu');
            
            if (link && submenu) {
                // Desktop hover behavior
                item.addEventListener('mouseenter', () => {
                    if (window.innerWidth > 800) {
                        showSubmenu(submenu);
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 800) {
                        hideSubmenu(submenu);
                    }
                });
                
                // Mobile click behavior
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 800) {
                        e.preventDefault();
                        toggleSubmenu(submenu);
                    }
                });
                
                // Keyboard navigation
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        if (window.innerWidth <= 800) {
                            e.preventDefault();
                            toggleSubmenu(submenu);
                        }
                    }
                });
            }
        });
    }

    function showSubmenu(submenu) {
        submenu.style.visibility = 'visible';
        submenu.style.opacity = '1';
        submenu.style.transform = 'translateY(0)';
    }

    function hideSubmenu(submenu) {
        submenu.style.visibility = 'hidden';
        submenu.style.opacity = '0';
        submenu.style.transform = 'translateY(-10px)';
    }

    function toggleSubmenu(submenu) {
        const isVisible = submenu.classList.contains('active');
        
        if (isVisible) {
            submenu.classList.remove('active');
            submenu.style.maxHeight = '0';
        } else {
            submenu.classList.add('active');
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
        }
    }

    /* ================================
       SCROLL EFFECTS
       ================================ */

    function handleScroll() {
        scrollPosition = window.pageYOffset;
        
        // Show/hide scroll to top button
        toggleScrollToTopButton();
        
        // Animate elements on scroll
        animateOnScroll();
        
        // Sticky header effects
        handleStickyHeader();
    }

    function toggleScrollToTopButton() {
        if (!elements.scrollToTopButton) return;
        
        if (scrollPosition > 300) {
            elements.scrollToTopButton.classList.add('visible');
        } else {
            elements.scrollToTopButton.classList.remove('visible');
        }
    }

    function scrollToTop(e) {
        e.preventDefault();
        
        const start = scrollPosition;
        const startTime = performance.now();
        const duration = 800;
        
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeOutCubic(progress);
            
            window.scrollTo(0, start * (1 - easeProgress));
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }
        
        requestAnimationFrame(animateScroll);
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function handleStickyHeader() {
        const header = document.querySelector('.fusion-header-wrapper');
        if (!header) return;
        
        if (scrollPosition > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    /* ================================
       ANIMATIONS
       ================================ */

    function initializeAnimations() {
        // Add initial classes
        elements.animateElements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });
        
        // Setup intersection observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(handleIntersection, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            elements.animateElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for older browsers
            elements.animateElements.forEach(element => {
                element.classList.add('animated');
            });
        }
    }

    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add stagger effect for social buttons
                if (entry.target.closest('.social-buttons-container')) {
                    const buttons = entry.target.closest('.social-buttons-container').querySelectorAll('.fusion-button');
                    buttons.forEach((button, index) => {
                        setTimeout(() => {
                            button.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                        }, index * 100);
                    });
                }
            }
        });
    }

    function animateOnScroll() {
        elements.animateElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }

    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }

    /* ================================
       SOCIAL MEDIA INTERACTIONS
       ================================ */

    function initializeSocialButtons() {
        elements.socialButtons.forEach(button => {
            // Add hover effects
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add click analytics (if needed)
            button.addEventListener('click', function(e) {
                const platform = this.querySelector('.fusion-button-text').textContent.toLowerCase();
                trackSocialClick(platform);
                
                // Add click effect
                this.style.transform = 'translateY(-1px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-3px) scale(1.02)';
                }, 150);
            });
            
            // Accessibility enhancements
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    function trackSocialClick(platform) {
        // Analytics tracking (implement as needed)
        console.log(`Social media click: ${platform}`);
        
        // Example: Google Analytics event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'social_click', {
                'platform': platform,
                'page_title': document.title
            });
        }
    }

    /* ================================
       MAP INTERACTIONS
       ================================ */

    function initializeMapFeatures() {
        if (!elements.mapIframe) return;
        
        const mapContainer = elements.mapIframe.parentElement;
        
        // Add loading state
        mapContainer.classList.add('loading');
        
        // Handle map load
        elements.mapIframe.addEventListener('load', function() {
            mapContainer.classList.remove('loading');
            mapContainer.classList.add('loaded');
            
            // Add smooth entrance animation
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
            }, 100);
        });
        
        // Handle map errors
        elements.mapIframe.addEventListener('error', function() {
            mapContainer.classList.remove('loading');
            mapContainer.classList.add('error');
            
            // Show fallback content
            const fallback = document.createElement('div');
            fallback.className = 'map-fallback';
            fallback.innerHTML = `
                <div class="map-error">
                    <i class="fa fa-map-marker-alt"></i>
                    <p>Map temporarily unavailable</p>
                    <address>
                        Adult Continuing Education<br>
                        University College Cork<br>
                        The Laurels, Western Road<br>
                        Cork, Ireland
                    </address>
                </div>
            `;
            mapContainer.appendChild(fallback);
        });
        
        // Add click to focus behavior
        mapContainer.addEventListener('click', function() {
            elements.mapIframe.focus();
        });
    }

    /* ================================
       CONTACT ENHANCEMENTS
       ================================ */

    function enhanceContactLinks() {
        // Phone number click tracking
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackContactInteraction('phone', this.href);
            });
        });
        
        // Email click tracking
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackContactInteraction('email', this.href);
            });
        });
        
        // Add copy to clipboard functionality
        addCopyToClipboard();
    }

    function addCopyToClipboard() {
        const contactDetails = document.querySelector('.contact-phone-email');
        if (!contactDetails) return;
        
        const phoneText = contactDetails.querySelector('a[href^="tel:"]');
        const emailText = contactDetails.querySelector('a[href^="mailto:"]');
        
        if (phoneText) {
            addCopyButton(phoneText, 'phone');
        }
        
        if (emailText) {
            addCopyButton(emailText, 'email');
        }
    }

    function addCopyButton(element, type) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fa fa-copy"></i>';
        copyBtn.title = `Copy ${type}`;
        copyBtn.setAttribute('aria-label', `Copy ${type} to clipboard`);
        
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const text = element.textContent.trim();
            copyToClipboard(text, type);
        });
        
        element.parentNode.appendChild(copyBtn);
    }

    function copyToClipboard(text, type) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                showCopyFeedback(type, true);
            }, function() {
                showCopyFeedback(type, false);
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showCopyFeedback(type, true);
            } catch (err) {
                showCopyFeedback(type, false);
            }
            
            document.body.removeChild(textArea);
        }
    }

    function showCopyFeedback(type, success) {
        const message = success ? 
            `${type.charAt(0).toUpperCase() + type.slice(1)} copied to clipboard!` : 
            `Failed to copy ${type}`;
        
        showNotification(message, success ? 'success' : 'error');
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function trackContactInteraction(type, value) {
        console.log(`Contact interaction: ${type} - ${value}`);
        
        // Example: Google Analytics event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_interaction', {
                'interaction_type': type,
                'value': value
            });
        }
    }

    /* ================================
       ACCESSIBILITY ENHANCEMENTS
       ================================ */

    function initializeAccessibility() {
        // Skip to content link
        addSkipLink();
        
        // Keyboard navigation for custom elements
        enhanceKeyboardNavigation();
        
        // ARIA labels and descriptions
        enhanceAriaLabels();
        
        // Focus management
        manageFocus();
    }

    function addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link screen-reader-text';
        skipLink.textContent = 'Skip to main content';
        
        skipLink.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        skipLink.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    function enhanceKeyboardNavigation() {
        // Tab trapping in mobile menu
        if (elements.mobileMenu) {
            elements.mobileMenu.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    trapFocus(e, this);
                }
            });
        }
        
        // Tab trapping in search overlay
        if (elements.searchOverlay) {
            elements.searchOverlay.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    trapFocus(e, this);
                }
            });
        }
    }

    function trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    function enhanceAriaLabels() {
        // Add ARIA labels to buttons without text
        const iconButtons = document.querySelectorAll('button:not([aria-label])');
        iconButtons.forEach(button => {
            const icon = button.querySelector('i');
            if (icon) {
                const className = icon.className;
                if (className.includes('search')) {
                    button.setAttribute('aria-label', 'Search');
                } else if (className.includes('menu')) {
                    button.setAttribute('aria-label', 'Toggle menu');
                } else if (className.includes('close')) {
                    button.setAttribute('aria-label', 'Close');
                }
            }
        });
        
        // Enhance map accessibility
        if (elements.mapIframe) {
            elements.mapIframe.setAttribute('title', 'University College Cork Location Map');
        }
    }

    function manageFocus() {
        // Save focus before opening overlays
        let lastFocusedElement = null;
        
        document.addEventListener('focusin', function(e) {
            if (!isSearchOpen && !isMenuOpen) {
                lastFocusedElement = e.target;
            }
        });
        
        // Restore focus when closing overlays
        document.addEventListener('keyup', function(e) {
            if (e.key === 'Escape' && lastFocusedElement) {
                setTimeout(() => {
                    lastFocusedElement.focus();
                }, 100);
            }
        });
    }

    function handleKeyboardNavigation(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    if (!isSearchOpen) {
                        openSearchOverlay();
                    }
                    break;
            }
        }
        
        // Arrow key navigation in menus
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const activeElement = document.activeElement;
            const menuItems = Array.from(document.querySelectorAll('.fusion-menu a, .fusion-mobile-menu a'));
            const currentIndex = menuItems.indexOf(activeElement);
            
            if (currentIndex !== -1) {
                e.preventDefault();
                const nextIndex = e.key === 'ArrowDown' ? 
                    Math.min(currentIndex + 1, menuItems.length - 1) :
                    Math.max(currentIndex - 1, 0);
                menuItems[nextIndex].focus();
            }
        }
    }

    /* ================================
       RESPONSIVE BEHAVIOR
       ================================ */

    function handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 800 && isMenuOpen) {
            closeMobileMenu();
        }
        
        // Hide submenus on mobile
        if (window.innerWidth <= 800) {
            const submenus = document.querySelectorAll('.sub-menu');
            submenus.forEach(submenu => {
                submenu.style.visibility = '';
                submenu.style.opacity = '';
                submenu.style.transform = '';
            });
        }
        
        // Adjust map height on very small screens
        if (elements.mapIframe) {
            if (window.innerWidth <= 480) {
                elements.mapIframe.style.height = '300px';
            } else if (window.innerWidth <= 800) {
                elements.mapIframe.style.height = '400px';
            } else {
                elements.mapIframe.style.height = '550px';
            }
        }
    }

    /* ================================
       LOADING EFFECTS
       ================================ */

    function addLoadingEffects() {
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Remove loading class when everything is loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                
                // Trigger entrance animations
                triggerEntranceAnimations();
            }, 100);
        });
        
        // Initialize map features
        initializeMapFeatures();
    }

    function triggerEntranceAnimations() {
        // Animate header
        const header = document.querySelector('.fusion-header-wrapper');
        if (header) {
            header.style.animation = 'slideInDown 0.8s ease forwards';
        }
        
        // Animate main content
        const main = document.querySelector('#main');
        if (main) {
            main.style.animation = 'fadeInUp 1s ease 0.3s forwards';
            main.style.opacity = '0';
        }
        
        // Animate footer
        const footer = document.querySelector('.fusion-footer');
        if (footer) {
            footer.style.animation = 'fadeInUp 1s ease 0.5s forwards';
            footer.style.opacity = '0';
        }
    }

    /* ================================
       UTILITY FUNCTIONS
       ================================ */

    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
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
        };
    }

    // Apply throttling to scroll handler
    window.addEventListener('scroll', throttle(handleScroll, 16));
    window.addEventListener('resize', debounce(handleResize, 250));

    /* ================================
       ERROR HANDLING
       ================================ */

    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        
        // Graceful degradation for critical features
        if (e.error && e.error.stack && e.error.stack.includes('IntersectionObserver')) {
            // Fallback for intersection observer
            elements.animateElements.forEach(element => {
                element.classList.add('animated');
            });
        }
    });

    /* ================================
       PUBLIC API (if needed)
       ================================ */

    window.ASEMContact = {
        openSearch: openSearchOverlay,
        closeSearch: closeSearchOverlay,
        scrollToTop: scrollToTop,
        toggleMobileMenu: toggleMobileMenu
    };

})();