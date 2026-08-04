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

const initFaq = () => {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
};

const initMomentsCarousel = () => {
  const track = document.getElementById('momentsTrack');
  const prevBtn = document.getElementById('momentPrev');
  const nextBtn = document.getElementById('momentNext');
  if (!track || !prevBtn || !nextBtn) return;

  const scrollByCard = (direction) => {
    const card = track.querySelector('.moment-card');
    if (!card) return;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + 20), behavior: 'smooth' });
  };

  prevBtn.addEventListener('click', () => scrollByCard(-1));
  nextBtn.addEventListener('click', () => scrollByCard(1));
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

const initializeSite = () => {
  initNav();
  initReveal();
  initEkg();
  initForm();
  initFaq();
  initMomentsCarousel();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSite);
} else {
  initializeSite();
}
