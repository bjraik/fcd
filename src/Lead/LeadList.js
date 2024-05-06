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
import { Tooltip, Link, IconButton, TableBody, FormControl, Select, InputLabel, Table, Modal, MenuItem, TableContainer, TablePagination, Divider, TableCell, TableHead, TableRow, TextField, InputAdornment,Autocomplete } from '@mui/material'
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import Papa from 'papaparse'
import base from '../base'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners'
import { CSVLink } from "react-csv";
import bg from '../img/bgimg.svg'
import { fillClient,fillCampaignNames } from '../Utils/AutocompleteOptions'

const drawerWidth = 240;




////  unique data handling

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}



export class LeadList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      is_loader_open: false,

      is_loader_open_circle: false,
      delete_confirmation: false,
      form_open: false,
      file: "",
      rowsPerPage: 10,
      page: 0,
      leadList: [],
      leadListSize: 0,
      campaign_list: [],
      client_list: [],

      client_id: "",
      campaign_id: "",
      client_name: "",
      campaign_name: "",
      headers: [],
      lead_role: JSON.parse(window.sessionStorage.getItem('lead_role')),

      //////////////// rejected lead  list ///////////////////////

      rejectedLeadList: [],



      ////////////////// delete lead list  /////////////
      bunch_id: "",
      campaign_id_d: "",
      size: 0,

      ///////////////////////// searching data ////////////////////

      search: "",




      ////////////////////// searching data ////////////////////



      client_id_search: "",
      client_name_search: "",





    }
    this.handleChange = this.handleChange.bind();
    this.handleChangee = this.handleChangee.bind();
    this.handleSearch = this.handleSearch.bind();
  }




  handleChangee = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSearch = (e) => {

    this.setState({ [e.target.name]: e.target.value }, () => {

      this.setState({ is_loader_open: true })
      fetch(`${base.base_url}/retriveLeads`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          client_id: this.state.client_id_search,
          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })
      }).then((res) => { return res.json() }).then((result) => {
        this.setState({ leadList: result.data, leadListSize: result.length, is_loader_open: false })
      })


    })

  }


  retriveLeadListByClientidChange = () => {
    this.setState({ is_loader_open: true }, () => {

      fetch(`${base.base_url}/retriveLeads`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          client_id: this.state.client_id_search,
          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })
      }).then((res) => { return res.json() }).then((result) => {
        this.setState({ leadList: result.data, leadListSize: result.length, is_loader_open: false })
      })

    })

  }




  componentDidMount() {
    this.setState({ is_loader_open: true })
    fetch(`${base.base_url}/retriveLeads`, {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        client_id: this.state.client_id_search,
        search: this.state.search,
        page: this.state.page,
        rowsPerPage: this.state.rowsPerPage
      })
    }).then((res) => { return res.json() }).then((result) => {
      this.setState({ leadList: result.data, leadListSize: result.length, is_loader_open: false })
    }).then(() => {

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

    })
  }





  retriveLeads = () => {
    this.setState({ is_loader_open: true }, () => {
      fetch(`${base.base_url}/retriveLeads`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          client_id: this.state.client_id_search,
          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })
      }).then((res) => { return res.json() }).then((result) => {
        this.setState({ leadList: result.data, leadListSize: result.length, is_loader_open: false })
      })
    })

  }





  convertCsvToJson = () => {


    let client_id = this.state.client_id
    let campaign_id = this.state.campaign_id
    let campaign_name = this.state.campaign_name
    let client_name = this.state.client_name
    let fileee = this.state.file


    let goNext = true

    if (client_id !== "" && client_name !== "" && campaign_id !== "" && campaign_name !== "" && campaign_id !== "") {






      if (this.state.file.type == 'text/csv') {

        let is_email_header_or_phone_no_header_exists = false

        Papa.parse(this.state.file, {
          download: true,
          complete: (results, file) => {

            if (results.data[0] ? results.data[0].length > 2 ? true : false : false) {
              let gvmHeaders = []
              for (let i = 0; i < results.data[0].length; i++) {

                if (results.data[0][i] == "Email") {
                  is_email_header_or_phone_no_header_exists = true
                }

                if (results.data[0][i] !== "") {
                  gvmHeaders.push(`${results.data[0][i]}`)
                }
              }

              let filee = fileee
              if (!is_email_header_or_phone_no_header_exists) {
                alert('Fields Name   "Email"  not exists')
                gvmHeaders = []

              } else {

                Papa.parse(filee, {
                  header: true,
                  complete: (results, file) => {

                    let leadArrayExact = [];
                    let LeadArray = JSON.parse(JSON.stringify(results.data));
                    let curruptLeadList = [];

                    for (let j = 0; j < LeadArray.length; j++) {

                      let jsonOfLeads = {};
                      let is_empty_value_found = true;

                      for (let p = 0; p < gvmHeaders.length; p++) {
                        if (LeadArray[j][gvmHeaders[p]] !== "") {
                          if (is_empty_value_found) {
                            jsonOfLeads[gvmHeaders[p]] = LeadArray[j][gvmHeaders[p]]
                          }

                        } else {
                          let rejectLeadJson = LeadArray[j];
                          rejectLeadJson.rejection_reasion = 'Empty Fields';
                          curruptLeadList.push(rejectLeadJson);
                          jsonOfLeads = {};
                          is_empty_value_found = false;
                        }
                      }

                      if (Object.keys(jsonOfLeads).length > 0 && jsonOfLeads.constructor === Object) {
                        leadArrayExact.push(jsonOfLeads);
                      }
                      jsonOfLeads = {};
                    }

                    var unicArray = leadArrayExact.filter((arr, index, self) =>
                      index === self.findIndex((t) => (t.Email === arr.Email)))

                    var rejectedArrayListDueToDublication = leadArrayExact.filter((arr, index, self) =>
                      index != self.findIndex((t) => (t.Email === arr.Email)))


                    for (let lr = 0; lr < rejectedArrayListDueToDublication.length; lr++) {
                      let jsonT = rejectedArrayListDueToDublication[lr]
                      jsonT.rejection_reasion = "Dublicate in sheet"
                    }


                    is_email_header_or_phone_no_header_exists = false

                    if (unicArray.length > 0) {
                      let m = this.state.rejectedLeadList.concat(rejectedArrayListDueToDublication);
                      let s = m.concat(curruptLeadList)
                      this.setState({ rejectedLeadList: s, is_loader_open_circle: true }, () => {

                        fetch(`${base.base_url}/addLeads`, {
                          headers: {
                            'authorization': `Bearer ${sessionStorage.getItem('token')}`,
                            'content-type': 'application/json',
                          },
                          method: 'post',
                          body: JSON.stringify({
                            client_id: client_id,
                            campaign_id: campaign_id,
                            leadList: unicArray,
                            headers: gvmHeaders,
                            client_name: client_name,
                            campaign_name: campaign_name
                          })
                        }).then((res) => { return res.json() }).then((result) => {
                          if (result.data == "done") {
                            is_email_header_or_phone_no_header_exists = false
                            let final_describedarray = []
                            if (result.dublicateArraySet.length > 0) {
                              for (let y = 0; y < result.dublicateArraySet.length; y++) {
                                let json = result.dublicateArraySet[y]
                                json.rejection_reasion = 'Dublicate leads in db'
                                final_describedarray.push(json)
                              }
                            }

                            this.setState({
                              rejectedLeadList: this.state.rejectedLeadList.concat(final_describedarray),
                              is_loader_open_circle: false,
                              form_open: false,
                              client_id: "",
                              campaign_id: "",
                              campaign_name: "",
                              client_name: "",
                              file: ""
                            }, () => {
                              this.succesLeadUpload(result.message + " " + 'And' + " " + this.state.rejectedLeadList.length + " " + "Rejected Leads  Found")
                            })
                          } else {
                            this.uploadingError(result.message);
                            this.setState({
                              is_loader_open_circle: false,
                              form_open: false,
                              client_id: "",
                              campaign_id: "",
                              campaign_name: "",
                              client_name: "",
                              file: ""



                            })

                          }
                          this.retriveLeads();
                          this.setState({
                            is_loader_open_circle: false,
                            form_open: false,
                            client_id: "",
                            campaign_id: "",
                            campaign_name: "",
                            client_name: "",
                            file: ""


                          })
                        })


                      })

                    } else {
                      alert(`Header Found But Lead List Not Found`)
                      this.setState({
                        is_loader_open_circle: false,
                        form_open: false,
                        client_id: "",
                        campaign_id: "",
                        campaign_name: "",
                        client_name: "",
                        file: ""
                      })
                    }

                  }
                })
              }


            } else {

              this.emptyLeadList();
              this.setState({
                is_loader_open_circle: false,
                form_open: false,
                client_id: "",
                campaign_id: "",
                campaign_name: "",
                client_name: "",
                file: ""
              })

            }
          }
        })
      } else {
        this.documentNotsupport();

      }

    } else {
      this.failed()
    }











  }




  succes = () => {
    toast.info(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Lead Successfully Uploaded</Typography>, {
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



  succesLeadUpload = (data) => {
    toast.info(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>{data} <br /> <CSVLink data={this.state.rejectedLeadList} filename='Rejected List'><Button disableElevation variant='contained' size='small' sx={{ height: 20, fontWeight: '700', backgroundColor: '#f29494', fontSize: 12, mr: 1, textTransform: 'none' }}>
      Download</Button></CSVLink></Typography>, {
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

  deleteLeads = () => {
    toast.info(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Lead Successfully Deleted</Typography>, {
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


  failed = () => {
    toast.error(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>All Fields Required</Typography>, {
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


  documentNotsupport = () => {
    toast.error(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>ONLY CSV document</Typography>, {
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


  emptyLeadList = () => {
    toast.error(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Empty Lead List Cannot Upload</Typography>, {
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


  findCamapaignList = () => {
    debugger;
    this.setState({ is_loader_open_circle: true }, () => {
      fetch(`${base.base_url}/retriveCampaignForLeadPage`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          client_id: this.state.client_id
        })
      }).then((res) => { return res.json() }).then((result) => {
        this.setState({ campaign_list: result.data, is_loader_open_circle: false })
      })

    })

  }


  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage, is_loader_open: true }, () => {

      fetch(`${base.base_url}/retriveLeads`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          client_id: this.state.client_id_search,
          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })
      }).then((res) => { return res.json() }).then((result) => {
        this.setState({ leadList: result.data, leadListSize: result.length, is_loader_open: false })
      })

    })
  };



  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), is_loader_open: true })
    this.setState({ page: 0 }, () => {
      fetch(`${base.base_url}/retriveLeads`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          search: this.state.search,
          page: this.state.page,
          rowsPerPage: this.state.rowsPerPage
        })
      }).then((res) => { return res.json() }).then((result) => {
        this.setState({ leadList: result.data, leadListSize: result.length, is_loader_open: false })
      })

    })
  };


  succes = () => {
    toast.info(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Lead List Add Successfully</Typography>, {
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



  deletedd = () => {
    toast.info(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Leads Deleted</Typography>, {
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


  uploadingError = (r) => {
    toast.error(<Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>{r}</Typography>, {
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


  render() {
    return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <Sidebarc />
          <Box sx={{ width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' }, }}>
            <Box sx={{ p: { xs: 1, sm: 3 }, mt: 6 }}>
              <Typography sx={{ fontSize: { xs: 17, sm: 21, marginTop: 3, marginBottom: 3 }, mt: { xs: 2, sm: 2, md: 1 }, mb: 1, paddingLeft: { xs: 1, sm: 2, md: 3 }, fontWeight: '500', color: '#3e3e40' }}>Leads</Typography>

              <Paper sx={{ height: 50, width: '100%', backgroundColor: "#fff", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 17, fontWeight: '500', paddingLeft: { xs: 1, sm: 2, md: 3 }, color: '#666666' }}>Import Leads</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: { xs: 1, sm: 2, md: 3 } }}>
                  <Button disabled={this.state.lead_role.is_create ? false : true} onClick={() => this.setState({ form_open: true, rejectedLeadList: [] })} component="label" sx={{ whiteSpace: 'nowrap', textAlign: 'center', textTransform: 'none', height: 27, backgroundColor: '#008ffb', fontWeight: '600' }} disableElevation variant="contained" startIcon={<ImportExportIcon sx={{ color: '#fff' }} />}>
                    Import Leads
                  </Button>
                </Box>
              </Paper>




              <Paper sx={{ width: '100%', minHeight: 600, mt: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', padding: { xs: 1, sm: 2, md: 3 }, justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'none', flexDirection: 'row', }}>

                    <Box sx={{ height: 30, width: 30, borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#008ffb' }}>
                      <Tooltip title="Export PDF">
                        <PictureAsPdfIcon sx={{ color: '#fff', height: 20, width: 20 }} />
                      </Tooltip>
                    </Box>
                    <Box sx={{ height: 30, width: 30, borderRadius: 1, ml: 1, mr: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#008ffb' }}>
                      <Tooltip title="Export Exel">
                        <DriveFileMoveIcon sx={{ color: '#fff', height: 20, width: 20 }} />
                      </Tooltip>
                    </Box>
                    <Box sx={{ height: 30, width: 30, mr: 2, borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#008ffb' }}>
                      <Tooltip title="Delete All">
                        <DeleteForeverIcon sx={{ color: '#fff', height: 20, width: 20 }} />
                      </Tooltip>
                    </Box>
                  </Box>



                  <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'row' } }}>

                    <Box sx={{ mr: { xs: 1, sm: 1 } }}>

                    <Autocomplete
                              disablePortal
                              id="compaign-client-list"
                              options={fillClient(this.state.client_list)}
                              size="small"
                              inputProps={{ sx: { fontSize: 13 } }}
                              sx={{ width:200 }}
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
                                    client_name_search: data?.label,
                                  },
                               
                                  () => {

                                    this.retriveLeadListByClientidChange();
      
                                  }
                                )
                              }
                            />

                      {/* <FormControl fullWidth size='small' sx={{ minWidth: 200 }}>
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
                          <MenuItem value={1} sx={{ fontSize: 12, fontWeight: '600' }} onClick={() => this.setState({ client_id_search: "", client_name_search: "" }, () => {
                            this.retriveLeadListByClientidChange();
                          })}>Select</MenuItem>

                          {this.state.client_list.map((i) => (
                            <MenuItem value={i.client_id} sx={{ fontSize: 12, fontWeight: '600' }} onClick={() => this.setState({
                              client_id_search: i.client_id,
                              client_name_search: i.client_name,

                            }, () => {

                              this.retriveLeadListByClientidChange();

                            })

                            }>{i.client_name}</MenuItem>
                          ))

                          }

                        </Select>
                      </FormControl> */}
                    </Box>

                    <Box sx={{ backgroundColor: '#f8f9ff', borderRadius: 2, height: 35 }}>
                      <TextField variant='standard' name='search' InputProps={{ startAdornment: <SearchIcon sx={{ color: '#919191' }} />, disableUnderline: true }} onChange={this.handleSearch} placeholder='campaign name' />
                    </Box>
                  </Box>
                </Box>





                <Box sx={{ overflow: "auto" }}>
                  <Box sx={{ mt: 0, padding: 2, minWidth: 720 }}>

                    <Paper elevation={2} sx={{ height: 40, width: '100%', backgroundColor: "#fff", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600', textAlign: 'center', paddingLeft: { xs: 1, sm: 2, md: 3 }, color: '#666666' }}>Import Date</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600', textAlign: 'center', paddingLeft: { xs: 1, sm: 2, md: 3 }, color: '#666666' }}>Client Name</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600', textAlign: 'center', paddingLeft: { xs: 1, sm: 2, md: 3 }, color: '#666666' }}>Campaign Name</Typography>
                      </Box>


                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600', textAlign: 'center', paddingRight: { xs: 1, sm: 2, md: 3 }, color: '#666666' }}>Uploaded Leads</Typography>
                      </Box>


                      <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600', paddingRight: { xs: 1, sm: 2, md: 3 }, color: '#666666' }}>Action</Typography>
                      </Box>


                    </Paper>


                    <br />



                    {
                      this.state.leadList.map((s, index) => (
                        <Paper sx={{ height: 40, width: '100%', mt: 1, mb: 1.3, backgroundColor: index % 2 ? '#fff' : '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', width: '100%' }}>
                            <Typography sx={{ fontSize: 13, fontWeight: '600', paddingLeft: { xs: 1, sm: 2, md: 3 }, color: '#737579' }}>{moment(s.date).format('MM-DD-YYYY hh:mm:ss')}</Typography>
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Typography sx={{ fontSize: 13, fontWeight: '600', textAlign: 'center', paddingLeft: { xs: 1, sm: 2, md: 3 }, color: '#737579' }}>{s.client_name}</Typography>
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Typography sx={{ fontSize: 13, fontWeight: '600', textAlign: 'center', paddingLeft: { xs: 1, sm: 2, md: 3 }, color: '#737579' }}>{s.campaign_name}</Typography>
                          </Box>


                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Typography sx={{ fontSize: 13, fontWeight: '600', textAlign: 'center', paddingRight: { xs: 1, sm: 2, md: 3 }, color: '#737579' }}>{s.size}</Typography>
                          </Box>


                          <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', width: '100%', flexDirection: 'row', mr: 2 }}>
                            <IconButton disabled={this.state.lead_role.is_delete ? false : true} onClick={() => {

                              this.setState({
                                bunch_id: s.id,
                                campaign_id_d: s.campaign_id,
                                size: parseInt(s.size),
                                delete_confirmation: true,
                              })


                            }} sx={{ padding: 0.2 }} aria-label="delete" size="medium">
                              <DeleteForeverIcon sx={{ color: '#f29494', height: 20, width: 20 }} fontSize="inherit" />
                            </IconButton>
                            <IconButton onClick={() => this.props.navigate('/Lead/:' + `${s.id}`)} sx={{ padding: 0.2 }} aria-label="delete" size="medium">
                              <ShortcutIcon sx={{ color: '#66b4da', height: 20, width: 20 }} fontSize="inherit" />
                            </IconButton>
                          </Box>
                        </Paper>
                      ))
                    }
                    <br />
                    <Paper sx={{ height: 50 }}>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.state.leadListSize}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                      />
                    </Paper>

                    <Box sx={{ display: this.state.leadList.length > 0 ? 'none' : 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 8 }}>
                      <img src={bg} style={{ height: 170, width: 170, opacity: 0.5 }} />
                      <Typography sx={{ fontSize: 14, fontWeight: '600', color: '#919191' }}>No Data Found</Typography>
                    </Box>

                  </Box>
                </Box>

              </Paper>
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
              <Paper sx={{ width: { xs: '90%', sm: '90%', md: '60%', lg: '30%' }, height: '90vh', backgroundColor: 'white', borderRadius: 2 }}>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                  <Paper onClick={() => this.setState({ form_open: false })} elevation={5} sx={{ height: 30, width: 30, borderRadius: 1, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', mr: -1, mt: -1 }}>
                    <CloseIcon sx={{ height: 20, width: 20, color: '#2486bb' }} />
                  </Paper>
                </Box>

                <Typography sx={{ fontSize: 18, fontWeight: '600', paddingLeft: { xs: 2, sm: 4 }, mb: 2 }}>Import Leads</Typography>
                <Box sx={{ paddingLeft: { xs: 2, sm: 4 }, paddingRight: { xs: 2, sm: 4 }, minHeight: '20vh' }}>

                  <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, display: 'flex', flexDirection: 'row' }}>Client Name<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                  
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
                                  client_id: data?.client_id,
                                  client_name: data?.label,
                                },
                                () => {
                                  this.findCamapaignList();
                                }
                              )
                            }
                          />



                  {/* <TextField select SelectProps={{ MenuProps: { sx: { height: 300 } } }} onChange={this.handleChange} InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="client_name" fullWidth size='small'>
                    {this.state.client_list.map((s) => (
                      <MenuItem onClick={() => this.setState({ client_id: s.client_id, client_name: s.client_name, campaign_id: "", campaign_name: "" }, 
                      () => { this.findCamapaignList() })} sx={{ fontSize: 12, fontWeight: '600' }} key={s.client_id} value={s.client_name}>{s.client_name}</MenuItem>
                    ))
                    }
                  </TextField> */}

                  <Typography sx={{ fontSize: 12, fontWeight: '600', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row' }}>Campaign Name<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                
                
<Autocomplete
                            disablePortal
                            id="compaign-compaigns-list"
                            options={fillCampaignNames(this.state?.campaign_list)}
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
                                  campaign_id:data?.id,
                                  campaign_name:data?.label,
                                }
                                
                              )
                            }
                          />
                
                
                  {/* <TextField select SelectProps={{ MenuProps: { sx: { height: 300 } } }} onChange={this.handleChange} InputProps={{ sx: { fontSize: 12, fontWeight: '600' } }} name="campaign_name" fullWidth size='small'>
                    {this.state.campaign_list.map((s) => (
                      <MenuItem 
                      onClick={() => this.setState({ campaign_id: s.campaign_id, campaign_name: s.campaign_name })} 
                      sx={{ fontSize: 12, fontWeight: '600' }} key={s.campaign_id} value={s.campaign_name}>{s.campaign_name}</MenuItem>
                    ))
                    }
                  </TextField> */}

                  <Typography sx={{ fontSize: 12, fontWeight: '600', display: 'flex', flexDirection: 'row', mt: 2 }}>Import File(.csv only)<Typography sx={{ color: 'red' }}>*</Typography></Typography>
                  <Box sx={{ border: 1, borderStyle: 'dotted', backgroundColor: '#eff0f0', minHeight: 80, borderColor: '#c6c6c9', borderRadius: 1, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    <input type='file' accept=".csv" name='file' onChange={this.handleChangee} style={{ height: '100%', width: '100%', padding: 10 }} />
                  </Box>

                  <br />

                  <Button disableElevation variant='contained' onClick={this.convertCsvToJson} size='small' sx={{ mr: 1, textTransform: 'none' }}>Save</Button>

                  <br />

                  <Typography sx={{ fontSize: 11, fontWeight: '500', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row', color: '#f29494' }}>1. Users should make sure to fill all fields above such as client name and campaign name and one .csv file having header and lead list (missing header and 0 lead list software not accept).</Typography>
                  <Typography sx={{ fontSize: 11, fontWeight: '500', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row', color: '#f29494' }}>2. Users should make sure any field respect to a header should not be empty otherwise sofware reject that lead row.</Typography>
                  <Typography sx={{ fontSize: 11, fontWeight: '500', padding: 0.2, mt: 1, display: 'flex', flexDirection: 'row', color: '#f29494' }}>3. All rejected lead will show in popup on clicking button download.</Typography>

                  <br />


                  <Box>
                    <Backdrop
                      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(118,164,201,0.1)' }}
                      open={this.state.is_loader_open_circle}
                    //this.state.is_loader_open_circle
                    >
                      <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <CircularProgress size={80} sx={{ color: '#0088cc' }} thickness={1} />
                      </Paper>
                    </Backdrop>
                  </Box>
                  <br />

                </Box>

              </Paper>
            </Box>
          </Modal>
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
          <Modal
            open={this.state.delete_confirmation}
            // onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
              <Paper sx={{ width: { xs: '90%', sm: '70%', md: '40%', lg: '30%' }, height: 300, backgroundColor: 'white', borderRadius: 2 }}>

                <Box sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { width: '5px', borderRadius: 10 } }}>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Box sx={{ height: 50, width: 50, backgroundColor: '#ffe2e4', borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <WarningAmberIcon sx={{ height: 30, width: 30, color: '#e11d48' }} />
                    </Box>
                  </Box>
                  <Typography sx={{ textAlign: 'center', fontWeight: '800', padding: 1, color: 'black', fontSize: 13 }}>Are You Sure?</Typography>

                  <Box sx={{ ml: { xs: 2, sm: 4, md: 10 }, mr: { xs: 2, sm: 4, md: 10 } }}>
                    <Typography sx={{ fontSize: 13, color: 'grey', textAlign: 'center' }}>This action cannot be undone. All value associate to this field will be deleted</Typography>
                  </Box>

                  <Box sx={{ ml: { xs: 1, sm: 3, md: 6 }, mr: { xs: 1, sm: 3, md: 6 }, mt: 3, display: 'flex', flexDirection: 'column' }}>
                    <Button size='small' variant='contained' onClick={() => {


                      fetch(`${base.base_url}/deleteLeadBunch`, {
                        headers: {
                          'authorization': `Bearer ${sessionStorage.getItem('token')}`,
                          'content-type': 'application/json',
                        },
                        method: 'delete',
                        body: JSON.stringify({
                          bunch_id: this.state.bunch_id,
                          campaign_id: this.state.campaign_id_d,
                          size: this.state.size
                        })
                      }).then((res) => { return res.json() }).then((result) => {
                        this.setState({
                          bunch_id: "",
                          campaign_id_d: "",
                          size: 0,
                          delete_confirmation: false,
                        });
                        this.retriveLeads();
                        this.deletedd()
                      })



                    }} disableElevation sx={{ textTransform: 'none', background: '#e11d48', color: 'white' }}>Delete Fields</Button>

                    <Button size='small' variant='outlined' onClick={() => this.setState({
                      delete_confirmation: false,
                      bunch_id: "",
                      campaign_id_d: "",
                      size: 0
                    })} disableElevation sx={{ textTransform: 'none', mt: 1 }}>Cancel</Button>
                  </Box>

                </Box>
              </Paper>
            </Box>
          </Modal>
        </Box>




        <Box>
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'transparent' }}
            open={this.state.is_loader_open}
          //this.state.is_loader_open
          >
            <Paper elevation={0} sx={{ height: 40, width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
              <SyncLoader speedMultiplier={1} size={12} color="#0088cc" />
            </Paper>
          </Backdrop>
        </Box>






      </div>
    )
  }
}

export default LeadList





export function LeadListc(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return (<LeadList location={location} navigate={navigate}></LeadList>)
}


