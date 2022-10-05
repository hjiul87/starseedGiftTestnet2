import i18next from 'i18next';
import {authRoles} from '../../auth';
import UserProfilePage from './User';
import en from './i18n/en';
import es from './i18n/es';
import fr from './i18n/fr';


i18next.addResourceBundle('en', 'userPage', en);
i18next.addResourceBundle('fr', 'userPage', fr);
i18next.addResourceBundle('es', 'userPage', es);

const UserConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.visitor,
  routes: [
    {
      path: 'userPage',
      element: <UserProfilePage />,
    },
  ],
};

export default UserConfig;

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
