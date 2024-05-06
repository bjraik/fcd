import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Input, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import {Tooltip,Link,IconButton,TableBody,FormControl,Select,InputLabel,Grid,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import Papa from 'papaparse'
import base from '../base'
import { CSVLink } from "react-csv";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import ViewListIcon from '@mui/icons-material/ViewList';
import TimelineIcon from '@mui/icons-material/Timeline';
import { ToastContainer, toast } from 'react-toastify';
import {SyncLoader} from 'react-spinners'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment'
import CountUp from 'react-countup';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';



const drawerWidth = 240;

export class ManageLeads extends Component {


  constructor(props) {
    super(props)
    this.state = {
       is_loader_open:true,
       open_loader_for_edit_page_popup:false,
       form_open:false,
       campaign_id:'',
       search:"",
       page:0,
       rowsPerPage:10,
       campaign_list:[],
       campaign_max_size:0,

       delete_confirmation:false,

       exportsLeadList:[],
       exportsHeaderList : [],


       lead_role : JSON.parse(window.sessionStorage.getItem('lead_role')),
       campaign_role : JSON.parse(window.sessionStorage.getItem('campaign_role')),


/////////// client List 

client_list  :[],


//////////////////  search data for //////////////

client_id_search : "",
client_name_search : "",

end_client_id_search : "",
end_client_name_search : "",

campaign_manager_id_search  :"",
campaign_manager_name_search :"",

department_id_search :"",
department_name_search : "",




status_search :"",

start_date_search : null,
end_date_search : null,

///// arary
endClientListSearchList : [],
departmentLIstForSearch  :[],
campaignManagerSearchList : [],

///////////////////////////////// ////// ref

client_id_search_ref : "",

end_client_id_search_ref : "",

campaign_manager_id_search_ref  :"",

department_id_search_ref :"",


    }
    this.handleChange = this.handleChange.bind();
    this.handleChangeSearch = this.handleChangeSearch.bind();
  }





handleChangeSearch=(e)=>{
  this.setState({[e.target.name]:e.target.value,is_loader_open:true,page:0},()=>{
    fetch(`${base.base_url}/retriveCampaignForManageLeadPage`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
         body:JSON.stringify({

          status : this.state.status_search,

          search_client_id : this.state.client_id_search_ref,
  
          end_client_id_search : this.state.end_client_id_search_ref,
          
          campaign_manager_id_search  : this.state.campaign_manager_id_search_ref,
          
          department_id_search : this.state.department_id_search_ref,

         search:this.state.search,
         page:this.state.page,
         rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({campaign_list:result.data,campaign_max_size:result.camp_size,is_loader_open:false})
      })
  })
}


handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}



  componentDidMount(){
    this.setState({is_loader_open:true})
    fetch(`${base.base_url}/retriveCampaignForManageLeadPage`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
         body:JSON.stringify({

          status : this.state.status_search,

          search_client_id : this.state.client_id_search_ref,
  
          end_client_id_search : this.state.end_client_id_search_ref,
          
          campaign_manager_id_search  : this.state.campaign_manager_id_search_ref,
          
          department_id_search : this.state.department_id_search_ref,


         search:this.state.search,
         page:this.state.page,
         rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({campaign_list:result.data,campaign_max_size:result.camp_size,is_loader_open:false})
      }).then(()=>{


        
        fetch(`${base.base_url}/retriveAllClients`,{
          headers:{
            'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
            'content-type':'application/json',
          },
          method:'post',
          body:JSON.stringify({
          })
        }).then((res)=>{return res.json()}).then((result)=>{
          this.setState({client_list:result.data})
        })


      })
  }



  instantRetrive=()=>{
    this.setState({is_loader_open:true},()=>{

      fetch(`${base.base_url}/retriveCampaignForManageLeadPage`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
       body:JSON.stringify({

        status : this.state.status_search,

        search_client_id : this.state.client_id_search_ref,

        end_client_id_search : this.state.end_client_id_search_ref,
        
        campaign_manager_id_search  : this.state.campaign_manager_id_search_ref,
        
        department_id_search : this.state.department_id_search_ref,


       search:this.state.search,
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({campaign_list:result.data,campaign_max_size:result.camp_size,is_loader_open:false})
    })


    })
    
  }





handleChangePage = (event, newPage) => {
  this.setState({page:newPage,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retriveCampaignForManageLeadPage`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({

        status : this.state.status_search,

        search_client_id : this.state.client_id_search_ref,

        end_client_id_search : this.state.end_client_id_search_ref,
        
        campaign_manager_id_search  : this.state.campaign_manager_id_search_ref,
        
        department_id_search : this.state.department_id_search_ref,

       search:this.state.search,
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({campaign_list:result.data,campaign_max_size:result.camp_size,is_loader_open:false})
    })
  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10),is_loader_open:true})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveCampaignForManageLeadPage`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({


        status : this.state.status_search,

        search_client_id : this.state.client_id_search_ref,

        end_client_id_search : this.state.end_client_id_search_ref,
        
        campaign_manager_id_search  : this.state.campaign_manager_id_search_ref,
        
        department_id_search : this.state.department_id_search_ref,


       search:this.state.search,
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({campaign_list:result.data,campaign_max_size:result.camp_size,is_loader_open:false})
    })

  })
};




succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Campaign Deleted</Typography>, {
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





downloadLeadList =(campaign_id)=> {
  fetch(`${base.base_url}/ExportsAllUploadedLeadList`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
     body:JSON.stringify({
     campaign_id:campaign_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{   
  this.setState({
    exportsLeadList :result.leadList
  },()=>{
    this.csvLink.link.click();
  })
  })

}



downloadHeaderList =(campaign_id)=> {
  fetch(`${base.base_url}/ExportsHeaders`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
     body:JSON.stringify({
     campaign_id:campaign_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{

  this.setState({
    exportsHeaderList:result.headerList
  },()=>{
    this.csvLinkhead.link.click();
  })
  })
}









/////////////////// search data /////////////////////


retriveEndClientAndDepartmentForSearch=(client_id)=>{

  this.setState({open_loader_for_edit_page_popup:true})
  fetch(`${base.base_url}/retriveDepartmentForCampaignPage`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
  client_id:client_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({departmentLIstForSearch:result.data})
  }).then(()=>{

    fetch(`${base.base_url}/retriveEndClientDataForCampaignSElection`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        client_id :client_id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
     this.setState({
      endClientListSearchList : result.data,
      open_loader_for_edit_page_popup:false
     })
    })

  })

}



retriveCampaignManagerForSearch=(department_id)=>{
  this.setState({open_loader_for_edit_page_popup:true})
  fetch(`${base.base_url}/retriveContactForCampaign`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      department_id:department_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaignManagerSearchList:result.data,open_loader_for_edit_page_popup:false})
  })

}






  render() {
    return (
        <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Leads : Manage Leads</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Manage Leads</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',mr:{xs:1,sm:2,md:3}}}>
<Button disabled={this.state.campaign_role.is_create?false:true}  onClick={()=>this.props.navigate("/compaign/add")} sx={{whiteSpace:'nowrap',textAlign:'center',textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon sx={{color:'#fff'}}/>}>
Add Campaign
</Button>
</Box>
</Paper>







<Box  sx={{mt:1}}>
<Accordion>
        <AccordionSummary
      //  sx={{backgroundColor:'#f8f9ff',}}
          expandIcon={<ArrowDownwardIcon sx={{color:'#f29494',mr:1}}/>}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={()=>{this.setState({
            page:0,
            client_id_search:"",
            client_name_search:"",
          
            status_search  :"",
        
            end_client_id_search : "",
            end_client_name_search : "",
            
            department_id_search :"",
            department_name_search : "",
            
            campaign_manager_id_search  :"",
            campaign_manager_name_search :"",
        
            endClientListSearchList : [],
            departmentLIstForSearch  :[],
            campaignManagerSearchList : [],

            client_id_search_ref  : "",
            end_client_id_search_ref : "",
             
            campaign_manager_id_search_ref : "",
            department_id_search_ref : ""

          },()=>{

          //  this.instantRetrive();

          })
      
        }}
        >
        <Typography sx={{fontSize:15,ml:1,fontWeight:'600',color:'#6b6b6b'}}>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <Box sx={{mb:1}}>

        <Grid container spacing={2} rowSpacing={3}>
           <Grid item xs={12} sm={6} md={3}>
           <Box sx={{mr:{xs:0,sm:1}}}>
<FormControl fullWidth size='small'>
<InputLabel id="demo-simple-select-label" sx={{fontSize:13,fontWeight:'600'}}>Select Client</InputLabel>
  <Select
  inputProps={{sx:{fontSize:13}}}
  sx={{height:35}}
  MenuProps={{sx:{maxHeight:300}}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={this.state.client_id_search}
    label="Select Client"
    onChange={this.handleChange}
  >
    <MenuItem value={1} sx={{fontSize:12,fontWeight:'600'}}>Select</MenuItem>

{this.state.client_list.map((i)=>(
  <MenuItem value={i.client_id} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>this.setState({
    client_id_search:i.client_id,
    client_name_search:i.client_name,
  

    end_client_id_search : "",
    end_client_name_search : "",
    
    department_id_search :"",
    department_name_search : "",
    
    campaign_manager_id_search  :"",
    campaign_manager_name_search :"",

    endClientListSearchList : [],
    departmentLIstForSearch  :[],
    campaignManagerSearchList : [],

  },()=>{
   this.retriveEndClientAndDepartmentForSearch(i.client_id);
  })

}>{i.client_name}</MenuItem>
))
   
}
 


  </Select>
</FormControl>
</Box>
           </Grid>



           <Grid item xs={12} sm={6} md={3}>
           <Box sx={{mr:{xs:0,sm:1}}}>
<FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label" sx={{fontSize:12,fontWeight:'600'}}>End Client</InputLabel>
  <Select
  inputProps={{sx:{fontSize:12}}}
   sx={{height:35}}
   MenuProps={{sx:{maxHeight:300}}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={this.state.end_client_id_search}
    label="End Client"
    onChange={this.handleChange}
  >
{
  this.state.endClientListSearchList.map((i)=>(
     <MenuItem value={i.id} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>this.setState({end_client_id_search:i.id,end_client_name_search:i.end_client_name})}>{i.end_client_name}</MenuItem>
  ))
}
   

  </Select>
</FormControl>
</Box>
           </Grid>


           <Grid item xs={12} sm={6} md={3}>
           <Box sx={{mr:{xs:0,sm:1}}}>
<FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label" sx={{fontSize:12,fontWeight:'600'}}>Department</InputLabel>
  <Select
  inputProps={{sx:{fontSize:12}}}
   sx={{height:35}}
   MenuProps={{sx:{maxHeight:300}}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={this.state.department_id_search}
    label="End Client"
    onChange={this.handleChange}
  >
    { this.state.departmentLIstForSearch.map((i)=>(
 <MenuItem value={i.department_id} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{
  this.setState({
    department_id_search:i.department_id, 
    department_name_search:i.department_name,  
    campaign_manager_id_search  :"",
    campaign_manager_name_search :"",
    campaignManagerSearchList:[]
  },()=>{

  this.retriveCampaignManagerForSearch(i.department_id)

 })}}>{i.department_name}</MenuItem>
    ))

    }
   
 
  </Select>
</FormControl>
</Box>
           </Grid>


           <Grid item xs={12} sm={6} md={3}>
           <Box sx={{mr:{xs:0,sm:1}}}>
<FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label" sx={{fontSize:12,fontWeight:'600'}}>Campaign Manager</InputLabel>
  <Select
  inputProps={{sx:{fontSize:12}}}
   sx={{height:35}}
   MenuProps={{sx:{maxHeight:300}}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={this.state.campaign_manager_id_search}
    label="Campaign Manager"
    onChange={this.handleChange}
  >
    { this.state.campaignManagerSearchList.map((i)=>(
          <MenuItem value={i.contact_id} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{this.setState({campaign_manager_id_search:i.contact_id,campaign_manager_name_search:i.first_name + "" + i.last_name})}}>{i.first_name + "" + i.last_name}</MenuItem>
    ))
    }
     
  </Select>
</FormControl>
</Box>
           </Grid>



          <Grid item xs={12} sm={6} md={3}>
          <Box sx={{mr:{xs:0,sm:1}}}>
<FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label" sx={{fontSize:12,fontWeight:'600'}}>Status</InputLabel>
  <Select
  inputProps={{sx:{fontSize:12}}}
   sx={{height:35}}
   MenuProps={{sx:{maxHeight:300}}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={this.state.status_search}
    label="Age"
    onChange={this.handleChange}
  >
      <MenuItem value="" sx={{fontSize:12,fontWeight:'600'}} onClick={()=>this.setState({status_search:""})}>select</MenuItem>
    { 
      cc.map((i)=>(

   <MenuItem value={i.status} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>this.setState({status_search:i.status})}>{i.status}</MenuItem>
   
      ))   
    }

  </Select>
</FormControl>
</Box>
          </Grid>






          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{display:'flex',flexDirection:'row'}}>

  


            <Button variant='contained' disableElevation  sx={{borderRadius:1,textTransform:'none'}} size='small' onClick={()=>{
              
            this.setState({
              page : 0,

              status_search : this.state.status_search,
               
               client_id_search_ref  : this.state.client_id_search,
      
              end_client_id_search_ref : this.state.end_client_id_search,
              
             campaign_manager_id_search_ref : this.state.campaign_manager_id_search,
              
             department_id_search_ref : this.state.department_id_search
      


            },()=>{
           
             this.instantRetrive();

            })}}>
             Apply 
            </Button>

            <Button variant='contained' disableElevation  sx={{borderRadius:1,textTransform:'none',ml:1,backgroundColor:'#f29494'}} size='small' onClick={()=>{
             
             
             this.setState({
              status_search : "",
              page : 0,

              client_id_search_ref  : "",
       
              end_client_id_search_ref : "",
               
              campaign_manager_id_search_ref : "",
               
              department_id_search_ref : ""
              },()=>{
                this.instantRetrive();
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









<Paper sx={{width:'100%',minHeight:600,mt:1}}>
<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row'}}>

<Box sx={{height:30,width:30,borderRadius:1,display:'none',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Export PDF">
<PictureAsPdfIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
<Box sx={{height:30,width:30,borderRadius:1,ml:1,mr:1,display:'none',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Export Exel">
<DriveFileMoveIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
<Box sx={{height:30,width:30,mr:2,borderRadius:1,display:'none',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Delete All">
<DeleteForeverIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
</Box>

<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30}}>
<TextField  variant='standard' name='search' onChange={this.handleChangeSearch} InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='campaign name'/>
</Box>
</Box>








<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}> Client Id</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Campaign Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Uploaded Leads</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Lead Target</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Start Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>View</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>View</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>

            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.campaign_list.map((row,index) => (
             <TableRow
             key={row.name}
             sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor:index % 2?'#f9f9f9':'#fff'}}
           >

             <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
             <Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:row.status=='Live'?'#0088cc':row.status=='Completed'?'#95ce9a':row.status=='Open'?'#fe964a':row.status=='Canceled'?'#f29494':row.status=='Pending'?"#3fc3af":"#ffc809",color:'#fff'}}>{row.client_id}</Typography></Box>
             </TableCell> 
             <TableCell align='left'  sx={{color:'#42526e',textTransform:'capitalize',minWidth:100}}  >
             <Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:row.status=='Live'?'#0088cc':row.status=='Completed'?'#95ce9a':row.status=='Open'?'#fe964a':row.status=='Canceled'?'#f29494':row.status=='Pending'?"#3fc3af":"#ffc809",color:'#fff'}}>{row.campaign_name}</Typography></Box>
             </TableCell>

              <TableCell align='center' sx={{color:'#42526e',fontSize:14,fontWeight:'600'}}> <CountUp start={0} end={row.total_upoaded_Leads} /></TableCell>
                           <TableCell align='center' sx={{color:'#42526e',fontSize:14,fontWeight:'600'}}><CountUp start={0} end={row.lead_target} /></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.start_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.end_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Button  disabled={this.state.lead_role.is_view?false:true} disableElevation variant='contained' onClick={()=>this.props.navigate('/manageLeads/:' + `${row.campaign_id}`)} startIcon={<TimelineIcon/>} sx={{height:20,minWidth:25,fontSize:11,textTransform:'none',backgroundColor:'#008ffb'}}>History</Button></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Button  disabled={this.state.lead_role.is_view?false:true} disableElevation variant='contained' onClick={()=>this.props.navigate('/manageLeads/campaign/:' + `${row.campaign_id}`)} startIcon={<ViewListIcon/>} sx={{height:20,minWidth:25,fontSize:11,textTransform:'none',backgroundColor:'#008ffb'}}>Leads</Button></TableCell>
               <TableCell> <Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:row.status=='Live'?'#0088cc':row.status=='Completed'?'#95ce9a':row.status=='Open'?'#fe964a':row.status=='Canceled'?'#f29494':row.status=='Pending'?"#3fc3af":"#ffc809",color:'#fff'}}>{row.status}</Typography></Box> </TableCell>
              <TableCell align='right'>
          
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>

                
<CSVLink
  data={this.state.exportsLeadList}
  ref={(r) => (this.csvLink = r)}
  filename='Lead_List'
  target="_blank"
></CSVLink>


<Tooltip title="Download Leads">
<IconButton  disabled={this.state.lead_role.is_view?false:true} size='small' onClick={()=>this.downloadLeadList(row.campaign_id)} >
<SystemUpdateAltIcon sx={{color:'green',height:15,width:15}}/>
</IconButton>
</Tooltip>




<CSVLink
  data={`${this.state.exportsHeaderList}`}
  asyncOnClick={true}
  filename='Headers'
  ref={(r) => (this.csvLinkhead = r)}
></CSVLink>


<Tooltip title="Download Headers">
  <IconButton   size='small' disabled={this.state.lead_role.is_view?false:true} onClick={()=>this.downloadHeaderList(row.campaign_id)} >
<DownloadIcon sx={{color:'#005aa0',height:15,width:15}}/>
</IconButton>
</Tooltip>




<Tooltip title="Delete">
  <IconButton   size='small' disabled={this.state.lead_role.is_delete?false:true} onClick={()=>{
        this.setState({campaign_id:row.campaign_id,delete_confirmation:true})
  }} >
<DeleteForeverIcon sx={{color:'#f29494',height:15,width:15}}/>
</IconButton>
</Tooltip>

 </Box></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
   <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.campaign_max_size}
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





<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>

<Box sx={{display:'none',position:'fixed',bottom:40,right:10}}>
 <Chat/> 
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
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'transparent' }}
  open={this.state.is_loader_open}
  //this.state.is_loader_open
>
  <Paper elevation={0} sx={{height:40,width:80,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
    <SyncLoader speedMultiplier={1} size={12} color="#0088cc" />
  </Paper>
</Backdrop>
</Box>






<Box> 
<Modal
  open={this.state.delete_confirmation}
 // onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'70%',md:'40%',lg:'30%'},height:300,backgroundColor:'white',borderRadius:2}}>

<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{display:'flex',justifyContent:'center',mt:3}}>
  <Box sx={{height:50,width:50,backgroundColor:'#ffe2e4',borderRadius:15,display:'flex',justifyContent:'center',alignItems:'center'}}>
<WarningAmberIcon sx={{height:30,width:30,color:'#e11d48'}}/>
  </Box>
</Box>
<Typography sx={{textAlign:'center',fontWeight:'800',padding:1,color:'black',fontSize:13}}>Are You Sure?</Typography>

<Box sx={{ml:{xs:2,sm:4,md:10},mr:{xs:2,sm:4,md:10}}}>
<Typography sx={{fontSize:13,color:'grey',textAlign:'center'}}>This action cannot be undone. All value associate to this field will be deleted</Typography>
</Box>

<Box sx={{ml:{xs:1,sm:3,md:6},mr:{xs:1,sm:3,md:6},mt:3,display:'flex',flexDirection:'column'}}>
<Button size='small'  variant='contained' onClick={()=>{
    

    fetch(`${base.base_url}/deleteCamapign`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
       campaign_id:this.state.campaign_id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({
        campaign_id:"",
        delete_confirmation:false
       })
      this.succes();
       this.instantRetrive();
    })
}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({delete_confirmation:false,campaign_id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>
</Box>

</Box>
</Paper>
</Box>
</Modal>
</Box>






<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.open_loader_for_edit_page_popup}
  //this.state.is_loader_open
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>
</Box>


</div>
    )
  }
}

export default ManageLeads





export function ManageLeadsc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ManageLeads location={location} navigate={navigate}></ManageLeads>)
}







const cc = [
  {
  id:2,
  status:'Open',
  color:'black'
}, {
  id:4,
  status:'Live',
  color:'black'

}, {
  id:3,
  status:'Completed',
  color:'black'
},{
  id:1,
  status:'Canceled',
  color:'black'
},


]
