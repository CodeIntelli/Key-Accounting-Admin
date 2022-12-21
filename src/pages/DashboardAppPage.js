import { useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
import Iconify from '../components/iconify';
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
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {user ? user.name : null}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
