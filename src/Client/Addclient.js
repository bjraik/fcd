import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Grid, Paper, Typography, FormControl,Select,touchRippleClasses, Autocomplete } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,Link,IconButton,TableBody,Table,Modal,MenuItem,Tab,Tabs,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import Checkbox from 'rc-checkbox';
import { Form } from 'react-router-dom'
import base from '../base'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate,useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import {clientGroupOptions,currencyOptions,country} from './../Utils/AutocompleteOptions'

const drawerWidth = 240;

export class Addclient extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       tab_value:'general_info',

/////////////////// data for client add       (general innfo) ////////////////

client_name:"",
client_phone:"",
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
documentName:[],
doc_name:"",
doc_id:"",
files:'',

    }
    this.handleChange=this.handleChange.bind()
    this.handleChangeee = this.handleChangeee.bind()
  }

handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

handleChangeee=(e)=>{
  this.setState({[e.target.name]:e.target.files[0]})
}
  componentDidMount(){
    setTimeout(()=>{
this.setState({is_loader_open:false})
    },1000) 
  }

  succes=()=>{
    toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Client Successfully Added</Typography>, {
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
  

  ClientExits=()=>{
    toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Client Already Exists</Typography>, {
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

  fieldunfilled=()=>{
    toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields </Typography>, {
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



clearFileChoosen=()=>{
  document.getElementById("container").innerHTML = document.getElementById("container").innerHTML;
}


  ////////// send data to server
submit=()=>{
  /// this.state.client_name=="" || this.state.client_phone=="" || this.state.client_designation=="" || this.state.client_group=="" || this.state.client_address_1=="" || this.state.client_address_2=="" || this.state.client_postal_code=="" || this.state.client_country=="" || this.state.client_state=="" || this.state.client_city=="" || this.state.p_name=="" || this.state.p_phone=="" || this.state.p_email=="" || this.state.p_address=="" || this.state.p_postal_code=="" || this.state.p_country=="" || this.state.p_state=="" || this.state.p_city=="" || this.state. billing_name=="" || this.state.biling_email_id=="" || this.state. billing_phone=="" || this.state.billing_address=="" || this.state.billing_postal_code=="" || this.state.billing_country=="" || this.state.billing_state=="" || this.state.billing_city=="" || this.state.billing_gst_no=="" || this.state. billing_currency==""|| this.state. billing_symbol==""
  if(this.state.client_name=="" || this.state.client_phone==""  || this.state.client_group=="" || this.state.client_address_1=="" || this.state.client_address_2=="" || this.state.client_postal_code=="" || this.state.client_country==""  || this.state.client_city=="" || this.state.p_name=="" || this.state.p_phone=="" || this.state.p_email=="" || this.state.p_address=="" || this.state.p_postal_code=="" || this.state.p_country==""  || this.state.p_city=="" || this.state. billing_name=="" || this.state.biling_email_id=="" || this.state. billing_phone=="" || this.state.billing_address=="" || this.state.billing_postal_code=="" || this.state.billing_country=="" || this.state.billing_city==""  || this.state. billing_currency==""|| this.state. billing_symbol==""){
this.fieldunfilled();
  }else{
    this.setState({is_loader_open:true})
    const documentNameArray=[]
    let formData = new FormData();
    
    for (let i = 0; i < this.state.document.length; i++) {
    formData.append('files',this.state.document[i].doc_url);
    documentNameArray.push(this.state.document[i].doc_name)
    }
    
    formData.append('documentNameList',JSON.stringify(documentNameArray))
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
    
    fetch(`${base.base_url}/addClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        //'content-type':'application/json',
      },
      method:'post',
      body:formData,
    }).then((res)=>{return res.json()}).then((result)=>{

if(result.status){
   this.succes();
      this.props.navigate('/client')
      this.setState({
      form_open:false,
      is_loader_open:false,
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
/////////////////// files
document:[],
documentName:[],
doc_name:"",
doc_id:"",
files:"",

      })
}else{
  this.setState({ is_loader_open:false,})
  this.ClientExits();

}

    })
  }
  }


  removeDoc=(id)=>{
  let filterData = this.state.document.filter((e)=> e.id!==id);
   this.setState({document:filterData});
  }


  render() {
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Add Client</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Add Client</Typography>
</Box>
</Paper>
<Paper sx={{width:'100%',minHeight:600,mt:2}}>
<Box sx={{width:'100%',height:50,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>

<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_loader_open}
  //this.state.is_loader_open
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>
</Box>

<Tabs
  value={this.state.tab_value}
  //onChange={this.handleChange}
  textColor="primary"
  indicatorColor="primary"
  aria-label="tab-selector"
>
  <Tab value="general_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:''}} label="General Info"  onClick={()=>{this.setState({tab_value:'general_info'})}}/>
  <Tab value="billing_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Billing Info" onClick={()=>{
   if(this.state.client_name!==""&&this.state.client_phone!==""&&this.state.client_group!==""&&this.state.client_address_1!==""&&this.state.client_address_2!==""&& this.state.client_postal_code!==""&&this.state.client_country!==""&&this.state.client_city!==""&&this.state.client_email!==""&&this.state.client_password!==""&&this.state.p_client_designation!==""&&this.state.p_name!==""&&this.state.p_phone!==""&&this.state.p_email!==""&&this.state.p_address!==""&&this.state.p_postal_code!==""&&this.state.p_country!==""&&this.state.p_city!==""
   ){
       this.setState({tab_value:'billing_info'})
   }else{
     this.fieldunfilled();
   }
  }}/>
  <Tab value="attachment" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Attachment" onClick={()=>{
     if(this.state.billing_name!==""&&
     this.state.biling_email_id!==""&&
     this.state.billing_phone!==""&&
     this.state.billing_address!==""&&
     this.state.billing_postal_code!==""&&
     this.state.billing_country!==""&&
     this.state.billing_city!==""&&
     this.state.billing_currency!==""&&
     this.state.billing_symbol!==""&&
     this.state.client_name!==""&&
     this.state.client_phone!==""&&
     this.state.client_group!==""&&
     this.state.client_address_1!==""&&
     this.state.client_address_2!==""&& 
     this.state.client_postal_code!==""&&
     this.state.client_country!==""&&
     this.state.client_city!==""&&
     this.state.client_email!==""&&
     this.state.client_password!==""&&
     this.state.p_client_designation!==""&&
     this.state.p_name!==""&&
     this.state.p_phone!==""&&
     this.state.p_email!==""&&
     this.state.p_address!==""&&
     this.state.p_postal_code!==""&&
     this.state.p_country!==""&&
     this.state.p_city!=="" &&
     this.state.billing_name!==""&&
    this.state.biling_email_id!==""&&
    this.state.billing_phone!==""&&
    this.state.billing_address!==""&&
    this.state.billing_postal_code!==""&&
    this.state.billing_country!==""&&
    this.state.billing_city!==""&&
    this.state.billing_currency!==""&&
    this.state.billing_symbol!==""
     ){
      
       this.setState({tab_value:'attachment'}) 
     }else{
       this.fieldunfilled();
     }
  }} />
</Tabs>
</Box>


<br/>



{
<Box sx={{ml:{xs:'1%',sm:'3%',md:'10%'},mr:{xs:'1%',sm:'3%',md:'10%'},display:this.state.tab_value==="general_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Group<Typography sx={{color:'red'}}>*</Typography></Typography>

{/* Change MenuItem to AutoComplete 
    BJ Raik - 02/05/2024
*/}

<Autocomplete
      disablePortal
      id="add-client-group"
      options={clientGroupOptions}
      size="small"
      getOptionLabel={(option) => option.label}
      renderInput={(params) =>      
        <TextField {...params}  label={params?.inputProps?.value} />     
      }
      onChange={(e,data)=>       
       this.setState({client_group:data.label})}        
    />

{/* <TextField  type='text' select onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.client_type}  name="client_type" fullWidth size='small'>
  {
    [{id:1,name:'Direct'},{id:2,name:"Agency"},{id:3,name:'Publisher'}].map((s)=>(
       <MenuItem sx={{fontSize:12,fontWeight:'600'}} key={s.id} value={s.name} onClick={()=>this.setState({client_group:s.name})}>
       {s.name}
     </MenuItem>
      
    ))
  }
</TextField> */}
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.client_name} name="client_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Phone No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.client_phone} name="client_phone" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address 1<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.client_address_1} name="client_address_1" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address 2<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} name="client_address_2" value={this.state.client_address_2} fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Postal Code <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.client_postal_code}  name="client_postal_code" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>

{/* Change MenuItem to AutoComplete 
    BJ Raik - 02/05/2024
*/}

<Autocomplete
      disablePortal
      id="add-client-country"
      options={country}
      size="small"
      getOptionLabel={(option) => option}
      renderInput={(params) =>      
        <TextField {...params}  label={params?.inputProps?.value} />     
      }
      onChange={(e,data)=>       
       
           this.setState({client_country:data})}   
        
            
    />

{/* <TextField  SelectProps={{MenuProps:{sx:{height:300}}}}  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.client_country} name="client_country" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))
  
 }
</TextField> */}

</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.client_state} name="client_state" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.client_city} name="client_city" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Email (For Login)<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.client_email} name="client_email" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Password<Typography sx={{color:'red'}}>*</Typography></Typography>

<TextField  type='password' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} 
autoComplete='off'
inputProps={{
  autocomplete: 'new-password',
  form: {
    autocomplete: 'off',
  },
}}
renderInput={params => <TextField {...params} name='new-password' />}

 onChange={this.handleChange} value={this.state.client_password} name="client_password" fullWidth size='small'/>
</Box>
</Grid>
</Grid>
<br/>
<br/>
<Typography sx={{fontSize:15,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Primary Contact<Typography sx={{color:'red'}}>*</Typography></Typography>
<br/>


<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  name="p_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Phone No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_phone}  name="p_phone" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Designation<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.p_client_designation}  name="p_client_designation" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Email ID<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_email}  name="p_email" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.p_address} name="p_address" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Postal Code<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_postal_code}  name="p_postal_code" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
  
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>
{/* Change MenuItem to AutoComplete 
    BJ Raik - 02/05/2024
*/}

<Autocomplete
      disablePortal
      id="add-client-p-country"
      options={country}
      size="small"
      getOptionLabel={(option) => option}
      renderInput={(params) =>      
        <TextField {...params}  label={params?.inputProps?.value} />     
      }
      onChange={(e,data)=>this.setState({p_country:data})}           
            
    />

{/* <TextField  select  SelectProps={{MenuProps:{sx:{height:300}}}}   InputProps={{   sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.p_country} name="p_country" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))
  
 }
</TextField> */}
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_state} name="p_state" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_city}  name="p_city" fullWidth size='small'/>
</Box>
</Grid>


</Grid>

<br/>
<br/>
<Button variant='contained' size='small' 
onClick={()=>{
  if(this.state.client_name!==""&&this.state.client_phone!==""&&this.state.client_designation!==""&&this.state.client_group!==""&&this.state.client_address_1!==""&&this.state.client_address_2!==""&& this.state.client_postal_code!==""&&this.state.client_country!==""&&this.state.client_city!==""&&this.state.client_email!==""&&this.state.client_password!==""&&this.state.p_client_designation!==""&&this.state.p_name!==""&&this.state.p_phone!==""&&this.state.p_email!==""&&this.state.p_address!==""&&this.state.p_postal_code!==""&&this.state.p_country!==""&&this.state.p_city!==""
  ){
      this.setState({tab_value:'billing_info'})
  }
  else{
    this.fieldunfilled();
  }  
  
  }}  
  sx={{width:100,textTransform:'none',mr:1}}>Next</Button>
<br/>
<br/>
<br/>
<br/>

</Box>
}









{
    <Box sx={{ml:{xs:'1%',sm:'3%',md:'10%'},mr:{xs:'1%',sm:'3%',md:'10%'},display:this.state.tab_value==="billing_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Billing Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.billing_name}  name="billing_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
 <Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Email ID<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.biling_email_id} name="biling_email_id" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Phone Number<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_phone}  name="billing_phone" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_address}  name="billing_address" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>

{/* Change MenuItem to AutoComplete 
    BJ Raik - 02/05/2024
*/}

<Autocomplete
      disablePortal
      id="add-client-billing-country"
      options={country}
      size="small"
      getOptionLabel={(option) => option}
      renderInput={(params) =>      
        <TextField {...params}  label={params?.inputProps?.value} />     
      }
      onChange={(e,data)=>this.setState({billing_country:data})}           
            
    />


{/* <TextField  SelectProps={{MenuProps:{sx:{height:300}}}} select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.billing_country} name="billing_country" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))
  
 }
</TextField> */}
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Postal Code<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_postal_code}  name="billing_postal_code" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.billing_state} name="billing_state" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
< Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_city}  name="billing_city" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Currency<Typography sx={{color:'red'}}>*</Typography></Typography>

{/* Change MenuItem to AutoComplete 
    BJ Raik - 02/05/2024
*/}

<Autocomplete
      disablePortal
      id="add-client-billing-currency"
      options={currencyOptions}
      size="small"
      getOptionLabel={(option) => option?.label}
      renderInput={(params) =>      
        <TextField {...params}  label={params?.inputProps?.value} />     
      } 
      onChange={(e,data)=>this.setState({billing_currency:data.label,billing_symbol:data.currency_symbole})}             
    />


{/* <TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_currency} name="billing_currency" fullWidth size='small'>
{[{ id:1,currency:"INR",currency_symbole:"₹"},{id:2,currency:"USD",currency_symbole:"$"},{id:3,currency:"Pounds",currency_symbole:"₤"},{id:4,currency:"Australian Dollar",currency_symbole:"AU$"}].map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.currency} onClick={()=>this.setState({billing_currency:option.currency,billing_symbol:option.currency_symbole})}>
              {option.currency}
            </MenuItem>
          ))}
</TextField> */}

</Box>
</Grid>



<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Currency Symbol<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.billing_symbol}  name="billing_symbol" fullWidth size='small'>
</TextField>
</Box>
</Grid>
</Grid>


<br/>

<Button variant='contained' size='small' onClick={()=>{

if(this.state.billing_name!==""&&
this.state.biling_email_id!==""&&
this.state.billing_phone!==""&&
this.state.billing_address!==""&&
this.state.billing_postal_code!==""&&
this.state.billing_country!==""&&
this.state.billing_city!==""&&
this.state.billing_currency!==""&&
this.state.billing_symbol!==""
){
 
  this.setState({tab_value:'attachment'}) 
}else{
  this.fieldunfilled();
}


  
  }}  sx={{width:100,textTransform:'none'}}>Next</Button>

<br/>
<br/>
<br/>
<br/>

</Box>
}




{
    <Box sx={{ml:{xs:'3%',sm:'5%',md:'25%'},mr:{xs:'2%',sm:'5%',md:'25%'},display:this.state.tab_value==="attachment"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={12} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Documents<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.doc_name} name="doc_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={12} >
<Box >
  <div id='container'>
    <input type='file'  name='files' onChange={this.handleChangeee}/>
  </div>

</Box>
</Grid>
<br/>
<br/>
<br/>
<Button size='small' onClick={()=>{
if(this.state.doc_name!=="" && this.state.files!==""){
 this.setState(prevState => ({
    document: [...prevState.document, {id:Math.round(Math.random() * 10000000000),doc_url:this.state.files,doc_name:this.state.doc_name}] 
  }),()=>{
    this.setState({
    doc_name:"",
    doc_id:"",
    files:""},()=>{
      this.clearFileChoosen();
    })
  })
}else{
  this.fieldunfilled();
}
}}  disableElevation variant='contained' startIcon={<AddIcon/>} sx={{textTransform:"none",ml:2,height:30}}>Add Document</Button>
<br/>
<br/>
<br/>
<Divider/>
<br/>
{
  this.state.document.map((e)=>(
    <Grid item xs={12} sm={12} >
    <Box >
    <TextField  value={e.doc_name}  InputProps={{sx:{fontSize:12,fontWeight:'600'},endAdornment:<IconButton onClick={this.removeDoc.bind(this,e.id)}><CloseIcon sx={{color:'red'}}/></IconButton>}}  name="first_name" fullWidth size='small' />
    </Box>
    </Grid>
  ))
}

</Grid>


<br/>

<Button variant='contained' disableElevation size='small' onClick={this.submit}  sx={{width:130,textTransform:'none'}}>Create Client</Button>

<br/>
<br/>
<br/>


</Box>
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

export default Addclient



export function Addclientc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Addclient location={location} navigate={navigate}></Addclient>)
}



   
