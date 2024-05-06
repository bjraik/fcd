import React, { Component } from 'react'
import bg from '../../../src/img/bgimg.svg'
import { Box,Divider,Paper,Typography ,TextField,MenuItem,Grid} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import Chart from 'react-apexcharts'
import CountUp from 'react-countup';
import AdjustIcon from '@mui/icons-material/Adjust';
export class Manager_allocation extends Component {

constructor(props) {
  super(props)

  this.state = {
     x_axis_data  : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
     y_axis_data : [],
     data_by : 'Monthly',
  }
}








  render() {



let monthly_allocation  = [];

for (let j = 0; j < this.props.monthly_allocation.length?this.props.monthly_allocation.length:0; j++) {

monthly_allocation.push({
  name:this.props.monthly_allocation[j].campaign_manager_name,
  type:'column',
  data : this.props.monthly_allocation[j].allocation
})
  
}



let x_axis_data  = this.props.year_list?this.props.year_list:[]
let y_asis_allocation = []


for (let w = 0; w < this.props.yearly_revenue_and_allocation.length?this.props.yearly_revenue_and_allocation.length:0; w++) {

  let imagenary_arary = []

       for (let l = 0; l < this.props.year_list.length?this.props.year_list.length:0; l++) {
           
        let filtered_data = this.props.yearly_revenue_and_allocation[w].filter((data)=>data._id.year==this.props.year_list[l])

        if(filtered_data.length > 0){
          imagenary_arary.push(filtered_data[0].allocation)
        }else{
          imagenary_arary.push(0)
        }
       }

        y_asis_allocation.push({
        name:this.props.yearly_revenue_and_allocation[w][0].campaign_manager_name,
        type:'column',
        data : imagenary_arary
       })

      
}


//////////////// quaterly allocation 


let  quaterly_allocation = []

for (let ss = 0; ss < this.props.quaterly_allocation.length?this.props.quaterly_allocation.length:0; ss++) {
  quaterly_allocation.push({
    name:this.props.quaterly_allocation[ss].campaign_manager_name,
    type:'column',
    data : this.props.quaterly_allocation[ss].allocation
   })
}


//console.log(quaterly_allocation)


    return (
      <div>
      <Box>


      <Paper sx={{minHeight:0,width:'100%',display:this.props.data?this.props.data.manager_total_allocation_and_revenue?"block":"none":'none'}}>
       <Typography sx={{fontSize:15,fontWeight:'bold',padding:1,pl:2,color:'#717171'}}>Allocation Till Date</Typography>
       <Divider/>
       <Box>
          

{this.props.data?this.props.data.manager_total_allocation_and_revenue?this.props.data.manager_total_allocation_and_revenue.map((s)=>(

<Grid container spacing={2}>
<Grid item xs={6} sm={3}>
<Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center'}}>
<AdjustIcon sx={{height:16,width:16,paddingLeft:2,color:'#0390fb'}}/>
          <Typography sx={{fontSize:12,fontWeight:'600',padding:1,pl:2,color:'#717171',textTransform:'uppercase'}}>{s.campaign_manager_name}</Typography>
</Box>
</Grid>
<Grid item xs={1}>
<Typography sx={{fontSize:15,fontWeight:'600',padding:1,pl:2,color:'#0088cc',ml:2,display:'flex'}}><CountUp start={0} end={s.total_allocation} /></Typography>
</Grid>
</Grid>


   )):0:0
   
}
        

       </Box>
      </Paper>



      <Paper sx={{minHeight:300,width:'100%',mt:1}}>
       <Typography sx={{fontSize:15,fontWeight:'bold',padding:1,pl:2,color:'#717171'}}>Allocation Graph</Typography>
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
  ['Monthly','Quaterly','Yearly'].map((d)=>(
<MenuItem id={d} value={d} sx={{fontSize:12,fontWeight:'bold'}}

onClick={()=>{
if(d=="Monthly"){

this.setState({
  data_by:'Monthly',
  x_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
  y_axis_data: monthly_allocation,
})

}

if(d=="Quaterly"){
  this.setState({
    data_by:'Quaterly',
    x_axis_data : ['Q1','Q2','Q3','Q4'],
    y_axis_data: quaterly_allocation,
  
  })
  }

if(d=='Yearly'){
  this.setState({
    data_by:'Yearly',
    x_axis_data : x_axis_data,
    y_axis_data: y_asis_allocation,
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
      text: 'ALLOCATION',
    },
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " ALLOCATION";
        }
        return y;
  
      }
    }
  }
}
}
  
   
series={this.state.data_by=="Monthly"?monthly_allocation:this.state.y_axis_data} type="line" height={250} />


      </Paper>

</Box>
      </div>
    )
  }
}

export default Manager_allocation