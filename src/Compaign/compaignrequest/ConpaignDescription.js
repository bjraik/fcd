import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import Sidebar from '../../Sidebar'
import Chat from '../../Chat'
import { Sidebarc } from '../../Sidebar'
import { Button, Grid, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,IconButton,TableBody,Table,Modal,MenuItem,Tab,Tabs,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import Checkbox from 'rc-checkbox';
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
const drawerWidth = 240;

export class ConpaignDescription extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       tab_value:'general_info'
    }
  }

  componentDidMount(){
    setTimeout(()=>{
this.setState({is_loader_open:false})
    },1000)
  }
  render() {
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Add Campaign</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Campaign Add</Typography>
</Box>
</Paper>
<Paper sx={{width:'100%',minHeight:600,mt:2}}>
<Box sx={{width:'100%',height:50,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
<Tabs
  value={this.state.tab_value}
  //onChange={this.handleChange}
  textColor="primary"
  indicatorColor="primary"
  aria-label="tab-selector"
>
  <Tab value="general_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:''}} label="General Info"  onClick={()=>this.setState({tab_value:"general_info"})}/>
  <Tab value="campaign_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Campaign Info" onClick={()=>this.setState({tab_value:"campaign_info"})}/>
  <Tab value="attachment" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Attachment" onClick={()=>this.setState({tab_value:"attachment"})}/>
  <Tab value="question" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Question" onClick={()=>this.setState({tab_value:"question"})}/>
</Tabs>
</Box>


<br/>



{
<Box sx={{ml:{xs:'3%',sm:'5%',md:'10%'},mr:{xs:'2%',sm:'5%',md:'10%'},display:this.state.tab_value==="general_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Campaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Compaign Type<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>End Client<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Compaign Manager<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Lead Target<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>CPL<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>CPL Currency<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Campaign Budget<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Pre QA Target<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Start Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>End Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box sx={{height:20,mt:2,width:'100%'}}>
<Checkbox checked size="medium"/>
</Box>
</Grid>
</Grid>



<Box sx={{width:'100%'}}>
<Grid container spacing={2} columnSpacing={2}>
<Grid item xs={12} sm={5}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Geography<Typography sx={{color:'red'}}>*</Typography></Typography>
<Box sx={{display:'flex',flexDirection:'row'}}>
<TextField select  sx={{mr:1}} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{
  country.map((e)=>(
<MenuItem key={e} sx={{fontSize:12,fontWeight:'600'}} value={e}>
              {e}
            </MenuItem>
  ))
}
</TextField>
<Paper onClick={()=>this.setState({form_open:true})} sx={{height:35,width:36,backgroundColor:'#2987c8',display:'flex',justifyContent:'center',alignItems:'center'}}>
<AddIcon sx={{color:'#fff'}}/>
</Paper>
</Box>
</Grid>

<Grid item xs={12} sm={2}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Required Lead<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField   type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Grid>

<Grid item xs={12} sm={5}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Duration<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{duration.map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
</TextField>
</Grid>
</Grid>
</Box>




<br/>

<Button variant='contained' size='small' onClick={()=>this.setState({tab_value:'campaign_info'})}  sx={{width:100,textTransform:'none'}}>Next</Button>

<br/>
<br/>
<br/>
<br/>

</Box>
}









{
    <Box sx={{ml:{xs:'3%',sm:'5%',md:'10%'},mr:{xs:'2%',sm:'5%',md:'10%'},display:this.state.tab_value==="campaign_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Job Title<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Job Function<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Job Level<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{[{ id:1,job_level:"President"},{id:2,job_level:"Founder"}, {id:3,job_level:"Co-Founder"}, {id:4,job_level:"C-Level"} , {id:5,job_level:"Vice-President"} ,{id:6,job_level:"Director"} ,{id:7,job_level:"Head"} ,{id:8,job_level:"Manager"},{id:9,job_level:"Staff"},{id:9,job_level:'All'}     ].map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.job_level}>
              {option.job_level}
            </MenuItem>
          ))}</TextField>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Geography<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))}
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Employee Size<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{[{ id:1,emp_size:"self-employeed"},{id:2,emp_size:"1-10"}, {id:3,emp_size:"11-50"}, {id:4,emp_size:"51-200"} , {id:5,emp_size:"201-500"} ,{id:6,emp_size:"501-1000"} ,{id:7,emp_size:"1001-5000"} ,{id:8,emp_size:"5001-10000"},{id:9,emp_size:"10001+"},{id:9,emp_size:'All'}].map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.emp_size}>
              {option.emp_size}
            </MenuItem>
          ))}
</TextField>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Revenue Size<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{[{ id:1,rev_size:"<1M"},{id:2,rev_size:"1M-10M"}, {id:3,rev_size:"11M-25M"}, {id:4,rev_size:"25M-50M"} , {id:5,rev_size:"50M-100M"} ,{id:6,rev_size:"100M-250M"} ,{id:7,rev_size:"250M-500M"} ,{id:8,rev_size:"500M-1B"},{id:9,rev_size:"1B-5B"},{id:9,rev_size:'5B-10B'},{id:9,rev_size:'10B-25B'},{id:9,rev_size:'25B-Above'}].map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.rev_size}>
              {option.rev_size}
            </MenuItem>
          ))}
</TextField>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Industry<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{industry.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))}
</TextField>
</Box>
</Grid>



<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Geography<Typography sx={{color:'red'}}>*</Typography></Typography>
<Box sx={{display:'flex',flexDirection:'row'}}>
<TextField select  sx={{mr:1}} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{
  country.map((e)=>(
<MenuItem key={e} sx={{fontSize:12,fontWeight:'600'}} value={e}>
              {e}
            </MenuItem>
  ))
}
</TextField>
<Paper onClick={()=>this.setState({form_open:true})} sx={{height:35,width:36,backgroundColor:'#2987c8',display:'flex',justifyContent:'center',alignItems:'center'}}>
<AddIcon sx={{color:'#fff'}}/>
</Paper>
</Box>
</Box>
</Grid>






</Grid>
<br/>

<Button variant='contained' size='small' onClick={()=>this.setState({tab_value:'attachment'})}  sx={{width:100,textTransform:'none'}}>Next</Button>

<br/>
<br/>
<br/>
<br/>

</Box>
}













{
    <Box sx={{ml:{xs:'3%',sm:'5%',md:'10%'},mr:{xs:'2%',sm:'5%',md:'10%'},display:this.state.tab_value==="attachment"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Account/Domain List<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Supression/Exclusion<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Assets Link<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Contact per company/Account<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600',height:70}}}  name="first_name" fullWidth size='small'/>
</Box>
</Grid>


</Grid>


<br/>

<Button variant='contained' size='small' onClick={()=>this.setState({tab_value:'question'})}  sx={{width:100,textTransform:'none'}}>Next</Button>

<br/>
<br/>
<br/>


</Box>
}





















{
<Box sx={{ml:{xs:'4%',sm:'7%',md:'20%'},mr:{xs:'4%',sm:'7%',md:'20%'},display:this.state.tab_value==="question"?"block":"none"}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,textAlign:'justify',mt:1,mb:3}}>
1 )  It is a long established facts that a render will be distracted  by readble contebnt of page when looking at is layout
</Typography>
<TextField  type='text' placeholder='Write question here.' maxRows={100} multiline InputProps={{sx:{fontSize:12,fontWeight:'600',textAlign:'justify',minHeight:70}}}  name="first_name" fullWidth size='small'/>

<br/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,textAlign:'justify',mt:1,mb:3}}>
2 )  It is a long established facts that a render will be distracted  by readble contebnt of page when looking at is layout
</Typography>
<TextField  type='text' placeholder='Write question here.' maxRows={100} multiline InputProps={{sx:{fontSize:12,fontWeight:'600',textAlign:'justify',minHeight:70}}}  name="first_name" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,textAlign:'justify',mt:3,mb:1}}>
3 )  It is a long established facts that a render will be distracted  by readble contebnt of page when looking at is layout?.
</Typography>

<Box sx={{width:'100%',ml:{xs:0,sm:2}}}>
<Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
</Box>




<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,textAlign:'justify',mt:3,mb:1}}>
3 )  It is a long established facts that a render will be distracted  by readble contebnt of page when looking at is layout?.
</Typography>

<Box sx={{width:'100%',ml:{xs:0,sm:2}}}>
<Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
</Box>




<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,textAlign:'justify',mt:3,mb:1}}>
3 )  It is a long established facts that a render will be distracted  by readble contebnt of page when looking at is layout?.
</Typography>

<Box sx={{width:'100%',ml:{xs:0,sm:2}}}>
<Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
  <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
   <Checkbox /> 
   <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2}}>The point of using lorem ipsum</Typography>
  </Box>
</Box>


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



<Box> 
<Modal
  open={this.state.form_open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Geography</Typography>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},minHeight:'10vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Geography<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>
<br/>
<br/>
<Button variant='contained' size='small' sx={{textTransform:'none'}}>Save</Button>
<br/>
<br/>
</Box>
</Paper>
</Box>
</Modal>
</Box>





     </div>
    )
  }
}

export default ConpaignDescription
export function ConpaignDescriptionc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ConpaignDescription location={location} navigate={navigate}></ConpaignDescription>)
}











const duration = [{id:1,name:'weekly'},{id:2,name:'monthly'},{id:2,name:'yearly'}]






const country= ['Afghanistan',
'Albania',
'Algeria',
'Andorra',
'Angola',
'Antigua and Barbuda',
'Argentina',
'Armenia',
'Australia',
'Austria',
'Azerbaijan',
'The Bahamas',
'Bahrain',
'Bangladesh',
'Barbados',
'Belarus',
'Belgium',
'Belize',
'Benin',
'Bhutan',
'Bolivia',
'Bosnia and Herzegovina',
'Botswana',
'Brazil',
'Brunei',
'Bulgaria',
'Burkina Faso',
'Burundi',
'Cabo Verde',
'Cambodia',
'Cameroon',
'Canada',
'Central African Republic',
'Chad',
'Chile',
'China',
'Colombia',
'Comoros',
'Congo, Democratic Republic of the',
'Congo, Republic of the',
'Costa Rica',
'Côte d’Ivoire',
'Croatia',
'Cuba',
'Cyprus',
'Czech Republic',
'Denmark',
'Djibouti',
'Dominica',
'Dominican Republic',
'East Timor (Timor-Leste)',
'Ecuador',
'Egypt',
'El Salvador',
'Equatorial Guinea',
'Eritrea',
'Estonia',
'Eswatini',
'Ethiopia',
'Fiji',
'Finland',
'France',
'Gabon',
'The Gambia',
'Georgia',
'Germany',
'Ghana',
'Greece',
'Grenada',
'Guatemala',
'Guinea',
'Guinea-Bissau',
'Guyana',
'Haiti',
'Honduras',
'Hungary',
'Iceland',
'India',
'Indonesia',
'Iran',
'Iraq',
'Ireland',
'Israel',
'Italy',
'Jamaica',
'Japan',
'Jordan',
'Kazakhstan',
'Kenya',
'Kiribati',
'Korea, North',
'Korea, South',
'Kosovo',
'Kuwait',
'Kyrgyzstan',
'Laos',
'Latvia',
'Lebanon',
'Lesotho',
'Liberia',
'Libya',
'Liechtenstein',
'Lithuania',
'Luxembourg',
'Madagascar',
'Malawi',
'Malaysia',
'Maldives',
'Mali',
'Malta',
'Marshall Islands',
'Mauritania',
'Mauritius',
'Mexico',
'Micronesia, Federated States of',
'Moldova',
'Monaco',
'Mongolia',
'Montenegro',
'Morocco',
'Mozambique',
'Myanmar (Burma)',
'Namibia',
'Nauru',
'Nepal',
'Netherlands',
'New Zealand',
'Nicaragua',
'Niger',
'Nigeria',
'North Macedonia',
'Norway',
'Oman',
'Pakistan',
'Palau',
'Panama',
'Papua New Guinea',
'Paraguay',
'Peru',
'Philippines',
'Poland',
'Portugal',
'Qatar',
'Romania',
'Russia',
'Rwanda',
'Saint Kitts and Nevis',
'Saint Lucia',
'Saint Vincent and the Grenadines',
'Samoa',
'San Marino',
'Sao Tome and Principe',
'Saudi Arabia',
'Senegal',
'Serbia',
'Seychelles',
'Sierra Leone',
'Singapore',
'Slovakia',
'Slovenia',
'Solomon Islands',
'Somalia',
'South Africa',
'Spain',
'Sri Lanka',
'Sudan',
'Sudan, South',
'Suriname',
'Sweden',
'Switzerland',
'Syria',
'Taiwan',
'Tajikistan',
'Tanzania',
'Thailand',
'Togo',
'Tonga',
'Trinidad and Tobago',
'Tunisia',
'Turkey',
'Turkmenistan',
'Tuvalu',
'Uganda',
'Ukraine',
'United Arab Emirates',
'United Kingdom',
'United States',
'Uruguay',
'Uzbekistan',
'Vanuatu',
'Vatican City',
'Venezuela',
'Vietnam',
'Yemen',
'Zambia',
'Zimbabwe'];


const industry = [
    "Abrasives and Nonmetallic Minerals Manufacturing", 
    "Accommodation",
    "Accounting Domain",
    "Administration of Justice",
    "Administrative and Support Services",
    "Advertising Services",
    "Agricultural Chemical Manufacturing",
    "Agriculture, Construction, Mining Machinery Manufacturing",
    "Air, Water, and Waste Program ",
    "Airlines and Aviation",
    "Alternative Dispute Resolution",
    "Alternative Medicine",
    "Ambulance Services",
    "Amusement Parks and Arcades",
    "Animal Feed Manufacturing",
    "Animation and Post-production",
    "Apparel Manufacturing",
    "Appliances, Electrical, and Electronics Manufacturing",
    "Architectural and Structural Metal Manufacturing",
    "Architecture and Planning",
    "Armed Forces",
    "Artificial Rubber and Synthetic Fiber Manufacturing",
    "Artists and Writers",
    "Audio and Video Equipment Manufacturing",
    "Automation Machinery Manufacturing",
    "Aviation and Aerospace Component Manufacturing",
    "Baked Goods Manufacturing",
    "Banking",
    "Bars, Taverns, and Nightclubs",
    "Bed-and-Breakfasts, Hostels, Homestays",
    "Beverage Manufacturing",
    "Biomass Electric Power Generation",
    "Biotechnology Research",
    "Blockchain Services",
    "Blogs",
    "Boilers, Tanks, and Shipping Container Manufacturing",
    "Book and Periodical Publishing",
    "Book Publishing",
    "Breweries",
    "Broadcast Media Production and Distribution",
    "Building Construction",
    "Building Equipment Contractors",
    "Building Finishing Contractors",
    "Building Structure and Exterior Contractors",
    "Business Consulting and Services",
    "Business Content",
    "Business Intelligence Platforms",
    "Cable and Satellite Programming",
    "Capital Markets",
    "Caterers",
    "Chemical Manufacturing",
    "Chemical Raw Materials Manufacturing",
    "Child Day Care Services",
    "Chiropractors",
    "Circuses and Magic Shows",
    "Civic and Social Organizations",
    "Civil Engineering",
    "Claims Adjusting, Actuarial Services",
    "Clay and Refractory Products Manufacturing",
    "Coal Mining",
    "Collection Agencies",
    "Commercial and Industrial Equipment Rental",
    "Commercial and Industrial Machinery Maintenance",
    "Commercial and Service Industry Machinery Manufacturing",
    "Communications Equipment Manufacturing",
    "Community Development and Urban Planning",
    "Community Services",
    "Computer and Network Security",
    "Computer Games",
    "Computer Hardware Manufacturing",
    "Computer Networking Products",
    "Computers and Electronics Manufacturing",
    "Conservation Programs",
    "Construction",
    "Construction Hardware Manufacturing",
    "Consumer Goods Rental",
    "Consumer Services",
    "Correctional Institutions",
    "Cosmetology and Barber Schools",
    "Courts of Law",
    "Credit Intermediation",
    "Cutlery and Handtool Manufacturing",
    "Dairy Product Manufacturing",
    "Dance Companies",
    "Data Infrastructure and Analytics",
    "Data Security Software Products",
    "Defense and Space Manufacturing",
    "Dentists",
    "Design Services",
    "Desktop Computing Software Products",
    "Distilleries",
    "Economic Programs",
    "Education",
    "Education Administration Programs",
    "E-Learning Providers",
    "Electric Lighting Equipment Manufacturing",
    "Electric Power Generation",
    "Electric Power Transmission, Control, and Distribution",
    "Electrical Equipment Manufacturing",
    "Electronic and Precision Equipment Maintenance",
    "Embedded Software Products",
    "Emergency and Relief Services",
    "Engineering Services",
    "Engines and Power Transmission Equipment Manufacturing",
    "Entertainment Providers",
    "Environmental Quality Programs",
    "Environmental Services",
    "Equipment Rental Services",
    "Events Services",
    "Executive Offices",
    "Executive Search Services",
    "Fabricated Metal Products",
    "Facilities Services",
    "Family Planning Centers",
    "Farming",
    "Farming, Ranching, Forestry",
    "Fashion Accessories Manufacturing",
    "Financial Services",
    "Fine Arts Schools",
    "Fire Protection",
    "Fisheries",
    "Flight Training",
    "Food and Beverage Manufacturing",
    "Food and Beverage Retail",
    "Food and Beverage Services",
    "Footwear and Leather Goods Repair",
    "Footwear Manufacturing",
    "Forestry and Logging",
    "Fossil Fuel Electric Power Generation",
    "Freight and Package Transportation",
    "Fruit and Vegetable Preserves Manufacturing",
    "Fundraising",
    "Funds and Trusts",
    "Furniture and Home Furnishings Manufacturing",
    "Gambling Facilities and Casinos",
    "Geothermal Electric Power Generation",
    "Glass Product Manufacturing",
    "Glass, Ceramics and Concrete Manufacturing",
    "Golf Courses and Country Clubs",
    "Government Administration",
    "Government Relations Services",
    "Graphic Design",
    "Ground Passenger Transportation",
    "Health and Human Services",
    "Higher Education",
    "Highway, Street, and Bridge Construction",
    "Historical Sites",
    "Holding Companies",
    "Home Health Care Services",
    "Horticulture",
    "Hospitality",
    "Hospitals",
    "Hospitals and Health Care",
    "Hotels and Motels",
    "Household and Institutional Furniture Manufacturing",
    "Household Appliance Manufacturing",
    "Household Services",
    "Housing and Community Development",
    "Housing Programs",
    "Human Resources Services",
    "HVAC and Refrigeration Equipment Manufacturing",
    "Hydroelectric Power Generation",
    "Individual and Family Services",
    "Industrial Machinery Manufacturing",
    "Industry Associations",
    "Information Services",
    "Insurance",
    "Insurance Agencies and Brokerages",
    "Insurance and Employee Benefit Funds",
    "Insurance Carriers",
    "Interior Design",
    "International Affairs",
    "International Trade and Development",
    "Internet Marketplace Platforms",
    "Internet News",
    "Internet Publishing",
    "Interurban and Rural Bus Services",
    "Investment Banking",
    "Investment Advice",
    "Investment Management",
    "IT Services and IT Consulting",
    "IT System Custom Software Development",
    "IT System Data Services",
    "IT System Design Services",
    "IT System Installation and Disposal",
    "IT System Operations and Maintenance",
    "IT System Testing and Evaluation",
    "IT System Training and Support",
    "Janitorial Services",
    "Landscaping Services",
    "Language Schools",
    "Laundry and Drycleaning Services",
    "Law Enforcement",
    "Law Practice",
    "Leasing Non-residential Real Estate",
    "Leasing Residential Real Estate",
    "Leather Product Manufacturing",
    "Legal Services",
    "Legislative Offices",
    "Libraries",
    "Lime and Gypsum Products Manufacturing",
    "Loan Brokers",
    "Machinery Manufacturing",
    "Magnetic and Optical Media Manufacturing",
    "Manufacturing",
    "Maritime Transportation",
    "Market Research",
    "Marketing Services",
    "Mattress and Blinds Manufacturing",
    "Measuring and Control Instrument Manufacturing",
    "Meat Products Manufacturing",
    "Media and Telecommunications",
    "Media Production",
    "Medical and Diagnostic Laboratories",
    "Medical Equipment Manufacturing",
    "Medical Practices",
    "Mental Health Care",
    "Metal Ore Mining",
    "Metal Treatments",
    "Metal Valve, Ball, and Roller Manufacturing",
    "Metalworking Machinery Manufacturing",
    "Military and International Affairs",
    "Mining",
    "Mobile Computing Software Products",
    "Mobile Food Services",
    "Mobile Gaming Apps",
    "Motor Vehicle Manufacturing",
    "Motor Vehicle Parts Manufacturing",
    "Movies and Sound Recording",
    "Movies, Videos, and Sound",
    "Museums",
    "Museums, Historical Sites, and Zoos",
    "Musicians",
    "Nanotechnology Research",
    "Natural Gas Distribution",
    "Natural Gas Extraction",
    "Newspaper Publishing",
    "Nonmetallic Mineral Mining",
    "Non-profit Organizations",
    "Nonresidential Building Construction",
    "Nuclear Electric Power Generation",
    "Nursing Homes and Residential Care Facilities",
    "Office Administration",
    "Office Furniture and Fixtures Manufacturing",
    "Oil and Coal Product Manufacturing",
    "Oil and Gas",
    "Oil Extraction",
    "Oil, Gas, and Mining",
    "Online and Mail Order Retail",
    "Online Audio and Video Media",
    "Operations Consulting",
    "Optometrists",
    "Outpatient Care Centers",
    "Outsourcing and Offshoring Consulting",
    "Packaging and Containers Manufacturing",
    "Paint, Coating, and Adhesive Manufacturing",
    "Paper and Forest Product Manufacturing",
    "Pension Funds",
    "Performing Arts",
    "Performing Arts and Spectator Sports",
    "Periodical Publishing",
    "Personal and Laundry Services",
    "Personal Care Product Manufacturing",
    "Personal Care Services",
    "Pet Services",
    "Pharmaceutical Manufacturing",
    "Philanthropic Fundraising Services",
    "Photography",
    "Physical, Occupational and Speech Therapists",
    "Physicians",
    "Pipeline Transportation",
    "Plastics and Rubber Product Manufacturing",
    "Plastics Manufacturing",
    "Political Organizations",
    "Postal Services",
    "Primary and Secondary Education",
    "Primary Metal Manufacturing",
    "Printing Services",
    "Professional Organizations",
    "Professional Services",
    "Professional Training and Coaching",
    "Public Assistance Programs",
    "Public Health",
    "Public Policy Offices",
    "Public Relations and Communications Services",
    "Public Safety",
    "Racetracks",
    "Radio and Television Broadcasting",
    "Rail Transportation",
    "Railroad Equipment Manufacturing",
    "Ranching",
    "Ranching and Fisheries",
    "Real Estate",
    "Real Estate Agents and Brokers",
    "Real Estate and Equipment Rental Services",
    "Recreational Facilities",
    "Religious Institutions",
    "Renewable Energy Equipment Manufacturing",
    "Renewable Energy Power Generation",
    "Renewable Energy Semiconductor Manufacturing",
    "Repair and Maintenance",
    "Research Services",
    "Residential Building Construction",
    "Restaurants",
    "Retail",
    "Retail Apparel and Fashion",
    "Retail Appliances, Electrical, and Electronic Equipment",
    "Retail Art Dealers",
    "Retail Art Supplies",
    "Retail Books and Printed News",
    "Retail Building Materials and Garden Equipment",
    "Retail Florists",
    "Retail Furniture and Home Furnishings",
    
    "Retail Groceries",
    "Retail Health and Personal Care Products",
    "Retail Luxury Goods and Jewelry",
    "Retail Motor Vehicles",
    "Retail Musical Instruments",
    "Office Equipment",
    "Retail Office Supplies and Gifts",
    "Retail Recyclable Materials & Used Merchandise",
    "Reupholstery and Furniture Repair",
    "Rubber Products Manufacturing",
    "Satellite Telecommunications",
    "Savings Institutions",
    "School and Employee Bus Services",
    "Seafood Product Manufacturing",
    "Secretarial Schools",
    "Securities and Commodity Exchanges",
    "Security and Investigations",
    "Security Guards and Patrol Services",
    "Security Systems Services",
    "Semiconductor Manufacturing",
    "Services for Renewable Energy",
    "Services for the Elderly and Disabled",
    "Sheet Music Publishing",
    "Shipbuilding",
    "Shuttles and Special Needs Transportation Services",
    "Sightseeing Transportation",
    "Skiing Facilities",
    "Soap and Cleaning Product Manufacturing",
    "Social Networking Platforms",
    "Software Development",
    "Solar Electric Power Generation",
    "Sound Recording",
    "Space Research and Technology",
    "Specialty Trade Contractors",
    "Spectator Sports",
    "Sporting Goods Manufacturing",
    "Sports and Recreation Instruction",
    "Sports Teams and Clubs",
    "Spring and Wire Product Manufacturing",
    "Staffing and Recruiting",
    "Steam and Air-Conditioning Supply",
    "Strategic Management Services",
    "Subdivision of Land",
    "Sugar and Confectionery Product Manufacturing",
    "Taxi and Limousine Services",
    "Technical and Vocational Training",
    "Technology, Information and Internet",
    "Technology, Information and Media",
    "Telecommunications",
    "Telecommunications Carriers",
    "Telephone Call Centers",
    "Temporary Help Services",
    "Textile Manufacturing",
    "Theater Companies",
    "Think Tanks",
    "Tobacco Manufacturing",
    "Translation and Localization",
    "Transportation Equipment Manufacturing",
    "Transportation Programs",
    "Transportation, Logistics, Supply Chain and Storage",
    "Travel Arrangements",
    "Truck Transportation",
    "Trusts and Estates",
    "Turned Products and Fastener Manufacturing",
    "Urban Transit Services",
    "Utilities",
    "Utilities Administration",
    "Utility System Construction",
    "Vehicle Repair and Maintenance",
    "Venture Capital and Private Equity Principals",
    "Veterinary Services",
    "Vocational Rehabilitation Services",
    "Warehousing and Storage",
    "Waste Collection",
    "Waste Treatment and Disposal",
    "Water Supply and Irrigation Systems",
    "Water, Waste, Steam, and Air Conditioning Services",
    "Wellness and Fitness Services",
    "Wholesale",
    "Wholesale Alcoholic Beverages",
    "Wholesale Apparel and Sewing Supplies",
    "Wholesale Appliances, Electrical, and Electronics",
    "Wholesale Building Materials",
    "Wholesale Chemical and Allied Products",
    "Wholesale Computer Equipment",
    "Wholesale Drugs and Sundries",
    "Wholesale Food and Beverage",
    "Wholesale Footwear",
    "Wholesale Furniture and Home Furnishings",
    "Wholesale Hardware, Plumbing, Heating Equipment",
    "Wholesale Import and Export",
    "Wholesale Luxury Goods and Jewelry",
    "Wholesale Machinery",
    "Wholesale Metals and Minerals",
    "Wholesale Motor Vehicles and Parts",
    "Wholesale Paper Products",
    "Wholesale Petroleum and Petroleum Products",
    "Wholesale Photography Equipment and Supplies",
    "Wholesale Raw Farm Products",
    "Wholesale Recyclable Materials",
    "Wind Electric Power Generation",
    "Wineries",
    "Wireless Services",
    "Women's Handbag Manufacturing",
    "Wood Product Manufacturing",
    "Writing and Editing",
    "Zoos and Botanical Gardens",
    "Other",
    
    ]
      




 
 
 



















