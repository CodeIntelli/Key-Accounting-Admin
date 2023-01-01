import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Modal,
  Typography,
  Button,
  InputLabel,
  Stack,
  FormGroup,
  FormControlLabel,
  styled,
  Switch,
} from '@mui/material';
import { Country, State } from 'country-state-city';
import Lottie from 'react-lottie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Iconify from '../../../components/iconify';

/* 
   <div style={{ margin: '10px 20px' }}>
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
          </div>
*/

const EditUserDrawer = ({ data, changeFunc, closeDrawer }) => {
  const [change, setChange] = React.useState();
  // Password
  const [showPassword, setShowPassword] = useState(false);

  //   Form State
  const [firstname, setFirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [phone, setphone] = useState('');
  const [company, setcompany] = useState('');
  const [active, setActive] = useState(false);

  /*  const handleDropdown = (data) => {
    if (data.type === 'country') {
      setcountry(data.value);
      setcountryCode(data.code);
    } else if (data.type === 'state') {
      setstate(data.value);
    }
  }; */
  const [avatarPreview, setAvatarPreview] = useState('/assets/images/avatars/avatar_18.jpg');
  const [image, setImage] = useState();
  /* Image Uploading */
  const handleImage = async (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    if (data) {
      console.log(data);
      setFirstname(data.firstName);
      setlastname(data.lastName);
      setphone(data.phoneNumber);
      setcompany(data.company);
      setAvatarPreview(data?.profileImg ? data?.profileImg.url : '/assets/images/avatars/avatar_18.jpg');
      setActive(data.isActive);
    }
  }, []);

  const handleSubmit = async () => {
    console.log('image edituserdrawer', image?.name);
    // if we upload image then request as a form data otherwise normal json data
    if (image && image?.name) {
      const storedData = new FormData();
      storedData.append('profile', image);
      storedData.append('firstName', firstname);
      storedData.append('lastName', lastname);
      storedData.append('phoneNumber', phone);
      storedData.append('company', company);
      storedData.append('isActive', active);
      storedData.append('type', 'formdata');
      changeFunc(storedData);
    } else {
      const data = {
        type: 'obj',
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phone,
        isActive: active,
        company,
      };
      changeFunc(data);
    }
    // const storedData = {
    //   firstName: firstname,
    //   lastName: lastname,
    //   email,
    //   phoneNumber: Number(phone),
    //   password,
    //   country,
    //   state,
    //   company,
    // };
    // dispatch(AddUser(storedData));
    // setSuccessMsg(`User Created Successfully`);
    // setOpen(true);
  };
  const handleSwitchChange = (e) => {
    setActive(e.target.checked);
  };

  const IOSSwitch = styled((props) => (
    <Switch
      checked={active}
      onChange={(e) => handleSwitchChange(e)}
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
    <div>
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '10px',
          }}
        >
          <InputLabel htmlFor="ImageUpload">
            <div style={{ position: 'relative' }}>
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="img-fluid"
                style={{
                  width: '100px',
                  borderRadius: '50%',
                  height: '100px',
                  border: '1px solid #dbdbdb',
                  objectFit: 'contain',
                }}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = '/assets/images/avatars/avatar_18.jpg';
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '5px',
                  right: '5px',
                }}
              >
                <div
                  style={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'white',
                    alignItems: 'center',
                    background: '#6ab04c ',
                  }}
                >
                  <Iconify icon="eva:plus-fill" />
                </div>
              </span>
            </div>
          </InputLabel>
          <input
            type="file"
            name="image"
            accept="image/*"
            style={{ display: 'none' }}
            id="ImageUpload"
            onChange={(e) => handleImage(e)}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InputLabel>
              <h4>Email: dushyant@yopmail.com</h4>
            </InputLabel>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <TextField
            style={{ margin: '10px 20px' }}
            id="outlined-firstname"
            label="First Name"
            variant="outlined"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            style={{ margin: '10px 20px' }}
            id="outlined-lastname"
            label="Last Name"
            variant="outlined"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
          />

          <TextField
            style={{ margin: '10px 20px' }}
            id="outlined-pno"
            label="Phone Number"
            type="number"
            variant="outlined"
            value={phone}
            inputProps={{ minLength: 10, maxLength: 12 }}
            onChange={(e) => setphone(e.target.value)}
          />
          <TextField
            style={{ margin: '10px 20px' }}
            id="outlined-company"
            label="Company"
            variant="outlined"
            value={company}
            onChange={(e) => setcompany(e.target.value)}
          />
          <Stack direction="row" spacing={1} style={{ margin: '0px 30px' }} alignItems="center">
            <Typography style={{ color: 'red' }}>Inactive</Typography>
            <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} />
            <Typography style={{ color: 'green' }}>Active</Typography>
          </Stack>
        </div>
      </Card>
      <div
        style={{
          marginTop: '30px',
          margin: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          style={{ background: '#FFC501', padding: '10px 20px', opacity: 1 }}
          onClick={() => handleSubmit()}
        >
          Edit User
        </LoadingButton>
        <LoadingButton
          type="submit"
          variant="contained"
          style={{ background: '#D65249', padding: '10px 20px', opacity: 1 }}
          onClick={() => closeDrawer()}
        >
          Close
        </LoadingButton>
      </div>
    </div>
  );
};

export default EditUserDrawer;
