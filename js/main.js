document.addEventListener('DOMContentLoaded', function() {
    // Cookie Consent
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1500);
    }
    
    // Handle cookie accept button
    cookieAccept.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        cookieConsent.classList.remove('show');
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        this.innerHTML = menu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !mobileMenuBtn.contains(event.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Scroll animations
    const header = document.querySelector('header');
    const scrollDownBtn = document.querySelector('.scroll-down');
    const animatedElements = document.querySelectorAll('.section-header, .about-image, .about-text, .features li, .tour-card, .hotel-card, .destination-card, .testimonial, .contact-info, .contact-form');
    
    // Scroll down button
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('hakkimizda');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animate elements when they come into view
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    });
    
    // Trigger initial scroll to animate visible elements
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 500);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Create animated background elements
    const createAnimatedBg = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const animatedBg = document.createElement('div');
            animatedBg.className = 'animated-bg';
            
            for (let i = 0; i < 10; i++) {
                const span = document.createElement('span');
                animatedBg.appendChild(span);
            }
            
            section.appendChild(animatedBg);
        }
    };
    
    // Add animated backgrounds to sections
    createAnimatedBg('yerler');
    createAnimatedBg('iletisim');
    
    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Initial animation
        testimonials.forEach((testimonial, index) => {
            if (index === 0) {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateY(0)';
            } else {
                testimonial.style.opacity = '0';
                testimonial.style.transform = 'translateY(30px)';
            }
        });
        
        // Auto-scroll testimonials
        setInterval(() => {
            testimonials[currentTestimonial].style.opacity = '0';
            testimonials[currentTestimonial].style.transform = 'translateY(30px)';
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            
            testimonials[currentTestimonial].style.opacity = '1';
            testimonials[currentTestimonial].style.transform = 'translateY(0)';
        }, 5000);
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Image hover effects
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('h3').style.transform = 'translateY(0)';
            card.querySelector('h3').style.opacity = '1';
            card.querySelector('p').style.transform = 'translateY(0)';
            card.querySelector('p').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('h3').style.transform = 'translateY(20px)';
            card.querySelector('h3').style.opacity = '0';
            card.querySelector('p').style.transform = 'translateY(20px)';
            card.querySelector('p').style.opacity = '0';
        });
    });
    
    // Form validation with animation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Shake animation for invalid fields
                    input.style.animation = 'none';
                    setTimeout(() => {
                        input.style.animation = 'shake 0.5s';
                    }, 10);
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message (in a real application, you would submit the form)
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mesajınız başarıyla gönderildi!';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Animation for success message
                successMessage.style.animation = 'fadeIn 0.5s forwards';
            }
        });
        
        // Remove error class on input
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    }
    
    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .error {
            border-color: #ff3860 !important;
            box-shadow: 0 0 0 3px rgba(255, 56, 96, 0.1) !important;
        }
        
        .success-message {
            text-align: center;
            color: #23d160;
            font-size: 1.5rem;
            padding: 50px 0;
            opacity: 0;
        }
        
        .success-message i {
            font-size: 3rem;
            margin-bottom: 20px;
            display: block;
        }
    `;
    document.head.appendChild(style);
});