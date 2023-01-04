/* eslint-disable */
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
} from '@mui/material';
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
import { AddUser } from '../redux/Actions/userAction';
import ReactChipInput from 'react-chip-input';
import Cookies from 'js-cookie';
import axios from 'axios';

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

const CreateBlog = () => {
  const [countryData, setCountryData] = useState();
  const dispatch = useDispatch();
  // const { isLoading, isAuthenticated, user, error } = useSelector((state) => state.user);

  const [postTitle, setpostTitle] = useState('');
  const [postDesc, setpostDesc] = useState('');
  const [content, setcontent] = useState('');
  const [post_slug, setpost_slug] = useState('');
  const [tags, settags] = useState();
  const [metaTitle, setmetaTitle] = useState('');
  const [metaDesc, setmetaDesc] = useState('');
  const [metaKeyword, setmetaKeyword] = useState();
  const [catId, setCatId] = useState();

  const addBlog = async (Blogdata) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.post(`${BASE_URL}blog?cat_id=63b55bd78677fde24af291c3`, Blogdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: AddBlog.js:65 ~ addBlog ~ data', data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  const fetchCategories = async () => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.post(`${BASE_URL}blog?cat_id=63b55bd78677fde24af291c3`, Blogdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: AddBlog.js:65 ~ addBlog ~ data', data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  const handleDropdown = (data) => {};

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

  const handleSubmit = async () => {
    const storedData = new FormData();
    const tagsArr = tags.split(',');
    storedData.append('postTitle', postTitle);
    storedData.append('postDesc', postDesc);
    storedData.append('content', content);
    storedData.append('post_slug', post_slug);
    tagsArr.map((tagdata, index) => {
      return storedData.append(`tags[${index}]`, tagdata);
    });
    storedData.append('metaTitle', metaTitle);
    storedData.append('metaDesc', metaDesc);
    storedData.append('metaKeyword', metaKeyword);
    storedData.append('blogImg', image);

    const addBlogresult = await addBlog(storedData);
    if (addBlogresult.success) {
      setErrMsg('');
      setSuccessMsg(`Blog Created Successfully`);
      return setOpen(true);
    } else {
      console.log(addBlogresult.message);
      setSuccessMsg('');
      setErrMsg(addBlogresult.message);
      return setOpen(true);
    }
  };

  /* Modal States */
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [errMsg, setErrMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');

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

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      {/*  
    <Button onClick={handleOpen}>Open modal</Button>
      */}

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ py: 2, px: 3 }}>
            <h1>Add Blog</h1>
            <Grid item xs={12} md={12}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
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
              </div>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                }}
              >
                <TextField
                  id="outlined-firstname"
                  label="Post Title"
                  variant="outlined"
                  value={postTitle}
                  onChange={(e) => setpostTitle(e.target.value)}
                />
                <TextField
                  id="outlined-lastname"
                  label="Post Description"
                  variant="outlined"
                  value={postDesc}
                  multiline
                  rows={4}
                  onChange={(e) => setpostDesc(e.target.value)}
                />
                <TextField
                  id="outlined-content"
                  label="Content"
                  variant="outlined"
                  value={content}
                  multiline
                  rows={4}
                  onChange={(e) => setcontent(e.target.value)}
                />
                <Select
                  menuPortalTarget={document.body}
                  placeholder="Select Sub Categories"
                  styles={{ padding: '50px' }}
                  options={countryData && countryData}
                  onChange={(e) => {
                    handleDropdown(e);
                  }}
                />
                <TextField
                  id="outlined-firstname"
                  label="Post Slug"
                  variant="outlined"
                  value={post_slug}
                  onChange={(e) => setpost_slug(e.target.value)}
                />
                <TextField
                  id="outlined-lastname"
                  label="Tags"
                  variant="outlined"
                  value={tags}
                  onChange={(e) => settags(e.target.value)}
                />
                <TextField
                  id="outlined-content"
                  label="Meta Title"
                  variant="outlined"
                  value={metaTitle}
                  onChange={(e) => setmetaTitle(e.target.value)}
                />
                <TextField
                  id="outlined-content"
                  label="Meta Description"
                  variant="outlined"
                  value={metaDesc}
                  multiline
                  rows={4}
                  onChange={(e) => setmetaDesc(e.target.value)}
                />
                <TextField
                  id="outlined-content"
                  label="Meta Keywords"
                  variant="outlined"
                  value={metaKeyword}
                  onChange={(e) => setmetaKeyword(e.target.value)}
                />
              </Box>

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
                  }}
                  onClick={() => handleSubmit()}
                >
                  Create Post
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
          <div>
            <Lottie options={errMsg.length > 0 ? errDefaultOptions : successDefaultOptions} height={200} width={200} />
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
                {successMsg && successMsg.includes('#') ? (
                  <div>
                    {successMsg.split('#')[0]} <span style={{ opacity: 0.6 }}>#{successMsg.split('#')[1]}</span>
                  </div>
                ) : (
                  successMsg
                )}

                {errMsg ? errMsg : ''}
              </Typography>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateBlog;
