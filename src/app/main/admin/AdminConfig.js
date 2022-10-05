import i18next from 'i18next';
import {authRoles} from '../../auth';
import AdminPage from './Admin';
import en from './i18n/en';
import es from './i18n/es';
import fr from './i18n/fr';


i18next.addResourceBundle('en', 'adminPage', en);
i18next.addResourceBundle('fr', 'adminPage', fr);
i18next.addResourceBundle('es', 'adminPage', es);

const AdminPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.visitor,
  routes: [
    {
      path: 'adminPage',
      element: <AdminPage />,
    },
  ],
};

export default AdminPageConfig;

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
