/* ============================
   ROGOMBE — MAIN JS
   ============================ */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// ---- BURGER MENU ----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });
  // Close on nav link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ---- SCROLL ANIMATIONS ----
const animateOnScroll = () => {
  // Service cards
  document.querySelectorAll('.service-card').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      const delay = parseInt(el.getAttribute('data-delay') || 0);
      setTimeout(() => el.classList.add('visible'), delay);
    }
  });

  // Step items
  document.querySelectorAll('.step').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      setTimeout(() => el.classList.add('visible'), i * 120);
    }
  });
};

window.addEventListener('scroll', animateOnScroll, { passive: true });
animateOnScroll();

// ---- ACTOR TABS ----
const tabs = document.querySelectorAll('.actor-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    document.querySelectorAll('.actor-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${target}`);
    });
  });
});

// ---- FAQ ACCORDION ----
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- ROLE SELECT (register page) ----
document.querySelectorAll('.role-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.role-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    const input = option.querySelector('input');
    if (input) input.checked = true;
  });
});

// ---- SMOOTH NAV LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- FORM SUBMISSION MOCK ----
const authForms = document.querySelectorAll('.auth-form');
authForms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.auth-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Connexion en cours…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Bienvenue sur Rogombe !';
      btn.style.background = '#16a34a';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }, 1800);
  });
});

// ---- INTERSECTION OBSERVER (for cat cards) ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${entry.target.dataset.index * 60}ms`;
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.cat-card').forEach((el, i) => {
  el.dataset.index = i;
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity .5s ${i * 60}ms, transform .5s ${i * 60}ms`;
  observer.observe(el);
});

const catObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
});
document.querySelectorAll('.cat-card').forEach(el => catObserver.observe(el));
