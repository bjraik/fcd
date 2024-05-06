import React, { Component } from 'react'
import {Box,Paper,Tooltip,IconButton,Backdrop,TextField,Button ,CircularProgress,ButtonGroup,MenuItem,TablePagination,Modal,Typography,TableBody,Link,Table,TableContainer,TableCell,TableHead,TableRow,Divider} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Checkbox from 'rc-checkbox';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CloseIcon from '@mui/icons-material/Close';
import base from '../../../base'
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import moment from 'moment';
import { SyncLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import bg from '../../../img/bgimg.svg'
import Textarea from '@mui/joy/Textarea';
import CountUp from 'react-countup';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
const password = require('secure-random-password');


export class SingleClientServiceInvoice extends Component {
constructor(props) {
  super(props)

  this.state = {
     first:"",
     password:"",
     is_loader_open:false,
     is_backdrop_open:false,
     form_open:false,
     form_open_edit:false,
     delete_confirmation:false,
     clientList:[],
     search:"",
     page:0,
     rowsPerPage:10,
     invoiceList:[],
     invoice_List_Size:0,
     addresList:[],
//////////////// INVOICE ADD SECTION ///////////////////

total_invoice:0,
amount_paid:0,
invoice_id:"",
sender_address:{},   ///// this is sender address
beneficiary_name:"",   //// adress heading will so
client_id:"",
client_name:"",
billed_month : null,
bill_date:"",
due_date:"",
po_no:"",
notes:"",
items:[],
payment_received:"0",
discount:0,
////////////////// 

is_invoice : 'Services',


client_role : JSON.parse(sessionStorage.getItem('client_role')),
  }
  this.handleChange=this.handleChange.bind(this)
  this.handleChangeSearch = this.handleChangeSearch.bind(this)
}

handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}


handleChangeSearch=(e)=>{
  this.setState({
    [e.target.name]:e.target.value,page:0,is_loader_open:true
  },()=>{
    fetch(`${base.base_url}/retrive_service_based_invoice_crm_admin_client`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage,
        client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_List_Size:result.length,is_loader_open:false})
    })
  })
}




addInvoice = async()=>{

 if( this.state.bill_date!=="" && this.state.due_date!=="" && this.state.po_no!=="" ){
   let client_name =  await localStorage.getItem('client')
   this.setState({is_backdrop_open:true},()=>{
  fetch(`${base.base_url}/add_service_based_invoice`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
    client_id:this.props.param.singleclient.replace(/:/g,''),
    client_name:JSON.parse(client_name).client_name,
    bill_date:this.state.bill_date,
    due_date:this.state.due_date,
    billed_month : Date(),
    po_no:this.state.po_no,
    notes:this.state.notes,
    sender_address:this.state.sender_address,
    beneficiary_name:this.state.beneficiary_name,
    items:[],
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.instantRetriveInvoice();
this.succes()
this.setState({
  form_open:false,
  sender_address:"",
  is_backdrop_open:false,
  beneficiary_name:{},
  billed_month:null,
  invoice_id:"",
client_id:"",
client_name:"",
bill_date:"",
due_date:"",
po_no:"",
notes:"",
items:[],
payment_received:"0",
})
  })

   })

 }else{
  this.fail();
 }
 
}




componentDidMount(){

this.setState({is_loader_open:true},()=>{

 fetch(`${base.base_url}/retrive_service_based_invoice_crm_admin_client`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage,
        client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_List_Size:result.length,is_loader_open:false})
    })

})



fetch(`${base.base_url}/retriveInvoiceSenderDetails`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
  })
}).then((res)=>{return res.json()}).then((result)=>{
  this.setState({
    addresList:result.data    ///// invoice address  list show here
  })
})

}



handleChangePage = (event, newPage) => {
  this.setState({page:newPage,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retrive_service_based_invoice_crm_admin_client`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage,
        client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_List_Size:result.length,is_loader_open:false})
    })

  })
};



handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retrive_service_based_invoice_crm_admin_client`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage,
        client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_List_Size:result.length,is_loader_open:false})
    })

  })
};



instantRetriveInvoice=()=>{
  this.setState({is_loader_open:true},()=>{

fetch(`${base.base_url}/retrive_service_based_invoice_crm_admin_client`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search :this.state.search,
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage,
      client_id:this.props.param.singleclient.replace(/:/g,'')
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({invoiceList:result.data,invoice_List_Size:result.length,is_loader_open:false})
  })

  })
  
}



editInvoice=async()=>{
  if(this.state.campaign_id!=="" && this.state.campaign_name!=="" && this.state.bill_date!=="" && this.state.due_date!=="" && this.state.po_no!=="" && this.state.billed_month!==null ){
 this.setState({is_backdrop_open:true},()=>{


    fetch(`${base.base_url}/update_service_based_invoice`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'put',
    body:JSON.stringify({
bill_date:this.state.bill_date,
due_date:this.state.due_date,
billed_month  : this.state.billed_month,
po_no:this.state.po_no,
notes:this.state.notes,
invoice_id:this.state.invoice_id,
sender_address:this.state.sender_address,
beneficiary_name:this.state.beneficiary_name,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.instantRetriveInvoice();
this.setState({
  form_open_edit:false,
  sender_address:"",
  is_backdrop_open:false,
  beneficiary_name:{},
  billed_month  :null ,
  invoice_id:"",
client_id:"",
client_name:"",
bill_date:"",
due_date:"",
po_no:"",
notes:"",
items:[],
payment_received:"0",
});
this.successUpdate();
  })
  
})
  }else{
    this.fail();
  }
 

}



succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Invoice Successfully Added</Typography>, {
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

fail=()=>{
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


successDelete=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Sucessfully deleted</Typography>, {
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


successUpdate=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Sucessfully Updated</Typography>, {
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
    let currentDate  = new Date();
    return (
      <div>

    

<Box sx={{minHeight:300,backgroundColor:'#fff',mt:1,ml:1,mr:1}}>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row',mt:{xs:1,sm:1,md:1},ml:{xs:1,sm:1,md:1}}}>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',mt:1,mb:1,ml:1}}>Invoice</Typography>
<Box>
</Box>

</Box>



<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},ml:2,mr:2}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:1,mt:{xs:1,sm:1,md:1},height:30,marginRight:{xs:1,sm:1,md:0}}}>
    <TextField type='text' fullWidth name='search' onChange={this.handleChangeSearch}  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true,sx:{fontSize:"13px",fontWeight:'600',color:'#666666'}}}  placeholder='Invoice Id' sx={{"& input::placeholder": {
      fontSize: "13px",
      marginLeft:"2px"
    }}}/>
</Box>

<Box sx={{mt:{xs:1,sm:1,md:1}}}>
<Button disabled={this.state.client_role.is_create?false:true} onClick={()=>{this.setState({form_open:true})}} component="label" sx={{textTransform:'none',fontSize:13,height:30,backgroundColor:'#008ffb',ml:{xs:0,sm:0,md:2},fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon  sx={{color:'#fff'}}/>}>
Add Invoice
</Button>
</Box>
</Box>
</Box>




 



<Box sx={{mt:1,padding:1}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Invoice ID</TableCell>
           
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Bill Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Invoice</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Payment Received</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Payment</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Discount</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>PO No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.invoiceList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:row.status=='Fully Paid'?'rgba(3, 110, 41,0.1)':row.status=='Cancel'?'rgba(227, 5, 12,0.1)':row.status=='OverDue'?'rgba(186, 2, 2,0.2)':'#fff'  }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}} >
              <Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}>{row.invoice_id}</Typography></Box>
              </TableCell>
             
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.bill_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',display:'flex'}}>{moment(row.due_date).format('MM-DD-YYYY')} <Box sx={{minHeight:23,display:((Date.parse(currentDate) > Date.parse(row.due_date)) && row.status!=='Fully Paid')? 'flex':'none',justifyContent:'left',alignItems:'center',ml:0.5}}><Typography sx={{paddingLeft:0.3,paddingRight:0.3,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'rgba(196, 8, 27,0.8)'}}>Over Due</Typography></Box> </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:13}}><CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.amount) , 0) - parseInt(row.discounts)   }  /></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:13}}><CountUp start={0} end={row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)   }/></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:13}}><CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.amount) , 0)  - row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0) - parseInt(row.discounts)  }/></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:13}}><CountUp start={0} end={parseInt(row.discounts)}/></TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontWeight:'700',textTransform:'uppercase',fontSize:12}}><Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}>{row.po_no}</Typography></Box></TableCell>
              


              <TableCell align='center' sx={{color:'#42526e'}}>

              <TextField  size='small' value={row.status} onChange={this.handleChange} variant='standard' InputProps={{sx:{fontSize:12,fontWeight:'600'},disableUnderline:true}} sx={{height:15,ml:1}} select>
     {
    invoiceStatus.map((p)=>(
      <MenuItem key={p.id} value={p.status} sx={{fontSize:12,fontWeight:'600', color:'#42526e'}} onClick={()=>{

        fetch(`${base.base_url}/update_invoice_status_service_based`,{
          headers:{
            'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
            'content-type':'application/json',
          },
          method:'put',
          body:JSON.stringify({
            invoice_id:row.invoice_id,
            status:p.status,
          })
        }).then((res)=>{return res.json()}).then((result)=>{
         this.instantRetriveInvoice()
        })

      }}>
        {p.status}
      </MenuItem>
    ))
  }
</TextField>


              </TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small' disabled={this.state.client_role.is_edit?false:true} onClick={()=>{
this.setState({
form_open_edit:true,
invoice_id:row.invoice_id,
campaign_id:row.campaign_id,
campaign_name:row.campaign_name,
billed_month : row.billed_month,
bill_date:row.bill_date,
due_date:row.due_date,
po_no:row.po_no,
notes:row.notes,
beneficiary_name:row.beneficiary_name,
beneficiary_name:row.beneficiary_name,
})
  }}>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>



<Tooltip title="Delete">
  <IconButton disabled={this.state.client_role.is_delete?false:true} onClick={()=>{

this.setState({
  delete_confirmation:true,
  discount:parseInt(row.discounts),
  invoice_id:row.invoice_id,
  client_id:row.client_id,
  total_invoice:row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.amount) , 0)  ,
  amount_paid:row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)
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
          count={this.state.invoice_List_Size}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />

</Box>

<Box sx={{display:this.state.invoiceList.length>0?'none':'flex',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
  <img src={bg} style={{height:170,width:170,opacity:0.5}}/>
  <Typography sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>No Data Found</Typography>
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
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  form_open:false,
  invoice_id:"",
client_id:"",
client_name:"",
bill_date:"",
due_date:"",
po_no:"",
notes:"",
sender_address:{},
beneficiary_name:"",
items:[],
payment_received:"0",
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Create Service Invoice</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Address select<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.beneficiary_name}  name="beneficiary_name" fullWidth size='small'>
{
 this.state.addresList.map((data,index)=>(
<MenuItem key={index} value={data.beneficiary_name} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{
this.setState({sender_address:data,beneficiary_name:data.beneficiary_name})
}}>
{data.beneficiary_name}
</MenuItem>
  ))
}
</TextField>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bill Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.bill_date} name="bill_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.due_date} name="due_date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>PO No.<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'uppercase'}}} value={this.state.po_no}  name="po_no" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}></Typography></Typography>
<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.notes} name="notes"/>

<Button variant='contained' onClick={this.addInvoice} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  Save
</Button>
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








<Box> 
<Modal
  open={this.state.form_open_edit}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  form_open_edit:false,
  invoice_id:"",
client_id:"",
client_name:"",
bill_date:"",
due_date:"",
po_no:"",
notes:"",
sender_address:{},
beneficiary_name:"",
items:[],
payment_received:"0",
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Service Invoice</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Address select<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.beneficiary_name}  name="beneficiary_name" fullWidth size='small'>
{
 this.state.addresList.map((data,index)=>(
<MenuItem key={index} value={data.beneficiary_name} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{
this.setState({sender_address:data,beneficiary_name:data.beneficiary_name})
}}>
{data.beneficiary_name}
</MenuItem>
  ))
}
</TextField>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bill Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={moment(this.state.bill_date).format('YYYY-MM-DD')} name="bill_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type="date" InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.due_date).format('YYYY-MM-DD')} name="due_date" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>PO No.<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}   InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.po_no}  name="po_no" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}></Typography></Typography>
<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.notes} name="notes"/>

<Button variant='contained' onClick={this.editInvoice} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
Edit Apply
</Button>
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

         fetch(`${base.base_url}/delete_service_based_invoice_crm_admin`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({

        invoice_id:this.state.invoice_id,
        client_id:this.state.client_id,
        total_invoice:this.state.total_invoice,
        amount_paid:this.state.amount_paid,
        discount:this.state.discount,

      })
    }).then((res)=>{return res.json()}).then((result)=>{
     this.successDelete();
      this.instantRetriveInvoice();
      this.setState({
        delete_confirmation:false,
        is_backdrop_open:false,
        invoice_id:"",
        client_id:"",
        discount:0,
        total_invoice:0,
        amount_paid:0,
      })
    })
    })
 


  
}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({delete_confirmation:false,client_id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>


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

export default SingleClientServiceInvoice

export function SingleClientServiceInvoicec(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<SingleClientServiceInvoice location={location} param={param} navigate={navigate}></SingleClientServiceInvoice>)
}




const invoiceStatus = [
  {
    id:1,
    status:'Cancel'
  },
  {
    id:1,
    status:'Fully Paid'
  },
  {
    id:2,
    status:'Partially Paid'
  },
  {
    id:4,
    status:'Pending'
  },
]





