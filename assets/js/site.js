(function () {
  'use strict';
  var root = document.documentElement;
  var preference = window.matchMedia('(prefers-color-scheme: dark)');
  var themeButton = document.querySelector('.theme-toggle');
  var themeFrame;
  function storedTheme() {
    try { return localStorage.getItem('henry-theme'); } catch (error) { return null; }
  }
  function applyTheme(theme) {
    // Existing template transitions are attached to both containers and text.
    // Suspend them briefly so nested elements change color in the same frame.
    window.cancelAnimationFrame(themeFrame);
    root.classList.add('theme-changing');
    root.dataset.theme = theme;
    var dark = theme === 'dark';
    var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    themeButton.setAttribute('aria-label', label);
    themeButton.setAttribute('title', label);
    themeButton.setAttribute('aria-pressed', String(dark));
    document.querySelector('meta[name="theme-color"]').content = dark ? '#181c20' : '#fbfaf7';
    themeFrame = window.requestAnimationFrame(function () {
      themeFrame = window.requestAnimationFrame(function () {
        root.classList.remove('theme-changing');
      });
    });
  }
  function followPreference() {
    var saved = storedTheme();
    applyTheme(saved === 'light' || saved === 'dark' ? saved : (preference.matches ? 'dark' : 'light'));
  }
  followPreference();
  themeButton.addEventListener('click', function () {
    var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('henry-theme', theme); } catch (error) {}
  });
  preference.addEventListener('change', followPreference);
  window.addEventListener('storage', function (event) {
    if (event.key === 'henry-theme' || event.key === null) followPreference();
  });

  var navigation = document.querySelector('.site-nav');
  var navigationButton = document.querySelector('.navigation-toggle');
  var contact = document.querySelector('.author__urls-wrapper');
  var contactButton = contact && contact.querySelector('button');
  function toggleMenu(container, button, open) {
    container.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    if (button === navigationButton) button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  navigationButton.addEventListener('click', function () {
    toggleMenu(navigation, navigationButton, !navigation.classList.contains('is-open'));
  });
  if (contactButton) contactButton.addEventListener('click', function () {
    toggleMenu(contact, contactButton, !contact.classList.contains('is-open'));
  });
  document.addEventListener('click', function (event) {
    if (!navigation.contains(event.target)) toggleMenu(navigation, navigationButton, false);
    if (contactButton && !contact.contains(event.target)) toggleMenu(contact, contactButton, false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (navigation.classList.contains('is-open')) {
      toggleMenu(navigation, navigationButton, false);
      navigationButton.focus();
    }
    if (contactButton && contact.classList.contains('is-open')) {
      toggleMenu(contact, contactButton, false);
      contactButton.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', function () {
    toggleMenu(navigation, navigationButton, false);
  });

  document.querySelectorAll('a[href]').forEach(function (link) {
    var url = new URL(link.href, window.location.href);
    if (/^https?:$/.test(url.protocol) && url.origin !== window.location.origin &&
        url.hostname !== 'yany-henry.me' && !link.closest('.author__urls-wrapper')) {
      link.target = '_blank';
      link.rel = (link.rel + ' noopener noreferrer').trim();
    }
  });
  var ohana = document.getElementById('ohanaText');
  var stitch = document.getElementById('stitchImage');
  ohana.addEventListener('click', function () {
    stitch.hidden = !stitch.hidden;
    ohana.setAttribute('aria-expanded', String(!stitch.hidden));
  });
}());
