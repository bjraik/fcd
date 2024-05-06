import React, { Component } from 'react'
import bg from '../../../src/img/bgimg.svg'
import { Box,Divider,Paper,Typography ,TextField,MenuItem,Grid} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import Chart from 'react-apexcharts'
import CountUp from 'react-countup';
import AdjustIcon from '@mui/icons-material/Adjust';
import base from '../../base'

export class Billing extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      x_axis_data  : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
      y_axis_data : [],
      data_by : 'Monthly',
 

      ///// grapgh data

      
 



  /////////// grapgh section
    client_list_with_invoice_details : [],
   client_with_monthly_invoice_data : [],
 
   }
  }


  componentDidMount(){
///// retriving data for   
fetch(`${base.base_url}/allAnalyticalDataForAdminBiilingForAdmin`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'post',
 }).then((res)=>{return res.json()}).then(async(result)=>{

this.setState({
  client_list_with_invoice_details : result.client_list_with_invoice_details,
  client_with_monthly_invoice_data : result.client_with_monthly_invoice_data,
})

 })


  }


  render() {


let monthly_invoice_data = [];


for (let ss = 0; ss < this.state.client_with_monthly_invoice_data.length; ss++) {
  monthly_invoice_data.push({
    name:this.state.client_with_monthly_invoice_data[ss].client_name,
    type:'column',
    data : this.state.client_with_monthly_invoice_data[ss].monthly_invoice
   })
}

  
    return (
      <div>
      <Box>




      <Paper sx={{minHeight:20,width:'100%'}}>
       <Typography sx={{fontSize:15,fontWeight:'bold',padding:1,pl:2,color:'#717171'}}>Billing Till Date</Typography>
       <Divider/>

        <br/>



       <Box>
          
          

          
{ this.state.client_list_with_invoice_details.map((s)=>(
// <CountUp start={0} end={row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)  } />

<Grid container spacing={2}>
<Grid item xs={6} sm={3}>
<Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center'}}>
<AdjustIcon sx={{height:16,width:16,paddingLeft:2,color:'#0390fb'}}/>
          <Typography sx={{fontSize:12,fontWeight:'600',padding:1,pl:2,color:'#717171',textTransform:'uppercase'}}>{s.client_name}</Typography>
</Box>
</Grid>
<Grid item xs={1}>
<Typography sx={{fontSize:15,fontWeight:'600',padding:1,pl:2,color:'#0088cc',ml:2,display:'flex'}}>$   <CountUp start={0} end={s.invoice - s.discount} /></Typography>
</Grid>
</Grid>
   ))
   
}

         


       </Box>

      







      </Paper>






      <Paper sx={{minHeight:300,width:'100%',mt:1}}>
       <Typography sx={{fontSize:15,fontWeight:'bold',padding:1,pl:2,color:'#717171'}}>Billing Graph</Typography>
       <Divider/>

       <Box sx={{display:'flex',flexDirection:'row',p:1}}>
<TextField
name='data_by'
onChange={(e)=>{this.setState({data_by:e.target.value})}}
value={this.state.data_by}
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

  x_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
  y_axis_data:[],

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
  labels: this.state.x_axis_data,
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
  
   
series={monthly_invoice_data} type="line" height={230} />


      </Paper>


















</Box>
      </div>
    )
  }
}

export default Billing