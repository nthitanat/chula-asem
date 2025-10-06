/**
 * ASEM LLL Hub - Main Navigation JavaScript
 * Unified navigation functionality for all pages
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initAccessibility();
    });

    /**
     * Initialize navigation functionality
     */
    function initNavigation() {
        const navToggle = document.getElementById('asem-nav-toggle');
        const navMenu = document.getElementById('asem-nav-menu');
        const dropdownItems = document.querySelectorAll('.asem-nav-menu .has-dropdown');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMobileMenu(navToggle, navMenu);
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    closeMobileMenu(navToggle, navMenu);
                }
            });

            // Close mobile menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeMobileMenu(navToggle, navMenu);
                }
            });
        }

        // Handle dropdown menus on mobile
        dropdownItems.forEach(function(item) {
            const link = item.querySelector('a');
            const dropdown = item.querySelector('.asem-dropdown');

            if (link && dropdown) {
                // Add click handler for mobile
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        toggleDropdown(item);
                    }
                });

                // Add keyboard navigation
                link.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            toggleDropdown(item);
                        }
                    }
                });
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    closeMobileMenu(navToggle, navMenu);
                    closeAllDropdowns();
                }
            }, 250);
        });
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu(toggle, menu) {
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu(toggle, menu);
        } else {
            openMobileMenu(toggle, menu);
        }
    }

    /**
     * Open mobile menu
     */
    function openMobileMenu(toggle, menu) {
        toggle.classList.add('active');
        menu.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        
        // Trap focus in mobile menu
        trapFocus(menu);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu(toggle, menu) {
        if (toggle && menu) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            
            // Remove focus trap
            removeFocusTrap();
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Close all dropdowns
            closeAllDropdowns();
        }
    }

    /**
     * Toggle dropdown menu
     */
    function toggleDropdown(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other dropdowns first
        closeAllDropdowns();
        
        if (!isActive) {
            item.classList.add('active');
        }
    }

    /**
     * Close all dropdown menus
     */
    function closeAllDropdowns() {
        const activeDropdowns = document.querySelectorAll('.asem-nav-menu .has-dropdown.active');
        activeDropdowns.forEach(function(item) {
            item.classList.remove('active');
        });
    }

    /**
     * Initialize accessibility features
     */
    function initAccessibility() {
        // Add ARIA attributes
        const navToggle = document.getElementById('asem-nav-toggle');
        const navMenu = document.getElementById('asem-nav-menu');

        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-controls', 'asem-nav-menu');
            navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        }

        // Add role attributes to dropdown menus
        const dropdowns = document.querySelectorAll('.asem-dropdown');
        dropdowns.forEach(function(dropdown, index) {
            dropdown.setAttribute('role', 'menu');
            dropdown.setAttribute('id', 'dropdown-menu-' + index);
            
            const parentLink = dropdown.parentElement.querySelector('a');
            if (parentLink) {
                parentLink.setAttribute('aria-haspopup', 'true');
                parentLink.setAttribute('aria-expanded', 'false');
                parentLink.setAttribute('aria-controls', 'dropdown-menu-' + index);
            }
        });
    }

    /**
     * Trap focus within an element
     */
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
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

    /**
     * Remove focus trap
     */
    function removeFocusTrap() {
        const navMenu = document.getElementById('asem-nav-menu');
        if (navMenu) {
            // Clone and replace to remove event listeners
            const newNavMenu = navMenu.cloneNode(true);
            navMenu.parentNode.replaceChild(newNavMenu, navMenu);
        }
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.asem-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navToggle = document.getElementById('asem-nav-toggle');
                    const navMenu = document.getElementById('asem-nav-menu');
                    closeMobileMenu(navToggle, navMenu);
                }
            });
        });
    }

    // Initialize smooth scroll
    document.addEventListener('DOMContentLoaded', initSmoothScroll);

})();