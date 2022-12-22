import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

import Logo from '../components/logo/Logo.png';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | Key CMD Accounting </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img
              src={Logo}
              alt="company"
              style={{
                width: '150px',
                marginLeft: '20px',
              }}
            />
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 10px',
              }}
            >
              <div
                style={{
                  background: 'rgb(231 231 231)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  lineHeight: '0px',
                  borderRadius: '11px',
                  width: '60%',
                }}
              >
                <h5>Use This Credentials</h5>
                <p>fullstack.dk@gmail.com</p>
                <p>Shiv@6464</p>
              </div>
            </div>
            <Typography variant="h4" gutterBottom>
              Sign in to Key CMD Accounting
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }} />

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
