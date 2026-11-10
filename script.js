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
      status: 'Conversations & outcomes',
      title: 'From conversation to appointment',
      desc: 'Review what was said, the sources used, and what happens next.',
      btnText: 'Build your assistant',
      btnHref: 'https://app.dhvaniq.com/register'
    },
    knowledge: {
      status: 'Knowledge sources',
      title: 'Your documents, in the conversation',
      desc: 'Index PDFs, Notion workspaces, and pricing sheets with sub-second vector citations.',
      btnText: 'Explore Knowledge Hub',
      btnHref: '#knowledge'
    },
    actions: {
      status: 'Connected actions',
      title: 'A clear next step for every call',
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
      tab.tabIndex = isTarget ? 0 : -1;
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

      if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) e.preventDefault();
      if (e.key === 'Home') { tabsArray[0].focus(); tabsArray[0].click(); }
      else if (e.key === 'End') { tabsArray.at(-1).focus(); tabsArray.at(-1).click(); }
      else if (e.key === 'ArrowRight') {
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

  // Associate each tab with its panel; keep only the selection in the tab order.
  shelfTabs.forEach(tab => {
    const key = tab.dataset.tab;
    tab.id = `tab-${key}`;
    tab.setAttribute('aria-controls', `panel-${key}`);
    const panel = document.getElementById(`panel-${key}`);
    panel?.setAttribute('role', 'tabpanel');
    panel?.setAttribute('aria-labelledby', tab.id);
  });
  switchTab('voice');

  // 4. Dynamic Copyright Year
  const yearElement = document.querySelector('#year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

