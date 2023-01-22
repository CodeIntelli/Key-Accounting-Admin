import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
// @mui
import { Container, Typography, Box, Card, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
// mock

import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function ActivityPage() {
  const icon = (icon, customWidth = 100, customHeight = 100) => (
    <Iconify icon={icon} width={customWidth} height={customHeight} />
  );

  const PageData = [
    {
      title: 'Navbar',
      url: 'navbar',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Footer',
      url: 'footer',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Home Page',
      url: 'home',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Service Page',
      url: 'service',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Contact Page',
      url: 'contact',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Industries Page',
      url: 'industries',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Case Studies Page',
      url: 'casestudy',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Info Graphics Page',
      url: 'infographics',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Checklist Page',
      url: 'checklist',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'FAQs Page',
      url: 'faq',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Blog Page',
      url: 'blog',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Become A Partner Page',
      url: 'partner',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Carrier Apply Page',
      url: 'carrierapply',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Carrier',
      url: 'carrier',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
    {
      title: 'Our Story',
      url: 'ourstory',
      icon: icon('logos:ant-design'),
      icon1: icon('flat-color-icons:edit-image', 50, 50),
    },
  ];
  return (
    <>
      <Helmet>
        <title> Dashboard | Key CMS Accounting </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Page Content
        </Typography>

        <Grid container spacing={3}>
          {PageData.map((pageContent, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Link to={pageContent.url}>
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
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
