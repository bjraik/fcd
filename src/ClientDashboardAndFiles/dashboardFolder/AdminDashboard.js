import React, { Component } from 'react'


import { AppBar, Box, Container, MenuItem,Divider,CircularProgress,Backdrop, Grid, Paper, Typography,LinearProgress ,TextField, Button,Table,TableCell,TableContainer,TableRow,TableBody,TableHead} from '@mui/material'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Chart from 'react-apexcharts'
import moment from 'moment'
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { ThreeCircles } from  'react-loader-spinner'
import PaidIcon from '@mui/icons-material/Paid';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CountUp from 'react-countup';
import base from '../../base'
const drawerWidth = 240;



export class AdminDashboard extends Component {
constructor(props) {
  super(props)

  this.state = {
 is_loader_open:false,



 campaign_manager_counts : 0,
 total_required_leads : 0,
 total_spend : 0,


 total_campaign : 0,
 live_campaign : 0,
 open_campaign : 0,
 canceled_campaign : 0,
 completed_campaign : 0,
 pending_campaign  :0 ,
 hold_campaign : 0,



 totalPayment:0,
totalInvoice :0,    /// this total  bill to pay to client
total_discount : 0,


PendingInvoice : 0,
fullyPaidInvoice : 0,
overDueInvoice : 0,
partiallyPaidInvoice :0,
CanceledInvoice : 0,
overDueInvoice  :0,
total_invoice_counts: 0,   /// this is for how many invoice are there 


////////// total calculation of price via invoice status wise /////////////
 //// pending  section
  pending_invoice_payment_amount : 0,
  pending_invoice_invoice_amount : 0,
  pending_invoice_discount_amount : 0,

//// partially paid
 partially_paid_payment_amount : 0,
 partially_paid_invoice_amount : 0,
 partially_paid_discount_amount : 0,

//// fully  paid
 fully_paid_payment_amount : 0,
 fully_paid_invoice_amount : 0,
 fully_paid_discount_amount : 0,

///// cancel paid
 cancel_paid_payment_amount : 0,
 cancel_paid_invoice_amount : 0,
 cancel_paid_discount_amount : 0,



 departmentData : JSON.parse(sessionStorage.getItem('AllClientData')),
 credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
 permissiondata : JSON.parse(sessionStorage.getItem('permission')),
 payload : JSON.parse(sessionStorage.getItem('payload')),




/////// below graph data /////////////

////////////////////////// first graph data wil display here ///////////////////
yearly_Data_date : [],
yearly_Data_value : [],

daily_Data_date : [],
daily_Data_value : [],


monthlyData : [],
quarterlyData : [],


quarterBase :['Q1','Q2','Q3','Q4'],
monthlyBase: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

x_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],    ///// sifting as required
y_axis_data : [],    ///// sifting as required
         
fist_graph_value : 'Monthly',



//////////////////// second graph data campaign vs allocation ////////////////////


x_second_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
y_second_axis_data : [],    ///// sifting as required
second_graph_value : 'Monthly',


second_graph_year_date :[],
second_graph_year_data : [],

second_graph_quaterly_data : [],
second_graph_monthly_data : [],



////////////////// invoice graph data ///////////////


x_third_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
y_third_axis_data : [],    
third_graph_value : 'Monthly',

third_graph_year_date :[],
third_graph_year_data : [],

third_graph_quaterly_data : [],
third_graph_monthly_data : [],


/////////////////////// campaign vs revenue graph //////////

x_foutrh_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
y_foutrh_axis_data : [],    
foutrh_graph_value : 'Monthly',

foutrh_graph_year_date :[],
foutrh_graph_year_data : [],

foutrh_graph_quaterly_data : [],
foutrh_graph_monthly_data : [],











  
  
  }
}



componentDidMount(){
  
this.setState({is_loader_open:true},()=>{

fetch(`${base.base_url}/client_dashboard_data_details_invoice_details`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
  client_id : this.state.credential_type.client_id
  })
}).then((res)=>{return res.json()}).then((result)=>{

this.setState({
  totalPayment:result.totalPayment_amt,
  totalInvoice : result.totalInvoice_amt,
  total_discount:result.total_discount_amt,

 

  PendingInvoice : result.PendingInvoice_count,
  fullyPaidInvoice : result.fullyPaidInvoice_count,
  partiallyPaidInvoice :result.partiallyPaidInvoice_count,
  CanceledInvoice : result.CanceledInvoice_count,

  total_invoice_counts: result.total_invoice_count,


////////////// invoice calculation via statsus wise //////////


   //// pending  section
   pending_invoice_payment_amount : result.pending_invoice_payment_amount, 
   pending_invoice_invoice_amount : result.pending_invoice_invoice_amount,
   pending_invoice_discount_amount : result.pending_invoice_discount_amount,

  //// partially paid
   partially_paid_payment_amount : result.partially_paid_payment_amount,
   partially_paid_invoice_amount : result.partially_paid_invoice_amount,
    partially_paid_discount_amount : result.partially_paid_discount_amount,

   //// fully  paid
   fully_paid_payment_amount : result.fully_paid_payment_amount,
   fully_paid_invoice_amount : result.fully_paid_invoice_amount,
   fully_paid_discount_amount : result.fully_paid_discount_amount,
   ///// cancel paid
   cancel_paid_payment_amount : result.cancel_paid_payment_amount,
   cancel_paid_invoice_amount : result.cancel_paid_invoice_amount,
   cancel_paid_discount_amount : result.cancel_paid_discount_amount,
})
})

  fetch(`${base.base_url}/client_dashboard_data_details`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
    client_id : this.state.credential_type.client_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{

   
this.setState({
   is_loader_open :false,
  campaign_manager_counts : result.total_camapign_manager,
  total_required_leads : result.total_required_lead,
  total_spend : result.total_revenue,
  total_campaign : result.totalCampaign,

  live_campaign : result.live_campaign_count,
  open_campaign : result.open_campaing_count,
  canceled_campaign : result.canceled_campaign_count,
  completed_campaign : result.completed_campaign_count,
  pending_campaign  :  result.pending_campaign_count,
  hold_campaign : result.hold_campaign_count,

})
    
  }).then(()=>{

    
    fetch(`${base.base_url}/allAnalyticsDataForClientCrmAdmin_client_side`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        client_id : this.state.credential_type.client_id
        })
      }).then((response)=>{return response.json()}).then(async(result)=>{
      
   
        this.setState({
          /// camapign count
          monthlyData  : result.monthly_count,
          quarterlyData  : result.quaterly_count,
          y_axis_data  :  result.monthly_count,
  
          /// allocation ///
  
          second_graph_quaterly_data : result.quaterly_allocation,
          second_graph_monthly_data : result.monthly_allocation,
          y_second_axis_data  : result.monthly_allocation,
  
            ////// revenue 
           
            foutrh_graph_quaterly_data : result.quaterly_revenue,
             foutrh_graph_monthly_data : result.monthly_revenue,
             y_foutrh_axis_data  :  result.monthly_revenue
  
  
  
        })
  
        //// camapign count by yearly 
    let date_c = [];
    let data_c = [];
   for (let i = 0; i < result.yearly_count.length; i++) {
  
  date_c.push(result.yearly_count[i].year)
  data_c.push(result.yearly_count[i].no_of_campaigns)
  
   }
   
  this.setState({
  yearly_Data_date :date_c,
  yearly_Data_value : data_c
  })
  ///// allocation count by yearly
    let date_a = [];
    let data_a = [];
   for (let k = 0; k < result.yearly_allocation.length; k++) {
  
  date_a.push(result.yearly_allocation[k].year)
  data_a.push(result.yearly_allocation[k].allocation)
  
   }
  
  
  this.setState({
    second_graph_year_date :date_a,
    second_graph_year_data : data_a
  })
  
   ///// revenue count by yearly
    let date_r = [];
    let data_r = [];
  for (let j = 0; j < result.yearly_revenue.length; j++) {
  
  date_r.push(result.yearly_revenue[j].year)
  data_r.push(result.yearly_revenue[j].revenue)
  
  }
  
  
  this.setState({
    foutrh_graph_year_date :date_r,
    foutrh_graph_year_data : data_r
  })
       

      })
    
  
    
    /////////////////// invoice graph /////////////////
    
    
    fetch(`${base.base_url}/totalinvoiceDataGrapghForClient`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id : this.state.credential_type.client_id
      })
    }).then((response)=>{return response.json()}).then(async(invoice_re_data)=>{
    
  
    this.setState({
     y_third_axis_data : invoice_re_data.monthlyInvoice,
     third_graph_monthly_data : invoice_re_data.monthlyInvoice,
    })
    
    })
    

  })


})



/////////////////////////////// graph routes ///////////////////////


/////// gettting data for first graph
 




}

  render() {
    return (
      <div>


<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},marginLeft:1,fontWeight:'500',color:'#3e3e40'}}>Dashboard</Typography>
<Grid container spacing={{xs:1,sm:2,md:2}}>
  <Grid item xs={12} sm={6} md={3}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL CAMPAIGN</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}> <CountUp start={0} end={this.state.total_campaign}  /></Typography>

<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#fff0d3',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>

<LanguageOutlinedIcon sx={{height:35,width:35,color:'#ffb621'}}/>


  </Box>
</Box>

</Box>
</Paper>
  </Grid>


  <Grid item xs={12} sm={6} md={3}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL LEADS</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}><CountUp start={0} end={this.state.total_required_leads}  /></Typography>
<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ccedff',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LanguageOutlinedIcon sx={{height:35,width:35,color:'#00a3ff'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>


  <Grid item xs={12} sm={6} md={3}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>CAMPAIGN MANAGERS</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}> <CountUp start={0} end={this.state.campaign_manager_counts}  /> </Typography>
<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#d9fff2',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LeaderboardIcon sx={{height:35,width:35,color:'#3deaaf'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>



  <Grid item xs={12} sm={6} md={3}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'bold',color:'#3e3e40'}}>TOTAL SPEND</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>$ <CountUp start={0} end={this.state.total_spend}  /> </Typography>
<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ffd7e4',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<PaidIcon sx={{height:35,width:35,color:'#fe3879'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>
</Grid>



<br/>



<Grid container sx={{display:this.state.credential_type.is_client_user?'none':'flex'}} spacing={1}>
  <Grid item xs={12}  sm={12} md={6}>
<Box sx={{minHeight:250,width:'100%',}}>
<Paper component={Grid} elevation={1} sx={{width:'100%',height:300,backgroundColor:'#fff',display:'flex',flexDirection:{xs:'column',sm:'column'}}}>
<Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',fontSize:15,padding:1.5}}>Campaigns</Typography>
<Divider/>
<Box sx={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>

<Grid container>
<Grid item xs={4}>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
   <Chart
              options={
                {
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "80%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24
                        }
                      },
                      track: {
                        background: "#fff",
                        strokeWidth: "70%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35
                        }
                      },
              
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: -5,
                          show: true,
                          color: "#888",
                          fontSize: "10px"
                        },
                        value: {
                          formatter: function (val) {
                            return val;
                          },
                          color: "#05507a",
                          fontSize: "16px",
                          fontWeight:'800',
                          offsetY: -4,
                          show: true
                        }
                      }
                    }
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#ff7d1e"],
                      inverseColors: true,
                     
                      stops: [0, 100]
                    }
                  },
                  stroke: {
                    lineCap: "round"
                  },
                  labels: ["Live %"]
                }
              }
              series={[Math.round(this.state.total_campaign > 0 ? this.state.live_campaign / this.state.total_campaign  * 100 : 0)]}
              type="radialBar"
              width="160"
            />  
  </Box>

</Grid>

<Grid item xs={4}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
   <Chart
              options={
               {
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "80%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24
                        }
                      },
                      track: {
                        background: "#fff",
                        strokeWidth: "70%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35
                        }
                      },
              
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: -5,
                          show: true,
                          color: "#888",
                          fontSize: "10px"
                        },
                        value: {
                          formatter: function (val) {
                            return val;
                          },
                          color: "#05507a",
                          fontSize: "16px",
                          fontWeight:'800',
                          offsetY: -4,
                          show: true
                        }
                      }
                    }
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#00c6c6"],
                      inverseColors: true,
                     
                      stops: [0, 100]
                    }
                  },
                  stroke: {
                    lineCap: "round"
                  },
                  labels: ["Open %"]
                }
              
              
              }
              series={[Math.round(this.state.total_campaign > 0 ?this.state.open_campaign / this.state.total_campaign * 100 : 0)]}
              type="radialBar"
              width="160"
            />  
  </Box>

</Grid>



<Grid item xs={4}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
   <Chart
              options={
                 {
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "80%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24
                        }
                      },
                      track: {
                        background: "#fff",
                        strokeWidth: "70%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35
                        }
                      },
              
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: -5,
                          show: true,
                          color: "#888",
                          fontSize: "10px"
                        },
                        value: {
                          formatter: function (val) {
                            return val;
                          },
                          color: "#05507a",
                          fontSize: "16px",
                          fontWeight:'800',
                          offsetY: -4,
                          show: true
                        }
                      }
                    }
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#ABE5A1"],
                      inverseColors: true,
                     
                      stops: [0, 100]
                    }
                  },
                  stroke: {
                    lineCap: "round"
                  },
                  labels: ["Completed %"]
                }
              }
              series={[Math.round(this.state.total_campaign > 0 ?this.state.completed_campaign/this.state.total_campaign * 100 : 0)]}
              type="radialBar"
              width="160"
            />  
  </Box>
</Grid>


<Grid item xs={4}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',}}>
   <Chart
              options={
                 {
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "80%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24
                        }
                      },
                      track: {
                        background: "#fff",
                        strokeWidth: "70%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35
                        }
                      },
              
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: -5,
                          show: true,
                          color: "#888",
                          fontSize: "10px"
                        },
                        value: {
                          formatter: function (val) {
                            return val;
                          },
                          color: "#05507a",
                          fontSize: "16px",
                          fontWeight:'800',
                          offsetY: -4,
                          show: true
                        }
                      }
                    }
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#2da802"],
                      inverseColors: true,
                     
                      stops: [0, 100]
                    }
                  },
                  stroke: {
                    lineCap: "round"
                  },
                  labels: ["Cancel %"]
                }
              
              }
              series={[Math.round(this.state.total_campaign > 0 ?this.state.canceled_campaign/this.state.total_campaign * 100 : 0)]}
              type="radialBar"
              width="160"
            />  
  </Box>
</Grid>

{
  ///////  new grapgh
}


<Grid item xs={4}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
   <Chart
              options={
                 {
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "80%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24
                        }
                      },
                      track: {
                        background: "#fff",
                        strokeWidth: "70%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35
                        }
                      },
              
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: -5,
                          show: true,
                          color: "#888",
                          fontSize: "10px"
                        },
                        value: {
                          formatter: function (val) {
                            return val;
                          },
                          color: "#05507a",
                          fontSize: "16px",
                          fontWeight:'800',
                          offsetY: -4,
                          show: true
                        }
                      }
                    }
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#ABE5A1"],
                      inverseColors: true,
                     
                      stops: [0, 100]
                    }
                  },
                  stroke: {
                    lineCap: "round"
                  },
                  labels: ["Hold %"]
                }
              }
              series={[Math.round(this.state.total_campaign > 0 ?this.state.hold_campaign/this.state.total_campaign * 100 : 0)]}
              type="radialBar"
              width="160"
            />  
  </Box>
</Grid>


<Grid item xs={4}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',}}>
   <Chart
              options={
                 {
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "80%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24
                        }
                      },
                      track: {
                        background: "#fff",
                        strokeWidth: "70%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35
                        }
                      },
              
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: -5,
                          show: true,
                          color: "#888",
                          fontSize: "10px"
                        },
                        value: {
                          formatter: function (val) {
                            return val;
                          },
                          color: "#05507a",
                          fontSize: "16px",
                          fontWeight:'800',
                          offsetY: -4,
                          show: true
                        }
                      }
                    }
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#2da802"],
                      inverseColors: true,
                     
                      stops: [0, 100]
                    }
                  },
                  stroke: {
                    lineCap: "round"
                  },
                  labels: ["Pending %"]
                }
              
              }
              series={[Math.round(this.state.total_campaign > 0 ?this.state.pending_campaign/this.state.total_campaign * 100 : 0)]}
              type="radialBar"
              width="160"
            />  
  </Box>
</Grid>





</Grid>


</Box>
</Paper>
</Box>
</Grid>


  
<Grid item xs={12} sm={12} md={6}>
<Box sx={{minHeight:250,width:'100%'}}>

<Paper sx={{width:'100%',minHeight:200}}>
<Box>
  <Typography sx={{fontSize:15,fontWeight:'700',color:'#8e8e93',padding:1.5,marginRight:2}}>Invoice Overview</Typography>
</Box>
<Divider/>
<Box sx={{width:'100%'}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
<Box sx={{minHeight:200,ml:1,mr:1}}>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',padding:1,}}>Fully Paid</Typography>
<LinearProgress
                variant="determinate"
                value={this.state.total_invoice_counts > 0?this.state.fullyPaidInvoice/this.state.total_invoice_counts * 100 : 0}
                sx={{
                  height: 8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#95ce9a",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:14,fontWeight:'600',color:'#8e8e93',padding:1,}}>$<CountUp start={0} end={this.state.fully_paid_invoice_amount - this.state.fully_paid_payment_amount - this.state.fully_paid_discount_amount }  /> Remaining </Typography>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',padding:1}}>Partially Paid</Typography>
<LinearProgress
                variant="determinate"
                value={this.state.total_invoice_counts > 0? this.state.partiallyPaidInvoice/this.state.total_invoice_counts  * 100  :0}
                sx={{
                  height: 8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#3fc3af",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:14,fontWeight:'600',color:'#8e8e93',padding:1,}}>$<CountUp start={0} end={this.state.partially_paid_invoice_amount - this.state.partially_paid_payment_amount - this.state.partially_paid_discount_amount }  /> Remaining </Typography>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',padding:1,}}>Cancel</Typography>
<LinearProgress
                variant="determinate"
                 aria-disabled
                value={this.state.totalInvoice > 0 ?this.state.CanceledInvoice/this.state.total_invoice_counts * 100 : 0}
                sx={{
                  height: 8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f29494",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:14,fontWeight:'600',color:'#8e8e93',padding:1,}}>$<CountUp start={0} end={this.state.cancel_paid_invoice_amount - this.state.cancel_paid_payment_amount - this.state.cancel_paid_discount_amount }  /> Remaining </Typography>

</Box>
  </Grid>
  <Grid item xs={12} sm={6}>
  <Box sx={{minHeight:200,ml:1,mr:1}}>

  <Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',padding:1}}>Pending Invoice</Typography>
<LinearProgress
                variant="determinate"
                value={this.state.total_invoice_counts > 0? this.state.PendingInvoice/this.state.total_invoice_counts * 100 : 0}
                aria-disabled
                sx={{
                  height: 8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#0390fb",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:14,fontWeight:'600',color:'#8e8e93',padding:1,}}>$<CountUp start={0} end={this.state.pending_invoice_invoice_amount - this.state.pending_invoice_payment_amount - this.state.pending_invoice_discount_amount }  /> Remaining </Typography>

<br/>



<Box sx={{padding:1,display:'flex',justifyContent:'space-between'}}>
<Grid container spacing={1}>
  <Grid item xs={6}>
  <Box sx={{}}>
<Typography sx={{fontSize:14,fontWeight:'600',color:'#3d3b3b',padding:0.5,borderBottom:1}}>INVOICE</Typography>
<Typography sx={{fontSize:15,fontWeight:'600',color:'#95ce9a',paddingLeft:0.5,paddingRight:0.5}}>$ <CountUp start={0} end={this.state.totalInvoice - this.state.total_discount}  /></Typography>
</Box>
  </Grid>
  <Grid item xs={6}>

  <Box sx={{}}>
<Typography sx={{fontSize:14,fontWeight:'600',color:'#3d3b3b',padding:0.5,borderBottom:1,mr:1}}>DUE</Typography>
<Typography sx={{fontSize:15,fontWeight:'600',color:'#f29494',paddingLeft:0.5,paddingRight:0.5}}>$ <CountUp start={0} end={this.state.totalInvoice - this.state.total_discount  - this.state.totalPayment}  /></Typography>
</Box>

  </Grid>
  <Grid item xs={6}>
  <Box sx={{}}>
<Typography sx={{fontSize:14,fontWeight:'600',color:'#3d3b3b',padding:0.5,borderBottom:1}}>PAYMENT</Typography>
<Typography sx={{fontSize:15,fontWeight:'600',color:'#1b5889',paddingLeft:0.5,paddingRight:0.5}}>$ <CountUp start={0} end={ this.state.totalPayment}  /></Typography>
</Box>

  </Grid>
  </Grid>
</Box>


</Box>
  </Grid>
</Grid>

</Box>
</Paper>



</Box>
</Grid>
</Grid>







{
  ////// graph and invoice  details /////
}






<Grid container sx={{mt:0.2,display:this.state.credential_type.is_client_user?'none':'flex'}} spacing={1}>
  
<Grid item xs={12} sm={6}>
<Box>
<Paper sx={{height:300,width:'100%'}}>

<Box sx={{display:'flex',flexDirection:'row',ml:1,pt:1}}>
<TextField
name='fist_graph_value'
onChange={(e)=>{this.setState({fist_graph_value:e.target.value})}}
value={this.state.fist_graph_value}
select
InputProps={{sx:{fontSize:12,fontWeight:'700',minWidth:50}}}
size='small'
>
{
  ['Monthly','Quarterly','Yearly'].map((d)=>(
<MenuItem id={d} value={d} sx={{fontSize:12,fontWeight:'bold'}}

onClick={()=>{


if(d=="Monthly"){
this.setState({

  x_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],    ///// sifting as required
  y_axis_data :this.state.monthlyData 

})
}

if(d=='Quarterly'){
  this.setState({

    x_axis_data : ['Q1', 'Q2', 'Q3', 'Q4'] ,  ///// sifting as required
    y_axis_data : this.state.quarterlyData,
  
  })
}

if(d=='Yearly'){
  this.setState({

    x_axis_data : this.state.yearly_Data_date ,  ///// sifting as required
    y_axis_data : this.state.yearly_Data_value,

   })
}


}}


>
  {d}
</MenuItem>
  ))
}
</TextField>
</Box>

<Chart 
options={
  {
   chart: {
     height: 350,
     type: 'line',
     stacked: false,
    
       toolbar: {
         show: false
       
     },
   },
   stroke: {
     width: [0, 2, 5],
     curve: 'smooth'
   },
   plotOptions: {
     bar: {
       columnWidth: '50%'
     }
   },
   
   fill: {
     opacity: [0.85, 0.25, 1],
     gradient: {
       inverseColors: false,
       shade: 'light',
       type: "vertical",
       opacityFrom: 0.85,
       opacityTo: 0.55,
       stops: [0, 100, 100, 100]
     }
   },
   labels: this.state.x_axis_data,
   markers: {
     size: 0
   },
   xaxis: {
     type: 'text'
   },
   yaxis: {
     title: {
       text: 'TOTAL CAMPAIGN',
     },
     min: 0
   },
   tooltip: {
     shared: true,
     intersect: false,
     y: {
       formatter: function (y) {
         if (typeof y !== "undefined") {
           return y.toFixed(0) + " Campaigns";
         }
         return y;
   
       }
     }
   }
 }
 }

 series={
  [{
    name: 'CAMPAIGN',
    type: 'column',
    data: this.state.y_axis_data
  }]
  } type="line" height={260} /> 


</Paper>
</Box>
</Grid>
<Grid item xs={12} sm={6}>
<Box>
<Paper sx={{height:300,width:'100%'}}>

<TextField
name='second_graph_value'
onChange={(e)=>{this.setState({second_graph_value:e.target.value})}}
value={this.state.second_graph_value}
select
InputProps={{sx:{fontSize:12,fontWeight:'700',minWidth:50,ml:2,mt:1}}}
size='small'
>
{
  ['Monthly','Quarterly','Yearly'].map((d)=>(
<MenuItem id={d} value={d} sx={{fontSize:12,fontWeight:'bold'}}

onClick={()=>{
if(d=="Monthly"){
this.setState({

x_second_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
y_second_axis_data : this.state.second_graph_monthly_data,    ///// sifting as required

})
}

if(d=='Quarterly'){
  this.setState({

    x_second_axis_data : ['Q1', 'Q2', 'Q3', 'Q4'] ,
    y_second_axis_data : this.state.second_graph_quaterly_data,    ///// sifting as required
    
  
  })
}

if(d=='Yearly'){
  this.setState({

    x_second_axis_data : this.state.second_graph_year_date ,
    y_second_axis_data : this.state.second_graph_year_data,    ///// sifting as required
    

   })
}


}}


>
  {d}
</MenuItem>
  ))
}
</TextField>

<Chart options={
 {
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
   
      toolbar: {
        show: false
      
    },
  },
  stroke: {
    width: [0, 2, 5],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  
  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: this.state.x_second_axis_data,
  markers: {
    size: 0
  },
  xaxis: {
    type: 'text'
  },
  yaxis: {
    title: {
      text: 'TOTAL ALLOCATION',
    },
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " Allocation";
        }
        return y;
  
      }
    }
  }
}
}
  
 
   
series={
[{
  name: 'CAMPAIGN',
  type: 'column',
  data: this.state.y_second_axis_data
}]
} type="line" height={260} />



</Paper>
</Box>
</Grid>


</Grid>





<Grid container sx={{mt:0.2,display:this.state.credential_type.is_client_user?'none':'flex'}} spacing={1}>
  <Grid item xs={12} sm={6}>
<Box>
<Paper sx={{height:270,width:'100%'}}>

<Box sx={{display:'flex',flexDirection:'row',p:1}}>
<TextField
name='foutrh_graph_value'
onChange={(e)=>{this.setState({foutrh_graph_value:e.target.value})}}
value={this.state.foutrh_graph_value}
select
InputProps={{sx:{fontSize:12,fontWeight:'700',minWidth:50}}}
size='small'
>
{
  ['Monthly','Quarterly','Yearly'].map((d)=>(
<MenuItem id={d} value={d} sx={{fontSize:12,fontWeight:'bold'}}

onClick={()=>{

if(d=="Monthly"){
this.setState({

  x_foutrh_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
  y_foutrh_axis_data : this.state.foutrh_graph_monthly_data,    ///// sifting as required
  

})
}

if(d=='Quarterly'){
  this.setState({

    x_foutrh_axis_data : ['Q1','Q2','Q3','Q4'],
    y_foutrh_axis_data : this.state.foutrh_graph_quaterly_data,    ///// sifting as required
    
    
  })
}

if(d=='Yearly'){
  this.setState({

    x_foutrh_axis_data : this.state.foutrh_graph_year_date,
    y_foutrh_axis_data : this.state.foutrh_graph_year_data,    ///// sifting as required
    

   })
}


}}


>
  {d}
</MenuItem>
  ))
}
</TextField>
</Box>


<Chart options={
 {
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
   
      toolbar: {
        show: false
      
    },
  },
  stroke: {
    width: [0, 2, 5],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  
  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100]
    }
  },
  labels: this.state.x_foutrh_axis_data,
  markers: {
    size: 0
  },
  xaxis: {
    type: 'text'
  },
  yaxis: {
    title: {
      text: 'TOTAL SPEND',
    },
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return  "$" + y.toFixed(0) ;
        }
        return y;
  
      }
    }
  }
}
}
  
 
   
series={
[{
  name: 'Revenue',
  type: 'column',
  data: this.state.y_foutrh_axis_data
}]
} type="line" height={210} />

</Paper>
</Box>
</Grid>
<Grid item xs={12} sm={6}>
<Box>
<Paper sx={{height:270,width:'100%'}}>

<Box sx={{display:'flex',flexDirection:'row',p:1}}>
<TextField
name='third_graph_value'
onChange={(e)=>{this.setState({third_graph_value:e.target.value})}}
value={this.state.third_graph_value}
select
InputProps={{sx:{fontSize:12,fontWeight:'700',minWidth:50}}}
size='small'
>
{
  ['Monthly'].map((d)=>(
<MenuItem id={d} value={d} sx={{fontSize:12,fontWeight:'bold'}}

onClick={()=>{

if(d=="Monthly"){
this.setState({

  x_third_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
  y_third_axis_data : this.state.third_graph_monthly_data,    ///// sifting as required
  
 

})
}






}}


>
  {d}
</MenuItem>
  ))
}
</TextField>
</Box>


<Chart options={
 {
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
   
      toolbar: {
        show: false
      
    },
  },
  stroke: {
    width: [0, 2, 5],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  
  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: this.state.x_third_axis_data,
  markers: {
    size: 0
  },
  xaxis: {
    type: 'text'
  },
  yaxis: {
    title: {
      text: 'BILLING',
    },
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return "$" + y.toFixed(0) ;
        }
        return y;
  
      }
    }
  }
}
}
  
 
   
series={
[{
  name: 'Amount',
  type: 'column',
  data: this.state.y_third_axis_data
}
]
} type="line" height={210} />



</Paper>
</Box>
</Grid>

</Grid>


<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_loader_open}
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

export default AdminDashboard