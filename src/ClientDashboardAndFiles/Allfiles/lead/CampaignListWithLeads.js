import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import { CSVLink } from "react-csv";
import { Sidebarc } from '../../Sidebar'
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
import {Tooltip,Link,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch, useParams } from 'react-router-dom';
import Papa from 'papaparse'
import base from '../../../base'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import ViewListIcon from '@mui/icons-material/ViewList';
import TimelineIcon from '@mui/icons-material/Timeline';
import moment from 'moment'
import CountUp from 'react-countup';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DownloadIcon from '@mui/icons-material/Download';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


import { SyncLoader } from 'react-spinners';

import { ToastContainer, toast } from 'react-toastify';
const drawerWidth = 240;

export class CampaignListWithLeads extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,


       is_loader_open_circle:false,
       form_open:false,
       search:"",
       page:0,
       rowsPerPage:10,
       campaignList:[],
       totalCampaignsize:0,
       departmentData : JSON.parse(sessionStorage.getItem('AllClientData')),
       credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
       payload : JSON.parse(sessionStorage.getItem('payload')),
       exportsLeadList:[],

       permissiondata : JSON.parse(sessionStorage.getItem('permission')),


    }
    this.handleChange = this.handleChange.bind();
    this.handleChangeSearch = this.handleChangeSearch.bind()
  }


handleChangeSearch=(e)=>{
  this.setState({
    [e.target.name]:e.target.value,page:0,is_loader_open:true
  },()=>{
    if(this.state.departmentData.is_admin){
      fetch(`${base.base_url}/retriveCampaignForClientAdmin`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          client_id:this.state.departmentData.client_id,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
      })
     
    }else{
    
      fetch(`${base.base_url}/retriveCampaignForClientContact`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          client_id:this.state.departmentData.client_id,
          contact_id:this.state.payload.contact_id,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
      })
    }
  })
}




handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

  componentDidMount(){
    this.setState({is_loader_open:true})
    if(this.state.departmentData.is_admin){
      fetch(`${base.base_url}/retriveCampaignForClientAdmin`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          client_id:this.state.departmentData.client_id,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
      })
     
    }else{
    
      fetch(`${base.base_url}/retriveCampaignForClientContact`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          client_id:this.state.departmentData.client_id,
          contact_id:this.state.payload.contact_id,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
      })
    }

  }









instantRetrive=()=>{
  this.setState({is_loader_open:true})
  if(this.state.departmentData.is_admin){
    fetch(`${base.base_url}/retriveCampaignForClientAdmin`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        client_id:this.state.departmentData.client_id,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
    })
   
  }else{
  
    fetch(`${base.base_url}/retriveCampaignForClientContact`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        client_id:this.state.departmentData.client_id,
        contact_id:this.state.payload.contact_id,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
    })
  }
}




handleChangePage = (event, newPage) => {
  this.setState({page:newPage,is_loader_open:true},()=>{

    if(this.state.departmentData.is_admin){
  
      fetch(`${base.base_url}/retriveCampaignForClientAdmin`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          client_id:this.state.departmentData.client_id,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
      })
     
    }else{
    
      fetch(`${base.base_url}/retriveCampaignForClientContact`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          client_id:this.state.departmentData.client_id,
          contact_id:this.state.payload.contact_id,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
      })
    }
  })
};




handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0,is_loader_open:true},()=>{

    if(this.state.departmentData.is_admin){
      fetch(`${base.base_url}/retriveCampaignForClientAdmin`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          client_id:this.state.departmentData.client_id,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
      })
     
    }else{
    
      fetch(`${base.base_url}/retriveCampaignForClientContact`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          client_id:this.state.departmentData.client_id,
          contact_id:this.state.payload.contact_id,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
      })
    }
  })
};





succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Cmapaign Successfully Updated</Typography>, {
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


deletd=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Campaign Successfully Deleted</Typography>, {
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

fails=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields</Typography>, {
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
  this.setState({is_loader_open_circle:true},()=>{
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
    exportsLeadList :result.leadList,
    is_loader_open_circle:false
  },()=>{
    this.csvLink.link.click();
  })
  })
  })
  
}



  render() {
    return (
        <div> 
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:2,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Leads : Manage Leads</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Manage Leads</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',mr:{xs:1,sm:2,md:3}}}>
<Button disabled={this.state.permissiondata?this.state.permissiondata.campaign.is_create?false:true:false} onClick={()=>this.props.navigate("/clientCampaign/add")} sx={{textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon sx={{color:'#fff'}}/>}>
Add Campaign
</Button>
</Box>
</Paper>


<Paper sx={{width:'100%',minHeight:300,mt:2}}>
<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row'}}>
<Typography sx={{fontSize:15,fontWeight:'600',paddingLeft:{xs:1,sm:1,md:1},color:'#666666'}}>Lead List</Typography>
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
<TextField  onChange={this.handleChangeSearch} name='search' variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>
</Box>



<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr. No</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Campaign Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Lead Target</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Uploaded Leads</TableCell>

            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Start Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>View</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>View</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>

            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.campaignList.map((row,index) => (
              <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:index % 2?'#f9f9f9':'#fff'}}
            >
              <TableCell align='left' sx={{color:'#42526e',fontSize:14}}>{this.state.rowsPerPage * this.state.page  + index + 1}</TableCell>
                <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
             <Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:row.status=='Live'?'#0088cc':row.status=='Completed'?'#95ce9a':row.status=='Open'?'#fe964a':row.status=="Pending"?"#3fc3af":'#f29494',color:'#fff'}}>{row.campaign_name}</Typography></Box>
             </TableCell> 
             <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:14}}><CountUp start={0} end={row.lead_target} /></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:14}}><CountUp start={0} end={row.total_upoaded_Leads}/></TableCell>
             
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.start_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.end_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Button disabled={this.state.permissiondata?this.state.permissiondata.lead.is_view?false:true:true} disableElevation variant='contained' onClick={()=>this.props.navigate('/campaignListwithleads/:' + `${row.campaign_id}`)} startIcon={<TimelineIcon/>} sx={{height:20,minWidth:25,fontSize:11,textTransform:'none',backgroundColor:'#008ffb'}}>History</Button></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Button disableElevation disabled={this.state.permissiondata?this.state.permissiondata.lead.is_view?false:true:true} variant='contained' onClick={()=>this.props.navigate('/campaignListwithleads/campaign/:' + `${row.campaign_id}`)} startIcon={<ViewListIcon/>} sx={{height:20,minWidth:25,fontSize:11,textTransform:'none',backgroundColor:'#008ffb'}}>Leads</Button></TableCell>
              
              <TableCell align='left' sx={{fontSize:13}}> <Box sx={{height:23,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,fontWeight:'700',color:'#fff',fontSize:11,backgroundColor:row.status=='Live'?'#0088cc':row.status=='Completed'?'#95ce9a':row.status=='Open'?'#fe964a':row.status=="Pending"?"#3fc3af":'#f29494',textTransform:'uppercase'}}>{row.status}</Typography></Box> </TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <CSVLink
  data={this.state.exportsLeadList}
  ref={(r) => (this.csvLink = r)}
  filename='Lead_List'
  target="_blank"
></CSVLink>


<Tooltip title="Download Leads">
<IconButton disabled={this.state.permissiondata?this.state.permissiondata.lead.is_view?false:true:true} size='small' onClick={()=>this.downloadLeadList(row.campaign_id)} >
<SystemUpdateAltIcon sx={{color:'green',height:15,width:15}}/>
</IconButton>
</Tooltip>



<Tooltip title="Delete">
  <IconButton  size='small' disabled={true} onClick={()=>{
        fetch(`${base.base_url}/deleteCamapign`,{
          headers:{
            'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
            'content-type':'application/json',
          },
          method:'delete',
          body:JSON.stringify({
           campaign_id:row.campaign_id
          })
        }).then((res)=>{return res.json()}).then((result)=>{
this.instantRetrive();
this.deletd();
        })
  }} >
<DeleteForeverIcon sx={{color:'#e0e0e0',height:15,width:15}}/>
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
          count={this.state.totalCampaignsize}
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
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_loader_open_circle}
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

export default CampaignListWithLeads





export function CampaignListWithLeadsc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param  = useParams();
  return (<CampaignListWithLeads location={location} param={param} navigate={navigate}></CampaignListWithLeads>)
}










