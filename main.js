/* ============================================================
   mmalgor.com.ar — JS mínimo
   1. Menú mobile
   2. Scroll reveal (fade + translateY, stagger 80ms)
   3. Contador de stats (0 → valor, ~1s)
   ============================================================ */

(function () {
  'use strict';

  var motionReducida = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. Menú mobile
     --------------------------------------------------------- */

  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  if (toggle && menu) {
    var cerrarMenu = function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    };

    toggle.addEventListener('click', function () {
      var abierto = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(abierto));
      toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) cerrarMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        cerrarMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) cerrarMenu();
    });
  }

  /* ---------------------------------------------------------
     2. Scroll reveal
     --------------------------------------------------------- */

  var revelables = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  var mostrarTodo = function () {
    revelables.forEach(function (el) { el.classList.add('is-visible'); });
  };

  if (motionReducida || !('IntersectionObserver' in window)) {
    mostrarTodo();
  } else {
    var observer = new IntersectionObserver(function (entries) {
      var visibles = entries.filter(function (e) { return e.isIntersecting; });
      var porGrupo = new Map();

      visibles.forEach(function (entry) {
        var padre = entry.target.parentElement;
        var indice = porGrupo.get(padre) || 0;
        porGrupo.set(padre, indice + 1);

        entry.target.style.setProperty('--reveal-delay', (indice * 80) + 'ms');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    revelables.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------
     3. Contador de stats
     --------------------------------------------------------- */

  var contadores = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));

  var pintar = function (el, valor) {
    el.textContent = (el.dataset.prefix || '') + valor;
  };

  var contar = function (el) {
    var destino = parseInt(el.dataset.count, 10);
    if (isNaN(destino)) return;

    if (motionReducida) { pintar(el, destino); return; }

    var duracion = 1000;
    var inicio = null;

    var paso = function (t) {
      if (inicio === null) inicio = t;
      var avance = Math.min((t - inicio) / duracion, 1);
      var suavizado = 1 - Math.pow(1 - avance, 3); // ease-out cubic
      pintar(el, Math.round(destino * suavizado));
      if (avance < 1) requestAnimationFrame(paso);
    };

    requestAnimationFrame(paso);
  };

  if (contadores.length) {
    if (motionReducida || !('IntersectionObserver' in window)) {
      contadores.forEach(function (el) { pintar(el, parseInt(el.dataset.count, 10)); });
    } else {
      // Evita el salto de layout: arranca en 0 recién cuando el observer está activo
      contadores.forEach(function (el) { pintar(el, 0); });

      var obsStats = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          contar(entry.target);
          obsStats.unobserve(entry.target);
        });
      }, { threshold: 0.5 });

      contadores.forEach(function (el) { obsStats.observe(el); });
    }
  }

})();
