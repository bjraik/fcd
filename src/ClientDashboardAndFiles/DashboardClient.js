import React, { Component } from 'react'
import Sidebar, { Sidebarc } from '../ClientDashboardAndFiles/Sidebar'
import { AppBar, Box, Container, MenuItem,Divider,CircularProgress,Backdrop, Grid, Paper, Typography,LinearProgress ,TextField, Button,Table,TableCell,TableContainer,TableRow,TableBody,TableHead} from '@mui/material'
import Appheader, { Appheaderc } from '../ClientDashboardAndFiles/Appheader'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Chart from 'react-apexcharts'
import moment from 'moment'
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { ThreeCircles } from  'react-loader-spinner'
import PaidIcon from '@mui/icons-material/Paid';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import base from '../base'
import AdminDashboard from './dashboardFolder/AdminDashboard'
import ContactUserDashboard from './dashboardFolder/ContactUserDashboard'
import ClientUser from './dashboardFolder/ClientUser'
const drawerWidth = 240;







export class DashboardClient extends Component {
constructor(props) {
  super(props)

  this.state = {

is_loader_open:true,



 departmentData : JSON.parse(sessionStorage.getItem('AllClientData')),
 credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
 permissiondata : JSON.parse(sessionStorage.getItem('permission')),
 payload : JSON.parse(sessionStorage.getItem('payload')),



/////////////////////




    
  }



}







  render() {
    return (
      <div>


        <Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>

<Box sx={{p:{xs:2,sm:3}, mt:6}}>



{
  ///// admin dashboard data 
}
<Box sx={{display:this.state.credential_type.is_admin?'block':'none'}}>

<AdminDashboard/>

</Box>



{
  ///// login as contact dashboard
}
<Box sx={{display:this.state.credential_type.is_admin?'none':'block'}}>
  <ContactUserDashboard/>
</Box>



<br/>






















</Box>
</Box>
</Box>


<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>








      </div>
    )
  }
}

export default DashboardClient

















/*

 <Chart
              options={this.state.optionsRadial}
              series={this.state.seriesRadial}
              type="radialBar"
              width="290"
            /> 

            */

























/*
import React, { Component } from 'react'
import Sidebar, { Sidebarc } from './Sidebar'
import { AppBar, Box, Container, Divider, Grid, Paper, Typography,LinearProgress } from '@mui/material'
import Appheader from './Appheader'
import Chat from './Chat'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Chart from 'react-apexcharts'

const drawerWidth = 240;




var options = {
  series: [70],
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
labels: ['Cricket'],
};


export class Main extends Component {
constructor(props) {
  super(props)

  this.state = {



    series: [{
      name: 'TEAM A',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
      name: 'TEAM B',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
      name: 'TEAM C',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }],
    options: {
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
      labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
        '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
      
          }
        }
      }
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
            strokeWidth: "67%",
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
              offsetY: -20,
              show: true,
              color: "#888",
              fontSize: "13px"
            },
            value: {
              formatter: function (val) {
                return val;
              },
              color: "#111",
              fontSize: "30px",
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
    seriesRadial: [76],
    optionsBar: {
      chart: {
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        dropShadow: {
          enabled: true
        }
      }
    }
          
  }
}



  render() {
    return (
      <div>
        <Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' } }}>
<Appheader/>

<Box sx={{p:3, mt:6}}>

<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},marginLeft:1,fontWeight:'500',color:'#3e3e40'}}>Dashboard</Typography>


<Grid container spacing={{xs:2,sm:4}}>
  <Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL COMPAIGN</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>360</Typography>

<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#fff0d3',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>

<LanguageOutlinedIcon sx={{height:35,width:35,color:'#ffb621'}}/>


  </Box>
</Box>

</Box>
</Paper>
  </Grid>


  <Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL CLIENT</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>360</Typography>
<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ccedff',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LanguageOutlinedIcon sx={{height:35,width:35,color:'#00a3ff'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>

  <Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'bold',color:'#3e3e40'}}>DUE PAYMENT</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>Rs. 36000.00</Typography>
<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ffd7e4',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LanguageOutlinedIcon sx={{height:35,width:35,color:'#fe3879'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>
</Grid>


<br/>



<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
<Box sx={{minHeight:500,width:'100%',}}>
<Paper elevation={1} sx={{width:'100%',minHeight:350,backgroundColor:'#fff',display:'flex',flexDirection:{xs:'column',sm:'row'}}}>


<Box sx={{minHeight:350, width:{xs:'100%',sm:'40%'},display:'flex',justifyContent:'center',alignItems:'center'}}>
<Chart
              options={this.state.optionsRadial}
              series={this.state.seriesRadial}
              type="radialBar"
              width="290"
            />
</Box>


</Paper>

<Paper sx={{marginTop:1,width:'100%',minHeight:200}}>
<Box>
  <Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Invoice Overview</Typography>
</Box>
<Divider sx={{}}/>
<Box sx={{width:'100%'}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
<Box sx={{minHeight:200,ml:1,mr:1}}>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1,}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                aria-disabled
                value={10}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#2da804",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={20}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#3793ff",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1,}}>Overdue</Typography>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1,}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={70}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#2da804",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>

</Box>
  </Grid>
  <Grid item xs={12} sm={6}>
  <Box sx={{minHeight:200,ml:1,mr:1}}>
  <Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={40}
                aria-disabled
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1,}}>Overdue</Typography>

<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={50}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>

<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={60}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>

</Box>
  </Grid>
</Grid>







</Box>
</Paper>
</Box>
</Grid>







<Grid item xs={12} sm={6}>
<Box sx={{minHeight:400,width:'100%'}}>
<Paper sx={{width:'100%',minHeight:400}}>

<Chart options={this.state.options}  series={this.state.series} type="line" height={350} />

 <Box sx={{display:'flex',justifyContent:'space-between',padding:2}}>
  <Typography sx={{fontSize:18,fontWeight:'500',display:'flex',flexDirection:'row'}}> <Typography sx={{fontSize:23,fontWeight:'600',color:'blue',marginRight:2}}>$34000</Typography> Income </Typography>
  <Typography sx={{fontSize:18,fontWeight:'500',display:'flex',flexDirection:'row'}}> <Typography sx={{fontSize:23,fontWeight:'600',color:'blue',marginRight:2}}>$34000</Typography> Spend </Typography>
</Box>   
</Paper>


<Paper sx={{width:'100%',height:230,mt:1}}>





</Paper>

</Box>
</Grid>
</Grid>





<br/>

<Grid container spacing={2}>
  <Grid item xs={12} sm={4}>
<Paper sx={{height:400,width:'100%'}}>






</Paper>
  </Grid>

<Grid item xs={12} sm={4}>
<Paper sx={{height:400,width:'100%',backgroundColor:'red'}}>




</Paper>
</Grid>

<Grid item xs={12} sm={4}>
<Paper sx={{height:400,width:'100%',backgroundColor:'green'}}>




</Paper>
</Grid>




</Grid>



















</Box>
</Box>
</Box>


<Box sx={{display:'flex',position:'fixed',bottom:40,right:10}}>
 <Chat/> 
</Box>


      </div>
    )
  }
}

export default Main

*/
