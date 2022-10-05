/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import JsPDF from 'jspdf';
import Web3 from 'web3';
import html2canvas from 'html2canvas';
import useMediaQuery from '@mui/material/useMediaQuery';
import validator from 'validator';
import { openDialog, closeDialog } from 'app/store/fuse/dialogSlice';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Button,
  Dialog,
  CircularProgress,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Card,
  Hidden,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FusePageMint from '@fuse/core/FusePageMint';
import NavbarToggleButton from 'app/theme-layouts/shared-components/NavbarToggleButton';
import Moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { logLoading } from 'app/store/gameData';
import { Box } from '@mui/system';

const Root = styled(FusePageMint)({
  '& .FusePageMint-header': {},
  '& .FusePageMint-toolbar': {},
  '& .FusePageMint-content': {},
  '& .FusePageMint-sidebarHeader': {},
  '& .FusePageMint-sidebarContent': {},
});

function InventoryPage(props) {
  const { t } = useTranslation('inventoryPage');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { authenticate, isAuthenticated, user } = useMoralis();
  const dispatch = useDispatch();

  const pageLoaded = useRef(false);
  const web3Loaded = useRef(false);
  const cardsLoaded = useRef(false);
  const stationsLoaded = useRef(false);

  const loading = useSelector((state) => state.gameData.loading);
  const profileBlocked = useSelector((state) => state.gameData.profileBlocked);
  const maintenanceMode = useSelector((state) => state.gameData.maintenanceMode);
  const gameIsPaused = useSelector((state) => state.gameData.gameIsPaused);
  const userProfile = useSelector((state) => state.gameData.userProfile);
  const polygonRatesAddress = useSelector((state) => state.gameData.polygonRatesAddress);
  const baseUrl =  useSelector((state) => state.gameData.baseUrl);

  const stationContractABI = useSelector((state) => state.gameData.stationContractABI);
  const controllerContractAbi = useSelector((state) => state.gameData.controllerContractAbi);
  const controllerContractAddress = useSelector(
    (state) => state.gameData.controllerContractAddress
  );
  const stationContractAddress = useSelector((state) => state.gameData.stationContractAddress);
  const stationClasses = useSelector((state) => state.gameData.stationClasses);

  const [controllerContractInstance, setControllerContractInstance] = React.useState(null);

  const [filterType, setFilterType] = React.useState(null);
  const [filteredArray, setFilteredArray] = React.useState(null);

  const [userGiftCards, setUserGiftCards] = React.useState([]);
  const [allCombinedData, setAllCombinedData] = React.useState(null);
  const [confirmRedeemPopup, setConfirmRedeemPopup] = React.useState(false);
  const [codeToRedeem, setCodeToRedeem] = React.useState(null);
  const [redeemCode, setredeemCode] = React.useState(null);
  const [wallet, setWallet] = React.useState(null);
  const [starStations, setStarStations] = React.useState([]);
  const [openCoolNftCard, setOpenCoolNftCard] = React.useState(false);
  const [selectedGiftCardLink, setSelectedGiftCardLink] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);

  const addressTestAccount3 = '0x6bbbb6360a63806Cb9F7266845fcA70f357b9D91';

  const [pageMode, setPageMode] = React.useState('card');
  const [transferAddress, setTransferAddress] = React.useState(addressTestAccount3);
  const filterListGiftCard = {
    available: {
      type: 'available',
      name: 'Available Gift Cards',
      label: `Available`,
      sort: '', // sort descending with - or ascending with empty string
      option: {},
    },
    claimed: {
      type: 'claimed',
      name: 'Claimed Gift Cards',
      label: `Claimed`,
      sort: '', // sort descending with - or ascending with empty string
      option: {},
    },
    all: {
      type: 'all',
      name: 'All Gift Cards',
      label: `ALL`,
      sort: '', // sort descending with - or ascending with empty string
      option: {},
    },
  };
  const filterListStation = {
    all: {
      type: 'all',
      name: 'All Stations',
      label: `ALL`,
      sort: '', // sort descending with - or ascending with empty string
      option: {},
    },
  };
  const [filterList, setFilterList] = React.useState(filterListGiftCard);
  const giftClasses = ['Freighter', 'Meteor', 'City', 'Planet'];

  const [expandedGiftCard, setExpandedGiftCard] = React.useState(false);
  const [expandedStation, setExpandedStation] = React.useState(false);

  const handleCloseCoolGiftCard = () => {
    setSelectedGiftCardLink(null);
    setOpenCoolNftCard(false);
  };

  const handleChangeClaimAddress = (e) => {
    if (validator.isEthereumAddress(e.target.value)) {
      setTransferAddress(e.target.value);
    } else {
      setTransferAddress(null);
    }
  };

  useEffect(() => {
    console.log('testing window ! ', window.ethereum);
    if (
      controllerContractAddress !== null &&
      controllerContractAbi !== null &&
      userProfile !== null &&
      typeof window.ethereum !== 'undefined' &&
      web3Loaded.current === false
    ) {
      console.log(
        'MetaMask is installed! : ',
        pageLoaded.current,
        ' - ',
        controllerContractAddress,
        ' - ',
        controllerContractAbi
      );
      web3Loaded.current = true;
      const abi = JSON.parse(JSON.stringify(controllerContractAbi));
      const tempweb3 = new Web3(window.ethereum);
      setWeb3(tempweb3);
      const tempcontrollerContractInstance = new tempweb3.eth.Contract(
        abi,
        controllerContractAddress
      );
      setControllerContractInstance(tempcontrollerContractInstance);
    }
  }, [window.ethereum, userProfile, controllerContractAddress, controllerContractAbi]);

  const {
    fetch: fetch1,
    data: data1,
    error: error1,
    isLoading: isLoading1,
  } = useMoralisCloudFunction('getUserGiftCodes', {}, { autoFetch: false });

  const {
    fetch: fetchRedeemGift,
    data: dataRedeemGift,
    error: errorRedeemGift,
    isLoading: isLoadingRedeemGift,
  } = useMoralisCloudFunction(
    'claimGiftCode',
    {
      "code": redeemCode,
      "wallet": wallet,
    },
    { autoFetch: false }
  );

  const navigate = useNavigate();
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
    messageTitle: 'Loading assets.',
    messageBody: 'We are fetching your inventory, please wait.',
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
    if (
      confirmRedeemPopup === true &&
      gameIsPaused === false &&
      loading === false &&
      codeToRedeem !== null
    ) {
      console.log('showing confirm popup : ', codeToRedeem);
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
                    Confirm gift code redeem
                  </Typography>
                </Grid>
              </DialogTitle>
              <DialogContent>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                  <Typography
                    variant="h6"
                    textAlign="center"
                    color="gold"
                    style={{ fontWeight: '600' }}
                    className="mb-16"
                  >
                    {stationClasses[codeToRedeem.classGift].name}
                  </Typography>
                  <ReactPlayer
                    width="250px"
                    height="250px"
                    muted
                    playing
                    loop
                    className="mt-32 mb-32"
                    url={stationClasses[codeToRedeem.classGift].image}
                  />
                  <Typography
                    variant="h6"
                    textAlign="center"
                    style={{ fontWeight: '600' }}
                    className="mb-16 textGrey"
                  >
                    {stationClasses[codeToRedeem.classGift].description}
                  </Typography>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    style={{ fontWeight: '600' }}
                    className="mb-16 textGrey"
                  >
                    Base Weight :{' '}
                    <span className="textGold">
                      {stationClasses[codeToRedeem.classGift].weight}
                    </span>
                  </Typography>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    style={{ textDecoration: 'line-through', fontWeight: '600' }}
                    className="mb-16 textGrey"
                  >
                    Cost :{' '}
                    <span className="textGold">{stationClasses[codeToRedeem.classGift].cost}</span>
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
                      confirmRedeemCode(codeToRedeem);
                    }}
                    variant="contained"
                    color="info"
                    style={{ height: '42px', width: '225px', margin: '15px' }}
                  >
                    <Typography variant="h6" textAlign="center">
                      Confirm
                    </Typography>
                  </Button>

                  <Button
                    onClick={() => {
                      console.log('closing button');
                      dispatch(closeDialog());
                      setCodeToRedeem(null);
                      setConfirmRedeemPopup(false);
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
  }, [confirmRedeemPopup, loading, gameIsPaused, codeToRedeem]);

  async function confirmRedeemCode(codeData) {
    dispatch(closeDialog());
    setCodeToRedeem(null);
    setConfirmRedeemPopup(false);

    let newMessage = {
      messageTitle: 'Claiming Gift',
      messageBody: `Your gift card is being claimed, please wait..`,
    };
    setLoadingMessage(newMessage);
    dispatch(logLoading(false));
    dispatch(logLoading(true));

    setWallet(user.attributes.ethAddress);
    setredeemCode(codeData.id);
  }

  useEffect(() => {
    if (wallet && redeemCode) {
      console.log('calling redeem code cloud function : ', wallet, ' - ', redeemCode);
      fetchRedeemGift({
        onSuccess: (dataStations) => {
          console.log('code check results stations : ', dataStations);

          const messageconfirm = {
            message: dataStations.message,
            type: dataStations.type,
          };
          setConfirmMessage(messageconfirm);
          dispatch(logLoading(false));
          fetchUserGiftCard();
        },
      });
    }
  }, [wallet, redeemCode]);

  const handleChangeGiftCard = (panel) => (event, isExpanded) => {
    setExpandedGiftCard(isExpanded ? panel : false);
  };

  const handleChangeStation = (panel) => (event, isExpanded) => {
    setExpandedStation(isExpanded ? panel : false);
  };

  function sortList(typeSort) {
    let temp = { ...filterType };
    temp.sort = typeSort;
    setFilterType(temp);
  }

  function handleChangeGiftClass(className) {
    let tempFilter = { ...filterType };
    tempFilter.option.giftClass = className;
    setFilterType(tempFilter);
  }

  function applyFilter() {
    let filterArrayTemp = [];
    let filterKey;
    const filterMap = {
      class: {
        Freighter: 0,
        Meteor: 1,
        City: 2,
        Planet: 3,
      },
    };

    allCombinedData.forEach((cardData) => {
      let optionClass = '';
      if (pageMode === 'card') {
        optionClass = cardData.classGift;
      } else {
        optionClass = parseInt(cardData.class, 10);
      }
      if (filterType.option.giftClass) {
        if (optionClass === filterMap.class[filterType.option.giftClass]) {
          let tempData = { ...cardData };

          let date = Moment(cardData.dateCreated).format('YYYY-MM-DD');
          tempData.dateCreated = date;

          if (filterType.type === 'all') {
            filterKey = 1;
            if (pageMode === 'card') {
              filterKey = 1;
            } else {
              filterKey = parseInt(tempData.tokenId, 10);
            }
            tempData.filterKey = filterKey;
          } else if (filterType.type === 'available') {
            filterKey = 0;
            if (tempData.claimed === false) {
              filterKey = 1;
            }
            tempData.filterKey = filterKey;
          } else if (filterType.type === 'claimed') {
            filterKey = 0;
            if (tempData.claimed === true) {
              filterKey = 1;
            }
            tempData.filterKey = filterKey;
          }

          if (tempData.filterKey > 0) {
            filterArrayTemp.push(tempData);
          }
        }
      } else {
        let tempData = { ...cardData };

        let date = Moment(cardData.dateCreated).format('YYYY-MM-DD');
        tempData.dateCreated = date;

        if (filterType.type === 'all') {
          if (pageMode === 'card') {
            filterKey = 1;
          } else {
            filterKey = parseInt(tempData.tokenId, 10);
          }
          tempData.filterKey = filterKey;
        } else if (filterType.type === 'available') {
          filterKey = 0;
          if (tempData.claimed === false) {
            filterKey = 1;
          }
          tempData.filterKey = filterKey;
        } else if (filterType.type === 'claimed') {
          filterKey = 0;
          if (tempData.claimed === true) {
            filterKey = 1;
          }
          tempData.filterKey = filterKey;
        }

        if (tempData.filterKey > 0) {
          filterArrayTemp.push(tempData);
        }
      }
    });

    console.log('filtered array : ', filterArrayTemp);

    if (filterType.sort === '-') {
      filterArrayTemp.sort(dynamicSort(`-filterKey`));
    } else {
      filterArrayTemp.sort(dynamicSort(`filterKey`));
    }

    setFilteredArray(filterArrayTemp);
    if (pageLoaded.current === true) {
      dispatch(logLoading(false));
    }
    window.scrollTo(0, 0);
  }

  function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      // eslint-disable-next-line no-nested-ternary
      let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  function handleChangeSelectedFilter(filterName) {
    console.log('selected filter : ', filterName, filterList[filterName]);
    setFilterType(filterList[filterName]);
  }

  useEffect(() => {
    if (allCombinedData !== null && filterType !== null) {
      console.log('filter has changed : ', filterType);
      setFilteredArray(null);
      applyFilter();
    }
  }, [allCombinedData, filterType]);

  async function redeemGiftCardGiftCard(giftCode) {
    console.log('redeem gift code');
    setCodeToRedeem(giftCode);
    setConfirmRedeemPopup(true);
  }

  async function downloadGiftCode() {
    const pdf = new JsPDF('l', 'px', [483, 322]);
    const data = await html2canvas(document.querySelector('#coolGiftCard'), { scale: 2 }); // 96 / 72
    const img = data.toDataURL('image/png');
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    console.log('pdf height : ', pdfHeight, ' - width : ', pdfWidth);
    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save('Nexus_station_gift_card.pdf');
  }

  function showCoolGiftCard(link) {
    console.log('showing cool card for : ', link);

    return (
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
        open={openCoolNftCard}
        onClose={handleCloseCoolGiftCard}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="alert-dialog-title" style={{ width: '90%' }}>
          <Grid container justifyContent="center" alignItems="center" style={{ margin: '15px' }}>
            <Typography variant="h6" textAlign="center">
              Cool gift card
            </Typography>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Box
              id="coolGiftCard"
              style={{
                backgroundImage: `url("starseedGiftTestnet2/assets/images/starseed/giftCardBG1.png")`,
                backgroundSize: 'cover',
                minWidth: '483px',
                minHeight: '322px',
              }}
            >
              <QRCodeCanvas
                size={150}
                level="H"
                style={{
                  marginLeft: '55%',
                  marginTop: '20%',
                }}
                value={link}
              />
            </Box>

            <Typography variant="h6" textAlign="center">
              <a href={link}>{link}</a>
            </Typography>

            <Button
              onClick={() => {
                downloadGiftCode();
              }}
              variant="contained"
              color="info"
              style={{ height: '42px', width: '225px', margin: '15px' }}
            >
              <Typography variant="h6" textAlign="center">
                Download gift card
              </Typography>
            </Button>

            <Button
              onClick={() => {
                setOpenCoolNftCard(false);
                setSelectedGiftCardLink(null);
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
      </Dialog>
    );
  }

  function AccordionGiftCard() {
    return filteredArray.map((giftCardData) => (
      <Accordion
        key={giftCardData.id}
        expanded={expandedGiftCard === giftCardData.id}
        onChange={handleChangeGiftCard(giftCardData.id)}
        style={{ width: '90%', marginBottom: '10px' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${giftCardData.id}bh-content`}
          id={`${giftCardData.id}bh-header`}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={4}>
              <Typography variant="h6" color="secondary" style={{ fontWeight: '600' }}>
                {giftCardData.id}
              </Typography>
            </Grid>
            <Grid item xs={4} className="ml-32">
              <Typography variant="h6" color="gold">
                {stationClasses[giftCardData.classGift].class}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2" color="secondary">
                {giftCardData.claimed === true ? 'Claimed' : 'Available'}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            style={{ margin: '30px' }}
          >
            <Grid item xs={3}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  textAlign="center"
                  className="textGrey"
                  style={{ fontWeight: '600' }}
                >
                  Created on : <span className="textGold">{giftCardData.dateCreated}</span>
                </Typography>
                {giftCardData.claimed === false ? (
                  <>
                    <Button
                      onClick={() => redeemGiftCardGiftCard(giftCardData)}
                      variant="contained"
                      style={{
                        margin: '15px',
                        fontSize: '18px',
                        backgroundColor: 'gold',
                        color: 'black',
                      }}
                    >
                      Redeem
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedGiftCardLink(
                          `${baseUrl}/claim?code=${giftCardData.id}`
                        );
                        setOpenCoolNftCard(true);
                      }}
                      variant="contained"
                      style={{
                        margin: '15px',
                        fontSize: '18px',
                        backgroundColor: 'gold',
                        color: 'black',
                      }}
                    >
                      Show my cool gift card
                    </Button>
                  </>
                ) : null}
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  textAlign="center"
                  color="gold"
                  style={{ fontWeight: '600' }}
                  className="mb-16"
                >
                  {stationClasses[giftCardData.classGift].name}
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{ fontWeight: '600' }}
                  className="mb-16 textGrey"
                >
                  {stationClasses[giftCardData.classGift].description}
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{ fontWeight: '600' }}
                  className="mb-16 textGrey"
                >
                  Base Weight :{' '}
                  <span className="textGold">{stationClasses[giftCardData.classGift].weight}</span>
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{ fontWeight: '600' }}
                  className="mb-16 textGrey"
                >
                  Cost :{' '}
                  <span className="textGold">{stationClasses[giftCardData.classGift].cost}</span>
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <ReactPlayer
                  width="250px"
                  height="250px"
                  muted
                  playing
                  loop
                  className="mt-32 mb-32"
                  url={stationClasses[giftCardData.classGift].image}
                />
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    ));
  }

  function AccordionStationCard() {
    console.log('making stations accordeon with : ', filteredArray);

    return filteredArray.map((stationData) => (
      <Accordion
        key={stationData.tokenId}
        expanded={expandedStation === stationData.tokenId}
        onChange={handleChangeStation(stationData.tokenId)}
        style={{ width: '90%', marginBottom: '10px' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${stationData.tokenId}bh-content`}
          id={`${stationData.tokenId}bh-header`}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={4}>
              <Typography variant="h6" color="secondary" style={{ fontWeight: '600' }}>
                Mint : <span className="textGold">{stationData.tokenId}</span>
              </Typography>
            </Grid>
            <Grid item xs={4} className="ml-32">
              <Typography variant="h6" color="gold">
                {stationClasses[parseInt(stationData.class, 10)].class}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            style={{ margin: '30px' }}
          >
            <Grid item xs={3}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  textAlign="center"
                  color="gold"
                  style={{ fontWeight: '600' }}
                  className="mb-16"
                >
                  {stationClasses[parseInt(stationData.class, 10)].name}
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{ fontWeight: '600' }}
                  className="mb-16 textGrey"
                >
                  {stationClasses[parseInt(stationData.class, 10)].description}
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{ fontWeight: '600' }}
                  className="mb-16 textGrey"
                >
                  Cost :{' '}
                  <span className="textGold">
                    {stationClasses[parseInt(stationData.class, 10)].cost}
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{ fontWeight: '600' }}
                  className="mb-16 textGrey"
                >
                  Base Weight :{' '}
                  <span className="textGold">
                    {stationClasses[parseInt(stationData.class, 10)].weight}
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{ fontWeight: '600' }}
                  className="mb-16 textGrey"
                >
                  Current Weight :{' '}
                  <span className="textGold">
                    {(parseInt(stationData.weight, 10) / 1000).toFixed(2)}
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{ fontWeight: '600' }}
                  className="mb-16 textGrey"
                >
                  Base APR :{' '}
                  <span className="textGold">
                    {(stationClasses[parseInt(stationData.class, 10)].baseApr * 100).toFixed(2)}
                  </span>{' '}
                  %
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  style={{ fontWeight: '600' }}
                  className="mb-16 textGrey"
                >
                  Current APR :{' '}
                  <span className="textGold">
                    {(
                      (parseInt(stationData.weight, 10) /
                        1000 /
                        stationClasses[parseInt(stationData.class, 10)].weight) *
                      stationClasses[parseInt(stationData.class, 10)].baseApr *
                      100
                    ).toFixed(2)}
                  </span>{' '}
                  %
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <ReactPlayer
                  width="250px"
                  height="250px"
                  muted
                  playing
                  loop
                  className="mt-32 mb-32"
                  url={stationClasses[parseInt(stationData.class, 10)].image}
                />

                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{ margin: '30px' }}
                >
                  <Typography variant="h6" textAlign="center">
                    Transfer my station :
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="claimAddress"
                    placeholder="Enter metamask address"
                    variant="standard"
                    value={transferAddress}
                    onChange={handleChangeClaimAddress}
                    required
                    style={{ minWidth: '550px' }}
                  />
                </Grid>

                {transferAddress ? (
                  <Button
                    onClick={() => {
                      transferStation(
                        user.attributes.accounts[0],
                        transferAddress,
                        stationData.tokenId
                      );
                    }}
                    variant="contained"
                    style={{
                      margin: '15px',
                      fontSize: '18px',
                      backgroundColor: 'gold',
                      color: 'black',
                    }}
                  >
                    Send
                  </Button>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    ));
  }

  async function fetchUserGiftCard() {
    dispatch(logLoading(true));
    console.log('fetch user giftcards');
    fetch1({
      onSuccess: (data) => {
        console.log('code check results : ', data);
        if (data.data[0].length > 0) {
          let userCards = [];
          data.data[0].forEach((rawGiftCard) => {
            let tempCard = {
              id: rawGiftCard.id,
              claimed: rawGiftCard.attributes.claimed,
              dateCreated: rawGiftCard.attributes.createdAt,
              classGift: rawGiftCard.attributes.classGift,
              freeCard: rawGiftCard.attributes.freeGiftCard,
            };

            userCards.push(tempCard);
          });

          console.log('user cards : ', userCards);
          setAllCombinedData(userCards);
          setUserGiftCards(userCards);
          setFilterType(filterList.all);
          cardsLoaded.current = true;
        } else {
          cardsLoaded.current = true;
        }
      },
    });
  }

  useEffect(() => {
    console.log('use effect is authenticated : ', isAuthenticated);
    if (isAuthenticated) {
      console.log('isAuthenticated has changed : ', isAuthenticated, ' - ', user);
      fetchUserGiftCard();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (web3 && controllerContractInstance && pageLoaded.current === false) {
      console.log(
        'web 3 and controller instance are set : ',
        web3,
        ' - ',
        controllerContractInstance
      );
      getUserStations();
    }
  }, [web3, controllerContractInstance, pageLoaded]);

  async function getUserStations() {
    console.log('fetching stations metadata for : ', userProfile.user, ' - ', user);

    const abi = JSON.parse(JSON.stringify(stationContractABI));
    const contract = new web3.eth.Contract(abi, stationContractAddress);
    const numStations = await contract.methods.balanceOf(userProfile.user).call();

    console.log('numstations : ', numStations);
    const stationInfo = await controllerContractInstance.methods.getStations().call();
    console.log('stationInfo : ', stationInfo);
    if (numStations > 0) {
      let _dataWait = [];
      for (let x = 0; x < numStations; x++) {
        _dataWait.push(resolveStationMetadata(contract, stationInfo, x));
      }

      await Promise.all(_dataWait)
        .then((results) => {
          console.log('station metadata resolving : ', results);
          let tempStations = []; // [...starStations];
          results.forEach((dataResult) => {
            tempStations.push(dataResult);
          });
          setStarStations(tempStations);
          if (pageMode === 'stations') {
            setAllCombinedData(null);
            setFilteredArray([]);
            setFilterType(filterListStation.all);
            setAllCombinedData(tempStations);
          }
          pageLoaded.current = true;
          stationsLoaded.current = true;
          dispatch(logLoading(false));
        })
        .catch((error) => {
          console.log('error while resolving station metamadata');
        });
    } else {
      stationsLoaded.current = true;
      pageLoaded.current = true;
    }
  }

  async function getRates() {
    let rates = await fetch(polygonRatesAddress).then((response) =>
      response.json()
    );
    return rates;
  }

  async function transferStation(from, to, tokenId) {
    let newMessage = {
      messageTitle: 'Transfer Asset',
      messageBody: `Your station is beig transfered, please wait..`,
    };
    setLoadingMessage(newMessage);
    dispatch(logLoading(false));
    dispatch(logLoading(true));

    console.log('Transfering station ', from, ' to ', to, ' : ', tokenId);

    if (!validator.isEthereumAddress(from)) {
      alert('something is wrong with the owner address');
    } else if (!validator.isEthereumAddress(to)) {
      alert('something is wrong with the receiver address');
    } else if (!validator.isInt(tokenId)) {
      alert('something is wrong with the tokenId');
    } else {
      let rates = await getRates();
      const tokenString = tokenId.toString();
      console.log('tokenString : ', tokenString);
      const abi = JSON.parse(JSON.stringify(stationContractABI));
      const contract = new web3.eth.Contract(abi, stationContractAddress);
      await contract.methods
        .safeTransferFrom(from, to, tokenId)
        .send({
          "maxFeePerGas": (rates.fast.maxFee * 10 ** 9).toFixed(0),
          "maxPriorityFeePerGas": (rates.fast.maxPriorityFee * 10 ** 9).toFixed(0),
          "from": from,
        })
        .then((result) => {
          console.log('transfer Action results : ', result);

          const messageconfirm = {
            message: 'Station transfered successfuly',
            type: 'success',
          };
          setConfirmMessage(messageconfirm);
          getUserStations();
          dispatch(logLoading(false));
        })
        .catch((error) => {
          console.log('transfer Action error : ', error);

          const messageconfirm = {
            message: 'Error while transfering your station, please contact an admin',
            type: 'error',
          };
          setConfirmMessage(messageconfirm);
          dispatch(logLoading(false));
        });
    }
  }

  async function resolveStationMetadata(contract, stationInfo, x) {
    const nftId = await contract.methods.tokenOfOwnerByIndex(userProfile.user, x).call();
    return stationInfo[nftId - 1];
  }

  function changePageMode(params) {
    setAllCombinedData(null);
    setFilteredArray([]);
    if (pageMode === 'card') {
      setPageMode('stations');
      setFilterList(filterListStation);
      setFilterType(filterListStation.all);
      setAllCombinedData(starStations);
    } else {
      setPageMode('card');
      setFilterType(filterListGiftCard.all);
      setFilterList(filterListGiftCard);
      setAllCombinedData(userGiftCards);
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
          {profileBlocked === true ? (
            navigate('../welcome', { replace: true })
          ) : (
            <div className="p-24" style={{ width: '100%' }}>
              {isAuthenticated ? (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: '100%', height: '100%' }}
                >
                  <>
                    {!isAuthenticated ? (
                      <Button
                        onClick={() => authenticate()}
                        variant="contained"
                        style={{
                          margin: '15px',
                          fontSize: '18px',
                          backgroundColor: '#1E2125',
                          color: 'rgba(246, 246, 246, 0.81)',
                        }}
                      >
                        Confirm my identity
                      </Button>
                    ) : (
                      <Card elevation={11} style={{ padding: '30px' }} className="coolCard">
                        {stationsLoaded.current === false &&
                        cardsLoaded.current === false &&
                        pageLoaded.current === false ? (
                          <Button
                            onClick={() => fetchUserGiftCard()}
                            variant="contained"
                            style={{
                              margin: '15px',
                              fontSize: '18px',
                              backgroundColor: '#1E2125',
                              color: 'rgba(246, 246, 246, 0.81)',
                            }}
                          >
                            Reveal my Inventory
                          </Button>
                        ) : (
                          <Grid
                            container
                            justifyContent="center"
                            direction="column"
                            alignItems="center"
                            style={{ width: '100%', height: '100%' }}
                          >
                            {gameIsPaused === false && loading === false ? (
                              <>
                                {starStations.length === 0 && userGiftCards.length === 0 ? (
                                  <Grid container justifyContent="center" alignItems="center">
                                    <Typography variant="h6" textAlign="center">
                                      You have no assets
                                    </Typography>
                                  </Grid>
                                ) : (
                                  <>
                                    <Grid
                                      container
                                      justifyContent="flext-start"
                                      alignItems="center"
                                      style={{ margin: '30px' }}
                                    >
                                      <Button
                                        onClick={() => changePageMode()}
                                        variant="contained"
                                        style={{
                                          margin: '10px',
                                          marginLeft: '42px',
                                          padding: '22px',
                                          fontSize: '22px',
                                          fontWeight: 700,
                                          backgroundColor: 'gold',
                                          color: 'black',
                                        }}
                                      >
                                        {pageMode === 'card'
                                          ? 'Show my Nexus Stations'
                                          : 'Show my Gift Cards'}
                                      </Button>
                                    </Grid>

                                    <Grid
                                      container
                                      justifyContent="center"
                                      alignItems="center"
                                      style={{ margin: '30px' }}
                                    >
                                      <Typography variant="h6" textAlign="center">
                                        Choose the filter to sort your gift cards
                                      </Typography>
                                    </Grid>

                                    {filterType !== null ? (
                                      <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ margin: '30px' }}
                                      >
                                        <Typography variant="h6" textAlign="center">
                                          Filter :
                                        </Typography>

                                        {Object.keys(filterList).map((option, i) => (
                                          <Button
                                            key={option}
                                            onClick={() => handleChangeSelectedFilter(option)}
                                            variant="contained"
                                            style={{
                                              margin: '15px',
                                              fontSize: '18px',
                                              backgroundColor:
                                                filterType.type === option ? 'gold' : '#1E2125',
                                              color:
                                                filterType.type === option
                                                  ? 'black'
                                                  : 'rgba(246, 246, 246, 0.81)',
                                            }}
                                          >
                                            {filterList[option].name}
                                          </Button>
                                        ))}

                                        <Grid
                                          container
                                          justifyContent="center"
                                          alignItems="center"
                                          style={{ margin: '30px' }}
                                        >
                                          <Grid
                                            container
                                            justifyContent="center"
                                            alignItems="center"
                                            style={{ margin: '30px' }}
                                          >
                                            <Typography variant="h6" textAlign="center">
                                              Gift Class :
                                            </Typography>

                                            {giftClasses.map((option, i) => (
                                              <Button
                                                key={option}
                                                onClick={() => handleChangeGiftClass(option)}
                                                variant="contained"
                                                style={{
                                                  margin: '10px',
                                                  fontSize: '15px',
                                                  backgroundColor:
                                                    filterType.option.token === option
                                                      ? 'gold'
                                                      : '#1E2125',
                                                  color:
                                                    filterType.option.token === option
                                                      ? 'black'
                                                      : 'rgba(246, 246, 246, 0.81)',
                                                }}
                                              >
                                                {option}
                                              </Button>
                                            ))}
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    ) : null}

                                    {filterType !== null ? (
                                      <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ margin: '30px' }}
                                      >
                                        <IconButton
                                          aria-label="delete"
                                          size="large"
                                          style={{ fontSize: '32px', marginLeft: '40px' }}
                                          onClick={() => sortList('-')}
                                        >
                                          <ArrowDownwardIcon
                                            fontSize="inherit"
                                            style={{
                                              color: filterType.sort === '-' ? 'gold' : 'white',
                                            }}
                                          />
                                        </IconButton>

                                        <IconButton
                                          aria-label="delete"
                                          style={{ fontSize: '32px' }}
                                          onClick={() => sortList('')}
                                        >
                                          <ArrowUpwardIcon
                                            fontSize="inherit"
                                            style={{
                                              color: filterType.sort === '' ? 'gold' : 'white',
                                            }}
                                          />
                                        </IconButton>
                                      </Grid>
                                    ) : null}

                                    {openCoolNftCard === true && selectedGiftCardLink
                                      ? showCoolGiftCard(selectedGiftCardLink)
                                      : null}

                                    {filteredArray &&
                                    filteredArray.length > 0 &&
                                    gameIsPaused === false &&
                                    loading === false ? (
                                      <>
                                        {pageMode === 'card'
                                          ? AccordionGiftCard()
                                          : AccordionStationCard()}
                                      </>
                                    ) : null}
                                  </>
                                )}
                              </>
                            ) : null}
                          </Grid>
                        )}
                      </Card>
                    )}
                  </>
                </Grid>
              ) : (
                <h4>Please login first</h4>
              )}
            </div>
          )}
        </>
      }
      scroll="content"
    />
  );
}

export default InventoryPage;
