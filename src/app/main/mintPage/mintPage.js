/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import { styled, darken } from '@mui/material/styles';
import FusePageMint from '@fuse/core/FusePageMint';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import ReactPlayer from 'react-player';
import { ethers } from 'ethers';
import NavbarToggleButton from 'app/theme-layouts/shared-components/NavbarToggleButton';
import {
  Button,
  Hidden,
  Grid,
  Typography,
  Card,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from '@mui/material';
// import validator from 'validator';
import { logLoading } from 'app/store/gameData';
import { openDialog, closeDialog } from 'app/store/fuse/dialogSlice';

const Root = styled(FusePageMint)({
  '& .FusePageMint-header': {},
  '& .FusePageMint-toolbar': {},
  '& .FusePageMint-content': {},
  '& .FusePageMint-sidebarHeader': {},
  '& .FusePageMint-sidebarContent': {},
});

function MintPage(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation('mintPage');
  const stationClasses = useSelector((state) => state.gameData.stationClasses);

  // const [web3, setWeb3] = React.useState(null);
  const loading = useSelector((state) => state.gameData.loading);
  const userProfile = useSelector((state) => state.gameData.userProfile);
  const maintenanceMode = useSelector((state) => state.gameData.maintenanceMode);
  const profileBlocked = useSelector((state) => state.gameData.profileBlocked);
  const gameIsPaused = useSelector((state) => state.gameData.gameIsPaused);
  const navigate = useNavigate();

  const polygonRatesAddress = useSelector((state) => state.gameData.polygonRatesAddress);

  const controllerContractAbi = useSelector((state) => state.gameData.controllerContractAbi);
  const controllerContractAddress = useSelector(
    (state) => state.gameData.controllerContractAddress
  );
  const starContractAddress = useSelector((state) => state.gameData.starContractAddress);
  const starContractAbi = useSelector((state) => state.gameData.starContractAbi);
  const chainIdtest = useSelector((state) => state.gameData.chainIdtest);

  const [starContractInstance, setStarContractInstance] = React.useState(null);
  const [controllerContractInstance, setControllerContractInstance] = React.useState(null);


  const chainParams = {
    '0x13881': {
      chainId: '0x13881',
      chainName: 'Mumbai',
      nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    },
    '0x89': {
      chainId: '0x89',
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
  };

  const [availStar, setAvailStar] = React.useState(0);

  const goMaintenance = () => navigate('../maintenance', { replace: true });
  useEffect(() => {
    if (maintenanceMode === true) {
      goMaintenance();
    }
  }, [maintenanceMode]);

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

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      if (userProfile === null) {
        console.log('account not set');
        navigate('../login', { replace: true });
      } else {
        console.log('account already set');
        const tempweb3 = new Web3(window.ethereum);
        // setWeb3(tempweb3);
        const chainId = tempweb3.eth.getChainId();
        if (chainId !== chainIdtest) {
          setChain(chainIdtest);
        }

        const starAbi = JSON.parse(JSON.stringify(starContractAbi));
        const tempstarContractInstance = new tempweb3.eth.Contract(starAbi, starContractAddress);
        setStarContractInstance(tempstarContractInstance);

        const stationsAbi = JSON.parse(JSON.stringify(controllerContractAbi));
        const tempcontrollerContractInstance = new tempweb3.eth.Contract(
          stationsAbi,
          controllerContractAddress
        );
        setControllerContractInstance(tempcontrollerContractInstance);
      }
    }
  }, [window.ethereum]);

  useEffect(() => {
    if (starContractInstance !== null && controllerContractInstance !== null && userProfile.user) {
      getBalance();

      // getNFTMetadata();
    }
  }, [starContractInstance, controllerContractInstance, userProfile]);

  async function getBalance() {
    try {
      starContractInstance.methods
        .balanceOf(userProfile.user)
        .call()
        .then((receipt) => {
          setAvailStar((receipt / 10 ** 18).toFixed(4));
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function setChain(chainID) {
    try {
      let chainSet = await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainID }],
      });
      console.log(chainSet);
      if (chainSet) {
        chainSet = false;
      }
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        console.log('add chain');
        console.log('chainID: ', chainID);
        try {
          // if(chainID === chainIdtest){
          console.log('add polygon');
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [chainParams[chainIdtest]],
          });
        } catch (addError) {
          console.log('add chain error: ', addError);
        }
      } else {
        console.log('switch error: ', switchError);
      }
    }
  }

  async function getRates() {
    let rates = await fetch(polygonRatesAddress).then((response) => response.json());
    return rates;
  }

  async function approveStation(pid, stationClass, type) {
    let newMessage = {
      messageTitle: 'Buying Nexus Station',
      messageBody: `Awaiting for metamask STAR transfer confirmation..`,
    };
    setLoadingMessage(newMessage);
    dispatch(logLoading(false));
    dispatch(logLoading(true));

    let rates = await getRates();

    let totalStations = await controllerContractInstance.methods.getStations().call();
    console.log('totalStations : ', totalStations);
    let allowance = await starContractInstance.methods
      .allowance(userProfile.user, controllerContractAddress)
      .call();
    console.log('allowance : ', allowance);
    if (allowance < 122 * 10 ** 18) {
      await starContractInstance.methods
        .approve(controllerContractAddress, ethers.utils.parseUnits('100000', 18))
        .send({
          maxFeePerGas: (rates.fast.maxFee * 10 ** 9).toFixed(0),
          maxPriorityFeePerGas: (rates.fast.maxPriorityFee * 10 ** 9).toFixed(0),
          from: userProfile.user,
        })
        .then(async () => {
          if (type === 'station') {
            mintStation(pid, stationClass, rates);
          } else {
            buyGiftCard(pid, rates);
          }
        })
        .catch((error) => {
          const messageconfirm = {
            message: 'Error while approving your station, please contact an admin',
            type: 'error',
          };
          setConfirmMessage(messageconfirm);
          dispatch(logLoading(false));

          console.log('mint approval error: ', error);
        });
    } else if (type === 'station') {
      mintStation(pid, stationClass, rates);
    } else {
      buyGiftCard(pid, rates);
    }
  }

  async function mintStation(pid, stationClass, rates) {
    let newMessage = {
      messageTitle: 'Buying Nexus Station',
      messageBody: `Minting Station, please wait.`,
    };
    setLoadingMessage(newMessage);
    dispatch(logLoading(false));
    dispatch(logLoading(true));

    await controllerContractInstance.methods
      .mintNFT(pid)
      .send({
        maxFeePerGas: (rates.fast.maxFee * 10 ** 9).toFixed(0),
        maxPriorityFeePerGas: (rates.fast.maxPriorityFee * 10 ** 9).toFixed(0),
        from: userProfile.user,
      })
      .then(() => {
        const messageconfirm = {
          message:
            'Nexus Station minted successfuly. It will show up in your inventory after total blockchain confirmation (up to 30min). Thank you.',
          type: 'Success',
        };
        setConfirmMessage(messageconfirm);
        dispatch(logLoading(false));
      })
      .catch((error) => {
        const messageconfirm = {
          message: 'Error while minting your station, please contact an admin',
          type: 'error',
        };
        setConfirmMessage(messageconfirm);
        dispatch(logLoading(false));

        console.log('minting after approval error: ', error);
      });
  }

  async function buyGiftCard(pid, rates) {
    let newMessage = {
      messageTitle: 'Buying Nexus Station Gift Card',
      messageBody: `Creating Station Gift Card, please wait.`,
    };
    setLoadingMessage(newMessage);
    dispatch(logLoading(false));
    dispatch(logLoading(true));

    await controllerContractInstance.methods
      .buyGift(pid)
      .send({
        maxFeePerGas: (rates.fast.maxFee * 10 ** 9).toFixed(0),
        maxPriorityFeePerGas: (rates.fast.maxPriorityFee * 10 ** 9).toFixed(0),
        from: userProfile.user,
      })
      .then(() => {
        const messageconfirm = {
          message:
            'Gift Card created successfuly. It will show up in your inventory after total blockchain confirmation (up to 30min). Thank you.',
          type: 'Success',
        };
        setConfirmMessage(messageconfirm);
        dispatch(logLoading(false));
      })
      .catch((error) => {
        const messageconfirm = {
          message: 'Error while minting your station, please contact an admin',
          type: 'error',
        };
        setConfirmMessage(messageconfirm);
        dispatch(logLoading(false));

        console.log('minting after approval error: ', error);
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
        <>
          {userProfile ? (
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ padding: '25px', margin: '15px' }}
              >
                <Typography variant="h6" fontWeight="Bold" textAlign="center">
                  Star in Wallet : <span className="textGold">{availStar}</span>
                </Typography>
              </Grid>
              <Grid container justifyContent="space-evenly" alignItems="center" className="mb-128">
                {Object.keys(stationClasses).map((stationClass, i) => (
                  <Grid item xs={3} key={stationClass}>
                    <Card
                      style={{
                        margin: '25px',
                        padding: '25px',
                      }}
                      className="coolCard"
                      elevation={11}
                    >
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid container justifyContent="center" alignItems="center">
                          <Typography variant="h6" fontWeight="Bold" textAlign="center">
                            {stationClasses[stationClass].name}
                          </Typography>
                        </Grid>

                        <ReactPlayer
                          width="250px"
                          height="250px"
                          muted
                          playing
                          loop
                          className="mt-32 mb-32"
                          url={stationClasses[stationClass].image}
                        />

                        <Grid container justifyContent="center" alignItems="center">
                          <Typography variant="h6" fontWeight="Bold" textAlign="center">
                            Cost :{' '}
                            <span className="textGold">{stationClasses[stationClass].cost}</span>{' '}
                            STAR
                          </Typography>
                        </Grid>

                        <Grid container justifyContent="center" alignItems="center">
                          <Typography variant="h6" fontWeight="Bold" textAlign="center">
                            APR :{' '}
                            <span className="textGold">{stationClasses[stationClass].apr}</span>
                          </Typography>
                        </Grid>

                        <Grid container justifyContent="center" alignItems="center">
                          <Typography
                            variant="h6"
                            fontWeight="Bold"
                            textAlign="center"
                            className="mt-16"
                          >
                            {stationClasses[stationClass].description}
                          </Typography>
                        </Grid>

                        <Grid container justifyContent="center" alignItems="center">
                          <Button
                            onClick={() =>
                              approveStation(
                                stationClass,
                                stationClasses[stationClass].name,
                                'station'
                              )
                            }
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
                              Buy Station
                            </Typography>
                          </Button>
                        </Grid>

                        <Grid container justifyContent="center" alignItems="center">
                          <Button
                            onClick={() =>
                              approveStation(
                                stationClass,
                                stationClasses[stationClass].name,
                                'card'
                              )
                            }
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
                              Buy Gift Card
                            </Typography>
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : (
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h6" fontWeight="Bold" textAlign="center">
                You need to Login first
              </Typography>
            </Grid>
          )}
        </>
      }
    />
  );
}

export default MintPage;
