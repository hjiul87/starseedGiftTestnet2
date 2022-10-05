/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import { styled } from '@mui/material/styles';
import FusePageThemeBase from '@fuse/core/FusePageMint';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import NavbarToggleButton from 'app/theme-layouts/shared-components/NavbarToggleButton';
import { useMoralisCloudFunction } from 'react-moralis';

import {
  Button,
  Hidden,
  Grid,
  Typography,
  Card,
  TextField,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import validator from 'validator';
import { logLoading } from 'app/store/gameData';
import { openDialog, closeDialog } from 'app/store/fuse/dialogSlice';

const Root = styled(FusePageThemeBase)({
  '& .FusePageThemeBase-header': {},
  '& .FusePageThemeBase-toolbar': {},
  '& .FusePageThemeBase-content': {},
  '& .FusePageThemeBase-sidebarHeader': {},
  '& .FusePageThemeBase-sidebarContent': {},
});

function ClaimPage(props) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation('claimPage');
  const [giftCode, setGiftCode] = React.useState('');
  const metamaskFieldInit = 'Enter valid Metamask address';
  const [claimAddress, setClaimAddress] = React.useState(metamaskFieldInit);
  const [giftData, setGiftData] = React.useState(null);

  const stationClasses = useSelector((state) => state.gameData.stationClasses);
  const loading = useSelector((state) => state.gameData.loading);

  const maintenanceMode = useSelector((state) => state.gameData.maintenanceMode);
  const gameIsPaused = useSelector((state) => state.gameData.gameIsPaused);
  const userProfile = useSelector((state) => state.gameData.userProfile);

  const navigate = useNavigate();
  const goMaintenance = () => navigate('../maintenance', { replace: true });
  useEffect(() => {
    if (maintenanceMode === true) {
      goMaintenance();
    }
  }, [maintenanceMode]);

  const {
    fetch: fetch1,
    data: data1,
    error: error1,
    isLoading: isLoading1,
  } = useMoralisCloudFunction(
    'checkGiftCode',
    {
      code: giftCode,
      wallet: claimAddress,
    },
    { autoFetch: false }
  );

  const {
    fetch: claimCodeFetch,
    data: claimCodeData,
    error: claimCodeError,
  } = useMoralisCloudFunction(
    'claimGiftCode',
    {
      code: giftCode,
      wallet: claimAddress,
    },
    { autoFetch: false }
  );

  const profileBlocked = useSelector((state) => state.gameData.profileBlocked);
  const goHome = () => navigate('../welcome', { replace: true });
  useEffect(() => {
    if (profileBlocked === true) {
      goHome();
    }
  }, [profileBlocked]);

  const [confirmMessage, setConfirmMessage] = React.useState({
    message: '',
    txHash: '',
    type: 'success',
  });
  const [loadingMessage, setLoadingMessage] = React.useState({
    messageTitle: 'Authentification.',
    messageBody: 'We are loggin you, please wait.',
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

  const handleChangeClaimAddress = (e) => {
    if (validator.isEthereumAddress(e.target.value)) {
      setClaimAddress(e.target.value);
    } else {
      setClaimAddress(metamaskFieldInit);
    }
  };

  const handleChangeGiftCode = (e) => {
    if (validator.isAlphanumeric(e.target.value)) {
      setGiftCode(e.target.value);
    } else {
      setGiftCode('');
    }
  };

  useEffect(() => {
    if (userProfile !== null) {
      console.log('found user : ', userProfile);
      setClaimAddress(userProfile.user);
    }
  }, [userProfile]);

  useEffect(() => {
    const urlString = window.location.href;
    if (urlString.includes('?code=')) {
      console.log('FOUND CODE -----> ', urlString);

      const tempCode = searchParams.get('code');
      console.log('code is : ', tempCode);

      setGiftCode(tempCode);
    }
  }, []);

  async function checkCode() {
    fetch1({
      onSuccess: (data) => {
        console.log('code check results : ', data);
        if (data.type === 'success') {
          setGiftData({ class: data.giftClass });
        } else {
          alert('That code is not available.');
        }
      },
    });
  }

  async function claimCode() {
    console.log('claiming : ', giftData, ' - ', claimAddress, ' - ', giftCode);

    let newMessage = {
      messageTitle: 'Claiming code',
      messageBody: `Your gift code is being processed, please wait..`,
    };
    setLoadingMessage(newMessage);
    dispatch(logLoading(false));
    dispatch(logLoading(true));

    claimCodeFetch({
      onSuccess: (data) => {
        console.log('code claim test results : ', data);

        const messageconfirm = {
          message: data.message,
          type: data.type,
        };
        setConfirmMessage(messageconfirm);
        setGiftData(null)
        setGiftCode('')
        dispatch(logLoading(false));
      },
    });
  }

  return (
    <Root
      header={
        <div className="p-24">
          <Grid container justifyContent="center" alignItems="center">
            <Hidden lgUp>
              <Grid item xs={1}>
                <NavbarToggleButton />
              </Grid>
            </Hidden>
            <Grid item xs lg>
              <Grid container justifyContent="center" alignItems="center">
                <Typography variant="h4" fontWeight="Bold" textAlign="center">
                  {t('TITLE')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      }
      content={
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Card style={{ margin: '25px', padding: '25px' }} className="coolCard " elevation={11}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h6" textAlign="center" style={{ margin: '25px' }}>
                Metamask address :
              </Typography>
              <TextField
                id="outlined-basic"
                label="claimAddress"
                placeholder="Enter metamask address"
                variant="standard"
                value={claimAddress}
                onChange={handleChangeClaimAddress}
                required
                style={{ minWidth: '550px' }}
              />
            </Grid>

            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h6" textAlign="center" style={{ margin: '25px' }}>
                Gift code :
              </Typography>
              <TextField
                id="giftCode"
                label="Gift code"
                variant="standard"
                value={giftCode}
                onChange={handleChangeGiftCode}
                required
                style={{ minWidth: '550px' }}
              />
            </Grid>

            {giftCode !== '' && claimAddress !== metamaskFieldInit ? (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ padding: '25px' }}
              >
                <Button
                  onClick={() => {
                    checkCode();
                  }}
                  variant="contained"
                  color="primary"
                >
                  <Typography color="gold" variant="h6" textAlign="center">
                    Verify code
                  </Typography>
                </Button>
              </Grid>
            ) : null}
          </Card>

          {giftData ? (
            <Card style={{ margin: '25px', padding: '25px' }} className="coolCard " elevation={11}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid container justifyContent="center" alignItems="center">
                  <Typography variant="h6" fontWeight="Bold" textAlign="center">
                    {stationClasses[giftData.class].name}
                  </Typography>
                </Grid>

                <ReactPlayer
                  width="250px"
                  height="250px"
                  muted
                  playing
                  loop
                  className="mt-32 mb-32"
                  url={stationClasses[giftData.class].image}
                />

                <Grid container justifyContent="center" alignItems="center">
                  <Typography variant="h6" fontWeight="Bold" textAlign="center">
                    Value : <span className="textGold">{stationClasses[giftData.class].cost}</span>{' '}
                    STAR
                  </Typography>
                </Grid>

                <Grid container justifyContent="center" alignItems="center">
                  <Typography variant="h6" fontWeight="Bold" textAlign="center">
                    APR : <span className="textGold">{stationClasses[giftData.class].apr}</span>
                  </Typography>
                </Grid>

                <Grid container justifyContent="center" alignItems="center">
                  <Typography variant="h6" fontWeight="Bold" textAlign="center">
                    Starting Weight :{' '}
                    <span className="textGold">{stationClasses[giftData.class].weight}</span>
                  </Typography>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                  <Button
                    onClick={() => claimCode()}
                    variant="contained"
                    color="primary"
                    className="mt-32 mb-32 p-32"
                  >
                    <Typography
                      variant="h6"
                      color="gold"
                      textAlign="center"
                      style={{ fontWeight: 800 }}
                    >
                      Claim
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Card>
          ) : null}
        </Grid>
      }
    />
  );
}

export default ClaimPage;
