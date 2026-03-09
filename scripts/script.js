document.addEventListener('DOMContentLoaded', () => {
    initBurger();
    initTheme();
    initAccordion();
    initProjectSlider();
    initBackToTop();
    initContactModal();
});

function initBurger() {
    const burger = document.querySelector('.burger__menu');
    const nav = document.querySelector('.header__nav');
    if (!burger || !nav) return;

    const toggleMenu = () => {
        const isOpen = nav.classList.toggle('open');
        burger.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
        burger.setAttribute('aria-expanded', isOpen);
    };

    burger.addEventListener('click', toggleMenu);
    
    document.querySelectorAll('.header__link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    toggleMenu();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function initTheme() {
    const toggle = document.querySelector('#theme-toggle');
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    applyTheme(localStorage.getItem('theme') || 'html-light');

    toggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'html-light' ? 'html-dark' : 'html-light');
    });
}

function initAccordion() {
    const setup = (selector, activeClass) => {
        document.querySelectorAll(selector).forEach(item => {
            const header = item.querySelector('.js-accordion');
            header?.addEventListener('click', () => {
                const isOpen = item.classList.contains(activeClass);
                document.querySelectorAll(selector).forEach(i => i.classList.remove(activeClass));
                if (!isOpen) item.classList.add(activeClass);
            });
        });
    };
    setup('.faq__item', 'faq__item--active');
    setup('.accordion__item', 'accordion__item--active');
}

function initProjectSlider() {
    const slider = document.querySelector('.projects__list');
    const prevBtn = document.querySelector('.projects__btn--prev');
    const nextBtn = document.querySelector('.projects__btn--next');
    if (!slider) return;

    const getStep = () => (slider.querySelector('.projects__card')?.offsetWidth || 0) + 30;

    const scrollNext = () => {
        const max = slider.scrollWidth - slider.clientWidth;
        slider.scrollLeft >= max - 10 ? slider.scrollTo({left: 0, behavior: 'smooth'}) : slider.scrollBy({left: getStep(), behavior: 'smooth'});
    };

    setInterval(scrollNext, 5000);
    nextBtn?.addEventListener('click', scrollNext);
    prevBtn?.addEventListener('click', () => slider.scrollBy({left: -getStep(), behavior: 'smooth'}));
}

function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 300));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initContactModal() {
    const modal = document.querySelector('#contactModal');
    const openBtn = document.querySelector('#openModal');
    const closeBtns = [document.querySelector('.modal__close'), document.querySelector('.modal__overlay')];
    
    const toggle = (isOpen) => {
        modal?.classList.toggle('modal--active', isOpen);
        document.body.classList.toggle('no-scroll', isOpen);
    };

    openBtn?.addEventListener('click', () => toggle(true));
    closeBtns.forEach(btn => btn?.addEventListener('click', () => toggle(false)));
    window.addEventListener('keydown', (e) => e.key === 'Escape' && toggle(false));
}