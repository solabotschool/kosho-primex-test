(function () {
  'use strict';

  // ハンバーガーメニュー
  var header = document.querySelector('.header');
  var burger = document.getElementById('hamburger');
  burger.addEventListener('click', function () {
    var open = header.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  document.querySelectorAll('.gnav a').forEach(function (a) {
    a.addEventListener('click', function () {
      header.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // FAQ アコーディオン
  document.querySelectorAll('.faq__item button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
  });

  // スクロールフェードイン
  // 初期表示で画面内にある要素はそのまま表示し、画面外の要素のみスクロール時にフェードイン
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.remove('is-wait'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.js-fade').forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('is-wait');
        io.observe(el);
      }
    });
  }

  // SP固定CTA：フッターCTAが見えたら隠す
  var fixed = document.querySelector('.sp-fixed-cta');
  var cta = document.getElementById('cta');
  if (fixed && cta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      fixed.classList.toggle('is-hidden', entries[0].isIntersecting);
    }).observe(cta);
  }
})();
