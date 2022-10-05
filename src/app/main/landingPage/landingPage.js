import { styled } from '@mui/material/styles';
import { Grid, Typography, Card, Hidden, Button } from '@mui/material';
import React, { useEffect } from 'react';
import NavbarToggleButton from 'app/theme-layouts/shared-components/NavbarToggleButton';
import FusePageThemeBase from '@fuse/core/FusePageMint';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Web3 from 'web3';

const Root = styled(FusePageThemeBase)({
  '& .FusePageThemeBase-header': {},
  '& .FusePageThemeBase-toolbar': {},
  '& .FusePageThemeBase-content': {},
  '& .FusePageThemeBase-sidebarHeader': {},
  '& .FusePageThemeBase-sidebarContent': {},
});

function LandingPage(props) {
  const { t } = useTranslation('landingPage');
  const maintenanceMode = useSelector((state) => state.gameData.maintenanceMode);
  const user = useSelector((state) => state.gameData.firebaseUser);
  const chainIdtest = useSelector((state) => state.gameData.chainIdtest);
  const profileBlocked = useSelector((state) => state.gameData.profileBlocked);
  
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

  const navigate = useNavigate();
  const goMaintenance = () => navigate('../maintenance', { replace: true });
  useEffect(() => {
    if (maintenanceMode === true) {
      goMaintenance();
    }
  }, [maintenanceMode]);

  useEffect(() => {
    if (window.ethereum) {
      console.log('eth is defined');
      addPolygon();
    }
  }, [window]);

  async function addPolygon() {
    console.log('adding polygon');
    const web3 = new Web3(window.ethereum);

    const chainId = web3.eth.getChainId();
    if (chainId !== chainIdtest) {
      setChain(chainIdtest);
    }

    // if (window.ethereum.networkVersion !== chainId) {
    //   try {
    //     await window.ethereum.request({
    //       method: 'wallet_switchEthereumChain',
    //       params: [{ chainId: web3.utils.toHex(chainId) }],
    //     });
    //   } catch (err) {
    //     // This error code indicates that the chain has not been added to MetaMask
    //     if (err.code === 4902) {
    //       await window.ethereum.request({
    //         method: 'wallet_addEthereumChain',
    //         params: [
    //           {
    //             chainName: 'Polygon Mainnet',
    //             chainId: web3.utils.toHex(chainId),
    //             nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
    //             rpcUrls: ['https://polygon-rpc.com/'],
    //           },
    //         ],
    //       });
    //     }
    //   }
    // }
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
                <Typography variant="h4" color="secondary" fontWeight="Bold" textAlign="center">
                  {t('TITLE')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      }
      content={
        <div className="p-24" style={{ width: '100%' }}>
          {profileBlocked === true ? (
            <Grid container justifyContent="center" alignItems="center" style={{ width: '100%' }}>
              <Card elevation={11} style={{ margin: '30px', padding: '50px' }} className="coolCard">
                <Typography
                  variant="h6"
                  color="secondary"
                  textAlign="center"
                  style={{ margin: '30px' }}
                >
                  Your account has been blocked by admins.
                </Typography>
              </Card>
            </Grid>
          ) : (
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs md={5} lg={4}>
                  <Card
                    elevation={11}
                    style={{ margin: '30px', padding: '50px' }}
                    className="coolCard"
                  >
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <ReactPlayer
                        width="250px"
                        height="250px"
                        muted
                        playing
                        loop
                        url="https://atomichub-ipfs.com/ipfs/QmVZwF42WpnPvD5CuYS8v6wTwTzH4kMjd4kMPH45PRyxqb"
                      />
                      <Typography
                        variant="h6"
                        color="secondary"
                        textAlign="center"
                        style={{ margin: '30px' }}
                      >
                        Create and verify your account now to claim your Nexus Stations Gift Cards.
                      </Typography>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs md={5} lg={3}>
                  <Card
                    elevation={11}
                    style={{ margin: '30px', padding: '50px' }}
                    className="coolCard"
                  >
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <img width="128" src="/starseedGiftTestnet2/assets/images/starseed/logo.png" alt="logo" />

                      <Typography
                        variant="h6"
                        color="secondary"
                        textAlign="center"
                        style={{ margin: '30px' }}
                      >
                        Nexus Star Station generate passive income with an airdrop system.
                      </Typography>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs md={5} lg={4}>
                  <Card
                    elevation={11}
                    style={{ margin: '30px', padding: '50px' }}
                    className="coolCard"
                  >
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <ReactPlayer
                        width="250px"
                        height="250px"
                        muted
                        playing
                        loop
                        url="https://atomichub-ipfs.com/ipfs/QmeTtY6XLQPPRSrkoykUUJxm1ES8whzoJEW156wkd1ZvMo"
                      />
                      <Typography
                        variant="h6"
                        color="secondary"
                        textAlign="center"
                        style={{ margin: '30px' }}
                      >
                        The value of your airdrop depend on the mint value of your NFT, so the
                        earlier you get in, the better the results.
                      </Typography>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>

              <Card elevation={11} style={{ margin: '50px', padding: '15px' }} className="coolCard">
                <Grid container justifyContent="center" alignItems="center">
                  {user && Object.keys(user).length > 1 ? (
                    <Typography variant="h6" textAlign="center" className="m-32">
                      Logged in as : <span className="textGold"> {user.displayName} </span>
                    </Typography>
                  ) : (
                    <Button
                      onClick={() => navigate('../login', { replace: true })}
                      variant="contained"
                      color="primary"
                      style={{
                        marginLeft: '42px',
                        marginTop: '20px',
                        marginBottom: '20px',
                        padding: '30px',
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="gold"
                        textAlign="center"
                        style={{ fontWeight: 800, margin: '30px' }}
                      >
                        LOGIN
                      </Typography>
                    </Button>
                  )}
                </Grid>
              </Card>

              <Grid container justifyContent="center" alignItems="center">
                <Card
                  elevation={11}
                  style={{ margin: '30px', padding: '50px' }}
                  className="coolCard"
                >
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Typography variant="h6" textAlign="center" style={{ margin: '30px' }}>
                      You need a metamask account connected to the polygon blockchain to play the
                      game.
                    </Typography>

                    <Grid container justifyContent="center" alignItems="center">
                      <img
                        width="10%"
                        src="/starseedGiftTestnet2/assets/images/starseed/metamask-logo.svg"
                        alt="logoMetamask"
                      />
                      <Button
                        onClick={() => window.open('https://metamask.io/download/', '_blank')}
                        variant="contained"
                        color="primary"
                        style={{
                          marginLeft: '42px',
                          marginTop: '20px',
                          marginBottom: '20px',
                          padding: '30px',
                        }}
                      >
                        <Typography variant="h6" fontWeight="Bold" textAlign="center">
                          Install Metamask
                        </Typography>
                      </Button>
                    </Grid>

                    <Typography
                      variant="h6"
                      fontWeight="Bold"
                      textAlign="center"
                      style={{ marginTop: '42px', whiteSpace: 'pre-line' }}
                    >
                      {`The polygon network will be automatically added to your metamask when you visit this page (confirm inside your metamask plugin if the pop up did not show.)
                                    If nothing happens, make sure that you are logged in your metamask wallet and refresh this page.`}
                    </Typography>
                    <img src="/starseedGiftTestnet2/assets/images/starseed/polygon-logo.png" alt="logoPolygon" />
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          )}
        </div>
      }
    />
  );
}

export default LandingPage;
