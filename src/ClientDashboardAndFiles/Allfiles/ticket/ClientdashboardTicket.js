import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../../ClientDashboardAndFiles/Appheader'
import Sidebar from '../../../ClientDashboardAndFiles/Appheader'
import Chat from '../../../Chat'
import { Sidebarc } from '../../../ClientDashboardAndFiles/Sidebar'
import { Button, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,Link,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
const drawerWidth = 240;

export class ClientdashboardTicket extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
    }
  }

  componentDidMount(){
    setTimeout(()=>{
this.setState({is_loader_open:false})
    },1000)
  }
  render() {
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Ticket</Typography>


<Paper sx={{width:'100%',minHeight:600,mt:2}}>
  <Typography sx={{fontSize:17,fontWeight:'500',padding:1,paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Ticket List</Typography>
  <Divider/>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'column',md:'row'},padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row'}}>

<Box sx={{height:30,width:30,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Export PDF">
<PictureAsPdfIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
<Box sx={{height:30,width:30,borderRadius:1,ml:1,mr:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Export Exel">
<DriveFileMoveIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
<Box sx={{height:30,width:30,mr:2,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Delete All">
<DeleteForeverIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
</Box>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'column',md:'row'}}}>
  <Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30,mt:{xs:1,sm:1,md:0},mb:{xs:1,sm:1,md:0}}}>
<TextField   variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',ml:{xs:0,sm:0,md:3}}}>
<Button onClick={()=>this.setState({form_open:true})} sx={{textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon sx={{color:'#fff'}}/>}>
Add Ticket
</Button>
</Box>
</Box>



</Box>



<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Ticket ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Title</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Compaign Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[{clientname:"nitish"},{clientname:"nitish"}].map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
              {index+1}
              </TableCell> 
              
              <TableCell align='center' sx={{color:'#42526e'}}>Adas com</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>jimm compaign</TableCell>
              <TableCell align='center' sx={{color:'green',fontSize:12,fontWeight:'800'}}>Pending</TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="View">
  <IconButton size='small'>
<VisibilityIcon sx={{color:'#7cbbf7',height:15,width:15}}/>
</IconButton>
</Tooltip>


<Tooltip title="Delete">
  <IconButton size='small' >
<DeleteForeverIcon sx={{color:'#f29494',height:15,width:15}}/>
</IconButton>
</Tooltip>

 </Box></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
   <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={2}
          rowsPerPage={10}
          page={0}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
</Box>




</Paper>
</Box>
</Box>
</Box>

<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>

<Box sx={{display:'none',position:'fixed',bottom:40,right:10}}>
 <Chat/> 
</Box>











<Box> 
<Modal
  open={this.state.form_open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Ticket</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Title<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Department<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Compaign<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Description<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  name="first_name" fullWidth size='small'/>


<Button variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>

</Box>
</Box>
</Paper>
  </Box>
</Modal>
</Box>




     </div>
    )
  }
}

export default ClientdashboardTicket















