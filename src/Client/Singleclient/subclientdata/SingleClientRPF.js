import React, { Component } from 'react'
import {Box,Paper,Tooltip,IconButton,TextField,Button,Backdrop ,TablePagination,Modal,Typography,TableBody,Link,Table,TableContainer,TableCell,TableHead,TableRow,Divider} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Checkbox from 'rc-checkbox';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CloseIcon from '@mui/icons-material/Close';
import base from '../../../base'
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import moment from 'moment'
import { SyncLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
const password = require('secure-random-password');


export class SingleClientRPF extends Component {

constructor(props) {
  super(props)

  this.state = {
     first:"",
     is_loader_open:true,
     password:"",
     form_edit:false,
     rfpList:[],
     search:"",
     rfpList_size:0,
     page:0,
     rowsPerPage:10,


     ////////// rfp edit section  //////////////

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
     email_id:"",
     phone_no:"",


     
     client_role : JSON.parse(sessionStorage.getItem('client_role')),
  }
  this.handleChange = this.handleChange.bind(this);
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

    fetch(`${base.base_url}/retriveAllRfprForCrmSingleClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      search:this.state.search,
       page:this.state.page,
       rowsPerPage :this.state.rowsPerPage,
       client_id:this.props.param.singleclient.replace(/:/g,''),
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({rfpList:result.data,rfpList_size:result.length})
    })


  })
}

componentDidMount(){
  fetch(`${base.base_url}/retriveAllRfprForCrmSingleClient`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
    search:this.state.search,
     page:this.state.page,
     rowsPerPage :this.state.rowsPerPage,
     client_id:this.props.param.singleclient.replace(/:/g,''),
    })
  }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({rfpList:result.data,rfpList_size:result.length,is_loader_open:false})
  })
}



handleChangePage = (event, newPage) => {
  this.setState({page:newPage},()=>{
    fetch(`${base.base_url}/retriveAllRfprForCrmSingleClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      search:this.state.search,
       page:this.state.page,
       rowsPerPage :this.state.rowsPerPage,
       client_id:this.props.param.singleclient.replace(/:/g,''),
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({rfpList:result.data,rfpList_size:result.length})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveAllRfprForCrmSingleClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      search:this.state.search,
       page:this.state.page,
       rowsPerPage :this.state.rowsPerPage,
       client_id:this.props.param.singleclient.replace(/:/g,''),
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({rfpList:result.data,rfpList_size:result.length})
    })
  })
};


instantRetrive=()=>{
  fetch(`${base.base_url}/retriveAllRfprForCrmSingleClient`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
    search:this.state.search,
     page:this.state.page,
     rowsPerPage :this.state.rowsPerPage,
     client_id:this.props.param.singleclient.replace(/:/g,''),
    })
  }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({rfpList:result.data,rfpList_size:result.length})
  })
}



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
        email_id:this.state.email_id,
        phone_no:this.state.phone_no,
        criteria:[],
        client_id:this.state.client_id,
        department_id:this.state.department_id,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
  this.instantRetrive()
   this.setState({form_edit:false})
   this.updated()
    })
  }else{
   this.fail()
  }

}




updated=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>RFP Successfully Update</Typography>, {
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

succes=()=>{
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

fail=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields</Typography>, {
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



handleChangePage = (event, newPage) => {
  this.setState({page:newPage},()=>{

    fetch(`${base.base_url}/retriveAllRfprForCrmSingleClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      search:this.state.search,
       page:this.state.page,
       rowsPerPage :this.state.rowsPerPage,
       client_id:this.props.param.singleclient.replace(/:/g,''),
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({rfpList:result.data,rfpList_size:result.length})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveAllRfprForCrmSingleClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      search:this.state.search,
       page:this.state.page,
       rowsPerPage :this.state.rowsPerPage,
       client_id:this.props.param.singleclient.replace(/:/g,''),
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({rfpList:result.data,rfpList_size:result.length})
    })

  })
};





  render() {
    return (
      <div>
<Box sx={{minHeight:300,backgroundColor:'#fff',mt:1,ml:1,mr:1}}>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row',mt:{xs:1,sm:1,md:1},ml:{xs:2,sm:2,md:2}}}>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',mt:1,mb:1,ml:2}}>RFP</Typography>
</Box>



<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'}}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:1,mt:{xs:1,sm:1,md:1},height:30,marginRight:{xs:2,sm:2,md:2},ml:2}}>
    <TextField type='text' fullWidth onChange={this.handleChangeSearch}  name='search' variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true,sx:{fontSize:"13px",fontWeight:'600',color:'#666666'}}}  placeholder='RFP id' sx={{"& input::placeholder": {
      fontSize: "13px",
      marginLeft:"2px"
    }}}/>
</Box>

</Box>
</Box>











<Box sx={{mt:1,padding:1}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>RFP ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Title</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>ManagedBy</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Email ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Phone No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Proposal Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Date</TableCell>
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
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}} >
            {row.rfp_id}
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.rfp_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.managed_by}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.email_id}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.phone_no}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.start_date).format('DD-MM-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.due_date).format('DD-MM-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Box sx={{height:30,minWidth:40,backgroundColor:'#f8f9ff',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>{row.status} </Box></TableCell>
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
    email_id:row.email_id,
    phone_no:row.phone_no
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
this.instantRetrive()
this.succes()
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
          count={this.state.rfpList_size}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />

</Box>
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

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit RFP</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>RFP Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.rfp_name}  name="rfp_name" fullWidth size='small' />

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Managed By<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.managed_by} name="managed_by" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>RFP Owner<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.rfp_owner}  name="rfp_owner" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Expected Start Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.start_date).format('YYYY-MM-DD')}  name="start_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Expected End Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.end_date).format('YYYY-MM-DD')}  name="end_date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Estimated Budget<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.budget}  name="budget" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Proposal Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='date' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.due_date).format('YYYY-MM-DD')} name="due_date" fullWidth size='small'/>


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

export default SingleClientRPF



export function SingleClientRPFc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<SingleClientRPF location={location} param={param} navigate={navigate}></SingleClientRPF>)
}

































