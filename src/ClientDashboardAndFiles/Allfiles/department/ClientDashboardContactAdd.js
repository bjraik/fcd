import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import { Sidebarc } from '../../Sidebar'
import { Button, Paper, Typography,Switch } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate,useLocation,useMatch,Link, useParams } from 'react-router-dom';
import {Tooltip,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import base from '../../../base'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import moment from 'moment'
import ReactTimeAgo from 'react-time-ago'
import { SyncLoader } from 'react-spinners';
import en from 'javascript-time-ago/locale/en.json'
import SyncLockIcon from '@mui/icons-material/SyncLock';
import TimeAgo from 'javascript-time-ago'
import bg from '../../../img/bgimg.svg'
TimeAgo.addDefaultLocale(en)
const JsonSearch = require('search-array').default


const drawerWidth = 240;



const password = require('secure-random-password');
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}




export class ClientDashboardContactAdd extends Component {

constructor(props) {
  super(props)

  this.state = {
    client_details : JSON.parse(sessionStorage.getItem('payload')),
    is_backdrop_open:false,
     first:"",
     search:"",
     is_loader_open:true,
     delete_confirmation:false,
     page:0,
     dense:false,
     rowsPerPage:10,
     order:"asc",
     orderBy:'calories',
     edit_form:false,
     form_open:false,
     departmentList:[],
     contact_list:[],
     department_id:"",
     department_name:"",
     contact_id:"",
     first_name:"",
     last_name:"",
     email_id:"",
     phone_no:"",
     job_title:"",
    password:"",


    permissiondata : JSON.parse(sessionStorage.getItem('permission')),
     
  }
  this.handleChange = this.handleChange.bind()
}


handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

regeneratePassword=()=>{
  this.setState({password:password.randomPassword({ characters: password.lower + password.upper + password.digits })})
}

async componentDidMount(){
this.retriveAllContact();
this.retriveDepartmentList();
}
  


////// retriving all department for drop down
retriveDepartmentList=()=>{
  fetch(`${base.base_url}/retrive_all_department_for_admin_client_page`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id:this.state.client_details.client_id,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.setState({departmentList:result.data})
  })
}




///// retrive all contact list
retriveAllContact=()=>{
  this.setState({is_loader_open:true},()=>{
    fetch(`${base.base_url}/retriveContactAll`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
  client_id:this.state.client_details.client_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({contact_list:result.data,is_loader_open:false})
  }) 
  })
 
}


save=()=>{
if(this.state.first_name==""||this.state.last_name==""||this.state.email_id==""||this.state.phone_no==""||this.state.job_title==""||this.state.password==""||this.state.department_id==""){
  this.fail();
}else{
  this.setState({is_backdrop_open:true},()=>{
  fetch(`${base.base_url}/addContact`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      department_id:this.state.department_id,
      department_name:this.state.department_name,
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      email_id:this.state.email_id,
      phone_no:this.state.phone_no,
      job_title:this.state.job_title,
      password:this.state.password,
      client_id:this.state.client_details.client_id,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    if(result.status){
    this.setState({
      is_backdrop_open:false,
    form_open:false,
    department_name:"",
    department_id:"",
    first_name:"",
    last_name:"",
    email_id:"",
    phone_no:"",
    job_title:"",
    password:"",
    
  });
  this.retriveAllContact();
   this.succes();
    }else{
      this.err()
      this.setState({
        is_backdrop_open:false,
      form_open:false
      })
    }
  })

  })


}
}



err=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Contact Person Already Exists</Typography>, {
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
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Contact Person Successfully Added</Typography>, {
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


contact_deleted=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Contact Successfully Deleted</Typography>, {
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


/////////////  this remaining  ///////////////////


edit=()=>{
  if(this.state.department_name==""||this.state.first_name==""||this.state.last_name==""||this.state.email_id==""||this.state.phone_no==""||this.state.job_title==""||this.state.password==""||this.state.department_id=="" || this.state.contact_id==""){
this.fail();
  }else{
    this.setState({is_backdrop_open:true},()=>{

     fetch(`${base.base_url}/editContact`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'put',
  body:JSON.stringify({
    department_id:this.state.department_id,
    contact_id : this.state.contact_id,
    department_name:this.state.department_name,
    first_name:this.state.first_name,
    last_name:this.state.last_name,
    email_id:this.state.email_id,
    phone_no:this.state.phone_no,
    job_title:this.state.job_title,
    password:this.state.password,
    client_id:this.state.client_details.client_id,
  })
}).then((res)=>{return res.json()}).then((result)=>{

  if(result.status){

 this.setState({
  edit_form:false,
  is_backdrop_open:false,
  contact_id:"",
  department_id:"",
  department_name:"",
  first_name:"",
  last_name:"",
  email_id:"",
  phone_no:"",
  job_title:"",
   password:"",
});
this.updated();
 this.retriveAllContact();


  }else{

    this.err()
    this.setState({
      is_backdrop_open:false,
    form_open:false
    })


  }



})

    })

  }
}



handleChangePage = (event, newPage) => {
  this.setState({page:newPage})
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0})
};



updated=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Contact Person Details Updated</Typography>, {
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




  render() {
    const searcher = new JsonSearch(this.state.contact_list, {
      indice: {
       // search the `title`
       'department_name':'department_name',
        'first_name': 'first_name', // search the `author` but it's renamed as `name` in queries
        'last_name':'last_name',
        'job_title':'job_title',
        'phone_no':'phone_no',
        'email_id':'email_id'
      }
    })

    let filtered_data = searcher.query(this.state.search)

    let mm =   stableSort(filtered_data, getComparator(this.state.order, this.state.orderBy)).slice(
      this.state.page * this.state.rowsPerPage,
      this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
    )

    let mmmm =  mm.sort((a, b) => a.department_name.localeCompare(b.department_name))

    return (
      <div>

<Box sx={{display:'flex'}}>

<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:2,sm:3}, mt:6}}>








<Box sx={{minHeight:300,mt:1}}>
<Paper sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},minHeight:50,justifyContent:'space-between'}}>

<Box sx={{display:'flex',flexDirection:'row',ml:{xs:2,sm:2,md:2}}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',mt:1}} >
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151'}}>Contact</Typography>
</Box>
</Box>



<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},mr:2,ml:2,mb:1}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:1,mt:{xs:1,sm:1,md:1},minHeight:30,marginRight:{xs:1,sm:1,md:0}}}>
    <TextField type='text' fullWidth  name='search' onChange={this.handleChange} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191',mt:0.5}}/>, disableUnderline:true,sx:{fontSize:"13px",fontWeight:'600',color:'#666666'}}}  placeholder='Search' sx={{"& input::placeholder": {
      fontSize: "13px",
      marginLeft:"2px",mt:0.5
    }}}/>
</Box>

<Box sx={{mt:{xs:1,sm:1,md:1}}}>
<Button size='small'  disabled={this.state.permissiondata?this.state.permissiondata.department.is_create?false:true:true} onClick={()=>{this.setState({form_open:true})}} component="label" sx={{textTransform:'none',fontSize:13,height:30,backgroundColor:'#259efa',ml:{xs:0,sm:0,md:2},fontWeight:600}} disableElevation variant="contained" startIcon={<AddIcon  sx={{color:'#fff'}}/>}>
Add Contact
</Button>
</Box>
</Box>
</Paper>



<Box sx={{mt:1}}>

<TableContainer component={Paper}>
      <Table sx={{minWidth:1220 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr. No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Dept Name</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Job Title</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Email Id</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Phone No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mmmm.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,backgroundColor:i% 2?'#f9f9f9':'#fff'}}
            >
              <TableCell  component="th"  scope="row" sx={{color:'#42526e',fontSize:13,textTransform:'capitalize',ml:5}}  >
             <Typography sx={{ml:2,fontSize:13}}>{this.state.page * this.state.rowsPerPage + i + 1}</Typography> 
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}}>{row.department_name}</TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}} onClick={async()=>{
                localStorage.setItem("clientcontactData",JSON.stringify(row))
                this.props.navigate('/clientConatctAdd/profile')
                }}> <Button variant='contained' sx={{fontSize:10,fontWeight:'600',height:20,backgroundColor:'#259efa'}}  disableElevation size='small' ><Link style={{color:'#fff'}}>{row.first_name+ " " + row.last_name}</Link></Button></TableCell>

              <TableCell align='center' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}}>{row.job_title}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}}>{row.email_id}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}}>{row.phone_no}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}}>{row.is_active?<Button disableElevation sx={{height:17,width:24,fontSize:9,fontWeight:'bold',backgroundColor:'green'}}  variant='contained'>Active</Button>:<Button  disableElevation sx={{height:17,minWidth:24,fontSize:9,fontWeight:'bold',backgroundColor:'red'}}  variant='contained'>InActive</Button>}</TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small' disabled={this.state.permissiondata?this.state.permissiondata.department.is_edit?false:true:true} onClick={()=>{
    this.setState({
      edit_form:true,
      department_id:row.department_id,
      department_name:row.department_name,
      contact_id:row.contact_id,
      first_name:row.first_name,
      last_name:row.last_name,
      email_id:row.email_id,
      phone_no:row.phone_no,
      job_title:row.job_title,
     password:row.password,
    })
  }}>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>
 </Box></TableCell>
            </TableRow>
          ))
        
        }
        </TableBody>
      </Table>
    </TableContainer>
    <Divider sx={{mb:0.8}}/>
   <TablePagination
          rowsPerPageOptions={[1, 10, 25]}
          component={Paper}
          count={filtered_data.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
</Box>


<Box sx={{display:this.state.contact_list.length>0?'none':'flex',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
  <img src={bg} style={{height:170,width:170,opacity:0.5}}/>
  <Typography sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>No Data Found</Typography>
</Box>
</Box>



</Box>
</Box>
</Box>





<Box>
<Modal
  open={this.state.form_open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  form_open:false
})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>



<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Contact</Typography>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},overflowY:'scroll',maxHeight:'75vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Department Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} onChange={this.handleChange}  value={this.state.department_name} name="department_name" fullWidth size='small'>
 {this.state.departmentList.map((dept_data)=>(
  <MenuItem sx={{fontSize:12,fontWeight:'600'}} key={dept_data.department_id} onClick={()=>this.setState({department_id:dept_data.department_id,department_name:dept_data.department_name})} value={dept_data.department_name}>{dept_data.department_name}</MenuItem>
 ))
 } 
</TextField>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>First Name <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  name="first_name" fullWidth size='small' onChange={this.handleChange} value={this.state.first_name} />

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Last Name <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} onChange={this.handleChange} value={this.state.last_name}  name="last_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Email Id <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='email' required InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  name="email_id" fullWidth size='small' onChange={this.handleChange} value={this.state.email_id} />

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Phone No <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='phone' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  name="phone_no" fullWidth size='small' onChange={this.handleChange}  value={this.state.phone_no}/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Job Title <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  name="job_title" fullWidth size='small' onChange={this.handleChange} value={this.state.job_title} />


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Password<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField name="password" onChange={this.handleChange} value={this.state.password} InputProps={{endAdornment:<Tooltip title="Reset Password"><IconButton onClick={()=>this.setState({password:password.randomPassword({ characters: password.lower + password.upper + password.digits })})}><SyncLockIcon   sx={{color:'#2486bb'}}/> </IconButton></Tooltip>    ,sx:{fontSize:12,fontWeight:'600'}}}   fullWidth size='small'/>



<Button variant='contained' onClick={this.save} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>

<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_backdrop_open}
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>
</Box>
<br/>
<br/>
<br/>
</Box>
</Paper>
  </Box>
</Modal>
</Box>



{
  ////////// form will be open for edit here
}

<Box>
<Modal
  open={this.state.edit_form}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
 edit_form:false
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>



<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Contact</Typography>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},overflowY:'scroll',maxHeight:'75vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Department Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} onChange={this.handleChange}  value={this.state.department_name} name="department_name" fullWidth size='small'>
 {this.state.departmentList.map((dept_data)=>(
  <MenuItem sx={{fontSize:12,fontWeight:'600'}} key={dept_data.department_id} onClick={()=>this.setState({department_id:dept_data.department_id,department_name:dept_data.department_name})} value={dept_data.department_name}>{dept_data.department_name}</MenuItem>
 ))
 } 
</TextField>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>First Name <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  name="first_name" fullWidth size='small' onChange={this.handleChange} value={this.state.first_name} />

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Last Name <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} onChange={this.handleChange} value={this.state.last_name}  name="last_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Email Id <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  name="email_id" fullWidth size='small' onChange={this.handleChange} value={this.state.email_id} />

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Phone No <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  name="phone_no" fullWidth size='small' onChange={this.handleChange}  value={this.state.phone_no}/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Job Title <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  name="job_title" fullWidth size='small' onChange={this.handleChange} value={this.state.job_title} />


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Password<Typography sx={{color:'red'}}>*</Typography></Typography>

<TextField type="password" name="password" onChange={this.handleChange} value={this.state.password} InputProps={{endAdornment:<Tooltip title="Reset Password"><IconButton onClick={()=>this.setState({password:password.randomPassword({ characters: password.lower + password.upper + password.digits })})}><SyncLockIcon   sx={{color:'#2486bb'}}/> </IconButton></Tooltip>    ,sx:{fontSize:12,fontWeight:'600'}}}   fullWidth size='small'/>


<Button variant='contained' onClick={this.edit} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>


<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_backdrop_open}
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>
</Box>

<br/>
<br/>
<br/>
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
  this.setState({is_backdrop_open:true},()=>{
   fetch(`${base.base_url}/deleteContact`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
        contact_id:this.state.contact_id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({delete_confirmation:false,is_backdrop_open:false})
  this.contact_deleted();
  this.retriveAllContact();
    })


  })
 
}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({delete_confirmation:false,client_id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>

<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_backdrop_open}
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>
</Box>



</Box>

</Box>
</Paper>
</Box>
</Modal>
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





<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>


      </div>
    )
  }
}


export default ClientDashboardContactAdd

export function ClientDashboardContactAddc(props){
  const navigate = useNavigate();
  const param  = useParams();
  const location = useLocation();
  return (<ClientDashboardContactAdd location={location} param={param} navigate={navigate}></ClientDashboardContactAdd>)
}