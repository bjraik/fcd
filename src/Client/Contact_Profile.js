import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Divider, Grid, Paper, Typography, alertClasses } from '@mui/material'
import {Box,Backdrop,CircularProgress,Button,Tab,Modal,TextField,Radio,Avatar,FormControl,RadioGroup,FormControlLabel} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Tabs from '@mui/material/Tabs';
import Overview from './Overview'
import Checkbox from 'rc-checkbox';
import man from '../img/man.jpg'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import base from '../base'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Mail from '@mui/icons-material/Mail'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const drawerWidth = 240;

export class Contact_Profile extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       tab_value:"General_Info",
       form_open:false,
       contact_id:"",
       department_name:"",
       department_id:"",
       first_name : "",
       last_name : "",
       phone_no  : "",
       facebook :"",
       instagram :"",
       linkedin:"",
       whatsapp_no:"",
       email_id:"",
       gender:"",
       password:"",
       re_password:"",
    }
    this.handlechange = this.handlechange.bind()
  }

handlechange= (e)=>{
  this.setState({[e.target.name]:e.target.value})
}



 async componentDidMount(){

var deparmentOnject = await localStorage.getItem('contactData');
var ref =  JSON.parse(deparmentOnject);

this.setState({
      first_name : ref.first_name,
       last_name : ref.last_name,
       phone_no  : ref.phone_no,
       facebook : ref.facebook_link,
       instagram :ref.instagram_link,
       linkedin:ref.linkedin_url,
       whatsapp_no:ref.whatsapp_no,
       email_id:ref.email_id,
       password:ref.password,
       re_password:ref.password,
       department_id:ref.department_id,
       department_name:ref.department_name,
       contact_id:ref.contact_id,
       gender:ref.gender
})
  }





edit=()=>{
  if(this.state.first_name!=="" && this.state.gender!=="" && this.state.last_name!=="" && this.state.email_id!=="" && this.state.phone_no!=="" && this.state.password!=="" && this.state.department_id!=="" &&  this.state.department_name!=="" && this.state.contact_id!==""){
if(this.state.password==this.state.re_password){
      fetch(`${base.base_url}/editContactFromContactDescriptionPage`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'put',
  body:JSON.stringify({
    contact_id:this.state.contact_id,
    department_id:this.state.department_id,
    department_name:this.state.department_name,
    first_name:this.state.first_name,
    last_name:this.state.last_name,
    email_id:this.state.email_id,
    phone_no:this.state.phone_no,
    password:this.state.password,
    facebook :this.state.facebook,
    instagram :this.state.instagram,
    linkedin:this.state.linkedin,
    whatsapp_no:this.state.whatsapp_no,
    gender:this.state.gender,
  })
}).then((res)=>{return res.json()}).then(async(result)=>{
  this.update();
  this.setState({
 contact_id:result.data[0].contact_id,
 department_id:result.data[0].department_id,
 department_name:result.data[0].department_name,
 first_name:result.data[0].first_name,
 last_name:result.data[0].last_name,
 email_id:result.data[0].email_id,
 phone_no:result.data[0].phone_no,
 password:result.data[0].password,
 facebook:result.data[0].facebook_link,
 instagram:result.data[0].instagram_link,
 linkedin:result.data[0].linkedin_url,
 whatsapp_no:result.data[0].whatsapp_no,
 gender:result.data[0].gender,
  })
}) 
}else{
  this.mismatch()
}
  }else{
 this.fillAllField()
  }
}


update=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Contact Data Updated</Typography>, {
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

mismatch=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Password Miss Match</Typography>, {
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


fillAllField=()=>{
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
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>

<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},marginLeft:1,mt:{xs:2,sm:2,md:1},mb:1,fontWeight:'500',color:'#3e3e40'}}>Contact Person Details</Typography>








<Paper component={Grid} sx={{width:'100%',minHeight:220,backgroundColor:'#2874a6',width:'100%',display:{xs:'none',sm:'none',md:'flex'},justifyContent:'left',alignItems:'center'}}>

<Box sx={{display:'flex',flexDirection:'row'}}>
<Box sx={{width:120,height:120,borderRadius:25,ml:5}}>
<Avatar
  alt="Remy Sharp"
  sx={{ width: 120, height:120 ,backgroundColor:'white'}}
>
<PersonOutlinedIcon   sx={{ width: 100, height:100 ,color:'#2874a6'}} />
</Avatar>
<Typography sx={{color:'white',fontSize:15,fontWeight:'500',textAlign:'center',mt:0.5}}>{this.state.first_name} {this.state.last_name}</Typography>
</Box>
</Box>



<Box sx={{display:'flex',flexDirection:'column',ml:4}}>
<Box sx={{height:26,minWidth:50,backgroundColor:'#0dcaf0',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:1}}>
  <Typography sx={{color:'white',fontSize:12,fontWeight:'600',paddingLeft:1,paddingRight:1,textTransform:'capitalize'}}>{this.state.department_name}</Typography>
</Box>
<Typography sx={{mt:0.7,mb:0.7,color:'white',fontSize:13,fontWeight:'500'}}><MarkEmailReadOutlinedIcon sx={{height:14,width:14,mr:0.5,mt:2}}/>{this.state.email_id}</Typography>
<Typography sx={{color:'white',mb:0.7,fontSize:13,fontWeight:'500'}}><CallOutlinedIcon sx={{height:14,width:14,mr:0.5,mt:2}}/>{this.state.phone_no}</Typography>
<Button color='inherit' variant="outlined" disableElevation sx={{height:22,fontSize:12,textTransform:'none',color:'white',mt:0.7}} startIcon={<SendOutlinedIcon />}>Send Email</Button>
</Box>

</Paper>















































<Paper sx={{minHeight:400,mt:2}}>
<Box  sx={{height:50,width:'100%',display:'flex',overflow:'scroll', scrollbarWidth:'none','&::-webkit-scrollbar': {display: 'none', }, }}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',ml:1,mr:1}}>

<Tabs
  value={this.state.tab_value}
  //onChange={this.handleChange}
  variant="scrollable"
  scrollButtons="auto"
  textColor="primary"
  indicatorColor="primary"
  aria-label="tab-selector"
>
  <Tab value="General_Info" sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:''}} label="General Info"  onClick={()=>this.setState({tab_value:"General_Info"})}/>
  <Tab value="Social" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Social" onClick={()=>this.setState({tab_value:"Social"})}/>
  <Tab value="Account_Setting" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Account Setting" onClick={()=>this.setState({tab_value:"Account_Setting"})}/>
</Tabs>

</Box>
</Box>





{
  this.state.tab_value=="General_Info"?
  <Box sx={{minHeight:200,ml:2,mr:2,mt:2}}>

<Typography sx={{fontSize:16,fontWeight:'bold',mb:2,mt:2}}>General Info</Typography>

<Divider/>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>First Name</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handlechange}  size='small' name='first_name' value={this.state.first_name} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='First Name'/>
</Grid>
</Grid>
</Box>

<Divider/>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Last Name</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handlechange}  size='small' name='last_name' value={this.state.last_name} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Last Name'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Phone</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField  fullWidth onChange={this.handlechange}  size='small' name='phone_no' value={this.state.phone_no} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Phone'/>
</Grid>
</Grid>
</Box>


<Divider/>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Gender</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
<Box  sx={{display:'flex',flexDirection:'row'}}>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox checked={this.state.gender=='male'?true:false} onClick={()=>this.setState({gender:'male'})}/> 
   <Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',ml:0.5}}>Male</Typography>
  </Box>

  <Box sx={{display:'flex',flexDirection:'row',marginLeft:1,alignItems:'center'}}>
   <Checkbox checked={this.state.gender=='female'?true:false} onClick={()=>this.setState({gender:'female'})}/> 
   <Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',ml:0.5}}>Female</Typography>
  </Box>


</Box>
</Grid>
</Grid>
</Box>

<Divider/>
<br/>

<Button disableElevation size='small' onClick={this.edit} sx={{backgroundColor:'#00a3ff',width:100}} variant='contained'>Save</Button>

<br/>
<br/>
<br/>


  </Box>:null
}


{
  this.state.tab_value=="Social"?
  <Box sx={{minHeight:200,ml:2,mr:2,mt:2}}>
<Typography sx={{fontSize:16,fontWeight:'bold',mb:2,mt:2}}>Social</Typography>
<Divider/>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Facebook</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handlechange}  size='small' name='facebook' value={this.state.facebook} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Face Book'/>
</Grid>
</Grid>
</Box>

<Divider/>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Instagram</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handlechange}  size='small' name='instagram' value={this.state.instagram} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Instagram'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Whatsapp</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handlechange}  size='small' name='whatsapp_no' value={this.state.whatsapp_no} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Whatsapp'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>LinkedIn</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handlechange}  size='small' name='linkedin' value={this.state.linkedin} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Linked In'/>
</Grid>
</Grid>
</Box>


<Divider/>
<br/>

<Button disableElevation size='small' onClick={this.edit} sx={{backgroundColor:'#00a3ff',width:100}} variant='contained'>Save</Button>

<br/>
<br/>
<br/>


  </Box>:null
}












{
  this.state.tab_value=="Account_Setting"?
  <Box sx={{minHeight:200,ml:2,mr:2,mt:2}}>
<Typography sx={{fontSize:16,fontWeight:'bold',mb:2,mt:2}}>Account Setting</Typography>
<Divider/>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Email ID</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handlechange}  size='small' name='email_id' value={this.state.email_id} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Email Id'/>
</Grid>
</Grid>
</Box>

<Divider/>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Password</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handlechange}  size='small' name='password' value={this.state.password} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Password'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Retype</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handlechange}  size='small' name='re_password' value={this.state.re_password} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Password'/>
</Grid>
</Grid>
</Box>

<Divider/>

<br/>
<Button disableElevation onClick={this.edit} size='small' sx={{backgroundColor:'#00a3ff',width:100}} variant='contained'>Save</Button>
<br/>
<br/>
<br/>

  </Box>:null
}













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


     </div>
    )
  }
}

export default Contact_Profile



/*
<Grid container item>
<Grid item xs={12} sm={5} md={3}>
<Box sx={{height:250,width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

<Box sx={{width:140,height:140,borderRadius:30}}>
<Avatar
  alt="Remy Sharp"
  sx={{ width: 140, height:140 ,backgroundColor:'white'}}
>
<PersonOutlinedIcon   sx={{ width: 120, height:120 ,color:'#e2f1ff'}} />
</Avatar>
</Box>
<Typography sx={{textAlign:'center',mt:2,fontWeight:'700',color:'#3d464f'}}>{this.state.first_name} {this.state.last_name}</Typography>
</Box>
</Grid>
<Grid item xs={12} sm={3} md={3}>
<Box sx={{width:'100%',display:'flex',justifyContent:'left',alignItems:'center',minHeight:100}}>
<Box sx={{display:'flex',flexDirection:'row',mt:4,justifyContent:'left',alignItems:'center'}}>
<Box sx={{height:70,width:70,borderRadius:30,backgroundColor:'#e8f7ff',display:'flex',justifyContent:'center',alignItems:'center'}}>
<EmailOutlinedIcon sx={{height:30,width:30,color:'grey'}}/>
</Box>
<Box sx={{paddingTop:2}}>
    <Typography sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:'#666666',ml:2}}>{this.state.email_id}</Typography>
    <Button variant='contained' size='small' disableElevation sx={{textTransform:'none',mt:3,ml:2}} onClick={()=>{
      window.open(`mailto:${this.state.email_id}?subject=Subject&body=Body%20goes%20here`)
    }}>Send Message</Button>
</Box>
</Box>
</Box>
</Grid>
<Grid item xs={12} sm={4} md={6}>
<Box sx={{width:'80%',mt:5,display:'flex',justifyContent:'left',flexDirection:'column'}}>

<Box sx={{display:'flex',flexDirection:'row'}}>
<Typography sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:'#666666',textAlign:'left',minWidth:130}}>Company Name  :</Typography>
<Box>
<Typography sx={{fontSize:14,fontWeight:'550',textTransform:'uppercase',color:'black',textAlign:'left',mb:0.3}}>{companyNmae}</Typography>
<Typography sx={{fontSize:12,fontWeight:'500',textTransform:'capitalize',color:'grey',textAlign:'left'}}>{address},{address2}</Typography>
</Box>

</Box>

<br/>


</Box>
</Grid>
</Grid>
*/









