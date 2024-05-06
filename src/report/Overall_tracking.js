import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Input, Paper, Typography, Grid } from '@mui/material'
import { Box, Backdrop, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Tooltip, Link, IconButton, TableBody, FormControl, Select, InputLabel, Table, Tab, Tabs, Modal, MenuItem, TableContainer, TablePagination, Divider, TableCell, TableHead, TableRow, TextField, InputAdornment,Autocomplete } from '@mui/material'
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
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { fillClient, fillStatus, fillCompainManager, fillDepartment, fillEndClient } from '../Utils/AutocompleteOptions'


const drawerWidth = 240;

export class Overall_tracking extends Component {


  constructor(props) {
    super(props)

    this.state = {
      open_loader_for_edit_page_popup: false,

      allCampaignData: [],
      allCampaignCounts: 0,
      client_list: [],
      client_id: "",
      search: "",

      is_loader_open: false,
      page: 0,
      rowsPerPage: 10,




      /////////////////////////////////

      total_allocation: 0,
      total_revenue: 0,
      total_dilivered: 0,
      total_billing: 0,





















      //////////////////  search data for //////////////

      client_id_search: "",
      client_name_search: "",

      end_client_id_search: "",
      end_client_name_search: "",

      campaign_manager_id_search: "",
      campaign_manager_name_search: "",

      department_id_search: "",
      department_name_search: "",




      status_search: "",

      start_date_search: null,
      end_date_search: null,

      ///// arary
      endClientListSearchList: [],
      departmentLIstForSearch: [],
      campaignManagerSearchList: [],

      ///////////////////////////////// ////// ref

      client_id_search_ref: "",

      end_client_id_search_ref: "",

      campaign_manager_id_search_ref: "",

      department_id_search_ref: "",


    }
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }



  componentDidMount() {
    this.setState({ is_loader_open: true }, () => {
      fetch(`${base.base_url}/getOverAllTrakingOfCampaign`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({

          status: this.state.status_search,

          search_client_id: this.state.client_id_search_ref,

          end_client_id_search: this.state.end_client_id_search_ref,

          campaign_manager_id_search: this.state.campaign_manager_id_search_ref,

          department_id_search: this.state.department_id_search_ref,


          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage

        })

      }).then((res) => { return res.json() }).then(async (result) => {

        this.setState({
          allCampaignCounts: result.counts,
          allCampaignData: result.data,
        })

      }).then(() => {

        fetch(`${base.base_url}/getOverAllTrakingOfCampaignOfAllMedel`, {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'content-type': 'application/json',
          },
          method: 'post',

        }).then((res) => { return res.json() }).then(async (ee) => {

          this.setState({
            is_loader_open: false,
            total_allocation: ee.total_allocation,
            total_revenue: ee.total_revenue,
            total_dilivered: ee.total_dilivered,
            total_billing: ee.total_billing,
          })


        })

      })

    })

    ///// retrive client  list for data //////////
    this.retriveClintList();
  }






  retriveClintList = () => {
    fetch(`${base.base_url}/retriveAllClients`, {
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

  }



  instantRetriveCamp = () => {
    this.setState({ is_loader_open: true }, () => {

      fetch(`${base.base_url}/getOverAllTrakingOfCampaign`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({

          status: this.state.status_search,

          search_client_id: this.state.client_id_search_ref,

          end_client_id_search: this.state.end_client_id_search_ref,

          campaign_manager_id_search: this.state.campaign_manager_id_search_ref,

          department_id_search: this.state.department_id_search_ref,


          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })

      }).then((res) => { return res.json() }).then(async (result) => {
        this.setState({
          is_loader_open: false,
          allCampaignData: result.data,
          allCampaignCounts: result.counts,
        })

      })


    })
  }






  seachByCampaignNmae = (e) => {

    this.setState({ [e.target.name]: e.target.value, is_loader_open: true }, () => {

      fetch(`${base.base_url}/getOverAllTrakingOfCampaign`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({

          status: this.state.status_search,

          search_client_id: this.state.client_id_search_ref,

          end_client_id_search: this.state.end_client_id_search_ref,

          campaign_manager_id_search: this.state.campaign_manager_id_search_ref,

          department_id_search: this.state.department_id_search_ref,

          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })

      }).then((res) => { return res.json() }).then(async (result) => {

        this.setState({
          is_loader_open: false,
          allCampaignCounts: result.counts,
          allCampaignData: result.data,
        })

      })

    })
  }






  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage, is_loader_open: true }, () => {

      fetch(`${base.base_url}/getOverAllTrakingOfCampaign`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({

          status: this.state.status_search,

          search_client_id: this.state.client_id_search_ref,

          end_client_id_search: this.state.end_client_id_search_ref,

          campaign_manager_id_search: this.state.campaign_manager_id_search_ref,

          department_id_search: this.state.department_id_search_ref,

          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })

      }).then((res) => { return res.json() }).then(async (result) => {

        this.setState({
          is_loader_open: false,
          allCampaignCounts: result.counts,
          allCampaignData: result.data,
        })

      })



    })
  };




  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) })
    this.setState({ page: 0, is_loader_open: true }, () => {

      fetch(`${base.base_url}/getOverAllTrakingOfCampaign`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({

          status: this.state.status_search,

          search_client_id: this.state.client_id_search_ref,

          end_client_id_search: this.state.end_client_id_search_ref,

          campaign_manager_id_search: this.state.campaign_manager_id_search_ref,

          department_id_search: this.state.department_id_search_ref,

          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })

      }).then((res) => { return res.json() }).then(async (result) => {

        this.setState({
          is_loader_open: false,
          allCampaignCounts: result.counts,
          allCampaignData: result.data,
        })

      })
    })
  };










  /////////////// search data will dispaly 


  retriveEndClientAndDepartmentForSearch = (client_id) => {

    this.setState({ open_loader_for_edit_page_popup: true })
    fetch(`${base.base_url}/retriveDepartmentForCampaignPage`, {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        client_id: client_id
      })
    }).then((res) => { return res.json() }).then((result) => {
      this.setState({ departmentLIstForSearch: result.data })
    }).then(() => {

      fetch(`${base.base_url}/retriveEndClientDataForCampaignSElection`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          client_id: client_id
        })
      }).then((res) => { return res.json() }).then((result) => {
        this.setState({
          endClientListSearchList: result.data,
          open_loader_for_edit_page_popup: false
        })
      })

    })

  }



  retriveCampaignManagerForSearch = (department_id) => {
    this.setState({ open_loader_for_edit_page_popup: true })
    fetch(`${base.base_url}/retriveContactForCampaign`, {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        department_id: department_id
      })
    }).then((res) => { return res.json() }).then((result) => {
      this.setState({ campaignManagerSearchList: result.data, open_loader_for_edit_page_popup: false })
    })

  }




  render() {
    return (
      <div>

        <Box sx={{ display: 'flex' }}>
          <Sidebarc />
          <Box sx={{ width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' }, }}>
            <Box sx={{ p: { xs: 1, sm: 3 }, mt: 6 }}>
              <Typography sx={{ fontSize: { xs: 17, sm: 21, marginTop: 3, marginBottom: 3 }, mt: { xs: 2, sm: 2, md: 1 }, mb: 1, paddingLeft: { xs: 1, sm: 2, md: 3 }, fontWeight: '500', color: '#3e3e40' }}>Overall Tracking</Typography>




              <Grid container spacing={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ height: 80, backgroundColor: '#fff', borderRight: 6, borderRightColor: '#00a3ff' }}>

                    <Box sx={{ height: 45, width: '100%', borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <ExploreIcon sx={{ color: '#33339c', marginLeft: 1, height: 25, width: 25 }} />
                      <Typography sx={{ fontWeight: '700', fontSize: 17, marginLeft: 0.8, color: '#33339c' }}>Total Allocation</Typography>
                    </Box>

                    <Typography sx={{ textAlign: 'right', marginRight: 1, fontWeight: '800', fontSize: 20 }}> <CountUp start={0} end={this.state.total_allocation} /></Typography>

                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ height: 80, backgroundColor: '#fff', borderRight: 6, borderRightColor: '#fe964a' }}>
                    <Box sx={{ height: 45, width: '100%', borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <DescriptionIcon sx={{ color: '#33339c', marginLeft: 1, height: 25, width: 25 }} />
                      <Typography sx={{ fontWeight: '700', fontSize: 17, marginLeft: 0.8, color: '#33339c' }}>Delivered Leads</Typography>
                    </Box>
                    <Typography sx={{ textAlign: 'right', marginRight: 1, fontWeight: '800', fontSize: 20 }}><CountUp start={0} end={this.state.total_dilivered} /></Typography>

                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ height: 80, backgroundColor: '#fff', borderRight: 6, borderRightColor: '#28176f' }}>
                    <Box sx={{ height: 45, width: '100%', borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <PaidIcon sx={{ color: '#33339c', marginLeft: 1, height: 25, width: 25 }} />
                      <Typography sx={{ fontWeight: '700', fontSize: 17, marginLeft: 0.8, color: '#33339c' }}>Total Revenue</Typography>
                    </Box>

                    <Typography sx={{ textAlign: 'right', marginRight: 1, fontWeight: '800', fontSize: 20 }}>$ <CountUp start={0} end={this.state.total_revenue} /></Typography>

                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ height: 80, backgroundColor: '#fff', borderRight: 6, borderRightColor: '#9a5252' }}>
                    <Box sx={{ height: 45, width: '100%', borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <AccountBalanceWalletIcon sx={{ color: '#33339c', marginLeft: 1, height: 25, width: 25 }} />
                      <Typography sx={{ fontWeight: '700', fontSize: 17, marginLeft: 0.8, color: '#33339c' }}>Total Billing</Typography>
                    </Box>
                    <Typography sx={{ textAlign: 'right', marginRight: 1, fontWeight: '800', fontSize: 20 }}>$ <CountUp start={0} end={this.state.total_billing} /></Typography>
                  </Paper>
                </Grid>
              </Grid>








              <Box sx={{ mt: 1 }}>
                <Accordion>
                  <AccordionSummary
                    //  sx={{backgroundColor:'#f8f9ff',}}
                    expandIcon={<ArrowDownwardIcon sx={{ color: '#f29494', mr: 1 }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    onClick={() => {
                      this.setState({
                        page: 0,
                        client_id_search: "",
                        client_name_search: "",

                        status_search: "",

                        end_client_id_search: "",
                        end_client_name_search: "",

                        department_id_search: "",
                        department_name_search: "",

                        campaign_manager_id_search: "",
                        campaign_manager_name_search: "",

                        endClientListSearchList: [],
                        departmentLIstForSearch: [],
                        campaignManagerSearchList: [],

                        client_id_search_ref: "",
                        end_client_id_search_ref: "",

                        campaign_manager_id_search_ref: "",
                        department_id_search_ref: ""

                      }, () => {

                        //  this.instantRetriveCam();

                      })

                    }}
                  >
                    <Typography sx={{ fontSize: 15, ml: 1, fontWeight: '600', color: '#6b6b6b' }}>Filters</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ mb: 1 }}>

                      <Grid container spacing={2} rowSpacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ mr: { xs: 0, sm: 1 } }}>

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
                                      : "Select Client"
                                  }
                                />
                              )}
                              onChange={(e, data) =>
                                this.setState(
                                  {
                                    client_id_search: data?.client_id,
                                    client_name_search: data?.client_name,
                                  },
                                  () => {
                                    this.retriveEndClientAndDepartmentForSearch(
                                      data?.client_id
                                    );
                                  }
                                )
                              }
                            />



                            {/* <FormControl fullWidth size='small'>
                              <InputLabel id="demo-simple-select-label" sx={{ fontSize: 13, fontWeight: '600' }}>Select Client</InputLabel>
                              <Select
                                inputProps={{ sx: { fontSize: 13 } }}
                                sx={{ height: 35 }}
                                MenuProps={{ sx: { maxHeight: 300 } }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.client_id_search}
                                label="Select Client"
                                onChange={this.handleChange}
                              >
                                <MenuItem value={1} sx={{ fontSize: 12, fontWeight: '600' }}>Select</MenuItem>

                                {this.state.client_list.map((i) => (
                                  <MenuItem value={i.client_id} sx={{ fontSize: 12, fontWeight: '600' }} onClick={() => this.setState({
                                    client_id_search: i.client_id,
                                    client_name_search: i.client_name,


                                    end_client_id_search: "",
                                    end_client_name_search: "",

                                    department_id_search: "",
                                    department_name_search: "",

                                    campaign_manager_id_search: "",
                                    campaign_manager_name_search: "",

                                    endClientListSearchList: [],
                                    departmentLIstForSearch: [],
                                    campaignManagerSearchList: [],

                                  }, () => {
                                    this.retriveEndClientAndDepartmentForSearch(i.client_id);
                                  })

                                  }>{i.client_name}</MenuItem>
                                ))

                                }



                              </Select>
                            </FormControl> */}
                          </Box>
                        </Grid>



                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ mr: { xs: 0, sm: 1 } }}>
                          <Autocomplete
                              disablePortal
                              id="compaign-end-client-list"
                              options={fillEndClient(
                                this.state?.endClientListSearchList
                              )}
                              size="small"
                              getOptionLabel={(option) => option?.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={
                                    params?.inputProps?.value !== ""
                                      ? params?.inputProps?.value
                                      : "Select End Cliend"
                                  }
                                />
                              )}
                              onChange={(e, data) =>
                                this.setState({
                                  end_client_id_search: data?.id,
                                  end_client_name_search: data?.label,
                                })
                              }
                            />

                            {/* <FormControl fullWidth size='small'>
                              <InputLabel id="demo-simple-select-label" sx={{ fontSize: 12, fontWeight: '600' }}>End Client</InputLabel>
                              <Select
                                inputProps={{ sx: { fontSize: 12 } }}
                                sx={{ height: 35 }}
                                MenuProps={{ sx: { maxHeight: 300 } }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.end_client_id_search}
                                label="End Client"
                                onChange={this.handleChange}
                              >
                                {
                                  this.state.endClientListSearchList.map((i) => (
                                    <MenuItem value={i.id} sx={{ fontSize: 12, fontWeight: '600' }}
                                    onClick={() => this.setState({ end_client_id_search: i.id, end_client_name_search: i.end_client_name })}>{i.end_client_name}</MenuItem>
                                  ))
                                }


                              </Select>
                            </FormControl> */}
                          </Box>
                        </Grid>


                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ mr: { xs: 0, sm: 1 } }}>

                          <Autocomplete
                              disablePortal
                              id="compaign-department-list"
                              options={fillDepartment(
                                this.state.departmentLIstForSearch
                              )}
                              size="small"
                              getOptionLabel={(option) => option?.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={
                                    params?.inputProps?.value !== ""
                                      ? params?.inputProps?.value
                                      : "Select Department "
                                  }
                                />
                              )}
                              onChange={(e, data) =>
                                this.setState(
                                  {
                                    department_id_search: data?.id,
                                    department_name_search: data?.label,
                                    campaign_manager_id_search: "",
                                    campaign_manager_name_search: "",
                                    campaignManagerSearchList: [],
                                  },
                                  () => {
                                    this.retriveCampaignManagerForSearch(
                                      data?.id
                                    );
                                  }
                                )
                              }
                            />

                            {/* <FormControl fullWidth size='small'>
                              <InputLabel id="demo-simple-select-label" sx={{ fontSize: 12, fontWeight: '600' }}>Department</InputLabel>
                              <Select
                                inputProps={{ sx: { fontSize: 12 } }}
                                sx={{ height: 35 }}
                                MenuProps={{ sx: { maxHeight: 300 } }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.department_id_search}
                                label="End Client"
                                onChange={this.handleChange}
                              >
                                {this.state.departmentLIstForSearch.map((i) => (
                                  <MenuItem value={i.department_id} sx={{ fontSize: 12, fontWeight: '600' }} onClick={() => {
                                    this.setState({
                                      department_id_search: i.department_id,
                                      department_name_search: i.department_name,
                                      campaign_manager_id_search: "",
                                      campaign_manager_name_search: "",
                                      campaignManagerSearchList: []
                                    }, () => {

                                      this.retriveCampaignManagerForSearch(i.department_id)

                                    })
                                  }}>{i.department_name}</MenuItem>
                                ))

                                }


                              </Select>
                            </FormControl> */}
                          </Box>
                        </Grid>


                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ mr: { xs: 0, sm: 1 } }}>

                          <Autocomplete
                              disablePortal
                              id="compaign-Manager-list"
                              options={fillCompainManager(
                                this.state.campaignManagerSearchList
                              )}
                              size="small"
                              getOptionLabel={(option) => option?.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={
                                    params?.inputProps?.value !== ""
                                      ? params?.inputProps?.value
                                      : "Select Campaign Manager "
                                  }
                                />
                              )}
                              onChange={(e, data) => {
                                this.setState({
                                  campaign_manager_id_search: data?.id,
                                  campaign_manager_name_search:
                                    data?.label,
                                });
                              }}
                            />

                            {/* <FormControl fullWidth size='small'>
                              <InputLabel id="demo-simple-select-label" sx={{ fontSize: 12, fontWeight: '600' }}>Campaign Manager</InputLabel>
                              <Select
                                inputProps={{ sx: { fontSize: 12 } }}
                                sx={{ height: 35 }}
                                MenuProps={{ sx: { maxHeight: 300 } }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.campaign_manager_id_search}
                                label="Campaign Manager"
                                onChange={this.handleChange}
                              >
                                {this.state.campaignManagerSearchList.map((i) => (
                                  <MenuItem value={i.contact_id} sx={{ fontSize: 12, fontWeight: '600' }}
                                   onClick={() => { this.setState({ campaign_manager_id_search: i.contact_id, campaign_manager_name_search: i.first_name + "" + i.last_name }) }}>{i.first_name + "" + i.last_name}</MenuItem>
                                ))
                                }

                              </Select>
                            </FormControl> */}
                          </Box>
                        </Grid>



                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ mr: { xs: 0, sm: 1 } }}>
                          <Autocomplete
                              disablePortal
                              id="compaign-status-list"
                              options={fillStatus(cc)}
                              size="small"
                              getOptionLabel={(option) => option?.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={
                                    params?.inputProps?.value !== ""
                                      ? params?.inputProps?.value
                                      : "Select Status "
                                  }
                                />
                              )}
                              onChange={(e, data) =>
                                this.setState({
                                  status_search: data?.label,
                                })
                              }
                            />

                            {/* <FormControl fullWidth size='small'>
                              <InputLabel id="demo-simple-select-label" sx={{ fontSize: 12, fontWeight: '600' }}>Status</InputLabel>
                              <Select
                                inputProps={{ sx: { fontSize: 12 } }}
                                sx={{ height: 35 }}
                                MenuProps={{ sx: { maxHeight: 300 } }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.status_search}
                                label="Age"
                                onChange={this.handleChange}
                              >
                                <MenuItem value="" sx={{ fontSize: 12, fontWeight: '600' }} onClick={() => this.setState({ status_search: "" })}>select</MenuItem>
                                {
                                  cc.map((i) => (

                                    <MenuItem value={i.status} sx={{ fontSize: 12, fontWeight: '600' }} onClick={() => this.setState({ status_search: i.status })}>{i.status}</MenuItem>

                                  ))
                                }

                              </Select>
                            </FormControl> */}
                          </Box>
                        </Grid>






                        <Grid item xs={12} sm={6} md={3}>
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>




                            <Button variant='contained' disableElevation sx={{ borderRadius: 1, textTransform: 'none' }} size='small' onClick={() => {

                              this.setState({
                                page: 0,

                                status_search: this.state.status_search,

                                client_id_search_ref: this.state.client_id_search,

                                end_client_id_search_ref: this.state.end_client_id_search,

                                campaign_manager_id_search_ref: this.state.campaign_manager_id_search,

                                department_id_search_ref: this.state.department_id_search



                              }, () => {

                                this.instantRetriveCamp();

                              })
                            }}>
                              Apply
                            </Button>

                            <Button variant='contained' disableElevation sx={{ borderRadius: 1, textTransform: 'none', ml: 1, backgroundColor: '#f29494' }} size='small' onClick={() => {


                              this.setState({
                                status_search: "",
                                page: 0,

                                client_id_search_ref: "",

                                end_client_id_search_ref: "",

                                campaign_manager_id_search_ref: "",

                                department_id_search_ref: ""
                              }, () => {
                                this.instantRetriveCamp();
                              })
                            }}>
                              Clear
                            </Button>



                          </Box>

                        </Grid>

                      </Grid>

                    </Box>

                  </AccordionDetails>

                </Accordion>
              </Box>









              <Paper sx={{ width: '100%', minHeight: 400, mt: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, m: 1, pt: 1 }}>

                  <Box sx={{ borderRadius: 2, minHeight: 30, ml: 1, mr: 1, mt: { xs: 1, sm: 0 }, mb: { xs: 1, sm: 0 } }}>
                    <TextField sx={{
                      "& input::placeholder": {
                        fontSize: "14px",
                        fontWeight: '700',
                        marginLeft: "2px",
                        mb: '2px'
                      }, backgroundColor: '#f8f9ff', borderRadius: 1
                    }} onChange={this.seachByCampaignNmae} name='search' variant='standard' InputProps={{ startAdornment: <SearchIcon sx={{ color: '#919191' }} />, disableUnderline: true }} placeholder='Campaign Name' />

                  </Box>

                </Box>





                <Box sx={{ mt: 0, padding: 2 }}>
                  <TableContainer component={Box}>
                    <Table sx={{ minWidth: 2220 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align='left' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Client Id</TableCell>
                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Client Name</TableCell>
                          <TableCell align='left' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Campaign Name </TableCell>
                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Campaign Manager</TableCell>
                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>End Client</TableCell>
                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Start Date </TableCell>
                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>End Date</TableCell>


                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Total Target </TableCell>
                          <TableCell align='left' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>CPL </TableCell>
                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Delivered Leads</TableCell>
                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Remaining Leads</TableCell>
                          <TableCell align='left' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Campaign Status </TableCell>


                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Total Revenue </TableCell>


                          <TableCell align='center' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Delivered Revenue </TableCell>
                          <TableCell align='left' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Billing Status</TableCell>

                          <TableCell align='right' sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.allCampaignData.map((row, index) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index % 2 ? '#f9f9f9' : '#fff' }}
                          >
                            <TableCell component="th" scope="row" sx={{ color: '#42526e' }}  >
                              <Box sx={{ height: 20, minWidth: 60, display: 'flex', justifyContent: 'left', alignItems: 'center' }}><Typography sx={{ fontSize: 12, fontWeight: '700', paddingLeft: 1, paddingRight: 1, backgroundColor: row.status == 'Live' ? '#0088cc' : row.status == 'Completed' ? '#95ce9a' : row.status == 'Open' ? '#fe964a' : row.status == 'Canceled' ? '#f29494' : row.status == 'Pending' ? "#3fc3af" : "ffc809", color: '#fff' }}>{row.client_id}</Typography></Box>
                            </TableCell>
                            <TableCell align='center' sx={{ fontSize: 13 }}>{row.client_name}  </TableCell>
                            <TableCell align='left' sx={{ fontSize: 13 }}>{row.campaign_name}</TableCell>
                            <TableCell align='center' sx={{ fontSize: 13 }}>{row.campaign_manager}</TableCell>
                            <TableCell align='center' sx={{ fontSize: 13 }}>{row.end_client == "" ? "---" : row.end_client}</TableCell>
                            <TableCell align='center' sx={{ color: '#42526e' }} >{moment(row.start_date).format('YYYY-MM-DD')} </TableCell>
                            <TableCell align='center' sx={{ color: '#42526e' }} >{moment(row.end_date).format('YYYY-MM-DD')} </TableCell>


                            <TableCell align='center' sx={{ fontSize: 13 }}>{row.lead_target}</TableCell>
                            <TableCell align='left' sx={{ fontSize: 13 }}><Box sx={{ height: 23, display: 'flex', justifyContent: 'left', alignItems: 'center' }}><Typography sx={{ paddingLeft: 0.4, paddingRight: 0.4, color: '#fff', fontWeight: '600', fontSize: 12, backgroundColor: '#2d85d1' }}>$ {row.cost_per_lead}</Typography></Box> </TableCell>
                            <TableCell align='center' sx={{ fontSize: 13 }}><CountUp start={0} end={parseInt(row.total_upoaded_Leads)} /></TableCell>
                            <TableCell align='center' sx={{ fontSize: 13 }}><CountUp start={0} end={row.total_upoaded_Leads >= parseInt(row.lead_target) ? 0 : parseInt(row.lead_target) - row.total_upoaded_Leads} /></TableCell>
                            <TableCell align='left' sx={{ fontSize: 13 }}><Box sx={{ height: 20, minWidth: 60, display: 'flex', justifyContent: 'left', alignItems: 'center' }}><Typography sx={{ fontSize: 12, fontWeight: '700', paddingLeft: 1, paddingRight: 1, backgroundColor: row.status == 'Live' ? '#0088cc' : row.status == 'Completed' ? '#95ce9a' : row.status == 'Open' ? '#fe964a' : row.status == 'Canceled' ? '#f29494' : row.status == 'Pending' ? "#3fc3af" : "ffc809", color: '#fff' }}>{row.status}</Typography></Box> </TableCell>


                            <TableCell align='center' sx={{ fontSize: 13, fontWeight: 'bold' }}>$ <CountUp start={0} end={parseInt(row.lead_target) * parseInt(row.cost_per_lead)} /></TableCell>


                            <TableCell align='center' sx={{ fontSize: 13 }}>$ <CountUp start={0} end={parseInt(row.cost_per_lead) * row.total_upoaded_Leads} /></TableCell>

                            <TableCell align='left' sx={{ fontSize: 13 }}><Box sx={{ height: 23, display: 'flex', justifyContent: 'left', alignItems: 'center' }}><Typography sx={{ paddingLeft: 0.4, paddingRight: 0.4, color: '#fff', fontWeight: '700', fontSize: 11, backgroundColor: row.no_of_leads_get_paid == 0 ? '#005aa0 ' : row.no_of_leads_get_paid == parseInt(row.lead_target) ? '#3fc3af' : row.no_of_leads_get_paid == parseInt(row.lead_target) ? '#0088cc' : '#f29494', textTransform: 'uppercase' }}>{row.no_of_leads_get_paid == 0 ? "Pending" : row.no_of_leads_get_paid > 0 && row.no_of_leads_get_paid < parseInt(row.lead_target) ? 'Partially Paid' : row.no_of_leads_get_paid == parseInt(row.lead_target) ? 'Fully Paid' : 'Pending'}</Typography></Box> </TableCell>
                            <TableCell align='right'><Button variant='contained' onClick={() => { this.props.navigate(`/over_all_tracking_for_single_campaign_admin/:${row.campaign_id}`) }} size='small' disableElevation sx={{ height: 17, width: 22, textTransform: 'none', fontSize: 12 }}>View</Button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[1, 10, 25]}
                    component="div"
                    count={this.state.allCampaignCounts}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                  />

                </Box>















              </Paper>


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
            open={this.state.open_loader_for_edit_page_popup}
          //this.state.is_loader_open
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

export default Overall_tracking


export function Overall_trackingc(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return (<Overall_tracking location={location} navigate={navigate}></Overall_tracking>)
}





const cc = [
  {
    id: 2,
    status: 'Open',
    color: 'black'
  }, {
    id: 4,
    status: 'Live',
    color: 'black'

  }, {
    id: 3,
    status: 'Completed',
    color: 'black'
  }, {
    id: 1,
    status: 'Pending',
    color: 'black'
  },


]