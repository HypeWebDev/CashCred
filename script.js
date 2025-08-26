document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const delay = entry.target.getAttribute('data-animate-delay');
                if (delay) {
                    entry.target.style.animationDelay = delay;
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate__animated');
    animatedElements.forEach(el => observer.observe(el));

    // Header sticky
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Inicialização ÚNICA do Swiper para a seção de depoimentos
    const swiperTestimonials = new Swiper('.testimonial-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1, // Padrão de 1 slide por vez
        spaceBetween: 30,
        effect: 'slide',
        breakpoints: {
            // Configurações para telas maiores
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            question.classList.toggle('active');
            answer.classList.toggle('open');
        });
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu mobile ao clicar em link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});