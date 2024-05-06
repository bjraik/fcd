

import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import Chart from 'react-apexcharts'
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
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import Papa from 'papaparse'
import base from '../../../base'
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
import bg from '../../../img/bgimg.svg'




const drawerWidth = 240;

export class Endclienttracking_client_side extends Component {


constructor(props) {
  super(props)

  this.state = {
    credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),

    page:0,
    is_loader_open:false,
    is_loader_open_circle:false,


    /////// client list  data

search : "",
client_id :"",
client_name : '',

    //////// client data

    client_list : [],

 total_allocation : 0,
 total_spend : 0,
 total_campaigns : 0,
 total_upload_leads : 0,
 end_client_list_with_all_data : []  ,


//////////////////////// graph related data ///////////////////

monthly_allocation : [],
monthly_revenue : [],

yearly_allocation_and_revenue : [],
array_list_of_year: [],
quaterly_list_allocation_revenue_with_end_client_name : [] ,   ///// all item end client wise data



duration_1 : 'Monthly',
duration_2 : 'Monthly',



x_axis :['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
y_axis : [],

x_2_axis : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
y_2_axis : [],




  }
  this.handleChange = this.handleChange.bind(this)
}


handleChange = (e)=>{
    this.setState({[e.target.name]:e.target.value})
}



componentDidMount(){

  this.getAllDataAboutEndClient(this.state.credential_type.client_id)

}



getAllDataAboutEndClient=(client_id)=>{
  this.setState({is_loader_open:true},()=>{
    fetch(`${base.base_url}/getInfoAboutAllEndClientOfSingleCampaign`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          client_id : client_id
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({
  
  x_axis :[],
  y_axis : [],
  x_2_axis : [],
  y_2_axis : [],
  
  
  duration_1:'Monthly',
  duration_2 : 'Monthly',
  
  
   total_allocation : result.total_allocation,
   total_spend : result.total_spend,
   total_campaigns : result.total_campaigns,
   total_upload_leads :result.total_upload_leads,
   end_client_list_with_all_data :result.end_client_list_with_all_data,
  
        })
      }).then(()=>{
  
        this.retrive_data_for_end_client_allocation_revenue(client_id);
  
  
      })
    
    })
  
  }
  
  
  
  retrive_data_for_end_client_allocation_revenue=(client_id)=>{
  
    fetch(`${base.base_url}/get_all_analytics_data_allocation_revenue`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        client_id : client_id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
  
  
      this.setState({
        monthly_allocation : result.monthly_allocation,
        monthly_revenue : result.monthly_revenue,
        yearly_allocation_and_revenue  :result.yearly_data_allocation_and_revenue,
        array_list_of_year : result.array_list_of_year,
        quaterly_list_allocation_revenue_with_end_client_name:result.quaterly_list_allocation_revenue_with_end_client_name,
  
        is_loader_open:false
      })
  
  
  
    })
  
  
  }
  







  render() {
    
let end_client_list = this.state.end_client_list_with_all_data.filter((e)=>(e.end_client_name.toLowerCase().includes(this.state.search.toLowerCase())))

//////// grapgh data 

let monthly_allocation = []
let monthly_revenue = []

for (let j = 0; j < this.state.monthly_allocation.length; j++) {
  monthly_allocation.push({
    name:this.state.monthly_allocation[j].end_client,
    type:'column',
    data : this.state.monthly_allocation[j].allocation
  })
    
  }



  for (let j = 0; j < this.state.monthly_revenue.length; j++) {
    monthly_revenue.push({
      name:this.state.monthly_revenue[j].end_client,
      type:'column',
      data : this.state.monthly_revenue[j].revenue
    })
      
    }



/////

 let yearly_allocation = []


for (let w = 0; w < this.state.yearly_allocation_and_revenue.length; w++) {


     let imagenary_arary = []

       for (let l = 0; l < this.state.array_list_of_year.length; l++) {
           
        let filtered_data = this.state.yearly_allocation_and_revenue[w].filter((data)=>data._id.year==this.state.array_list_of_year[l])

        if(filtered_data.length > 0){
          imagenary_arary.push(filtered_data[0].allocation)
        }else{
          imagenary_arary.push(0)
        }
       }

       yearly_allocation.push({
        name:this.state.yearly_allocation_and_revenue[w][0].end_client,
        type:'column',
        data : imagenary_arary
       })
      
}



 let yearly_revenue = []

for (let w = 0; w < this.state.yearly_allocation_and_revenue.length; w++) {

       let imagenary_arary = []


       for (let l = 0; l < this.state.array_list_of_year.length; l++) {
           
        let filtered_data = this.state.yearly_allocation_and_revenue[w].filter((data)=>data._id.year==this.state.array_list_of_year[l])

        if(filtered_data.length > 0){
          imagenary_arary.push(filtered_data[0].revenue)
        }else{
          imagenary_arary.push(0)
        }
       }

       yearly_revenue.push({
        name:this.state.yearly_allocation_and_revenue[w][0].end_client,
        type:'column',
        data : imagenary_arary
       })
     
      
}




//////// quaterly allocation and revenue
let quaterly_allocation  = []
let quaterly_revenue = []

for (let s = 0; s < this.state.quaterly_list_allocation_revenue_with_end_client_name.length; s++) {
 
  quaterly_allocation.push({
    name:this.state.quaterly_list_allocation_revenue_with_end_client_name[s].end_client_name,
    type:'column',
    data : this.state.quaterly_list_allocation_revenue_with_end_client_name[s].allocation,
   })
  
}


for (let r = 0; r < this.state.quaterly_list_allocation_revenue_with_end_client_name.length; r++) {
  quaterly_revenue.push({
    name:this.state.quaterly_list_allocation_revenue_with_end_client_name[r].end_client_name,
    type:'column',
    data : this.state.quaterly_list_allocation_revenue_with_end_client_name[r].revenue
   })
  
}



    return (
      <div>

<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>End Client Tracking</Typography>




<Grid container spacing={{xs:1,sm:2}} sx={{mt:1}}>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#00a3ff'}}>

<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<ExploreIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Campaigns</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}> <CountUp start={0} end={this.state.total_campaigns}  /></Typography>

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
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total Allocation</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}><CountUp start={0} end={this.state.total_allocation}  /></Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#9a5252'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<AccountBalanceWalletIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Uploaded Leads</Typography>
</Box>
<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}><CountUp start={0} end={this.state.total_upload_leads}  /></Typography>
</Paper>
</Grid>
</Grid>



<Paper sx={{minHeight:200,mt:2}}>
<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row'},justifyContent:'space-between'}}>
<Typography sx={{fontSize:15,fontWeight:'600',ml:2,mt:2}}>End Client List</Typography>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30,mr:2,mt:2}}>
    <TextField  name='search' value={this.state.search} onChange={this.handleChange} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='End Client name' sx={{"& input::placeholder": {
      fontSize: "14px",
      paddingLeft:"2px",
      paddingRight:"2px",
      fontWeight:'600'}}
    }/>
</Box>
</Box>

<br/>

<Box sx={{mt:0,paddingLeft:2,paddingRight:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1220 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191',ml:3}}>Sr. No</TableCell>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Client Id</TableCell>
          <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191',ml:3}}>no_of_campaigns</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Client</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Allocation</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Revenue</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Uploaded Leads</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {end_client_list.map((row,index) => (
            <TableRow
              key={row.name}
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:index % 2?'#f9f9f9':'#fff' }}
            >
              <TableCell align='left' sx={{color:'#42526e',textTransform:'capitalize'}}>{index + 1}.</TableCell>
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}} >
              <Box sx={{height:23,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#2d85d1'}}> <Link style={{textDecoration:'underline',color:'#fff'}}>{row.client_id}</Link></Typography></Box> 
              </TableCell>    


              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>{row.no_of_campaigns}</TableCell>



              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>{row.end_client_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>{row.total_allocation}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>
              <Box sx={{height:23,display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#008ffb'}}>${row.total_spend} </Typography></Box> 
                </TableCell>

              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize',fontWeight:'700'}}><CountUp start={0} end={row.total_uploaded_leads}/></TableCell>

             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Box>

<Box sx={{display:this.state.end_client_list_with_all_data.length>0?'none':'flex',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
  <img src={bg} style={{height:170,width:170,opacity:0.5}}/>
  <Typography sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>No Data Found</Typography>
</Box>
<br/>
</Paper>


{
  //// graphical representation
}


<Paper sx={{minHeight:200,width:'100%',mt:2}}>
   <Box sx={{height:350,width:'100%',}}>
      <Paper sx={{height:350,width:'100%',}}>

      <Box sx={{display:'flex',flexDirection:'row',p:1}}>
<TextField
name='duration_1'
onChange={(e)=>{this.setState({duration_1:e.target.value})}}
value={this.state.duration_1}
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
  duration_1:'Monthly',
  x_axis : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
  y_axis : monthly_allocation,    ///// sifting as required
  
 

})
}

if(d=="Quaterly"){
  this.setState({
    duration_1:'Quaterly',
    x_axis : ['Q1','Q2','Q3','Q4'] ,
    y_axis : quaterly_allocation,    ///// sifting as required
  })
  }

if(d=='Yearly'){
  this.setState({
    duration_1:'Yearly',
    x_axis :  this.state.array_list_of_year ,
    y_axis : yearly_allocation, 

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
    height: 250,
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
 labels:this.state.x_axis,

  markers: {
    size: 0
  },
  xaxis: {
    type: 'text'
  },
  yaxis: {
    title: {
      text: 'Allocation',
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
 this.state.duration_1=='Monthly'? monthly_allocation :  this.state.y_axis
} type="line" height={250} />
      </Paper>
   </Box>
  
</Paper>



{
  //// graphical representation revenue
}


<Paper sx={{minHeight:200,width:'100%',mt:2}}>
   <Box sx={{height:250,width:'100%',}}>
      <Paper sx={{height:350,width:'100%',}}>

      <Box sx={{display:'flex',flexDirection:'row',p:1}}>
<TextField
name='duration_2'
onChange={(e)=>{this.setState({duration_2:e.target.value})}}
value={this.state.duration_2}
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
  duration_2 :'Monthly',
  x_2_axis : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] ,
  y_2_axis : monthly_revenue,    ///// sifting as required
  
})
}

if(d=="Quaterly"){
  this.setState({
    duration_2 :'Quaterly',
    x_2_axis : ['Q1','Q2','Q3','Q4'] ,
    y_2_axis : quaterly_revenue,    ///// sifting as required
    
  })
  }


if(d=='Yearly'){
  this.setState({
    duration_2 :'Yearly',
    x_2_axis : this.state.array_list_of_year,
    y_2_axis : yearly_revenue  ///// sifting as required
    
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
    height: 250,
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
  labels:this.state.x_2_axis,

  markers: {
    size: 0
  },
  xaxis: {
    type: 'text'
  },
  yaxis: {
    title: {
      text: 'Revenue',
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
this.state.duration_2=="Monthly"? monthly_revenue : this.state.y_2_axis
} type="line" height={250} />


      </Paper>
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

export default Endclienttracking_client_side













