/* eslint-disable prefer-const */
import { styled } from '@mui/material/styles';
import FusePageThemeBase from '@fuse/core/FusePageThemeBase';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMoralisCloudFunction, useMoralis } from 'react-moralis';
import NavbarToggleButton from 'app/theme-layouts/shared-components/NavbarToggleButton';
import {
  Button,
  Hidden,
  Grid,
  Select,
  MenuItem,
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
import UserControlRoom from './userControlRoom';

const Root = styled(FusePageThemeBase)({
  '& .FusePageThemeBase-header': {},
  '& .FusePageThemeBase-toolbar': {},
  '& .FusePageThemeBase-content': {},
  '& .FusePageThemeBase-sidebarHeader': {},
  '& .FusePageThemeBase-sidebarContent': {},
});

function AdminPage(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation('adminPage');
  const navigate = useNavigate();
  const { authenticate, isAuthenticated, user } = useMoralis();
  const loading = useSelector((state) => state.gameData.loading);
  const admins = useSelector((state) => state.gameData.admins);
  const maintenanceMode = useSelector((state) => state.gameData.maintenanceMode);
  const gameIsPaused = useSelector((state) => state.gameData.gameIsPaused);
  const userProfile = useSelector((state) => state.gameData.userProfile);

  const metamaskFieldInit = 'Enter valid Metamask address';
  const [userFreeGiftAddress, setUserFreeGiftAddress] = React.useState(null);
  const [classFreeGift, setClassFreeGift] = React.useState(0);

  const giftClasses = {
    'Martian Quick Flip': 0,
    'Arcturian’s Arbitrage': 1,
    'Pleiades Long Hold': 2,
    'Andromeda’s Leverage': 3,
  };

  const goMaintenance = () => navigate('../maintenance', { replace: true });
  useEffect(() => {
    if (maintenanceMode === true) {
      goMaintenance();
    }
  }, [maintenanceMode]);

  const [confirmMessage, setConfirmMessage] = React.useState({
    message: '',
    txHash: '',
    type: 'success',
  });
  const [loadingMessage, setLoadingMessage] = React.useState({
    messageTitle: 'User Validation.',
    messageBody: 'Confirming User, please wait.',
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

  const {
    fetch: freeGiftFetch,
    data: freeGiftData,
    error: freeGiftError,
  } = useMoralisCloudFunction(
    'adminGiftCard',
    {
      user: userFreeGiftAddress !== metamaskFieldInit && userFreeGiftAddress!==null? userFreeGiftAddress : 'none',
      classGift: classFreeGift,
    },
    { autoFetch: false }
  );

  const {
    fetch: fixDbFetch,
    data: fixDbData,
    error: fixDbError,
  } = useMoralisCloudFunction('fixDb', {}, { autoFetch: false });

  const handleChangeClassFreeGift = (event) => {
    setClassFreeGift(event.target.value);
  };

  const handleChangeuserFreeGiftAddress = (e) => {
    if (validator.isEthereumAddress(e.target.value)) {
      setUserFreeGiftAddress(e.target.value);
    } else {
      setUserFreeGiftAddress(metamaskFieldInit);
    }
  };

  async function confirmFreeGift() {
    console.log('giving free gift card for : ', userFreeGiftAddress, ' - ', classFreeGift);

    if (userFreeGiftAddress === metamaskFieldInit) {
      alert('Something is wrong with the user address');
    } else if (classFreeGift < 0 || classFreeGift > 3) {
      alert('Something is wrong with the free gift class');
    } else {
      let newMessage = {
        messageTitle: 'Free Gift',
        messageBody: `Free gift card is being created, please wait..`,
      };
      setLoadingMessage(newMessage);
      dispatch(logLoading(false));
      dispatch(logLoading(true));

      freeGiftFetch({
        onSuccess: (data) => {
          console.log('Moralis free gift card results : ', data);

          const messageconfirm = {
            message: data.message,
            type: data.type,
          };
          setConfirmMessage(messageconfirm);
          dispatch(logLoading(false));
        },
      });
    }
  }

  // async function fixingDb(params) {
  //   fixDbFetch({
  //     onSuccess: (data) => {
  //       console.log('Moralis fix db results : ', data);
  //     },
  //   });
  // }

  function giveFreeGiftCard() {
    return (
      <Card elevation={11} style={{ padding: '50px', margin: '50px', width: '80%' }}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h5" fontWeight="Bold" textAlign="center">
            Offer free gift card
          </Typography>

          <TextField
            className="mb-24"
            label="User Wallet Address"
            autoFocus
            placeholder="Enter metamask address"
            variant="standard"
            value={userFreeGiftAddress===null?'':userFreeGiftAddress}
            onChange={handleChangeuserFreeGiftAddress}
            required
            fullWidth
          />

          <Select
            labelId="Free Gift Calass"
            className="mt-16 mb-64"
            id="freeGiftClassSelect"
            value={classFreeGift}
            label="Gift Class"
            onChange={handleChangeClassFreeGift}
          >
            <MenuItem value={0}>{Object.keys(giftClasses)[0]}</MenuItem>
            <MenuItem value={1}>{Object.keys(giftClasses)[1]}</MenuItem>
            <MenuItem value={2}>{Object.keys(giftClasses)[2]}</MenuItem>
            <MenuItem value={3}>{Object.keys(giftClasses)[3]}</MenuItem>
          </Select>

          <Button color="success" variant="contained" onClick={() => confirmFreeGift()}>
            <Typography variant="h6" component="h1">
              Confirm free Gift
            </Typography>
          </Button>

          {/* <Button color="success" variant="contained" onClick={()=>fixingDb()}>
                          <Typography variant="h6" component="h1">
                         Fix db
                          </Typography>
                        </Button> */}
        </Grid>
      </Card>
    );
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
        <>
          {isAuthenticated && userProfile ? (
            <>
              {admins.includes(user.attributes.accounts[0]) ? (
                <Grid container direction="column" justifyContent="center" alignItems="center">
                  {giveFreeGiftCard()}

                  <UserControlRoom />
                </Grid>
              ) : (
                <Grid container justifyContent="center" alignItems="center">
                  <Typography variant="h4" fontWeight="Bold" textAlign="center">
                    You are not an admin
                  </Typography>
                </Grid>
              )}
            </>
          ) : (
            <Grid container justifyContent="center" alignItems="center">
              <Button color="success" variant="contained" onClick={() => authenticate()}>
                <Typography variant="h6" component="h1">
                  You need to login first
                </Typography>
              </Button>
            </Grid>
          )}
        </>
      }
    />
  );
}

export default AdminPage;
