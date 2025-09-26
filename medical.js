// CFIMH Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initStatsCounter();
    initSearchFunctionality();
    initMembershipCards();
    initFormHandling();
    initMobileMenu();
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
            }
        });
    });
}

// Animated stats counter
function initStatsCounter() {
    const stats = [
        { element: '.stat-number', targets: ['25,000+', '1,250', '50,000', '180'] }
    ];
    
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
    const isNumberOnly = /^\d+$/.test(finalText.replace(/,/g, ''));
    
    if (isNumberOnly) {
        const finalNumber = parseInt(finalText.replace(/,/g, ''));
        let currentNumber = 0;
        const increment = finalNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentNumber).toLocaleString();
        }, 40);
    }
}

// Search functionality
function initSearchFunctionality() {
    const searchButton = document.querySelector('.fa-search');
    const searchContainer = createSearchModal();
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            document.body.appendChild(searchContainer);
            searchContainer.style.display = 'flex';
            searchContainer.querySelector('input').focus();
        });
    }
}

function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.style.display = 'none';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold">Search CFIMH</h3>
                <button class="close-search text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="relative mb-4">
                <input type="text" placeholder="Search research, forums, resources..." 
                       class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <button class="absolute right-3 top-3 text-gray-400 hover:text-blue-600">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            <div class="text-sm text-gray-500">
                <p>Popular searches: CME programs, clinical guidelines, membership, research papers</p>
            </div>
        </div>
    `;
    
    // Close modal functionality
    modal.querySelector('.close-search').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Search input functionality
    const searchInput = modal.querySelector('input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
            modal.remove();
        }
    });
    
    return modal;
}

function performSearch(query) {
    if (query.trim()) {
        // In a real application, this would connect to a search API
        alert(`Searching for: "${query}"\n\nThis would connect to the CFIMH search system to find relevant research papers, forum discussions, and resources.`);
    }
}

// Enhanced membership cards
function initMembershipCards() {
    const membershipCards = document.querySelectorAll('.bg-white.rounded-xl.p-8.shadow-lg');
    
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

function showMembershipForm(type) {
    const modal = createFormModal(`Join as ${type}`, `
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
                <label class="block text-sm font-medium mb-1">Institution/Hospital</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
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
                <label class="block text-sm font-medium mb-1">Organization Name</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Contact Person</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Number of Members</label>
                <select required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select range</option>
                    <option value="1-10">1-10 members</option>
                    <option value="11-25">11-25 members</option>
                    <option value="26-50">26-50 members</option>
                    <option value="50+">50+ members</option>
                </select>
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
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-screen overflow-y-auto">
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
    
    // Simulate form submission
    showSuccessMessage('Thank you! Your application has been submitted successfully. You will receive a confirmation email shortly.');
    
    // Close the modal
    const modal = form.closest('.fixed');
    if (modal) {
        modal.remove();
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
    }
}

function showResearchSubmissionForm() {
    const modal = createFormModal('Submit Research Paper', `
        <form class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-1">Paper Title</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Lead Author</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Research Category</label>
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
                <label class="block text-sm font-medium mb-1">Abstract</label>
                <textarea required rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
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
                <label class="block text-sm font-medium mb-1">Membership Type</label>
                <select required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select type</option>
                    <option value="resident">Resident/Fellow - $95/year</option>
                    <option value="physician">Practicing Physician - $245/year</option>
                    <option value="institution">Department/Institution - $1,200/year</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Medical Specialty</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
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
                <label class="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Preferred Date</label>
                <input type="date" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Preferred Time</label>
                <select required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                </select>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Schedule Session
            </button>
        </form>
    `);
    
    document.body.appendChild(modal);
}

function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
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
        toast.remove();
    });
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    // Add mobile menu toggle if needed
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
        alert('Mobile menu functionality would be implemented here to show/hide navigation items.');
    });
}