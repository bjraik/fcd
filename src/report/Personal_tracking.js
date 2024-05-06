import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Input, Paper, Typography } from '@mui/material'
import { Box, Backdrop, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Tooltip, IconButton, Autocomplete, TableBody, Table, Tab, Tabs, Modal, MenuItem, TableContainer, TablePagination, Divider, TableCell, TableHead, TableRow, TextField, InputAdornment, ButtonGroup, } from '@mui/material'
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import Papa from 'papaparse'
import base from '../base'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners'
import { CSVLink } from "react-csv";
import AdjustIcon from '@mui/icons-material/Adjust';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import bg from '../img/bgimg.svg'
import ColorPicker from 'material-ui-color-picker'
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Allocation from './personalTraclingFolder/Allocation'
import Revenue from './personalTraclingFolder/Revenue'
import Billing from './personalTraclingFolder/Billing'
import CountUp from 'react-countup';
import { SketchPicker } from 'react-color'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Manager_allocation from './PersonalTrackingByCampaignManager/Manager_allocation'
import Manager_revenue from './PersonalTrackingByCampaignManager/Manager_revenue'
import EndClientWiseTracking from '../../src/report/PersonalTrackingByCampaignManager/EndClientWiseTracking'
import { Link } from 'react-router-dom'
import { fillClient, fillCompainManager } from '../Utils/AutocompleteOptions'


const drawerWidth = 240;

export class Personal_tracking extends Component {


  constructor(props) {
    super(props)

    this.state = {
      is_loader_open: false,


      is_add_client_open: false,
      tab_value: 'Allocation',
      client_list: [],


      client_id: '',
      prefered_color: '#FFF',
      all_analytics_client: [],



      //////////////////////client analytics related data ////////////////
      AnalyticalData: [],


      all_allocation_list: [],
      all_revenue_list: [],
      yearly_data: [],



      //////////////// end client client wise tracking  //////////////

      is_client: 'client',


      //////////////////  campaign manager wise show data  ///////////

      manager_tab_value: 'Allocation',
      is_add_manager_open: false,


      campaign_manager_id: "",
      campaign_manager_name: "",
      client_id_for_manager: "",


      campaign_manager_list: [],
      campaing_manager_list_analytics: [],    //// this datta comming from seerver 





      manager_allocation: [],   //// data set from server
      manager_revenue: [], /// data set from server
      manager_yearly_revenue_allocation: [],  //// data set from server
      whole_data_from_server: {},  /// data from server  all
      quaterly_list_allocation_revenue_with_camp_manager_client_name: [],





    }
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }



  componentDidMount() {
    //// client_for_anlytics_add_client
    this.setState({ is_loader_open: true }, () => {
      fetch(`${base.base_url}/get_all_analaytics_client`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
      }).then((res) => { return res.json() }).then(async (result) => {
        this.setState({
          all_analytics_client: result.data
        })
      }).then(() => {
        fetch(`${base.base_url}/getAnalyticsDataAll`, {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'content-type': 'application/json',
          },
          method: 'post',

        }).then((res) => { return res.json() }).then(async (result) => {

          this.setState({
            all_allocation_list: result.monthly_allocation,
            all_revenue_list: result.monthly_revenue,
            yearly_data: result.yearly_data_allocation_and_revenue,
            AnalyticalData: result
          })

        })

      })

    })




    //////// all data about campaign manager list and analytics data 

    fetch(`${base.base_url}/retrive_all_campaign_analytics_for_campaign_manager`, {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'content-type': 'application/json',
      },
      method: 'post',
    }).then((res) => { return res.json() }).then(async (result) => {

      // console.log(result)


      this.setState({
        is_loader_open: false,
        manager_allocation: result.monthly_allocation,   /// monthly allocation //// data set from server
        manager_revenue: result.monthly_revenue, /// data set from server
        manager_yearly_revenue_allocation: result.yearly_data_allocation_and_revenue,  //// data set from server
        whole_data_from_server: result,
        quaterly_list_allocation_revenue_with_camp_manager_client_name: result.quaterly_list_allocation_revenue_with_camp_manager_client_name,
      })
    })





    fetch(`${base.base_url}/retriveClientForLeadPage`, {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
      })
    }).then((res) => { return res.json() }).then((result) => {
      this.setState({ client_list: result.data })
    })



    ///// retrive all compIGN MANAGER  LIST DATA DISPLAY 
    fetch(`${base.base_url}/retrive_all_compaign_manager_list`, {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
      })
    }).then((res) => { return res.json() }).then((result) => {
      this.setState({ campaing_manager_list_analytics: result.data })
    })

  }






  /////// client analytics data

  instant_retrive_client_analytics = () => {
    fetch(`${base.base_url}/getAnalyticsDataAll`, {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'content-type': 'application/json',
      },
      method: 'post',

    }).then((res) => { return res.json() }).then(async (result) => {

      this.setState({
        all_allocation_list: result.monthly_allocation,
        all_revenue_list: result.monthly_revenue,
        yearly_data: result.yearly_data_allocation_and_revenue,
        AnalyticalData: result
      })

    })
  }






  //// campaign manager analytics
  _instant_retrive_campaign_manager_analytics_data = () => {

    this.setState({ is_loader_open: true }, () => {

      fetch(`${base.base_url}/retrive_all_campaign_analytics_for_campaign_manager`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
      }).then((res) => { return res.json() }).then(async (result) => {

        this.setState({
          is_loader_open: false,
          manager_allocation: result.monthly_allocation,   /// monthly allocation //// data set from server
          manager_revenue: result.monthly_revenue, /// data set from server
          manager_yearly_revenue_allocation: result.yearly_data_allocation_and_revenue,  //// data set from server
          whole_data_from_server: result

        })
      })
    })


  }

  ///////// camapaign manager list

  instant_retrive_camapign_manager_list = () => {


    this.setState({ is_loader_open: true }, () => {
      fetch(`${base.base_url}/retrive_all_compaign_manager_list`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
        })
      }).then((res) => { return res.json() }).then((result) => {
        this.setState({ campaing_manager_list_analytics: result.data, is_loader_open: false })
      })
    })

  }



  instant_retrive_listed_client_for_analytics = () => {
    this.setState({ is_loader_open: true }, () => {
      fetch(`${base.base_url}/get_all_analaytics_client`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',

      }).then((res) => { return res.json() }).then(async (result) => {

        this.setState({
          all_analytics_client: result.data,
          is_loader_open: false
        })
      })

    })

  }





  deleteSingleClientForAnalytics = (client_id) => {
    this.setState({ is_loader_open: true }, () => {

      fetch(`${base.base_url}/delete_single_analytics_client`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          client_id: client_id
        })
      }).then((res) => { return res.json() }).then(async (result) => {

        this.setState({ is_loader_open: false })

        this.instant_retrive_listed_client_for_analytics();
        this.instant_retrive_client_analytics();
        this.deleted();

      })
    })

  }






  add_client = () => {
    /// client_for_anlytics_add_client
    if (this.state.client_id !== "" && this.state.prefered_color !== "") {
      fetch(`${base.base_url}/client_for_anlytics_add_client`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          client_id: this.state.client_id,
          color: this.state.prefered_color,
        })

      }).then((res) => { return res.json() }).then(async (result) => {

        this.success(result.data);
        this.instant_retrive_listed_client_for_analytics();
        this.instant_retrive_client_analytics();
        this.setState({
          is_add_client_open: false,
          client_id: "",
        })

      })


    } else {
      this.fillAllFields();
    }

  }



  fillAllFields = () => {
    toast.error(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Fill All Fields</Typography>, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      icon: "🚀",
      theme: "colored",
    });
  }

  success = (data) => {
    toast.info(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>{data}</Typography>, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      icon: "🚀",
      theme: "colored",
    });
  }


  deleted = () => {
    toast.info(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Client Removed</Typography>, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      icon: "🚀",
      theme: "colored",
    });
  }


  ///////////////////// camapign manager function //////////////////

  campaign_manager_removed = () => {
    toast.info(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Campaign Manager Removed</Typography>, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      icon: "🚀",
      theme: "colored",
    });
  }

  retriveCampaignMnager = (client_id) => {

    fetch(`${base.base_url}/retriveAllContactForAnalytics`, {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        client_id: client_id
      })
    }).then((res) => { return res.json() }).then(async (result) => {
      // console.log(result)
      this.setState({
        campaign_manager_list: result.data
      })

    })

  }


  clientMisMatch = () => {
    toast.info(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Client Miss Match</Typography>, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      icon: "🚀",
      theme: "colored",
    });
  }

  add_campaign_manager = () => {
    if (this.state.campaign_manager_id !== "" && this.state.campaign_manager_name !== "" && this.state.client_id_for_manager !== "") {

      this.setState({ is_loader_open: true }, () => {
        fetch(`${base.base_url}/add_campaign_manager_for_analytics`, {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'content-type': 'application/json',
          },
          method: 'post',
          body: JSON.stringify({
            client_id: this.state.client_id_for_manager,
            campaign_manager_id: this.state.campaign_manager_id,
            campaign_manager_name: this.state.campaign_manager_name
          })
        }).then((res) => { return res.json() }).then(async (result) => {

          if (result.status == false) {
            this.clientMisMatch();
            this.setState({
              is_add_manager_open: false,
              is_loader_open: false,
              client_id_for_manager: "",
              campaign_manager_id: "",
              campaign_manager_name: "",
            })
          } else {
            this.success("Campaign manager Added");
            this.setState({
              is_add_manager_open: false,
              is_loader_open: false,
              client_id_for_manager: "",
              campaign_manager_id: "",
              campaign_manager_name: "",
            })
            this._instant_retrive_campaign_manager_analytics_data();
            this.instant_retrive_camapign_manager_list()
          }

        })

      })


    }
  }





  deleteCampaignManager = (id) => {
    this.setState({ is_loader_open: true }, () => {
      fetch(`${base.base_url}/delete_campaign_manager_for_analytics`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'delete',
        body: JSON.stringify({
          campaign_manager_id: id
        })
      }).then((res) => { return res.json() }).then(async (result) => {
        this._instant_retrive_campaign_manager_analytics_data();
        this.instant_retrive_camapign_manager_list()
        this.setState({ is_loader_open: false });
        this.campaign_manager_removed();
      })
    })
  }



  render() {

    let client_list_data = [];

    for (let i = 0; i < this.state.client_list.length; i++) {
      let jsonData = this.state.client_list[i];
      jsonData.label = this.state.client_list[i].client_name
      client_list_data.push(jsonData);
    }


    return (
      <div>

        <Box sx={{ display: 'flex' }}>
          <Sidebarc />
          <Box sx={{ width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' }, }}>
            <Box sx={{ p: { xs: 1, sm: 3 }, mt: 6 }}>
              <Typography sx={{ fontSize: { xs: 17, sm: 21, marginTop: 3, marginBottom: 3 }, mt: { xs: 2, sm: 2, md: 1 }, mb: 1, paddingLeft: { xs: 1, sm: 2, md: 3 }, fontWeight: '500', color: '#3e3e40' }}>Personal Tracking</Typography>



              <Box>
                <ButtonGroup size='small' variant="contained" disableElevation aria-label="Basic button group">
                  <Button size='small' onClick={() => this.setState({ is_client: 'client' })} variant={this.state.is_client == "client" ? 'contained' : 'outlined'} sx={{ textTransform: 'none' }}>Client Tracking</Button>
                  <Button size='small' onClick={() => this.setState({ is_client: "campaign" })} variant={this.state.is_client == "campaign" ? 'contained' : 'outlined'} sx={{ textTransform: 'none' }}>Campaign Manager</Button>
                  <Button size='small' onClick={() => this.setState({ is_client: "end_client" })} variant={this.state.is_client == "end_client" ? 'contained' : 'outlined'} sx={{ textTransform: 'none' }}>End Client</Button>
                </ButtonGroup>
              </Box>



              {
                ///////   client tracking 
              }


              <Box sx={{ display: this.state.is_client == "client" ? 'block' : 'none' }}>

                <Box sx={{ width: '100%', pt: 1.5 }}>
                  <Paper sx={{ height: 50, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', overflow: 'scroll', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}>

                    <Box sx={{ minWidth: { xs: 500, sm: '100%' }, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', overflow: 'scroll', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                        {
                          this.state.all_analytics_client.map((data) => (

                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', border: 1, borderRadius: 2, mt: 1, ml: 0.5, mb: 1, backgroundColor: '#f8f9ff', borderColor: 'rgba(3,144,251,0.1)' }}>
                              <AdjustIcon sx={{ height: 16, width: 16, paddingLeft: { xs: 0.5, sm: 0.5, md: 0.5 }, color: '#0390fb' }} />

                              <Typography sx={{ fontSize: 12, fontWeight: '550', paddingRight: { xs: 0.5, sm: 0.5, md: 0.5 }, whiteSpace: 'nowrap', paddingLeft: { xs: 0.5, sm: 0.5, md: 0.5 }, color: '#666666', textTransform: 'uppercase' }}>{data.client_name}</Typography>


                              <Tooltip title='Delete'>
                                <HighlightOffIcon onClick={() => this.deleteSingleClientForAnalytics(data.client_id)} sx={{ height: 16, width: 16, paddingLeft: { xs: 0.5, sm: 0.5, md: 0.5 }, paddingRight: { xs: 0.5, sm: 0.5, md: 0.5 }, color: '#f29494 ' }} />
                              </Tooltip>
                            </Box>

                          ))

                        }
                      </Box>




                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2, mr: { xs: 1, sm: 2, md: 3 } }}>
                        <Button onClick={() => this.setState({ is_add_client_open: true })} component="label" sx={{ textTransform: 'none', whiteSpace: 'nowrap', height: 27, backgroundColor: '#008ffb', fontWeight: '600' }} disableElevation variant="contained" startIcon={<AddIcon sx={{ color: '#fff' }} />}>
                          Add Client
                        </Button>
                      </Box>
                    </Box>

                  </Paper>
                </Box>




                <Paper sx={{ width: '100%', minHeight: 10, mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', borderBottom: 1, borderColor: '#e0e0e0 ' }}>
                    <Tabs
                      value={this.state.tab_value}
                      //onChange={this.handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="tab-selector"
                    >
                      <Tab value="Allocation" sx={{ fontSize: 14, fontWeight: '550', textTransform: 'none', color: '' }} label="Allocation" onClick={() => this.setState({ tab_value: "Allocation" })} />
                      <Tab value="Revenue" sx={{ fontSize: 14, fontWeight: '550', textTransform: 'none' }} label="Revenue" onClick={() => this.setState({ tab_value: "Revenue" })} />
                      <Tab value="billing" sx={{ fontSize: 14, fontWeight: '550', textTransform: 'none' }} label="Billing" onClick={() => this.setState({ tab_value: "billing" })} />
                    </Tabs>
                  </Box>


                  {
                    //// allocation 
                  }

                  <Box>
                    <Modal
                      open={this.state.is_add_client_open}
                      onClose={this.handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Paper sx={{ width: { xs: '90%', sm: '90%', md: '50%', lg: '28%' }, height: '50vh', backgroundColor: 'white', borderRadius: 2 }}>

                          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <Paper onClick={() => this.setState({ is_add_client_open: false })} elevation={5} sx={{ height: 30, width: 30, borderRadius: 1, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', mr: -1, mt: -1 }}>
                              <CloseIcon sx={{ height: 20, width: 20, color: '#2486bb' }} />
                            </Paper>
                          </Box>

                          <Typography sx={{ fontSize: 18, fontWeight: '600', paddingLeft: { xs: 2, sm: 4 }, mb: 2 }}>Add Client</Typography>
                          <Box sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { width: '5px', borderRadius: 10 } }}>

                            <Box sx={{ paddingLeft: { xs: 2, sm: 4 }, paddingRight: { xs: 2, sm: 4 }, height: '76vh' }}>


                              <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Client Name<Typography sx={{ color: 'red' }}>*</Typography></Typography>

                              <Autocomplete
                                disablePortal
                                size='small'
                                ListboxProps={{
                                  sx: { fontSize: 12, fontWeight: '600', maxHeight: 150 },
                                }}
                                fullWidth
                                id="combo-box-demo"
                                onChange={(e, data) => { this.setState({ client_id: data.client_id }) }}

                                options={client_list_data}
                                sx={{ width: 300, fontSize: 10, mr: 1 }}
                                renderInput={(params) => <TextField {...params} label="" />}
                              />

                              <Button variant='contained' onClick={this.add_client} disableElevation size='small' sx={{ backgroundColor: '#2486bb', mt: 5, textTransform: 'none' }}>
                                Add Client
                              </Button>



                            </Box>
                          </Box>
                        </Paper>
                      </Box>
                    </Modal>
                  </Box>
                </Paper>


                <Box sx={{ display: this.state.tab_value == 'Allocation' ? 'block' : 'none', mt: 1 }}>
                  <Allocation monthly_allocation={this.state.all_allocation_list} quaterly_allocation={this.state.AnalyticalData ? this.state.AnalyticalData.quaterly_client_allocation_and_revenue ? this.state.AnalyticalData.quaterly_client_allocation_and_revenue : [] : []} year_list={this.state.AnalyticalData.year_list} yearly_revenue_and_allocation={this.state.yearly_data} data={this.state.AnalyticalData} />
                </Box>


                {
                  ///// Revenue
                }
                <Box sx={{ display: this.state.tab_value == 'Revenue' ? 'block' : 'none', mt: 1 }}>
                  <Revenue monthly_revenue={this.state.all_revenue_list} year_list={this.state.AnalyticalData.year_list} quaterly_revenue={this.state.AnalyticalData ? this.state.AnalyticalData.quaterly_client_allocation_and_revenue ? this.state.AnalyticalData.quaterly_client_allocation_and_revenue : [] : []} yearly_revenue_and_allocation={this.state.yearly_data} data={this.state.AnalyticalData} />
                </Box>


                <Box sx={{ display: this.state.tab_value == 'billing' ? 'block' : 'none', mt: 1 }}>
                  <Billing />
                </Box>

              </Box>


              {
                ////// campaign manager wise trackign
              }



              <Box sx={{ display: this.state.is_client == "campaign" ? 'block' : 'none' }}>


                <Box sx={{ width: '100%', pt: 1.5 }}>
                  <Paper sx={{ height: 50, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', overflow: 'scroll', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}>

                    <Box sx={{ minWidth: { xs: 500, sm: '100%' }, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', overflow: 'scroll', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}>

                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                        {
                          this.state.campaing_manager_list_analytics.map((data) => (

                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', backgroundColor: '#f8f9ff', border: 1, borderRadius: 2, mt: 1, ml: 0.5, mb: 1, borderColor: 'rgba(3,144,251,0.1)' }}>
                              <AdjustIcon sx={{ height: 16, width: 16, paddingLeft: { xs: 0.5, sm: 0.5, md: 0.5 }, color: '#0390fb' }} />
                              <Typography sx={{ fontSize: 12, fontWeight: '550', paddingRight: { xs: 0.5, sm: 0.5, md: 0.5 }, whiteSpace: 'nowrap', paddingLeft: { xs: 0.5, sm: 0.5, md: 0.5 }, color: '#666666', textTransform: 'uppercase' }}>{data.campaign_manager_name}</Typography>
                              <Tooltip title='Delete'>
                                <HighlightOffIcon onClick={() => this.deleteCampaignManager(data.campain_manager_id)} sx={{ height: 16, width: 16, paddingLeft: { xs: 0.5, sm: 0.5, md: 0.5 }, paddingRight: { xs: 0.5, sm: 0.5, md: 0.5 }, color: '#f29494 ' }} />
                              </Tooltip>
                            </Box>

                          ))

                        }
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2, mr: { xs: 1, sm: 2, md: 3 } }}>
                        <Button onClick={() => this.setState({ is_add_manager_open: true })} component="label" sx={{ textTransform: 'none', whiteSpace: 'nowrap', height: 27, backgroundColor: '#008ffb', fontWeight: '600' }} disableElevation variant="contained" startIcon={<AddIcon sx={{ color: '#fff' }} />}>
                          Campaign Manager
                        </Button>
                      </Box>

                    </Box>
                  </Paper>
                </Box>




                <Paper sx={{ width: '100%', minHeight: 10, mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', borderBottom: 1, borderColor: '#e0e0e0 ' }}>
                    <Tabs
                      value={this.state.manager_tab_value}
                      //onChange={this.handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="tab-selector"
                    >
                      <Tab value="Allocation" sx={{ fontSize: 14, fontWeight: '550', textTransform: 'none', color: '' }} label="Allocation" onClick={() => this.setState({ manager_tab_value: "Allocation" })} />
                      <Tab value="Revenue" sx={{ fontSize: 14, fontWeight: '550', textTransform: 'none' }} label="Revenue" onClick={() => this.setState({ manager_tab_value: "Revenue" })} />
                    </Tabs>
                  </Box>



                  <Box>
                    <Modal
                      open={this.state.is_add_manager_open}
                      onClose={this.handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Paper sx={{ width: { xs: '90%', sm: '90%', md: '50%', lg: '28%' }, height: '50vh', backgroundColor: 'white', borderRadius: 2 }}>

                          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                            <Paper onClick={() => this.setState({ is_add_manager_open: false })} elevation={5} sx={{ height: 30, width: 30, borderRadius: 1, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', mr: -1, mt: -1 }}>
                              <CloseIcon sx={{ height: 20, width: 20, color: '#2486bb' }} />
                            </Paper>
                          </Box>

                          <Typography sx={{ fontSize: 18, fontWeight: '600', paddingLeft: { xs: 2, sm: 4 }, mb: 2 }}>Add Campaign Manager</Typography>
                          <Box sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { width: '5px', borderRadius: 10 } }}>

                            <Box sx={{ paddingLeft: { xs: 2, sm: 4 }, paddingRight: { xs: 2, sm: 4 }, height: '76vh' }}>


                              <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Client Name<Typography sx={{ color: 'red' }}>*</Typography></Typography>

                              <Autocomplete
                              disablePortal
                              id="compaign-client-list"
                              options={fillClient(this.state?.client_list)}
                              size="small"
                              getOptionLabel={(option) => option?.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={
                                    params?.inputProps?.value !== ""
                                      ? params?.inputProps?.value
                                      : "Select Client Name"
                                  }
                                />
                              )}
                              onChange={(e, data) =>
                                this.setState(
                                  {
                                    client_id_for_manager: data?.client_id,
                                    campaign_manager_name:"",
                                    campaign_manager_id:""
                                  
                                  },
                                  () => {
                                    this.retriveCampaignMnager(
                                      data?.client_id
                                    );
                                  }
                                )
                              }
                            />
                              {/* <Autocomplete
                                disablePortal
                                size='small'
                                ListboxProps={{
                                  sx: { fontSize: 12, fontWeight: '600', maxHeight: 150 },
                                }}
                                fullWidth
                                id="combo-box-demo"
                                onChange={(e, data) => {
                                  this.setState({ client_id_for_manager: data.client_id }, () => {
                                    this.retriveCampaignMnager(data.client_id);
                                  })
                                }}

                                options={client_list_data}
                                sx={{ width: 300, fontSize: 10, mr: 1 }}
                                renderInput={(params) => <TextField size='small' {...params} label="" />}
                              /> */}


                              <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Campaign Manager<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                             
                             
                              <Autocomplete
                              disablePortal
                              id="compaign-campaign-manager-list"
                              options={fillCompainManager(this.state?.campaign_manager_list)}
                              size="small"
                              getOptionLabel={(option) => option?.label}
                              
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={
                                    params?.inputProps?.value !== ""
                                      ? params?.inputProps?.value
                                      : "Select Campaign Manager"
                                  }
                                />
                              )}
                              onChange={(e, data) =>
                                this.setState({ campaign_manager_name: data?.label, campaign_manager_id: data?.id })
                              }
                            />
                           

                              {/* <TextField onChange={this.handleChange} select type='text' InputProps={{ sx: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' } }} value={this.state.campaign_manager_name} name="campaign_manager_name" fullWidth size='small'>
                                {this.state.campaign_manager_list.map((option) => (
                                  <MenuItem
                                   onClick={() => this.setState({ campaign_manager_name: option.first_name + " " + option.last_name, campaign_manager_id: option.contact_id })} 
                                   key={option.contact_id} sx={{ fontSize: 12, fontWeight: '600' }} value={option.first_name + " " + option.last_name}>
                                    {option.first_name + " " + option.last_name}
                                  </MenuItem>
                                ))}
                              </ TextField > */}


                              <Button variant='contained' onClick={this.add_campaign_manager} disableElevation size='small' sx={{ backgroundColor: '#2486bb', mt: 5, textTransform: 'none' }}>
                                Add campaign manger
                              </Button>


                              <Box>
                                <Backdrop
                                  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(118,164,201,0.1)' }}
                                  open={this.state.is_loader_open}
                                //this.state.is_loader_open
                                >
                                  <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <CircularProgress size={80} sx={{ color: '#0088cc' }} thickness={1} />
                                  </Paper>
                                </Backdrop>
                              </Box>




                            </Box>
                          </Box>
                        </Paper>
                      </Box>
                    </Modal>
                  </Box>
                </Paper>



                <Box sx={{ display: this.state.manager_tab_value == 'Allocation' ? 'block' : 'none', mt: 1 }}>
                  <Manager_allocation monthly_allocation={this.state.manager_allocation} quaterly_allocation={this.state.quaterly_list_allocation_revenue_with_camp_manager_client_name} year_list={this.state.whole_data_from_server.year_list} yearly_revenue_and_allocation={this.state.manager_yearly_revenue_allocation} data={this.state.whole_data_from_server} />
                </Box>


                {
                  ///// Revenue
                }


                <Box sx={{ display: this.state.manager_tab_value == 'Revenue' ? 'block' : 'none', mt: 1 }}>
                  <Manager_revenue quaterly_revenue={this.state.quaterly_list_allocation_revenue_with_camp_manager_client_name} monthly_revenue={this.state.manager_revenue} year_list={this.state.whole_data_from_server.year_list} yearly_revenue_and_allocation={this.state.manager_yearly_revenue_allocation} data={this.state.whole_data_from_server} />
                </Box>

              </Box>




              {
                //// end client wise tracking and foundation
              }





              <Box sx={{ display: this.state.is_client == "end_client" ? 'block' : 'none' }}>
                <EndClientWiseTracking />
              </Box>



            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', position: 'fixed', top: 0, left: { xs: 0, sm: 240 } }}>
          <Appheaderc />
        </Box>




        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />






        <Box>
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(118,164,201,0.1)' }}
            open={this.state.is_loader_open}
          //this.state.is_loader_open
          >
            <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
              <CircularProgress size={80} sx={{ color: '#0088cc' }} thickness={1} />
            </Paper>
          </Backdrop>
        </Box>




        <Box>
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(118,164,201,0.1)' }}
            open={this.state.is_loader_open}
          >
            <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
              <CircularProgress size={80} sx={{ color: '#0088cc' }} thickness={1} />
            </Paper>
          </Backdrop>
        </Box>



      </div>
    )
  }
}

export default Personal_tracking


/*

{
  //// allocatipo 
}

<Box sx={{display:this.state.tab_value=='Allocation'?'block':'none',mt:1}}>
  <Allocation  data={this.state.AllAnalytics_data}/>
</Box>




{
  ///// Revenue
}
<Box sx={{display:this.state.tab_value=='Revenue'?'block':'none',mt:1}}>
  <Revenue  data={this.state.AllAnalytics_data}/>
</Box>



{
  ///// Billing
}


<Box sx={{display:this.state.tab_value=='Billing'?'block':'none',mt:1}}>
  <Billing  data={this.state.AllAnalytics_data}/>
</Box>

*/