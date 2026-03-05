const burger = document.querySelector('.burger__menu');
const menu = document.querySelector('.header__nav');
const body = document.body;

burger.addEventListener('click', function() {
    menu.classList.toggle('open');
    burger.classList.toggle('open');
    body.classList.toggle('no-scroll');
});

const links = document.querySelectorAll('.header__link');

links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        const id = link.getAttribute('href');

        if (id.startsWith('#')) {
            event.preventDefault();
            
            const targetBlock = document.querySelector(id);
            if (targetBlock) {
                menu.classList.remove('open');
                burger.classList.remove('open');
                body.classList.remove('no-scroll');
                targetBlock.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});



const themeBtn = document.querySelector('#theme-toggle');

function setPageTheme(name) {
    document.documentElement.setAttribute('data-theme', name);
    localStorage.setItem('theme', name);
}

const memoryTheme = localStorage.getItem('theme');
if (memoryTheme) {
    setPageTheme(memoryTheme);
} else {
    setPageTheme('html-light');
}

if (themeBtn) {
    themeBtn.addEventListener('click', function() {
        const nowTheme = document.documentElement.getAttribute('data-theme');
        
        if (nowTheme === 'html-light') {
            setPageTheme('html-dark');
        } else {
            setPageTheme('html-light');
        }
    });
}




function initAccordion(itemsSelector, activeClass) {
    const boxes = document.querySelectorAll(itemsSelector);

    boxes.forEach(function(box) {
        const head = box.querySelector('div[class$="header"]');

        if (head) {
            head.addEventListener('click', function() {
                const isAlreadyOpen = box.classList.contains(activeClass);

                boxes.forEach(function(item) {
                    item.classList.remove(activeClass);
                });

                if (isAlreadyOpen === false) {
                    box.classList.add(activeClass);
                }
            });
        }
    });
}

initAccordion('.faq__item', 'faq__item--active');
initAccordion('.accordion__item', 'accordion__item--active');



const projectsList = document.querySelector('.projects__list');
const btnNext = document.querySelector('.projects__btn--next');
const btnPrev = document.querySelector('.projects__btn--prev');

function getStep() {
    const firstCard = projectsList.querySelector('.projects__card');
    if (firstCard) {
        return firstCard.offsetWidth + 30;
    }
    return 0;
}

function goNext() {
    const max = projectsList.scrollWidth - projectsList.clientWidth;
    
    if (projectsList.scrollLeft >= max - 10) {
        projectsList.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        projectsList.scrollBy({ left: getStep(), behavior: 'smooth' });
    }
}

if (btnNext) btnNext.addEventListener('click', goNext);
if (btnPrev) {
    btnPrev.addEventListener('click', function() {
        projectsList.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
}

setInterval(goNext, 5000);



const upBtn = document.createElement('button');
upBtn.classList.add('back-to-top');
upBtn.innerHTML = '↑';
document.body.appendChild(upBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        upBtn.classList.add('visible');
    } else {
        upBtn.classList.remove('visible');
    }
});

upBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



const modalWindow = document.querySelector('#contactModal');
const btnOpen = document.querySelector('#openModal');
const btnClose = document.querySelector('.modal__close');
const bgOverlay = document.querySelector('.modal__overlay');

function openOrClose() {
    modalWindow.classList.toggle('modal--active');
}

if (btnOpen) btnOpen.addEventListener('click', openOrClose);

if (btnClose) btnClose.addEventListener('click', openOrClose);

if (bgOverlay) bgOverlay.addEventListener('click', openOrClose);

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (modalWindow.classList.contains('modal--active')) {
            openOrClose();
        }
    }
});