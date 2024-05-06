import React, { Component } from 'react'
import {Box,Paper,Tooltip,Backdrop,IconButton,TextField,Button,CircularProgress ,ButtonGroup,TablePagination,Modal,Typography,TableBody,Link,Table,TableContainer,TableCell,TableHead,TableRow, Divider,} from '@mui/material'
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
import PaidIcon from '@mui/icons-material/Paid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Textarea from '@mui/joy/Textarea';
import CountUp from 'react-countup';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SingleClientServiceBasedPayment, { SingleClientServiceBasedPaymentc } from './SingleClientServiceBasedPayment';
const password = require('secure-random-password');


export class SingleClientPayment extends Component {

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

payment_id:"",  
client_id:"", 
invoice_id:"",
client_name:"",
payment_method:"",
payment_date:"",
payment_amount:"",
note:"",





is_invoice : 'invoice',




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
    fetch(`${base.base_url}/retriveAllPaymentForSingleClient`,{
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
fetch(`${base.base_url}/retriveAllPaymentForSingleClient`,{
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

fetch(`${base.base_url}/retriveAllPaymentForSingleClient`,{
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

    fetch(`${base.base_url}/retriveAllPaymentForSingleClient`,{
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

    fetch(`${base.base_url}/retriveAllPaymentForSingleClient`,{
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
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Payment Deleted</Typography>, {
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

        <Box sx={{mt:2,ml:2}}>
       
<ButtonGroup
size='small'
  disableElevation
 
  variant="outlined"
  aria-label="Disabled button group"
>
<Button size='small' variant={this.state.is_invoice=="invoice"?'contained':'outlined'} onClick={()=>this.setState({is_invoice:'invoice'})} sx={{textTransform:'none',fontWeight:'600',backgroundColor:this.state.is_invoice=='invoice'?'#008ff':'#fff'}} startIcon={<PaidIcon/>}>Invoice</Button>
<Button size='small' variant={this.state.is_invoice=="services"?'contained':'outlined'} onClick={()=>this.setState({is_invoice:'services'})} sx={{textTransform:'none',fontWeight:'600',backgroundColor:this.state.is_invoice=='services'?'#008ff':'#fff'}} startIcon={<AttachMoneyIcon/>}>Services</Button>

</ButtonGroup>

        </Box>

        <Box sx={{display:this.state.is_invoice=='services'?'block':'none'}}>
<SingleClientServiceBasedPaymentc/>
        </Box>


<Box sx={{display:this.state.is_invoice=='invoice'?'block':'none'}}>
<Box sx={{minHeight:300,backgroundColor:'#fff',mt:1,ml:1,mr:1}}>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row',mt:{xs:1,sm:1,md:1},ml:{xs:1,sm:1,md:1}}}>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',mt:1,mb:1}}>Payments</Typography>
</Box>



<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row',ml:1,mr:1}}}>
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
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.payment_date).format('MM-DD-YYYY hh:mm')}</TableCell>
              
              <TableCell align='center' sx={{color:'#42526e'}}>
              <Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#fe964a',color:'#fff',textTransform:'uppercase'}}>{row.payment_method}</Typography></Box> 
                </TableCell>
              
              <TableCell align='left' sx={{color:'#42526e',fontWeight:'600',fontSize:14}}><CountUp start={0} end={row.payment_amount}/></TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
                  {/*
<Tooltip title="Edit">
  <IconButton disabled={this.state.client_role.is_edit?false:true} onClick={()=>{

this.setState({
form_open:true,
payment_id:row.payment_id,  
client_id:row.client_id, 
invoice_id:row.invoice_id,
client_name:row.client_name,
payment_method:row.payment_method,
payment_date:row.payment_date,
payment_amount:row.payment_amount,
note:row.note,
pre_payment_amaount:row.payment_amount,
})

  }} size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>
*/
  }

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








<Box> 
<Modal
  open={this.state.form_open}  ////    for payments add and serverved
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'32%'},height:'80vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  form_open:false,
  payment_id:"",  
client_id:"", 
invoice_id:"",
client_name:"",
payment_method:"",
payment_date:"",
payment_amount:"",
note:"",
  
  
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Payment</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Payment Method<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.payment_method}  name="payment_method" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Payment Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.payment_date).format('YYYY-MM-DD')} name="payment_date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Amount<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={(e)=>{
   let input = e.target.value ;
   if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) ){
      this.setState({ payment_amount: parseInt(e.target.value) });
   }  
 

 }}
 type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.payment_amount} name="payment_amount" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}></Typography></Typography>
<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.note} name="note"/>

<Button onClick={()=>{

if(this.state.payment_id!=="" && this.state.client_id!=="" && this.state.invoice_id!=="" && this.state.client_name!=="" && this.state.payment_method!=="" &&  (parseInt(this.state.payment_amount) > 0) && this.state.note!==""){
  fetch(`${base.base_url}/editPayment`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'put',
    body:JSON.stringify({
      client_id:this.props.param.singleclient.replace(/:/g,''),
      payment_id:this.state.payment_id,
      invoice_id:this.state.invoice_id,
      payment_method:this.state.payment_method,
      payment_date:this.state.payment_date,
      payment_amount:this.state.payment_amount,
      note:this.state.note,
      pre_payment_amaount:this.state.pre_payment_amaount,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.setState({
  form_open:false,
  payment_id:"",  
  invoice_id:"",
  client_name:"",
  payment_method:"",
  payment_date:"",
  payment_amount:"",
  note:"",
  pre_payment_amaount:0
});
this.instantUpdate();
this.successFullUpdate()
  })
}else{
  this.unfilled();
}

   

}} variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  Edit Apply
</Button>

</Box>
</Box>
</Paper>
  </Box>
</Modal>
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

    fetch(`${base.base_url}/deletePayments`,{
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

</Box>







      </div>
    )
  }
}

export default SingleClientPayment

export function SingleClientPaymentc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<SingleClientPayment location={location} param={param} navigate={navigate}></SingleClientPayment>)
}









