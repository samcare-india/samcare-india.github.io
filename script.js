// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 41, 59, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(30, 41, 59, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add staggered animation delay for service cards
            if (entry.target.classList.contains('service-card')) {
                const cards = document.querySelectorAll('.service-card');
                const index = Array.from(cards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
                entry.target.classList.add('fade-in-up');
            }
            
            // Add special animations for feature items
            if (entry.target.classList.contains('feature-item')) {
                const features = document.querySelectorAll('.feature-item');
                const index = Array.from(features).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.15}s`;
                entry.target.classList.add('fade-in-left');
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add loading animation to hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease-out';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.8s ease-out';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 400);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroButtons.style.transition = 'all 0.8s ease-out';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 600);
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Navigation floating animation removed for fixed header
});

// Form handling with Email and WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const emailBtn = document.getElementById('emailBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const form = document.getElementById('contactForm');

    // Email button functionality
    emailBtn.addEventListener('click', function() {
        if (validateForm()) {
            const formData = getFormData();
            sendViaEmail(formData);
        }
    });

    // WhatsApp button functionality
    whatsappBtn.addEventListener('click', function() {
        if (validateForm()) {
            const formData = getFormData();
            sendViaWhatsApp(formData);
        }
    });

    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';
                field.focus();
            } else {
                field.style.borderColor = '#e2e8f0';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields.', 'error');
        }
        
        return isValid;
    }

    function getFormData() {
        return {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            city: document.getElementById('customerCity').value,
            serviceType: document.getElementById('serviceType').value,
            message: document.getElementById('serviceMessage').value
        };
    }

    function sendViaEmail(data) {
        // Try to open email client with a shorter, more compatible message
        const subject = encodeURIComponent(`Service Request: ${data.serviceType}`);
        const body = encodeURIComponent(`Hello SAM CARE,

I need ${data.serviceType} service.

Customer Details:
Name: ${data.name}
Phone: ${data.phone}
City: ${data.city}

Service Details: ${data.message}

Please contact me to schedule the service.

Thank you!`);

        const mailtoLink = `mailto:monif@samcare.in?subject=${subject}&body=${body}`;
        
        // Try to open mailto link
        try {
            window.location.href = mailtoLink;
            showNotification('Opening email client...', 'success');
        } catch (error) {
            console.error('Mailto failed:', error);
            showNotification('Please try the WhatsApp option or contact us directly at monif@samcare.in', 'error');
        }
    }

    function sendViaWhatsApp(data) {
        const message = encodeURIComponent(`🔧 *SAM CARE Service Request*

️ *Service Needed:* ${data.serviceType}

👤 *Customer Details:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💼 Name: ${data.name}
 Phone: ${data.phone}
🏙️ City: ${data.city}

💬 *Service Details:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please schedule my service at your earliest convenience. Thank you! 🙏`);

        const whatsappLink = `https://wa.me/917320924551?text=${message}`;
        window.open(whatsappLink, '_blank');
        
        showNotification('Opening WhatsApp...', 'success');
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Determine background color
    let backgroundColor;
    if (type === 'success') {
        backgroundColor = '#10b981';
    } else if (type === 'error') {
        backgroundColor = '#ef4444';
    } else {
        backgroundColor = '#3b82f6';
    }
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add loading animation for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Statistics counter animation
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            const currentValue = Math.floor(start);
            // Add comma formatting for numbers >= 1000
            const formattedValue = currentValue >= 1000 ? currentValue.toLocaleString() : currentValue;
            element.textContent = formattedValue;
            requestAnimationFrame(updateCounter);
        } else {
            // Final value with comma formatting and suffix
            const finalValue = target >= 1000 ? target.toLocaleString() : target;
            element.innerHTML = finalValue + '<strong style="color: #2563eb; font-size: 2.5rem; font-weight: 700;">' + suffix + '</strong>';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.getAttribute('data-target'));
            const suffix = statNumber.getAttribute('data-suffix') || '';
            
            if (!isNaN(targetValue)) {
                statNumber.textContent = '0';
                animateCounter(statNumber, targetValue, 2000, suffix);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroShape = document.querySelector('.hero-shape');
    
    if (hero && heroShape) {
        const rate = scrolled * -0.5;
        heroShape.style.transform = `translateY(${rate}px) rotate(45deg)`;
    }
});

// Preloader (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add loaded class styles
const loadedStyles = document.createElement('style');
loadedStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(loadedStyles);
