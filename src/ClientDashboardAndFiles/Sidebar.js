import React, { Component } from 'react'
import {Box, Card, Paper, SvgIcon, Typography } from '@mui/material'
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
import logo from '../img/logo.jpeg'
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DnsIcon from '@mui/icons-material/Dns';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BugReportIcon from '@mui/icons-material/BugReport';
import DescriptionIcon from '@mui/icons-material/Description';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import TimelineIcon from '@mui/icons-material/Timeline';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Person4Icon from '@mui/icons-material/Person4';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
export class Sidebar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      data:"",
      textcolor:"#008ffb",
      bgcolor:"",
      credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
      permissiondata : JSON.parse(sessionStorage.getItem('permission')),
      id:1,
      pathname:this.props.location.pathname,
    

      openrole:false,
      is_expand_department:false,
      openDepartment:false,
      reportOpen : false,
    }
  }
 



  first=()=>{
    this.setState({id:1},()=>{
       this.props.navigate('/clientDashboard');
    });
   
  }
  

  
  third=()=>{
    this.setState({id:3},()=>{
      this.props.navigate('/clientCampaign')
    },()=>{
      
    })
    
  }
  
  
  
  componentDidMount(){
  
  }




  render() {
   
    return (
      <div>
        <Box sx={{display:{xs:'none',sm:'flex'},width:240,bottom:0,height:'100vh',position:'sticky'}}>



        <Box sx={{width:240,marginLeft:1,marginRight:1,borderRadius:2,position:'fixed',height:'100vh',overflowY:'scroll', scrollbarWidth:'none','&::-webkit-scrollbar': {
        display: 'none',
    }, }}>



<Paper elevation={1} sx={{height:60,backgroundColor:'white'}}>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<img src={logo} style={{height:60,objectFit:'cover',width:100}}/>
  </Box>
</Paper>


<Paper elevation={1} sx={{minHeight:'100vh',backgroundColor:'#fff',mt:1.5}}>

<br/>

<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientDashboard"?'#ebebf5':"#fff",display:'flex',justifyContent:'left',mt:1,borderRadius:2,alignItems:'center'}} onClick={this.first}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DashboardIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientDashboard"?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/clientDashboard"?'#008ffb':"#212121",marginLeft:-4}}>Dashboard</Typography>
        </Link>
      </Box>
  </Box>
</Box>





<Box   sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientCampaign"?'#ebebf5':this.state.pathname=="/clientCampaign/add"?'#ebebf5':"#fff",display:this.state.permissiondata?this.state.permissiondata.campaign.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.third}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <TaskAltIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientCampaign"?'#008ffb':this.state.pathname=="/clientCampaign/add"?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/clientCampaign"?'#008ffb':this.state.pathname=="/clientCampaign/add"?'#008ffb':"#212121",marginLeft:-4}}>Campaign</Typography>
        </Link>
      </Box>
  </Box>
</Box>




<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname.indexOf("campaignListwithleads") > -1?'#ebebf5':this.state.pathname=="/campaignListwithleads"?'#ebebf5':"#fff",display:this.state.permissiondata?this.state.permissiondata.lead.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/campaignListwithleads')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DnsIcon  sx={{marginLeft:2,color:this.state.pathname.indexOf("campaignListwithleads") > -1?'#008ffb':this.state.pathname.indexOf("campaignListwithleads") > -1?"#008ffb":"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname.indexOf("campaignListwithleads") > -1?'#008ffb':this.state.pathname.indexOf("campaignListwithleads") > -1?"#008ffb":"#212121",marginLeft:-4}}>Leads</Typography>
        </Link>
      </Box>
  </Box>
</Box>





<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/overviewControllers"?'#ebebf5':this.state.pathname=="/overviewControllers"?'#ebebf5':"#fff",display:'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/overviewControllers')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DnsIcon  sx={{marginLeft:2,color:this.state.pathname=="/overviewControllers"?'#008ffb':this.state.pathname=="/overviewControllers"?"#008ffb":"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/overviewControllers"?'#008ffb':this.state.pathname=="/campaignListwithleads"?"#008ffb":"#212121",marginLeft:-4}}>Overviews</Typography>
        </Link>
      </Box>
  </Box>
</Box>


<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientRFP"?'#ebebf5':"#fff",display:'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientRFP')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <FactCheckIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientRFP"?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:14,fontWeight:'600',color:this.state.pathname=="/clientRFP"?'#008ffb':"#212121",marginLeft:-4}}>RFP</Typography>
        </Link>
      </Box>
  </Box>
</Box>


<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientInvoice"?'#ebebf5':"#fff",display:this.state.permissiondata?this.state.permissiondata.invoice.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientInvoice')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DescriptionIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientInvoice"?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:14,fontWeight:'600',color:this.state.pathname=="/clientInvoice"?'#008ffb':"#212121",marginLeft:-4}}>Invoice</Typography>
        </Link>
      </Box>
  </Box>
</Box>



<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname.indexOf("clientDepartmentAdd") > -1?'#ebebf5':this.state.pathname.indexOf("clientConatctAdd") > -1?'#ebebf5':"#fff",display:this.state.permissiondata?this.state.permissiondata.department.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.state.openDepartment?this.setState({openDepartment:false}):this.setState({openDepartment:true})}}>
    <Box  sx={{display:'flex',flexDirection:'row',width:'100%'}} onClick={()=>this.state.openDepartment?this.setState({openDepartment:false}):this.setState({openDepartment:true})}>
      <Diversity2Icon  sx={{marginLeft:2,color:this.state.pathname.indexOf("clientDepartmentAdd") > -1?'#008ffb':this.state.pathname.indexOf("clientConatctAdd") > -1?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname.indexOf("clientConatctAdd") > -1?'#008ffb':this.state.pathname.indexOf("clientDepartmentAdd") > -1?'#008ffb':"#212121",marginLeft:-4}}>Department</Typography>
        </Link>
      </Box>
      {
        this.state.openDepartment?<ArrowDropUpIcon  sx={{mr:2,color:this.state.pathname.indexOf("clientDepartmentAdd") > -1?'#008ffb':this.state.pathname.indexOf("clientConatctAdd") > -1?'#008ffb' :"#8e8e93"}}/>:<ArrowDropDownIcon  sx={{mr:2,color:this.state.pathname.indexOf("clientDepartmentAdd") > -1?'#008ffb':this.state.pathname.indexOf("clientConatctAdd") > -1?'#008ffb' :"#8e8e93"}}/>
      }
  </Box>
</Box>



 

<Box sx={{display:this.state.openDepartment?'block':'none'}}>
<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/clientDepartmentAdd"?'#fff':"#fff",display:this.state.permissiondata.department.is_view?'flex':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientDepartmentAdd')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,ml:5,fontWeight:'700',color:this.state.pathname=="/clientDepartmentAdd"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1,ml:1}}/> Add Department</Typography>
        </Link>
      </Box>
  </Box>
</Box>


<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/clientConatctAdd"?'#fff':"#fff",display:this.state.permissiondata.department.is_view?'flex':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientConatctAdd')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',ml:5,fontSize:11,fontWeight:'700',color:this.state.pathname=="/clientConatctAdd"?'#008ffb':this.state.pathname=="/clientConatctAdd/profile"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1,ml:1}}/>Add Contact</Typography>
        </Link>
      </Box>
  </Box>
</Box>

</Box>


<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname.indexOf("report") > -1?'#ebebf5':"#fff",display:this.state.permissiondata?this.state.permissiondata.report.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.state.reportOpen?this.setState({reportOpen:false}):this.setState({reportOpen:true})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <AssessmentIcon  sx={{marginLeft:2,color:this.state.pathname.indexOf("report") > -1?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname.indexOf("report") > -1?'#008ffb':"#212121",marginLeft:-4}}>Report</Typography>
        </Link>
      </Box>
      {
        this.state.reportOpen?<ArrowDropUpIcon  sx={{mr:2,color:this.state.pathname.indexOf("report") > -1?'#008ffb':"#8e8e93"}}/>:<ArrowDropDownIcon  sx={{mr:2,color:this.state.pathname.indexOf("report") > -1?'#008ffb':"#8e8e93"}}/>
      }
  </Box>
</Box>



<Box sx={{display:this.state.reportOpen?'block':'none'}}>
<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/reportClient/personal_tracking_client"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({},()=>{this.props.navigate('/reportClient/personal_tracking_client')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
       <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,ml:5,fontWeight:'700',color:this.state.pathname=="/reportClient/personal_tracking_client"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1,ml:1}}/>Campaign Tracking</Typography>
        </Link>
      </Box>
  </Box>
</Box>

<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/report_client/overall_tracking_client"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({},()=>{this.props.navigate('/report_client/overall_tracking_client')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
       <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,ml:5,fontWeight:'700',color:this.state.pathname=="/report_client/overall_tracking_client"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1,ml:1}}/>Overall Tracking</Typography>
        </Link>
      </Box>
  </Box>
</Box>

<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/report_client/end_client_wise_tracking"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({},()=>{this.props.navigate('/report_client/end_client_wise_tracking')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
       <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,ml:5,fontWeight:'700',color:this.state.pathname=="/report_client/end_client_wise_tracking"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1,ml:1}}/>End Client</Typography>
        </Link>
      </Box>
  </Box>
</Box>


</Box>





<Box   sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname.indexOf("clientRoleList") > -1?'#ebebf5':this.state.pathname.indexOf("clientUser") > -1?'#ebebf5':"#fff",display:this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.state.openrole?this.setState({openrole:false}):this.setState({openrole:true})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}} >
      <Diversity3Icon  sx={{marginLeft:2,color:this.state.pathname.indexOf("clientRoleList") > -1?'#008ffb':this.state.pathname.indexOf("clientUser") > -1?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname.indexOf("clientRoleList") > -1?'#008ffb':this.state.pathname.indexOf("clientUser") > -1?'#008ffb':"#212121",marginLeft:-4}}>User & Roles</Typography>
        </Link>
      </Box>
      {
        this.state.openrole?<ArrowDropUpIcon  sx={{mr:2,color:this.state.pathname.indexOf("clientRoleList") > -1?'#008ffb':this.state.pathname.indexOf("clientUser") > -1?'#008ffb':"#8e8e93"}}/>:<ArrowDropDownIcon  sx={{mr:2,color:this.state.pathname.indexOf("clientRoleList") > -1?'#008ffb':this.state.pathname.indexOf("clientUser") > -1?'#008ffb':"#8e8e93"}}/>
      }
  </Box>
</Box>


<Box sx={{display:this.state.openrole?'block':'none'}}>
<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/clientRoleList"?'#fff':"#fff",display:this.state.permissiondata.User_And_Roles.is_view?'flex':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({openrole:true},()=>{this.props.navigate('/clientRoleList')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,fontWeight:'700',color:this.state.pathname=="/clientRoleList"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1,ml:1}}/>Roles</Typography>
        </Link>
      </Box>
  </Box>
</Box>

<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/clientUser"?'#fff':"#fff",display:this.state.permissiondata.User_And_Roles.is_view?'flex':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.setState({openrole:true},()=>{this.props.navigate('/clientUser')})}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:11,fontWeight:'700',color:this.state.pathname=="/clientUser"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1,ml:1}}/>User Management</Typography>
        </Link>
      </Box>
  </Box>
</Box>
</Box>



<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/endClient"?'#ebebf5':"#fff",display:this.state.permissiondata?this.state.permissiondata.end_client.is_view?'flex':'none':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.props.navigate('/endClient')}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <SupervisorAccountIcon  sx={{marginLeft:2,color:this.state.pathname=="/endClient"?'#008ffb':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:14,fontWeight:'600',color:this.state.pathname=="/endClient"?'#008ffb':"#212121",marginLeft:-4}}>End Client</Typography>
        </Link>
      </Box>
  </Box>
</Box>



</Paper>
<br/>

        </Box>
        </Box>
        
        </div>
    )
  }
}

export default Sidebar


export function Sidebarc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Sidebar location={location} navigate={navigate}></Sidebar>)
}