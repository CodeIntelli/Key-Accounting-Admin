/* eslint-disable */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Modal, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AppWidgetSummary } from '../sections/@dashboard/app';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '12px',
  p: 4,
};

export default function BlogPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allBlog, setAllBlog] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;
      const { data } = await axios.get(`${BASE_URL}blog`, {
        headers: { authorization: `Bearer ${bearerToken}` },
      });
      // setOpenDrawer(false);
      setAllBlog(data.result);
      // setFilterData(data.result);
      setIsLoading(false);
      console.log('🤩 ~ file: UserPage.js:113 ~ fetchUser ~ data', data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlogData();
  }, []);
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>
      {isLoading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Blog
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpen(true)}>
              Add Post
            </Button>
          </Stack>

          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <BlogPostsSearch posts={POSTS} />
          </Stack>

          <Grid container spacing={3}>
            {allBlog && allBlog.map((post, index) => <BlogPostCard key={post._id} post={post} index={index} />)}
          </Grid>
        </Container>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div
              style={{
                display: 'flex',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Link to={'/dashboard/category'}>
                    <AppWidgetSummary title="Categories" color="info" small={true} icon="eva:plus-fill" />
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Link to={'/dashboard/subcategory'}>
                    <AppWidgetSummary title="Sub Categories" color="success" small={true} icon="eva:plus-fill" />
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Link to={'/dashboard/addblog'}>
                    <AppWidgetSummary title="Blog" color="warning" small={true} icon="eva:plus-fill" />
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
