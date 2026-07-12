const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
const navToggle = document.querySelector('[data-nav-toggle]');
const mainNav = document.querySelector('.main-nav');
let currentTheme = 'light';

function renderThemeIcon(theme) {
  if (!toggle) return;
  toggle.innerHTML = theme === 'dark'
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56"/></svg>';
  toggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

function applyTheme(theme) {
  currentTheme = theme;
  root.setAttribute('data-theme', theme);
  renderThemeIcon(theme);
}

// The site always starts in light mode regardless of system preference.
applyTheme('light');

toggle?.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

function setMenuState(isOpen) {
  if (!navToggle || !mainNav) return;
  mainNav.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menu' : 'Abrir menu');
}

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav?.classList.contains('is-open');
  setMenuState(!isOpen);
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuState(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 720) setMenuState(false);
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -10% 0px' });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
