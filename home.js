// ASEM Lifelong Learning Hub - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeCounters();
    initializeNewsSlider();
    initializeHeroControls();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeSmoothScrolling();
    
    // Counter Animation
    function initializeCounters() {
        const counters = document.querySelectorAll('.display-counter');
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-value'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += step;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        // Intersection Observer for counter animation
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        setTimeout(() => animateCounter(counter), 200);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // News Slider Functionality
    function initializeNewsSlider() {
        const slides = document.querySelectorAll('.news-slide');
        const bullets = document.querySelectorAll('.bullet');
        let currentSlide = 0;
        
        if (slides.length === 0) return;
        
        // Auto-play interval
        const autoPlayInterval = 5000;
        let autoPlay;
        
        const showSlide = (index) => {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            bullets.forEach(bullet => bullet.classList.remove('active'));
            
            // Show current slide
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (bullets[index]) {
                bullets[index].classList.add('active');
            }
            
            currentSlide = index;
        };
        
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };
        
        const startAutoPlay = () => {
            autoPlay = setInterval(nextSlide, autoPlayInterval);
        };
        
        const stopAutoPlay = () => {
            if (autoPlay) {
                clearInterval(autoPlay);
            }
        };
        
        // Bullet click handlers
        bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                stopAutoPlay();
                showSlide(index);
                startAutoPlay();
            });
        });
        
        // Mouse enter/leave handlers for pause/resume
        const newsSliderSection = document.querySelector('.news-slider-section');
        if (newsSliderSection) {
            newsSliderSection.addEventListener('mouseenter', stopAutoPlay);
            newsSliderSection.addEventListener('mouseleave', startAutoPlay);
        }
        
        // Initialize first slide and start autoplay
        showSlide(0);
        startAutoPlay();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && slides.length > 0) {
                stopAutoPlay();
                currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
                showSlide(currentSlide);
                startAutoPlay();
            } else if (e.key === 'ArrowRight' && slides.length > 0) {
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            }
        });
    }
    
    // Hero Video Controls
    function initializeHeroControls() {
        const muteBtn = document.querySelector('.mute-btn');
        const unmuteBtn = document.querySelector('.unmute-btn');
        const restartBtn = document.querySelector('.restart-btn');
        const heroVideo = document.querySelector('.hero-video-bg iframe');
        
        if (!heroVideo) return;
        
        // Note: YouTube iframe API would be needed for full control
        // These are placeholder functions for the button interactions
        
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                // YouTube API: player.mute()
                console.log('Video muted');
                muteBtn.style.display = 'none';
                if (unmuteBtn) unmuteBtn.style.display = 'block';
            });
        }
        
        if (unmuteBtn) {
            unmuteBtn.addEventListener('click', () => {
                // YouTube API: player.unMute()
                console.log('Video unmuted');
                unmuteBtn.style.display = 'none';
                if (muteBtn) muteBtn.style.display = 'block';
            });
        }
        
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                // YouTube API: player.seekTo(0)
                console.log('Video restarted');
                // Reload iframe as a simple restart method
                const src = heroVideo.src;
                heroVideo.src = src;
            });
        }
    }
    
    // Mobile Menu Toggle
    function initializeMobileMenu() {
        const mobileMenuIcon = document.querySelector('.fusion-mobile-menu-icons a');
        const mainMenu = document.querySelector('.fusion-main-menu');
        const menuItems = document.querySelectorAll('.fusion-dropdown-menu');
        
        if (!mobileMenuIcon || !mainMenu) return;
        
        let menuOpen = false;
        
        mobileMenuIcon.addEventListener('click', (e) => {
            e.preventDefault();
            menuOpen = !menuOpen;
            
            if (menuOpen) {
                mainMenu.style.display = 'block';
                mainMenu.style.position = 'absolute';
                mainMenu.style.top = '100%';
                mainMenu.style.left = '0';
                mainMenu.style.right = '0';
                mainMenu.style.background = '#fff';
                mainMenu.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                mainMenu.style.zIndex = '1000';
                
                const menu = mainMenu.querySelector('.fusion-menu');
                if (menu) {
                    menu.style.flexDirection = 'column';
                    menu.style.padding = '20px';
                }
                
                mobileMenuIcon.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mainMenu.style.display = '';
                mainMenu.style.position = '';
                mainMenu.style.top = '';
                mainMenu.style.left = '';
                mainMenu.style.right = '';
                mainMenu.style.background = '';
                mainMenu.style.boxShadow = '';
                
                const menu = mainMenu.querySelector('.fusion-menu');
                if (menu) {
                    menu.style.flexDirection = '';
                    menu.style.padding = '';
                }
                
                mobileMenuIcon.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Handle dropdown menus on mobile
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.sub-menu');
            
            if (link && submenu) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        
                        const isOpen = submenu.style.display === 'block';
                        
                        // Close all other submenus
                        document.querySelectorAll('.sub-menu').forEach(menu => {
                            menu.style.display = 'none';
                        });
                        
                        // Toggle current submenu
                        if (!isOpen) {
                            submenu.style.display = 'block';
                            submenu.style.position = 'static';
                            submenu.style.opacity = '1';
                            submenu.style.visibility = 'visible';
                            submenu.style.transform = 'none';
                        }
                    }
                });
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuOpen && !e.target.closest('.fusion-header')) {
                mobileMenuIcon.click();
            }
        });
    }
    
    // Scroll Effects
    function initializeScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Elements to animate on scroll
        const animateElements = document.querySelectorAll('.content-box, .partner-logo, .fusion-counter-box');
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.fusion-slider-visibility');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    // Smooth Scrolling for Navigation Links
    function initializeSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#' || href === '#home') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.fusion-header-wrapper').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Header Scroll Effect
    function initializeHeaderScrollEffect() {
        const header = document.querySelector('.fusion-header-wrapper');
        let lastScrollTop = 0;
        
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
        
        header.style.transition = 'transform 0.3s ease';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.width = '100%';
        header.style.zIndex = '1000';
        
        // Add padding to body to account for fixed header
        document.body.style.paddingTop = header.offsetHeight + 'px';
    }
    
    // Initialize sticky header after a short delay
    setTimeout(initializeHeaderScrollEffect, 100);
    
    // Lazy Loading for Images
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    initializeLazyLoading();
    
    // Form Handling (if contact forms are added)
    function initializeFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic form validation
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#e74c3c';
                    } else {
                        input.style.borderColor = '#ddd';
                    }
                });
                
                if (isValid) {
                    // Form submission would go here
                    console.log('Form submitted successfully');
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.textContent = 'Thank you for your message! We will get back to you soon.';
                    successMsg.style.cssText = `
                        background: #2ecc71;
                        color: white;
                        padding: 15px;
                        border-radius: 5px;
                        margin-top: 10px;
                        text-align: center;
                    `;
                    
                    form.appendChild(successMsg);
                    form.reset();
                    
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                }
            });
        });
    }
    
    initializeFormHandling();
    
    // Search Functionality (if search is added)
    function initializeSearch() {
        const searchInput = document.querySelector('input[type="search"]');
        const searchResults = document.createElement('div');
        
        if (!searchInput) return;
        
        searchResults.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        
        searchInput.parentNode.style.position = 'relative';
        searchInput.parentNode.appendChild(searchResults);
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                // Mock search results (in a real implementation, this would query a backend)
                const mockResults = [
                    'Research Networks',
                    'Publications',
                    'News & Events',
                    'About Us',
                    'Contact Us'
                ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
                
                if (mockResults.length > 0) {
                    searchResults.innerHTML = mockResults.map(result => `
                        <div style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;">
                            ${result}
                        </div>
                    `).join('');
                    searchResults.style.display = 'block';
                } else {
                    searchResults.innerHTML = '<div style="padding: 10px; text-align: center; color: #666;">No results found</div>';
                    searchResults.style.display = 'block';
                }
            }, 300);
        });
        
        // Hide search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    initializeSearch();
    
    // Performance optimizations
    function optimizePerformance() {
        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandler = window.onscroll;
        
        window.onscroll = function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (originalScrollHandler) {
                    originalScrollHandler.call(this);
                }
            }, 10);
        };
        
        // Prefetch important resources
        const importantLinks = document.querySelectorAll('a[href^="#"]');
        importantLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Preload section content if needed
            });
        });
    }
    
    optimizePerformance();
    
    // Accessibility improvements
    function improveAccessibility() {
        // Add focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid #27a29a';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
        
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            left: -9999px;
            z-index: 999;
            padding: 8px 16px;
            background: #27a29a;
            color: white;
            text-decoration: none;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.left = '0';
            skipLink.style.top = '0';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.left = '-9999px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    improveAccessibility();
    
});

// Utility functions
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

// Export functions for potential external use
window.ASEMHub = {
    debounce,
    throttle,
    // Add other utility functions as needed
};