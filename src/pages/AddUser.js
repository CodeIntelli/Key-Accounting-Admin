import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, IconButton, InputAdornment, TextField, Modal, Typography, Button } from '@mui/material';
import { Country, State } from 'country-state-city';
import Lottie from 'react-lottie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Iconify from '../components/iconify';
// import { AddUser } from '../redux/Actions/userAction';
import errAnimationData from '../lotties/error.json';
import successAnimationData from '../lotties/success.json';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '30px',
  p: 4,
};

const CreateUser = () => {
  const [countryData, setCountryData] = useState();
  const [StateData, setStateData] = useState();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user, error } = useSelector((state) => state.user);

  // Password
  const [showPassword, setShowPassword] = useState(false);

  //   Form State
  const [firstname, setFirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [country, setcountry] = useState('');
  const [countryCode, setcountryCode] = useState();
  const [phone, setphone] = useState('');
  const [company, setcompany] = useState('');
  const [state, setstate] = useState('');

  const handleDropdown = (data) => {
    if (data.type === 'country') {
      setcountry(data.value);
      setcountryCode(data.code);
    } else if (data.type === 'state') {
      setstate(data.value);
    }
  };

  const handleSubmit = async () => {
    /* const storedData = new FormData();
    storedData.append('firstName', firstname);
    storedData.append('lastName', lastname);
    storedData.append('email', email);
    storedData.append('phoneNumber', phone);
    storedData.append('password', password);
    storedData.append('country', country);
    storedData.append('state', state);
    storedData.append('company', company); */
    const storedData = {
      firstName: firstname,
      lastName: lastname,
      email,
      phoneNumber: Number(phone),
      password,
      country,
      state,
      company,
    };
    // await dispatch(AddUser(storedData));
    setSuccessMsg(`User Created Successfully`);
    setOpen(true);
  };

  /* Modal States */
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [errMsg, setErrMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');

  useEffect(() => {
    const listCountry = [];
    Country.getAllCountries().map((cdata) => {
      const data = {
        type: 'country',
        label: cdata.name,
        value: cdata.name,
        code: cdata.isoCode,
        phoneCode: cdata.phonecode,
      };
      listCountry.push(data);
      return setCountryData(listCountry);
    });
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error);
      setErrMsg(error && error);
    }
    if (user && user) {
      console.log('Created User', user);
    }
  }, [error, dispatch]);

  useEffect(() => {
    const listState = [];
    State.getStatesOfCountry(countryCode && countryCode).map((sdata) => {
      const data = {
        type: 'state',
        label: sdata.name,
        value: sdata.name,
        code: sdata.isoCode,
        phoneCode: sdata.phonecode,
      };
      listState.push(data);
      return setStateData(listState);
    });
  }, [country]);
  /* 
  Lottie Configuration
  */
  const successDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const errDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: errAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      {/*  
    <Button onClick={handleOpen}>Open modal</Button>
      */}

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ py: 2, px: 3 }}>
            <h1>Add User</h1>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
                >
                  <TextField
                    id="outlined-firstname"
                    label="First Name"
                    variant="outlined"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <TextField
                    id="outlined-lastname"
                    label="Last Name"
                    variant="outlined"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                  />
                  <TextField
                    id="outlined-email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <Select
                    menuPortalTarget={document.body}
                    placeholder="Select Country"
                    styles={{ padding: '50px' }}
                    options={countryData && countryData}
                    onChange={(e) => {
                      handleDropdown(e);
                    }}
                  />
                  {country && country ? (
                    <Select
                      menuPortalTarget={document.body}
                      placeholder="Select State"
                      styles={{ padding: '50px' }}
                      options={StateData && StateData}
                      onChange={(e) => {
                        handleDropdown(e);
                      }}
                    />
                  ) : (
                    ''
                  )}
                  <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    id="outlined-pno"
                    label="Phone Number"
                    type="number"
                    variant="outlined"
                    value={phone}
                    inputProps={{ minLength: 10, maxLength: 12 }}
                    onChange={(e) => setphone(e.target.value)}
                  />
                  <TextField
                    id="outlined-company"
                    label="Company"
                    variant="outlined"
                    value={company}
                    onChange={(e) => setcompany(e.target.value)}
                  />
                </Box>
              </Card>
              <div
                style={{
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  opacity:
                    email.length > 0 &&
                    password.length > 0 &&
                    company.length > 0 &&
                    phone.length >= 10 &&
                    firstname.length > 0 &&
                    lastname.length > 0 &&
                    country.length > 0 &&
                    state.length > 0
                      ? 1
                      : 0.5,
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  style={{
                    background: '#6ab04c',
                    padding: '10px 20px',
                    opacity: 1,
                    cursor:
                      email.trim().length > 0 &&
                      password.trim().length > 0 &&
                      company.trim().length > 0 &&
                      phone.trim().length >= 10 &&
                      firstname.trim().length > 0 &&
                      lastname.trim().length > 0 &&
                      country.trim().length > 0 &&
                      state.trim().length > 0
                        ? 'pointer'
                        : 'not-allowed',
                  }}
                  onClick={() => handleSubmit()}
                >
                  Create User
                </LoadingButton>
              </div>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {error && error ? (
            <div>
              <Lottie options={errDefaultOptions} height={200} width={200} />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {errMsg}
                </Typography>
              </div>
            </div>
          ) : (
            <div>
              <Lottie options={successDefaultOptions} height={200} width={200} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {successMsg.includes('#') ? (
                    <div>
                      {successMsg.split('#')[0]} <span style={{ opacity: 0.6 }}>#{successMsg.split('#')[1]}</span>
                    </div>
                  ) : (
                    successMsg
                  )}
                </Typography>
                <Link to={'/dashboard/user'}>
                  <Button
                    variant="contained"
                    style={{
                      background: '#6ab04c',
                      marginTop: '30px',
                    }}
                  >
                    Check user
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CreateUser;
