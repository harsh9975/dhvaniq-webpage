/**
 * Dhvaniq Homepage Interactivity
 * Hero Shelf Tabs, Dynamic Dashboard Views, Mobile Navigation, and Dynamic Copyright Year.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');

  function closeMenu() {
    if (navigation && menuToggle) {
      navigation.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navigation.classList.toggle('open', !isExpanded);
    });

    navigation.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // 2. Hero Segmented Tabs & Dashboard Multi-Panel Switcher
  const shelfTabs = document.querySelectorAll('.hero-tab-pill, .shelf-tab-item');
  const sidebarLinks = document.querySelectorAll('.sidebar-link-item[data-tab]');
  const panels = document.querySelectorAll('.dashboard-panel');
  const statusText = document.querySelector('.topbar-live-status .status-text');
  const bannerTitle = document.querySelector('#banner-title');
  const bannerDesc = document.querySelector('#banner-desc');
  const bannerBtn = document.querySelector('#banner-btn');

  const tabContentMap = {
    voice: {
      status: 'Voice Engine Online • 640ms Turn-Taking',
      title: 'Autonomous Voice Engine Active',
      desc: 'Turn incoming phone calls into confirmed calendar appointments with 100% grounded facts.',
      btnText: 'Start testing free',
      btnHref: 'https://app.dhvaniq.com/register'
    },
    knowledge: {
      status: 'Knowledge Ingestion Active • 100% Grounded',
      title: 'Verified Knowledge Grounding Active',
      desc: 'Index PDFs, Notion workspaces, and pricing sheets with sub-second vector citations.',
      btnText: 'Explore Knowledge Hub',
      btnHref: '#knowledge'
    },
    actions: {
      status: 'Deterministic Triggers Active • 0 Errors',
      title: 'Deterministic Action Engine Active',
      desc: 'Trigger automated two-way SMS confirmations, calendar bookings, and CRM updates.',
      btnText: 'Explore Action Workflows',
      btnHref: '#actions'
    }
  };

  function switchTab(tabKey) {
    if (!tabContentMap[tabKey]) return;

    // A. Update Shelf Tabs
    shelfTabs.forEach((tab) => {
      const isTarget = tab.getAttribute('data-tab') === tabKey;
      tab.classList.toggle('active', isTarget);
      tab.setAttribute('aria-selected', String(isTarget));
    });

    // B. Update Sidebar Links
    sidebarLinks.forEach((link) => {
      const isTarget = link.getAttribute('data-tab') === tabKey;
      link.classList.toggle('active', isTarget);
    });

    // C. Update Dashboard Panels with smooth transition
    panels.forEach((panel) => {
      if (panel.getAttribute('data-panel') === tabKey) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // D. Update Topbar Status & Floating Bottom Banner
    const data = tabContentMap[tabKey];
    if (statusText) statusText.textContent = data.status;
    if (bannerTitle) bannerTitle.textContent = data.title;
    if (bannerDesc) bannerDesc.textContent = data.desc;
    if (bannerBtn) {
      bannerBtn.textContent = data.btnText;
      bannerBtn.setAttribute('href', data.btnHref);
    }
  }

  // Bind Shelf Tabs Click & Keyboard
  shelfTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-tab');
      switchTab(tabKey);
    });

    tab.addEventListener('keydown', (e) => {
      const tabsArray = Array.from(shelfTabs);
      const currentIndex = tabsArray.indexOf(tab);

      if (e.key === 'ArrowRight') {
        const nextTab = tabsArray[(currentIndex + 1) % tabsArray.length];
        nextTab.focus();
        nextTab.click();
      } else if (e.key === 'ArrowLeft') {
        const prevTab = tabsArray[(currentIndex - 1 + tabsArray.length) % tabsArray.length];
        prevTab.focus();
        prevTab.click();
      }
    });
  });

  // Bind Sidebar Items Click
  sidebarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabKey = link.getAttribute('data-tab');
      switchTab(tabKey);
    });
  });

  // 3. Scroll-Triggered Reveal Animations (Dub-style slideUpFade)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
      }
    );

    revealElements.forEach((el) => {
      // Check if already in viewport on load
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        el.classList.add('is-visible');
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // 4. Dynamic Copyright Year
  const yearElement = document.querySelector('#year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

