// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {

    // WhatsApp CTA (define uma vez e aplica em todos os botões/links)
    const rawNumber = (document.body?.dataset?.whatsappNumber || '').trim();
    const whatsappNumber = rawNumber || '55XXXXXXXXXXX'; // atualize no index.html
    const defaultMessage =
        'Olá! Quero conversar sobre Consultoria de TI, Automação e IA.\n' +
        'Empresa: \n' +
        'Segmento: \n' +
        'Tamanho do time de TI: \n' +
        'Gargalo nº 1: \n';
    const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

    document.querySelectorAll('.whatsapp-cta').forEach((link) => {
        link.setAttribute('href', whatsappHref);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.92)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.92)';
            header.style.backdropFilter = 'none';
        }
    });

    // Simple animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and benefit items
    document.querySelectorAll('.feature-card, .benefit-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Optional: Add click tracking for analytics
    document.querySelectorAll('.cta-button, .hero-cta, .whatsapp-cta').forEach(button => {
        button.addEventListener('click', function() {
            // Example: Google Analytics event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: this.textContent.trim()
                });
            }
        });
    });

    // Optional: Lazy load heavy elements when needed
    function lazyLoadElements() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        const lazyElementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('loaded');
                    lazyElementObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach(el => {
            lazyElementObserver.observe(el);
        });
    }

    // Initialize lazy loading if elements exist
    if (document.querySelectorAll('[data-lazy]').length > 0) {
        lazyLoadElements();
    }
});