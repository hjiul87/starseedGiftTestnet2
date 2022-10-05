/* eslint-disable prefer-destructuring */
import React, { useEffect } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import _ from '@lodash';
import { useMoralis } from 'react-moralis';
import { openDialog, closeDialog } from 'app/store/fuse/dialogSlice';

import { logLoading, logUserProfile } from 'app/store/gameData';

function SignInPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { logout, isAuthenticated, authenticate, user, account } = useMoralis();
  const loading = useSelector((state) => state.gameData.loading);
  const gameIsPaused = useSelector((state) => state.gameData.gameIsPaused);
  const maintenanceMode = useSelector((state) => state.gameData.maintenanceMode);
  const [refferral, setRefferral] = React.useState('none');

  const navigate = useNavigate();
  const goMaintenance = () => navigate('../maintenance', { replace: true });
  useEffect(() => {
    if (maintenanceMode === true) {
      goMaintenance();
    }
  }, [maintenanceMode]);

  useEffect(() => {
    console.log('user has change : ', user);
  }, [user]);

  useEffect(() => {
    console.log('account has change : ', account);
  }, [account]);

  const [confirmMessage, setConfirmMessage] = React.useState({
    message: '',
    txHash: '',
    type: 'success',
  });
  const [loadingMessage, setLoadingMessage] = React.useState({
    messageTitle: 'Authentification.',
    messageBody: 'A pop up will open in your metamask wallet, please sign it and wait.',
    type: 'success',
  });

  useEffect(() => {
    if (gameIsPaused === false) {
      if (loading === true) {
        dispatch(
          openDialog({
            children: (
              <>
                <DialogTitle id="alert-dialog-title">
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ margin: '15px' }}
                  >
                    <Typography variant="h6" textAlign="center">
                      {loadingMessage.messageTitle}
                    </Typography>
                  </Grid>
                </DialogTitle>
                <DialogContent>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ margin: '15px' }}
                  >
                    <Typography variant="h6" textAlign="center">
                      {loadingMessage.messageBody}
                    </Typography>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ margin: '15px' }}
                  >
                    <img
                      alt="waiting cats"
                      src="/starseedGiftTestnet2/assets/images/starseed/waitingCats.gif"
                      width="80%"
                    />
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ margin: '15px' }}
                  >
                    <CircularProgress />
                  </Grid>
                </DialogContent>
              </>
            ),
          })
        );
      } else if (confirmMessage.message === '') {
        dispatch(closeDialog());
      }
    }
  }, [loading, gameIsPaused]);

  useEffect(() => {
    if (gameIsPaused === false) {
      if (loading === false && confirmMessage.message !== '') {
        console.log('showing confirm message : ', confirmMessage);
        dispatch(
          openDialog({
            children: (
              <>
                <DialogTitle id="alert-dialog-title">
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ margin: '15px' }}
                  >
                    <Typography variant="h6" textAlign="center">
                      {confirmMessage.type}
                    </Typography>
                  </Grid>
                </DialogTitle>
                <DialogContent>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ margin: '15px' }}
                  >
                    <Typography variant="h6" textAlign="center">
                      {confirmMessage.message}
                    </Typography>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: '10px' }}
                  >
                    <Button
                      onClick={() => {
                        console.log('closing button');
                        dispatch(closeDialog());
                        setConfirmMessage({
                          message: '',
                          type: 'success',
                        });
                      }}
                      variant="contained"
                      color="info"
                      style={{ height: '42px', width: '225px', margin: '15px' }}
                    >
                      <Typography variant="h6" textAlign="center">
                        Close
                      </Typography>
                    </Button>
                  </Grid>
                </DialogContent>
              </>
            ),
          })
        );
      }
    }
  }, [loading, confirmMessage, gameIsPaused]);

  async function handlesignout() {
    console.log('logging out ');
    dispatch(logUserProfile(null));
    if (isAuthenticated) {
      logout();
    }
  }

  useEffect(() => {
    const urlString = window.location.href;
    checkForReferrer(urlString);
  }, []);

  async function checkForReferrer(urlString) {
    if (urlString.includes('?refer=')) {
      console.log('FOUND REFFERRAL -----> ', urlString);
      const refererId = searchParams.get('refAddress');
      setRefferral(refererId);
    } else {
      console.log('NO REFFERRAL -----> ', urlString);
      setRefferral('none');
    }
  }

  const handleAuth = async () => {
    await authenticate({
      signingMessage: `Loggin to starseed gift app via moralis. Ref=??${refferral}??`,
    })
      .then((tempuser) => {
        console.log('moralis login success : ', tempuser);
      })
      .catch((err) => {
        console.log('moralis login error : ', err);
      });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ margin: '15px' }}
    >
      <img
        className="w-48"
        src="/starseedGiftTestnet2/assets/images/starseed/logo.png"
        alt="logo"
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '25%',
        }}
      />
      {refferral !== null ? (
        <>
          <Typography
            className="mt-32 text-4xl font-extrabold tracking-tight leading-tight"
            textAlign="center"
          >
            Authentification
          </Typography>
          {isAuthenticated ? (
            <>
              <Typography variant="h6" textAlign="center" className="mt-32 mb-32">
                Logged in as : <span className="textGold"> {user.attributes.ethAddress} </span>
              </Typography>
              <Button onClick={() => handlesignout()} variant="contained" color="primary">
                <Typography variant="h6" color="secondary">
                  Logout
                </Typography>
              </Button>
            </>
          ) : (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ margin: '15px' }}
            >
              <Button
                onClick={() => handleAuth()}
                variant="outlined"
                color="secondary"
                className="mt-32"
              >
                <Typography variant="h6" color="secondary">
                  Login via Metamask
                </Typography>
              </Button>
              <Typography variant="h6" color="secondary" className="mt-32 mb-16">
                Referral :
              </Typography>

              <TextField
                className="mb-24"
                label="Referral Id"
                autoFocus
                variant="outlined"
                style={{
                  width: '50%',
                }}
                disabled
                value={refferral}
              />
            </Grid>
          )}
        </>
      ) : null}
    </Grid>
  );
}

export default SignInPage;
