/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';

const ContactPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // Context States

  /* herosection */
  const [atitle, asettitle] = useState('');
  const [asubtitle, asetsubtitle] = useState('');
  const [aimg, asetimg] = useState('');
  /* section1 */
  const [bdata, bsetdata] = useState('');
  /* section2 */
  const [cdata, csetdata] = useState('');
  /* section3 */
  const [dimg, dsetimg] = useState('');
  // const [b, bset] = useState('');

  const setStateData = (data) => {
    asettitle(data.heroSection.title);
    asetsubtitle(data.heroSection.subtitle);
    asetimg(data.heroSection.img);
    bsetdata(data.section1.data);
    csetdata(data.section2.data);
    dsetimg(data.section3.img);
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

      const { data } = await axios.get(`${BASE_URL}content?page=contactus`, {
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
      console.log('🤩 ~ file: HomePageContent.js:19 ~ fetchContent ~ data', data);
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
        pageTitle: 'ServicePage',
        content: {
          heroSection: {
            title: atitle,
            subTitle: adesc,
            btnTxt: abtnTxt,
            btnUrl: abtnUrl,
            mainImg: amainImg,
          },
          section1: {
            subtitle: bsubtitle,
            title: btitle,
            desc: bdesc,
            mainImg: bmainImg,
          },
          section2: {
            desc: cdesc,
            img: cimg,
          },
          section3: {
            subtitle: dsubtitle,
            title: dtitle,
            data: dData,
          },
          section4: {
            subtitle: esubtitle,
            title: etitle,
            data: eData,
          },
          Faq: {
            subTitle: fsubtitle,
            title: ftitle,
            mainBtn: fmainBtn,
            texts: fData,
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
        <>
          <LoadingAnimation />
        </>
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
                      label="Sub Title"
                      value={asubtitle}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetsubtitle(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Sub Title"
                      value={aimg}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetimg(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Card>
            </Grid>
          </Grid>

        <div style={{marginTop:'50px'}}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ py: 2, px: 3 }}>
                <h2>Section 1</h2>
                <Grid item xs={12} md={12}>
                  <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                    {bdata.map((cardData, index) => {
                      return (
                        <>
                          {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                          <TextField
                            name="email"
                            label="Title"
                            style={{ width: '100%', marginTop: '24px' }}
                            value={cardData.title}
                            onChange={(e) => {
                              const value = e.target.value;
                              const dta = [...bdata];
                              dta[index].title = value;
                              bsetdata(dta);
                            }}
                          />
                          <TextField
                            name="email"
                            label="Image"
                            style={{ width: '100%', marginTop: '24px' }}
                            value={cardData.img}
                            onChange={(e) => {
                              const value = e.target.value;
                              const dta = [...bdata];
                              dta[index].img = value;
                              bsetdata(dta);
                            }}
                          />
                          <TextField
                            name="email"
                            label="Description"
                            style={{ width: '100%', marginTop: '24px' }}
                            value={cardData.desc}
                            onChange={(e) => {
                              const value = e.target.value;
                              const dta = [...bdata];
                              dta[index].desc = value;
                              bsetdata(dta);
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

        <div style={{marginTop:'50px'}}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ py: 2, px: 3 }}>
                <h2>Section 2</h2>
                <Grid item xs={12} md={12}>
                  <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                    {cdata.map((cardData, index) => {
                      return (
                        <>
                          {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                          <TextField
                            name="email"
                            label="Title"
                            style={{ width: '100%', marginTop: '24px' }}
                            value={cardData.title}
                            onChange={(e) => {
                              const value = e.target.value;
                              const dta = [...bdata];
                              dta[index].title = value;
                              bsetdata(dta);
                            }}
                          />
                          <TextField
                            name="email"
                            label="Image"
                            style={{ width: '100%', marginTop: '24px' }}
                            value={cardData.img}
                            onChange={(e) => {
                              const value = e.target.value;
                              const dta = [...bdata];
                              dta[index].img = value;
                              bsetdata(dta);
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

                <div style={{marginTop:'50px'}}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ py: 2, px: 3 }}>
                <h2>Section 3</h2>
                <Grid item xs={12} md={12}>
                  <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                  <TextField
                      name="title"
                      label="Image"
                      value={dimg}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        dsetimg(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </div>
          {/* 
          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Section 1</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                      >
                        <TextField
                          name="email"
                          label="Sub Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bsubtitle}
                          onChange={(e) => {
                            bsetsubtitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={btitle}
                          onChange={(e) => {
                            bsettitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Description"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bdesc}
                          onChange={(e) => {
                            bsetdesc(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Main image"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bmainImg}
                          onChange={(e) => {
                            bsetmainImg(e.target.value);
                          }}
                        />
                      </Box>
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
                  <h2>Section 2</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                      >
                        <TextField
                          name="email"
                          label="Description"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={cdesc}
                          onChange={(e) => {
                            csetdesc(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Image"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={cimg}
                          onChange={(e) => {
                            csetimg(e.target.value);
                          }}
                        />
                      </Box>
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
                  <h2>Section 3</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        label="Title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={dtitle}
                        onChange={(e) => {
                          dsettitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Sub title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={dsubtitle}
                        onChange={(e) => {
                          dsetsubtitle(e.target.value);
                        }}
                      />
                    
                      {dData.map((cardData, index) => {
                        return (
                          <>
                            <Divider style={{ marginTop: '20px' }} />
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              <TextField
                                name="email"
                                label={`Card Title ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.title}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...dData];
                                  dta[index].title = value;
                                  dsetData(dta);
                                  // esetdata[index].title(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Description ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.desc}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...dData];
                                  dta[index].desc = value;
                                  dsetData(dta);
                                  // esetdata[index].subTitle(e.target.value);
                                }}
                              />
                            </Box>
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
                  <h2>Section 4</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        label="Title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={etitle}
                        onChange={(e) => {
                          esettitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Sub title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={esubtitle}
                        onChange={(e) => {
                          esetsubtitle(e.target.value);
                        }}
                      />
                    
                      {eData.map((cardData, index) => {
                        return (
                          <>
                            <Divider style={{ marginTop: '20px' }} />
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              <TextField
                                name="email"
                                label={`Card Title ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.title}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...eData];
                                  dta[index].title = value;
                                  esetData(dta);
                                  // esetdata[index].title(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Image ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.img}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...eData];
                                  dta[index].img = value;
                                  esetData(dta);
                                  // esetdata[index].subTitle(e.target.value);
                                }}
                              />
                            </Box>
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
                  <h2>Frequently Asked Questions</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                      >
                        <TextField
                          name="email"
                          label="Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={ftitle}
                          onChange={(e) => {
                            fsettitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Sub Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={fsubtitle}
                          onChange={(e) => {
                            fsetsubtitle(e.target.value);
                          }}
                        />
                      </Box>
                      <TextField
                        name="email"
                        label="Button Title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={fmainBtn}
                        onChange={(e) => {
                          fsetmainBtn(e.target.value);
                        }}
                      />
               
                      <h3>Card Section </h3>
                      {fData.map((cardData, index) => {
                        // console.log(cardData, index);
                        return (
                          <>
                            <Divider style={{ marginTop: '20px' }} />
                            <TextField
                              name="email"
                              label={`Question ${index + 1}`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.que}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...fData];
                                dta[index].que = value;
                                fsetData(dta);
                                // ksetcardData[index]?.que(e.target.value);
                              }}
                            />
                            <TextField
                              name="email"
                              label={`Answer`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.ans}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...fData];
                                dta[index].ans = value;
                                fsetData(dta);
                                // ksetcardData[index]?.ans(e.target.value);
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
                    </div> */}

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

export default ContactPageContent;
