// Mobile UX Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    const scrollProgress = document.getElementById('scrollProgress');
    const fab = document.getElementById('fab');
    const toast = document.getElementById('toast');
    
    // Hide loading overlay after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 300);
        }, 500);
    });
    
    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Floating Action Button (FAB)
    function toggleFAB() {
        if (window.pageYOffset > 300) {
            fab.classList.add('visible');
        } else {
            fab.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleFAB);
    
    // FAB click to scroll to top
    fab.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Toast notification
    function showToast(message, duration = 3000) {
        const toastMessage = document.getElementById('toastMessage');
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
    
    // Show welcome toast
    setTimeout(() => {
        showToast('Bem-vindo ao meu portfólio!');
    }, 1000);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Enhanced touch interactions for mobile
    if ('ontouchstart' in window) {
        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll('.project-card, .skill-card, .contact-link, .project-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Prevent double-tap zoom on buttons (excluding project links)
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            });
        });
        
        // Special handling for contact links to prevent interference
        const contactLinks = document.querySelectorAll('.contact-link');
        contactLinks.forEach(link => {
            link.addEventListener('touchend', function(e) {
                // Don't prevent default for contact links
                // Let them work naturally
            });
        });
        
        // Special handling for project links to ensure they work on mobile
        const projectLinks = document.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            link.addEventListener('touchend', function(e) {
                this.style.transform = '';
                // Allow default behavior for external links
                if (this.getAttribute('target') === '_blank') {
                    // Let the browser handle the link naturally
                    return true;
                }
            });
            
            link.addEventListener('touchcancel', function(e) {
                this.style.transform = '';
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Performance optimization: Lazy load images
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
    
    // Debounced resize handler for performance
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate any size-dependent elements
            updateScrollProgress();
        }, 250);
    });
    
    // Add haptic feedback for supported devices
    function addHapticFeedback(element) {
        element.addEventListener('click', function() {
            if (navigator.vibrate) {
                navigator.vibrate(50); // Short vibration
            }
        });
    }
    
    // Add haptic feedback to important buttons
    const importantButtons = document.querySelectorAll('.project-link, .contact-link, #theme-switcher');
    importantButtons.forEach(addHapticFeedback);
    
    // Enhanced error handling for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            try {
                // Add loading state
                this.style.opacity = '0.7';
                
                // For mobile devices, let the browser handle the link naturally
                if ('ontouchstart' in window) {
                    // Don't prevent default or interfere with mobile link handling
                    // Just add visual feedback
                    setTimeout(() => {
                        this.style.opacity = '';
                    }, 300);
                    return; // Let browser handle the link
                }
                
                setTimeout(() => {
                    this.style.opacity = '';
                }, 1000);
            } catch (error) {
                console.warn('Error handling external link:', error);
                // Let browser handle the link naturally
            }
        });
    });
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}