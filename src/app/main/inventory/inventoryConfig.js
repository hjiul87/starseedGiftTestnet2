import i18next from 'i18next';
import {authRoles} from '../../auth';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import InventoryPage from './inventory';

i18next.addResourceBundle('en', 'inventoryPage', en);
i18next.addResourceBundle('tr', 'inventoryPage', tr);
i18next.addResourceBundle('ar', 'inventoryPage', ar);

const InventoryPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.visitor,
  routes: [
    {
      path: 'inventory',
      element: <InventoryPage />,
    },
  ],
};

export default InventoryPageConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/
