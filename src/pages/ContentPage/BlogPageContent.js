/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';

const BlogPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // Context States

  /* herosection */
  const [atitle, asettitle] = useState('');
  const [adesc, asetdesc] = useState('');
  const [abtnTxt, asetbtnTxt] = useState('');
  const [abtnUrl, asetbtnUrl] = useState('');
  const [amainImg, asetmainImg] = useState('');
  /* section1 */
  const [bcat, bsetcat] = useState('');
  const [bcat2, bsetcat2] = useState('');
  const [btitle, bsettitle] = useState('');
  const [bdate, bsetdate] = useState('');
  const [bauthor, bsetauthor] = useState('');
  const [bread, bsetread] = useState('');
  const [bimg, bsetimg] = useState('');

  const [cblogdata2, csetblogdata2] = useState('');

  const [dblogdata3, dsetblogdata3] = useState('');

  const [etitle, esettitle] = useState('');
  const [esubtitle, esetsubtitle] = useState('');
  const [eblogData2, esetblogData2] = useState('');

  const setStateData = (data) => {
    asettitle(data.heroSection.title);
    asetdesc(data.heroSection.desc);
    asetbtnTxt(data.heroSection.btnTxt);
    asetbtnUrl(data.heroSection.btnUrl);
    asetmainImg(data.heroSection.mainImg);
    bsetcat(data.blogData1.cat[0]);
    bsetcat2(data.blogData1.cat[1]);
    bsettitle(data.blogData1.title);
    bsetdate(data.blogData1.date);
    bsetauthor(data.blogData1.author);
    bsetread(data.blogData1.read);
    bsetimg(data.blogData1.img);

    csetblogdata2(data.blogData2);

    dsetblogdata3(data.blogData3);

    esettitle(data.releventData.titleData.title);
    esetsubtitle(data.releventData.titleData.subTitle);
    esetblogData2(data.releventData.blogData2);
  };

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}content?page=blog`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: HomePageContent.js:19 ~ fetchContent ~ data', data);
      setHomeContent(data.result.english.content);
      setStateData(data.result.english.content);
      setid(data.result._id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const changeContent = async (id, updatedData) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}content/${id}`, updatedData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return error.response.data;
    }
  };

  const handleSubmit = async () => {
    setaddLoader(true);
    const setFormData = {
      english: {
        pageTitle: 'CaseStudiesPage',
        content: {
          heroSection: {
            title: atitle,
            desc: adesc,
            btnTxt: abtnTxt,
            btnUrl: abtnUrl,
            mainImg: amainImg,
          },
          section1: {
            data: bdata,
          },
        },
      },
    };
    console.log(setFormData);
    const updateResult = await changeContent(id, setFormData);
    setTimeout(() => {
      setaddLoader(false);
    }, 2500);
  };
  React.useEffect(() => {
    fetchContent();
  }, []);
  return (
    <div>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ py: 2, px: 3 }}>
                <h2>Hero Section</h2>
                <Grid item xs={12} md={12}>
                  <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                    <TextField
                      name="email"
                      label="Title"
                      value={atitle}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asettitle(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Description"
                      value={adesc}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetdesc(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Txt"
                      value={abtnTxt}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetbtnTxt(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Url"
                      value={abtnUrl}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetbtnUrl(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="main Img"
                      value={amainImg}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetmainImg(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Blog Data 1</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="email"
                        label="Cat One"
                        value={bcat}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetcat(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Cat Two"
                        value={bcat2}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetcat2(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Title"
                        value={btitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsettitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Date"
                        value={bdate}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetdate(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Author"
                        value={bauthor}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetauthor(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Read"
                        value={bread}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetread(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Img"
                        value={bimg}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetimg(e.target.value);
                        }}
                      />
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Blog Data 2</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      {cblogdata2.map((cardData, index) => {
                        return (
                          <div>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                            <TextField
                              name="email"
                              label="Cat One"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.cat[0]}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cblogdata2];
                                dta[index].cat[0] = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Cat Two"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.cat[1]}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cblogdata2];
                                dta[index].cat[1] = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Title"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.title}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cblogdata2];
                                dta[index].title = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Date"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.date}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cblogdata2];
                                dta[index].date = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Author"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.author}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cblogdata2];
                                dta[index].author = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Read"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.read}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cblogdata2];
                                dta[index].read = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Image"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.img}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cblogdata2];
                                dta[index].img = value;
                                csetblogdata2(dta);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Blog Data 3</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      {dblogdata3.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                            <TextField
                              name="email"
                              label="Cat One"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.cat[0]}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...dblogdata3];
                                dta[index].cat[0] = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Cat Two"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.cat[1]}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...dblogdata3];
                                dta[index].cat[1] = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Title"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.title}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...dblogdata3];
                                dta[index].title = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Date"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.date}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...dblogdata3];
                                dta[index].date = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Author"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.author}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...dblogdata3];
                                dta[index].author = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Read"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.read}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...dblogdata3];
                                dta[index].read = value;
                                csetblogdata2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Image"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.img}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...dblogdata3];
                                dta[index].img = value;
                                csetblogdata2(dta);
                              }}
                            />
                          </>
                        );
                      })}
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Relevent Data</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="email"
                        label="Title"
                        value={etitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          esettitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Sub Title"
                        value={esubtitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          esetsubtitle(e.target.value);
                        }}
                      />
                      {eblogData2.map((cardData, index) => {
                        return (
                          <div>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                            <TextField
                              name="email"
                              label="Cat One"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.cat[0]}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...eblogData2];
                                dta[index].cat[0] = value;
                                esetblogData2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Cat Two"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.cat[1]}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...eblogData2];
                                dta[index].cat[1] = value;
                                esetblogData2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Title"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.title}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...eblogData2];
                                dta[index].title = value;
                                esetblogData2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Date"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.date}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...eblogData2];
                                dta[index].date = value;
                                esetblogData2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Author"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.author}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...eblogData2];
                                dta[index].author = value;
                                esetblogData2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Read"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.read}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...eblogData2];
                                dta[index].read = value;
                                esetblogData2(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Image"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.img}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...eblogData2];
                                dta[index].img = value;
                                esetblogData2(dta);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'flex-end',
              opacity: 1,
            }}
          >
            {addRecordLoader ? (
              <div style={{ marginRight: '50px' }}>
                <CircularProgress />
              </div>
            ) : (
              <LoadingButton
                type="submit"
                variant="contained"
                style={{
                  background: '#FFC501',
                  padding: '10px 20px',
                  opacity: 1,
                }}
                onClick={() => handleSubmit()}
              >
                Edit Page Content
              </LoadingButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPageContent;
