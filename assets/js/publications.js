// Publication Page JavaScript
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
    
    // Publication interactions
    initializePublicationInteractions();
    
    // Search and filter functionality
    initializeSearchAndFilter();
    
    // Image lazy loading and optimization
    initializeImageOptimization();
    
    // Accessibility improvements
    initializeAccessibility();
    
    // Hero slider functionality
    initializeHeroSlider();
});

// Navigation Functions
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update aria-expanded attribute
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            
            // Animate hamburger icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    
                    // Reset hamburger icon
                    const icon = navToggle.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger icon
                const icon = navToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        }
    });
    
    // Keyboard navigation
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.publication-item, .section-header, .page-title');
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                
                // Add staggered animation for publication items
                if (entry.target.classList.contains('publication-item')) {
                    const items = document.querySelectorAll('.publication-item');
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Keyboard accessibility
        backToTopButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
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
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling changes
        if (currentScrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (currentScrollTop > lastScrollTop && currentScrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }, { passive: true });
}

// Publication Interactions
function initializePublicationInteractions() {
    const publicationItems = document.querySelectorAll('.publication-item');
    
    publicationItems.forEach(item => {
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
            
            // Animate the icon
            const icon = this.querySelector('.publication-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
            
            // Reset icon animation
            const icon = this.querySelector('.publication-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add focus effects for keyboard navigation
        const links = item.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('focus', function() {
                item.classList.add('focused');
            });
            
            link.addEventListener('blur', function() {
                item.classList.remove('focused');
            });
        });
        
        // Track publication clicks for analytics (if needed)
        const readMoreBtn = item.querySelector('.read-more-btn');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function() {
                const title = item.querySelector('.publication-title').textContent;
                console.log('Publication clicked:', title);
                
                // Add tracking animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    });
}

// Search and Filter Functionality
function initializeSearchAndFilter() {
    // Create search and filter UI
    createSearchInterface();
    
    // Initialize search functionality
    const searchInput = document.getElementById('publication-search');
    const filterSelect = document.getElementById('publication-filter');
    
    if (searchInput) {
        // Debounced search function
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterPublications();
            }, 300);
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', filterPublications);
    }
}

function createSearchInterface() {
    const publicationsSection = document.querySelector('.publications-section');
    const sectionHeader = publicationsSection.querySelector('.section-header');
    
    // Create search and filter container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-filter-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" id="publication-search" placeholder="Search publications..." aria-label="Search publications">
            <i class="fas fa-search search-icon"></i>
        </div>
        <select id="publication-filter" aria-label="Filter publications by type">
            <option value="">All Publications</option>
            <option value="journal">Journal Articles</option>
            <option value="book">Books & Chapters</option>
            <option value="report">Reports & Papers</option>
            <option value="magazine">Magazines</option>
        </select>
    `;
    
    // Add CSS for search interface
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .search-filter-container {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            align-items: center;
        }
        
        .search-box {
            position: relative;
            flex: 1;
            min-width: 250px;
        }
        
        #publication-search {
            width: 100%;
            padding: 12px 40px 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: white;
        }
        
        #publication-search:focus {
            outline: none;
            border-color: #1d7184;
            box-shadow: 0 0 0 3px rgba(29, 113, 132, 0.1);
        }
        
        .search-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
            pointer-events: none;
        }
        
        #publication-filter {
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 1rem;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 200px;
        }
        
        #publication-filter:focus {
            outline: none;
            border-color: #1d7184;
            box-shadow: 0 0 0 3px rgba(29, 113, 132, 0.1);
        }
        
        .publication-item.hidden {
            display: none;
        }
        
        .no-results {
            text-align: center;
            padding: 3rem 1rem;
            color: #666;
            font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
            .search-filter-container {
                flex-direction: column;
                align-items: stretch;
            }
            
            .search-box,
            #publication-filter {
                min-width: auto;
                width: 100%;
            }
        }
    `;
    document.head.appendChild(searchStyles);
    
    // Insert after section header
    sectionHeader.insertAdjacentElement('afterend', searchContainer);
}

function filterPublications() {
    const searchTerm = document.getElementById('publication-search')?.value.toLowerCase() || '';
    const filterType = document.getElementById('publication-filter')?.value || '';
    const publicationItems = document.querySelectorAll('.publication-item');
    let visibleCount = 0;
    
    publicationItems.forEach(item => {
        const title = item.querySelector('.publication-title').textContent.toLowerCase();
        const content = item.querySelector('.publication-meta').textContent.toLowerCase();
        const searchMatch = title.includes(searchTerm) || content.includes(searchTerm);
        
        // Simple type classification based on content
        let itemType = '';
        if (content.includes('journal') || content.includes('article')) itemType = 'journal';
        else if (content.includes('book') || content.includes('chapter')) itemType = 'book';
        else if (content.includes('report') || content.includes('paper')) itemType = 'report';
        else if (content.includes('magazine')) itemType = 'magazine';
        
        const typeMatch = !filterType || itemType === filterType;
        
        if (searchMatch && typeMatch) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Show/hide no results message
    let noResultsMessage = document.querySelector('.no-results');
    if (visibleCount === 0 && (searchTerm || filterType)) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results';
            noResultsMessage.textContent = 'No publications found matching your criteria.';
            document.querySelector('.publications-grid').insertAdjacentElement('afterend', noResultsMessage);
        }
        noResultsMessage.style.display = 'block';
    } else if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
    }
}

// Image Optimization and Lazy Loading
function initializeImageOptimization() {
    const images = document.querySelectorAll('.publication-image img');
    
    // Add loading states
    images.forEach(img => {
        // Add loading placeholder
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Error handling
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMzUgNzVIMTY1VjEyNUgxMzVWNzVaIiBmaWxsPSIjRERERUREIi8+CjxwYXRoIGQ9Ik0xMjAgOTBIMTgwVjExMEgxMjBWOTBaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTk5OTkiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+';
            this.alt = 'Image not available';
        });
    });
}

// Accessibility Improvements
function initializeAccessibility() {
    // Add keyboard navigation improvements
    const interactiveElements = document.querySelectorAll('a, button, input, select');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('keyboard-focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focused');
        });
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        left: -9999px;
        z-index: 999999;
        padding: 8px 16px;
        background: #000;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.left = '6px';
        this.style.top = '7px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add aria-labels to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        const iconClass = link.querySelector('i').className;
        if (iconClass.includes('linkedin')) {
            link.setAttribute('aria-label', 'Visit our LinkedIn page');
        } else if (iconClass.includes('facebook')) {
            link.setAttribute('aria-label', 'Visit our Facebook page');
        } else if (iconClass.includes('youtube')) {
            link.setAttribute('aria-label', 'Visit our YouTube channel');
        }
    });
}

// Hero Slider Functionality
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // If there are multiple slides, add navigation
    if (slides.length > 1) {
        // Auto-advance slides
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
        
        // Add slide indicators
        const indicators = document.createElement('div');
        indicators.className = 'slide-indicators';
        indicators.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 3;
        `;
        
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'slide-indicator';
            indicator.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid white;
                background: ${index === 0 ? 'white' : 'transparent'};
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            indicator.addEventListener('click', () => {
                slides[currentSlide].classList.remove('active');
                currentSlide = index;
                slides[currentSlide].classList.add('active');
                
                // Update indicators
                document.querySelectorAll('.slide-indicator').forEach((ind, i) => {
                    ind.style.background = i === index ? 'white' : 'transparent';
                });
            });
            
            indicators.appendChild(indicator);
        });
        
        document.querySelector('.hero-slider').appendChild(indicators);
    }
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

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (window.performance) {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', pageLoadTime, 'ms');
            }
        }, 0);
    });
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Export functions for potential external use
window.PublicationPage = {
    filterPublications,
    initializeSearchAndFilter,
    initializePublicationInteractions
};