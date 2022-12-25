import { useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
import Iconify from '../components/iconify/Iconify';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { loadUser } from '../redux/Actions/authAction';
import { clearMessage } from '../redux/Reducers/messageSlice';

// ----------------------------------------------------------------------

export default function DashboardAppPage({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, []);

  if (user && user) {
    console.log(user);
  } else {
    console.log('Else Block Executed');
    navigation.navigate('/login');
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Key CMD Accounting </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {user ? `${user.firstName} ${user.lastName}` : null}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Blogs" total={240} color="success" icon={'simple-icons:blogger'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Pages" total={240} color="info" icon={'ooui:special-pages-ltr'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="User Activity" total={240} color="warning" icon={'ic:baseline-work-history'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Ebook" total={240} icon={'mdi:notebook-check'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Checklist" total={240} color="success" icon={'material-symbols:checklist'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Infographics" total={240} color="info" icon={'fluent:diagram-24-regular'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Case Studies" total={240} color="warning" icon={'fluent-mdl2:test-case'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total User" total={240} icon={'mdi:users-group'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
