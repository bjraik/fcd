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



export class ContactUserDashboard extends Component {

constructor(props) {
  super(props)

  this.state = {

    is_loader_open  :false,
    
    total_campaign : 0,

    live_campaign : 0,
    total_required_leads : 0,
    total_uploaded_leads  : 0,


    cancel_campaign : 0,
    pending_campaign :0,
    open_campaign : 0,
    completed_campaign :0,
    hold_campaign : 0,


    departmentData : JSON.parse(sessionStorage.getItem('AllClientData')),
    credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
    permissiondata : JSON.parse(sessionStorage.getItem('permission')),
    payload : JSON.parse(sessionStorage.getItem('payload')),





/////////////////// all grapgh data handling section /////////////////////////

////////////////////////// first graph data wil display here ///////////////////
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

this.setState({is_loder_open:true},()=>{

  fetch(`${base.base_url}/client_contact_dasboard_details`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
    client_id : this.state.payload.client_id,
    campaign_manager_id : this.state.payload.contact_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
   
this.setState({
  total_campaign : result.total_campaign,
  total_required_leads : result.total_required_leads,
  total_uploaded_leads  : result.total_uploaded_leads,

  live_campaign : result.live_campaign,

   cancel_campaign : result.cancel_campaign,
   pending_campaign : result.pending_campaign,
   open_campaign : result.open_campaign,
   completed_campaign : result.completed_campaign,
   hold_campaign : result.hold_campaign

})
    
  }).then(()=>{

/// allAnalyticsDataForSingleContact_crm_single_contact


    fetch(`${base.base_url}/allAnalyticsDataForSingleContact_crm_single_contact`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
     method:'post',
     body:JSON.stringify({
      client_id : this.state.credential_type.client_id,
      campaign_manager_id : this.state.payload.contact_id
      })
    }).then((response)=>{return response.json()}).then(async(result)=>{
    
      this.setState({
        /// camapign count
        is_loder_open:false,
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
    
  })
 
})
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
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}><CountUp start={0} end={this.state.total_campaign}  /></Typography>

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
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>ACTIVE CAMPAIGN</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}><CountUp start={0} end={this.state.live_campaign}  /></Typography>
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
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>REQUIRED LEADS</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}><CountUp start={0} end={this.state.total_required_leads}  /></Typography>
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
<Typography sx={{fontSize:12,fontWeight:'bold',color:'#3e3e40'}}>RECEIVED LEADS</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}><CountUp start={0} end={this.state.total_uploaded_leads}  /></Typography>
<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ffd7e4',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<PaidIcon sx={{height:35,width:35,color:'#fe3879'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>
</Grid>










<Grid container sx={{mt:1}} spacing={1}>


{
  //// all campaign  details
}


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
              series={[Math.round(this.state.total_campaign > 0 ?this.state.cancel_campaign/this.state.total_campaign * 100 : 0)]}
              type="radialBar"
              width="160"
            />  
  </Box>
</Grid>


{
  //// newly added graph
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





<Grid item xs={12}  sm={12} md={6}>
<Box >
<Paper sx={{width:'100%',height:300}}>
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



<Grid item xs={12}  sm={12} md={6}>
<Box >
<Paper sx={{width:'100%',height:300}}>
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


<Grid item xs={12}  sm={12} md={6}>
<Box >
<Paper sx={{width:'100%',height:300}}>
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
  name: 'Revenue',
  type: 'column',
  data: this.state.y_foutrh_axis_data
}]
} type="line" height={260} />

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

export default ContactUserDashboard