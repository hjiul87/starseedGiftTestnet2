import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';


i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'welcome',
    title: 'Welcome',
    translate: 'WELCOME',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'welcome',
  },
  {
    id: 'profile',
    title: 'Profile',
    translate: 'PROFILE',
    type: 'item',
    icon: 'heroicons-outline:user',
    url: 'userPage',
  },  
  {
    id: 'claim',
    title: 'Claim',
    translate: 'CLAIM',
    type: 'item',
    icon: 'heroicons-outline:gift',
    url: 'claim',
  },
  {
    id: 'inventory',
    title: 'inventory',
    translate: 'INVENTORY',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'inventory',
  },
  {
    id: 'mint',
    title: 'Mint',
    translate: 'MINT',
    type: 'item',
    icon: 'heroicons-outline:shopping-cart',
    url: 'mint',
  },
  {
    id: 'admin',
    title: 'Admin',
    translate: 'ADMIN',
    type: 'item',
    icon: 'heroicons-outline:lock-closed',
    url: 'adminPage',
  },
];

export default navigationConfig;
