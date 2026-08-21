import type { StrapiApp } from '@strapi/strapi/admin';
import authLogo from './extensions/auth-logo.png';
import menuLogo from './extensions/menu-logo.png';
import { solbathLightTheme, solbathDarkTheme } from './theme';
import './solbath-admin.css';

export default {
  config: {
    auth: {
      logo: authLogo,
    },
    menu: {
      logo: menuLogo,
    },
    theme: {
      light: solbathLightTheme,
      dark: solbathDarkTheme,
    },
    tutorials: false,
    notifications: {
      releases: false,
    },
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'SolBath CMS',
        'Auth.form.welcome.title': 'Welcome to SolBath CMS',
        'Auth.form.welcome.subtitle': 'Sign in to your SolBath CMS account',
        'HomePage.header.title': 'SolBath CMS',
      },
    },
  },
  bootstrap(app: StrapiApp) {
    const BRAND_TITLE = 'SolBath CMS';
    document.title = BRAND_TITLE;

    // The SPA router resets document.title on navigation (to "Strapi Admin"
    // or a per-page title) — pin it back to the SolBath brand every time.
    const titleEl = document.querySelector('title');
    if (titleEl) {
      const observer = new MutationObserver(() => {
        if (document.title.includes('Strapi')) {
          document.title = document.title.replace(/Strapi(\s+Admin)?/g, BRAND_TITLE);
        }
      });
      observer.observe(titleEl, { childList: true });
    }
  },
};
