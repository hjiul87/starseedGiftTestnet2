import i18next from 'i18next';
import {authRoles} from '../../auth';
import MintPage from './mintPage';
import en from './i18n/en';
import es from './i18n/es';
import fr from './i18n/fr';


i18next.addResourceBundle('en', 'mintPage', en);
i18next.addResourceBundle('fr', 'mintPage', fr);
i18next.addResourceBundle('es', 'mintPage', es);

const MintPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.visitor,
  routes: [
    {
      path: 'mint',
      element: <MintPage />,
    },
  ],
};

export default MintPageConfig;

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
