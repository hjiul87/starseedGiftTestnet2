import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';

const SignInConfig = {
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
  auth: authRoles.visitor,
  routes: [
    {
      path: 'login',
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;
