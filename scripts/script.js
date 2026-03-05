const burgerMenu = document.querySelector('.burger__menu');
const nav = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.header__link');

burgerMenu.addEventListener('click', () => {
    nav.classList.toggle('open');
    burgerMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                nav.classList.remove('open');
                burgerMenu.classList.remove('open');
                document.body.classList.remove('no-scroll');
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});




const toggleDarkMode = document.querySelector('#theme-toggle');

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

const savedTheme = localStorage.getItem('theme') || 'html-light';
applyTheme(savedTheme);

toggleDarkMode?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'html-light' ? 'html-dark' : 'html-light';
    applyTheme(newTheme);
});




const initAccordion = (itemSelector, activeClass) => {
    const items = document.querySelectorAll(itemSelector);

    items.forEach(item => {
        const header = item.querySelector('div[class$="header"]');
        
        if (header) {
            header.addEventListener('click', () => {
                const isOpen = item.classList.contains(activeClass);

                items.forEach(i => i.classList.remove(activeClass));

                if (!isOpen) {
                    item.classList.add(activeClass);
                }
            });
        }
    });
};

initAccordion('.faq__item', 'faq__item--active');
initAccordion('.accordion__item', 'accordion__item--active');




const slider = document.querySelector('.projects__list');
const prevBtn = document.querySelector('.projects__btn--prev');
const nextBtn = document.querySelector('.projects__btn--next');

const getScrollStep = () => {
    const card = slider.querySelector('.projects__card');
    return card ? card.offsetWidth + 30 : 0;
};

const scrollNext = () => {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    
    if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({left: 0, behavior: 'smooth'});
    } else {
        slider.scrollBy({left: getScrollStep(), behavior: 'smooth'});
    }
};

let autoScroll = setInterval(scrollNext, 5000);

nextBtn?.addEventListener('click', () => {
    scrollNext();
});

prevBtn?.addEventListener('click', () => {
    slider.scrollBy({left: -getScrollStep(), behavior: 'smooth'});
});




const backToTop = document.createElement('button');
backToTop.classList.add('back-to-top');
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});




const modal = document.querySelector('#contactModal');
const openBtn = document.querySelector('#openModal');
const closeBtn = document.querySelector('.modal__close');
const overlay = document.querySelector('.modal__overlay');
const toggleModal = () => modal.classList.toggle('modal--active');

openBtn?.addEventListener('click', toggleModal);

[closeBtn, overlay].forEach(el => el?.addEventListener('click', toggleModal));

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
        toggleModal();
    }
});