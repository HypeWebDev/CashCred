document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE ANIMAÇÃO CORRIGIDA ---
    // Animações apenas para elementos que aparecem com a rolagem
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation;
                const delay = element.dataset.delay;

                if (delay) {
                    element.style.animationDelay = delay;
                }
                
                // Adiciona as classes para iniciar a animação do Animate.css
                element.classList.add('animate__animated', animation);

                // Torna o elemento visível
                element.style.opacity = 1;

                // Para de observar o elemento para não animar de novo
                scrollObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.15
    });

    // Observa apenas os elementos com a classe .js-scroll-animate
    const elementsToAnimate = document.querySelectorAll('.js-scroll-animate');
    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });
    // --- FIM DA LÓGICA DE ANIMAÇÃO ---


    // Header fixo (sticky)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Swiper para Depoimentos
    const swiper = new Swiper('.testimonial-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        grabCursor: true,
        spaceBetween: 30,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });

    // Accordion para FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answerContainer = question.nextElementSibling;
            question.classList.toggle('active');

            if (question.classList.contains('active')) {
                answerContainer.style.maxHeight = answerContainer.scrollHeight + 'px';
            } else {
                answerContainer.style.maxHeight = '0';
            }
        });
    });

    // Menu Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});