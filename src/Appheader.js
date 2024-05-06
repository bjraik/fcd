
import React, { Component } from 'react'
//import {Paper} from '@mui/material'
import { Avatar, Box, Container,Link, Paper,Modal ,Menu,Typography ,MenuItem,IconButton,Button, Divider, AppBar, Card} from '@mui/material'
import man from '../src/img/man.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Toolbar from '@mui/material/Toolbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import logo from '../src/img/logo.jpeg'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DnsIcon from '@mui/icons-material/Dns';
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import BugReportIcon from '@mui/icons-material/BugReport';
import PageviewIcon from '@mui/icons-material/Pageview';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import SettingsIcon from '@mui/icons-material/Settings';
import FactCheckIcon from '@mui/icons-material/FactCheck';
export class Appheader extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       open:false,
       anchorEl : null,
       data:"",
       textcolor:"#33339c",
       bgcolor:"",
 
       id:1,
       pathname:this.props.location.pathname,
 
       opencompaign:false,
       openrole:false,
       reportopen :false,
   

        client_role : JSON.parse(window.sessionStorage.getItem('client_role')) ,  //// for client model roles
        campaign_role : JSON.parse(window.sessionStorage.getItem('campaign_role')),
        user_and_roles : JSON.parse(window.sessionStorage.getItem('user_and_roles')),
        lead_role : JSON.parse(window.sessionStorage.getItem('lead_role')),
        rfp_role : JSON.parse(window.sessionStorage.getItem('rfp_role')),
        invoice_role : JSON.parse(window.sessionStorage.getItem('invoice_role')),
        report_role :  JSON.parse(window.sessionStorage.getItem('report_role')),
   

    }
    this.setAnchorEl = this.setAnchorEl.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
   
  }


  
 
  first=()=>{
    this.setState({id:1},()=>{
       this.props.navigate('/dashboard');
    });
   
  }
  
  second = ()=>{
    this.setState({id:2},()=>{
      this.props.navigate('/client');
    });
    
  }
  
  third=()=>{
    this.state.opencompaign? this.setState({opencompaign:false}):this.setState({opencompaign:true})
  }
  
  
  forth=()=>{
    this.state.openrole? this.setState({openrole:false}):this.setState({openrole:true})
  }
  
  componentDidMount(){
    if(this.state.pathname=="/state"  || this.state.pathname=="/state/add"){
      this.setState({openResion:true})
    }
  
    if(this.state.pathname=="/area" || this.state.pathname=="/area/add"){
      this.setState({openResion:true})
    }
  
  
    if(this.state.pathname=="/city" || this.state.pathname=="/city/add"){
      this.setState({openResion:true})
    }
  }



compaign=()=>{
  this.props.navigate('/compaign')
  this.setState({opencompaign:true})
}

compaignRequest=()=>{
  this.props.navigate('/compaign/request')
  this.setState({opencompaign:true})
}



handleClick(event) {
  this.setAnchorEl(event.currentTarget);
}
  setAnchorEl(value){
      this.setState({
          anchorEl: value,
          open: !this.state.open
      })
  }
handleClose=() =>{
  this.setAnchorEl(null);
}





renderMenu(){
  return(
  <Menu id="fade-menu"   onClick={this.handleClose} anchorEl={this.state.anchorEl} open={this.state.open}  sx={{mt:1}}>
     <Box sx={{width:180,minHeight:100}}>
       
       <Box sx={{display:'flex',justifyContent:'center'}}>
      
         <Avatar sx={{height:70,width:70,}}>
             <PersonIcon  sx={{color:"#008ffb",height:30,width:30}}/>
         </Avatar>

       </Box>
       <MenuItem  sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600',color:'red',mt:2,mb:2}} onClick={()=>{this.props.navigate('/'); sessionStorage.clear()}}> <LogoutIcon sx={{ml:1,mr:1}}/> Log Out</MenuItem>
     </Box>
    </Menu>
   )
}







  render() {



    return (
      <div>
      <Container maxWidth='lg'>
<Paper elevation={1}  sx={{height:60,backgroundColor:'#fff',borderRadius:2,position:'fixed',width:'100%',marginLeft:{xs:-2,sm:0}}}>
<Box sx={{display:'flex',justifyContent:'space-between',backgroundColor:'#fff',borderRadius:2}}>


<Box onClick={()=>this.setState({open:true})} sx={{display:'flex',justifyContent:'center',height:60,alignItems:'center'}}>
<IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml:1,display:{xs:'block',sm:'none',mt:2} }}
        >
          <MenuIcon sx={{}} />
        </IconButton>

</Box>



<Box sx={{display:'flex',justifyContent:'center',height:60,alignItems:'center'}}>



<Box sx={{marginRight:{xs:1,sm:35},display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>


<Stack spacing={2} direction="row" sx={{display:{xs:'none',sm:'none'}}}>
    <Badge badgeContent={0} color="secondary" anchorOrigin={{
  vertical: 'top',
  horizontal: 'left',
}}>
    <EmailOutlinedIcon  sx={{color:'#42526e'}} />
    </Badge>
    <Badge badgeContent={2} color="success" size='small' anchorOrigin={{
  vertical: 'top',
  horizontal: 'left',
}}>
      <NotificationsActiveOutlinedIcon  sx={{color:'#42526e'}} />
    </Badge>
  </Stack>

<Divider sx={{ height: 32, ml:2,mt:1,mb:1,mr:2,display:{xs:'none',sm:'block' }}} orientation="vertical" />

<Box aria-owns={this.state.open ? 'fade-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}  sx={{display:'flex',flexDirection:'row',minWidth:50}}>

<Avatar alt="Travis Howard">
<PersonOutlinedIcon sx={{height:30,width:30,color:'#0088cc'}}/>
</Avatar>

<Box>
  <Typography sx={{paddingLeft:0.5,paddingRight:0.5,fontSize:13,fontFamily:'sans-serif',fontWeight:'700'}}>{sessionStorage.getItem('adminName')}</Typography>
  <Typography sx={{paddingLeft:0.5,paddingRight:0.5,fontSize:11,fontFamily:'sans-serif',color:'#42526e'}}>Admin</Typography>
</Box> 
{this.renderMenu()}
</Box>
</Box>


</Box>



</Box>
</Paper>
</Container>




<Box sx={{display:{xs:'block',sm:'none'}}}>
<Modal
  open={this.state.open}
  sx={{
    display:{xs:'block',sm:'none'}
  }}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'left',alignItems:'center',height:'100%',width:'100%'}} onClick={()=>this.setState({open:false})}>
<Paper sx={{width:'70%',height:'100vh',backgroundColor:'white',borderRight:3,borderColor:'#b0b0b0'}}>


<br/>
<br/>
<br/>


<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/dashboard"?'#ebebf5':"#fff",display:'flex',justifyContent:'left',mt:1,borderRadius:2,alignItems:'center'}} onClick={this.first}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DashboardIcon  sx={{marginLeft:2,color:this.state.pathname=="/dashboard"?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/dashboard"?'#008ffb':"#212121",marginLeft:-4}}>Dashboard</Typography>
        </Link>
      </Box>
  </Box>
</Box>



<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/client"?'#ebebf5':this.state.pathname=="/client/singleclient/profile"?'#ebebf5':this.state.pathname=="/client/singleclient"?'#ebebf5' :this.state.pathname=="/client/add"?'#ebebf5':this.state.pathname.indexOf("client") > -1?'#ebebf5':"#fff",display:this.state.client_role?this.state.client_role.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.second}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <PeopleAltIcon  sx={{marginLeft:2,color:this.state.pathname=="/client"?'#008ffb' :this.state.pathname=="/client/singleclient/profile"?'#008ffb':this.state.pathname=="/client/singleclient"?'#008ffb' :this.state.pathname=="/client/add"?'#008ffb':this.state.pathname.indexOf("client") > -1?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/client"?'#008ffb':this.state.pathname=="/client/singleclient/profile"?'#008ffb':this.state.pathname=="/client/singleclient"?'#008ffb':this.state.pathname=="/client/add"?'#008ffb' :this.state.pathname=="/client/singleclient/profile"?'#008ffb':this.state.pathname=="/client/singleclient"?'#008ffb' :this.state.pathname=="/client/add"?'#008ffb':this.state.pathname.indexOf("client") > -1?'#008ffb':"#212121",marginLeft:-4}}>Client</Typography>
        </Link>
      </Box>
  </Box>
</Box>






<Box   sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/compaign"?'#ebebf5':this.state.pathname=='/compaign/request'?"#ebebf5":this.state.pathname=="/compaign/add"?'#ebebf5':"#fff",display:this.state.campaign_role?this.state.campaign_role.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.third}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <TaskAltIcon  sx={{marginLeft:2,color:this.state.pathname=="/compaign"?'#008ffb':this.state.pathname=="/compaign/request"?'#008ffb':this.state.pathname=="/compaign/add"?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/compaign"?'#008ffb':this.state.pathname=="/compaign/request"?'#008ffb':this.state.pathname=="/compaign/add"?"#008ffb":"#212121",marginLeft:-4}}>Campaign</Typography>
        </Link>
      </Box>
      {
        this.state.opencompaign?<ArrowDropUpIcon  sx={{mr:2,color:this.state.pathname=="/compaign"?'#008ffb':this.state.pathname.indexOf('compaign')?'#008ffb':"#8e8e93"}}/>:<ArrowDropDownIcon  sx={{mr:2,color:this.state.pathname=="/compaign"?'#008ffb':this.state.pathname=="/compaign/request"?'#008ffb':"#8e8e93"}}/>
      }
      
  </Box>
</Box>






<Box sx={{display:this.state.opencompaign?'block':'none'}}>
<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/compaign"?'#fff':"#fff",display:this.state.opencompaign?'block':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.compaign}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,ml:5,fontWeight:'600',color:this.state.pathname=="/compaign"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1}}/>Campaign Management</Typography>
        </Link>
      </Box>
  </Box>
</Box>


<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/compaign/request"?'#fff':"#fff",display:'flex',justifyContent:'left',borderRadius:2,alignItems:'center'}} onClick={this.compaignRequest}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',ml:5,fontSize:11,fontWeight:'600',color:this.state.pathname=="/compaign/request"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1}}/>Campaign Request</Typography>
        </Link>
      </Box>
  </Box>
</Box>

</Box>







<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/Lead"?'#ebebf5':this.state.pathname=="/Lead/singleleaddetails"?'#ebebf5':this.state.pathname=="/manageLeads"?'#ebebf5':"#fff",display:this.state.lead_role?this.state.lead_role.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.state.openLead?this.setState({openLead:false}):this.setState({openLead:true})} >
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DnsIcon  sx={{marginLeft:2,color:this.state.pathname=="/Lead"?'#008ffb':this.state.pathname=="/Lead/singleleaddetails"?"#008ffb":this.state.pathname=="/manageLeads"?"#008ffb":"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/Lead"?'#008ffb':this.state.pathname=="/Lead/singleleaddetails"?"#008ffb":this.state.pathname=="/manageLeads"?"#008ffb":"#212121",marginLeft:-4}}>Leads</Typography>
        </Link>

      </Box>

      {
        this.state.openLead?<ArrowDropUpIcon  sx={{mr:2,color:this.state.pathname.indexOf("Lead") > -1?'#008ffb':"#8e8e93"}}/>:<ArrowDropDownIcon  sx={{mr:2,color:this.state.pathname.indexOf("Lead") > -1?'#008ffb':"#8e8e93"}}/>
      }
  </Box>
</Box>





{

<Box sx={{display:this.state.openLead?'block':'none'}}>
<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/Lead"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/Lead')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,ml:5,fontWeight:'600',color:this.state.pathname=="/Lead"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1}}/>Import Leads</Typography>
        </Link>
      </Box>
  </Box>
</Box>


<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/manageLeads"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/manageLeads')} >
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',ml:5,fontSize:11,fontWeight:'600',color:this.state.pathname=="/manageLeads"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1}}/>Manage Leads</Typography>
        </Link>
      </Box>
  </Box>
</Box>

</Box>

}








<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/Rfp"?'#ebebf5':"#fff",display: this.state.rfp_role?this.state.rfp_role.is_view?'none':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/Rfp')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <FactCheckIcon  sx={{marginLeft:2,color:this.state.pathname=="/Rfp"?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:14,fontWeight:'600',color:this.state.pathname=="/Rfp"?'#008ffb':"#212121",marginLeft:-4}}>RFP</Typography>
        </Link>
      </Box>
  </Box>
</Box>




<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname.indexOf("report") > -1?'#ebebf5':"#fff",display:this.state.report_role?this.state.report_role.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.state.reportopen?this.setState({reportopen:false}) : this.setState({reportopen:true})    }}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <AssessmentIcon  sx={{marginLeft:2,color:this.state.pathname.indexOf("report") > -1?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname.indexOf("report") > -1?'#008ffb':"#212121",marginLeft:-4}}>Report</Typography>
        </Link>
      </Box>
      {
        this.state.reportopen?<ArrowDropUpIcon  sx={{mr:2,color:this.state.pathname.indexOf("report") > -1?'#008ffb':"#8e8e93"}}/>:<ArrowDropDownIcon  sx={{mr:2,color:this.state.pathname.indexOf("report") > -1?'#008ffb':"#8e8e93"}}/>
      }
  </Box>
</Box>






<Box sx={{display:this.state.reportopen?'block':'none'}}>
<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/report/personal_tracking"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({},()=>{this.props.navigate('/report/personal_tracking')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
       <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,ml:5,fontWeight:'700',color:this.state.pathname=="/report/personal_tracking"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1}}/>Personal Tracking</Typography>
        </Link>
      </Box>
  </Box>
</Box>

<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/report/overall_tracking"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({},()=>{this.props.navigate('/report/overall_tracking')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
       <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,ml:5,fontWeight:'700',color:this.state.pathname=="/report/overall_tracking"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1}}/>Overall Tracking</Typography>
        </Link>
      </Box>
  </Box>
</Box>

<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/report/report_c_tracking"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({},()=>{this.props.navigate('/report/report_c_tracking')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
       <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,ml:5,fontWeight:'700',color:this.state.pathname=="/report/report_c_tracking"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1}}/>Client Tracking</Typography>
        </Link>
      </Box>
  </Box>
</Box>
</Box>








<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/invoice"?'#ebebf5':this.state.pathname.indexOf("invoice") > -1?'#ebebf5':"#fff",display: this.state.invoice_role?this.state.invoice_role.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/invoice')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <PageviewIcon  sx={{marginLeft:2,color:this.state.pathname=="/invoice"?'#008ffb':this.state.pathname.indexOf("invoice") > -1?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/invoice"?'#008ffb':this.state.pathname.indexOf("invoice") > -1?'#008ffb':"#212121",marginLeft:-4}}>Invoice</Typography>
        </Link>
      </Box>
  </Box>
</Box>









<Box   sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/roles"?'#ebebf5':this.state.pathname.indexOf('userManagement') > -1 ?'#ebebf5':"#fff",display:this.state.user_and_roles?this.state.user_and_roles.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.forth}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Diversity3Icon  sx={{marginLeft:2,color:this.state.pathname=="/roles"?'#008ffb':this.state.pathname.indexOf('userManagement') > -1 ?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/roles"?'#008ffb': this.state.pathname.indexOf('userManagement') > -1 ?'#008ffb':"#212121",marginLeft:-4}}>User & Roles</Typography>
        </Link>
      </Box>
      {
        this.state.openrole?<ArrowDropUpIcon  sx={{mr:2,color:this.state.pathname=="/roles"?'#008ffb':this.state.pathname.indexOf('userManagement')?'#008ffb':"#8e8e93"}}/>:<ArrowDropDownIcon  sx={{mr:2,color:this.state.pathname=="/roles"?'#008ffb':"#8e8e93"}}/>
      }
  </Box>
</Box>


<Box sx={{display:this.state.openrole?'block':'none'}}>
<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/roles"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({openrole:true},()=>{this.props.navigate('/roles')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:13,fontWeight:'700',color:this.state.pathname=="/roles"?'#008ffb':"#212121",marginLeft:-4}}>-Roles</Typography>
        </Link>
      </Box>
  </Box>
</Box>

<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/userManagement"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({openrole:true},()=>{this.props.navigate('/userManagement')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:13,fontWeight:'700',color:this.state.pathname=="/userManagement"?'#008ffb':"#212121",marginLeft:-4}}>-User Management</Typography>
        </Link>
      </Box>
  </Box>
</Box>
</Box>



<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/permission"?'#ebebf5':"#fff",display:'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.first}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <SettingsIcon  sx={{marginLeft:2,color:this.state.pathname=="/permission"?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/dashboardc"?'#008ffb':"#212121",marginLeft:-4}}>Setting</Typography>
        </Link>
      </Box>
  </Box>
</Box>








</Paper>
</Box>
</Modal>
</Box>


    </div>
    )
  }
}

export default Appheader

export function Appheaderc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Appheader location={location} navigate={navigate}></Appheader>)
}


/*
 <div>
        <Container maxWidth='lg'>
<Paper elevation={1}  sx={{height:60,backgroundColor:'#fff',borderRadius:2,position:'fixed',width:'100%',marginLeft:{xs:-2,sm:0}}}>
<Box sx={{display:'flex',justifyContent:'space-between',backgroundColor:'#fff',borderRadius:2}}>


<Box sx={{display:'flex',justifyContent:'center',height:60,alignItems:'center'}}>
<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml:1,display:{xs:'block',sm:'none',mt:2} }}
          >
            <MenuIcon sx={{}} />
          </IconButton>

</Box>



<Box sx={{display:'flex',justifyContent:'center',height:60,alignItems:'center'}}>



<Box sx={{marginRight:{xs:1,sm:35},display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>


<Stack spacing={2} direction="row" sx={{display:{xs:'none',sm:'block'}}}>
      <Badge badgeContent={0} color="secondary" anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}>
      <EmailOutlinedIcon  sx={{color:'#42526e'}} />
      </Badge>
      <Badge badgeContent={2} color="success" size='small' anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}>
        <NotificationsActiveOutlinedIcon  sx={{color:'#42526e'}} />
      </Badge>
    </Stack>

<Divider sx={{ height: 32, ml:2,mt:1,mb:1,mr:2,display:{xs:'none',sm:'block' }}} orientation="vertical" />

  <Avatar alt="Travis Howard" src={man} />
  <Box>
    <Typography sx={{paddingLeft:0.5,paddingRight:0.5,fontSize:13,fontFamily:'sans-serif',fontWeight:'700'}}>Nitish kumar </Typography>
    <Typography sx={{paddingLeft:0.5,paddingRight:0.5,fontSize:11,fontFamily:'sans-serif',color:'#42526e'}}>Admin</Typography>
  </Box>
  
</Box>


</Box>



</Box>
</Paper>
</Container>
      </div>

      */