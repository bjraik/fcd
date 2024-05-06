import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../../Appheader'
import Sidebar from '../../../Sidebar'
import { Sidebarc } from '../../../Sidebar'
import { Button, Input, Paper, Typography } from '@mui/material'
import {Box,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import {Tooltip,Link,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,Backdrop,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch, useParams } from 'react-router-dom';
import Papa from 'papaparse'
import base from '../../../../base'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import moment from 'moment'
import DownloadIcon from '@mui/icons-material/Download';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { ToastContainer, toast } from 'react-toastify';
import {SyncLoader} from 'react-spinners'
import { CSVLink } from "react-csv";
const drawerWidth = 240;

export class BunchUploadedHistory extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       is_loader_open_circle:false,
       form_open:false,
       file:"",
       rowsPerPage:10,
       page:0,
       leadList:[],
       leadListSize:0,
       
       permissiondata : JSON.parse(sessionStorage.getItem('permission')),




       bunchLeadList : []

    }
    this.handleChange = this.handleChange.bind();
    this.handleChangee = this.handleChangee.bind();
  }



handleChangee=(e)=>{
  this.setState({
    [e.target.name]:e.target.files[0]
  })
}

handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

  componentDidMount(){
    this.setState({is_loader_open:true},()=>{

 fetch(`${base.base_url}/retriveLeadForSingleCamapaign`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
        campaign_id:this.props.param.campaignId.replace(/:/g,''),
         page:this.state.page,
         rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({leadList:result.data,leadListSize:result.length,is_loader_open:false})
      })

    })
   
  }





handleChangePage = (event, newPage) => {
  this.setState({page:newPage,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retriveLeadForSingleCamapaign`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        campaign_id:this.props.param.campaignId.replace(/:/g,''),
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({leadList:result.data,leadListSize:result.length,is_loader_open:false})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10),is_loader_open:true})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveLeadForSingleCamapaign`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        campaign_id:this.props.param.campaignId.replace(/:/g,''),
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({leadList:result.data,leadListSize:result.length,is_loader_open:false})
    })

  })
};


retriveLeads=()=>{
  this.setState({is_loader_open:true},()=>{

fetch(`${base.base_url}/retriveLeadForSingleCamapaign`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      campaign_id:this.props.param.campaignId.replace(/:/g,''),
     page:this.state.page,
     rowsPerPage:this.state.rowsPerPage
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({leadList:result.data,leadListSize:result.length, is_loader_open:false})
  })

  })
  
}



succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Leads Deleted</Typography>, {
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




  downloadLeadBunch =(id)=> {
    this.setState({is_loader_open_circle:true},()=>{

fetch(`${base.base_url}/download_single_bunch_lead_list`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
       body:JSON.stringify({
    
        id  : id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
  
    this.setState({
      bunchLeadList  : result.lead_data,
      is_loader_open_circle: false,
    },()=>{
      this.csvlink.link.click();
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
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Leads</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Import Leads</Typography>
</Box>
</Paper>


<Paper sx={{width:'100%',minHeight:300,mt:2}}>
<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{display:'none',flexDirection:'row'}}>

<Box sx={{height:30,width:30,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Export PDF">
<PictureAsPdfIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
<Box sx={{height:30,width:30,borderRadius:1,ml:1,mr:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Export Exel">
<DriveFileMoveIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
<Box sx={{height:30,width:30,mr:2,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Delete All">
<DeleteForeverIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
</Box>

<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30}}>
<TextField  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>
</Box>



<Box sx={{ overflow: "auto" }}>
<Box sx={{mt:0,padding:2,minWidth:720}}>

<Paper elevation={2} sx={{height:40,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Upload Date</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Client Name</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Campaign Name</Typography>
</Box>


<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',textAlign:'center',paddingRight:{xs:1,sm:2,md:3},color:'#666666'}}>Uploaded Leads</Typography>
</Box>


<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',paddingRight:{xs:1,sm:2,md:3},color:'#666666'}}>Action</Typography>
</Box>


</Paper>


<br/>



{
  this.state.leadList.map((s)=>(
    <Paper sx={{height:40,width:'100%',mt:1,mb:1.3,backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:13,fontWeight:'600',paddingLeft:{xs:1,sm:2,md:3},color:'#737579' }}>{moment(s.date).format('MM-DD-YYYY hh:mm:ss')}</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:13,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#737579' }}>{s.client_name}</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:13,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#737579' }}>{s.campaign_name}</Typography>
</Box>


<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:13,fontWeight:'600',textAlign:'center',paddingRight:{xs:1,sm:2,md:3},color:'#737579' }}>{s.size}</Typography>
</Box>

<CSVLink
  data={this.state.bunchLeadList}
  ref={(r) => (this.csvlink = r)}
  filename='Bunch_Lead_List'
  target="_blank"
></CSVLink>

<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',width:'100%'}}>
<IconButton  disabled={true} onClick={()=>{
fetch(`${base.base_url}/deleteLeadBunch`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  }, 
  method:'delete',
  body:JSON.stringify({
   bunch_id:s.id,
   campaign_id:s.campaign_id
  })
}).then((res)=>{return res.json()}).then((result)=>{
 this.retriveLeads();
 this.succes();
})

}} sx={{padding:0.2}} aria-label="delete" size="medium">
  <DeleteForeverIcon sx={{color:'#e0e0e0',height:20,width:20}} fontSize="inherit" />
</IconButton>

<IconButton onClick={()=>this.props.navigate('/campaignListwithleads/leadList/:' + `${s.id}`)} sx={{padding:0.2}} aria-label="delete" size="medium">
  <ShortcutIcon sx={{color:'#66b4da'}} fontSize="inherit" />
</IconButton>


<IconButton onClick={()=>this.downloadLeadBunch(s.id)}  sx={{marginRight:{xs:1,sm:2,md:3},padding:0.2}} aria-label="delete" size="medium">
  <CloudDownloadIcon sx={{color:'#95ce9a '}} fontSize="inherit" />
</IconButton>

</Box>
</Paper>
  ))
}


<br/>
<Paper sx={{height:50}}>
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
</Box>
</Box>


</Paper>
</Box>
</Box>
</Box>

<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>


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
     </div>
    )
  }
}

export default BunchUploadedHistory;

export function BunchUploadedHistoryc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<BunchUploadedHistory location={location} param={param} navigate={navigate}></BunchUploadedHistory>)
}




