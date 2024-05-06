import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Paper, Typography } from '@mui/material'
import { Box, Backdrop, CircularProgress, Button, Tab, Modal, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Tabs from '@mui/material/Tabs';
import Overview from './Overview'
import ClientList, { ClientListc } from './ClientList'
import ClientContactmain from './ClientContactmain'
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from 'rc-checkbox';
import { useNavigate, useLocation, useMatch, Link } from 'react-router-dom';

const drawerWidth = 240;

export class Client extends Component {

  constructor(props) {
    super(props)

    this.state = {
      is_loader_open: true,
      tab_value: "overview",
      form_open: false,


      client_role: JSON.parse(sessionStorage.getItem('client_role'))
    }
  }

  componentDidMount() {





  }

  render() {
    return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <Sidebarc />
          <Box sx={{ width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' }, }}>
            <Box sx={{ p: { xs: 1, sm: 3 }, mt: 6 }}>

              <Typography sx={{ fontSize: { xs: 17, sm: 21, marginTop: 3, marginBottom: 3 }, marginLeft: 1, mt: { xs: 2, sm: 2, md: 1 }, mb: 1, fontWeight: '500', color: '#3e3e40' }}>Clients</Typography>

              <Box sx={{ height: 50, width: '100%' }}>
                <Paper sx={{ height: 50, width: '100%', display: 'flex', justifyContent: 'space-between', overflow: 'scroll', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}>

                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 1, mr: 6 }}>
                    <Tabs
                      value={this.state.tab_value}
                      //onChange={this.handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="tab-selector"
                    >
                      <Tab value="overview" sx={{ fontSize: 14, fontWeight: '550', textTransform: 'none', color: '' }} label="Overview" onClick={() => this.setState({ tab_value: "overview" })} />
                      <Tab value="clientlist" sx={{ fontSize: 14, fontWeight: '550', textTransform: 'none' }} label="Client" onClick={() => this.setState({ tab_value: "clientlist" })} />
                    </Tabs>
                  </Box>


                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: { xs: 1, sm: 2, md: 3 } }}>
                    <Button disabled={this.state.client_role.is_create ? false : true} onClick={() => this.props.navigate('/client/add')} component="label" sx={{ textTransform: 'none', whiteSpace: 'nowrap', textAlign: 'center', height: 27, backgroundColor: '#259efa', ml: 2, fontWeight: '600' }} disableElevation variant="contained" startIcon={<AddIcon sx={{ color: '#fff' }} />}>
                      Add Client
                    </Button>
                  </Box>

                </Paper>
              </Box>
















              {
                this.state.tab_value == "overview" ? <Overview /> : this.state.tab_value == "clientlist" ? <ClientListc /> : null
              }








































            </Box>
          </Box>
        </Box>












        <Box sx={{ display: 'flex', position: 'fixed', top: 0, left: { xs: 0, sm: 240 } }}>
          <Appheaderc />
        </Box>

        <Box sx={{ display: 'none', position: 'fixed', bottom: 40, right: 10 }}>
          <Chat />
        </Box>








        <Box>
          <Modal
            open={this.state.form_open}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
              <Paper sx={{ width: { xs: '90%', sm: '90%', md: '60%', lg: '40%' }, height: '90vh', backgroundColor: 'white', borderRadius: 2 }}>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                  <Paper onClick={() => this.setState({ form_open: false })} elevation={5} sx={{ height: 30, width: 30, borderRadius: 1, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', mr: -1, mt: -1 }}>
                    <CloseIcon sx={{ height: 20, width: 20, color: '#2486bb' }} />
                  </Paper>
                </Box>

                <Typography sx={{ fontSize: 18, fontWeight: '600', paddingLeft: { xs: 2, sm: 4 }, mb: 2 }}>Add Client</Typography>
                <Box sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { width: '5px', borderRadius: 10 } }}>

                  <Box sx={{ paddingLeft: { xs: 2, sm: 4 }, paddingRight: { xs: 2, sm: 4 }, height: '76vh' }}>


                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, display: 'flex', flexDirection: 'row' }}>Type<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox />
                        <Typography sx={{ fontSize: 11 }}>Organization</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 2, alignItems: 'center' }}>
                        <Checkbox />
                        <Typography sx={{ fontSize: 11 }}>Persion</Typography>
                      </Box>
                    </Box>






                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, display: 'flex', flexDirection: 'row' }}>Compaign<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField select InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="first_name" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Owner<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField type='number' InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="first_name" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Address<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="date" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>City<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField type='text' InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="first_name" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Zip<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField type='text' InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="first_name" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Country<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="date" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Phone<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField type='text' InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="first_name" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Website<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField type='text' InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="first_name" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>GST No.<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="date" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Client Group<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField type='text' InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="first_name" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Currency<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField type='text' InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="first_name" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Currenct Symbol<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="date" fullWidth size='small' />

                    <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Note<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                    <TextField type='text' InputProps={{ sx: { fontSize: 12, fontWeight: '600', height: 60 } }} name="first_name" fullWidth size='small' />



                    <Button variant='contained' disableElevation size='small' sx={{ backgroundColor: '#2486bb', mt: 2, textTransform: 'none' }}>
                      save
                    </Button>

                  </Box>
                </Box>
              </Paper>
            </Box>
          </Modal>
        </Box>







      </div>
    )
  }
}

export default Client


export function Clientc(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return (<Client location={location} navigate={navigate}></Client>)
}