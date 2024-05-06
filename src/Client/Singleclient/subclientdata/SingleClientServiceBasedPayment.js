import React, { Component } from 'react'
import {Box,Paper,Tooltip,Backdrop,IconButton,TextField,Button,CircularProgress ,TablePagination,Modal,Typography,TableBody,Link,Table,TableContainer,TableCell,TableHead,TableRow, Divider,} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Checkbox from 'rc-checkbox';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CloseIcon from '@mui/icons-material/Close';
import base from '../../../base';
import { useLocation,useParams,useNavigate } from 'react-router-dom';
import moment from 'moment';
import { SyncLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import bg from '../../../img/bgimg.svg'
import Textarea from '@mui/joy/Textarea';
import CountUp from 'react-countup';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
const password = require('secure-random-password');


export class SingleClientServiceBasedPayment extends Component {

constructor(props) {
  super(props)

  this.state = {
     first:"",
     is_loader_open:true,
     delete_confirmation:false,
     is_backdrop_open:false,
     password:"",
     form_open:false,
     paymentsList:[],
     paymentList_size:0,
     search:"",
     page:0,
     rowPerPage : 10,
     pre_payment_amaount:0,
///////// payment edit section //////////


is_invoice : 'Services',      //// all route 




client_role : JSON.parse(sessionStorage.getItem('client_role')),

  }
  this.handleChange = this.handleChange.bind(this)
  this.handleChangeSearch = this.handleChangeSearch.bind(this)
}


handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

handleChangeSearch=(e)=>{
  this.setState({
    [e.target.name]:e.target.value,page:0,is_loader_open:true
  },()=>{
    fetch(`${base.base_url}/retrive_payment_service_based_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage : this.state.rowPerPage,
        client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({paymentsList:result.data,paymentList_size:result.length,is_loader_open:false})
    })
  })
}

componentDidMount(){
  this.setState({is_loader_open:true},()=>{
fetch(`${base.base_url}/retrive_payment_service_based_invoice`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search:this.state.search,
        page:this.state.page,
        rowsPerPage : this.state.rowPerPage,
       client_id:this.props.param.singleclient.replace(/:/g,'')
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({paymentsList:result.data,paymentList_size:result.length,is_loader_open:false})
  })

  })
  
}



instantUpdate=()=>{
this.setState({is_loader_open:true},()=>{

fetch(`${base.base_url}/retrive_payment_service_based_invoice`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search:this.state.search,
      page:this.state.page,
      rowsPerPage : this.state.rowPerPage,
    client_id:this.props.param.singleclient.replace(/:/g,'')
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({paymentsList:result.data,paymentList_size:result.length,is_loader_open:false})
  })

})
  
}






handleChangePage = (event, newPage) => {
  this.setState({page:newPage,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retrive_payment_service_based_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage : this.state.rowPerPage,
      client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({paymentsList:result.data,paymentList_size:result.length,is_loader_open:false})
    }) 


  })
};




handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retrive_payment_service_based_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage : this.state.rowPerPage,
      client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({paymentsList:result.data,paymentList_size:result.length,is_loader_open:false})
    })

  })

};


successFullUpdate=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Payment Updated</Typography>, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    icon: "🚀",
    theme: "colored",
    });
}


ADDPayment=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Payment Added</Typography>, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    icon: "🚀",
    theme: "colored",
    });
}


deletePayment=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Payment Deletd</Typography>, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    icon: "🚀",
    theme: "colored",
    });
}


unfilled=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields</Typography>, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    icon: "🚀",
    theme: "colored",
    });
}


  render() {
    return (
      <div>
<Box sx={{minHeight:300,backgroundColor:'#fff',mt:1,ml:1,mr:1}}>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row',mt:{xs:1,sm:1,md:1},ml:{xs:1,sm:1,md:1}}}>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',mt:1,mb:1}}>Payments</Typography>
</Box>



<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row',ml:2,mr:2}}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:1,mt:{xs:1,sm:1,md:1},height:30,marginRight:{xs:2,sm:2,md:2},ml:1}}>
    <TextField type='text' fullWidth name="search" onChange={this.handleChangeSearch}  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true,sx:{fontSize:"13px",fontWeight:'600',color:'#666666'}}}  placeholder='Searh Invoice Id' sx={{"& input::placeholder": {
      fontSize: "13px",
      marginLeft:"2px"
    }}}/>
</Box>
</Box>
</Box>



<Box sx={{mt:1,padding:1}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Invoice Id</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Payment Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Payment Method</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Amount</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.paymentsList.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,backgroundColor:index % 2?'#f9f9f9':'#fff'}}
            >
               <TableCell component="th"  scope="row" sx={{color:'#42526e'}} >
              <Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}>{row.invoice_id}</Typography></Box>
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.payment_date).format('MM-DD-YYYY')}</TableCell>
              
              <TableCell align='center' sx={{color:'#42526e'}}>
              <Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#fe964a',color:'#fff',textTransform:'uppercase'}}>{row.payment_method}</Typography></Box> 
                </TableCell>
              
              <TableCell align='left' sx={{color:'#42526e',fontWeight:'600',fontSize:14}}><CountUp start={0} end={row.payment_amount}/></TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>

<Tooltip title="Delete">
  <IconButton disabled={this.state.client_role.is_delete?false:true} onClick={()=>{

this.setState({
  invoice_id:row.invoice_id,
  payment_amount:row.payment_amount,
  payment_id:row.payment_id,
  delete_confirmation:true
})

  }} size='small' >
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
          count={this.state.paymentList_size}
          rowsPerPage={this.state.rowPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />

</Box>
<Box sx={{display:this.state.paymentsList.length>0?'none':'flex',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
  <img src={bg} style={{height:170,width:170,opacity:0.5}}/>
  <Typography sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>No Data Found</Typography>
</Box>
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
<Modal
  open={this.state.delete_confirmation}
 // onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'70%',md:'40%',lg:'30%'},height:300,backgroundColor:'white',borderRadius:2}}>

<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{display:'flex',justifyContent:'center',mt:3}}>
  <Box sx={{height:50,width:50,backgroundColor:'#ffe2e4',borderRadius:15,display:'flex',justifyContent:'center',alignItems:'center'}}>
<WarningAmberIcon sx={{height:30,width:30,color:'#e11d48'}}/>
  </Box>
</Box>
<Typography sx={{textAlign:'center',fontWeight:'800',padding:1,color:'black',fontSize:13}}>Are You Sure?</Typography>

<Box sx={{ml:{xs:2,sm:4,md:10},mr:{xs:2,sm:4,md:10}}}>
<Typography sx={{fontSize:13,color:'grey',textAlign:'center'}}>This action cannot be undone. All value associate to this field will be deleted</Typography>
</Box>

<Box sx={{ml:{xs:1,sm:3,md:6},mr:{xs:1,sm:3,md:6},mt:3,display:'flex',flexDirection:'column'}}>
<Button size='small'  variant='contained' onClick={()=>{
    this.setState({is_backdrop_open:true},()=>{

       fetch(`${base.base_url}/deleteService_Based_Invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
    client_id:this.props.param.singleclient.replace(/:/g,''),
    payment_id:this.state.payment_id,
    invoice_id:this.state.invoice_id,
    payment_amount:this.state.payment_amount,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.instantUpdate();
    this.deletePayment();
    this.setState({
      delete_confirmation:false,
      is_backdrop_open:false,
      payment_id:"",
      invoice_id:"",
      payment_amount:"",
    })
    }) 
    })
  


  
}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({
  delete_confirmation:false,
  payment_id:"",
  invoice_id:"",
  payment_amount:"",
  })} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>

<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_backdrop_open}
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>
</Box>
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

export default SingleClientServiceBasedPayment

export function SingleClientServiceBasedPaymentc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<SingleClientServiceBasedPayment location={location} param={param} navigate={navigate}></SingleClientServiceBasedPayment>)
}












