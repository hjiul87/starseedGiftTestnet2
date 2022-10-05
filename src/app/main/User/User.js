import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import FusePageMint from '@fuse/core/FusePageMint';
import NavbarToggleButton from 'app/theme-layouts/shared-components/NavbarToggleButton';
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
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import validator from 'validator';
import { logLoading, logRefreshProfile } from 'app/store/gameData';
import { showMessage } from 'app/store/fuse/messageSlice';
import { openDialog, closeDialog } from 'app/store/fuse/dialogSlice';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

const Root = styled(FusePageMint)({
  '& .FusePageMint-header': {},
  '& .FusePageMint-toolbar': {},
  '& .FusePageMint-content': {},
  '& .FusePageMint-sidebarHeader': {},
  '& .FusePageMint-sidebarContent': {},
});

function UserProfilePage(props) {
  const dispatch = useDispatch();
  const { setUserData, userError, isUserUpdating, user, moralis } = useMoralis();

  const { t } = useTranslation('userPage');
  const loading = useSelector((state) => state.gameData.loading);

  const [choice1, setChoice1] = React.useState(1);
  const [choice2, setChoice2] = React.useState(1);
  const [choice3, setChoice3] = React.useState(1);
  const [choice4, setChoice4] = React.useState(1);
  const [choice5, setChoice5] = React.useState(1);
  const [questions, setQuestions] = React.useState([1, 2, 3, 4, 5]);
  const [socialMediaLink, setSocialMediaLink] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userAnswers, setUserAnswers] = React.useState([]);
  const baseUrl =  useSelector((state) => state.gameData.baseUrl);

  const quizzData = {
    1: [
      'What is your quest ?',
      'To dominate the world.',
      'To drink the blood of my enemies.',
      'To catch them all!',
      'The last answer.',
    ],
    2: ['What is your favorite color ?', 'Green.', 'Blue.', 'Red!', 'The last answer.'],
    3: ['Where is the bird?', 'On the branch.', 'In the sky.', 'In your butt!', 'The last answer.'],
    4: [
      'What is the meaning of life ?',
      '42.',
      'To wake the F. up.',
      'To catch them all!',
      'The last answer.',
    ],
    5: [
      'Are we real ?',
      'Absolutly impossible to demonstrate...',
      'Ask the cat.',
      'The cake is a lie!',
      'The last answer.',
    ],
  };

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
    fetch: verifyEmail,
    data: data1,
    error: error1,
    isLoading: isLoadingverifyEmail,
  } = useMoralisCloudFunction('verifyEmail', {}, { autoFetch: false });

  const {
    fetch: confirmQuizzFetch,
    data: confirmQuizzdata,
    error: confirmQuizzerror,
    isLoading: confirmQuizzisLoading,
  } = useMoralisCloudFunction(
    'confirmQuizz',
    {
      answers: userAnswers,
    },
    { autoFetch: false }
  );

  const {
    fetch: socialLinkFetch,
    data: socialLinkdata,
    error: socialLinkerror,
    isLoading: socialLinkLoading,
  } = useMoralisCloudFunction(
    'setSocialMediaLink',
    {
      link: socialMediaLink,
    },
    { autoFetch: false }
  );

  useEffect(() => {
    if (userAnswers.length > 0) {
      console.log('confirming quiz with answers : ', userAnswers);
      confirmQuizzFetch({
        onSuccess: (dataQuiz) => {
          console.log('code check results stations : ', dataQuiz);

          const messageconfirm = {
            message: dataQuiz.message,
            type: dataQuiz.type,
          };
          setConfirmMessage(messageconfirm);
          dispatch(logLoading(false));
          setUserAnswers([]);
          dispatch(logRefreshProfile(true));
        },
      });
    }
  }, [userAnswers]);

  const [confirmMessage, setConfirmMessage] = React.useState({
    message: '',
    txHash: '',
    type: 'success',
  });
  const [loadingMessage, setLoadingMessage] = React.useState({
    messageTitle: 'Loading.',
    messageBody: 'Please wait.',
    type: 'success',
  });

  const profileBlocked = useSelector((state) => state.gameData.profileBlocked);
  const goHome = () => navigate('../welcome', { replace: true });
  useEffect(() => {
    if (profileBlocked === true) {
      goHome();
    }
  }, [profileBlocked]);

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

  async function resendEmailVerif() {
    dispatch(logLoading(true));
    if (user.attributes.emailVerified === true) {
      console.log('email already verified');
      dispatch(showMessage({ message: 'Email is already verified' }));
    } else {
      verifyEmail({
        onSuccess: (data) => {
          console.log('verify email results : ', data);

          const newMessage = {
            type: 'Email verification',
            message: `We sent you a new verification email at the address : ${user.attributes.email}, please check your inbox including SPAM folders.`,
          };
          setConfirmMessage(newMessage);
          dispatch(logLoading(false));
        },
      });
    }
  }

  function handleChangeQuizz(option, choice) {
    if (option.toString() === '1') {
      setChoice1(choice);
    } else if (option.toString() === '2') {
      setChoice2(choice);
    } else if (option.toString() === '3') {
      setChoice3(choice);
    } else if (option.toString() === '4') {
      setChoice4(choice);
    } else if (option.toString() === '5') {
      setChoice5(choice);
    }
  }

  function quizCard(option, i) {
    let value = 1;
    if (i === 0) {
      value = choice1;
    } else if (i === 1) {
      value = choice2;
    } else if (i === 2) {
      value = choice3;
    } else if (i === 3) {
      value = choice4;
    } else if (i === 4) {
      value = choice5;
    }

    return (
      <Grid key={option} container justifyContent="center" alignItems="center" className="mt-16">
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid container justifyContent="flex-start" alignItems="center" style={{ width: '50%' }}>
            <Typography variant="h6" className="textGold" fontWeight="Bold">
              {quizzData[option][0]}
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-start" alignItems="center" style={{ width: '25%' }}>
            <FormGroup>
              <FormControlLabel
                checked={value.toString() === '1'}
                onClick={() => handleChangeQuizz(option, 1)}
                control={<Checkbox />}
                label={quizzData[option][1]}
              />
              <FormControlLabel
                checked={value.toString() === '2'}
                onClick={() => handleChangeQuizz(option, 2)}
                control={<Checkbox />}
                label={quizzData[option][2]}
              />
              <FormControlLabel
                checked={value.toString() === '3'}
                onClick={() => handleChangeQuizz(option, 3)}
                control={<Checkbox />}
                label={quizzData[option][3]}
              />
              <FormControlLabel
                checked={value.toString() === '4'}
                onClick={() => handleChangeQuizz(option, 4)}
                control={<Checkbox />}
                label={quizzData[option][4]}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function finalProfileCard() {
    console.log('user profile : ', userProfile);

    const referRoot = `${baseUrl}/login?`;

    const puid = userProfile.uid;
    const refAddress = userProfile.user;

    const referLink = `${referRoot}refer=${puid}&refAddress=${refAddress}&shareA=`;
    const shareText = 'Check%20out%20the%20Starseed%20NFT%20Gift%20Program';
    const telegramURL = `https://telegram.me/share/url?url=${referLink}TG&text=${shareText}`;
    const linkedInURL = `https://www.linkedin.com/sharing/share-offsite/?url=${referLink}LI`;
    const twitterURL = `http://twitter.com/share?text=${shareText}&url=${referLink}TW`;
    const facebookURL = `http://www.facebook.com/sharer.php?u=${referLink}FB`;

    return (
      <Card elevation={11} style={{ margin: '50px', padding: '50px' }} className="coolCard ">
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h6" className="textGrey" textAlign="center">
            Your profile is now verified, you can claim your gift card and start sharing your
            referral link.
          </Typography>

          <Typography variant="h6" className="textGrey mt-32" textAlign="center">
            Total confirmed referrals :{' '}
            <span className="textGold">{userProfile.referralLinksComplete}</span>
          </Typography>

          <Typography variant="h6" className="textGrey mt-32" textAlign="center">
            You referral link is :
          </Typography>

          <Typography variant="subtitle2" className="textGold mb-32" textAlign="center">
            {`${referLink}manual`}
          </Typography>

          <Button
            onClick={() => window.open(telegramURL, '_blank')}
            startIcon={<TelegramIcon />}
            variant="contained"
            color="primary"
            style={{ margin: '15px' }}
          >
            <Typography variant="h6" textAlign="center">
              Share on telegram
            </Typography>
          </Button>

          <Button
            onClick={() => window.open(linkedInURL, '_blank')}
            startIcon={<LinkedInIcon />}
            variant="contained"
            color="primary"
            style={{ margin: '15px' }}
          >
            <Typography variant="h6" textAlign="center">
              Share on LinkedIn
            </Typography>
          </Button>

          <Button
            onClick={() => window.open(twitterURL, '_blank')}
            startIcon={<TwitterIcon />}
            variant="contained"
            color="primary"
            style={{ margin: '15px' }}
          >
            <Typography variant="h6" textAlign="center">
              Share on Twitter
            </Typography>
          </Button>

          <Button
            onClick={() => window.open(facebookURL, '_blank')}
            startIcon={<FacebookIcon />}
            variant="contained"
            color="primary"
            style={{ margin: '15px' }}
          >
            <Typography variant="h6" textAlign="center">
              Share on Facebook
            </Typography>
          </Button>
        </Grid>
      </Card>
    );
  }

  function handleChangesocialMediaLink(event) {
    setSocialMediaLink(event.target.value);
  }

  function changeEmailAddress(value) {
    setUserEmail(value);
  }

  async function confirmQuizz() {
    const newMessage = {
      messageTitle: 'Quiz validation',
      messageBody: `You answers are being verified, please wait..`,
    };
    setLoadingMessage(newMessage);
    dispatch(logLoading(false));
    dispatch(logLoading(true));
    console.log(
      'Confirming Quizz : ',
      choice1,
      ' - ',
      choice2,
      ' - ',
      choice3,
      ' - ',
      choice4,
      ' - ',
      choice5
    );
    const answers = [
      {
        question: 1,
        answer: choice1,
      },
      {
        question: 2,
        answer: choice2,
      },
      {
        question: 3,
        answer: choice3,
      },
      {
        question: 4,
        answer: choice4,
      },
      {
        question: 5,
        answer: choice5,
      },
    ];

    setUserAnswers(answers);
  }

  async function setSocialLink() {
    dispatch(logLoading(true));

    if (validator.isURL(socialMediaLink)) {
      console.log('Confirming link : ', socialMediaLink);
      socialLinkFetch({
        onSuccess: (dataLink) => {
          console.log('set social link result : ', dataLink);

          const messageconfirm = {
            message: dataLink.message,
            type: dataLink.type,
          };
          setConfirmMessage(messageconfirm);
          dispatch(logLoading(false));
          setSocialMediaLink('');
          dispatch(logRefreshProfile(true));
        },
      });
    } else {
      dispatch(logLoading(false));
      dispatch(
        showMessage({
          message: `Link is not a correct URL.`,
          autoHideDuration: 6000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          variant: 'error',
        })
      );
    }
  }

  function updateUserEmail(usedEmail) {
    console.log('updating user email and username with : ', usedEmail);
    try {
      setUserData({
        email: usedEmail,
        username: usedEmail,
      })
        .then((result) => {
          console.log('update user email success : ', result);
          dispatch(logRefreshProfile(true));
        })
        .catch((err) => {
          console.log('update user email error : ', err);
        });
    } catch (error) {
      console.log('update user email error : ', error);
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
          {userProfile ? (
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Card elevation={11} style={{ padding: '25px' }} className="coolCard ">
                <Grid container justifyContent="center" alignItems="center">
                  <Typography
                    variant="h4"
                    textAlign="center"
                    style={{
                      margin: '25px',
                      color: !user.attributes.emailVerified ? 'red' : 'green',
                    }}
                  >
                    {!user.attributes.emailVerified ? 'Email is not verified' : 'Email verified'}
                  </Typography>

                  <Typography
                    variant="h4"
                    textAlign="center"
                    style={{
                      margin: '25px',
                      color: userProfile.quizVerified === false ? 'red' : 'green',
                    }}
                  >
                    {userProfile.quizVerified === false
                      ? 'Quizz is not Verified'
                      : 'Quizz verified'}
                  </Typography>

                  <Typography
                    variant="h4"
                    textAlign="center"
                    style={{
                      margin: '25px',
                      color: userProfile.socialMediaVerified === false ? 'red' : 'green',
                    }}
                  >
                    {userProfile.socialMediaVerified === false
                      ? 'Social Media is not Verified'
                      : 'Social Media verified'}
                  </Typography>
                </Grid>
              </Card>

              <Grid container direction="column" justifyContent="center" alignItems="center">
                {user && !user.attributes.emailVerified ? (
                  <Card
                    elevation={11}
                    style={{ margin: '50px', padding: '50px', width: '90%' }}
                    className="coolCard "
                  >
                    {user.attributes.email ? (
                      <Grid
                        container
                        justifyContent="center"
                        direction="column"
                        alignItems="center"
                      >
                        <Typography variant="h6" textAlign="center" style={{ margin: '25px' }}>
                          Use the button below to send a verification email to{' '}
                          <span className="textGold">{user.attributes.email}</span>. Dont forget to
                          check for SPAM folders.
                        </Typography>

                        <Typography variant="h6" textAlign="center" style={{ margin: '25px' }}>
                          Once verified, you will have to logout and login again to refresh the
                          website data.
                        </Typography>

                        <Button
                          color="success"
                          variant="contained"
                          onClick={() => resendEmailVerif()}
                        >
                          <Typography variant="h6" component="h1">
                            Send the verification email
                          </Typography>
                        </Button>

                        <Typography variant="h6" color="secondary" className="mt-32 mb-16">
                          Change email address to :
                        </Typography>

                        <TextField
                          className="mb-24"
                          label="email address"
                          autoFocus
                          onChange={(e) => {
                            changeEmailAddress(e.target.value);
                          }}
                          variant="outlined"
                          // fullWidth
                          style={{
                            width: '50%',
                            opacity: 0.9,
                          }}
                          disabled={isLoadingverifyEmail}
                          value={userEmail}
                        />

                        {validator.isEmail(userEmail) ? (
                          <Button
                            color="success"
                            variant="contained"
                            onClick={() => updateUserEmail(userEmail)}
                          >
                            <Typography variant="h6" component="h1">
                              Change email address
                            </Typography>
                          </Button>
                        ) : (
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: '50px' }}
                          >
                            <Typography variant="h6" component="h1">
                              New Email address Invalid
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    ) : (
                      <Grid
                        container
                        justifyContent="center"
                        direction="column"
                        alignItems="center"
                      >
                        <Typography variant="h6" color="secondary" className="mt-32 mb-16">
                          Email address :
                        </Typography>

                        <TextField
                          className="mb-24"
                          label="email address"
                          autoFocus
                          onChange={(e) => {
                            changeEmailAddress(e.target.value);
                          }}
                          variant="outlined"
                          // fullWidth
                          style={{
                            width: '50%',
                            opacity: 0.9,
                          }}
                          disabled={isLoadingverifyEmail}
                          value={userEmail}
                        />

                        {validator.isEmail(userEmail) ? (
                          <Grid container justifyContent="center" alignItems="center">
                            <Button
                              color="success"
                              variant="contained"
                              onClick={() => updateUserEmail(userEmail)}
                            >
                              <Typography variant="h6" component="h1">
                                Confirm email address
                              </Typography>
                            </Button>
                          </Grid>
                        ) : (
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: '50px' }}
                          >
                            <Typography variant="h6" component="h1">
                              Email address Invalid
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    )}
                  </Card>
                ) : null}

                {user &&
                user.attributes.emailVerified === true &&
                userProfile.quizVerified === false ? (
                  <Card
                    elevation={11}
                    style={{ margin: '50px', padding: '50px' }}
                    className="coolCard "
                  >
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <Typography variant="h6" className="textGrey" textAlign="center">
                        Congratulations, your email has been verified, Now you need to fill up this
                        quizz to show us that you have read our documentation.
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="textGold mt-32 mb-32"
                        textAlign="center"
                      >
                        <a href="https://docs.starseeds.exchange/" target="_blank" rel="noreferrer">
                          Show me the documentation
                        </a>
                      </Typography>

                      {questions.map((option, i) => quizCard(option, i))}

                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className="mt-32 mb-32"
                      >
                        <Button color="success" variant="contained" onClick={() => confirmQuizz()}>
                          <Typography variant="h6" component="h1">
                            Confirm my answers
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                ) : null}

                {user &&
                user.attributes.emailVerified === true &&
                userProfile.quizVerified === true &&
                userProfile.socialLinks.length === 0 ? (
                  <Card
                    elevation={11}
                    style={{ margin: '50px', padding: '50px' }}
                    className="coolCard "
                  >
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <Typography variant="h6" className="textGrey" textAlign="center">
                        Very well done, you are one step to the end.
                      </Typography>
                      <Typography variant="h6" className="textGrey mt-32 mb-32" textAlign="center">
                        All you have to do is to go to one of the following social media : Facebook,
                        Twitter, Instagram, Reddit. And create and post sharing your enthousiasm for
                        our project. The only requirement is to clearly mention " Starseed DAO " and
                        WITHOUT any link to any site (ours included.)
                      </Typography>
                      <Typography variant="h6" className="textGrey mt-32 mb-32" textAlign="center">
                        Once your post is done, please share the link below and wait for one of our
                        admins to validate your profile. Once this is done, you will be able to
                        claim your gift cards.
                      </Typography>

                      <Grid container justifyContent="center" alignItems="center">
                        <Typography variant="h6" textAlign="center">
                          Social Media Link :
                        </Typography>
                        <TextField
                          id="socialMediaLink"
                          // label="Commander name"
                          type="text"
                          value={socialMediaLink}
                          className="ml-32"
                          style={{ width: '100%' }}
                          onChange={handleChangesocialMediaLink}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>

                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className="mt-32 mb-32"
                      >
                        <Button color="success" variant="contained" onClick={() => setSocialLink()}>
                          <Typography variant="h6" component="h1">
                            Confirm my link
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                ) : null}

                {user &&
                user.attributes.emailVerified === true &&
                userProfile.quizVerified === true &&
                userProfile.socialLinks.length > 0 &&
                userProfile.socialMediaVerified === false ? (
                  <Card
                    elevation={11}
                    style={{ margin: '50px', padding: '50px' }}
                    className="coolCard "
                  >
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <Typography variant="h6" className="textGrey" textAlign="center">
                        Your social media post will be verified by our admins. Until then, thank you
                        for your patience.
                      </Typography>
                    </Grid>
                  </Card>
                ) : null}

                {user &&
                user.attributes.emailVerified === true &&
                userProfile.quizVerified === true &&
                userProfile.socialLinks.length > 0 &&
                userProfile.socialMediaVerified === true
                  ? finalProfileCard()
                  : null}
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

export default UserProfilePage;
