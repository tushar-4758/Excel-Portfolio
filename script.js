// Initialize Lucide icons
lucide.createIcons();

// Navigation functionality
let activeSection = 'home';

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
    
    // Update toggle icon
    updateNavToggleIcon();
}

// Update active navigation link
function updateActiveNav() {
    const sections = ['home', 'about', 'projects', 'resume', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
    });
    
    if (current && current !== activeSection) {
        activeSection = current;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = Array.from(navLinks).find(link => 
            link.textContent.toLowerCase() === current
        );
        
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    updateNavToggleIcon();
}

// Update nav toggle icon
function updateNavToggleIcon() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const icon = navToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    
    // Recreate icons to update the display
    lucide.createIcons();
}

// Contact form handling
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    console.log('Form submitted:', data);
    
    // Here you would typically send the data to a server
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    event.target.reset();
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0%';
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up scroll listener for active navigation
    window.addEventListener('scroll', updateActiveNav);
    
    // Set up mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Set up contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleContactForm);
    
    // Initialize skill bar animations
    animateSkillBars();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            updateNavToggleIcon();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const navMenu = document.getElementById('navMenu');
        if (window.innerWidth >= 768) {
            navMenu.classList.remove('active');
            updateNavToggleIcon();
        }
    });
    
    // Initialize icons
    lucide.createIcons();
});

// Utility function to debounce scroll events
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

// Use debounced scroll handler for better performance
window.addEventListener('scroll', debounce(updateActiveNav, 10));