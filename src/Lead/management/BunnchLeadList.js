import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import Sidebar from '../../Sidebar'
import Chat from '../../Chat'
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
import base from '../../base'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import {SyncLoader} from 'react-spinners'
const drawerWidth = 240;

export class BunnchLeadList extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       file:"",
       rowsPerPage:10,
       page:0,
       leadList:[],
       leadListSize:0,



       lead_role : JSON.parse(window.sessionStorage.getItem('lead_role')),

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
    fetch(`${base.base_url}/retriveLeadForSingleCamapaign`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          campaign_id:this.props.param.bunchLeadListId.replace(/:/g,''),
         page:this.state.page,
         rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({leadList:result.data,leadListSize:result.length,is_loader_open:false})
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
        campaign_id:this.props.param.bunchLeadListId.replace(/:/g,''),
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({leadList:result.data,leadListSize:result.length,is_loader_open:false})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retriveLeadForSingleCamapaign`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        campaign_id:this.props.param.bunchLeadListId.replace(/:/g,''),
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
      campaign_id:this.props.param.bunchLeadListId.replace(/:/g,''),
     page:this.state.page,
     rowsPerPage:this.state.rowsPerPage
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({leadList:result.data,leadListSize:result.length,is_loader_open:false})
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

  render() {
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Leads</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Import Leads</Typography>
</Box>
</Paper>


<Paper sx={{width:'100%',minHeight:600,mt:2}}>
<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{display:'none',flexDirection:'row'}}>

<Box sx={{height:30,width:30,borderRadius:1,display:'none',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
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
<Typography sx={{fontSize:14,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Import Date</Typography>
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
  this.state.leadList.map((s,index)=>(
    <Paper sx={{height:40,width:'100%',mt:1,mb:1.3,backgroundColor:index % 2?'#fff':'#fff',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
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


<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',width:'100%'}}>
<IconButton disabled={this.state.lead_role.is_delete?false:true} onClick={()=>{





}} sx={{padding:0.2}} aria-label="delete" size="medium">
  <DeleteForeverIcon sx={{color:'#f29494',height:20,width:20}} fontSize="inherit" />
</IconButton>
<IconButton onClick={()=>this.props.navigate('/Lead/:' + `${s.id}`)} sx={{marginRight:{xs:1,sm:2,md:3},padding:0.2}} aria-label="delete" size="medium">
  <ShortcutIcon sx={{color:'#66b4da'}} fontSize="inherit" />
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


     </div>
    )
  }
}

export default BunnchLeadList;

export function BunnchLeadListc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<BunnchLeadList location={location} param={param} navigate={navigate}></BunnchLeadList>)
}

