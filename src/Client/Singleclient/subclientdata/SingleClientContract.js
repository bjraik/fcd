import React, { Component } from 'react'
import {Box,Paper,Tooltip,IconButton,TextField,Button ,TablePagination,Modal,Typography,TableBody,Link,Table,TableContainer,TableCell,TableHead,TableRow,Divider} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Checkbox from 'rc-checkbox';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CloseIcon from '@mui/icons-material/Close';
const password = require('secure-random-password');


export class SingleClientContract extends Component {

constructor(props) {
  super(props)

  this.state = {
     first:"",
     password:"",
     form_open:false,
     client_role : JSON.parse(sessionStorage.getItem('client_role')),
  }
}





  render() {
    return (
      <div>
<Box sx={{minHeight:300,backgroundColor:'#fff',mt:1,ml:1,mr:1}}>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row',mt:{xs:1,sm:1,md:1},ml:{xs:0,sm:0,md:1}}}>



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

<Box sx={{height:30,width:30,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Delete All">
<DeleteForeverIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>

</Box>



<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'}}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:1,mt:{xs:1,sm:1,md:1},height:30,marginRight:{xs:1,sm:1,md:0}}}>
    <TextField type='text' fullWidth  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true,sx:{fontSize:"13px",fontWeight:'600',color:'#666666'}}}  placeholder='Search' sx={{"& input::placeholder": {
      fontSize: "13px",
      marginLeft:"2px"
    }}}/>
</Box>

<Box sx={{mt:{xs:1,sm:1,md:1}}}>
<Button onClick={()=>{this.setState({form_open:true})}} component="label" sx={{textTransform:'none',fontSize:13,height:30,backgroundColor:'#008ffb',ml:{xs:0,sm:0,md:2},fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon  sx={{color:'#fff'}}/>}>
Add Contract
</Button>
</Box>
</Box>
</Box>











<Box sx={{mt:1,padding:1}}>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',mt:1,mb:1}}>Contract</Typography>
<TableContainer component={Box}>
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Title</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Compaign</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Contract Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Valid Until</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Amount</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[{clientname:"nitish"},{clientname:"nitish"}].map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}} >
            CDR1234
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>compaign</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>compaign 2</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>10/02/2002</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>12/02/2003</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>56,000</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>---</TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
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

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Contract</Typography>
<Box>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Performa Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Valid Unit<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Tax<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Second Tax<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',height:100}}}  name="first_name" fullWidth size='small'/>



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

export default SingleClientContract
























