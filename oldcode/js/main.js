(function () {
  'use strict';

  /* ---------- page loader ---------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (loader) setTimeout(function () { loader.classList.add('is-hidden'); }, 250);
  });

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- light / dark theme toggle ---------- */
  var THEME_KEY = 'noir-theme';
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F4F4EF' : '#0A0A0B');
  }
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  });

  /* ---------- 3D tilt on cards (fine-pointer, motion-ok devices only) ---------- */
  var canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canTilt) {
    var tiltEls = document.querySelectorAll('.service-card, .work-card, .testi-card');
    tiltEls.forEach(function (el) {
      var raf = null;
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var rx = (0.5 - py) * 7;
          var ry = (px - 0.5) * 9;
          el.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
          el.style.setProperty('--mx', (px * 100) + '%');
          el.style.setProperty('--my', (py * 100) + '%');
        });
      });
      el.addEventListener('mouseleave', function () {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = '';
      });
    });
  }

  /* ---------- sticky header ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    var toTop = document.getElementById('toTop');
    if (window.scrollY > 700) toTop.classList.add('show');
    else toTop.classList.remove('show');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.getElementById('toTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  navToggle.addEventListener('click', function () {
    var open = mobileNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMobileNav);
  });

  /* ---------- smooth scroll + active nav ---------- */
  var navLinks = document.querySelectorAll('[data-nav]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#' && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offset = 84;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
          history.pushState(null, '', href);
        }
      }
    });
  });

  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var headerNavLinks = document.querySelectorAll('.main-nav a[data-nav]');
  function updateActiveNav() {
    var scrollPos = window.scrollY + 140;
    var current = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });
    headerNavLinks.forEach(function (link) {
      // page-to-page links (e.g. services.html) carry their active state set in markup —
      // only same-page hash links get toggled by scroll position.
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      link.classList.toggle('is-active', href === '#' + current);
    });
  }
  document.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---------- hero code-field animation (index.html only) ---------- */
  var heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas && heroCanvas.getContext) {
    (function () {
      var ctx = heroCanvas.getContext('2d');
      var glyphs = ['{ }', '</>', '01', '=>', '[ ]', 'fx()', 'git', 'npm i', 'AI', '...', 'const', '01101', '#', '*', '&&', '( )'];
      var colorMap = { ash: '154,160,166', lime: '198,242,78', violet: '124,92,255' };
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var particles = [];
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var rect = { width: 0, height: 0 };

      function spawn() {
        return {
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          g: glyphs[Math.floor(Math.random() * glyphs.length)],
          vy: 0.12 + Math.random() * 0.20,
          size: 12 + Math.random() * 6,
          life: 0,
          dur: 260 + Math.random() * 280,
          hue: Math.random() < 0.22 ? 'lime' : (Math.random() < 0.14 ? 'violet' : 'ash')
        };
      }
      function resize() {
        rect = heroCanvas.parentElement.getBoundingClientRect();
        heroCanvas.width = rect.width * dpr;
        heroCanvas.height = rect.height * dpr;
        heroCanvas.style.width = rect.width + 'px';
        heroCanvas.style.height = rect.height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var count = Math.max(30, Math.min(78, Math.floor((rect.width * rect.height) / 17000)));
        particles = new Array(count).fill(0).map(spawn);
      }
      function alphaFor(t, hue) {
        var peak = hue === 'ash' ? 0.30 : 0.42;
        if (t < 0.15) return (t / 0.15) * peak;
        if (t > 0.85) return ((1 - t) / 0.15) * peak;
        return peak;
      }
      function paint() {
        ctx.clearRect(0, 0, rect.width, rect.height);
        particles.forEach(function (p) {
          var t = p.life / p.dur;
          var a = alphaFor(t, p.hue);
          ctx.font = '600 ' + p.size + 'px ui-monospace, SFMono-Regular, Menlo, monospace';
          if (p.hue !== 'ash') {
            ctx.shadowColor = 'rgba(' + colorMap[p.hue] + ',' + (a * 0.9).toFixed(3) + ')';
            ctx.shadowBlur = 6;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fillStyle = 'rgba(' + colorMap[p.hue] + ',' + a.toFixed(3) + ')';
          ctx.fillText(p.g, p.x, p.y);
        });
        ctx.shadowBlur = 0;
      }
      function step() {
        particles.forEach(function (p, i) {
          p.y -= p.vy;
          p.life += 1;
          if (p.life > p.dur || p.y < -20) particles[i] = spawn();
        });
        paint();
        requestAnimationFrame(step);
      }

      resize();
      window.addEventListener('resize', resize);
      if (reduced) {
        paint();
      } else {
        requestAnimationFrame(step);
      }
    })();
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- animated stat counters ---------- */
  var statEls = document.querySelectorAll('.stat .num [data-count]');
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && statEls.length) {
    var statIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    statEls.forEach(function (el) { statIo.observe(el); });
  }

  /* ---------- testimonial row scroll ---------- */
  var testiRow = document.getElementById('testiRow');
  if (testiRow) {
    var prevBtn = document.getElementById('testiPrev');
    var nextBtn = document.getElementById('testiNext');
    function scrollByCard(dir) {
      var card = testiRow.querySelector('.testi-card');
      var step = card ? card.getBoundingClientRect().width + 1 : 320;
      testiRow.scrollBy({ left: dir * step, behavior: 'smooth' });
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCard(1); });
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 4200);
  }

  /* ---------- contact form ---------- */
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var formStatus = document.getElementById('formStatus');

  function setError(fieldId, hasError) {
    var field = document.getElementById(fieldId);
    field.classList.toggle('has-error', hasError);
  }

  function validate() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setError('fieldName', !name);
    setError('fieldEmail', !emailOk);
    setError('fieldMessage', !message);

    return !!name && emailOk && !!message;
  }

  if (form) {
    ['name', 'email', 'message'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', function () {
        var wrap = document.getElementById('field' + id.charAt(0).toUpperCase() + id.slice(1));
        if (wrap.classList.contains('has-error')) wrap.classList.remove('has-error');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // honeypot — silently drop bot submissions
      if (document.getElementById('company').value) return;

      formStatus.classList.remove('show', 'ok', 'err');

      if (!validate()) {
        formStatus.textContent = 'Please fix the highlighted fields before sending.';
        formStatus.classList.add('show', 'err');
        return;
      }

      var data = new FormData(form);
      submitBtn.classList.add('is-loading');
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.querySelector('.btn-label').textContent = 'Sending…';

      fetch('https://formsubmit.co/ajax/support@noircreative.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      })
        .then(function (res) { return res.json().then(function (json) { return { ok: res.ok, json: json }; }); })
        .then(function (result) {
          if (result.ok) {
            form.reset();
            formStatus.textContent = 'Message sent — we\'ll reply within one business day.';
            formStatus.classList.add('show', 'ok');
            showToast('Thanks! Your message is on its way.');
          } else {
            throw new Error('Submission rejected');
          }
        })
        .catch(function () {
          formStatus.innerHTML = 'Couldn\'t reach the server — please email us directly at <a href="mailto:support@noircreative.com" style="color:inherit;text-decoration:underline">support@noircreative.com</a>.';
          formStatus.classList.add('show', 'err');
        })
        .finally(function () {
          submitBtn.classList.remove('is-loading');
          submitBtn.removeAttribute('disabled');
          submitBtn.querySelector('.btn-label').textContent = 'Send message';
        });
    });
  }
})();
