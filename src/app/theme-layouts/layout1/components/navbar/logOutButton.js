import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useMoralis } from 'react-moralis';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logUserProfile } from 'app/store/gameData';

export default function Header(props) {
  const dispatch = useDispatch();
  const { authenticate, logout, isAuthenticated, account } = useMoralis();
  const userProfile = useSelector((state) => state.gameData.userProfile);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('account has changed ( log off button ) : ', account);
    if (userProfile !== null && account !== null) {
      console.log('compare user address : ', userProfile.user, ' vs ', account);
      if (account !== userProfile.user) {
        logOut();
      }
    }
  }, [account, userProfile]);

  function logOut(params) {
    // remove userprofile and logout from react moralis bla bla
    dispatch(logUserProfile(null));
    if (isAuthenticated) {
      logout();
    }
    navigate('../welcome', { replace: true });
  }

  function handleClick() {
    if (isAuthenticated) {
      logOut();
    } else {
      navigate('../login', { replace: true });
    }
  }

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Button
          onClick={() => handleClick()}
          color="primary"
          variant="contained"
          style={{ padding: '15px' }}
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </Button>
      </Grid>
    </div>
  );
}
