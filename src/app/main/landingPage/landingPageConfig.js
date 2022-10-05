import i18next from 'i18next';
import {authRoles} from '../../auth';
import LandingPage from './landingPage';
import en from './i18n/en';
import fr from './i18n/fr';
import es from './i18n/es';


i18next.addResourceBundle('en', 'landingPage', en);
i18next.addResourceBundle('tr', 'landingPage', fr);
i18next.addResourceBundle('ar', 'landingPage', es);

const LandingPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  // auth: authRoles.guest,
  routes: [
    {
      path: 'welcome',
      element: <LandingPage />,
    },
  ],
};

export default LandingPageConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
