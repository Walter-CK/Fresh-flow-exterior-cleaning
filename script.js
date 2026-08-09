/* ============================================================
   Fresh Flow Exterior Cleaning — shared behaviour
   Navigation · reveal animations · lightbox · quote email
   ============================================================ */

(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('.site-nav');
  const ham = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  /* Transparent-to-solid sticky navigation and mobile menu. */
  function setNavState() {
    nav?.classList.toggle('scrolled', window.scrollY > 16);
  }
  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });

  function setMenu(open) {
    if (!ham || !navLinks) return;
    ham.setAttribute('aria-expanded', String(open));
    navLinks.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
  }
  ham?.addEventListener('click', () => setMenu(ham.getAttribute('aria-expanded') !== 'true'));
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (!navLinks?.classList.contains('open') || navLinks.contains(event.target) || ham?.contains(event.target)) return;
    setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) setMenu(false);
  }, { passive: true });

  /* Highlight the current page without hard-coding an active state. */
  const currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = (link.getAttribute('href') || '').replace(/index\.html$/, '').replace(/\/$/, '') || '/';
    if (href === currentPath) link.classList.add('active');
  });

  /* Subtle entrance animation, disabled for reduced-motion preferences. */
  if (reducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* Gallery lightbox. */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.hidden = true;
    lightboxImage.src = '';
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = item.dataset.lightbox;
      lightboxImage.alt = item.dataset.alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  /* The static form builds an email until a form service is connected. */
  const form = document.getElementById('quoteForm');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const services = data.getAll('services');
    const none = 'Not specified';
    const lines = [
      "Hi Fresh Flow, I'd like to request an exterior cleaning quote.", '',
      `Name: ${data.get('name') || none}`,
      `Phone: ${data.get('phone') || none}`,
      `Email: ${data.get('email') || none}`,
      `Address / suburb: ${data.get('address') || none}`,
      `Services needed: ${services.length ? services.join(', ') : none}`,
      `Preferred contact method: ${data.get('contactMethod') || none}`, '',
      'Message:', data.get('message') || none
    ];
    const subject = encodeURIComponent(`Fresh Flow quote request — ${data.get('name') || 'New enquiry'}`);
    window.location.href = `mailto:[REPLACE: hello@freshflow.com.au]?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
  });
})();
