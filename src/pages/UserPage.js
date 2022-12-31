/* eslint-disable */
import { sentenceCase } from 'change-case';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import React, { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  TableHead,
  Box,
  Modal,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import moment from 'moment';
// components

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
// sections
import { UserListHead } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phoneNumber', label: 'Phone', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'isActive', label: 'Status', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [allUserList, setAllUserList] = useState();
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setsearchString] = useState('');
  const [Modalopen, setModalopen] = useState(false);
  const [UpdateId, setUpdateId] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setlastname] = useState();

  const ModalhandleClose = () => {
    if (Modalopen) {
      setModalopen(false);
    } else {
      setModalopen(true);
    }
  };
  // const { isLoading, user } = useSelector((state) => state.allUser);
  const dispatch = useDispatch();

  const setEditId = (idData) => {
    setUpdateId(idData);
  };

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}user/v2/users`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      setAllUserList(data.result);
      setFilterData(data.result);
      setIsLoading(false);
      console.log('🤩 ~ file: UserPage.js:113 ~ fetchUser ~ data', data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  if (!isLoading) {
    console.log(allUserList);
  }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleUpdate = () => {};
  const handleDelete = () => {};

  const doSearchName = (searchQuery) => {
    console.log('🚀 ~ file: Project.jsx:302 ~ doSearchName ~ e', searchQuery.length);
    if (searchQuery.length === 0) {
      setFilterData(allUserList);
    }
    if (searchQuery.length > 0) {
      const AllFilterArray =
        allUserList &&
        allUserList.filter((item) => {
          return (
            item.firstName?.toLowerCase()?.includes(searchQuery) ||
            item.lastName?.toLowerCase()?.includes(searchQuery) ||
            item.country?.toLowerCase()?.includes(searchQuery) ||
            item.state?.toLowerCase()?.includes(searchQuery) ||
            item.company?.toLowerCase()?.includes(searchQuery) ||
            item.email?.toLowerCase()?.includes(searchQuery)
          );
        });

      setFilterData(AllFilterArray);
    }
  };

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      {isLoading ? (
        <> Loading</>
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                User
              </Typography>
              <Link to={'/dashboard/adduser'}>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                  New User
                </Button>
              </Link>
            </Stack>

            <Card>
              <FormControl
                sx={{
                  m: 1,
                  width: '50ch',
                  margin: '29px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={searchString}
                  placeholder="Search User"
                  type="text"
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  }
                  onChange={(e) => {
                    doSearchName(e.target.value);
                    setsearchString(e.target.value);
                  }}
                />
                {searchString.length > 0 ? (
                  <div style={{ marginLeft: '40px' }}>
                    <Label color={'error'} style={{ padding: '20px', fontSize: '14px' }}>
                      <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }} />
                      {sentenceCase('Clear')}
                    </Label>
                  </div>
                ) : (
                  ''
                )}
              </FormControl>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {TABLE_HEAD.map((headCell) => (
                          <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
                            <Box>{headCell.label}</Box>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    {filterData.map((tableData) => {
                      const {
                        _id,
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        country,
                        state,
                        role,
                        company,
                        isActive,
                        createdAt,
                        profileImg,
                      } = tableData;
                      return (
                        <TableBody>
                          <TableRow hover>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar
                                  alt={firstName}
                                  style={{ marginLeft: '20px', width: '25px', height: '25px' }}
                                  src={
                                    profileImg && profileImg.url
                                      ? profileImg.url
                                      : '/assets/images/avatars/avatar_18.jpg'
                                  }
                                />
                                <Typography variant="subtitle2" noWrap>
                                  {`${firstName} ${lastName}`}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{phoneNumber}</TableCell>
                            <TableCell align="left">{country}</TableCell>
                            <TableCell align="left">{state}</TableCell>

                            <TableCell align="left">{role}</TableCell>
                            <TableCell align="left">{company}</TableCell>
                            <TableCell align="left">
                              <Label color={isActive ? 'success' : 'error'}>
                                {sentenceCase(isActive ? 'active' : 'inactive')}
                              </Label>
                            </TableCell>
                            <TableCell align="left">{moment(createdAt).format('LL')}</TableCell>

                            <TableCell align="right">
                              <div>
                                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                  <Iconify icon={'eva:more-vertical-fill'} onClick={() => setEditId(tableData)} />
                                </IconButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })}
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Container>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setModalopen(true);
                handleCloseMenu();
              }}
            >
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>

          <Modal
            open={Modalopen}
            onClose={ModalhandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Model
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
                <InputLabel htmlFor="ImageUpload">
                  <div style={{ position: 'relative' }}>
                    <img
                      src={UpdateId?.profileImg?.url}
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
                <input type="file" name="image" accept="image/*" style={{ display: 'none' }} id="ImageUpload" />
              </div>
              <TextField
                id="outlined-firstname"
                label="First Name"
                variant="outlined"
                value={UpdateId?.firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <TextField
                id="outlined-lastname"
                label="Last Name"
                variant="outlined"
                value={UpdateId?.lastName}
                onChange={(e) => setlastname(e.target.value)}
              />
              <TextField
                id="outlined-lastname"
                label="Email"
                variant="outlined"
                value={UpdateId?.email}
                onChange={(e) => setlastname(e.target.value)}
              />
              <TextField
                id="outlined-lastname"
                label="Phone"
                variant="outlined"
                value={UpdateId?.phoneNumber}
                onChange={(e) => setlastname(e.target.value)}
              />
              <TextField
                id="outlined-lastname"
                label="Country"
                variant="outlined"
                value={UpdateId?.country}
                onChange={(e) => setlastname(e.target.value)}
              />
              <TextField
                id="outlined-lastname"
                label="State"
                variant="outlined"
                value={UpdateId?.state}
                onChange={(e) => setlastname(e.target.value)}
              />
              <TextField
                id="outlined-lastname"
                label="Role"
                variant="outlined"
                value={UpdateId?.role}
                onChange={(e) => setlastname(e.target.value)}
              />
              <TextField
                id="outlined-lastname"
                label="Company"
                variant="outlined"
                value={UpdateId?.company}
                onChange={(e) => setlastname(e.target.value)}
              />
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
