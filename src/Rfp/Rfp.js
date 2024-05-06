import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,Link } from 'react-router-dom'
import base from '../base'
import {SyncLoader} from 'react-spinners'
import moment from 'moment'
const drawerWidth = 240;

export class Rfp extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       search:"",
       page:0,
       rowsPerPage:10,
       rfpList:[],
       rfpList_Size:0,
    }
    this.handleChange = this.handleChange.bind();
    this.handleChangeSearch = this.handleChangeSearch.bind();
  }

handleChangeSearch=(e)=>{
this.setState({
  [e.target.name]:e.target.value,page:0
},()=>{

  fetch(`${base.base_url}/retriveAllRfpForCrmAdmin`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
    search : this.state.search,
    page:this.state.page,
    rowsPerPage :this.state.rowsPerPage,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({rfpList:result.data,rfpList_Size:result.length})
  })
})
}

handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

  componentDidMount(){
    fetch(`${base.base_url}/retriveAllRfpForCrmAdmin`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      search : this.state.search,
      page:this.state.page,
      rowsPerPage :this.state.rowsPerPage,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({rfpList:result.data,rfpList_Size:result.length,is_loader_open:false})
    })
  }



  retriveRfp=()=>{
    fetch(`${base.base_url}/retriveAllRfpForCrmAdmin`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      search : this.state.search,
       page:this.state.page,
       rowsPerPage :this.state.rowsPerPage,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({rfpList:result.data,rfpList_Size:result.length})
    })

  }


  handleChangePage = (event, newPage) => {
    this.setState({page:newPage},()=>{

      fetch(`${base.base_url}/retriveAllRfpForCrmAdmin`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
        search : this.state.search,
        page:this.state.page,
        rowsPerPage :this.state.rowsPerPage,
        })
      }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({rfpList:result.data,rfpList_Size:result.length})
      })

    })
  };
  
  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:parseInt(event.target.value, 10)})
    this.setState({page:0},()=>{
      fetch(`${base.base_url}/retriveAllRfpForCrmAdmin`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
        search : this.state.search,
        page:this.state.page,
        rowsPerPage :this.state.rowsPerPage,
        })
      }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({rfpList:result.data,rfpList_Size:result.length})
      })
    })
  };
  




  render() {
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>RPF</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>RPF List</Typography>
</Box>
</Paper>






<Paper sx={{width:'100%',minHeight:600,mt:2}}>

<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row'}}>

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
<TextField  onChange={this.handleChangeSearch} name='search' variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search client id'/>
</Box>
</Box>



<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>RFP ID</TableCell>
          <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Client ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>RFP Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>RFP owner</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Email ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Phone No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Start date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rfpList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  onClick={async()=>{sessionStorage.setItem('rfp_data',JSON.stringify(row));this.props.navigate('/Rfp/:' + row.rfp_id )}} >
                <Link> {row.rfp_id}</Link>
              </TableCell> 
              <TableCell align='center' sx={{color:'#42526e'}} onClick={()=>this.props.navigate('/client/:'+row.client_id)}><Link>{row.client_id}</Link></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}} >{row.rfp_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.rfp_owner}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.email_id}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.phone_no}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.due_date).format('DD-MM-YYYY') }</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.start_date).format('DD-MM-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.end_date).format('DD-MM-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>
                {row.status}
                </TableCell>
              
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete">
  <IconButton size='small' onClick={()=>{
fetch(`${base.base_url}/deleteRfp`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'delete',
  body:JSON.stringify({
 rfp_id:row.rfp_id
  })
}).then((res)=>{return res.json()}).then((result)=>{
this.retriveRfp();
})

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
          count={this.state.rfpList_Size}
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

export default Rfp



export function Rfpc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Rfp location={location} navigate={navigate}></Rfp>)
}



const rfpStatus = [
  {
    id:1,
    name:"Hold"
  },
  {
    id:2,
    name:"Approved"
  },
  {
id:3,
name:"Reject"
  }
]

