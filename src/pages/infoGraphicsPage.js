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
  { id: 'title', label: 'Attachment', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'title', label: 'Description', alignRight: false },
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

export default function CategoriesPage() {
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

      const { data } = await axios.get(`${BASE_URL}content/admin/upload/list?type=infographics`, {
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

  const ediUploadDocs = async (id, attachment) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;
      console.log('=========================================================', contentData);
      const contentFormData = new FormData();
      contentFormData.append('attachment', attachment);
      const { data } = await axios.post(`${BASE_URL}content/uploadContent/${id}`, contentFormData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:121 ~ addCategory ~ data', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const addContent = async (contentData) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;
      console.log('=========================================================', contentData);
      const contentFormData = new FormData();
      const tagsArr = contentData.ebookTags.split(',');
      contentFormData.append('title', contentData.ebookTitle);
      contentFormData.append('type', 'infographics');
      tagsArr.map((tagdata, index) => {
        return contentFormData.append(`tags[${index}]`, tagdata);
      });
      contentFormData.append('desc', contentData.ebookDesc);
      contentFormData.append('attachment', contentData.attachment);
      const { data } = await axios.post(`${BASE_URL}content/uploads`, contentFormData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:121 ~ addCategory ~ data', data);
      setModalopen(false);
      setebookDesc('');
      setebookTags('');
      setebookTitle('');
      setAttachment('');
      setfileSuccess(false);
      setFiles([]);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const updateContent = async (id, updatedData) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}content/upload/${id}`, updatedData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:145 ~ updateCategory ~ data', data);
      setUpdateModalopen(false);
      seteditebookDesc('');
      seteditebookTags('');
      seteditebookTitle('');
      setAttachment('');
      setfileSuccess(false);
      setFiles([]);
      return data;
    } catch (error) {
      return error.response.data;
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
    seteditebookTitle(idData.title);
    seteditebookDesc(idData.desc);
    seteditebookTags(idData.tags.toString());
    seteditFiles(idData.attachment);
    setfileSuccess(true);
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

  const handleToggler = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to change the access of this Content?',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await doTogglerCall(id);
        if (result?.success) {
          setUpdateData('');
          successToast('Content Status Change Successfully');
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

  return (
    <>
      <Helmet>
        <title> infographics | Key CMS Accounting </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                infographics
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  seteditcatTitle('');
                  setcatTitle('');
                  setModalopen(true);
                }}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add infographics
              </Button>
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
                      const { _id, attachment, title, desc, tags, isActive, createdAt } = tableData;
                      return (
                        <TableBody key={_id}>
                          <TableRow hover>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              <a
                                href={
                                  attachment.url
                                    ? attachment.url.split('/upload/')[0] +
                                      '/upload/fl_attachment/' +
                                      attachment.url.split('/upload/')[1]
                                    : ''
                                }
                                download={attachment?.fileName}
                              >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <Label color={'info'} style={{ cursor: 'pointer' }} title={attachment.fileName}>
                                    <Iconify icon="material-symbols:sim-card-download-rounded" />
                                    {attachment.fileName.length > 10
                                      ? `${attachment.fileName.substr(0, 10)}...`
                                      : sentenceCase(attachment.fileName)}
                                  </Label>
                                  <Label color={'success'} style={{ cursor: 'pointer' }}>
                                    ({attachment.fileSize})
                                  </Label>
                                </div>
                              </a>
                            </TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {title}
                            </TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {desc}
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                color={isActive ? 'success' : 'error'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleToggler(_id)}
                              >
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
                handleCloseMenu();
                setUpdateModalopen(true);
                seteditcatTitle(UpdateData.catTitle);
              }}
            >
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
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
                  <h3>Upload infographics</h3>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="infographics Title"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={ebookTitle}
                      onChange={(e) => setebookTitle(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="infographics Description"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={ebookDesc}
                      onChange={(e) => setebookDesc(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="infographics Tags"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={ebookTags}
                      onChange={(e) => setebookTags(e.target.value)}
                    />
                  </div>
                  {files && files.length > 0 ? (
                    <>
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
                    </>
                  ) : (
                    <></>
                  )}
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
                      Upload infographics
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
                  <h3>Update infographics</h3>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="infographics Title"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={editebookTitle}
                      onChange={(e) => seteditebookTitle(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="infographics Description"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={editebookDesc}
                      onChange={(e) => seteditebookDesc(e.target.value)}
                    />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="infographics Tags"
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
                      opacity:
                        editebookTitle.trim() != '' && editebookDesc.trim() != '' && editebookTags.trim() != ''
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
                          editebookTitle.trim() != '' && editebookDesc.trim() != '' && editebookTags.trim() != ''
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      onClick={() => handleUpdate()}
                    >
                      Edit infographics Details
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
