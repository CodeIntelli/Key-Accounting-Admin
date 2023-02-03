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
  CircularProgress,
} from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Country, State } from 'country-state-city';
import Lottie from 'react-lottie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JoditEditor from 'jodit-react';
import Select from 'react-select';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Iconify from '../components/iconify';
// import { AddUser } from '../redux/Actions/userAction';
import errAnimationData from '../lotties/error.json';
import successAnimationData from '../lotties/success.json';
import { AddUser } from '../redux/Actions/userAction';
import 'jodit';
import 'jodit/build/jodit.min.css';
import { errorToast, successToast } from 'src/utils/Toast';
import Loader from 'src/components/Loading';
import { Label } from '@mui/icons-material';

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

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: 'en',
  toolbarButtonSize: 'medium',
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  width: '100%',
  height: 300,
};

const CreateInfographics = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [imageLink, setimageLink] = useState('');
  const [recordId, setRecordId] = useState('');
  const [isEditedData, setIsEditedData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigate = useNavigate();

  const doStoreDetails = async (record) => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      console.log('🤩 ~ file: AddCarrier.js:75 ~ doStoreDetails ~ bearerToken', bearerToken);
      const { data } = await axios.post(`${BASE_URL}content/uploads`, record, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: AddCarrier.js:83 ~ doStoreDetails ~ data', data);
      setIsLoading(false);
      return data;
    } catch (error) {
      return error?.response?.data;
    }
  };
  const { id } = useParams();

  React.useEffect(() => {
    if (id && id) {
      doFetchData(id);
    }
  }, []);
  const doFetchData = async (id) => {
    try {
      setFetchLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}content/upload/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: AddCarrier.js:110 ~ doFetchData ~ data', data);

      /* setTitle
setDesc
setTags
setContent
setimageLink */
      setTitle(data?.result?.title);
      setDesc(data?.result?.desc);
      setTags(data?.result?.tags.toString());
      setContent(data?.result?.content);
      setimageLink(data?.result?.imageUrl);
      //   setLinkdinLink(data?.result?.indeedLink);
      setRecordId(data?.result?._id);
      setIsEditedData(true);
      setFetchLoading(false);
      return data;
    } catch (error) {
      setFetchLoading(false);
      return error?.response?.data;
    }
  };
  const doEditData = async (id, updatedRecord) => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      console.log('🤩 ~ file: AddCarrier.js:75 ~ doStoreDetails ~ bearerToken', bearerToken);
      const { data } = await axios.put(`${BASE_URL}content/upload/${id}`, updatedRecord, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      setIsLoading(false);
      return data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  const handleSubmit = async () => {
    const data = {
      title,
      desc,
      tags: tags.includes(',') ? tags.split(',') : [tags],
      content,
      imageUrl: imageLink,
      type: 'infographics',
    };
    let storeResult;
    if (!isEditedData) {
      storeResult = await doStoreDetails(data);
    } else {
      storeResult = await doEditData(recordId, data);
    }
    if (storeResult?.success) {
      navigate('/dashboard/infographics', { replace: true });
      successToast(isEditedData ? 'Infographics Updated Successfully' : 'Infographics Added Successfully');
    } else {
      errorToast('Something went wrong');
    }
  };

  return (
    <div>
      {/*  
    <Button onClick={handleOpen}>Open modal</Button>
      */}
      {fetchLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ py: 2, px: 3 }}>
              <h1>{isEditedData ? 'Edit Ebook' : ' Add Ebook'} </h1>
              <Grid item xs={12} md={12}>
                <Card>
                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      width: '100%',
                      marginTop: '24px',
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                    }}
                  >
                    <TextField
                      id="outlined-firstname"
                      label="Title"
                      variant="outlined"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                      id="outlined-lastname"
                      label="Description"
                      variant="outlined"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </Box>
                  <TextField
                    id="outlined-lastname"
                    label="Tags"
                    variant="outlined"
                    style={{ width: '100%', marginTop: '24px' }}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <TextField
                    id="outlined-lastname"
                    label="Image Link"
                    variant="outlined"
                    style={{ width: '100%', marginTop: '24px' }}
                    value={imageLink}
                    onChange={(e) => setimageLink(e.target.value)}
                  />
                  <h3>Content</h3>
                  <div style={{ width: '100%', marginTop: '24px' }}>
                    <JoditEditor value={content} config={editorConfig} onChange={(value) => setContent(value)} />
                  </div>
                </Card>
                <div
                  style={{
                    marginTop: '30px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    opacity:
                      title?.trim() !== '' && desc?.trim() !== '' && content?.trim() !== '' && tags?.trim() !== ''
                        ? 1
                        : 0.5,
                  }}
                >
                  {isLoading ? (
                    <div style={{ marginRight: '50px' }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      style={{
                        background: isEditedData ? '#FFC501' : '#6ab04c',
                        padding: '10px 20px',
                        opacity: 1,
                        cursor:
                          title?.trim() !== '' && desc?.trim() !== '' && content?.trim() !== '' && tags?.trim() !== ''
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                      onClick={() => handleSubmit()}
                    >
                      {isEditedData ? 'Edit Ebook' : 'Create Ebook'}
                    </LoadingButton>
                  )}
                </div>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CreateInfographics;
