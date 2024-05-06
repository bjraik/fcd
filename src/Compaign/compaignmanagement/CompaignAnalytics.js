import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import Sidebar from '../../Sidebar'
import Chat from '../../Chat'
import { Sidebarc } from '../../Sidebar'
import { Button, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,Grid,IconButton,TableBody,Table,Modal,Avatar,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import Chart from 'react-apexcharts'
import moment from 'moment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import man from '../../img/man.jpg'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const drawerWidth = 240;

export class CompaignAnalytics extends Component {


  constructor(props) {
    super(props)
  
    this.state = {

        series: [44, 55],
        options: {
          chart: {
            type: 'donut',
          },
          labels: ["series_1", "series_2"],
          legend: {
            offsetY: 7,
              position: 'bottom',
              fontSize: '14px',
              fontWeight: 600,
          },
          
        },
      



        seriesone: [44, 55],
        optionsone: {
          chart: {
            type: 'donut',
          },
          
        },








        seriesRadial: [76],
        optionsRadial: {
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                  margin: 0,
                  size: "70%",
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
            labels: ["Percent"]
          },
        
    
  }}


  render() {
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},marginLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Campaign : Campaign Management</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:14,fontWeight:'550',ml:{xs:1,sm:2,md:3},color:'#666666'}}>Overview</Typography>
</Box>
</Paper>





<Box sx={{mt:2}}>
<Grid container spacing={{xs:1,sm:2,md:5}}>
<Grid item xs={12} sm={12} md={6}>
<Paper component={Grid}  sx={{minHeight:350,width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'550',ml:{xs:1,sm:2,md:3},color:'#666666',padding:0.8}}>Client</Typography>
<Divider sx={{ml:2,mr:2}}/>
<Grid container>
<Grid item xs={12} sm={12} md={12}>
<Box sx={{height:270,width:'100%',backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>


<Chart
              options={this.state.optionsone}
              series={this.state.seriesone}
              type="donut"
              width="320"
            />


</Box>
</Grid>
<Grid item xs={12} sm={12} md={12}>
<Box sx={{height:77,width:'100%',borderRadius:5,backgroundColor:'#fff',display:'flex',justifyContent:'left',alignItems:'center'}}>
<Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',ml:3,mr:3}}>

<Box>
<Typography sx={{fontSize:15,fontWeight:'bold',color:'#737579',textAlign:'center'}}>Client</Typography>
<Typography sx={{fontSize:14,fontWeight:'600',color:'black'}}>xyz client</Typography>
</Box>

<Box>
<Typography sx={{fontSize:15,fontWeight:'bold',color:'#737579',textAlign:'center'}}>Start Date</Typography>
<Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',mb:2}}>
<CalendarMonthIcon sx={{color:'#00a3ff'}}/>
<Typography sx={{fontSize:14,fontWeight:'600',color:'black',ml:1}}>20/02/2002</Typography>
</Box>
</Box>

<Box>
<Typography sx={{fontSize:15,fontWeight:'bold',color:'#737579',textAlign:'center'}}>End Date</Typography>
<Box sx={{display:'flex',flexDirection:'row',justifyContent:'left',alignItems:'center',mb:2}}>
<CalendarMonthIcon sx={{color:'#00a3ff'}}/>
<Typography sx={{fontSize:14,fontWeight:'600',color:'black',ml:1}}>20/02/2002</Typography>
</Box>
</Box>

</Box>

</Box>
</Grid>
</Grid>
</Paper>
</Grid>

<Grid item xs={12} sm={12} md={6}>
<Paper sx={{minHeight:300,width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'550',ml:{xs:1,sm:2,md:3},color:'#666666',padding:0.8}}>Campaign Progress</Typography>
<Divider sx={{ml:2,mr:2}}/>
<Grid container>
<Grid item xs={12} sm={12} md={8}>
<Box sx={{minHeight:300,width:'100%',backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mt:{xs:-9,sm:-6,md:0}}}>



<Chart
              options={this.state.options}
              series={this.state.series}
              type="donut"
            
            />

</Box>
</Box>
</Grid>

<Grid item xs={12} sm={12} md={4}>
<Box sx={{minHeight:{xs:100,sm:100,md:350},width:'100%',mt:{xs:-9,sm:-6,md:0},backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:{xs:'row',sm:'row',md:'column'}}}>

<Chart
              options={this.state.optionsRadial}
              series={this.state.seriesRadial}
              type="radialBar"
              width="150"
            />

<Chart
              options={this.state.optionsRadial}
              series={this.state.seriesRadial}
              type="radialBar"
              width="150"
            />


</Box>
</Grid>
</Grid>
</Paper>
</Grid>
</Grid>
</Box>










<Box sx={{width:'100%',minHeight:400,mt:2,display:'none'}}>
<Grid container spacing={{xs:1,sm:2,md:5}}>
<Grid item xs={12} sm={12} md={6}>
<Paper sx={{height:500,width:'100%'}}>
<Box sx={{display:'flex',justifyContent:'space-between',flexDirection:{xs:'column',sm:'row'},padding:1,ml:{xs:1,sm:2,md:2},mr:{xs:1,sm:2,md:2}}}>
  <Typography sx={{fontSize:14,fontWeight:'550',color:'#666666',mt:0.7}}>Compaign Manager</Typography>
  <Button component="label" sx={{textTransform:'none',height:27,backgroundColor:'#008ffb',width:150,fontWeight:'600',mt:{xs:1,sm:0}}} disableElevation variant="contained" startIcon={<AddIcon  sx={{color:'#fff'}}/>}>
Add Member
</Button>
</Box>
<Divider sx={{ml:2,mr:2}}/>


{
[1,2,3,4].map(()=>(
  <Box sx={{height:50,marginLeft:2,marginRight:2,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:50,flexDirection:'row'}}>
  <Avatar src={man} />
  <Box sx={{marginLeft:1,display:'flex',flexDirection:'column'}}>
  <Typography sx={{fontSize:13,fontWeight:'bold',fontFamily:'sans-serif',display:'inline-block',width:150,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Nitish kumar</Typography>
  <Typography sx={{fontSize:11,color:'#42526e',display:'inline-block',width:150,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Devloper</Typography>
  </Box>
  </Box>

  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:50}}>
    <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <Tooltip title="Mail">
  <IconButton size='small' sx={{backgroundColor:'#d9d9d9',mr:1}}>
<MailOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Remove">
  <IconButton size='small' sx={{backgroundColor:'#d9d9d9',mr:1}} >
<CloseIcon sx={{color:'#f29494',height:15,width:15}}/>
</IconButton>
</Tooltip>
    </Box>
  </Box>
</Box>
))
  }















</Paper>
</Grid>
<Grid item xs={12} sm={12} md={6}>


</Grid>
</Grid>
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

     </div>
    )
  }
}

export default CompaignAnalytics






