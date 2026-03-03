const burgerMenu = document.querySelector('.burger__menu');
const nav = document.querySelector('.header__nav');
const toggleDarkMode = document.querySelector('.dark-mode-toggle');

burgerMenu.addEventListener('click', () => {
    nav.classList.toggle('open');
    burgerMenu.classList.toggle('open');
});

toggleDarkMode.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'html-light' ? 'html-dark' : 'html-light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'html-light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});