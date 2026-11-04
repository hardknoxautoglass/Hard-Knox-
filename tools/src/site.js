/* Hard Knox Auto Glass — progressive enhancements only.
   Everything on the site works without this file: navigation, content, warranty text,
   and the tel:/sms:/mailto: links are plain HTML. This script adds:
   1. a mobile menu button (open/close, Escape, focus return);
   2. measuring the mobile bottom bar so page content is never hidden behind it;
   3. a "Print" button on the warranty page;
   4. a "Copy number" button where the phone number is shown in full.
   It makes no network requests and stores nothing. */
(function () {
  'use strict';

  /* 1. Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  var mobile = window.matchMedia('(max-width: 56.24em)');

  function setOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
  }
  if (toggle && nav) {
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
    var onChange = function () { if (!mobile.matches) setOpen(false); };
    if (mobile.addEventListener) mobile.addEventListener('change', onChange);
    else if (mobile.addListener) mobile.addListener(onChange);
  }

  /* 2. Bottom bar height → CSS custom property (keeps the last footer link and focused controls visible) */
  var bar = document.getElementById('bottom-bar');
  function measureBar() {
    if (!bar) return;
    var fixed = window.getComputedStyle(bar).position === 'fixed';
    var h = fixed ? bar.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--bar-space', (h ? h + 8 : 0) + 'px');
  }
  function keepAboveBar(e) {
    if (!bar || window.getComputedStyle(bar).position !== 'fixed') return;
    var el = e.target;
    if (!el || !el.getBoundingClientRect || bar.contains(el)) return;
    var r = el.getBoundingClientRect();
    var b = bar.getBoundingClientRect();
    if (r.bottom > b.top && r.top < window.innerHeight) {
      window.scrollBy({ top: Math.min(r.bottom - b.top + 16, r.top), left: 0, behavior: 'instant' });
    }
  }
  if (bar) {
    measureBar();
    window.addEventListener('resize', measureBar);
    window.addEventListener('orientationchange', measureBar);
    if ('ResizeObserver' in window) new ResizeObserver(measureBar).observe(bar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureBar);
    document.addEventListener('focusin', keepAboveBar);
  }

  /* 3. Print button (warranty page) */
  var printBtn = document.querySelector('.print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', function () { window.print(); });
  }

  /* 4. Copy phone number */
  var copyBtns = document.querySelectorAll('.copy-btn');
  Array.prototype.forEach.call(copyBtns, function (btn) {
    var status = btn.parentNode.querySelector('.copy-status');
    var value = btn.getAttribute('data-copy');
    if (!value || !navigator.clipboard) { btn.hidden = true; return; }
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(value).then(function () {
        if (status) status.textContent = 'Copied ' + value + ' to the clipboard.';
      }, function () {
        if (status) status.textContent = 'Could not copy automatically. Select the number and copy it instead.';
      });
    });
  });

  /* 5. If a link points at a collapsed FAQ item, open it */
  function openTarget() {
    var id = window.location.hash ? window.location.hash.slice(1) : '';
    if (!id) return;
    var el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS') el.open = true;
  }
  openTarget();
  window.addEventListener('hashchange', openTarget);
})();
