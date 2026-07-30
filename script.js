const loadPartial = async (containerId, fileName) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(fileName);
    if (!response.ok) throw new Error(`Failed to load ${fileName}: ${response.status}`);
    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
};

const initNav = () => {
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!navToggle || !mobileMenu) return;

  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
};

const initReveal = () => {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
};

const initEkg = () => {
  const ekgLine = document.getElementById('ekgLine');
  if (!ekgLine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const length = ekgLine.getTotalLength();
  ekgLine.style.strokeDasharray = length;
  ekgLine.style.strokeDashoffset = length;
  ekgLine.animate(
    [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
    { duration: 2400, iterations: Infinity, easing: 'ease-in-out', direction: 'alternate' }
  );
};

const initForm = () => {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    success.classList.add('show');
    const demoBtn = document.getElementById('demoBtn');
    if (demoBtn) {
      demoBtn.textContent = 'Request sent';
      demoBtn.disabled = true;
    }
  });
};

const initializeSite = async () => {
  await Promise.all([
    loadPartial('site-header', 'header.html'),
    loadPartial('site-footer', 'footer.html')
  ]);

  initNav();
  initReveal();
  initEkg();
  initForm();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSite);
} else {
  initializeSite();
}
