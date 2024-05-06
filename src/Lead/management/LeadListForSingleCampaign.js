import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import Sidebar from '../../Sidebar'
import Chat from '../../Chat'
import { Sidebarc } from '../../Sidebar'
import { Button, Input, Paper, Typography, touchRippleClasses } from '@mui/material'
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
import base from '../../base'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {SyncLoader} from 'react-spinners'
import { localeData } from 'moment'
import { ToastContainer, toast } from 'react-toastify';
const drawerWidth = 240;

export class LeadListForSingleCampaign extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       delete_confirmation:false,
       file:"",
       page:0,
       rowsPerPage:20,
       totalLeadSize:0,
       lead_list:[],

       leadData:{},
       minWidth:920,



       lead_role : JSON.parse(window.sessionStorage.getItem('lead_role')),


       /////// lead data / ////


       lead_id:"",
       campaign_id:"",
       bunch_id:"",

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
    this.setState({is_loader_open:true})
    fetch(`${base.base_url}/retriveAllLeadsofSignleCampaign`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage,
       campaign_id:this.props.param.campaignId.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({leadData:result,totalLeadSize:result.length,is_loader_open:false})
   
    })
  }


  retriveLeads=()=>{
    this.setState({is_loader_open:true},()=>{
  fetch(`${base.base_url}/retriveAllLeadsofSignleCampaign`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage,
       campaign_id:this.props.param.campaignId.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({leadData:result,totalLeadSize:result.length,is_loader_open:false})
   
    })

    })
    
  }


  handleChangePage = (event, newPage) => {
    this.setState({page:newPage,is_loader_open:true},()=>{
      fetch(`${base.base_url}/retriveAllLeadsofSignleCampaign`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
         page:this.state.page,
         rowsPerPage:this.state.rowsPerPage,
         campaign_id:this.props.param.campaignId.replace(/:/g,'')
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({leadData:result,totalLeadSize:result.length,is_loader_open:false})
     
      })

    })
  };
  
  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:parseInt(event.target.value, 10)})
    this.setState({page:0,is_loader_open:true},()=>{
      fetch(`${base.base_url}/retriveAllLeadsofSignleCampaign`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
         page:this.state.page,
         rowsPerPage:this.state.rowsPerPage,
         campaign_id:this.props.param.campaignId.replace(/:/g,'')
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({leadData:result,totalLeadSize:result.length,is_loader_open:false})
     
      })
    })
  };
  

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
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>List of Leads</Typography>
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



<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:this.state.minWidth }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr. no</TableCell>
            
            {
          this.state.leadData.headers?this.state.leadData.headers.map((e)=>(
             <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191',textTransform:'capitalize'}}>{e}</TableCell>
          )) :null
            }
            
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.leadData.data?this.state.leadData.data.map((row,index) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:index % 2?'#f9f9f9' : "#fff" }}
            >
          <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>{this.state.page * this.state.rowsPerPage + index + 1}</TableCell>

           {
          this.state.leadData.headers?this.state.leadData.headers.map((e,indexx)=>(
             <TableCell align='center' sx={{color:'#42526e'}}>{row[e]}</TableCell>
          )) :null
            }
           
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>

<Tooltip title="Delete">
  <IconButton disabled={this.state.lead_role.is_delete?false:true} size='small' onClick={()=>{

this.setState({
  delete_confirmation:true,
  lead_id:row.lead_id,
  campaign_id:row.campaign_id,
  bunch_id:row.bunch_id,
})

  }} >
<DeleteForeverIcon sx={{color:'#f29494',height:15,width:15}}/>
</IconButton>
</Tooltip>

 </Box></TableCell>
            </TableRow>
          )):null
        
        }
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
   <TablePagination
          rowsPerPageOptions={[5, 20, 40]}
          component="div"
          count={this.state.totalLeadSize}
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
  
  fetch(`${base.base_url}/deleteSingleLead`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'delete',
    body:JSON.stringify({
     bunch_id:this.state.bunch_id,
     lead_id:this.state.lead_id,
     campaign_id:this.state.campaign_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({
      delete_confirmation:false
    })
    this.retriveLeads();
    this.succes()
    })



}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({
delete_confirmation:false,

    bunch_id:"",
    lead_id:"",
    campaign_id:""

})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>
</Box>

</Box>
</Paper>
</Box>
</Modal>
</Box>



<Box>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor:"transparent"}}
  open={false}
>
  <Box elevation={2} sx={{height:50,width:100,display:'flex',justifyContent:'center',alignItems:'center'}}>
    <SyncLoader speedMultiplier={1} size={13} color="#008ffb" />
  </Box>

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

export default LeadListForSingleCampaign









export function LeadListForSingleCampaignc(props){
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams()
    return (<LeadListForSingleCampaign param={param} location={location} navigate={navigate}></LeadListForSingleCampaign>)
  }