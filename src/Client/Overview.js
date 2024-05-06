import React, { Component } from 'react'
import { Box,Grid ,Typography,Paper,LinearProgress,Divider,CircularProgress,Backdrop,} from '@mui/material'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LoginIcon from '@mui/icons-material/Login';
import { io } from "socket.io-client";
import base from '../base'
import CountUp from 'react-countup';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



const socket = io(base.base_url,{
  withCredentials:true
});


export class Overview extends Component {

constructor(props) {
  super(props)

  this.state = {
    totalClient : 0,
totalCampaign: 0,

openCampaign:0,
liveCampaign:0,
completedCampaign:0,
cancelCampaign:0,
pendingCampaign: 0,
holdCampaign : 0,


totalPayment:0,
totalInvoice :0,
total_discount : 0,

PendingInvoice : 0,
fullyPaidInvoice : 0,
partiallyPaidInvoice :0,
CanceledInvoice : 0,
total_invoice_counts: 0,

is_loader_open :false
////// for performas  ////////


  }
}


componentDidMount(){
  this.setState({is_loader_open:true},()=>{

////// retriving invoice details

    fetch(`${base.base_url}/retriveDataForAdminOverviewPage_invoice_details`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
     method:'post'
    }).then((response)=>{return response.json()}).then((data)=>{
  
     this.setState({ 

      totalPayment:data.totalPayment_amt,
      totalInvoice : data.totalInvoice_amt,
      total_discount  : data.total_discount_amt,
  
  PendingInvoice : data.PendingInvoice_count,
  fullyPaidInvoice : data.fullyPaidInvoice_count,
  partiallyPaidInvoice : data.partiallyPaidInvoice_count,
  CanceledInvoice : data.CanceledInvoice_count,
  total_invoice_counts: data.total_invoice_count + 0.0000000001,

     
     })
    
    });
  



  fetch(`${base.base_url}/retriveDataForoverviewPageAdmin`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
   method:'post'
  }).then((response)=>{return response.json()}).then((data)=>{

   this.setState({ 

   
    ///////////////

    totalClient : data.totalClient,
    totalCampaign: data.totalCampaign,

    openCampaign:data.open_campaing_count,
    liveCampaign:data.live_campaign_count,
    completedCampaign:data.completed_campaign_count,
    cancelCampaign:data.canceled_campaign_count,
    pendingCampaign : data.pending_campaign_count,
    holdCampaign  :data.hold_campaign_count,

   is_loader_open:false
   })
  
  });

})
}



  render() {
    return (
      <div>
<Box sx={{height:'100%',width:'100%',mt:2}}>

<Grid container spacing={{xs:2,sm:2}}>
  <Grid item xs={12} sm={6} md={3}>
<Paper  sx={{height:100,backgroundColor:'#fff',width:'100%',borderRadius:2}}>

<Box sx={{padding:1.5,display:'flex',justifyContent:'space-between'}}>
<Box sx={{width:'100%',height:45}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ccedff',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<PeopleAltIcon sx={{height:35,width:35,color:'#00a3ff'}}/>
  </Box>
</Box>

<Box sx={{mt:2}}>
     <Typography sx={{fontSize:22,fontWeight:'600',fontFamily:'sans-serif',color:'#3e3e40',textAlign:'right'}}>
     <CountUp start={0} end={this.state.totalClient}  />
     </Typography>
</Box>
</Box>

<Typography sx={{paddingLeft:1.5,textAlign:'right',paddingRight:1.5,fontSize:14,fontWeight:'500',color:'grey'}}>Total clients</Typography>


</Paper>
  </Grid>


  <Grid item xs={12} sm={6} md={3}>
  <Paper  sx={{height:100,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5,display:'flex',justifyContent:'space-between'}}>
<Box sx={{width:'100%',height:45}}>
  <Box sx={{height:45,width:45,backgroundColor:'#fff0d3',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<TaskAltIcon sx={{height:35,width:35,color:'#ffb621'}}/>
  </Box>
</Box>
<Box sx={{mt:2}}>
     <Typography sx={{fontSize:20,fontWeight:'600',fontFamily:'sans-serif',color:'#3e3e40',textAlign:'right'}}>
     <CountUp start={0} end={this.state.totalCampaign}  />
     </Typography>
</Box>
</Box>
<Typography sx={{paddingLeft:1.5,textAlign:'right',paddingRight:1.5,fontSize:14,fontWeight:'500',color:'grey'}}>Total Campaign</Typography>
</Paper>
  </Grid>

<Grid item xs={12} sm={6} md={3}>
  <Paper  sx={{height:100,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5,display:'flex',justifyContent:'space-between'}}>
<Box sx={{width:'100%',height:45}}>
  <Box sx={{height:45,width:45,backgroundColor:'#d4e3ed ',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<AttachMoneyIcon sx={{height:35,width:35,color:'#05507a'}}/>
  </Box>
</Box>
<Box sx={{mt:2}}>
     <Typography sx={{fontSize:20,fontWeight:'600',fontFamily:'sans-serif',color:'#3e3e40',textAlign:'right'}}>$<CountUp start={0} end={this.state.totalInvoice - this.state.total_discount}  /></Typography>
</Box>
</Box>
<Typography sx={{paddingLeft:1.5,textAlign:'right',paddingRight:1.5,fontSize:14,fontWeight:'500',color:'grey'}}>Invoice</Typography>
</Paper>
  </Grid>

  
  <Grid item xs={12} sm={6} md={3}>
  <Paper  sx={{height:100,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5,display:'flex',justifyContent:'space-between'}}>
<Box sx={{width:'100%',height:45}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ffd7e4',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<AttachMoneyIcon sx={{height:35,width:35,color:'#fe3879'}}/>
  </Box>
</Box>
<Box sx={{mt:2}}>
     <Typography sx={{fontSize:20,fontWeight:'600',fontFamily:'sans-serif',color:'#3e3e40',textAlign:'right'}}>$<CountUp start={0} end={this.state.totalPayment}  /></Typography>
</Box>
</Box>
<Typography sx={{paddingLeft:1.5,textAlign:'right',paddingRight:1.5,fontSize:14,fontWeight:'500',color:'grey'}}>Payment</Typography>
</Paper>
  </Grid>


  
</Grid>











<Grid container spacing={2}>
<Grid item xs={12} sm={12} md={6}>
<Box sx={{height:290,width:'100%',mt:{xs:1,sm:1,md:2}}}>
<Paper sx={{height:'100%'}}>
<Box sx={{marginLeft:3,marginRight:3,paddingTop:4}}>



<Grid container>
<Grid  item xs={10}>
  <Typography sx={{fontSize:15,fontWeight:'550',padding:0.5,color:'#848383',fontFamily:'sans-serif'}}>Pending invoice</Typography>
<LinearProgress
                variant="determinate"
                value={ this.state.PendingInvoice/this.state.total_invoice_counts * 100 }
                sx={{
                  height: 6,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#ff4000",
                    borderRadius: "10px",
                  },
                }}
              />
   <Typography sx={{fontSize:12,color:'grey',padding:0.5,fontFamily:'sans-serif',color:'#c6c6c6'}}>{Math.round(this.state.PendingInvoice/this.state.total_invoice_counts * 100)}% of total</Typography>            
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:22,fontWeight:'700',mt:1.5}}>{this.state.PendingInvoice}</Typography>
</Grid>
</Grid>


<Grid container>
<Grid  item xs={10}>
  <Typography sx={{fontSize:15,fontWeight:'550',padding:0.5,color:'#848383',fontFamily:'sans-serif'}}>Partially paid invoice</Typography>
<LinearProgress
                variant="determinate"
                value={  this.state.partiallyPaidInvoice/this.state.total_invoice_counts * 100 }
                sx={{
                  height: 6,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#ffff00",
                    borderRadius: "10px",
                  },
                }}
              />
   <Typography sx={{fontSize:12,color:'grey',padding:0.5,fontFamily:'sans-serif',color:'#c6c6c6'}}>{Math.round(this.state.partiallyPaidInvoice/this.state.total_invoice_counts * 100)}% of total</Typography>            
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:22,fontWeight:'700',mt:1.5}}>{this.state.partiallyPaidInvoice}</Typography>
</Grid>
</Grid>


<Grid container>
<Grid  item xs={10}>
  <Typography sx={{fontSize:15,fontWeight:'550',padding:0.5,color:'#848383',fontFamily:'sans-serif'}}>Canceled invoice</Typography>
<LinearProgress
                variant="determinate"
                value={this.state.CanceledInvoice/this.state.total_invoice_counts * 100}
                sx={{
                  height: 6,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#660000",
                    borderRadius: "10px",
                  },
                }}
              />
   <Typography sx={{fontSize:12,color:'grey',padding:0.5,fontFamily:'sans-serif',color:'#c6c6c6'}}>{Math.round(this.state.CanceledInvoice/this.state.total_invoice_counts * 100)}% of total</Typography>            
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:22,fontWeight:'700',mt:1.5}}>{this.state.CanceledInvoice}</Typography>
</Grid>
</Grid>












</Box>
</Paper>
</Box>
</Grid>
<Grid item xs={12} sm={12} md={6}>
<Box  sx={{height:290,width:'100%',mt:{xs:0,sm:0,md:2}}}>
<Paper sx={{height:'30%'}}>

<Box sx={{marginLeft:3,marginRight:3,paddingTop:1}}>
<Grid container>
<Grid  item xs={10}>
  <Typography sx={{fontSize:15,fontWeight:'550',padding:0.5,color:'#848383',fontFamily:'sans-serif'}}>FullyPaid Invoice</Typography>
<LinearProgress
                variant="determinate"
                value={this.state.fullyPaidInvoice/this.state.total_invoice_counts * 100}
                sx={{
                  height: 6,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#00b33c",
                    borderRadius: "10px",
                  },
                }}
              />
   <Typography sx={{fontSize:12,color:'grey',padding:0.5,fontFamily:'sans-serif',color:'#c6c6c6'}}>{Math.round(this.state.fullyPaidInvoice/this.state.total_invoice_counts * 100)}% of total</Typography>            
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:22,fontWeight:'700',mt:1}}>{this.state.fullyPaidInvoice}</Typography>
</Grid>
</Grid>
</Box>

</Paper>
<Paper sx={{height:'66%',mt:'2%'}}>
<Box sx={{marginLeft:3,marginRight:3}}>
<Typography sx={{fontSize:17,fontWeight:'600',paddingTop:1,color:'#7f8da1',paddingBottom:1}}>Campaign</Typography>


<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Live Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>{this.state.liveCampaign}</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Open Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>{this.state.openCampaign}</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Completed Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>{this.state.completedCampaign}</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Canceled Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>{this.state.cancelCampaign}</Typography>
</Grid>
</Grid>

<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Pending Campaign & Hold Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>{this.state.pendingCampaign} & {this.state.holdCampaign}</Typography>
</Grid>
</Grid>




</Box>
</Paper>
</Box>
</Grid>
</Grid>



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


</Box>
      </div>
    )
  }
}

export default Overview