/**
 * راد مدرن — اسکریپت اصلی و مشترک سایت (main.js)
 * شامل ناوبری مدرن، منوی موبایل، هدر چسبان، ویدیوی تمام‌صفحه در هیرو و دکمه‌های شناور
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ───────────── ۱) هدر شفاف روی هیرو + افکت اسکرول ───────────── */
  var header = document.querySelector('.site-header');
  var heroSection = document.getElementById('hero');
  var backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      if (scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    if (backToTopBtn) {
      if (scrollY > 300) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ───────────── ۲) منوی کشویی موبایل (Mobile Drawer) ───────────── */
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var mobileNav = document.getElementById('mobileNav');
  var drawerCloseBtn = document.getElementById('drawerCloseBtn');
  var drawerBackdrop = document.getElementById('drawerBackdrop');

  function openMobileMenu() {
    if (!mobileNav || !mobileMenuBtn) return;
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileNav || !mobileMenuBtn) return;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      var isOpen = mobileNav && mobileNav.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mobileNav && mobileNav.classList.contains('is-open')) {
        closeMobileMenu();
      }
    }
  });

  /* ───────────── ۳) ویدیوی پس‌زمینه هیرو با لایه متن و کنترل‌های تمام‌صفحه ───────────── */
  var video = document.getElementById('heroVideo');

  if (video && heroSection) {
    var heroPlayBtn = document.getElementById('heroPlayBtn');
    var heroMuteBtn = document.getElementById('heroMuteBtn');
    var heroFullscreenBtn = document.getElementById('heroFullscreenBtn');

    function togglePlay() {
      if (video.paused || video.ended) {
        video.play().catch(function () {});
      } else {
        video.pause();
      }
    }

    function updatePlayState() {
      if (video.paused) {
        heroSection.classList.remove('is-playing');
      } else {
        heroSection.classList.add('is-playing');
      }
    }

    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);
    video.addEventListener('ended', updatePlayState);

    if (heroPlayBtn) {
      heroPlayBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        togglePlay();
      });
    }

    // کنترل صدا (قطع / وصل)
    function toggleMute() {
      video.muted = !video.muted;
      if (video.muted) {
        heroSection.classList.remove('is-unmuted');
      } else {
        heroSection.classList.add('is-unmuted');
        video.volume = 1.0;
      }
    }

    if (heroMuteBtn) {
      heroMuteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMute();
      });
    }

    // تشخیص وضعیت تمام‌صفحه
    function isFullscreen() {
      return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
    }

    // باز کردن ویدیو در تمام‌صفحه (Native Fullscreen API)
    function toggleFullscreen() {
      if (!isFullscreen()) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }

    if (heroFullscreenBtn) {
      heroFullscreenBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleFullscreen();
      });
    }

    // دابل‌کلیک برای رفتن به حالت فول‌اسکرین
    heroSection.addEventListener('dblclick', function (e) {
      if (!e.target.closest('a, button, input')) {
        toggleFullscreen();
      }
    });

    // میانبرهای کیبورد (F: تمام‌صفحه، M: صدا، Space: پخش/مکث)
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === ' ' && heroSection.matches(':hover, :focus-within')) {
        e.preventDefault();
        togglePlay();
      }
    });

    // وضعیت اولیه پخش
    updatePlayState();
  }
});
