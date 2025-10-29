// Loading Screen Handler
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Add a small delay for visual effect
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
        }, 500);
    }
});

// Fallback - remove loading screen after 2 seconds regardless
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('loaded');
    }
}, 2000);

// ===== HERO BACKGROUND SLIDESHOW =====
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function nextSlide() {
        // Remove active from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
});

// ===== THEME TOGGLE =====
// Initialize theme - default to light mode, only use saved preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Default to light mode unless user has saved a preference
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// Toggle theme function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Trigger animation
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            toggle.style.transform = 'rotate(0deg)';
        }, 400);
    }
}

// Initialize theme immediately (before DOM loads)
initTheme();

// Setup theme toggle button
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Keyboard accessibility
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
});

// Navigation
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Close mobile menu when clicking on a link (Bootstrap handles the toggle)
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Close Bootstrap collapse when link is clicked
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Smooth scrolling for hash links only (allow normal links like bike.html)
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href') || '';
        if (!href.startsWith('#')) return; // not a hash link
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add slide-in animations to tour cards
    const tourCards = document.querySelectorAll('.tour-card');
    tourCards.forEach((card, index) => {
        card.classList.add('slide-in-left');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add scale-in animation to about features
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.classList.add('scale-in');
        observer.observe(feature);
    });
});

// Testimonials Carousel
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showTestimonial(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialSlides[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
}

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// Tour Card Interactions
const tourCards = document.querySelectorAll('.tour-card');
const tourButtons = document.querySelectorAll('.btn-tour');

tourButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const tourCard = this.closest('.tour-card');
        const tourName = tourCard.querySelector('h3').textContent;
        
        // Add booking animation
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Booked!';
            this.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            
            // Show success message
            showNotification(`Successfully booked ${tourName}! We'll contact you soon.`, 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                this.innerHTML = 'Book This Tour';
                this.disabled = false;
                this.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            }, 3000);
        }, 1500);
    });
});


// Booking System
const contactForm = document.getElementById('contact-form');
const tourSelect = document.getElementById('tour');
const guestsSelect = document.getElementById('guests');
const dateInput = document.getElementById('date');
const pickupSelect = document.getElementById('pickup');

// Set minimum date to today
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// Professional booking summary with animations
function updateBookingSummary() {
    const selectedTour = tourSelect.value;
    const selectedGuests = guestsSelect.value;
    const selectedDate = dateInput.value;
    const selectedPickup = pickupSelect.value;
    
    // Animate booking summary update
    const bookingSummary = document.querySelector('.booking-summary');
    if (bookingSummary) {
        bookingSummary.style.transform = 'scale(0.98)';
        setTimeout(() => {
            bookingSummary.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Update tour display with animation
    const tourDisplay = document.getElementById('selected-tour');
    if (selectedTour) {
        const tourOption = tourSelect.querySelector(`option[value="${selectedTour}"]`);
        if (tourDisplay) {
            tourDisplay.style.opacity = '0';
            tourDisplay.style.transform = 'translateX(-10px)';
            setTimeout(() => {
                tourDisplay.textContent = tourOption ? tourOption.textContent : 'Tour selected';
                tourDisplay.style.opacity = '1';
                tourDisplay.style.transform = 'translateX(0)';
            }, 150);
        }
    } else {
        if (tourDisplay) {
            tourDisplay.textContent = 'Please select a tour';
            tourDisplay.style.color = '#999';
        }
    }
    
    // Update guests display with animation
    const guestsDisplay = document.getElementById('selected-guests');
    if (guestsDisplay) {
        guestsDisplay.style.transform = 'scale(0.9)';
        guestsDisplay.textContent = selectedGuests || '-';
        setTimeout(() => {
            guestsDisplay.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Update date display with animation
    const dateDisplay = document.getElementById('selected-date');
    if (selectedDate) {
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (dateDisplay) {
            dateDisplay.style.opacity = '0';
            setTimeout(() => {
                dateDisplay.textContent = formattedDate;
                dateDisplay.style.opacity = '1';
                dateDisplay.style.color = '#667eea';
            }, 150);
        }
    } else {
        if (dateDisplay) {
            dateDisplay.textContent = '-';
            dateDisplay.style.color = '#999';
        }
    }
    
    // Update pickup display with animation
    const pickupDisplay = document.getElementById('selected-pickup');
    if (pickupDisplay) {
        pickupDisplay.style.transform = 'translateY(-5px)';
        pickupDisplay.textContent = selectedPickup || '-';
        setTimeout(() => {
            pickupDisplay.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Calculate total price with animation
    let totalPrice = 0;
    if (selectedTour) {
        const tourOption = tourSelect.querySelector(`option[value="${selectedTour}"]`);
        const tourPrice = tourOption ? parseInt(tourOption.dataset.price) : 0;
        const guests = parseInt(selectedGuests) || 1;
        
        // Base tour price
        totalPrice = tourPrice * guests;
        
        // Add pickup charges
        if (selectedPickup) {
            const pickupCharges = {
                'unawatuna': 0,
                'galle': 5,
                'hikkaduwa': 10,
                'bentota': 15,
                'colombo': 25,
                'airport': 30
            };
            totalPrice += pickupCharges[selectedPickup] || 0;
        }
    }
    
    // Animate total price update
    const totalPriceDisplay = document.getElementById('total-price');
    if (totalPriceDisplay) {
        totalPriceDisplay.style.transform = 'scale(1.1)';
        totalPriceDisplay.style.color = '#ff6b6b';
        setTimeout(() => {
            totalPriceDisplay.textContent = `$${totalPrice}`;
            totalPriceDisplay.style.transform = 'scale(1)';
            totalPriceDisplay.style.color = '#667eea';
        }, 200);
    }
}

// Add event listeners for real-time updates
if (tourSelect) tourSelect.addEventListener('change', updateBookingSummary);
if (guestsSelect) guestsSelect.addEventListener('change', updateBookingSummary);
if (dateInput) dateInput.addEventListener('change', updateBookingSummary);
if (pickupSelect) pickupSelect.addEventListener('change', updateBookingSummary);

// Enhanced form field interactions
const formFields = document.querySelectorAll('.form-control, .form-select');
formFields.forEach(field => {
    // Focus animations
    field.addEventListener('focus', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    // Blur animations
    field.addEventListener('blur', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.1)';
        this.parentElement.style.transform = 'scale(1)';
    });
    
    // Input animations
    field.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = '#28a745';
            this.style.background = 'rgba(40, 167, 69, 0.05)';
        } else {
            this.style.borderColor = '#e9ecef';
            this.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });
});

// Professional hover effects for booking summary
const bookingSummary = document.querySelector('.booking-summary');
if (bookingSummary) {
    bookingSummary.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
    });
    
    bookingSummary.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    });
}

// Animate form appearance on scroll
const formElement = document.getElementById('contact-form');
if (formElement) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(formElement);
}

// Contact Form Handler
const bookingForm = document.getElementById('contact-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const tour = formData.get('tour');
        const guests = formData.get('guests');
        const date = formData.get('date');
        const time = formData.get('time');
        const pickup = formData.get('pickup');
        const message = formData.get('message');
        const terms = formData.get('terms');
        
        // Basic validation
        if (!name || !email || !tour || !guests || !date) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!terms) {
            showNotification('Please accept the Terms & Conditions.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Date validation
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showNotification('Please select a future date.', 'error');
            return;
        }
        
        // Professional loading animation
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Add loading class and animation
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing Your Booking...';
        submitBtn.disabled = true;
        
        // Add form loading overlay
        const formOverlay = document.createElement('div');
        formOverlay.className = 'form-loading-overlay';
        formOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            border-radius: 20px;
        `;
        formOverlay.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <h5 class="text-primary">Processing Your Booking</h5>
                <p class="text-muted">Please wait while we confirm your tour...</p>
            </div>
        `;
        
        this.style.position = 'relative';
        this.appendChild(formOverlay);
        
        // Simulate form submission with progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 20;
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Remove loading overlay
                formOverlay.remove();
                
                // Success animation
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('booking-success');
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Booking Confirmed!';
                submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                
                // Show success notification with animation
                const tourName = tourSelect.querySelector(`option[value="${tour}"]`).textContent;
                const totalPrice = document.getElementById('total-price').textContent;
                
                setTimeout(() => {
                    showNotification(`🎉 Booking confirmed! ${tourName} for ${guests} guest(s) on ${new Date(date).toLocaleDateString()}. Total: ${totalPrice}. We'll contact you within 24 hours.`, 'success');
                }, 500);
                
                // Reset form with animation
                setTimeout(() => {
                    this.reset();
                    updateBookingSummary();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('booking-success');
                    submitBtn.style.background = '';
                }, 3000);
            }
        }, 400);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Tour Card Hover Effects
tourCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
});

// Form Input Animations
const formInputs = document.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Counter Animation for Statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Lazy Loading for Images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// Preload critical images
const criticalImages = [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dam Tours Unawatuna website loaded successfully!');
    
    // Add any initialization code here
});

// Loyalty Wheel: position labels, spin logic, and result handling
document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const labels = wheel ? Array.from(wheel.querySelectorAll('.label')) : [];
    const spinBtn = document.getElementById('spinBtn');
    const resetBtn = document.getElementById('resetSpinBtn');
    const wheelResult = document.getElementById('wheelResult');

    if (!wheel || labels.length === 0 || !spinBtn) return;

    const segments = labels.length;
    const segmentAngle = 360 / segments;

    // Position labels around the wheel
    function positionLabels() {
        const rect = wheel.getBoundingClientRect();
        const radius = Math.max(rect.width, rect.height) / 2 - 36; // padding from edge

        labels.forEach((label, i) => {
            const angle = i * segmentAngle; // degrees
            // rotate to angle, move outward by radius, then counter-rotate to keep text upright
            label.style.position = 'absolute';
            label.style.left = '50%';
            label.style.top = '50%';
            label.style.transform = `rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`;
            label.style.transformOrigin = 'center';
            label.style.whiteSpace = 'nowrap';
        });
    }

    // Initial positioning and reposition on resize
    positionLabels();
    window.addEventListener('resize', positionLabels);

    let isSpinning = false;
    let currentRotation = 0; // track absolute rotation in degrees (cumulative)

    function spinToIndex(targetIndex) {
        const spins = Math.floor(Math.random() * 3) + 4; // 4..6 full spins
        // compute degrees so that the target segment lands at pointer (top)
        const targetAngle = (targetIndex * segmentAngle) + segmentAngle / 2; // center of segment
        // Because rotating the wheel clockwise moves segments negatively relative to pointer,
        // we subtract targetAngle from 360 to align it to top.
        const degreesTo = (360 - targetAngle) % 360;
    const totalDegrees = spins * 360 + degreesTo;

    // accumulate absolute rotation so we actually spin multiple full turns
    currentRotation = currentRotation + totalDegrees;

        // Apply rotation
        wheel.style.transition = 'transform 5s cubic-bezier(.22,.9,.37,1)';
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        return { totalDegrees, finalRotation: currentRotation };
    }

    // Handle spin button
    spinBtn.addEventListener('click', function() {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.disabled = true;
        resetBtn.disabled = true;
        wheelResult.textContent = '';

        // pick random prize index
        const targetIndex = Math.floor(Math.random() * segments);

        // trigger spin
    spinToIndex(targetIndex);

        // Wait for transition end
        const onTransitionEnd = function(e) {
            if (e.propertyName !== 'transform') return;
            wheel.removeEventListener('transitionend', onTransitionEnd);

            // show result (based on targetIndex)
            const prize = labels[targetIndex].textContent.trim();
            wheelResult.textContent = `You won: ${prize}`;
            showNotification(`Congratulations! ${prize}`, 'success');

            // enable reset
            resetBtn.disabled = false;
            isSpinning = false;
        };

        wheel.addEventListener('transitionend', onTransitionEnd);
    });

    // Reposition labels when modal becomes visible (sizes are correct only when shown)
    const loyaltyModalEl = document.getElementById('loyaltyModal');
    if (loyaltyModalEl) {
        loyaltyModalEl.addEventListener('shown.bs.modal', positionLabels);
    }

    // Reset button: reset wheel to initial state
    resetBtn.addEventListener('click', function() {
        if (isSpinning) return;
        // temporarily disable transition to snap back
        wheel.style.transition = 'none';
        currentRotation = 0;
        wheel.style.transform = `rotate(0deg)`;
        wheelResult.textContent = '';
        resetBtn.disabled = true;
        spinBtn.disabled = false;

        // Force reflow then re-enable transition style for future spins
        void wheel.offsetWidth;
        wheel.style.transition = 'transform 5s cubic-bezier(.22,.9,.37,1)';
    });
});

// ============================================
// Handle "Book Now" buttons that open booking modal
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const bookingButtons = document.querySelectorAll('[data-open-booking="true"]');
    bookingButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const modalEl = document.getElementById('tourBookingModal');
            if (modalEl) {
                const bsModal = new bootstrap.Modal(modalEl);
                // Reset to Custom One-Day Tour
                const tourNameEl = document.getElementById('tb-tour-name');
                if (tourNameEl) {
                    tourNameEl.value = 'Custom One-Day Tour';
                }
                bsModal.show();
            }
        });
    });
});

// ============================================
// Tour Booking Modal (tb-* IDs)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const modalEl = document.getElementById('tourBookingModal');
    if (!modalEl) return; // page may not have the modal

    const bsModal = new bootstrap.Modal(modalEl);
    const nameEl = document.getElementById('tb-name');
    const tourNameEl = document.getElementById('tb-tour-name');
    const oneDayDates = document.getElementById('tb-one-day-dates');
    const roundDates = document.getElementById('tb-round-dates');
    const totalEl = document.getElementById('tb-total');
    const breakdownEl = document.getElementById('tb-breakdown');
    const waBtn = document.getElementById('tb-wa-btn');
    const emailBtn = document.getElementById('tb-email-btn');

    function setTripTypeUI() {
        const val = document.querySelector('input[name="tb-trip-type"]:checked')?.value || 'one-day';
        if (val === 'one-day') {
            oneDayDates.style.display = 'block';
            roundDates.style.display = 'none';
        } else {
            oneDayDates.style.display = 'none';
            roundDates.style.display = 'block';
        }
        updateTotals();
    }

    function calcDays(s, e) {
        if (!s || !e) return 1;
        const start = new Date(s);
        const end = new Date(e);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return Math.max(1, diff + 1); // inclusive
    }

    function updateTotals() {
        if (totalEl) totalEl.textContent = 'Contact for quote';
        if (breakdownEl) breakdownEl.textContent = "We'll confirm details on WhatsApp";
    }

    document.querySelectorAll('input[name="tb-trip-type"]').forEach(r => r.addEventListener('change', setTripTypeUI));
    ['tb-date','tb-start','tb-end','tb-guests'].forEach(id => document.getElementById(id)?.addEventListener('change', updateTotals));

    // Open modal from any .book-tour-btn
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.book-tour-btn');
        if (!btn) return;
        const t = btn.dataset.tour || 'Custom Tour';
        if (tourNameEl) tourNameEl.textContent = t;
        // reset form
        const form = modalEl.querySelector('form');
        form?.reset();
        const one = document.getElementById('tb-one-day');
        if (one) one.checked = true;
        setTripTypeUI();
        updateTotals();
        bsModal.show();
        setTimeout(() => nameEl?.focus(), 250);
    });

    waBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const tour = tourNameEl?.textContent?.trim() || 'Custom Tour';
        const name = nameEl?.value || '';
        const type = document.querySelector('input[name="tb-trip-type"]:checked')?.value || 'one-day';
        const guests = document.getElementById('tb-guests')?.value || '2';
        const pickup = document.getElementById('tb-pickup')?.value || '';
        const notes = document.getElementById('tb-message')?.value || '';
        let dateInfo = '';
        if (type === 'one-day') {
            const d = document.getElementById('tb-date')?.value || '';
            dateInfo = `Date: ${d}`;
        } else {
            const s = document.getElementById('tb-start')?.value || '';
            const en = document.getElementById('tb-end')?.value || '';
            const days = calcDays(s, en);
            dateInfo = `Round Tour: ${s} to ${en} (${days} days)`;
        }
        const msg = `Hi Dam Tours! I want to book:\n\n` +
            `Tour: ${tour}\n` +
            `${dateInfo}\n` +
            `Guests: ${guests}\n` +
            `Pickup: ${pickup}\n` +
            `Name: ${name}\n` +
            (notes ? `Special Requests: ${notes}\n` : '') +
            `\nPlease send me a quote. Thank you!`;
        const url = `https://wa.me/940762208819?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    });

    emailBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const tour = tourNameEl?.textContent?.trim() || 'Custom Tour';
        const name = nameEl?.value || '';
        const type = document.querySelector('input[name="tb-trip-type"]:checked')?.value || 'one-day';
        const guests = document.getElementById('tb-guests')?.value || '2';
        const pickup = document.getElementById('tb-pickup')?.value || '';
        const notes = document.getElementById('tb-message')?.value || '';
        
        let dateInfo = '';
        if (type === 'one-day') {
            const d = document.getElementById('tb-date')?.value || '';
            dateInfo = `Date: ${d}`;
        } else if (type === 'round') {
            const s = document.getElementById('tb-start')?.value || '';
            const en = document.getElementById('tb-end')?.value || '';
            const days = calcDays(s, en);
            dateInfo = `Round Tour: ${s} to ${en} (${days} days)`;
        } else if (type === 'city') {
            const d = document.getElementById('tb-city-date')?.value || '';
            const city = document.getElementById('tb-city')?.value || '';
            const hours = document.getElementById('tb-hours')?.value || '4';
            dateInfo = `City Tour in ${city}\nDate: ${d}\nDuration: ${hours} hours`;
        }

        const subject = `Tour Booking Request - ${tour}`;
        const body = `Hi Dam Tours,\n\n` +
            `I would like to book the following tour:\n\n` +
            `Tour: ${tour}\n` +
            `${dateInfo}\n` +
            `Number of Guests: ${guests}\n` +
            `Pickup Location: ${pickup}\n` +
            `Customer Name: ${name}\n` +
            (notes ? `\nSpecial Requests:\n${notes}\n` : '') +
            `\nPlease send me a detailed quote and confirm availability.\n\n` +
            `Thank you!`;

        const mailtoUrl = `mailto:info@damtours.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    });
});

// ============================================
// Bike Booking Modal (bb-* IDs) for bike.html
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const bikeModalEl = document.getElementById('bikeBookingModal');
    if (!bikeModalEl) return;

    const bsModal = new bootstrap.Modal(bikeModalEl);
    const bikeNameEl = document.getElementById('bb-bike-name');
    const nameEl = document.getElementById('bb-name');
    const startEl = document.getElementById('bb-start');
    const endEl = document.getElementById('bb-end');
    const pickupEl = document.getElementById('bb-pickup');
    const helmetsEl = document.getElementById('bb-helmets');
    const totalEl = document.getElementById('bb-total');
    const waBtn = document.getElementById('bb-wa-btn');
    const emailBtn = document.getElementById('bb-email-btn');

    let currentBike = { name: '', price: 0, cc: 0 };

    // Set min dates to today
    const today = new Date().toISOString().split('T')[0];
    if (startEl) startEl.min = today;
    if (endEl) endEl.min = today;

    function calcDays(s, e) {
        if (!s || !e) return 0;
        const start = new Date(s);
        const end = new Date(e);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return Math.max(1, diff); // 14th to 15th = 1 day
    }

    function updateTotal() {
        const start = startEl?.value || '';
        const end = endEl?.value || '';
        const days = calcDays(start, end);
        const total = currentBike.price * days;
        if (totalEl) totalEl.textContent = `$${total}`;
    }

    // Listen for date changes
    startEl?.addEventListener('change', () => {
        if (endEl && startEl.value) endEl.min = startEl.value;
        updateTotal();
    });
    endEl?.addEventListener('change', updateTotal);

    // Open modal from .book-bike-btn
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.book-bike-btn');
        if (!btn) return;
        const bike = btn.dataset.bike || 'Bike';
        const price = parseFloat(btn.dataset.price) || 0;
        const cc = parseInt(btn.dataset.cc) || 0;
        currentBike = { name: bike, price, cc };
        if (bikeNameEl) bikeNameEl.textContent = bike;
        // reset
        const form = bikeModalEl.querySelector('form');
        form?.reset();
        updateTotal();
        bsModal.show();
        setTimeout(() => nameEl?.focus(), 250);
    });

    // WhatsApp button
    waBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const name = nameEl?.value || '';
        const start = startEl?.value || '';
        const end = endEl?.value || '';
        const pickup = pickupEl?.value || '';
        const helmets = helmetsEl?.value || '2';
        const days = calcDays(start, end);
        const total = currentBike.price * days;

        const msg = `Hi Dam Tours! I want to rent a bike:\n\n` +
            `Bike: ${currentBike.name}\n` +
            `Dates: ${start} to ${end} (${days} days)\n` +
            `Pickup: ${pickup}\n` +
            `Helmets: ${helmets}\n` +
            `Name: ${name}\n` +
            `Estimated Total: $${total}\n\n` +
            `Please confirm availability. Thank you!`;

        const url = `https://wa.me/940762208819?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    });

    // Email button
    emailBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const name = nameEl?.value || '';
        const start = startEl?.value || '';
        const end = endEl?.value || '';
        const pickup = pickupEl?.value || '';
        const helmets = helmetsEl?.value || '2';
        const days = calcDays(start, end);
        const total = currentBike.price * days;

        const subject = `Bike Rental Booking - ${currentBike.name}`;
        const body = `Hi Dam Tours,\n\n` +
            `I would like to rent a bike:\n\n` +
            `Bike: ${currentBike.name}\n` +
            `Dates: ${start} to ${end} (${days} days)\n` +
            `Pickup Location: ${pickup}\n` +
            `Number of Helmets: ${helmets}\n` +
            `Customer Name: ${name}\n` +
            `Estimated Total: $${total}\n\n` +
            `Please confirm availability and provide payment details.\n\n` +
            `Thank you!`;

        const mailtoUrl = `mailto:info@damtours.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    });
});
