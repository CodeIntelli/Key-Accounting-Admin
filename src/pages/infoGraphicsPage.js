import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Typography, Box, Card, Link, Stack, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
// mock

import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function InfoGraphics() {
  const icon = (icon, customWidth = 100, customHeight = 100) => (
    <Iconify icon={icon} width={customWidth} height={customHeight} />
  );

  const PageData = [
    {
      title: 'Navbar',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Footer',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Home Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Service Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Contact Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Industries Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Case Studies Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Info Graphics Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Checklist Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'FAQs Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Blog Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Become A Partner Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Carrier Apply Page',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Carrier',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Our Story',
      url: '/home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
  ];
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            InfoGraphics Content
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New InfoGraphics
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {PageData.map((pageContent, index) => {
            return (
              <Grid key={'demo'} item xs={12} sm={6} md={3}>
                <Card>
                  <Stack spacing={2} sx={{ p: 3 }}>
                    <div
                      style={{
                        position: 'absolute',
                        fontSize: '12px',
                        top: '-15px',
                        zIndex: -1,
                        opacity: 0.4,
                        left: '-10px',
                      }}
                    >
                      <p>{pageContent.icon1}</p>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        fontSize: '48px',
                        top: '-50px',
                        zIndex: -1,
                        opacity: 0.5,
                        right: '-25%',
                      }}
                    >
                      <p>{pageContent.icon}</p>
                    </div>
                    <div
                      style={{
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      <p>{index + 1}</p>
                      <Link color="inherit" underline="hover">
                        <Typography variant="subtitle2" noWrap>
                          {pageContent.title}
                        </Typography>
                      </Link>
                    </div>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
