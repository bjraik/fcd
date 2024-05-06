import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../../ClientDashboardAndFiles/Appheader'
import { Sidebarc } from '../../../ClientDashboardAndFiles/Sidebar'
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
import base from '../../../base'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
const drawerWidth = 240;

export class ClientdashboardRFP extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       form_edit:false,
       departmentData : JSON.parse(sessionStorage.getItem('AllClientData')),
       credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
       rfpList:[],
      search:'',
       page:0,
       rowsPerPage:10,
       rfpTotalSize:0,
//////////////////  rfp form  /////////////////
    rfp_id:"",
    rfp_name:"",
    managed_by:"",
    rfp_owner:"",
    start_date:"",
    end_date:"",
    budget:"",
    due_date:"",
    description:"",
    criteria:[],
    client_id:"",
    department_id:"",
    status:"",


    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }


handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}


handleChangeSearch=(e)=>{
  this.setState({
    [e.target.name]:e.target.value,page:0
  },()=>{

    fetch(`${base.base_url}/retriveRfp`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
    search:this.state.search,
       page:this.state.page,
       rowPerPage :this.state.rowsPerPage,
       client_id:this.state.departmentData.client_id,
       department_id:this.state.departmentData.department_id,
       is_admin:this.state.departmentData.is_admin,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({rfpList:result.data,rfpTotalSize:result.length})
    })

  })
}


succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>RFP Successfully Updated</Typography>, {
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



Added=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>RFP Successfully Added</Typography>, {
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
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>RFP Successfully Deleted</Typography>, {
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






  componentDidMount(){
fetch(`${base.base_url}/retriveRfp`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
search:this.state.search,
   page:this.state.page,
   rowPerPage :this.state.rowsPerPage,
   client_id:this.state.departmentData.client_id,
   department_id:this.state.departmentData.department_id,
   is_admin:this.state.departmentData.is_admin,
  })
}).then((res)=>{return res.json()}).then((result)=>{
this.setState({rfpList:result.data,rfpTotalSize:result.length})
})
 }


retriveRfp=()=>{
  fetch(`${base.base_url}/retriveRfp`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search:this.state.search,
     page:this.state.page,
     rowPerPage :this.state.rowsPerPage,
     client_id:this.state.departmentData.client_id,
     department_id:this.state.departmentData.department_id,
     is_admin:this.state.departmentData.is_admin,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({rfpList:result.data,rfpTotalSize:result.length})
  })
}



add_rfp=()=>{

if(this.state.rfp_name!=="" && this.state.managed_by!=="" && this.state.rfp_owner!=="" && this.state.start_date!=="" && this.state.end_date!=="" && this.state.budget!=="" &&  this.state.due_date!=="" && this.state.description!=="" && this.state.departmentData.client_id!=="" && this.state.departmentData.department_id!==""){
  fetch(`${base.base_url}/addRfp`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      rfp_name:this.state.rfp_name,
      managed_by:this.state.managed_by,
      rfp_owner:this.state.rfp_owner,
      start_date:this.state.start_date,
      end_date:this.state.end_date,
      budget:this.state.budget,
      due_date:this.state.due_date,
      description:this.state.description,
      email_id:this.state.departmentData.email_id,
      phone_no:this.state.departmentData.phone_no,
      criteria:[],
      client_id:this.state.departmentData.client_id,
      department_id:this.state.departmentData.department_id,
      status:'Progress',

    })
  }).then((res)=>{return res.json()}).then((result)=>{
 this.retriveRfp();
 this.setState({form_open:false})
 this.Added()
  })
}else{
  this.fails()
}

}




handleChangePage = (event, newPage) => {
  this.setState({page:newPage},()=>{

    fetch(`${base.base_url}/retriveRfp`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
       page:this.state.page,
       rowPerPage :this.state.rowsPerPage,
       client_id:this.state.departmentData.client_id,
       department_id:this.state.departmentData.department_id,
       is_admin:this.state.departmentData.is_admin,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({rfpList:result.data,rfpTotalSize:result.length})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveRfp`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
       page:this.state.page,
       rowPerPage :this.state.rowsPerPage,
       client_id:this.state.departmentData.client_id,
       department_id:this.state.departmentData.department_id,
       is_admin:this.state.departmentData.is_admin,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({rfpList:result.data,rfpTotalSize:result.length})
    })

  })
};

edit_rfp=()=>{
  if(this.state.rfp_name!=="" && this.state.managed_by!=="" && this.state.rfp_owner!=="" && this.state.start_date!=="" && this.state.end_date!=="" && this.state.budget!=="" &&  this.state.due_date!=="" && this.state.description!=="" && this.state.client_id!=="" && this.state.department_id!=="" && this.state.rfp_id!==""){
    fetch(`${base.base_url}/editRfp`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'put',
      body:JSON.stringify({
        rfp_id:this.state.rfp_id,
        rfp_name:this.state.rfp_name,
        managed_by:this.state.managed_by,
        rfp_owner:this.state.rfp_owner,
        start_date:this.state.start_date,
        end_date:this.state.end_date,
        budget:this.state.budget,
        due_date:this.state.due_date,
        description:this.state.description,
        email_id:this.state.departmentData.email_id,
        phone_no:this.state.departmentData.phone_no,
        criteria:[],
        client_id:this.state.client_id,
        department_id:this.state.department_id,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
   this.retriveRfp();
   this.setState({form_edit:false})
   this.succes()
    })
  }else{
   this.fails()
  }

}

  render() {
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>RPF</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>RPF List</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',mr:{xs:1,sm:2,md:3}}}>
<Button onClick={()=>this.setState({form_open:true})} sx={{textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon sx={{color:'#fff'}}/>}>
Add RFP
</Button>
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
<TextField  onChange={this.handleChangeSearch} name='search' variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>
</Box>



<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>RFP ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>RFP Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Email ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Phone No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Start date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Proposal Date</TableCell>
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
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
            {row.rfp_id}
              </TableCell> 
              
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>{row.rfp_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.email_id}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.phone_no}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.start_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.end_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.due_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.status}</TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small' onClick={()=>{

this.setState({

  form_edit:true,
  rfp_id:row.rfp_id,
    rfp_name:row.rfp_name,
    managed_by:row.managed_by,
    rfp_owner:row.rfp_owner,
    start_date:row.start_date,
    end_date:row.end_date,
    budget:row.budget,
    due_date:row.due_date,
    description:row.description,
    criteria:[],
    client_id:row.client_id,
    department_id:row.department_id,

})



  }}>
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
  this.deletd();
    })
  }}>
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
          count={this.state.rfpTotalSize}
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
<Modal
  open={this.state.form_open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add RFP</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>RFP Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.rfp_name}  name="rfp_name" fullWidth size='small' />

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Managed By<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.managed_by} name="managed_by" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>RFP Owner<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.rfp_owner}  name="rfp_owner" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Expected Start Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.start_date}  name="start_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Expected End Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.end_date}  name="end_date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Estimated Budget<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.budget}  name="budget" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Proposal Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='date' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.due_date} name="due_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Description<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  value={this.state.description} name="description" fullWidth size='small'/>


<Box sx={{width:'100%',display:'flex',flexDirection:'row',mt:2,mb:1,justifyContent:'space-between',alignItems:'center'}}>
    <Typography sx={{fontWeight:'bold',fontSize:16}}>Add</Typography>
    <Button size='small' disableElevation sx={{textTransform:'none'}} variant='contained'>Add Option</Button>
</Box>


<TextField  onChange={this.handleChange} placeholder='Option 1' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="date" fullWidth size='small'/>



<br/>
<br/>
<Button onClick={this.add_rfp} variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>
<br/>
<br/>


</Box>
</Box>
</Paper>
</Box>
</Modal>
</Box>








<Box> 
<Modal
  open={this.state.form_edit}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_edit:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add RFP</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>RFP Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.rfp_name}  name="rfp_name" fullWidth size='small' />

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Managed By<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.managed_by} name="managed_by" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>RFP Owner<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.rfp_owner}  name="rfp_owner" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Expected Start Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.start_date}  name="start_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Expected End Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.end_date}  name="end_date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Estimated Budget<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.budget}  name="budget" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Proposal Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='date' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.due_date} name="due_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Description<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  value={this.state.description} name="description" fullWidth size='small'/>


<Box sx={{width:'100%',display:'flex',flexDirection:'row',mt:2,mb:1,justifyContent:'space-between',alignItems:'center'}}>
    <Typography sx={{fontWeight:'bold',fontSize:16}}>Add</Typography>
    <Button size='small' disableElevation sx={{textTransform:'none'}} variant='contained'>Add Option</Button>
</Box>


<TextField  onChange={this.handleChange} placeholder='Option 1' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="date" fullWidth size='small'/>



<br/>
<br/>
<Button onClick={this.edit_rfp} variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
 Edit save
</Button>
<br/>
<br/>


</Box>
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
     </div>
    )
  }
}

export default ClientdashboardRFP



export function ClientdashboardRFPc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ClientdashboardRFP location={location} navigate={navigate}></ClientdashboardRFP>)
}












