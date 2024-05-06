import React, { useEffect, useState } from 'react'
import { Box, Card, Paper, Grid, Typography, Button, Alert } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../img/logo.jpeg'
import bgimag from '../img/bg.webp'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import base from '../base'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
//import base_url from '../base'
function Login(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const param = useParams()


  const [showpassword, SetshowPassword] = useState(false);
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [showAlert, SetshowAlert] = useState(false)





  useEffect(() => {

    if (location.pathname == '/') {
      sessionStorage.clear();
    }
  }, [])




  function autoCloseWarning() {
    setTimeout(() => {
      SetshowAlert(false)
    }, 4000)
  }


  function login() {
    debugger;
    fetch(`${base.base_url}/login`, {
      headers: {
        'authorization': `Bewindow.sessionStorage.getItem('token')}`,
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      method: "post",
      body: JSON.stringify({
        user_name: username,
        password: password,
      })

    }).then(function (response) {
      return response.json();
    })
      .then(async (data) => {




        if (data.data !== "error") {

          if (data.crm_admin) {

            //// roles setting

            window.sessionStorage.setItem('client_role', JSON.stringify(data.roles.client))   //// for client model roles
            window.sessionStorage.setItem('campaign_role', JSON.stringify(data.roles.campaign))
            window.sessionStorage.setItem('user_and_roles', JSON.stringify(data.roles.User_And_Roles))
            window.sessionStorage.setItem('lead_role', JSON.stringify(data.roles.lead))
            window.sessionStorage.setItem('rfp_role', JSON.stringify(data.roles.rfp))
            window.sessionStorage.setItem('invoice_role', JSON.stringify(data.roles.invoice))
            window.sessionStorage.setItem('report_role', JSON.stringify(data.roles.report))
            ///// for token setting
            window.sessionStorage.setItem('token', data.token)
            window.sessionStorage.setItem('adminName', data.adminName)
            window.sessionStorage.setItem('crm_admin_permission_id', data.crm_admin_permission_id)
            //// type setting 
            window.sessionStorage.setItem('credential_type', JSON.stringify({ Crm_Admin: data.crm_admin, client: data.client, is_client_admin: data.is_client_admin }))

            window.open('/dashboard', "_self")

            //    navigate('/dashboard')

          } else {




            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('credential_type_client', JSON.stringify({ Crm_Admin: data.crm_admin, is_client_user: data.is_client_user, client_id: data.client_id, is_admin: data.is_client_admin }))

            sessionStorage.setItem('AllClientData', JSON.stringify({ 'client_id': data.client_id, 'contact_id': data.contact_id, 'email_id': data.email_id, 'phone_no': data.phone_no, is_admin: data.is_client_admin }))

            sessionStorage.setItem('payload', JSON.stringify(data.payload))
            sessionStorage.setItem('client_id', data.client_id)
            sessionStorage.setItem('contact_id', data.contact_id)
            sessionStorage.setItem('name', data.name)
            sessionStorage.setItem('email_id', data.email_id)
            sessionStorage.setItem('phone_no', data.phone_no)
            sessionStorage.setItem('permission', JSON.stringify(data.permission))


            sessionStorage.setItem('client_user_permission', JSON.stringify({ client_user_permission: data.client_user_permission, client_user_permission_id: data.client_user_permission_id }))

            //  navigate('/clientDashboard')

            window.open('/clientDashboard', "_self")


          }

        } else {
          SetshowAlert(true);
          autoCloseWarning();
        }

      });
  }



  return (
    <div>
      <Box sx={{ backgroundColor: "#f8f9ff", width: '100%', height: '100vh', backgroundImage: { xs: '', sm: '', md: `url(${bgimag})` }, objectFit: 'cover' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', height: { xs: 500, sm: 500 }, width: { xs: '90%', sm: 300, md: 400 }, position: 'absolute', top: { xs: 40, sm: 60, md: 70 } }}>
            <Card sx={{ height: '100%', width: '100%', borderRadius: 3 }}>

              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>


                        <Box sx={{ height: 500, marginLeft: { xs: 3, sm: 3, md: 5 }, marginRight: { xs: 3, sm: 3, md: 5 } }}>

                          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <img style={{ height: 120 }} src={logo} />
                          </Box>



                          <Typography sx={{ textAlign: 'left', fontSize: { xs: 11, sm: 13 }, fontWeight: '600', marginTop: 3, marginBottom: 0.1 }}>Email Id</Typography>
                          <Box sx={{ border: 1, borderRadius: 1, borderColor: '#a2a2a6' }}>
                            <TextField
                              size='small'
                              sx={{
                                padding: 0.5, "& input::placeholder": {
                                  fontSize: "13px"
                                }
                              }}
                              fullWidth
                              id="input-with-icon-textfield"
                              placeholder='Email Id'
                              name='user_name'
                              onChange={(e) => Setusername(e.target.value.trim())}
                              value={username}
                              InputProps={{
                                disableUnderline: true,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon style={{ color: '#a2a2a6' }} />
                                  </InputAdornment>
                                ),
                              }}
                              variant="standard"
                            />

                          </Box>




                          <Typography sx={{ textAlign: 'left', fontSize: { xs: 11, sm: 13 }, fontWeight: '600', marginTop: 1, marginBottom: 0.1 }}>Password</Typography>
                          <Box sx={{ border: 1, borderRadius: 1, borderColor: '#a2a2a6' }}>
                            <TextField
                              id="filled-start-adornment"
                              sx={{
                                padding: 0.5, "& input::placeholder": {
                                  fontSize: "13px"
                                }
                              }}
                              name="password"
                              value={password}
                              onChange={(e) => Setpassword(e.target.value.trim())}
                              placeholder='Your Password'
                              size='small'
                              fullWidth
                              type={showpassword ? 'text' : 'password'}
                              InputProps={{

                                disableUnderline: true,
                                endAdornment: (
                                 
                                 <InputAdornment position="start">
                                    {
                                      showpassword ?
                                        <Visibility style={{ color: '#a2a2a6' }} onClick={() => SetshowPassword(false)} /> :
                                        <VisibilityOff onClick={() => SetshowPassword(true)} style={{ color: '#a2a2a6' }} />
                                    }
                                  </InputAdornment>
                                ),
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockIcon style={{ color: '#a2a2a6' }} />
                                  </InputAdornment>
                                ),
                              }}
                              variant="standard"
                              autoComplete='off'
                              inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                  autocomplete: 'off',
                                },
                              }}
                             renderInput={params => <TextField {...params} name='new-password' />}
                            />

                          </Box>



                          <Typography sx={{ textAlign: 'right', color: 'red', fontSize: '13px', marginTop: 2 }}></Typography>


                          <Box sx={{ marginTop: 8 }}>
                            <Button onClick={login} type='submit' variant="contained" fullWidth size='small' sx={{ backgroundColor: '#2f84cf ' }}>Login</Button>
                          </Box>







                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

              </Grid>
            </Card>
          </Box>
        </Box>
      </Box>


      <Box>
        <Paper elevation={2} sx={{ display: showAlert ? 'flex' : 'none', position: 'absolute', top: 8, right: 15 }}>
          <Alert severity="warning" sx={{ fontSize: 12, fontWeight: '600', paddingLeft: 2 }} onClose={() => { SetshowAlert(false) }}>
            User Not Exists .....
          </Alert>
        </Paper>
      </Box>
    </div>
  )
}

export default Login






























