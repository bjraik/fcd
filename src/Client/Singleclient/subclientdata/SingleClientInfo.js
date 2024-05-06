import React, { Component } from 'react'
import {Box, Typography,Tooltip, Divider,  Backdrop,CircularProgress,TextField ,Button,Stack, Grid, Bu, TextFieldtton, Checkbox, Paper, Modal, Input} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DownloadIcon from '@mui/icons-material/Download';
import base from '../../../base'
import { ToastContainer, toast } from 'react-toastify';



export class SingleClientInfo extends Component {

constructor(props) {
  super(props)

  this.state = {
  // general setting
    //////////////
form_open:false,
files:"",
file_name:"",
is_loader_open_circle:false,


/////////////////////
  client_id:"",
  client_name:"",
  client_phone:"",
  client_designation:"",
  client_group:"",
  client_address_1:"",
  client_address_2:"",
  client_postal_code:"",
  client_country:"",
  client_state:"",
  client_city:"",
  client_email:"",
  client_password:"",
////////////////// primary_contact
  p_client_designation:"",
  
  p_name:"",
  p_phone:"",
  p_email:"",
  p_address:"",
  p_postal_code:"",
  p_country:"",
  p_state:"",
  p_city:"",

///////////////////// billing info

billing_name:"",
biling_email_id:"",
billing_phone:"",
billing_address:"",
billing_postal_code:"",
billing_country:"",
billing_state:"",
billing_city:"",
billing_gst_no:"",
billing_currency:"",
billing_symbol:"",

//////////////////////// doc descriopm and set up 
document:[],




client_role : JSON.parse(sessionStorage.getItem('client_role')),
   
  }
  this.handleChange = this.handleChange.bind();
  this.handleChangee = this.handleChangee.bind();
}

componentDidMount(){
let data = this.props.singleClientInfo
  this.setState({
    client_id:data.client_id,
    client_name:data.client_name,
    client_phone:data.client_phone,
    client_address_1:data.client_address_1,
    client_address_2:data.client_address_2,
    client_postal_code:data.client_postal_code,
    client_country:data.client_country,
   client_state:data.client_state,
   client_city:data.client_city,
   client_group:data.client_group,
 
   client_email:data.user_name,
   client_password:data.password,
 ////////////////// primary_contact
   p_client_designation:data.primary_contact.designation,

p_name:data.primary_contact.name,
p_phone:data.primary_contact.phone,
p_email:data.primary_contact.email,
p_address:data.primary_contact.address,
p_postal_code:data.primary_contact.postal_code,
p_country:data.primary_contact.country,
p_state:data.primary_contact.state,
p_city:data.primary_contact.city,



///////////////////// billing info

billing_name:data.billing_info.billing_name,
biling_email_id:data.billing_info.billing_email_id,
billing_phone:data.billing_info.billing_phone_no,
billing_address:data.billing_info.billing_address,
billing_postal_code:data.billing_info.billing_postal_code,
billing_country:data.billing_info.billing_country,
billing_state:data.billing_info.billing_state,
billing_city:data.billing_info.billing_city,
billing_gst_no:data.billing_info.billing_gst_no,
billing_currency:data.billing_info.billing_currency,
billing_symbol:data.billing_info.billing_symbole,

//////////////////////// doc descriopm and set up 
document:data.attachment,
doc_name:"",
doc_id:"",
files:"",
})}


handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

handleChangee=(e)=>{
if(e.target.files[0].size < 5000000){
   this.setState({[e.target.name]:e.target.files[0]})
}else{
  this.docerror();
  this.clearFileChoosen();
}}


clearFileChoosen=()=>{
  document.getElementById("container").innerHTML = document.getElementById("container").innerHTML;
}


docerror=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Max 5mb DOCS Size Allow</Typography>, {
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



save=()=>{
/*
console.log(
  this.state.client_name,"-",this.state.client_email,"-", this.state.client_password,"-", this.state.client_phone,"-", this.state.client_designation,"-", this.state.client_group,"-", this.state.client_address_1,"-", this.state.client_address_2,"-", this.state.client_postal_code,"-", this.state.client_country,"-", this.state.client_state,"-", this.state.client_city,"-", this.state.p_name,"-", this.state.p_phone,"-", this.state.p_email,"-", this.state.p_address,"-", this.state.p_postal_code,"-", this.state.p_country,"-", this.state.p_state,"-", this.state.p_city,"-", this.state. billing_name,"-", this.state.biling_email_id,"-", this.state. billing_phone,"-", this.state.billing_address,"-", this.state.billing_postal_code,"-", this.state.billing_country,"-", this.state.billing_state,"-", this.state.billing_city,"-",this.state. billing_currency,"-",this.state. billing_symbol)
*/
  if(this.state.client_name=="" || this.state.p_client_designation=="" || this.state.client_email=="" || this.state.client_password=="" || this.state.client_phone==""  || this.state.client_group=="" || this.state.client_address_1=="" || this.state.client_address_2=="" || this.state.client_postal_code=="" || this.state.client_country=="" || this.state.client_state=="" || this.state.client_city=="" || this.state.p_name=="" || this.state.p_phone=="" || this.state.p_email=="" || this.state.p_address=="" || this.state.p_postal_code=="" || this.state.p_country=="" || this.state.p_state=="" || this.state.p_city=="" || this.state. billing_name=="" || this.state.biling_email_id=="" || this.state. billing_phone=="" || this.state.billing_address=="" || this.state.billing_postal_code=="" || this.state.billing_country=="" || this.state.billing_state=="" || this.state.billing_city==""  || this.state. billing_currency==""|| this.state. billing_symbol==""){
 this.fail()
  }else{
    this.setState({is_loader_open_circle:true})
  let formData = new FormData();
 formData.append('client_id',this.state.client_id)
  formData.append('client_name',this.state.client_name)
  formData.append('client_phone',this.state.client_phone)
  formData.append('client_group',this.state.client_group)
  formData.append('client_address_1',this.state.client_address_1)
  formData.append('client_address_2',this.state.client_address_2)
  formData.append('client_postal_code',this.state.client_postal_code)
  formData.append('client_country',this.state.client_country)
  formData.append('client_state',this.state.client_state)
  formData.append('client_city',this.state.client_city)
  formData.append('client_email',this.state.client_email)
  formData.append('client_password',this.state.client_password)
  ////////// primary content
  formData.append('p_client_designation',this.state.p_client_designation)
  formData.append("p_name",this.state.p_name)
  formData.append('p_phone',this.state.p_phone)
  formData.append('p_email',this.state.p_email)
  formData.append('p_address',this.state.p_address)
  formData.append('p_postal_code',this.state.p_postal_code)
  formData.append('p_country',this.state.p_country)
  formData.append('p_state',this.state.p_state)
  formData.append('p_city',this.state.p_city)
  
  ///////////////// billing info 
  
  formData.append("billing_name",this.state.billing_name)
  formData.append('biling_email_id',this.state.biling_email_id)
  formData.append('billing_phone',this.state.billing_phone)
  formData.append('billing_address',this.state.billing_address)
  formData.append('billing_postal_code',this.state.billing_postal_code)
  formData.append('billing_country',this.state.billing_country)
  formData.append('billing_state',this.state.billing_state)
  formData.append('billing_city',this.state.billing_city)
  
  formData.append('billing_gst_no',this.state.billing_gst_no)
  formData.append('billing_currency',this.state.billing_currency)
  formData.append('billing_symbol',this.state.billing_symbol)
  
  
  fetch(`${base.base_url}/updateClientInfo`,{

    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    //  'content-type':'application/json',
    },


    method:'put',
    body:formData,
  }).then((res)=>{return res.json()}).then((result)=>{
    if(result.status){
      this.setState({is_loader_open_circle:false})
this.succes();
    }else{
      this.setState({is_loader_open_circle:false});
     this.ttr();
    }
  })

}
}


ttr=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Client Already Exists</Typography>, {
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

succesdoc=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Docs Successfully Added</Typography>, {
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


uploadDocsFailed=()=>{
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

succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Client Info Successfully Updated</Typography>, {
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


deletess=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Deletet SuccesFull</Typography>, {
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
<Box sx={{minHeight:300,backgroundColor:'#fff',mt:2,ml:2,mr:2}}>

<Box sx={{display:'flex',flexDirection:'row'}}>
<Box>
</Box>
</Box>

<br/>

<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',fontWeight:'600',mt:1,mb:1}}>Genaral Details</Typography>

<Divider sx={{paddingTop:1}}/>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},mt:0.3,color:'#666666'}}>Client Group</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
<Box sx={{display:'flex',flexDirection:'row'}}>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>{this.state.client_group}</Typography>
  </Box>

</Box>
</Grid>
</Grid>
</Box>

<Divider />

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Client Name</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField  onChange={this.handleChange}  size='small'  name='client_name' value={this.state.client_name} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Client Name' />
</Grid>
</Grid>
</Box>

<Divider/>


<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>User Name (Login)</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handleChange}   size='small' name='client_email' value={this.state.client_email} InputProps={{disableUnderline:true,sx:{fontSize:{xs:10,sm:12},fontWeight:'800',color:'#ea5455'}}} variant='standard' placeholder='User Name'/>
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
< TextField fullWidth onChange={this.handleChange} type='password'  size='small' name='client_password' value={this.state.client_password} InputProps={{disableUnderline:true,sx:{fontSize:{xs:10,sm:12},fontWeight:'800',color:'#ea5455'}}} variant='standard' placeholder='Password'/>
</Grid>
</Grid>
</Box>

<Divider/>




<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Address 1</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handleChange}   size='small' name='client_address_1' value={this.state.client_address_1} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Address 1'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Address 2</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField fullWidth onChange={this.handleChange}   size='small' name='client_address_2' value={this.state.client_address_2} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Address 2'/>
</Grid>
</Grid>
</Box>

<Divider/>


<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>City</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='client_city' value={this.state.client_city} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='City Name'/>
</Grid>
</Grid>
</Box>

<Divider/>


<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>State</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}   size='small' value={this.state.client_state} name="client_state" InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='State'/>
</Grid>
</Grid>
</Box>

<Divider/>


<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Postal code</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange} name='client_postal_code'  size='small' value={this.state.client_postal_code} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Post Code'/>
</Grid>
</Grid>
</Box>

<Divider/>


<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666'}}>Country</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange} name="client_country" size='small' value={this.state.client_country} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Country'/>
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
< TextField onChange={this.handleChange}   size='small' name='client_phone' value={this.state.client_phone} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666'}}} variant='standard' placeholder='Phone'/>
</Grid>
</Grid>
</Box>



<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center',mt:2,mb:1}}>
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',fontWeight:'600',mt:1,mb:1}}>Primary Contact</Typography>
</Box>
<Divider/>
<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Name</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
<TextField onChange={this.handleChange}  size='small' name='p_name'  value={this.state.p_name} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},mt:1,color:'#666666'}}} variant='standard' placeholder='Name'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Designation</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
<TextField onChange={this.handleChange}  size='small' name='p_client_designation'  value={this.state.p_client_designation} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},mt:1,color:'#666666'}}} variant='standard' placeholder='Designation'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Phone No</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='p_phone' value={this.state.p_phone} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Phone No'/>
</Grid>
</Grid>
</Box>

<Divider/>


<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Email Id</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small'  name='p_email' value={this.state.p_email} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Email id'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Address</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='p_address' value={this.state.p_address} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Address'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Postal Code</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='p_postal_code' value={this.state.p_postal_code} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Postal Code'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Country</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='p_country' value={this.state.p_country} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Country'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>State</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='p_state' value={this.state.p_state} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='State'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>City</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='p_city' value={this.state.p_city} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='City'/>
</Grid>
</Grid>
</Box>



<Divider/>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center',mt:2,mb:1}}>
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',fontWeight:'600',mt:1,mb:1}}>Billing Info</Typography>
</Box>
<Divider/>
<Divider/>


<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Name</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='billing_name' value={this.state.billing_name} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Name'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Email Id</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='biling_email_id' value={this.state.biling_email_id} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Email id'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Phone No</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='billing_phone' value={this.state.billing_phone} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Phone no '/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Address</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='billing_address' value={this.state.billing_address} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Address'/>
</Grid>
</Grid>
</Box>


<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Postal Code</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='billing_postal_code' value={this.state.billing_postal_code} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Postal Code'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Country</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='billing_country' value={this.state.billing_country} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Country'/>
</Grid>
</Grid>
</Box>


<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>State</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='billing_state' value={this.state.billing_state} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='State'/>
</Grid>
</Grid>
</Box>


<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>City</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='billing_city' value={this.state.billing_city} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='City'/>
</Grid>
</Grid>
</Box>



<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Currency</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='billing_currency' value={this.state.billing_currency} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Currency'/>
</Grid>
</Grid>
</Box>

<Divider/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center'}}>
<Grid container spacing={2}>
<Grid item xs={3} sm={2} >
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}>Currency symbol</Typography>
</Grid>
<Grid item xs={9}  sm={10}>
< TextField onChange={this.handleChange}  size='small' name='billing_symbol' value={this.state.billing_symbol} InputProps={{disableUnderline:true,sx:{fontSize:{xs:12,sm:14},color:'#666666',mt:1}}} variant='standard' placeholder='Currency Symbole'/>
</Grid>
</Grid>
</Box>

<br/>

<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'left',height:50,alignItems:'center',mt:2,mb:1}}>
<Typography sx={{fontSize:{xs:12,sm:14},color:'#666666',fontWeight:'600',mt:1,mb:1}}>Attachments</Typography>
</Box>
<Divider/>
<Divider/>
<br/>
<Button disabled={this.state.client_role.is_create?false:true} size='small' onClick={()=>this.setState({form_open:true})} variant='contained' disableElevation startIcon={<AddIcon/>} sx={{height:25,ml:1,textTransform:'none',fontSize:10,backgroundColor:'#145180'}}>Add More Docs</Button>
<br/>
{
  this.state.document?this.state.document.map((data)=>(
    <Box sx={{mt:1.5}}>
<Typography sx={{fontSize:11,fontWeight:600,ml:1,mb:0.5,color:'#666666',textTransform:'capitalize'}}>{data.doc_name}</Typography>
<Box sx={{display:'flex',flexDirection:'row'}}>
  <Box sx={{minWidth:100,border:1,minHeight:25,borderColor:'#ebebf5',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Typography sx={{fontSize:11,fontWeight:'500',ml:2,mr:2,color:'#718096'}}>{data.url}</Typography>
  </Box>
  <Paper  sx={{height:25,width:25,backgroundColor:'#145180',ml:1,display:'flex',justifyContent:'center',alignItems:'center'}} onClick={()=>{
if(this.state.client_role.is_delete){
   fetch(`${base.base_url}/deleteDocuments`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'delete',
    body:JSON.stringify({
client_id:this.state.client_id,
doc_id:data.doc_id
    }),
  }).then((res)=>{return res.json()}).then((result)=>{
   this.setState({document:result.data.attachment})
   this.deletess()
  })
}else{
  alert('You have not permission')
}
 



  }}>
<CloseIcon sx={{color:'#fff',height:17,width:17}}/>
   </Paper>
   <Paper onClick={()=>window.open(`${base.base_url}/`+data.url)} sx={{height:25,width:25,backgroundColor:'#145180',ml:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<DownloadIcon sx={{color:'#fff',height:17,width:17}}  />
   </Paper>
</Box>
</Box>
  )):<Typography sx={{fontSize:15,color:'grey'}}>No document found!</Typography>
}



<br/>

<Button disabled={this.state.client_role.is_edit?false:true} disableElevation size='small' onClick={this.save} sx={{backgroundColor:'#00a3ff',width:100}} variant='contained'>Save</Button>


<br/>
<br/>

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
  open={this.state.form_open}
 // onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'70%',md:'40%',lg:'40%'},height:250,backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontWeight:'600',padding:3}}>Add More Documents</Typography>
<Box sx={{padding:{xs:1,sm:2},display:'flex',flexDirection:'column',mt:-3}}>
  <Typography sx={{fontSize:12,fontWeight:'600'}}>Document Name</Typography>
<TextField onChange={this.handleChange} name='file_name' value={this.state.file_name} size='small' InputProps={{sx:{fontSize:12,fontWeight:'600',mb:1}}} fullWidth/>
<div id='container'>
<input type='file' onChange={this.handleChangee} name='files'/>
</div>
<Button onClick={async()=>{
const formData = new FormData();
formData.append('files',this.state.files);
formData.append('file_Name',this.state.file_name)
formData.append('client_id',this.state.client_id)
if(this.state.file_name!=="" && this.state.files!==""){
  fetch(`${base.base_url}/addMoreDocument`,{

    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    //  'content-type':'application/json',
    },

  method:'put',
  body:formData,
}).then((res)=>{return res.json()}).then((data)=>{
 this.setState({document:data.data,form_open:false,file_name:"",files:""})
 this.succesdoc()
})
}else{
  this.uploadDocsFailed();
  this.setState({
  file_name:"",files:""
  })
}


}} variant='contained' size='small' disableElevation sx={{textTransform:'none',mt:3,width:100,height:30}}>Add</Button>
</Box>
</Paper>
</Box>
</Modal>
</Box>





<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_loader_open_circle}
  //this.state.is_loader_open
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>
</Box>

      </div>
    )
  }
}

export default SingleClientInfo