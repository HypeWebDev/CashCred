document.addEventListener('DOMContentLoaded', () => {

    // Animações ao rolar a página
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona as classes do Animate.css quando o elemento fica visível
                const animationClass = entry.target.classList[1]; // Pega a segunda classe (ex: animate__fadeInUp)
                const delayClass = entry.target.dataset.animateDelay ? `animate__delay-${entry.target.dataset.animateDelay}` : '';

                entry.target.classList.add('animate__animated', animationClass, delayClass);
                entry.target.style.opacity = 1; // Garante que o elemento fique visível

                observer.unobserve(entry.target); // Para de observar depois de animar
            }
        });
    }, {
        threshold: 0.15 // A animação começa quando 15% do elemento está visível
    });

    // Inicia observando todos os elementos com a classe .animate__animated
    // Adicionei uma propriedade 'opacity: 0' via JS para não depender do CSS
    const animatedElements = document.querySelectorAll('.animate__animated');
    animatedElements.forEach(el => {
        el.style.opacity = 0; // Esconde o elemento inicialmente
        observer.observe(el);
    });

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
            const answer = answerContainer.querySelector('p');
            
            question.classList.toggle('active');

            if (question.classList.contains('active')) {
                answerContainer.style.maxHeight = answer.scrollHeight + 40 + 'px'; // 40px para o padding
                answerContainer.style.padding = '0 20px 20px';
            } else {
                answerContainer.style.maxHeight = '0';
                answerContainer.style.padding = '0 20px';
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

    // Fecha o menu mobile ao clicar em um link
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