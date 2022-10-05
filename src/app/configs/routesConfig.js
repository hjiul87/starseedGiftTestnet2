import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import Error404Page from '../main/404/Error404Page';
import LandingPageConfig from '../main/landingPage/landingPageConfig';
import SignInConfig from '../main/login/SignInConfig';
import UserConfig from '../main/User/UserConfig';
import ClaimPageConfig from '../main/claimPage/claimPageConfig';
import MintPageConfig from '../main/mintPage/mintPAgeConfig';
import InventoryPageConfig from '../main/inventory/inventoryConfig';
import AdminPageConfig from '../main/admin/AdminConfig';

const routeConfigs = [ AdminPageConfig, InventoryPageConfig, SignInConfig,  LandingPageConfig, UserConfig, ClaimPageConfig, MintPageConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/welcome" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="/welcome" />,
  },
];

export default routes;
