/* site.js — Reckon Research
   No dark mode. Mobile nav overlay. Copy buttons. Fade-in.
*/
(function() {
  'use strict';

  // ── Mobile nav overlay ──
  var hamburger = document.getElementById('hamburger-btn');
  var overlay   = document.getElementById('mobile-nav-overlay');
  var iconMenu  = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');

  function setNavOpen(open) {
    if (!overlay || !hamburger) return;
    if (open) {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close navigation');
      if (iconMenu)  iconMenu.style.display  = 'none';
      if (iconClose) iconClose.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open navigation');
      if (iconMenu)  iconMenu.style.display  = 'block';
      if (iconClose) iconClose.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      setNavOpen(overlay && overlay.getAttribute('aria-hidden') === 'true');
    });
  }

  // Close on overlay link click
  if (overlay) {
    overlay.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { setNavOpen(false); });
    });
  }

  // Close on resize to desktop
  var mq = window.matchMedia('(min-width: 769px)');
  function onResize(e) { if (e.matches) setNavOpen(false); }
  if (mq.addEventListener) { mq.addEventListener('change', onResize); }
  else if (mq.addListener)  { mq.addListener(onResize); }

  // ── Sticky nav shadow on scroll ──
  var nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', (window.scrollY || window.pageYOffset) > 12);
    }, { passive: true });
  }

  // ── Copy buttons ──
  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); cb(); } catch(e) {}
    document.body.removeChild(ta);
  }

  document.querySelectorAll('.copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var raw   = btn.getAttribute('data-copy') || '';
      var text  = raw.replace(/&#10;/g, '\n');
      var label = btn.querySelector('.copy-label');
      var icon  = btn.querySelector('svg');

      function onCopied() {
        btn.classList.add('done');
        if (label) label.textContent = 'copied';
        if (icon) icon.innerHTML = '<polyline points="2,7 5,10 11,3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
        setTimeout(function() {
          btn.classList.remove('done');
          if (label) label.textContent = 'copy';
          if (icon) icon.innerHTML = '<rect x="4" y="1" width="8" height="9" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M1 4h2M1 4v7a1 1 0 001 1h6v-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>';
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onCopied).catch(function() {
          fallbackCopy(text, onCopied);
        });
      } else {
        fallbackCopy(text, onCopied);
      }
    });
  });

  // ── Fade-in on scroll ──
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var fadeObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.fade-section').forEach(function(el) {
      fadeObs.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-section').forEach(function(el) {
      el.classList.add('visible');
    });
  }

})();
