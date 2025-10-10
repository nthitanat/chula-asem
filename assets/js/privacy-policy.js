// Privacy Policy Page JavaScript
// Accordion functionality for privacy policy sections

// Toggle accordion item - make it globally accessible for onclick attributes
window.toggleAccordion = function(button) {
    const item = button.closest('.accordion-item');
    const isActive = item.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(accordionItem => {
        accordionItem.classList.remove('active');
    });
    
    // If this item wasn't active, open it
    if (!isActive) {
        item.classList.add('active');
    }
};

// Close accordion when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.accordion-item')) {
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Initialize accordion functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Privacy Policy JS loaded - Accordion functionality initialized');
    
    // Verify accordion buttons exist
    const buttons = document.querySelectorAll('.accordion-button');
    console.log(`Found ${buttons.length} accordion buttons`);
    
    // The buttons already have onclick attributes, so we don't need to add event listeners
    // Just ensure the function is globally accessible (which we did above)
});