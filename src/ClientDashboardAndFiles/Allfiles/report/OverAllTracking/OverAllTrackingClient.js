import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../../Appheader'
import Chart from 'react-apexcharts'
import { Sidebarc } from '../../../Sidebar'
import { Button, Input, Paper, Typography ,Grid} from '@mui/material'
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
import base from '../../../../base'
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





const drawerWidth = 240;

export class OverAllTrackingClient extends Component {


constructor(props) {
  super(props)

  this.state = {

    credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),

    is_loader_open_circle  : false ,

    total_campaign : 0,
    total_leads : 0,
    total_lead_received : 0,
    total_spend : 0,
 
    totalPayment : 0,
    totalInvoice  : 0,
    total_discount : 0,






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
  this.handleChange = this.handleChange.bind(this)
}


handleChange = (e)=>{
    this.setState({[e.target.name]:e.target.value})
}



componentDidMount(){
  this.setState({is_loader_open_circle:true},()=>{

  fetch(`${base.base_url}/allDataTrackingForClientSideOverAll`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id : this.state.credential_type.client_id
    })
   }).then((res)=>{return res.json()}).then(async(ss)=>{
  
  this.setState({
    
    total_campaign : ss.total_campaign,
    total_leads : ss.total_leads,
    total_lead_received : ss.total_lead_received,
    total_spend : ss.total_spend,
    totalPayment : ss.totalPayment,
    totalInvoice  : ss.totalInvoice,
    total_discount : ss.total_discount,

  })
    
  
   })
  

/////// gettting data for first graph
 
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
      is_loader_open_circle:false,
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

}









  render() {
    return (
      <div>

<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Overall Tracking</Typography>




<Grid container spacing={{xs:1,sm:2}}>
<Grid item xs={12} sm={6} md={3}>


<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#00a3ff'}}>

<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<ExploreIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Campaign</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}> <CountUp start={0} end={this.state.total_campaign}  /></Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#28176f'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<PaidIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Leads</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}> <CountUp start={0} end={this.state.total_leads}  /></Typography>

</Paper>
</Grid>


<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#28176f'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<PaidIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Received Leads</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}><CountUp start={0} end={this.state.total_lead_received}  /></Typography>

</Paper>
</Grid>


<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#28176f'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<PaidIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Due Leads</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}> <CountUp start={0} end={this.state.total_leads  - this.state.total_lead_received}  /></Typography>

</Paper>
</Grid>



<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#28176f'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<PaidIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Spend</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$ <CountUp start={0} end={this.state.total_spend}  /></Typography>

</Paper>
</Grid>



<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#fe964a'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<DescriptionIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Billed</Typography>
</Box>
<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$<CountUp start={0} end={this.state.totalInvoice}  /></Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#9a5252'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<AccountBalanceWalletIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Due Amount</Typography>
</Box>
<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$ <CountUp start={0} end={this.state.totalInvoice - this.state.totalPayment}  /></Typography>
</Paper>
</Grid>
</Grid>






<Box sx={{width:'100%',minHeight:300}}>

<Grid container sx={{mt:0.2}} spacing={1}>
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





<Grid container sx={{mt:0.2}} spacing={1}>
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
          return "$" + y.toFixed(0);
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
} type="line" height={230} />



</Paper>
</Box>
</Grid>
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
      stops: [0, 100, 100, 100]
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
          return  "$" + y.toFixed(0);
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
} type="line" height={230} />

</Paper>
</Box>
</Grid>
</Grid>






</Box>

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

export default OverAllTrackingClient







