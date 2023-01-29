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
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import swal from 'sweetalert';
// components

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import { LoadingButton } from '@mui/lab';
import { errorToast, successToast } from 'src/utils/Toast';
import FileUpload from 'react-material-file-upload';
import LoadingAnimation from 'src/components/LoadingAnimation';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Sr No', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'email', alignRight: false },
  { id: 'phone_number', label: 'Phone', alignRight: false },
  { id: 'website', label: 'Website', alignRight: false },
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
  boxShadow: 24,
  borderRadius: '12px',
  p: 2,
};

export default function CommentPage() {
  const [open, setOpen] = useState(null);

  const [EbookList, setEbookList] = useState();
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setsearchString] = useState('');
  const [Modalopen, setModalopen] = useState(false);
  const [UpdateModalopen, setUpdateModalopen] = useState(false);
  const [UpdateData, setUpdateData] = useState();

  const [catTitle, setcatTitle] = useState('');
  const [editcatTitle, seteditcatTitle] = useState('');

  const [attachment, setAttachment] = useState();
  const [ebookTitle, setebookTitle] = useState('');
  const [ebookDesc, setebookDesc] = useState('');
  const [ebookTags, setebookTags] = useState('');
  const [editebookTitle, seteditebookTitle] = useState('');
  const [editebookDesc, seteditebookDesc] = useState('');
  const [editebookTags, seteditebookTags] = useState('');

  const fetchEbook = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}comment/list`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:112 ~ fetchEbook ~ data', data);
      setEbookList(data.result);
      setFilterData(data.result);
      setIsLoading(false);
      console.log('🤩 ~ file: UserPage.js:113 ~ fetchEbook ~ data', data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async (id) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.delete(`${BASE_URL}content/upload/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const doTogglerCall = async (id) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.patch(`${BASE_URL}content/upload/${id}`, bearerToken, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const ModalhandleClose = () => {
    if (Modalopen) {
      setModalopen(false);
    } else {
      setModalopen(true);
    }
  };
  const UpdateModalhandleClose = () => {
    if (UpdateModalopen) {
      setUpdateModalopen(false);
    } else {
      setUpdateModalopen(true);
      // seteditcatTitle()
    }
  };

  const setEditId = (idData) => {
    console.log('🤩 ~ file: CategoriesPage.js:185 ~ setEditId ~ idData', idData);
    setUpdateData(idData);
  };

  React.useEffect(() => {
    fetchEbook();
    // setFiles([]);
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = (id) => {
    console.log(id);
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'error',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      console.log('🤩 ~ file: UserPage.js:261 ~ handleDelete ~ willDelete', willDelete);
      if (willDelete) {
        const result = await removeUser(id);
        if (result.success === true) {
          setUpdateData('');
          successToast('Content Deleted Successfully');
          fetchEbook();
        } else {
          swal('Something Went Wrong Please try after some time', {
            icon: 'error',
          });
        }
      }
    });
  };

  const doSearchName = (searchQuery) => {
    console.log('🚀 ~ file: Project.jsx:302 ~ doSearchName ~ e', searchQuery.length);
    if (searchQuery != '') {
      const AllFilterArray =
        EbookList &&
        EbookList.filter((item) => {
          return item.catTitle?.toLowerCase()?.includes(searchQuery);
        });
      setFilterData(AllFilterArray);
    } else {
      setFilterData(EbookList);
    }
  };

  const handleSubmit = async () => {
    const addContentResult = await addContent({ ebookDesc, ebookTags, ebookTitle, attachment });
    console.log('🤩 ~ file: CategoriesPage.js:289 ~ handleSubmit ~ addContentResult', addContentResult);
    if (addContentResult.success) {
      successToast('Content Added Successfully');
      setUpdateData('');
      fetchEbook();
    } else {
      errorToast(addContentResult.message);
    }
  };

  const handleUpdate = async () => {
    const editCatResult = await updateContent(UpdateData._id, {
      title: editebookTitle,
      desc: editebookDesc,
      tags: editebookTags.includes(',') ? editebookTags.split(',') : editebookTags.fromArray(),
    });
    console.log('🤩 ~ file: CategoriesPage.js:289 ~ handleSubmit ~ editCatResult', editCatResult);
    if (editCatResult.success) {
      successToast('Content Edited Successfully');
      setUpdateData('');
      fetchEbook();
    } else {
      errorToast(editCatResult.message);
    }
  };
  const [files, setFiles] = useState([]);
  const [editfiles, seteditFiles] = useState();
  const [fileErrMessage, setFileErrMessage] = useState();
  const [fileSuccess, setfileSuccess] = useState(false);
  const checkfiles = (fileData) => {
    console.log('=============================', fileData[0]?.name, fileData[0]?.type);
    if (fileData[0]?.name.split('.').pop() == 'pdf') {
      setFiles(fileData);
      setAttachment(fileData[0]);
      setfileSuccess(true);
    } else {
      setFileErrMessage('File Not Supported');
      setFileSuccess(false);
    }
  };

  function formatFileSize(bytes, decimalPoint) {
    if (bytes == 0) return '0 Bytes';
    var k = 1000,
      dm = decimalPoint || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const [commentMessage, setCommentMessage] = useState('');
  const [comName, setcomName] = useState('');
  const [comPhoneNo, setcomPhoneNo] = useState('');
  const [comEmail, setcomEmail] = useState('');
  const [comWebsite, setcomWebsite] = useState('');
  const [comReplyMessage, setcomReplyMessage] = useState('');
  const [comBlogTitle, setcomBlogTitle] = useState('');
  const [comstatus, setcomstatus] = useState('');
  /* Show Three Button Change Status like Active Comment, Reject Comment, Delete Comment, Replay Message TextBox */

  return (
    <>
      <Helmet>
        <title> casestudies | Key CMS Accounting </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Comments
              </Typography>
            </Stack>

            <Card>
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                variant="outlined"
              >
                {searchString.length > 0 ? (
                  <div style={{ marginLeft: '40px' }}>
                    <Label
                      color={'error'}
                      style={{ padding: '20px', fontSize: '14px' }}
                      onClick={() => {
                        doSearchName('');
                        setsearchString('');
                      }}
                    >
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
                          <TableCell
                            key={Math.floor(Math.random() * 10000)}
                            align={headCell.alignRight ? 'right' : 'left'}
                          >
                            <Box>{headCell.label}</Box>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    {filterData.map((tableData, index) => {
                      const { _id, name, phone_number, website, email, status, createdAt } = tableData;
                      return (
                        <TableBody key={_id}>
                          <TableRow hover>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {name}
                            </TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {phone_number}
                            </TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {website}
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                color={
                                  status == 'pending'
                                    ? 'warning'
                                    : status == 'Accept'
                                    ? 'success'
                                    : status == 'Accept'
                                    ? 'error'
                                    : 'error'
                                }
                                style={{ cursor: 'pointer' }}
                              >
                                {sentenceCase(
                                  status == 'pending'
                                    ? status
                                    : status == 'Accept'
                                    ? status
                                    : status == 'Accept'
                                    ? status
                                    : status
                                )}
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
              sx={{ color: 'success.main' }}
              onClick={() => {
                handleCloseMenu();
                setUpdateModalopen(true);
                seteditcatTitle(UpdateData.catTitle);
              }}
            >
              <Iconify icon={'healthicons:i-documents-accepted'} sx={{ mr: 2 }} />
              Accept
            </MenuItem>
            <MenuItem
              sx={{ color: 'info.main' }}
              onClick={() => {
                handleCloseMenu();
                setUpdateModalopen(true);
                seteditcatTitle(UpdateData.catTitle);
              }}
            >
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              View
            </MenuItem>

            <MenuItem
              sx={{ color: 'error.main' }}
              onClick={() => {
                handleDelete(UpdateData._id);
                handleCloseMenu();
              }}
            >
              <Iconify icon={'charm:cross'} sx={{ mr: 2 }} />
              Reject
            </MenuItem>
            <MenuItem
              sx={{ color: 'warning.main' }}
              onClick={() => {
                handleDelete(UpdateData._id);
                handleCloseMenu();
              }}
            >
              <Iconify icon={'mdi:message-reply-text'} sx={{ mr: 2 }} />
              Reply
            </MenuItem>
            <MenuItem
              sx={{ color: 'error.main' }}
              onClick={() => {
                handleDelete(UpdateData._id);
                handleCloseMenu();
              }}
            >
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
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h3>Upload casestudies</h3>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="casestudies Title"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={ebookTitle}
                      onChange={(e) => setebookTitle(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="casestudies Description"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={ebookDesc}
                      onChange={(e) => setebookDesc(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="casestudies Tags"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={ebookTags}
                      onChange={(e) => setebookTags(e.target.value)}
                    />
                  </div>
                  {files && files.length > 0 ? (
                    <div
                      style={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '50px',
                        background: '#EE1A25',
                        color: '#ffffff',
                      }}
                    >
                      <div style={{ width: '90%', display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                        <Iconify icon="fluent:document-pdf-20-filled" />
                        <p>{files[0].name.length > 10 ? files[0].name.substring(0, 10) + '...' : files[0].name}</p>
                        <p style={{ marginLeft: '10px' }}>({formatFileSize(files[0].size)})</p>
                      </div>
                      <div style={{ width: '10%', display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                        <IconButton
                          aria-label="upload picture"
                          style={{ color: '#FFFFFF' }}
                          component="label"
                          onClick={() => setFiles([])}
                        >
                          <Iconify icon="game-icons:cancel" />
                        </IconButton>
                      </div>
                    </div>
                  ) : null}
                  <div style={{ marginTop: '20px' }}>
                    <FileUpload value={files} onChange={(e) => checkfiles(e)} />
                  </div>
                  {!fileSuccess ? (
                    <div style={{ color: 'red', display: 'flex', justifyContent: 'center', fontSize: '14px' }}>
                      {fileErrMessage}{' '}
                    </div>
                  ) : (
                    ''
                  )}
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      opacity:
                        ebookTitle.trim() != '' && files.length > 0 && ebookDesc.trim() != '' && ebookTags.trim() != ''
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
                          ebookTitle.trim() != '' &&
                          files.length > 0 &&
                          ebookDesc.trim() != '' &&
                          ebookTags.trim() != ''
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      onClick={() => handleSubmit()}
                    >
                      Upload casestudies
                    </LoadingButton>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>

          <Modal
            open={UpdateModalopen}
            onClose={UpdateModalhandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h3>Update casestudies</h3>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="casestudies Title"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={editebookTitle}
                      onChange={(e) => seteditebookTitle(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="casestudies Description"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={editebookDesc}
                      onChange={(e) => seteditebookDesc(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="casestudies Tags"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={editebookTags}
                      onChange={(e) => seteditebookTags(e.target.value)}
                    />
                  </div>

                  <div
                    style={{
                      borderRadius: '50px',
                    }}
                  >
                    <div style={{ width: '90%', display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                      <Iconify icon="fluent:document-pdf-20-filled" />
                      <p>
                        {editfiles?.fileName.length > 10
                          ? editfiles?.fileName.substring(0, 10) + '...'
                          : editfiles?.fileName}
                      </p>
                      <p style={{ marginLeft: '10px' }}>({editfiles?.fileSize})</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '20px' }}></div>
                  {!fileSuccess ? (
                    <div style={{ color: 'red', display: 'flex', justifyContent: 'center', fontSize: '14px' }}>
                      {fileErrMessage}{' '}
                    </div>
                  ) : (
                    ''
                  )}
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      opacity: 1,
                    }}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      style={{
                        background: '#6ab04c',
                        padding: '10px 20px',
                        opacity: 1,
                        cursor: 'pointer',
                      }}
                      onClick={() => handleUpdate()}
                    >
                      Edit casestudies Details
                    </LoadingButton>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
