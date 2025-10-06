/* ================================
   ASEM Consistent Navigation Component
   Shared across all pages
   ================================ */

function createConsistentNavigation(currentPage = '') {
    return `
    <!-- Header -->
    <header class="fusion-header-wrapper">
        <div class="fusion-header">
            <div class="fusion-secondary-header">
                <div class="fusion-row">
                    <div class="fusion-alignright">
                        <nav class="fusion-secondary-menu" role="navigation" aria-label="Secondary Menu"></nav>
                    </div>
                </div>
            </div>
            
            <div class="fusion-header-sticky-height"></div>
            <div class="fusion-sticky-header-wrapper">
                <div class="fusion-header-main">
                    <div class="fusion-row">
                        <div class="fusion-logo" data-margin-top="31px" data-margin-bottom="31px">
                            <a class="fusion-logo-link" href="../index.html">
                                <img src="https://asemlllhub.org/wp-content/uploads/2021/07/ASEM_logo1-e1680108569736.png" 
                                     srcset="https://asemlllhub.org/wp-content/uploads/2021/07/ASEM_logo1-e1680108569736.png 1x" 
                                     width="776" height="236" 
                                     alt="ASEM Lifelong Learning Logo" 
                                     class="fusion-standard-logo">
                                
                                <img src="https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png" 
                                     srcset="https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png 1x, https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png 2x" 
                                     width="776" height="236" 
                                     alt="ASEM Lifelong Learning Logo" 
                                     class="fusion-mobile-logo">
                                
                                <img src="https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png" 
                                     srcset="https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png 1x" 
                                     width="776" height="236" 
                                     alt="ASEM Lifelong Learning Logo" 
                                     class="fusion-sticky-logo">
                            </a>
                            
                            <div class="fusion-header-content-3-wrapper">
                                <h3 class="fusion-header-tagline">
                                    P: <span style="color: #ffffff">+353 (0)21 490 4700</span> | 
                                    E: <span style="color: #ffffff">
                                        <a href="mailto:asemlllhub@ucc.ie" style="text-decoration: none; color: #ffffff !important">asemlllhub@ucc.ie</a>
                                    </span>
                                </h3>
                            </div>
                        </div>
                        
                        <div class="fusion-mobile-menu-icons">
                            <button type="button" class="fusion-mobile-nav-item fusion-mobile-nav-item-open" aria-label="Toggle mobile menu" aria-expanded="false">
                                <span class="fusion-icon awb-icon-bars" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="fusion-secondary-main-menu">
                    <div class="fusion-row">
                        <nav class="fusion-main-menu" aria-label="Main Menu">
                            <div class="fusion-overlay-search">
                                <form role="search" class="searchform fusion-search-form" method="get" action="#">
                                    <div class="fusion-search-form-content">
                                        <div class="fusion-search-field search-field">
                                            <label>
                                                <span class="screen-reader-text">Search for:</span>
                                                <input type="search" name="s" class="s" placeholder="Search..." required aria-label="Search...">
                                            </label>
                                        </div>
                                        <div class="fusion-search-button search-button">
                                            <input type="submit" class="fusion-search-submit searchsubmit" aria-label="Search" value="&#xf002;">
                                        </div>
                                    </div>
                                </form>
                                <div class="fusion-search-spacer"></div>
                                <a href="#" role="button" aria-label="Close Search" class="fusion-close-search"></a>
                            </div>
                            
                            <ul class="fusion-menu">
                                <li class="menu-item ${currentPage === 'home' ? 'current-menu-item' : ''}">
                                    <a href="../index.html">Homepage</a>
                                </li>
                                <li class="menu-item menu-item-has-children ${currentPage === 'about' ? 'current-menu-item' : ''}">
                                    <a href="../pages/about.html">About Us</a>
                                    <ul class="sub-menu">
                                        <li><a href="../pages/about.html#meet-the-team">Meet the Team</a></li>
                                        <li><a href="../pages/about.html#university-partners">University Partners</a></li>
                                    </ul>
                                </li>
                                <li class="menu-item menu-item-has-children ${currentPage === 'chairs-mission' ? 'current-menu-item' : ''}">
                                    <a href="../pages/chairs-mission.html">Chair's Asia Mission 24/25</a>
                                    <ul class="sub-menu">
                                        <li><a href="../pages/chairs-mission.html#asia-mission-23-24">Asia Mission 23/24</a></li>
                                    </ul>
                                </li>
                                <li class="menu-item ${currentPage === 'news-events' ? 'current-menu-item' : ''}">
                                    <a href="../pages/news-events.html">News & Events</a>
                                </li>
                                <li class="menu-item ${currentPage === 'global-lifelong-learning' ? 'current-menu-item' : ''}">
                                    <a href="../pages/global-lifelong-learning.html">Global Lifelong Learning Week 2024</a>
                                </li>
                                <li class="menu-item menu-item-has-children ${currentPage === 'research-networks' ? 'current-menu-item' : ''}">
                                    <a href="../pages/research-networks.html">Research Networks</a>
                                    <ul class="sub-menu">
                                        <li><a href="../pages/research-networks.html#network-1-elearning">Network 1: E-learning</a></li>
                                        <li><a href="../pages/research-networks.html#network-2-workplace">Network 2: Workplace Learning</a></li>
                                        <li><a href="../pages/research-networks.html#network-3-professionalisation">Research Network 3: Professionalisation of Adult Teachers and Educators</a></li>
                                        <li><a href="../pages/research-networks.html#network-4-national-strategies">Research Network 4: National Strategies for Lifelong Learning</a></li>
                                        <li><a href="../pages/research-networks.html#network-5-learning-transitions">Research Network 5: Learning Transitions</a></li>
                                        <li><a href="../pages/research-networks.html#network-6-learning-cities">Research Network 6: Learning Cities and Learning Regions</a></li>
                                        <li><a href="../pages/research-networks.html#network-7-non-formal">Research Network 7: Non-formal, Informal Learning, and Civil Society</a></li>
                                    </ul>
                                </li>
                                <li class="menu-item ${currentPage === 'south-asia-centre' ? 'current-menu-item' : ''}">
                                    <a href="../pages/south-asia-centre.html">South Asia Centre</a>
                                </li>
                                <li class="menu-item ${currentPage === 'publications' ? 'current-menu-item' : ''}">
                                    <a href="../pages/publications.html">Publications</a>
                                </li>
                                <li class="menu-item menu-item-has-children ${currentPage === 'contact' ? 'current-menu-item' : ''}">
                                    <a href="../pages/contact.html">Contact Us</a>
                                    <ul class="sub-menu">
                                        <li><a href="../pages/contact.html#useful-links">Useful Links</a></li>
                                    </ul>
                                </li>
                                <li class="fusion-custom-menu-item fusion-main-menu-search">
                                    <a class="fusion-main-menu-icon search-icon" href="#" aria-label="Search" role="button" aria-expanded="false">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        
                        <nav class="fusion-mobile-nav-holder" aria-label="Main Menu Mobile">
                            <ul class="fusion-mobile-menu">
                                <li><a href="../index.html">Homepage</a></li>
                                <li class="menu-item-has-children">
                                    <a href="../pages/about.html">About Us</a>
                                    <ul class="sub-menu">
                                        <li><a href="../pages/about.html#meet-the-team">Meet the Team</a></li>
                                        <li><a href="../pages/about.html#university-partners">University Partners</a></li>
                                    </ul>
                                </li>
                                <li class="menu-item-has-children">
                                    <a href="../pages/chairs-mission.html">Chair's Asia Mission 24/25</a>
                                    <ul class="sub-menu">
                                        <li><a href="../pages/chairs-mission.html#asia-mission-23-24">Asia Mission 23/24</a></li>
                                    </ul>
                                </li>
                                <li><a href="../pages/news-events.html">News & Events</a></li>
                                <li><a href="../pages/global-lifelong-learning.html">Global Lifelong Learning Week 2024</a></li>
                                <li class="menu-item-has-children">
                                    <a href="../pages/research-networks.html">Research Networks</a>
                                    <ul class="sub-menu">
                                        <li><a href="../pages/research-networks.html#network-1-elearning">Network 1: E-learning</a></li>
                                        <li><a href="../pages/research-networks.html#network-2-workplace">Network 2: Workplace Learning</a></li>
                                        <li><a href="../pages/research-networks.html#network-3-professionalisation">Research Network 3: Professionalisation</a></li>
                                        <li><a href="../pages/research-networks.html#network-4-national-strategies">Research Network 4: National Strategies</a></li>
                                        <li><a href="../pages/research-networks.html#network-5-learning-transitions">Research Network 5: Learning Transitions</a></li>
                                        <li><a href="../pages/research-networks.html#network-6-learning-cities">Research Network 6: Learning Cities</a></li>
                                        <li><a href="../pages/research-networks.html#network-7-non-formal">Research Network 7: Non-formal Learning</a></li>
                                    </ul>
                                </li>
                                <li><a href="../pages/south-asia-centre.html">South Asia Centre</a></li>
                                <li><a href="../pages/publications.html">Publications</a></li>
                                <li class="menu-item-has-children">
                                    <a href="../pages/contact.html">Contact Us</a>
                                    <ul class="sub-menu">
                                        <li><a href="../pages/contact.html#useful-links">Useful Links</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>`;
}

// Navigation for index.html (root level)
function createRootNavigation(currentPage = '') {
    return `
    <!-- Header -->
    <header class="fusion-header-wrapper">
        <div class="fusion-header">
            <div class="fusion-secondary-header">
                <div class="fusion-row">
                    <div class="fusion-alignright">
                        <nav class="fusion-secondary-menu" role="navigation" aria-label="Secondary Menu"></nav>
                    </div>
                </div>
            </div>
            
            <div class="fusion-header-sticky-height"></div>
            <div class="fusion-sticky-header-wrapper">
                <div class="fusion-header-main">
                    <div class="fusion-row">
                        <div class="fusion-logo" data-margin-top="31px" data-margin-bottom="31px">
                            <a class="fusion-logo-link" href="index.html">
                                <img src="https://asemlllhub.org/wp-content/uploads/2021/07/ASEM_logo1-e1680108569736.png" 
                                     srcset="https://asemlllhub.org/wp-content/uploads/2021/07/ASEM_logo1-e1680108569736.png 1x" 
                                     width="776" height="236" 
                                     alt="ASEM Lifelong Learning Logo" 
                                     class="fusion-standard-logo">
                                
                                <img src="https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png" 
                                     srcset="https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png 1x, https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png 2x" 
                                     width="776" height="236" 
                                     alt="ASEM Lifelong Learning Logo" 
                                     class="fusion-mobile-logo">
                                
                                <img src="https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png" 
                                     srcset="https://asemlllhub.org/wp-content/uploads/2021/05/logo2.png 1x" 
                                     width="776" height="236" 
                                     alt="ASEM Lifelong Learning Logo" 
                                     class="fusion-sticky-logo">
                            </a>
                            
                            <div class="fusion-header-content-3-wrapper">
                                <h3 class="fusion-header-tagline">
                                    P: <span style="color: #ffffff">+353 (0)21 490 4700</span> | 
                                    E: <span style="color: #ffffff">
                                        <a href="mailto:asemlllhub@ucc.ie" style="text-decoration: none; color: #ffffff !important">asemlllhub@ucc.ie</a>
                                    </span>
                                </h3>
                            </div>
                        </div>
                        
                        <div class="fusion-mobile-menu-icons">
                            <button type="button" class="fusion-mobile-nav-item fusion-mobile-nav-item-open" aria-label="Toggle mobile menu" aria-expanded="false">
                                <span class="fusion-icon awb-icon-bars" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="fusion-secondary-main-menu">
                    <div class="fusion-row">
                        <nav class="fusion-main-menu" aria-label="Main Menu">
                            <div class="fusion-overlay-search">
                                <form role="search" class="searchform fusion-search-form" method="get" action="#">
                                    <div class="fusion-search-form-content">
                                        <div class="fusion-search-field search-field">
                                            <label>
                                                <span class="screen-reader-text">Search for:</span>
                                                <input type="search" name="s" class="s" placeholder="Search..." required aria-label="Search...">
                                            </label>
                                        </div>
                                        <div class="fusion-search-button search-button">
                                            <input type="submit" class="fusion-search-submit searchsubmit" aria-label="Search" value="&#xf002;">
                                        </div>
                                    </div>
                                </form>
                                <div class="fusion-search-spacer"></div>
                                <a href="#" role="button" aria-label="Close Search" class="fusion-close-search"></a>
                            </div>
                            
                            <ul class="fusion-menu">
                                <li class="menu-item current-menu-item">
                                    <a href="index.html">Homepage</a>
                                </li>
                                <li class="menu-item menu-item-has-children">
                                    <a href="pages/about.html">About Us</a>
                                    <ul class="sub-menu">
                                        <li><a href="pages/about.html#meet-the-team">Meet the Team</a></li>
                                        <li><a href="pages/about.html#university-partners">University Partners</a></li>
                                    </ul>
                                </li>
                                <li class="menu-item menu-item-has-children">
                                    <a href="pages/chairs-mission.html">Chair's Asia Mission 24/25</a>
                                    <ul class="sub-menu">
                                        <li><a href="pages/chairs-mission.html#asia-mission-23-24">Asia Mission 23/24</a></li>
                                    </ul>
                                </li>
                                <li class="menu-item">
                                    <a href="pages/news-events.html">News & Events</a>
                                </li>
                                <li class="menu-item">
                                    <a href="pages/global-lifelong-learning.html">Global Lifelong Learning Week 2024</a>
                                </li>
                                <li class="menu-item menu-item-has-children">
                                    <a href="pages/research-networks.html">Research Networks</a>
                                    <ul class="sub-menu">
                                        <li><a href="pages/research-networks.html#network-1-elearning">Network 1: E-learning</a></li>
                                        <li><a href="pages/research-networks.html#network-2-workplace">Network 2: Workplace Learning</a></li>
                                        <li><a href="pages/research-networks.html#network-3-professionalisation">Research Network 3: Professionalisation of Adult Teachers and Educators</a></li>
                                        <li><a href="pages/research-networks.html#network-4-national-strategies">Research Network 4: National Strategies for Lifelong Learning</a></li>
                                        <li><a href="pages/research-networks.html#network-5-learning-transitions">Research Network 5: Learning Transitions</a></li>
                                        <li><a href="pages/research-networks.html#network-6-learning-cities">Research Network 6: Learning Cities and Learning Regions</a></li>
                                        <li><a href="pages/research-networks.html#network-7-non-formal">Research Network 7: Non-formal, Informal Learning, and Civil Society</a></li>
                                    </ul>
                                </li>
                                <li class="menu-item">
                                    <a href="pages/south-asia-centre.html">South Asia Centre</a>
                                </li>
                                <li class="menu-item">
                                    <a href="pages/publications.html">Publications</a>
                                </li>
                                <li class="menu-item menu-item-has-children">
                                    <a href="pages/contact.html">Contact Us</a>
                                    <ul class="sub-menu">
                                        <li><a href="pages/contact.html#useful-links">Useful Links</a></li>
                                    </ul>
                                </li>
                                <li class="fusion-custom-menu-item fusion-main-menu-search">
                                    <a class="fusion-main-menu-icon search-icon" href="#" aria-label="Search" role="button" aria-expanded="false">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        
                        <nav class="fusion-mobile-nav-holder" aria-label="Main Menu Mobile">
                            <ul class="fusion-mobile-menu">
                                <li><a href="index.html">Homepage</a></li>
                                <li class="menu-item-has-children">
                                    <a href="pages/about.html">About Us</a>
                                    <ul class="sub-menu">
                                        <li><a href="pages/about.html#meet-the-team">Meet the Team</a></li>
                                        <li><a href="pages/about.html#university-partners">University Partners</a></li>
                                    </ul>
                                </li>
                                <li class="menu-item-has-children">
                                    <a href="pages/chairs-mission.html">Chair's Asia Mission 24/25</a>
                                    <ul class="sub-menu">
                                        <li><a href="pages/chairs-mission.html#asia-mission-23-24">Asia Mission 23/24</a></li>
                                    </ul>
                                </li>
                                <li><a href="pages/news-events.html">News & Events</a></li>
                                <li><a href="pages/global-lifelong-learning.html">Global Lifelong Learning Week 2024</a></li>
                                <li class="menu-item-has-children">
                                    <a href="pages/research-networks.html">Research Networks</a>
                                    <ul class="sub-menu">
                                        <li><a href="pages/research-networks.html#network-1-elearning">Network 1: E-learning</a></li>
                                        <li><a href="pages/research-networks.html#network-2-workplace">Network 2: Workplace Learning</a></li>
                                        <li><a href="pages/research-networks.html#network-3-professionalisation">Research Network 3: Professionalisation</a></li>
                                        <li><a href="pages/research-networks.html#network-4-national-strategies">Research Network 4: National Strategies</a></li>
                                        <li><a href="pages/research-networks.html#network-5-learning-transitions">Research Network 5: Learning Transitions</a></li>
                                        <li><a href="pages/research-networks.html#network-6-learning-cities">Research Network 6: Learning Cities</a></li>
                                        <li><a href="pages/research-networks.html#network-7-non-formal">Research Network 7: Non-formal Learning</a></li>
                                    </ul>
                                </li>
                                <li><a href="pages/south-asia-centre.html">South Asia Centre</a></li>
                                <li><a href="pages/publications.html">Publications</a></li>
                                <li class="menu-item-has-children">
                                    <a href="pages/contact.html">Contact Us</a>
                                    <ul class="sub-menu">
                                        <li><a href="pages/contact.html#useful-links">Useful Links</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>`;
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createConsistentNavigation, createRootNavigation };
}