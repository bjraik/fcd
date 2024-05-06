import React, { Component } from 'react'
import { useNavigate,useLocation,useMatch,Link, useParams } from 'react-router-dom';
import { Box, Divider, Grid } from '@mui/material';
import Appheader, { Appheaderc } from '../../Appheader'
import Sidebar from '../../Sidebar'
import Chat from '../../Chat'
import { Sidebarc } from '../../Sidebar'
import SingleClientNotes, { SingleClientNotesc } from './subclientdata/SingleClientNotes';
import { Paper, Typography } from '@mui/material'
import {Backdrop,CircularProgress,Button,Tab} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Tabs from '@mui/material/Tabs';
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SingleClientInfo from '../Singleclient/subclientdata/SingleClientInfo'
import SingleClientContact, { SingleClientContactc } from './subclientdata/SingleClientContact';
import SingleClientCompaign, { SingleClientCompaignc } from './subclientdata/SingleClientCompaign';
import SingleClientInvoice, { SingleClientInvoicec } from './subclientdata/SingleClientInvoice';
import SingleClientPayment, { SingleClientPaymentc } from './subclientdata/SingleClientPayment';
import CountUp from 'react-countup';
import SingleClientContract from './subclientdata/SingleClientContract';
import SingleClientRPF, { SingleClientRPFc } from './subclientdata/SingleClientRPF';
import base from '../../base'
import Department, { Departmentc } from './subclientdata/Department';
import End_client, { End_clientc } from './subclientdata/End_client';

const drawerWidth = 240;

export class Singleclientview extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        is_loader_open:false,
        tab_value:"Department",
       client_total_campaign:0,
       client_total_invoice:0,
       client_total_payments:0,
       total_discount:0,



        SingleClientData:{},
        departmentList:[],    /// in contact list
      }
    }

componentDidMount(){
 let  str = this.props.param.singleclient.replace(/:/g,'');

 fetch(`${base.base_url}/singleClientTotalCampaignCount`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
client_id:str
  })
}).then((res)=>{return res.json()}).then((result)=>{
  this.setState({client_total_campaign:result.totalCampaign,client_total_invoice:result.total_Invoice,client_total_payments:result.total_payment,total_discount:result.total_discount})
})


////////// see tommaaro

  fetch(`${base.base_url}/retriveDepartment`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
  client_id:str
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({departmentList:result.data});
  })


  fetch(`${base.base_url}/getSingleClientData`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
  client_id:str
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({SingleClientData:result.data});
  })

}



  render() {
    return (
        <div>
        <Box sx={{display:'flex'}}>
        <Sidebarc/>
        <Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
        <Box sx={{p:{xs:1,sm:3}, mt:6}}>
        <Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},marginLeft:1,mt:{xs:2,sm:2,md:1},mb:1,fontWeight:'500',color:'#3e3e40'}}>Clients</Typography>
        


<Grid container spacing={{xs:1,sm:2}}>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#00a3ff'}}>

<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<ExploreIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Campaign</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>
  <CountUp start={0} end={this.state.client_total_campaign}  />
  </Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#28176f'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<PaidIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Payment</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>
<CountUp start={0} prefix="$ " end={this.state.client_total_payments}  />
</Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#fe964a'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<DescriptionIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total invoice</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>
<CountUp start={0} prefix="$ " end={this.state.client_total_invoice - this.state.total_discount}  />
</Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#9a5252'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<AccountBalanceWalletIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Due</Typography>
</Box>
<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>
<CountUp start={0} prefix="$ " end={this.state.client_total_invoice - this.state.client_total_payments-this.state.total_discount}  />
 </Typography>
</Paper>
</Grid>
</Grid>




        
        <Box sx={{minHeight:50,width:'100%',mt:2}}>
        <Paper  sx={{minHeight:50,width:'100%',}}>
        <Box sx={{height:50}}>
        
        <Tabs
          value={this.state.tab_value}
          //onChange={this.handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="tab-selector"
        >
          <Tab value="Department" sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:''}} label="Department"  onClick={()=>this.setState({tab_value:"Department"})}/>
          <Tab value="Contact" sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:''}} label="Contact"  onClick={()=>this.setState({tab_value:"Contact"})}/>
          <Tab value="Client_Info" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Client Info" onClick={()=>this.setState({tab_value:"Client_Info"})}/>
          <Tab value="Compaign" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Campaign" onClick={()=>this.setState({tab_value:"Compaign"})}/>
          <Tab value="Invoice" sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:''}} label="Invoice"  onClick={()=>this.setState({tab_value:"Invoice"})}/>
          <Tab value="Payment" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Payment" onClick={()=>this.setState({tab_value:"Payment"})}/>
          <Tab value="RPF" sx={{fontSize:14,fontWeight:'550',textTransform:'none',display:'none'}} label="RFP" onClick={()=>this.setState({tab_value:"RPF"})}/>
          
          <Tab value="Notes" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Notes" onClick={()=>this.setState({tab_value:"Notes"})}/>
          <Tab value="End Client" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="End Client" onClick={()=>this.setState({tab_value:"End Client"})}/>
        
        </Tabs>
<Divider/>
        </Box>




<Box sx={{minHeight:500,width:'100%'}}>
  














{
  this.state.tab_value=="Department"?<Departmentc/>:this.state.tab_value=="Contact"?<SingleClientContactc  departmentList={this.state.departmentList}/>:this.state.tab_value=="Client_Info"? <SingleClientInfo singleClientInfo={this.state.SingleClientData}/> : this.state.tab_value=="Compaign"?<SingleClientCompaignc/> : this.state.tab_value=="Invoice" ? <SingleClientInvoicec/> :  this.state.tab_value=="Payment" ? <SingleClientPaymentc/>  : this.state.tab_value=="Contract"? <SingleClientContract/> : this.state.tab_value=="RPF"?<SingleClientRPFc/> : this.state.tab_value=="Notes"?<SingleClientNotesc/> :this.state.tab_value=="End Client"?<End_clientc/>:null
}
















</Box>


        </Paper>
        </Box>
        
        </Box>
        </Box>
        </Box>
        
        
        <Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
        <Appheaderc/>
        </Box>
        
        <Box sx={{display:'none',position:'fixed',bottom:40,right:10}}>
         <Chat/> 
        </Box>
        
        <Box sx={{}}>
        <Backdrop
          sx={{ color:'#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.is_loader_open}
          onClick={this.handleClose}
        >
          <CircularProgress color='inherit'/>
        </Backdrop>
        </Box>
        
             </div>
    )
  }
}

export default Singleclientview
export function Singleclientviewc(props){
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();
    return (<Singleclientview location={location} param={param} navigate={navigate}></Singleclientview>)
  }