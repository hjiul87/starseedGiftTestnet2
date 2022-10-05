/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-const */
import {
  Grid,
  Button,
  CircularProgress,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logLoading } from 'app/store/gameData';
import { openDialog, closeDialog } from 'app/store/fuse/dialogSlice';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMoralisCloudFunction, useMoralisQuery } from 'react-moralis';
import Moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function UserControlRoom(props) {
  const dispatch = useDispatch();
  const gameIsPaused = useSelector((state) => state.gameData.gameIsPaused);
  const loading = useSelector((state) => state.gameData.loading);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [allCombinedData, setAllCombinedData] = React.useState(null);

  const [filterType, setFilterType] = React.useState(null);
  const [filteredArray, setFilteredArray] = React.useState(null);

  const [userList, setUserList] = React.useState(null);

  const filterList = {
    all: {
      type: 'all',
      name: 'All Users',
      label: `All`,
      sort: '', // sort descending with - or ascending with empty string
      option: {},
    },
    waiting: {
      type: 'waiting',
      name: 'Waiting Users',
      label: `Waiting`,
      sort: '', // sort descending with - or ascending with empty string
      option: {
        socialMediaVerified: false,
      },
    },
    blocked: {
      type: 'blocked',
      name: 'Blocked Users',
      label: `Blocked`,
      sort: '', // sort descending with - or ascending with empty string
      option: {
        profileBlocked: true,
      },
    },
    confirmed: {
      type: 'confirmed',
      name: 'Confirmed Profiles',
      label: `Profile is fully validated : `,
      sort: '', // sort descending with - or ascending with empty string,
      option: {
        profileVerified: true,
      },
    },
    pending: {
      type: 'pending',
      name: 'Pending Profiles',
      label: `Profile is fully validated :  `,
      sort: '', // sort descending with - or ascending with empty string,
      option: {
        profileVerified: false,
      },
    },
  };

  const dataIsLoaded = useRef(false);

  const [userToVerify, setUserToVerify] = React.useState(null);
  const [userToBlock, setUserToBlock] = React.useState([null, null]);
  const [confirmMessage, setConfirmMessage] = React.useState({
    message: '',
    txHash: '',
    type: 'success',
  });
  const [loadingMessage, setLoadingMessage] = React.useState({
    messageTitle: 'Loading data.',
    messageBody: 'Loading all users data, please wait.',
    type: 'success',
  });

  const {
    fetch: confirmUserVerificationFetch,
    data: confirmUserVerificationData,
    error: confirmUserVerificationError,
  } = useMoralisCloudFunction(
    'confirmSocialMediaLink',
    {
      user: userToVerify && userToVerify.length > 0 ? userToVerify[1] : 'none',
    },
    { autoFetch: false }
  );

  const {
    fetch: denyUserFetch,
    data: denyUserData,
    error: denyUserError,
  } = useMoralisCloudFunction(
    'denyUser',
    {
      userId: userToBlock[0],
    },
    { autoFetch: false }
  );

  const {
    fetch: undenyUserFetch,
    data: undenyUserData,
    error: undenyUserError,
  } = useMoralisCloudFunction(
    'undenyUser',
    {
      userId: userToBlock[0],
    },
    { autoFetch: false }
  );
  // }

  const {
    fetch: getUserListFetch,
    data: getUserListData,
    error: getUserListError,
  } = useMoralisCloudFunction('getUserList', {}, { autoFetch: false });

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
        console.log('closing dialog : ', confirmMessage, ' - ', loading);
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
    if (userToVerify && userToVerify[0] !== '') {
      confirmUser(userToVerify[0]);
    }
  }, [userToVerify]);

  async function confirmUser(id) {
    console.log(' test user to verify : ', userToVerify);
    let newMessage = {
      messageTitle: 'User validation',
      messageBody: `User is being confirmed, please wait..`,
    };
    setLoadingMessage(newMessage);
    dispatch(logLoading(false));
    dispatch(logLoading(true));

    confirmUserVerificationFetch({
      onSuccess: (data) => {
        console.log('Moralis verification results : ', data);

        const messageconfirm = {
          message: data.message,
          type: data.type,
        };
        setConfirmMessage(messageconfirm);
        dispatch(logLoading(false));
        setUserToVerify(null);
      },
    });
  }

  async function getUserList(params) {
    console.log('Getting user list');

    getUserListFetch({
      onSuccess: (data) => {
        console.log('user fetch result : ', data);
        if (data.type === 'success' && data.results.length > 0) {
          console.log('results have users ');
          let userObject = {};
          let tempobject = {};
          data.results.forEach((document) => {
            console.log('user is : ', document);
            tempobject = JSON.parse(JSON.stringify(document.attributes));
            tempobject.uid = document.id;
            let dateYMD = Moment(tempobject.createdAt).format('YYYY-MM-DD');
            const dateValue = Moment(dateYMD, 'YYYY-MM-DD').unix();
            tempobject.dateCreated = dateYMD;
            tempobject.dateValue = dateValue;
            userObject[document.id] = tempobject;
            console.log('tempobject : ', tempobject);
          });
          console.log('done fetching user : ', userObject);
          setUserList(userObject);
        }
      },
    });
  }

  useEffect(() => {
    if (dataIsLoaded.current === false) {
      dataIsLoaded.current = true;
      getUserList();
    }
  }, []);

  useEffect(() => {
    if (userList !== null) {
      setAllCombinedData(userList);
      setFilterType(filterList.all);
    }
  }, [userList]);

  useEffect(() => {
    if (allCombinedData !== null && filterType !== null) {
      console.log('filter has changed : ', filterType);
      setFilteredArray(null);
      applyFilter();
    }
  }, [allCombinedData, filterType]);

  function applyFilter() {
    let filterArrayTemp = [];

    Object.keys(allCombinedData).forEach((userId) => {
      let filterKey = 0;
      let tempData = { ...allCombinedData[userId] };
      if (filterType.type === 'all') {
        filterKey = parseInt(tempData.dateValue, 10);
        tempData.uid = userId;
        tempData.filterKey = filterKey;
      } else if (
        filterType.type === 'blocked' &&
        filterType.option.profileBlocked === tempData.profileBlocked
      ) {
        filterKey = parseInt(tempData.dateValue, 10);
        tempData.uid = userId;
        tempData.filterKey = filterKey;
      } else if (
        filterType.type === 'confirmed' &&
        filterType.option.profileVerified === tempData.profileVerified
      ) {
        filterKey = parseInt(tempData.dateValue, 10);
        tempData.uid = userId;
        tempData.filterKey = filterKey;
      } else if (
        filterType.type === 'pending' &&
        filterType.option.profileVerified === tempData.profileVerified
      ) {
        filterKey = parseInt(tempData.dateValue, 10);
        tempData.uid = userId;
        tempData.filterKey = filterKey;
      } else if (
        filterType.type === 'waiting' &&
        filterType.option.socialMediaVerified === tempData.socialMediaVerified &&
        tempData.socialLinks.length > 0
      ) {
        filterKey = parseInt(tempData.dateValue, 10);
        tempData.uid = userId;
        tempData.filterKey = filterKey;
      }

      if (tempData.filterKey > 0) {
        filterArrayTemp.push(tempData);
      }
    });

    console.log('filtered array : ', filterArrayTemp);

    if (filterType.sort === '-') {
      filterArrayTemp.sort(dynamicSort(`-filterKey`));
    } else {
      filterArrayTemp.sort(dynamicSort(`filterKey`));
    }

    setFilteredArray(filterArrayTemp);
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

  function handleChangeTokenType(tokenName) {
    let tempFilter = { ...filterType };
    tempFilter.option.token = tokenName;
    setFilterType(tempFilter);
  }

  function sortList(typeSort) {
    let temp = { ...filterType };
    temp.sort = typeSort;
    setFilterType(temp);
  }

  useEffect(() => {
    if (userToBlock && userToBlock[0] !== null) {
      changeUserBlockStatus(userToBlock[1]);
    }
  }, [userToBlock]);

  async function changeUserBlockStatus(newBlock) {
    console.log('changing user blocked to : ', newBlock, ' - ', userToBlock);
    let message = '';
    let functionCall = '';
    if (newBlock === true) {
      message = `User is being blocked, please wait..`;
      functionCall = 'denyUser';
    } else {
      message = `User block is being removed, please wait..`;
      functionCall = 'undenykUser';
    }
    let newMessage = {
      messageTitle: 'User validation',
      messageBody: message,
    };
    setLoadingMessage(newMessage);
    dispatch(logLoading(false));
    dispatch(logLoading(true));

    if (newBlock === true) {
      denyUserFetch({
        onSuccess: (data) => {
          console.log('user deny result : ', data);

          const messageconfirm = {
            message: data.message,
            type: data.type,
          };
          setConfirmMessage(messageconfirm);
          dispatch(logLoading(false));
          getUserList();
        },
      });
    } else {
      undenyUserFetch({
        onSuccess: (data) => {
          console.log('user deny result : ', data);

          const messageconfirm = {
            message: data.message,
            type: data.type,
          };
          setConfirmMessage(messageconfirm);
          dispatch(logLoading(false));
          getUserList();
        },
      });
    }
  }

  function visitLink(link) {
    console.log('going to link : ', link);
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  function AccordionCard() {
    return filteredArray.map((userData) => (
      <Accordion
        key={userData.uid}
        expanded={expanded === userData.uid}
        onChange={handleChange(userData.uid)}
        style={{ width: '90%', marginBottom: '10px' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${userData.uid}bh-content`}
          id={`${userData.uid}bh-header`}
        >
          <Grid container justifyContent="space-around" alignItems="center">
            <Typography variant="h6" color="secondary" style={{ fontWeight: '600' }}>
              {userData.user}
            </Typography>
            <Typography variant="subtitle2" color="secondary">
              {userData.uid}
            </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justifyContent="center" alignItems="center" style={{ margin: '30px' }}>
            <Grid item xs={3}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography
                  variant="h6"
                  textAlign="center"
                  className="textGrey"
                  style={{ fontWeight: '600' }}
                >
                  Created on : <span className="textGold">{userData.dateCreated}</span>
                </Typography>
                <Button
                  onClick={() => setUserToBlock([userData.user, !userData.profileBlocked])}
                  variant="contained"
                  style={{
                    margin: '15px',
                    fontSize: '18px',
                    backgroundColor: userData.profileBlocked ? 'red' : 'gold',
                    color: userData.profileBlocked ? 'black' : 'black',
                  }}
                >
                  {userData.profileBlocked ? 'Unblock user' : 'Block user'}
                </Button>
              </Grid>
            </Grid>

            {userData.socialMediaVerified === false && userData.socialLinks.length > 0 ? (
              <Grid item xs={3}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                  <Button
                    color="success"
                    className="mt-32 mb-32"
                    variant="contained"
                    onClick={() => visitLink(userData.socialLinks[0])}
                  >
                    <Typography variant="h6" component="h1">
                      Visit link
                    </Typography>
                  </Button>

                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => setUserToVerify([userData.uid, userData.user])}
                  >
                    <Typography variant="h6" component="h1">
                      Confirm User
                    </Typography>
                  </Button>

                  <Button
                    color="error"
                    className="mt-32 mb-32"
                    variant="contained"
                    onClick={() => setUserToBlock([userData.user, false])}
                  >
                    <Typography variant="h6" component="h1">
                      {userData.profileBlocked ? 'Unblock user' : 'Block user'}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </AccordionDetails>
      </Accordion>
    ));
  }

  return (
    <Card elevation={11} style={{ width: '100%', margin: '30px' }}>
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        style={{ width: '100%', height: '100%' }}
      >
        {gameIsPaused === false && loading === false ? (
          <>
            <Grid container justifyContent="center" alignItems="center" style={{ margin: '30px' }}>
              <Typography variant="h6" textAlign="center">
                Choose the filter to sort the user list
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
                      backgroundColor: filterType.type === option ? 'gold' : '#1E2125',
                      color: filterType.type === option ? 'black' : 'rgba(246, 246, 246, 0.81)',
                    }}
                  >
                    {filterList[option].name}
                  </Button>
                ))}
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
                    style={{ color: filterType.sort === '-' ? 'gold' : 'white' }}
                  />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  style={{ fontSize: '32px' }}
                  onClick={() => sortList('')}
                >
                  <ArrowUpwardIcon
                    fontSize="inherit"
                    style={{ color: filterType.sort === '' ? 'gold' : 'white' }}
                  />
                </IconButton>
              </Grid>
            ) : null}

            {filteredArray &&
            filteredArray.length > 0 &&
            gameIsPaused === false &&
            loading === false
              ? AccordionCard()
              : null}
          </>
        ) : null}
      </Grid>
    </Card>
  );
}

export default UserControlRoom;
