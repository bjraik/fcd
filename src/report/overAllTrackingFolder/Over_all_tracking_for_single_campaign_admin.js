import React, { Component } from 'react'

import Appheader, { Appheaderc } from '../../Appheader'

import { Sidebarc } from '../../Sidebar'
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
import { useNavigate,useLocation,useMatch, useParams } from 'react-router-dom';
import Papa from 'papaparse'
import Chart from 'react-apexcharts'
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
import base from '../../base'




const drawerWidth = 240;

export class Over_all_tracking_for_single_campaign_admin extends Component {


constructor(props) {
  super(props)

  this.state = {




campaignData : {},




///////////////////////////////


x_second_axis_data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
y_second_axis_data : [],    ///// sifting as required
second_graph_value : 'Monthly',


second_graph_year_date :[],
second_graph_year_data : [],

second_graph_quaterly_data : [],
second_graph_monthly_data : [],





  }
  this.handleChange = this.handleChange.bind(this)
}


handleChange = (e)=>{
    this.setState({[e.target.name]:e.target.value})
}



componentDidMount(){


       fetch(`${base.base_url}/getSingleCampaignDetailsDataReportAdmin`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
            campaign_id : this.props.param.cam_id.replace(/:/g,''),
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({
            campaignData  : result.campaing_data
        })
       
      })

     
      




      fetch(`${base.base_url}/leadGrapStaticsDataFound`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          campaign_id :  this.props.param.cam_id.replace(/:/g,''),
          })
        }).then((response)=>{return response.json()}).then(async(camp_allocation)=>{
        
        let  second_graph_year_date  = []
        let second_graph_year_data  =  []
        
        for (let z = 0; z < camp_allocation.yearlyLeads.length; z++) {
        
        second_graph_year_date.push(camp_allocation.yearlyLeads[z].data)
        second_graph_year_data.push(camp_allocation.yearlyLeads[z].lead_count)
        }
        
        
        this.setState({
        second_graph_year_date:second_graph_year_date,
        second_graph_year_data : second_graph_year_data,
        second_graph_quaterly_data : camp_allocation.quaterlyLead,
        y_second_axis_data : camp_allocation.monthlyLeads,
        second_graph_monthly_data : camp_allocation.monthlyLeads,
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
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Camapign Tracking</Typography>


<Grid container spacing={{xs:1,sm:2}}>
<Grid item xs={12} sm={6} md={6}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#28176f'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<PaidIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Spend</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$ <CountUp start={0} end={parseInt(this.state.campaignData.cost_per_lead) * parseInt(this.state.campaignData.lead_target)}  /></Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={6}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#fe964a'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<DescriptionIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Billed</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$ <CountUp start={0} end={parseInt(this.state.campaignData.cost_per_lead) * this.state.campaignData.no_of_leads_get_paid}  /></Typography>

</Paper>
</Grid>
</Grid>





<Grid container  sx={{pt:1}} spacing={{xs:1,sm:2}}>
<Grid item xs={12} sm={4} md={4}>
<Paper sx={{height:250,backgroundColor:'#fff'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<Typography sx={{fontWeight:'700',fontSize:14,marginLeft:0.8,color:'#444444',ml:1}}>Campaign Progress</Typography>
</Box>
<Divider/>
<Box sx={{display:'flex',justifyContent:"center",alignItems:'center'}}>


<Chart
           options ={{
            series: [Math.round(this.state.campaignData?this.state.campaignData.total_upoaded_Leads/parseInt(this.state.campaignData.lead_target) * 100 : 0)],
            chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              }
            },
          },
        
          labels: ['LEADS'],
          }}
              series={[Math.round(this.state.campaignData?this.state.campaignData.total_upoaded_Leads > parseInt(this.state.campaignData.lead_target)?parseInt(this.state.campaignData.lead_target) :this.state.campaignData.total_upoaded_Leads /parseInt(this.state.campaignData.lead_target) * 100 : 0)]}
              type="radialBar"
              width="270"
            /> 
</Box>
</Paper>
</Grid>



<Grid item xs={12} sm={8} md={8}>
<Paper sx={{minHeight:250,backgroundColor:'#fff'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<Typography sx={{fontWeight:'700',fontSize:14,marginLeft:0.8,color:'#444444',ml:1}}>Campaign Overview</Typography>
</Box>
<Divider/>
<Box>


<Grid container  sx={{pt:1}} spacing={{xs:1,sm:2}}>
<Grid item xs={12} sm={4} md={4}>
<Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>


<Chart
           options ={{
            series: [Math.round(this.state.campaignData?parseInt(this.state.campaignData.lead_target)/parseInt(this.state.campaignData.lead_target)*100:0)],
            chart: {
            height: 350,
            type: 'radialBar',
          },
          
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70',
              }
            },
          },
          labels: ['LEADS'],
          }}
              series={[Math.round(this.state.campaignData?parseInt(this.state.campaignData.lead_target)/parseInt(this.state.campaignData.lead_target)*100:0)]}
              type="radialBar"
              width="210"
            /> 

<Box sx={{display:'flex',flexDirection:'column',ml:-4}}>
<Typography sx={{fontSize:15,fontWeight:'bold',color:'#259efa'}}>{Math.round(this.state.campaignData?parseInt(this.state.campaignData.lead_target):0)}</Typography>
<Typography sx={{fontSize:12,fontWeight:'600',color:'#9a9a9a'}}>Total Required<br/> Leads</Typography>
</Box>


</Box>
</Grid>

<Grid item xs={12} sm={4} md={4}>
<Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>


<Chart
            options ={{
                chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '70%'
                  } 
                },
              },
              labels: ['LEADS'], 
              }}
              series={[Math.round(this.state.campaignData?this.state.campaignData.total_upoaded_Leads/parseInt(this.state.campaignData.lead_target) * 100 : 0)]}
              type="radialBar"
              width="210"
            /> 
{
  /*
  Math.round(this.state.campaignData?this.state.campaignData.total_upoaded_Leads/parseInt(this.state.campaignData.lead_target) * 100 : 0)
  */
 /*
  [Math.round(this.state.campaignData?this.state.campaignData.total_upoaded_Leads/parseInt(this.state.campaignData.lead_target) * 100 : 0)],
  */
}
<Box sx={{display:'flex',flexDirection:'column',ml:-4}}>
<Typography sx={{fontSize:15,fontWeight:'bold',color:'#259efa'}}>{Math.round(this.state.campaignData?this.state.campaignData.total_upoaded_Leads : 0)}</Typography>
<Typography sx={{fontSize:12,fontWeight:'600',color:'#9a9a9a'}}>Total Uploaded<br/> Leads</Typography>
</Box>


</Box>
</Grid>
<Grid item xs={12} sm={4} md={4}>
<Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>


<Chart
           options ={{
            series: [Math.round(this.state.campaignData? (parseInt(this.state.campaignData.lead_target)  -  this.state.campaignData.total_upoaded_Leads)/parseInt(this.state.campaignData.lead_target) * 100 : 0)],
            chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
                track: {
                    color: '#1cbd00'
                  },
              hollow: {
                size: '70%',
              }
            },
          },
          labels: ['LEADS'],
          }}
              series={[Math.round(this.state.campaignData? (parseInt(this.state.campaignData.lead_target)  -  this.state.campaignData.total_upoaded_Leads)/parseInt(this.state.campaignData.lead_target) * 100 : 0)]}
              type="radialBar"
              width="210"
            /> 

<Box sx={{display:'flex',flexDirection:'column',ml:-4,mr:3}}>
<Typography sx={{fontSize:15,fontWeight:'bold',color:'#259efa'}}>{Math.round(this.state.campaignData? parseInt(this.state.campaignData.lead_target)  -  this.state.campaignData.total_upoaded_Leads: 0)}</Typography>
<Typography sx={{fontSize:12,fontWeight:'600',color:'#9a9a9a'}}>Due Leads</Typography>
</Box>


</Box>
</Grid>

</Grid>


</Box>
</Paper>
</Grid>
</Grid>



<Box sx={{mt:3,minHeight:110,width:'100%',backgroundColor:'#cfe0f5'}}>
<Grid container  spacing={{xs:1,sm:2}}>
<Grid item xs={12} sm={4} md={4}>
<Typography sx={{mt:1,mb:1,ml:2,fontSize:14,fontWeight:'600'}}>Start Date : {moment(this.state.campaignData.start_date).format('DD-MM-YYYY')}</Typography>
<Typography sx={{ml:2,fontSize:14,fontWeight:'600'}}>End Date : {moment(this.state.campaignData.end_date).format('DD-MM-YYYY')}</Typography>
</Grid>
<Grid item xs={12} sm={4} md={4}>
<Typography sx={{mt:1,mb:1,ml:2,fontSize:14,fontWeight:'600'}}>Campaign Manager : {this.state.campaignData.campaign_manager}</Typography>
<Typography sx={{fontSize:14,ml:2,fontWeight:'600'}}>CPL : $ {this.state.campaignData.cost_per_lead}</Typography>
</Grid>
<Grid item xs={12} sm={4} md={4}>
<Typography sx={{mt:1,mb:1,ml:2,fontSize:14,fontWeight:'600'}}>End Client : {this.state.campaignData.end_client}</Typography>
</Grid>
</Grid>
</Box>



<Box sx={{mt:1}}>
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
      text: 'LEAD UPLOADED',
    },
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " LEADS";
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
} type="line" height={250} />



</Paper>
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



      </div>
    )
  }
}

export default Over_all_tracking_for_single_campaign_admin
export function Over_all_tracking_for_single_campaign_adminc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<Over_all_tracking_for_single_campaign_admin location={location} param={param} navigate={navigate}></Over_all_tracking_for_single_campaign_admin>)
}
























