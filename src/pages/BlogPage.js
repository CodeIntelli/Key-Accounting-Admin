/* eslint-disable */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import Cookies from 'js-cookie';
import axios from 'axios';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allBlog, setAllBlog] = useState();
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
            <Link to={'/dashboard/addblog'}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Post
              </Button>
            </Link>
          </Stack>

          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <BlogPostsSearch posts={POSTS} />
          </Stack>

          <Grid container spacing={3}>
            {allBlog && allBlog.map((post, index) => <BlogPostCard key={post._id} post={post} index={index} />)}
          </Grid>
        </Container>
      )}
    </>
  );
}
