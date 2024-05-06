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
import base from '../../base'



export class ClientUser extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        total_campaign : 0,
        total_live_campaign : 0,
        total_uploaded_leads : 0,
    
      }
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
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>{this.state.total_campaign}</Typography>

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
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL ACTIVE CAMPAIGN</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>{this.state.total_live_campaign}</Typography>
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
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL LEAD</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>{this.state.total_uploaded_leads}</Typography>
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
<Typography sx={{fontSize:12,fontWeight:'bold',color:'#3e3e40'}}>TOTAL PAYMENT</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>Rs. 36000.00</Typography>
<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ffd7e4',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<PaidIcon sx={{height:35,width:35,color:'#fe3879'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>
</Grid>
      </div>
    )
  }
}

export default ClientUser