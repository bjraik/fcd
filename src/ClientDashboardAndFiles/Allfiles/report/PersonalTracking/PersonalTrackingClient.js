import React, { Component } from 'react'

import Appheader, { Appheaderc } from '../../../Appheader'

import { Sidebarc } from '../../../Sidebar'
import { Button, Input, Paper, Typography ,Grid, touchRippleClasses} from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import {Tooltip,Link,IconButton,TableBody,Table,Tab,Tabs,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import Papa from 'papaparse'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import {SyncLoader} from 'react-spinners'
import { CSVLink } from "react-csv";
import AdjustIcon from '@mui/icons-material/Adjust';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import ColorPicker from 'material-ui-color-picker'
import Brightness1Icon from '@mui/icons-material/Brightness1';
import CountUp from 'react-countup';
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import base from '../../../../base'




const drawerWidth = 240;

export class PersonalTrackingClient extends Component {


constructor(props) {
  super(props)

  this.state = {
allCampaignData : [],
campaign_count:0,
search:"",
page: 0,
rowsPerPage :10,
credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),

////////////////////////////////// data /////////////

total_allocation : 0,
total_revenue : 0,
total_dilivered : 0,
total_billing : 0,



  }
  this.handleChange = this.handleChange.bind(this)
}


handleChange = (e)=>{
    this.setState({[e.target.name]:e.target.value})
}

handleChangeSearch=(e)=>{
this.setState({is_loader_open:true,page:0,[e.target.name]:e.target.value},()=>{

  fetch(`${base.base_url}/getOverAllTrakingOfCampaignClient`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search :this.state.search,
      client_id  : this.state.credential_type.client_id,
      page : this.state.page,
      rowsPerPage : this.state.rowsPerPage
    })
  
   }).then((res)=>{return res.json()}).then(async(result)=>{
  
  this.setState({
    is_loader_open:false,
    campaign_count : result.counts,
    allCampaignData : result.data
  })
    
   })


})



}

componentDidMount(){
  this.setState({is_loader_open_circle:true},()=>{

fetch(`${base.base_url}/getOverAllTrakingOfCampaignClient`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
    client_id  : this.state.credential_type.client_id,
    page : this.state.page,
    search :this.state.search,
    rowsPerPage : this.state.rowsPerPage
  })

 }).then((res)=>{return res.json()}).then(async(result)=>{

this.setState({
  campaign_count : result.counts,
  allCampaignData : result.data
})
  

 }).then(()=>{

  fetch(`${base.base_url}/getOverAllTrackingOfAllModelClient`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
  body:JSON.stringify({
    client_id  : this.state.credential_type.client_id,
  })
   }).then((res)=>{return res.json()}).then(async(ee)=>{
  
     this.setState({
      is_loader_open_circle:false,
    total_allocation : ee.total_allocation,
   total_revenue : ee.total_revenue,
   total_dilivered : ee.total_dilivered,
   total_billing : ee.total_billing,
   })
    
  
   })

 })


  })


}





handleChangePage = (event, newPage) => {
  this.setState({page:newPage,is_loader_open:true},()=>{

    fetch(`${base.base_url}/getOverAllTrakingOfCampaignClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        client_id  : this.state.credential_type.client_id,
        page : this.state.page,
        rowsPerPage : this.state.rowsPerPage
      })
    
     }).then((res)=>{return res.json()}).then(async(result)=>{
    
      this.setState({
        is_loader_open:false,
        campaign_count : result.counts,
        allCampaignData : result.data
      })

  })


  })
};




handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0,is_loader_open:true},()=>{

    fetch(`${base.base_url}/getOverAllTrakingOfCampaignClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        client_id  : this.state.credential_type.client_id,
        page : this.state.page,
        rowsPerPage : this.state.rowsPerPage
      })
    
     }).then((res)=>{return res.json()}).then(async(result)=>{
    
      this.setState({
        is_loader_open:false,
        campaign_count : result.counts,
        allCampaignData : result.data
      })

  })
  })
};














  render() {
    return (
      <div>

<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Campaign Tracking</Typography>




<Grid container spacing={{xs:1,sm:2}}>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#00a3ff'}}>

<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<ExploreIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Allocation</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}> <CountUp start={0} end={this.state.total_allocation}  /></Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#fe964a'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<DescriptionIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Delivered Leads</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}><CountUp start={0} end={this.state.total_dilivered}  /></Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#28176f'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<PaidIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Spend</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$ <CountUp start={0} end={this.state.total_revenue}  /></Typography>

</Paper>
</Grid>

<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#9a5252'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<AccountBalanceWalletIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Billing</Typography>
</Box>
<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$ <CountUp start={0} end={this.state.total_billing}  /></Typography>
</Paper>
</Grid>
</Grid>


<Paper sx={{width:'100%',minHeight:300,mt:2}}>

<Box sx={{display:'flex',pt:1,flexDirection:{xs:'column',sm:'row',justifyContent:'right'}}}>

<Box sx={{borderRadius:2,minHeight:30,ml:1,mr:1,mt:{xs:1,sm:0},mb:{xs:1,sm:0}}}>
<TextField  sx={{"& input::placeholder": {
      fontSize: "14px",
      fontWeight:'700',
      marginLeft:"2px",
      mb:'2px'
    },backgroundColor:'#f8f9ff',borderRadius:1}} onChange={this.handleChangeSearch} name='search' variant='standard' InputProps={{ startAdornment:<SearchIcon sx={{color:'#919191'}} />, disableUnderline:true}}  placeholder='Campaign Name'/>
</Box>
</Box>

<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:2220 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>

            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Campaign Name </TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Campaign Manager</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Client</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Start Date </TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Date</TableCell>

            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Target </TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>CPL </TableCell>
            
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Delivered Leads</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Remaining Leads</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Campaign Status </TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Billing Status</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Spend </TableCell>
            {/* <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Received Spend </TableCell> */}

            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.allCampaignData.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:index % 2?'#f9f9f9':'#fff' }}
            >
              <TableCell align='left' sx={{fontSize:13}}>{row.campaign_name}</TableCell>
              <TableCell align='center' sx={{fontSize:13}}>{row.campaign_manager}</TableCell>
              <TableCell align='center' sx={{fontSize:13}}>{row.end_client==""?"---":row.end_client}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}} >{moment(row.start_date).format('YYYY-MM-DD')} </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}} >{moment(row.end_date).format('YYYY-MM-DD')} </TableCell>
              <TableCell align='center' sx={{fontSize:13}}>{row.lead_target}</TableCell>
              <TableCell align='left' sx={{fontSize:13}}><Box sx={{height:23,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#2d85d1'}}>$ {row.cost_per_lead}</Typography></Box> </TableCell>
                            <TableCell align='center' sx={{fontSize:13}}><CountUp start={0} end={parseInt(row.total_upoaded_Leads)} /></TableCell>

                            <TableCell align='center' sx={{fontSize:13}}><CountUp start={0} end={row.total_upoaded_Leads > parseInt(row.lead_target)? 0 : parseInt(row.lead_target) - row.total_upoaded_Leads} /></TableCell>

                            <TableCell align='center' sx={{fontSize:13}}> <Box sx={{height:23,display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,fontWeight:'700',color:'#fff',fontSize:11,backgroundColor:row.status=='Live'?'#0088cc':row.status=='Completed'?'#95ce9a':row.status=='Open'?'#fe964a':row.status=="Pending"?"#3fc3af":'#f29494',textTransform:'uppercase'}}>{row.status}</Typography></Box> </TableCell>
              <TableCell align='center' sx={{fontSize:13}}><Box sx={{height:23,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,color:'#fff',fontWeight:'700',fontSize:11,backgroundColor:row.no_of_leads_get_paid == 0?'#005aa0 ':row.no_of_leads_get_paid == parseInt(row.lead_target)?'#3fc3af':row.no_of_leads_get_paid == parseInt(row.lead_target)?'#0088cc':'#f29494',textTransform:'uppercase'}}>{row.no_of_leads_get_paid == 0? "Pending":row.no_of_leads_get_paid > 0 && row.no_of_leads_get_paid < parseInt(row.lead_target)?'Partially Paid':row.no_of_leads_get_paid == parseInt(row.lead_target)?'Fully Paid':'Pending'}</Typography></Box> </TableCell>

              <TableCell align='center' sx={{fontSize:13,fontWeight:'bold'}}>$ <CountUp start={0} end={parseInt(row.lead_target) * parseInt(row.cost_per_lead)} /></TableCell>

              {/* <TableCell align='center' sx={{fontSize:13}}>$ <CountUp start={0} end= {parseInt(row.lead_target) > row.total_upoaded_Leads?   parseInt(row.cost_per_lead) * row.total_upoaded_Leads  :  parseInt(row.cost_per_lead) * parseInt(row.lead_target)} /></TableCell> */}


              <TableCell align='right'><Button onClick={()=>{this.props.navigate(`/reportClient/personal_tracking_client/:${row.campaign_id}`)}} variant='contained' size='small' disableElevation  sx={{height:17,width:22,textTransform:'none',fontSize:12}}>View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   <TablePagination
          rowsPerPageOptions={[1, 10, 25]}
          component="div"
          count={this.state.campaign_count}
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



<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_loader_open_circle}
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

export default PersonalTrackingClient
export function PersonalTrackingClientc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<PersonalTrackingClient location={location} navigate={navigate}></PersonalTrackingClient>)
}






