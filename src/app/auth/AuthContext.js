/* eslint-disable prefer-const */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import { logRefreshProfile, logUserProfile, setProfileBlock } from 'app/store/gameData';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const { logout, isAuthenticated, authenticate, user, account } = useMoralis();
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const userProfile = useSelector((state) => state.gameData.userProfile);
  const refreshProfile = useSelector((state) => state.gameData.refreshProfile);
  const dispatch = useDispatch();

  const {
    fetch: fetchProfile,
    data: data1,
    error: error1,
    isLoading: isLoading1,
  } = useMoralisCloudFunction('getUserProfile', {}, { autoFetch: false });

  useEffect(() => {
    console.log('moralis user has changed : ', user);
  }, [user]);

  useEffect(() => {
    console.log('refresfProfile test 1 : ', refreshProfile, ' - ', user);
    if (refreshProfile === true && user !== null) {
      console.log('refresfProfile test passed : ', refreshProfile, ' - ', user);
      getProfile(user);
      dispatch(logRefreshProfile(false));
    }
  }, [refreshProfile]);

  useEffect(() => {
    console.log('isAuthenticated : ', isAuthenticated);
    if (isAuthenticated) {
      console.log('user test autologin : ', user, ' - ', account);
      getProfile(user);
      // setUserAutoLogin(true);
      // setWaitAuthCheck(false);
    } else {
      setWaitAuthCheck(false);
    }
  }, [isAuthenticated]);

  async function getProfile(userData) {
    console.log('fetching user profile', userData);
    fetchProfile({
      onSuccess: (data) => {
        console.log('profile fetch results : ', data);
        let tempProfile = { ...data.profile.attributes };
        tempProfile.uid = data.profile.id;
        dispatch(logUserProfile(tempProfile));
        dispatch(setProfileBlock(tempProfile.profileBlocked));

        console.log(
          'test email user : ',
          userData.attributes.emailVerified,
          ' - ',
          userData.attributes.email
        );

        setWaitAuthCheck(false);
      },
    });
  }

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
