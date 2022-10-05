import i18next from 'i18next';
import {authRoles} from '../../auth';
import ClaimPage from './claimPage';
import en from './i18n/en';
import es from './i18n/es';
import fr from './i18n/fr';


i18next.addResourceBundle('en', 'claimPage', en);
i18next.addResourceBundle('fr', 'claimPage', fr);
i18next.addResourceBundle('es', 'claimPage', es);

const ClaimPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.visitor,
  routes: [
    {
      path: 'claim',
      element: <ClaimPage />,
    },
  ],
};

export default ClaimPageConfig;

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
