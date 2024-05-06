import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import Sidebar from '../../Sidebar'
import { Sidebarc } from '../../Sidebar'
import { Button, Grid, Paper, Typography, touchRippleClasses ,Switch} from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,Link,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import 'react-toastify/dist/ReactToastify.css';
import { SyncLoader } from 'react-spinners';
import base from '../../../base'

const drawerWidth = 240;

export class ClientUsers extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:false,
       form_open:false,
        is_backdrop_open:false,


       showpassword:false,
       delete_confirmation:false,
       search:"",
       allUser_size:0,
       page:0,
       rowsPerPage:10,

       ///// fields area
       name:"",
       emailid:"",
       phone:"",
       password:"",
       confirm_password:"",
       role_id:"",
       role_name:"",

/////////////// delete arae
user_id:"",       
////////////////// edited area
user_edit:false,

name_edit:"",
emailid_edit:"",
phone_edit:"",
password_edit:"",
confirm_password_edit:"",
role_id_edit:"",
role_name_edit:"",

////////////////// view arear
name_view:"",
emailid_view:"",
phone_view:"",
role_id_view:"",
role_name_view:"",
is_viewable:false,

campaign:{},
report:{},
User_And_Roles:{},
lead:{},
invoice:{},
department:{},



////////////////////////////////

       allUser:[],
       allRole:[],

      clientDetails : JSON.parse(sessionStorage.getItem('AllClientData')),

      
      permissiondata : JSON.parse(sessionStorage.getItem('permission')),
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }


handleChangeSearch=(e)=>{
this.setState({[e.target.name]:e.target.value,is_loader_open:true},()=>{
  fetch(`${base.base_url}/retriveClientUser`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
   method:'post',
   body:JSON.stringify({
    page:this.state.page,
    rowsPerPage:this.state.rowsPerPage,
    search:e.target.value,
    client_id:this.state.clientDetails.client_id
   })
  }).then((response)=>{return response.json()}).then((data)=>{
   this.setState({allUser:data.data,allUser_size:data.length,is_loader_open:false})
  });
})
}





succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>User Successfully Added</Typography>, {
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


FillAllFields=()=>{
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



UserAllReadyExists=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Can't Add .User Already Exists</Typography>, {
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



UserUpdated=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>User Updated</Typography>, {
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


UserDeleted=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>User Deleted</Typography>, {
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



  handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

componentDidMount(){
  this.setState({is_loader_open:true})
  fetch(`${base.base_url}/retriveClientUser`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
   method:'post',
   body:JSON.stringify({
    page:this.state.page,
    rowsPerPage:this.state.rowsPerPage,
    search:this.state.search,
    client_id:this.state.clientDetails.client_id
   })
  }).then((response)=>{return response.json()}).then((data)=>{
   this.setState({allUser:data.data,allUser_size:data.length,is_loader_open:false})
  });


  fetch(`${base.base_url}/retriveRoleListForSelect`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
   method:'post',
   body:JSON.stringify({
    client_id:this.state.clientDetails.client_id
   })
  }).then((response)=>{return response.json()}).then((data)=>{
   this.setState({allRole:data.data})
  
  })
}



instantUpdate=()=>{
  this.setState({is_loader_open:true},()=>{
 fetch(`${base.base_url}/retriveClientUser`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
   method:'post',
   body:JSON.stringify({
    page:this.state.page,
    rowsPerPage:this.state.rowsPerPage,
    search:this.state.search,
    client_id:this.state.clientDetails.client_id
   })
  }).then((response)=>{return response.json()}).then((data)=>{
   this.setState({allUser:data.data,allUser_size:data.length,is_loader_open:false})
  });

  })
 
}



deleteUser=()=>{
  this.setState({is_backdrop_open:true},()=>{

    fetch(`${base.base_url}/deleteClientUser`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
   method:'delete',
   body:JSON.stringify({
    user_id:this.state.user_id
   })
  }).then((response)=>{return response.json()}).then((data)=>{
this.instantUpdate();
this.setState({delete_confirmation:false,is_backdrop_open:false});
this.UserDeleted();
  });
  })
  
}



  render() {

    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>User List</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>User List</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',mr:{xs:1,sm:2,md:3}}}>
<Button disabled={this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_create?false:true:true} onClick={()=>this.setState({form_open:true})}  sx={{textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon sx={{color:'#fff'}}/>}>
Add User
</Button>
</Box>
</Paper>






<Paper sx={{width:'100%',minHeight:300,mt:2}}>

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
<TextField name='search' variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}} onChange={this.handleChangeSearch}  placeholder='search'/>
</Box>
</Box>



<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Email Id</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Phone</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Role</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.allUser.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:index % 2?'#f9f9f9':'#fff'  }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
            {index+1}.
              </TableCell> 
              <TableCell align='center' sx={{color:'#42526e'}}>{row.name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.emailid}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.phone}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Button variant='contained' sx={{fontSize:10,fontWeight:'600',height:20,backgroundColor:'#259efa'}}  disableElevation size='small' >{row.role_name}</Button></TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>

                <Tooltip title="View">
  <IconButton size='small'  onClick={()=>this.setState({name_view:row.name,emailid_view:row.emailid,phone_view:row.phone,role_id_view:row.role_id,role_name_view:row.role_name,is_viewable:true},async()=>{
let d =  this.state.allRole.filter((e)=>e.role_id===this.state.role_id_view);
this.setState({
User_And_Roles:d[0].User_And_Roles,
client:d[0].client,
campaign:d[0].campaign,
lead:d[0].lead,
invoice:d[0].invoice,
report:d[0].report,
department:d[0].department,

},()=>{

  
 // console.log(this.state.User_And_Roles,this.state.client,this.state.lead)


})
  })}>
<VisibilityIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Edit">
  <IconButton size='small' disabled={this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_edit?false:true:true} onClick={()=>this.setState({
name_edit:row.name,
emailid_edit:row.emailid,
phone_edit:row.phone,
password_edit:row.password,
confirm_password_edit:row.password,
role_id_edit:row.role_id,
role_name_edit:row.role_name,
user_id:row.user_id
  },()=>{this.setState({user_edit:true})})}>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>


<Tooltip title="Delete">
  <IconButton disabled={this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_delete?false:true:true} size='small' onClick={()=>this.setState({user_id:row.user_id,delete_confirmation:true})} >
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
          count={this.state.allUser_size}
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
<Paper sx={{width:{xs:'90%',sm:'90%',md:'65%',lg:'30%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  form_open:false,
  name:"",
  emailid:"",
  phone:"",
  password:"",
  confirm_password:"",
  role_id:"",
  role_name:"",
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Create User</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='text' value={this.state.name} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} name="name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Phone No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.phone} name="phone" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Email ID<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type="email"  InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="emailid" onChange={this.handleChange} value={this.state.emailid} fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Password<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.password} type='password'  autoComplete='off'
                              inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                  autocomplete: 'off',
                                },
                              }}
                             renderInput={params => <TextField {...params} name='new-password' />} name="password" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Confirm Password<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField
              id="filled-start-adornment"
              name="confirm_password"
              value={this.state.confirm_password}
            onChange={this.handleChange}
              placeholder='Your Password'
              size='small'
              fullWidth
              
              type= {this.state.showpassword?'text':'password'}
              InputProps={{  
                sx:{fontSize:12,fontWeight:'600'},
               
                endAdornment:(
                    <InputAdornment position="start">
                     {
                      this.state.showpassword? <Visibility style={{color:'#a2a2a6'}} onClick={()=>this.setState({showpassword:false})}/>:<VisibilityOff onClick={()=>this.setState({showpassword:true})} style={{color:'#a2a2a6'}}/> 
                     } 
                    </InputAdornment>
                  ),
                
              }}
              variant="outlined"
            />



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Select Role<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'},}}  name="" fullWidth size='small'>
{
  this.state.allRole.map((d)=>(
 <MenuItem key={d.role_id} sx={{fontSize:12,fontWeight:'600'}} value={d.role_id} onClick={()=>this.setState({role_id:d.role_id,role_name:d.role_name})}>
{d.role_name}
</MenuItem>
  ))
}
</TextField>


<Button variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}} onClick={()=>{
 if(this.state.name!=="" && this.state.emailid!=="" && this.state.phone!=="" && this.state.password!=="" && this.state.role_id!=="" && this.state.role_name!==""){
 this.setState({is_backdrop_open:true},()=>{
 fetch(`${base.base_url}/addClientUser`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id:this.state.clientDetails.client_id,
      name:this.state.name,
      emailid:this.state.emailid,
      phone:this.state.phone,
      password:this.state.password,
      role_id:this.state.role_id,
      role_name:this.state.role_name,
    })
  }).then((response)=>{return response.json()}).then((data)=>{
    if(data.status){
  this.setState({
    form_open:false,
    is_backdrop_open:false,
    name:"",
    emailid:"",
    phone:"",
    password:"",
    confirm_password:"",
    role_id:"",
    role_name:"",
  });
 this.instantUpdate();
 this.succes();

    }else{
      this.UserAllReadyExists();
      this.setState({is_backdrop_open:false})
    }

  })

 })





 }else{

this.FillAllFields();

 }

}}>
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



</Box>
</Box>
</Paper>
  </Box>
</Modal>
</Box>





<Box> 
<Modal
  open={this.state.delete_confirmation}
 // onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:300,backgroundColor:'white',borderRadius:2}}>

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
<Button size='small'  variant='contained' onClick={this.deleteUser} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({delete_confirmation:false,user_id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>


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
<Modal
  open={this.state.is_viewable}
 // onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'70%',lg:'60%'},minHeight:'90vh',backgroundColor:'white',borderRadius:2}}>
<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({is_viewable:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>
<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:1}}>User Description</Typography>
<Divider/>
<Box sx={{overflowY:'scroll',mt:1,'&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{mt:2}}>
<Grid container spacing={2} columnSpacing={2}>
<Grid item xs={6} sm={4} md={3}>
  <Box sx={{display:'flex',flexDirection:'column'}}>
   <Typography sx={{fontWeight:'700',fontSize:14,textAlign:'center',color:'#0c2a43'}}>Name</Typography> 
   <Divider sx={{ml:3,mr:3,backgroundColor:'pink'}}/>
   <Typography sx={{fontWeight:'600',fontSize:12,textAlign:'center',mt:1,color:'#154366'}}>{this.state.name_view}</Typography>
  </Box>
</Grid>
<Grid item xs={6} sm={4} md={3}>
<Box sx={{display:'flex',flexDirection:'column'}}>
   <Typography sx={{fontWeight:'700',fontSize:14,textAlign:'center',color:'#0c2a43'}}>Email Id</Typography> 
   <Divider sx={{ml:3,mr:3,backgroundColor:'pink'}}/>
   <Typography sx={{fontWeight:'600',fontSize:12,textAlign:'center',mt:1,color:'#154366'}}>{this.state.emailid_view}</Typography>
  </Box>
</Grid>
<Grid item xs={6} sm={4} md={3}>
<Box sx={{display:'flex',flexDirection:'column'}}>
   <Typography sx={{fontWeight:'700',fontSize:14,textAlign:'center',color:'#0c2a43'}}>Phone No</Typography> 
   <Divider sx={{ml:3,mr:3,backgroundColor:'pink'}}/>
   <Typography sx={{fontWeight:'600',fontSize:12,textAlign:'center',mt:1,color:'#154366'}}>{this.state.phone_view}</Typography>
  </Box>
</Grid>
<Grid item xs={6} sm={4} md={3}>
<Box sx={{display:'flex',flexDirection:'column'}}>
   <Typography sx={{fontWeight:'700',fontSize:14,textAlign:'center',color:'#0c2a43'}}>Role</Typography>
   <Divider sx={{ml:3,mr:3,backgroundColor:'pink'}}/> 
   <Typography sx={{fontWeight:'600',fontSize:12,textAlign:'center',mt:1,color:'#154366'}}>{this.state.role_name_view}</Typography>
  </Box>
</Grid>
</Grid>
</Box>
<br/>
<Typography sx={{fontSize:16,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:-2,color:'#8cbae8'}}>Permission</Typography>
<Box sx={{padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Module/Permission</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Create</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>View</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Edit</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
          
        <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
              Report</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                report:{
                is_create:e.target.checked,
                is_edit:this.state.report.is_edit,
                is_delete:this.state.report.is_delete,
                is_view:this.state.report.is_view
             },}))
              } checked={this.state.report.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                 report:{
                 is_create:this.state.report.is_create,
                 is_edit:e.target.checked,
                 is_delete:this.state.report.is_delete,
                 is_view:this.state.report.is_view
              },}))
              } size='small' checked={this.state.report.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                 report:{
                 is_create:this.state.report.is_create,
                 is_edit:this.state.report.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.report.is_view
              },}))
              } size='small' checked={this.state.report.is_delete}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                  report:{
                  is_create:e.target.checked,
                  is_edit:e.target.checked,
                  is_delete:e.target.checked,
                  is_view:e.target.checked
               },}))
              } checked={this.state.report.is_view}/></TableCell>
            </TableRow>




    
    
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
              Campaign</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                campaign:{
                is_create:e.target.checked,
                is_edit:this.state.campaign.is_edit,
                is_delete:this.state.campaign.is_delete,
                is_view:this.state.campaign.is_view
             },}))
              } checked={this.state.campaign.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  campaign:{
                 is_create:this.state.campaign.is_create,
                 is_edit:e.target.checked,
                 is_delete:this.state.campaign.is_delete,
                 is_view:this.state.campaign.is_view
              },}))
              } size='small' checked={this.state.campaign.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  campaign:{
                 is_create:this.state.campaign.is_create,
                 is_edit:this.state.campaign.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.campaign.is_view
              },}))
              } size='small' checked={this.state.campaign.is_delete}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                    campaign:{
                      is_create:e.target.checked,
                      is_edit:e.target.checked,
                      is_delete:e.target.checked,
                      is_view:e.target.checked
               },}))
              } checked={this.state.campaign.is_view}/></TableCell>
            </TableRow>




            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
              Lead</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                lead:{
                is_create:e.target.checked,
                is_edit:this.state.lead.is_edit,
                is_delete:this.state.lead.is_delete,
                is_view:this.state.lead.is_view
             },}))
              } checked={this.state.lead.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  lead:{
                 is_create:this.state.lead.is_create,
                 is_edit:e.target.checked,
                 is_delete:this.state.lead.is_delete,
                 is_view:this.state.lead.is_view
              },}))
              } size='small' checked={this.state.lead.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  lead:{
                 is_create:this.state.lead.is_create,
                 is_edit:this.state.lead.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.lead.is_view
              },}))
              } size='small' checked={this.state.lead.is_delete}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                    lead:{
                      is_create:e.target.checked,
                      is_edit:e.target.checked,
                      is_delete:e.target.checked,
                      is_view:e.target.checked
               },}))
              } checked={this.state.lead.is_view}/></TableCell>
            </TableRow>



          

            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
              Invoice</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                invoice:{
                is_create:e.target.checked,
                is_edit:this.state.invoice.is_edit,
                is_delete:this.state.invoice.is_delete,
                is_view:this.state.invoice.is_view
             },}))
              } checked={this.state.invoice.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  invoice:{
                 is_create:this.state.invoice.is_create,
                 is_edit:e.target.checked,
                 is_delete:this.state.invoice.is_delete,
                 is_view:this.state.invoice.is_view
              },}))
              } size='small' checked={this.state.invoice.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  invoice:{
                 is_create:this.state.invoice.is_create,
                 is_edit:this.state.invoice.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.invoice.is_view
              },}))
              } size='small' checked={this.state.invoice.is_delete}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                    invoice:{
                      is_create:e.target.checked,
                      is_edit:e.target.checked,
                      is_delete:e.target.checked,
                      is_view:e.target.checked
               },}))
              } checked={this.state.invoice.is_view}/></TableCell>
            </TableRow>







            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
               Department</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                department:{
                is_create:e.target.checked,
                is_edit:this.state.department.is_edit,
                is_delete:this.state.department.is_delete,
                is_view:this.state.department.is_view
             },}))
              } checked={this.state.department.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  department:{
                 is_create:this.state.department.is_create,
                 is_edit:e.target.checked,
                 is_delete:this.state.department.is_delete,
                 is_view:this.state.department.is_view
              },}))
              } size='small' checked={this.state.department.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  department:{
                 is_create:this.state.department.is_create,
                 is_edit:this.state.department.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.department.is_view
              },}))
              } size='small' checked={this.state.department.is_delete}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                    department:{
                      is_create:e.target.checked,
                      is_edit:e.target.checked,
                      is_delete:e.target.checked,
                      is_view:e.target.checked
               },}))
              } checked={this.state.department.is_view}/></TableCell>
            </TableRow>



            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
              User & Roles</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                User_And_Roles:{
                is_create:e.target.checked,
                is_edit:this.state.User_And_Roles.is_edit,
                is_delete:this.state.User_And_Roles.is_delete,
                is_view:this.state.User_And_Roles.is_view
             },}))
              } checked={this.state.User_And_Roles.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                 User_And_Roles:{
                 is_create:this.state.User_And_Roles.is_create,
                 is_edit:e.target.checked,
                 is_delete:this.state.User_And_Roles.is_delete,
                 is_view:this.state.User_And_Roles.is_view
              },}))
              } size='small' checked={this.state.User_And_Roles.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                 User_And_Roles:{
                 is_create:this.state.User_And_Roles.is_create,
                 is_edit:this.state.User_And_Roles.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.User_And_Roles.is_view
              },}))
              } size='small' checked={this.state.User_And_Roles.is_delete}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                  User_And_Roles:{
                    is_create:e.target.checked,
                  is_edit:e.target.checked,
                  is_delete:e.target.checked,
                  is_view:e.target.checked
               },}))
              } checked={this.state.User_And_Roles.is_view}/></TableCell>
            </TableRow>
            




        </TableBody>
      </Table>
    </TableContainer>

</Box>
</Box>
</Paper>
</Box>
</Modal>
</Box>












<Box> 
<Modal
  open={this.state.user_edit}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  user_edit:false,
  role_id_edit:"",
  user_id:"",
  name_edit:"",
  phone_edit:"",
  password_edit:"",
  role_name_edit:"",
  emailid_edit:""
  
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit User</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='text' value={this.state.name_edit} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} name="name_edit" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Phone No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.phone_edit} name="phone_edit" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Email ID<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type="email"  InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="emailid_edit" onChange={this.handleChange} value={this.state.emailid_edit} fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Password<Typography sx={{color:'red'}}>*</Typography></Typography>

<TextField type='password'  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} 
value={this.state.password_edit}
  name="password_edit"
   fullWidth size='small'
   autoComplete='off'
   inputProps={{
     autocomplete: 'new-password',
     form: {
       autocomplete: 'off',
     },
   }}
  renderInput={params => <TextField {...params} name='new-password' />}
   />

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Confirm Password<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField
              id="filled-start-adornment"
              name="confirm_password_edit"
              value={this.state.confirm_password_edit}
            onChange={this.handleChange}
              placeholder='Your Password'
              size='small'
              fullWidth
              
              type= {this.state.showpassword?'text':'password'}
              InputProps={{  
                sx:{fontSize:12,fontWeight:'600'},
               
                endAdornment:(
                    <InputAdornment position="start">
                     {
                      this.state.showpassword? <Visibility style={{color:'#a2a2a6'}} onClick={()=>this.setState({showpassword:false})}/>:<VisibilityOff onClick={()=>this.setState({showpassword:true})} style={{color:'#a2a2a6'}}/> 
                     } 
                    </InputAdornment>
                  ),
                
              }}
              variant="outlined"
            />

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Select Role<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'},}}  value={this.state.role_id_edit} name="role_name_edit" fullWidth size='small'>
{
  this.state.allRole.map((d)=>(
 <MenuItem key={d.role_id} sx={{fontSize:12,fontWeight:'600'}} value={d.role_id} onClick={()=>this.setState({role_id_edit:d.role_id,role_name_edit:d.role_name})}>
{d.role_name}
</MenuItem>
  ))
}
</TextField>


<Button variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}} onClick={()=>{

 if(this.state.name_edit!=="" && this.state.emailid_edit!=="" && this.state.phone_edit!=="" && this.state.password_edit!=="" && this.state.role_id_edit!=="" && this.state.role_name_edit!==""){
 this.setState({is_backdrop_open:true},()=>{

   fetch(`${base.base_url}/editClientUser`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'put',
    body:JSON.stringify({
      user_id:this.state.user_id,
      name:this.state.name_edit,
      emailid:this.state.emailid_edit,
      phone:this.state.phone_edit,
      password:this.state.password_edit,
      role_id:this.state.role_id_edit,
      role_name:this.state.role_name_edit,
    })
  }).then((response)=>{return response.json()}).then((data)=>{
   
     this.setState({
    user_edit:false,
    is_backdrop_open:false,
    role_id_edit:"",
    user_id:"",
    name_edit:"",
    phone_edit:"",
    password_edit:"",
    role_name_edit:"",
    emailid_edit:""
  });
  this.instantUpdate();
   this.UserUpdated()  
  
  })
 })


}else{
  this.FillAllFields();
}
}}>
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
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_backdrop_open}
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>
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

export default ClientUsers











