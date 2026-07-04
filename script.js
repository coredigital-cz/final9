/* CLIMA EXPERT HVAC — script.js */
document.addEventListener('DOMContentLoaded', () => {

  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30));

  const hb = document.getElementById('hb'), nl = document.getElementById('nl');
  if (hb && nl) hb.addEventListener('click', () => { hb.classList.toggle('open'); nl.classList.toggle('open'); });

  const isDesktop = () => window.matchMedia('(min-width:961px)').matches;

  document.querySelectorAll('[data-dd]').forEach(btn => {
    const item = btn.parentElement;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = item.parentElement;
      parent.querySelectorAll(':scope > .nav-item.open, :scope > .dd-item.open').forEach(o => {
        if (o !== item) o.classList.remove('open');
      });
      item.classList.toggle('open');
    });
    if (isDesktop()) {
      item.addEventListener('mouseenter', () => item.classList.add('open'));
      item.addEventListener('mouseleave', () => item.classList.remove('open'));
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.open, .dd-item.open').forEach(o => o.classList.remove('open'));
    }
  });

  if (nl) nl.querySelectorAll('a[href]').forEach(a => a.addEventListener('click', () => {
    hb && hb.classList.remove('open');
    nl.classList.remove('open');
    document.querySelectorAll('.nav-item.open, .dd-item.open').forEach(o => o.classList.remove('open'));
  }));

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.hero .rv').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: .85, delay: .12 * i, ease: 'back.out(1.4)' });
    });

    gsap.utils.toArray('.deco-icon').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, scale: 0 }, { opacity: .5, scale: 1, duration: .8, delay: 1 + i * .2, ease: 'back.out(2)' });
    });

    document.querySelectorAll('.cards').forEach(grid => {
      ScrollTrigger.batch(grid.querySelectorAll('.card'), {
        start: 'top 88%',
        onEnter: b => gsap.fromTo(b, { opacity: 0, y: 26, scale: .92 }, { opacity: 1, y: 0, scale: 1, duration: .65, stagger: .1, ease: 'back.out(1.5)', overwrite: true })
      });
    });

    gsap.utils.toArray('.rv').forEach(el => {
      if (el.closest('.hero') || el.classList.contains('card') || el.classList.contains('split-media') || el.classList.contains('g-item')) return;
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });

    // playful scale+fade reveal for split images and gallery photos
    gsap.utils.toArray('.split-media').forEach(el => {
      gsap.fromTo(el, { opacity: 0, scale: .88, rotate: -2 }, {
        opacity: 1, scale: 1, rotate: 0, duration: .9, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
    ScrollTrigger.batch('.g-item', {
      start: 'top 92%',
      onEnter: b => gsap.fromTo(b, { opacity: 0, scale: .8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: .6, stagger: .06, ease: 'back.out(1.6)', overwrite: true })
    });

    gsap.utils.toArray('.split-media img').forEach(img => {
      gsap.fromTo(img, { y: -12 }, {
        y: 12, ease: 'none',
        scrollTrigger: { trigger: img.closest('.split-media'), start: 'top bottom', end: 'bottom top', scrub: 1.4 }
      });
    });

    gsap.to('.orb-a', { y: 70, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
    gsap.to('.orb-b', { y: -50, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
    gsap.to('.orb-c', { y: 40, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });

    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const dec = el.dataset.count.includes('.');
      const suffix = el.dataset.suffix || '';
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.5, delay: .5, ease: 'power2.out',
        onUpdate: () => el.textContent = (dec ? obj.v.toFixed(1) : Math.round(obj.v)) + suffix
      });
    });
  }
});

function openLB(el) {
  const i = el.querySelector('img'); if (!i) return;
  document.getElementById('lb-img').src = i.src;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}
