// CFIMH Comprehensive Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initStatsCounter();
    initSearchFunctionality();
    initMembershipCards();
    initFormHandling();
    initMobileMenu();
    initEmergencyGuidelines();
    initQuickTools();
    initGuidelinesDatabase();
    initPublications();
    initEvents();
    initProfessionalDirectory();
    initTestimonials();
    initNews();
    initAwards();
    initGlobalPresence();
    initNewsletter();
    initScrollAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavLinkOnScroll();
    }, 100));
}

function updateActiveNavLink(targetId) {
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`nav a[href="${targetId}"]`)?.classList.add('active');
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionbottom = section.offsetbottom;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionbottom - 100) {
            current = section.getAttribute('id');
        }
    });
    
    if (current) {
        updateActiveNavLink(`#${current}`);
    }
}

// Throttle function for performance
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
    }
}

// Animated stats counter
function initStatsCounter() {
    const statElements = document.querySelectorAll('.text-3xl.font-bold');
    
    if (statElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statElements.forEach(element => {
            observer.observe(element);
        });
    }
}

function animateCounter(element) {
    const finalText = element.textContent;
    const isNumberOnly = /^\d+/.test(finalText.replace(/,/g, ''));
    
    if (isNumberOnly) {
        const finalNumber = parseInt(finalText.replace(/[^\d]/g, ''));
        let currentNumber = 0;
        const increment = finalNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
                element.textContent = finalText; // Restore original format
            } else {
                element.textContent = Math.floor(currentNumber).toLocaleString() + (finalText.includes('+') ? '+' : '');
            }
        }, 40);
    }
}

// Enhanced search functionality
function initSearchFunctionality() {
    const searchButton = document.querySelector('.fa-search');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            showAdvancedSearchModal();
        });
    }
}

function showAdvancedSearchModal() {
    const modal = createAdvancedSearchModal();
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    modal.querySelector('input').focus();
}

function createAdvancedSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.style.display = 'none';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold">Advanced Search</h3>
                <button class="close-search text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <div class="relative">
                    <input type="text" placeholder="Search research, forums, guidelines..." 
                           class="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg">
                    <button class="absolute right-4 bottom-4 text-gray-400 hover:text-blue-600">
                        <i class="fas fa-search text-xl"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>All Categories</option>
                        <option>Clinical Guidelines</option>
                        <option>Research Papers</option>
                        <option>CME Programs</option>
                        <option>Forum Discussions</option>
                        <option>Professional Directory</option>
                    </select>
                    
                    <select class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>All Specialties</option>
                        <option>Cardiology</option>
                        <option>Emergency Medicine</option>
                        <option>Pediatrics</option>
                        <option>Oncology</option>
                        <option>Neurology</option>
                    </select>
                    
                    <select class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>All Time</option>
                        <option>Last Week</option>
                        <option>Last Month</option>
                        <option>Last Year</option>
                    </select>
                </div>
                
                <div class="flex flex-wrap gap-2 mt-4">
                    <span class="text-sm text-gray-600">Popular searches:</span>
                    <button class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200">CME programs</button>
                    <button class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200">clinical guidelines</button>
                    <button class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200">membership</button>
                    <button class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm hover:bg-orange-200">research papers</button>
                </div>
                
                <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-6">
                    <i class="fas fa-search mr-2"></i>Search CFIMH
                </button>
            </div>
        </div>
    `;
    
    // Close modal functionality
    modal.querySelector('.close-search').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Search functionality
    const searchInput = modal.querySelector('input');
    const searchButton = modal.querySelector('button[type="button"]:last-child');
    
    [searchInput, searchButton].forEach(element => {
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || this === searchButton) {
                performAdvancedSearch(modal);
            }
        });
    });
    
    // Quick search tags
    modal.querySelectorAll('.bg-blue-100, .bg-green-100, .bg-purple-100, .bg-orange-100').forEach(tag => {
        tag.addEventListener('click', function() {
            searchInput.value = this.textContent.trim();
            performAdvancedSearch(modal);
        });
    });
    
    return modal;
}

function performAdvancedSearch(modal) {
    const query = modal.querySelector('input').value;
    const category = modal.querySelector('select:nth-of-type(1)').value;
    const specialty = modal.querySelector('select:nth-of-type(2)').value;
    const timeframe = modal.querySelector('select:nth-of-type(3)').value;
    
    if (query.trim()) {
        showSuccessMessage(`Searching for "${query}" in ${category} (${specialty}, ${timeframe})`);
        modal.remove();
        
        // Simulate search results
        setTimeout(() => {
            showSearchResults(query, category, specialty, timeframe);
        }, 1000);
    }
}

function showSearchResults(query, category, specialty, timeframe) {
    const resultsModal = createSearchResultsModal(query, category, specialty, timeframe);
    document.body.appendChild(resultsModal);
}

function createSearchResultsModal(query, category, specialty, timeframe) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const mockResults = generateMockSearchResults(query, category);
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h3 class="text-2xl font-bold">Search Results</h3>
                    <p class="text-gray-600">${mockResults.length} results for "${query}"</p>
                </div>
                <button class="close-search text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                ${mockResults.map(result => `
                    <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <h4 class="font-bold text-lg mb-2">${result.title}</h4>
                                <p class="text-gray-600 mb-2">${result.description}</p>
                                <div class="flex items-center space-x-4 text-sm text-gray-500">
                                    <span><i class="fas fa-folder mr-1"></i>${result.category}</span>
                                    <span><i class="fas fa-calendar mr-1"></i>${result.date}</span>
                                    <span><i class="fas fa-user mr-1"></i>${result.author}</span>
                                </div>
                            </div>
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                                View
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="mt-6 flex justify-center">
                <button class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                    Load More Results
                </button>
            </div>
        </div>
    `;
    
    modal.querySelector('.close-search').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

function generateMockSearchResults(query, category) {
    const results = [
        {
            title: `Advanced ${query} Research Protocol`,
            description: `Comprehensive clinical guidelines for ${query} implementation in healthcare settings.`,
            category: category,
            date: 'September 2025',
            author: 'Dr. Sarah Chen, MD'
        },
        {
            title: `CME Program: ${query} Best Practices`,
            description: `Interactive continuing education program covering latest developments in ${query}.`,
            category: 'CME Programs',
            date: 'October 2025',
            author: 'Prof. Michael Johnson'
        },
        {
            title: `Forum Discussion: ${query} Implementation`,
            description: `Active discussion among medical professionals about ${query} challenges and solutions.`,
            category: 'Forum Discussions',
            date: 'August 2025',
            author: 'CFIMH Community'
        }
    ];
    
    return results;
}

// Emergency Guidelines functionality
function initEmergencyGuidelines() {
    const emergencyButtons = document.querySelectorAll('#emergency button');
    
    emergencyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Cardiac Protocols')) {
                showEmergencyProtocols('cardiac');
            } else if (buttonText.includes('Emergency Consultation')) {
                showEmergencyConsultation();
            }
        });
    });
}

function showEmergencyProtocols(type) {
    const modal = createEmergencyProtocolModal(type);
    document.body.appendChild(modal);
}

function createEmergencyProtocolModal(type) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const protocols = {
        cardiac: [
            { title: 'Cardiac Arrest Protocols', updated: 'August 2025', category: 'Critical Care' },
            { title: 'Acute MI Management', updated: 'September 2025', category: 'Cardiology' },
            { title: 'Arrhythmia Treatment Guidelines', updated: 'July 2025', category: 'Cardiology' }
        ]
    };
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-3xl mx-4 max-h-screen overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                    <div class="bg-red-100 p-3 rounded-lg mr-4">
                        <i class="fas fa-heart-pulse text-red-600 text-2xl"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold">Emergency Cardiac Protocols</h3>
                        <p class="text-gray-600">Critical care guidelines for immediate use</p>
                    </div>
                </div>
                <button class="close-modal text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                    <span class="font-semibold text-red-800">24/7 Emergency Consultation: +1 (555) 911-ETHICS</span>
                </div>
            </div>
            
            <div class="space-y-4">
                ${protocols[type].map(protocol => `
                    <div class="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-bold text-lg">${protocol.title}</h4>
                                <p class="text-gray-600 text-sm">Last updated: ${protocol.updated}</p>
                                <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mt-2 inline-block">${protocol.category}</span>
                            </div>
                            <div class="flex space-x-2">
                                <button class="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                                    <i class="fas fa-download mr-1"></i>Download
                                </button>
                                <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                                    <i class="fas fa-eye mr-1"></i>View
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

function showEmergencyConsultation() {
    const modal = createEmergencyConsultationModal();
    document.body.appendChild(modal);
}

function createEmergencyConsultationModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div class="text-center mb-6">
                <div class="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-phone text-red-600 text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold mb-2">Emergency Consultation</h3>
                <p class="text-gray-600">24/7 medical ethics and clinical support</p>
            </div>
            
            <div class="space-y-4">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <h4 class="font-bold text-red-800 text-xl mb-2">+1 (555) 911-ETHICS</h4>
                    <p class="text-red-600">Available 24 hours a day, 7 days a week</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <button class="bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                        <i class="fas fa-phone mr-2"></i>Call Now
                    </button>
                    <button class="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        <i class="fas fa-comments mr-2"></i>Live Chat
                    </button>
                </div>
                
                <div class="text-center">
                    <p class="text-sm text-gray-600">Average response time: &lt; 2 minutes</p>
                </div>
            </div>
            
            <button class="close-modal mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                Close
            </button>
        </div>
    `;
    
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

// Quick Tools functionality
function initQuickTools() {
    const toolButtons = document.querySelectorAll('#tools button');
    
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('CME Tracker')) {
                showCMETracker();
            } else if (buttonText.includes('Guidelines Search')) {
                showGuidelinesSearch();
            } else if (buttonText.includes('Event Calendar')) {
                showEventCalendar();
            } else if (buttonText.includes('Login')) {
                showMemberLogin();
            }
        });
    });
}

function showCMETracker() {
    const modal = createCMETrackerModal();
    document.body.appendChild(modal);
}

function createCMETrackerModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                    <div class="bg-blue-100 p-3 rounded-lg mr-4">
                        <i class="fas fa-certificate text-blue-600 text-2xl"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold">CME Credit Tracker</h3>
                        <p class="text-gray-600">Track your continuing medical education progress</p>
                    </div>
                </div>
                <button class="close-modal text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="bg-blue-50 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">24</div>
                    <p class="text-gray-600">Credits Earned</p>
                </div>
                <div class="bg-green-50 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">26</div>
                    <p class="text-gray-600">Credits Remaining</p>
                </div>
                <div class="bg-purple-50 rounded-lg p-4 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">48%</div>
                    <p class="text-gray-600">Progress</p>
                </div>
            </div>
            
            <div class="mb-6">
                <div class="flex justify-between mb-2">
                    <span class="text-sm font-medium">Annual Progress</span>
                    <span class="text-sm">24/50 Credits</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: 48%"></div>
                </div>
            </div>
            
            <div class="space-y-4">
                <h4 class="text-lg font-bold">Recent CME Activities</h4>
                <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                            <h5 class="font-semibold">Advanced Cardiac Imaging</h5>
                            <p class="text-sm text-gray-600">Completed September 15, 2025</p>
                        </div>
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">15 Credits</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                            <h5 class="font-semibold">Medical Ethics Workshop</h5>
                            <p class="text-sm text-gray-600">Completed August 22, 2025</p>
                        </div>
                        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">8 Credits</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                            <h5 class="font-semibold">Emergency Medicine Update</h5>
                            <p class="text-sm text-gray-600">Completed July 10, 2025</p>
                        </div>
                        <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">1 Credit</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

// Guidelines Database functionality
function initGuidelinesDatabase() {
    const searchInput = document.querySelector('#guidelines input[type="text"]');
    const categorySelect = document.querySelector('#guidelines select');
    const guidelinesCards = document.querySelectorAll('#guidelines .bg-gray-50');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterGuidelines(this.value, categorySelect?.value || 'All Specialties');
        });
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            filterGuidelines(searchInput?.value || '', this.value);
        });
    }
    
    guidelinesCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showGuidelineDetail(title);
        });
    });
}

function filterGuidelines(searchTerm, category) {
    // Simulate filtering functionality
    const results = document.querySelectorAll('#guidelines .bg-gray-50');
    
    results.forEach(result => {
        const title = result.querySelector('h4').textContent.toLowerCase();
        const shouldShow = title.includes(searchTerm.toLowerCase()) && 
                          (category === 'All Specialties' || result.querySelector('p').textContent.includes(category));
        
        result.style.display = shouldShow ? 'flex' : 'none';
    });
}

// Publications functionality
function initPublications() {
    const newsletterForm = document.querySelector('#publications .flex');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeToNewsletter(email, 'publications');
        });
    }
    
    const publicationLinks = document.querySelectorAll('#publications button, #publications .bg-white button');
    publicationLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            if (linkText.includes('Access Latest Issue')) {
                showLatestIssue();
            } else if (linkText.includes('Subscribe')) {
                // Handle subscription
                const email = this.parentElement.querySelector('input[type="email"]').value;
                if (email) {
                    subscribeToNewsletter(email, 'publications');
                }
            }
        });
    });
}

function subscribeToNewsletter(email, source) {
    if (validateEmail(email)) {
        showSuccessMessage(`Successfully subscribed ${email} to CFIMH ${source} newsletter!`);
    } else {
        showErrorMessage('Please enter a valid email address.');
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Events functionality
function initEvents() {
    const eventButtons = document.querySelectorAll('#events button');
    
    eventButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const eventCard = this.closest('.bg-white');
            const eventTitle = eventCard?.querySelector('h3')?.textContent || 'Event';
            
            if (buttonText.includes('Register') || buttonText.includes('Join') || buttonText.includes('Schedule')) {
                showEventRegistration(eventTitle, buttonText);
            } else if (buttonText.includes('View Full Events Calendar')) {
                showFullEventCalendar();
            }
        });
    });
}

function showEventRegistration(eventTitle, actionType) {
    const modal = createEventRegistrationModal(eventTitle, actionType);
    document.body.appendChild(modal);
}

function createEventRegistrationModal(eventTitle, actionType) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold">Event Registration</h3>
                <button class="close-modal text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="mb-6">
                <h4 class="font-bold text-lg mb-2">${eventTitle}</h4>
                <p class="text-gray-600">Complete your registration for this event</p>
            </div>
            
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Full Name</label>
                    <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Email Address</label>
                    <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Medical License Number</label>
                    <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Institution</label>
                    <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Dietary Requirements</label>
                    <textarea class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="2"></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Complete Registration
                </button>
            </form>
        </div>
    `;
    
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

// Professional Directory functionality
function initProfessionalDirectory() {
    const specialtyButtons = document.querySelectorAll('#directory button');
    const expertCards = document.querySelectorAll('#directory .bg-white.hover\\:shadow-xl');
    
    specialtyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const specialty = this.textContent.trim();
            filterDirectoryBySpecialty(specialty);
        });
    });
    
    expertCards.forEach(card => {
        const viewButton = card.querySelector('button');
        if (viewButton) {
            viewButton.addEventListener('click', function() {
                const expertName = this.closest('.bg-white').querySelector('h4').textContent;
                showExpertProfile(expertName);
            });
        }
    });
}

function showExpertProfile(expertName) {
    const modal = createExpertProfileModal(expertName);
    document.body.appendChild(modal);
}

function createExpertProfileModal(expertName) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold">Expert Profile</h3>
                <button class="close-modal text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="flex items-start space-x-6 mb-6">
                <div class="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center">
                    <i class="fas fa-user-md text-blue-600 text-3xl"></i>
                </div>
                <div class="flex-1">
                    <h4 class="text-xl font-bold mb-2">${expertName}</h4>
                    <p class="text-gray-600 mb-2">Oncology Research Specialist</p>
                    <p class="text-gray-600 mb-4">Stanford Medical Center</p>
                    <div class="flex space-x-4">
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                            <i class="fas fa-envelope mr-2"></i>Contact
                        </button>
                        <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
                            <i class="fas fa-calendar mr-2"></i>Schedule Meeting
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-gray-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-blue-600 mb-1">150+</div>
                    <p class="text-gray-600 text-sm">Publications</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-green-600 mb-1">25</div>
                    <p class="text-gray-600 text-sm">Years Experience</p>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-purple-600 mb-1">12</div>
                    <p class="text-gray-600 text-sm">Awards</p>
                </div>
            </div>
            
            <div class="space-y-6">
                <div>
                    <h5 class="font-bold mb-2">Research Interests</h5>
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Precision Medicine</span>
                        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Biomarker Discovery</span>
                        <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Clinical Trials</span>
                    </div>
                </div>
                
                <div>
                    <h5 class="font-bold mb-2">Recent Publications</h5>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li>• "Novel Biomarkers in Early-Stage Oncological Detection" - Nature Medicine, 2025</li>
                        <li>• "Precision Medicine Approaches in Cancer Treatment" - NEJM, 2024</li>
                        <li>• "AI-Driven Drug Discovery in Oncology" - Science, 2024</li>
                    </ul>
                </div>
                
                <div>
                    <h5 class="font-bold mb-2">Professional Affiliations</h5>
                    <ul class="space-y-1 text-sm text-gray-600">
                        <li>• American Society of Clinical Oncology (ASCO)</li>
                        <li>• American Association for Cancer Research (AACR)</li>
                        <li>• Clinical Forum for Intellectuals in Medical & Health (CFIMH)</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    return modal;
}

// Enhanced membership cards
function initMembershipCards() {
    const membershipCards = document.querySelectorAll('#membership .bg-white');
    
    membershipCards.forEach((card, index) => {
        card.classList.add('membership-card');
        
        // Add popular badge styling
        if (card.querySelector('.absolute')) {
            card.classList.add('popular');
        }
        
        // Add join button functionality
        const joinButton = card.querySelector('button');
        if (joinButton) {
            joinButton.addEventListener('click', function() {
                handleMembershipAction(this, index);
            });
        }
    });
}

function handleMembershipAction(button, cardIndex) {
    const membershipTypes = ['Resident/Fellow', 'Practicing Physician', 'Department/Institution'];
    const membershipType = membershipTypes[cardIndex] || 'Unknown';
    
    if (button.textContent.includes('Contact Sales')) {
        showContactForm(membershipType);
    } else {
        showMembershipForm(membershipType);
    }
}

// Newsletter functionality
function initNewsletter() {
    const newsletterForm = document.querySelector('#newsletter input[type="email"]');
    const subscribeButton = document.querySelector('#newsletter input[type="email"] + button');
    const socialLinks = document.querySelectorAll('#newsletter a[target="_blank"]');
    const appButtons = document.querySelectorAll('#newsletter button:contains("App Store"), #newsletter button:contains("Google Play")');
    
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function() {
            const email = newsletterForm?.value;
            if (email) {
                subscribeToNewsletter(email, 'main newsletter');
                newsletterForm.value = '';
            }
        });
    }
    
    // Handle app download buttons
    appButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent.includes('App Store') ? 'iOS' : 'Android';
            showAppDownload(platform);
        });
    });
}

function showAppDownload(platform) {
    showSuccessMessage(`Redirecting to ${platform} app store to download the CFIMH mobile app...`);
    
    // In a real application, this would redirect to the actual app stores
    setTimeout(() => {
        if (platform === 'iOS') {
            // window.open('https://apps.apple.com/app/cfimh', '_blank');
        } else {
            // window.open('https://play.google.com/store/apps/details?id=org.cfimh', '_blank');
        }
    }, 1000);
}

// Form handling
function initFormHandling() {
    document.addEventListener('submit', function(e) {
        if (e.target.tagName === 'FORM') {
            e.preventDefault();
            handleFormSubmission(e.target);
        }
    });
    
    // CTA buttons
    const ctaButtons = document.querySelectorAll('button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleCTAClick(this);
        });
    });
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
            setTimeout(() => field.classList.remove('border-red-500'), 3000);
        }
    });
    
    if (!isValid) {
        showErrorMessage('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    showSuccessMessage('Thank you! Your submission has been received successfully.');
    
    // Close the modal
    const modal = form.closest('.fixed');
    if (modal) {
        setTimeout(() => modal.remove(), 2000);
    }
}

function handleCTAClick(button) {
    const buttonText = button.textContent.trim();
    
    if (buttonText.includes('Submit Research')) {
        showResearchSubmissionForm();
    } else if (buttonText.includes('Apply for Membership')) {
        showGeneralMembershipForm();
    } else if (buttonText.includes('Schedule Information Session')) {
        showSchedulingForm();
    } else if (buttonText.includes('Download Mobile App')) {
        showAppDownloadOptions();
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize other sections (testimonials, news, awards, global presence)
function initTestimonials() {
    // Add any specific testimonials functionality here
}

function initNews() {
    const newsCards = document.querySelectorAll('#news .bg-white');
    newsCards.forEach(card => {
        const readMoreButton = card.querySelector('button');
        if (readMoreButton) {
            readMoreButton.addEventListener('click', function() {
                const title = this.closest('.bg-white').querySelector('h3').textContent;
                showNewsDetail(title);
            });
        }
    });
}

function showNewsDetail(title) {
    showSuccessMessage(`Opening full article: "${title}"`);
}

function initAwards() {
    // Add any specific awards functionality here
}

function initGlobalPresence() {
    // Add any specific global presence functionality here
}

// Mobile menu functionality
function initMobileMenu() {
    const navContainer = document.querySelector('nav .container');
    
    if (window.innerWidth <= 768) {
        addMobileMenuToggle(navContainer);
    }
    
    window.addEventListener('resize', function() {
        const existingToggle = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth <= 768 && !existingToggle) {
            addMobileMenuToggle(navContainer);
        } else if (window.innerWidth > 768 && existingToggle) {
            existingToggle.remove();
        }
    });
}

function addMobileMenuToggle(container) {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle md:hidden text-gray-700 hover:text-blue-600';
    toggle.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    
    const rightSection = container.querySelector('.flex.items-center.space-x-4');
    rightSection.insertBefore(toggle, rightSection.firstChild);
    
    toggle.addEventListener('click', function() {
        toggleMobileMenu();
    });
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('nav .hidden.md\\:flex');
    if (navLinks) {
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
        navLinks.classList.toggle('flex-col');
        navLinks.classList.toggle('absolute');
        navLinks.classList.toggle('bottom-20');
        navLinks.classList.toggle('left-0');
        navLinks.classList.toggle('w-full');
        navLinks.classList.toggle('bg-white');
        navLinks.classList.toggle('shadow-lg');
        navLinks.classList.toggle('p-4');
        navLinks.classList.toggle('space-y-4');
    }
}

// Utility functions
function showMembershipForm(type) {
    const modal = createFormModal(`Join as ${type}`, `
        <form class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Full Name *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email Address *</label>
                <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Medical License Number *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Institution/Hospital *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Medical Specialty</label>
                <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Specialty</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="emergency">Emergency Medicine</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="oncology">Oncology</option>
                    <option value="neurology">Neurology</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Submit Application
            </button>
        </form>
    `);
    
    document.body.appendChild(modal);
}

function showContactForm(type) {
    const modal = createFormModal(`Contact Sales - ${type}`, `
        <form class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Organization Name *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Contact Person *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email Address *</label>
                <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Phone Number</label>
                <input type="tel" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Number of Members *</label>
                <select required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select range</option>
                    <option value="1-10">1-10 members</option>
                    <option value="11-25">11-25 members</option>
                    <option value="26-50">26-50 members</option>
                    <option value="50+">50+ members</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Additional Requirements</label>
                <textarea class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Please describe any specific requirements or questions..."></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Request Quote
            </button>
        </form>
    `);
    
    document.body.appendChild(modal);
}

function createFormModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-screen overflow-y-auto modal-content">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold">${title}</h3>
                <button class="close-modal text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            ${content}
        </div>
    `;
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
}

function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 toast';
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    toast.querySelector('button').addEventListener('click', function() {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    });
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

function showErrorMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 toast';
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    toast.querySelector('button').addEventListener('click', function() {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    });
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// Additional utility functions for new features
function showResearchSubmissionForm() {
    const modal = createFormModal('Submit Research Paper', `
        <form class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Paper Title *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Lead Author *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Research Category *</label>
                <select required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select category</option>
                    <option value="clinical">Clinical Research</option>
                    <option value="basic">Basic Science</option>
                    <option value="translational">Translational Medicine</option>
                    <option value="epidemiology">Epidemiology</option>
                    <option value="ethics">Medical Ethics</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Abstract *</label>
                <textarea required rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Please provide a brief abstract of your research..."></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Keywords</label>
                <input type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter keywords separated by commas">
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Submit for Review
            </button>
        </form>
    `);
    
    document.body.appendChild(modal);
}

function showGeneralMembershipForm() {
    const modal = createFormModal('Apply for Membership', `
        <form class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Membership Type *</label>
                <select required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select type</option>
                    <option value="resident">Resident/Fellow - $95/year</option>
                    <option value="physician">Practicing Physician - $245/year</option>
                    <option value="institution">Department/Institution - $1,200/year</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Full Name *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email Address *</label>
                <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Medical Specialty *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Years of Experience</label>
                <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select range</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="15+">15+ years</option>
                </select>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Submit Application
            </button>
        </form>
    `);
    
    document.body.appendChild(modal);
}

function showSchedulingForm() {
    const modal = createFormModal('Schedule Information Session', `
        <form class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Full Name *</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email Address *</label>
                <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Phone Number</label>
                <input type="tel" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Preferred Date *</label>
                <input type="date" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Preferred Time *</label>
                <select required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">bottomics of Interest</label>
                <textarea class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3" placeholder="What aspects of CFIMH are you most interested in learning about?"></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Schedule Session
            </button>
        </form>
    `);
    
    document.body.appendChild(modal);
}

function showAppDownloadOptions() {
    const modal = createFormModal('Download CFIMH Mobile App', `
        <div class="text-center space-y-6">
            <div class="mb-6">
                <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-mobile-alt text-blue-600 text-3xl"></i>
                </div>
                <h4 class="text-lg font-bold mb-2">Get the CFIMH Mobile App</h4>
                <p class="text-gray-600">Access guidelines, forums, and CME programs on the go</p>
            </div>
            
            <div class="space-y-4">
                <button class="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center">
                    <i class="fab fa-apple text-2xl mr-3"></i>
                    <div class="text-left">
                        <div class="text-xs">Download on the</div>
                        <div class="text-lg font-bold">App Store</div>
                    </div>
                </button>
                
                <button class="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center">
                    <i class="fab fa-google-play text-2xl mr-3"></i>
                    <div class="text-left">
                        <div class="text-xs">Get it on</div>
                        <div class="text-lg font-bold">Google Play</div>
                    </div>
                </button>
            </div>
            
            <div class="text-sm text-gray-600">
                <p>• Access 180+ clinical guidelines offline</p>
                <p>• Participate in professional forums</p>
                <p>• Track CME credits and progress</p>
                <p>• Receive push notifications for new content</p>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    // Add click handlers for app store buttons
    modal.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('App Store')) {
            button.addEventListener('click', () => showAppDownload('iOS'));
        } else if (button.textContent.includes('Google Play')) {
            button.addEventListener('click', () => showAppDownload('Android'));
        }
    });
}

// Additional helper functions
function showMemberLogin() {
    const modal = createFormModal('Member Login', `
        <form class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Password</label>
                <input type="password" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex items-center justify-between">
                <label class="flex items-center">
                    <input type="checkbox" class="mr-2">
                    <span class="text-sm">Remember me</span>
                </label>
                <button type="button" class="text-blue-600 text-sm hover:underline">Forgot password?</button>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Sign In
            </button>
            <div class="text-center">
                <p class="text-sm text-gray-600">Don't have an account? 
                    <button type="button" class="text-blue-600 hover:underline">Sign up here</button>
                </p>
            </div>
        </form>
    `);
    
    document.body.appendChild(modal);
}

function showLatestIssue() {
    const modal = createFormModal('CFIMH Clinical Research Quarterly - Latest Issue', `
        <div class="space-y-4">
            <div class="text-center mb-4">
                <div class="bg-blue-100 w-16 h-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-journal-whills text-blue-600 text-2xl"></i>
                </div>
                <h4 class="text-lg font-bold">Volume 47, Issue 3 - September 2025</h4>
            </div>
            
            <div class="space-y-3">
                <div class="border border-gray-200 rounded-lg p-3">
                    <h5 class="font-semibold text-sm">Featured Article</h5>
                    <p class="text-sm text-gray-600">"Novel Biomarkers in Early-Stage Oncological Detection"</p>
                    <p class="text-xs text-gray-500">Dr. Elena Vasquez, MD, PhD</p>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-3">
                    <h5 class="font-semibold text-sm">Research Update</h5>
                    <p class="text-sm text-gray-600">"AI-Assisted Diagnostic Protocols in Emergency Medicine"</p>
                    <p class="text-xs text-gray-500">Prof. James Mitchell, MD, FACS</p>
                </div>
                
                <div class="border border-gray-200 rounded-lg p-3">
                    <h5 class="font-semibold text-sm">Clinical Guidelines</h5>
                    <p class="text-sm text-gray-600">"Updated Cardiovascular Disease Management Protocols"</p>
                    <p class="text-xs text-gray-500">CFIMH Guidelines Committee</p>
                </div>
            </div>
            
            <div class="text-center pt-4">
                <button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    <i class="fas fa-download mr-2"></i>Download Full Issue
                </button>
                <p class="text-xs text-gray-500 mt-2">Member access required</p>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function showFullEventCalendar() {
    const modal = createFormModal('CFIMH Events Calendar', `
        <div class="space-y-4">
            <div class="grid grid-cols-7 gap-1 text-center text-sm">
                <div class="font-semibold p-2">Sun</div>
                <div class="font-semibold p-2">Mon</div>
                <div class="font-semibold p-2">Tue</div>
                <div class="font-semibold p-2">Wed</div>
                <div class="font-semibold p-2">Thu</div>
                <div class="font-semibold p-2">Fri</div>
                <div class="font-semibold p-2">Sat</div>
                
                <!-- Calendar days would be dynamically generated -->
                <div class="p-2 text-gray-400">29</div>
                <div class="p-2 text-gray-400">30</div>
                <div class="p-2">1</div>
                <div class="p-2">2</div>
                <div class="p-2">3</div>
                <div class="p-2">4</div>
                <div class="p-2">5</div>
                <div class="p-2">6</div>
                <div class="p-2">7</div>
                <div class="p-2">8</div>
                <div class="p-2">9</div>
                <div class="p-2">10</div>
                <div class="p-2">11</div>
                <div class="p-2">12</div>
                <div class="p-2">13</div>
                <div class="p-2">14</div>
                <div class="p-2 bg-blue-100 text-blue-800 font-semibold rounded">15</div>
                <div class="p-2">16</div>
                <div class="p-2 bg-blue-100 text-blue-800 font-semibold rounded">17</div>
                <div class="p-2">18</div>
                <div class="p-2">19</div>
                <div class="p-2">20</div>
                <div class="p-2">21</div>
                <div class="p-2">22</div>
                <div class="p-2">23</div>
                <div class="p-2">24</div>
                <div class="p-2">25</div>
                <div class="p-2">26</div>
                <div class="p-2">27</div>
                <div class="p-2 bg-green-100 text-green-800 font-semibold rounded">28</div>
                <div class="p-2">29</div>
                <div class="p-2">30</div>
                <div class="p-2">31</div>
            </div>
            
            <div class="space-y-2 mt-4">
                <h5 class="font-semibold">Upcoming Events</h5>
                <div class="text-sm space-y-2">
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>Nov 15-17: Global Medical Research Symposium</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Oct 28: Ethics in AI Healthcare Workshop</span>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}