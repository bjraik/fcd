import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../../Appheader'
import Sidebar from '../../../Sidebar'
import { Sidebarc } from '../../../Sidebar'
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
import base from '../../../../base'
import {SyncLoader} from 'react-spinners'
import { localeData } from 'moment'
import { ToastContainer, toast } from 'react-toastify';
const drawerWidth = 240;

export class SingleCampaignLeadList extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:false,
       form_open:false,
       file:"",
       page:0,
       rowsPerPage:20,
       totalLeadSize:0,
       lead_list:[],

       leadData:{},
       minWidth:920,

       permissiondata : JSON.parse(sessionStorage.getItem('permission')),

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
  this.setState({leadData:result,totalLeadSize:result.length})
   
    })
  }


  retriveLeads=()=>{
    this.setState({is_loader_open:true},()=>{
  fetch(`${base.base_url}/retriveAllLeadsofSignleCampaign`,{
      headers:{
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
    this.setState({rowsPerPage:parseInt(event.target.value, 10),is_loader_open:true})
    this.setState({page:0},()=>{
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
<Box sx={{p:{xs:2,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Leads</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>List of Leads</Typography>
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:index % 2? '#f9f9f9':'#fff' }}
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
  <IconButton disabled={true} size='small' onClick={()=>{
     fetch(`${base.base_url}/deleteSingleLead`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
       bunch_id:row.bunch_id,
       lead_id:row.lead_id,
       campaign_id:row.campaign_id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.retriveLeads();
      this.succes()
      })
  }} >
<DeleteForeverIcon sx={{color:'#e0e0e0',height:15,width:15}}/>
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

     </div>
    )
  }
}

export default SingleCampaignLeadList









export function SingleCampaignLeadListc(props){
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams()
    return (<SingleCampaignLeadList param={param} location={location} navigate={navigate}></SingleCampaignLeadList>)
  }



