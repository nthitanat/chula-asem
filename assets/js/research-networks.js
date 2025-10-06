// Research Networks JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            
            // Toggle menu
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            mobileMenuToggle.setAttribute('aria-expanded', !isActive);
            
            // Animate hamburger lines
            hamburgerLines.forEach((line, index) => {
                if (!isActive) {
                    if (index === 0) line.style.transform = 'rotate(45deg) translate(8px, 8px)';
                    if (index === 1) line.style.opacity = '0';
                    if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                hamburgerLines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && 
                !navMenu.contains(event.target) && 
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                hamburgerLines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.focus();
                hamburgerLines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            }
        });
    }
    
    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-animate attribute
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    
    function smoothScroll(target, duration = 1000) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - 80; // Account for fixed nav
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Handle smooth scrolling for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                smoothScroll(targetElement);
                
                // Update focus for accessibility
                setTimeout(() => {
                    targetElement.focus();
                }, 1000);
            }
        });
    });
    
    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        function toggleBackToTop() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
        
        // Show/hide button on scroll
        window.addEventListener('scroll', debounce(toggleBackToTop, 100));
        
        // Scroll to top on click
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==========================================
    // NAVIGATION BAR SCROLL EFFECT
    // ==========================================
    
    const mainNav = document.querySelector('.main-nav');
    
    if (mainNav) {
        function handleNavScroll() {
            if (window.pageYOffset > 100) {
                mainNav.style.background = 'linear-gradient(90deg, rgba(243,241,236,0.98) 0%, rgba(243,241,236,0.95) 100%)';
                mainNav.style.backdropFilter = 'blur(15px)';
            } else {
                mainNav.style.background = 'linear-gradient(90deg, rgba(243,241,236,1) 0%, rgba(243,241,236,0.95) 100%)';
                mainNav.style.backdropFilter = 'blur(10px)';
            }
        }
        
        window.addEventListener('scroll', debounce(handleNavScroll, 10));
    }
    
    // ==========================================
    // NETWORK CARDS ENHANCED INTERACTION
    // ==========================================
    
    const networkCards = document.querySelectorAll('.network-card');
    
    networkCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Keyboard navigation support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.network-link');
                if (link) {
                    link.click();
                }
            }
        });
        
        // Add tabindex for keyboard accessibility
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
    });
    
    // ==========================================
    // STATISTICS COUNTER ANIMATION
    // ==========================================
    
    const statNumbers = document.querySelectorAll('.stat-card h3');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Preserve the "+" symbol if it exists
            const hasPlus = element.textContent.includes('+');
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }, 16);
    }
    
    // Trigger counter animation when stats section comes into view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach((stat, index) => {
                        setTimeout(() => {
                            animateCounter(stat);
                        }, index * 200);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // ==========================================
    // SEARCH FUNCTIONALITY
    // ==========================================
    
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" id="networkSearch" placeholder="Search research networks..." aria-label="Search research networks">
                <button type="button" aria-label="Clear search" class="clear-search" style="display: none;">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <div class="search-results" style="display: none;"></div>
        `;
        
        const networksSection = document.querySelector('.networks-section .container');
        if (networksSection) {
            networksSection.insertBefore(searchContainer, networksSection.firstChild);
            
            const searchInput = document.getElementById('networkSearch');
            const clearButton = searchContainer.querySelector('.clear-search');
            const searchResults = searchContainer.querySelector('.search-results');
            
            searchInput.addEventListener('input', debounce(function() {
                const query = this.value.toLowerCase().trim();
                
                if (query.length > 0) {
                    clearButton.style.display = 'block';
                    filterNetworks(query);
                } else {
                    clearButton.style.display = 'none';
                    showAllNetworks();
                    searchResults.style.display = 'none';
                }
            }, 300));
            
            clearButton.addEventListener('click', function() {
                searchInput.value = '';
                this.style.display = 'none';
                showAllNetworks();
                searchResults.style.display = 'none';
                searchInput.focus();
            });
        }
    }
    
    function filterNetworks(query) {
        const cards = document.querySelectorAll('.network-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.network-description').textContent.toLowerCase();
            const topics = Array.from(card.querySelectorAll('.topic-tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
            
            const isMatch = title.includes(query) || description.includes(query) || topics.includes(query);
            
            if (isMatch) {
                card.style.display = 'flex';
                card.classList.add('search-highlight');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('search-highlight');
            }
        });
        
        updateSearchResults(query, visibleCount);
    }
    
    function showAllNetworks() {
        const cards = document.querySelectorAll('.network-card');
        cards.forEach(card => {
            card.style.display = 'flex';
            card.classList.remove('search-highlight');
        });
    }
    
    function updateSearchResults(query, count) {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.innerHTML = `
                <p>Found ${count} network${count !== 1 ? 's' : ''} matching "${query}"</p>
            `;
            searchResults.style.display = 'block';
        }
    }
    
    // Initialize search functionality
    addSearchFunctionality();
    
    // ==========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================
    
    // Skip links functionality
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Focus management for modals and overlays
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Announce page changes to screen readers
    function announceToScreenReader(message) {
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
    
    // ==========================================
    // PERFORMANCE OPTIMIZATIONS
    // ==========================================
    
    // Debounce function to limit function calls
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
    
    // Lazy loading for images
    function initLazyLoading() {
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
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Preload critical resources
    function preloadResources() {
        const criticalImages = [
            'https://asemlllhub.org/wp-content/uploads/2021/06/elearning.jpg',
            'https://asemlllhub.org/wp-content/uploads/2021/06/workplace-learning.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    preloadResources();
    
    // ==========================================
    // ERROR HANDLING
    // ==========================================
    
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Could send error to analytics service here
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
    
    // ==========================================
    // PAGE VISIBILITY API
    // ==========================================
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause any animations or videos when page is not visible
            console.log('Page is hidden - pausing animations');
        } else {
            // Resume animations when page becomes visible
            console.log('Page is visible - resuming animations');
        }
    });
    
    // ==========================================
    // RESIZE HANDLER
    // ==========================================
    
    const resizeHandler = debounce(function() {
        // Handle window resize events
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && navMenu.classList.contains('active')) {
            // Close mobile menu on resize to desktop
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            hamburgerLines.forEach(line => {
                line.style.transform = 'none';
                line.style.opacity = '1';
            });
        }
        
        // Recalculate scroll positions
        if (mainNav) {
            const navHeight = mainNav.offsetHeight;
            document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
        }
    }, 250);
    
    window.addEventListener('resize', resizeHandler);
    
    // ==========================================
    // PRINT STYLES
    // ==========================================
    
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed content for printing
        const collapsedElements = document.querySelectorAll('[aria-expanded="false"]');
        collapsedElements.forEach(el => {
            el.setAttribute('data-was-collapsed', 'true');
            el.setAttribute('aria-expanded', 'true');
        });
    });
    
    window.addEventListener('afterprint', function() {
        // Restore collapsed state after printing
        const wasCollapsed = document.querySelectorAll('[data-was-collapsed="true"]');
        wasCollapsed.forEach(el => {
            el.setAttribute('aria-expanded', 'false');
            el.removeAttribute('data-was-collapsed');
        });
    });
    
    // ==========================================
    // COOKIE CONSENT (Optional)
    // ==========================================
    
    function initCookieConsent() {
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (!cookieConsent) {
            const consentBanner = document.createElement('div');
            consentBanner.className = 'cookie-consent';
            consentBanner.innerHTML = `
                <div class="cookie-content">
                    <p>This website uses cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.</p>
                    <div class="cookie-buttons">
                        <button class="btn-primary accept-cookies">Accept</button>
                        <button class="btn-secondary decline-cookies">Decline</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(consentBanner);
            
            consentBanner.querySelector('.accept-cookies').addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                consentBanner.remove();
            });
            
            consentBanner.querySelector('.decline-cookies').addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'declined');
                consentBanner.remove();
            });
        }
    }
    
    // Uncomment to enable cookie consent
    // initCookieConsent();
    
    // ==========================================
    // FORM VALIDATION (if forms are added)
    // ==========================================
    
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('error');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // ==========================================
    // INITIALIZE TOOLTIPS
    // ==========================================
    
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }
    
    initTooltips();
    
    // ==========================================
    // FINAL INITIALIZATION
    // ==========================================
    
    // Set initial nav height CSS variable
    if (mainNav) {
        const navHeight = mainNav.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
    }
    
    // Announce page load completion to screen readers
    setTimeout(() => {
        announceToScreenReader('Research Networks page loaded successfully');
    }, 1000);
    
    console.log('Research Networks page initialized successfully');
});