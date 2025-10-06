// Chair's Asia Mission JS
// Navigation toggle for mobile
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Animate on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
}
animateOnScroll();

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Image gallery carousel logic
function setupGalleries() {
    document.querySelectorAll('.image-gallery').forEach(gallery => {
        const slides = gallery.querySelectorAll('.gallery-slide');
        const indicators = gallery.querySelectorAll('.indicator');
        const prevBtn = gallery.querySelector('.prev-btn');
        const nextBtn = gallery.querySelector('.next-btn');
        let current = 0;
        function showSlide(idx) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
                indicators[i].classList.toggle('active', i === idx);
            });
            current = idx;
        }
        prevBtn.addEventListener('click', () => {
            showSlide((current - 1 + slides.length) % slides.length);
        });
        nextBtn.addEventListener('click', () => {
            showSlide((current + 1) % slides.length);
        });
        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => showSlide(i));
        });
        showSlide(0);
    });
}
setupGalleries();

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = document.querySelector('.navbar').offsetHeight || 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        }
    });
});

// Accessibility: focus indicators
const focusable = document.querySelectorAll('a, button, input, textarea');
focusable.forEach(el => {
    el.addEventListener('focus', function() {
        this.style.outline = '2px solid #29afa0';
        this.style.outlineOffset = '2px';
    });
    el.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});