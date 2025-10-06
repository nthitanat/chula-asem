// News & Events Page JavaScript
// Navigation toggle for mobile
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Animate on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Back to top button functionality
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = document.querySelector('.navbar').offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - offset - 20;
            
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    });
});

// Event card hover effects
function initEventCardEffects() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Timeline item animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Date formatting function
function formatEventDates() {
    const eventDates = document.querySelectorAll('.event-date span, .timeline-date');
    
    eventDates.forEach(dateElement => {
        const dateText = dateElement.textContent.trim();
        // Add relative time information for recent events
        try {
            const eventDate = new Date(dateText);
            const now = new Date();
            const diffTime = eventDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 0 && diffDays <= 30) {
                dateElement.title = `${diffDays} days from now`;
                dateElement.style.cursor = 'help';
            } else if (diffDays < 0 && diffDays >= -30) {
                dateElement.title = `${Math.abs(diffDays)} days ago`;
                dateElement.style.cursor = 'help';
            }
        } catch (error) {
            // Invalid date format, skip
        }
    });
}

// Event filtering functionality
function initEventFiltering() {
    // Create filter buttons
    const eventsSection = document.querySelector('.current-events .container');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'event-filters';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Events</button>
            <button class="filter-btn" data-filter="webinar">Webinars</button>
            <button class="filter-btn" data-filter="conference">Conferences</button>
            <button class="filter-btn" data-filter="memorial">Memorial</button>
        </div>
    `;
    
    // Insert filter buttons before events grid
    const sectionTitle = eventsSection.querySelector('.section-title');
    sectionTitle.insertAdjacentElement('afterend', filterContainer);
    
    // Add CSS for filter buttons
    const style = document.createElement('style');
    style.textContent = `
        .event-filters {
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .filter-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 0.8rem 1.5rem;
            border: 2px solid #29afa0;
            background: transparent;
            color: #29afa0;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: #29afa0;
            color: white;
        }
        
        .event-card.hidden {
            display: none;
        }
        
        @media (max-width: 768px) {
            .filter-buttons {
                gap: 0.5rem;
            }
            
            .filter-btn {
                padding: 0.6rem 1rem;
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            eventCards.forEach(card => {
                const cardContent = card.textContent.toLowerCase();
                let shouldShow = true;
                
                if (filter !== 'all') {
                    switch (filter) {
                        case 'webinar':
                            shouldShow = cardContent.includes('webinar') || 
                                        card.querySelector('.event-badge')?.textContent.toLowerCase().includes('webinar');
                            break;
                        case 'conference':
                            shouldShow = cardContent.includes('conference') || 
                                        card.querySelector('.event-badge')?.textContent.toLowerCase().includes('conference');
                            break;
                        case 'memorial':
                            shouldShow = cardContent.includes('memory') || cardContent.includes('memorial');
                            break;
                    }
                }
                
                if (shouldShow) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Search functionality for events
function initEventSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'event-search';
    searchContainer.innerHTML = `
        <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="event-search" placeholder="Search events, dates, or keywords...">
            <button id="clear-search" class="clear-btn" title="Clear search">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add search styles
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .event-search {
            margin-bottom: 2rem;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .search-box {
            position: relative;
            display: flex;
            align-items: center;
        }
        
        .search-box i.fa-search {
            position: absolute;
            left: 15px;
            color: #29afa0;
            z-index: 1;
        }
        
        #event-search {
            width: 100%;
            padding: 1rem 1rem 1rem 3rem;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
        }
        
        #event-search:focus {
            border-color: #29afa0;
            box-shadow: 0 0 10px rgba(41,175,160,0.2);
        }
        
        .clear-btn {
            position: absolute;
            right: 10px;
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .clear-btn.show {
            opacity: 1;
        }
        
        .clear-btn:hover {
            background: #f5f5f5;
            color: #666;
        }
    `;
    document.head.appendChild(searchStyle);
    
    // Insert search box
    const eventsSection = document.querySelector('.current-events .container');
    const sectionTitle = eventsSection.querySelector('.section-title');
    sectionTitle.insertAdjacentElement('afterend', searchContainer);
    
    // Search functionality
    const searchInput = document.getElementById('event-search');
    const clearBtn = document.getElementById('clear-search');
    const eventCards = document.querySelectorAll('.event-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        // Show/hide clear button
        if (searchTerm) {
            clearBtn.classList.add('show');
        } else {
            clearBtn.classList.remove('show');
        }
        
        // Search in current events
        eventCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (searchTerm === '' || cardText.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Search in timeline events
        timelineItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (searchTerm === '' || itemText.includes(searchTerm)) {
                item.style.display = 'flex';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
    
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch('');
        searchInput.focus();
    });
}

// Accessibility improvements
function initAccessibilityFeatures() {
    // Add keyboard navigation for event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = card.querySelector('.event-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid #29afa0';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add ARIA labels for better screen reader support
    const eventBadges = document.querySelectorAll('.event-badge');
    eventBadges.forEach(badge => {
        badge.setAttribute('aria-label', `Event type: ${badge.textContent}`);
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#current-events';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #29afa0;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Performance optimization - Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initEventCardEffects();
    initTimelineAnimations();
    formatEventDates();
    initEventFiltering();
    initEventSearch();
    initAccessibilityFeatures();
    initLazyLoading();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate any layout-dependent features
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Export functions for potential external use
window.NewsEventsPage = {
    animateOnScroll,
    initEventFiltering,
    initEventSearch,
    formatEventDates
};