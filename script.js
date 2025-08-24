// Enhanced JavaScript for Budget Earbuds Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Budget Earbuds website loaded successfully! 🎧');

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .footer-section a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced FAQ Toggle functionality with keyboard support
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Click handler
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });

        // Keyboard handler for accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(this);
            }
        });
    });

    function toggleFAQ(questionElement) {
        const faqItem = questionElement.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const toggle = questionElement.querySelector('.faq-toggle');
        const isExpanded = questionElement.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQ items
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== questionElement) {
                const otherItem = otherQuestion.parentElement;
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherToggle = otherQuestion.querySelector('.faq-toggle');
                
                otherAnswer.classList.remove('active');
                otherToggle.textContent = '+';
                otherQuestion.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current FAQ item
        answer.classList.toggle('active');
        toggle.textContent = answer.classList.contains('active') ? '−' : '+';
        questionElement.setAttribute('aria-expanded', !isExpanded);
    }

    // Enhanced table row click handlers with accessibility
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            const productName = this.querySelector('td:first-child strong').textContent;
            const price = this.querySelector('td:nth-child(2)').textContent;
            
            // Add visual feedback
            this.style.backgroundColor = '#e0e7ff';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
            
            // You can add your affiliate link logic here
            console.log(`User clicked on ${productName} - ${price}`);
            
            // Example affiliate link redirect (replace with actual links)
            // window.open('https://your-affiliate-link.com', '_blank');
        });

        // Keyboard support for table rows
        row.setAttribute('tabindex', '0');
        row.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Navbar scroll effect with performance optimization
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Enhanced intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.table-container, .review-card, .faq-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Enhanced form validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // Success state
                emailInput.style.borderColor = '#10b981';
                emailInput.setCustomValidity('');
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = '#10b981';
                successMessage.style.marginTop = '10px';
                successMessage.style.fontWeight = '600';
                
                this.appendChild(successMessage);
                
                // Clear form
                emailInput.value = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
                
                console.log('Newsletter subscription:', email);
            } else {
                // Error state
                emailInput.style.borderColor = '#ef4444';
                emailInput.setCustomValidity('Please enter a valid email address');
            }
        });

        // Real-time email validation
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = '#10b981';
                this.setCustomValidity('');
            }
        });
    }

    // Enhanced button hover effects
    function addButtonEffects() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    addButtonEffects();

    // Scroll to Reviews function
    window.scrollToReviews = function() {
        const reviewsSection = document.querySelector('#reviews');
        if (reviewsSection) {
            const offsetTop = reviewsSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Enhanced buy button functionality
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
            
            // Track click for analytics (if needed)
            const productName = this.closest('.review-card').querySelector('h3').textContent;
            console.log(`Buy button clicked for: ${productName}`);
        });
    });

    // Performance optimization: Debounced scroll handler
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

    // Add scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #FF4500, #e63900);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        const updateProgress = debounce(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, 10);

        window.addEventListener('scroll', updateProgress);
    }

    createScrollProgress();

    // Accessibility: Skip to main content
    function createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#reviews';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #FF4500;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    createSkipLink();

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }

    console.log('All JavaScript functionality initialized successfully! 🚀');
});
