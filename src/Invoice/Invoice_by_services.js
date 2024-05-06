import React, { Component } from 'react'
import {Box,Table,TableBody,Backdrop,TableCell,CircularProgress,Button,TableContainer,Paper,TableHead,Modal,TablePagination,MenuItem,TextField,Container,Tooltip,IconButton,Divider,TableRow,Typography} from '@mui/material'
import moment from 'moment';
import base from '../base';
import CountUp from 'react-countup';
import AddIcon from '@mui/icons-material/Add';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { ToastContainer, toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Textarea from '@mui/joy/Textarea';
import {SyncLoader} from 'react-spinners'
import { useNavigate,useLocation,Link } from 'react-router-dom';

export class Invoice_by_services extends Component {


  constructor(props) {
    super(props)
    this.child = React.createRef();
    this.state = {
      form_open:false,
      is_loader_open:false,
      is_loader_open_circle:false,
      edit_form:false,
      addresList:[],
      invoiceList:[],
      clientList : [],
      page:0,
      rowsPerPage:10,
      search:"",
      invoice_list_size:0,
      beneficiaryList : [],




      /////// add invoice
beneficiary_name:"",
sender_address:{},
invoice_id:"",
client_id:"",
client_name:"",
bill_date:"",
due_date:"",
po_no:"",
billed_month:null,


//////////////////// delete invoice  ////////////

////////////// delete data ///////////////

invoice_id_delete: "",
client_id_delete:"",
payment_del:[],
items_del:[],
discount:0,




  invoice_role : JSON.parse(window.sessionStorage.getItem('invoice_role')),
    }
    this.handleChange = this.handleChange.bind(this)
  }

handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}


instantRetriveInvoice=(req,res)=>{
  this.setState({is_loader_open:true},()=>{
    fetch(`${base.base_url}/retriving_service_based_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{

      this.setState({invoiceList:result.data,invoice_list_size:result.count,is_loader_open:false})

    })

  })

}




componentDidMount(){
  this.setState({is_loader_open:true},()=>{
    fetch(`${base.base_url}/retriving_service_based_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{

      this.setState({invoiceList:result.data,invoice_list_size:result.count,is_loader_open:false})

    }).then(()=>{
  fetch(`${base.base_url}/retriveAllClients`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({clientList:result.data})
    })
    })
  })
  this.retriveInvoiceAddress();

}




handleChangePage = (event, newPage) => {
  this.setState({page:newPage,is_loader_open:true},()=>{
     
    fetch(`${base.base_url}/retriving_service_based_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{

      this.setState({invoiceList:result.data,invoice_list_size:result.count,is_loader_open:false})

    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retriving_service_based_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{

      this.setState({invoiceList:result.data,invoice_list_size:result.count,is_loader_open:false})

    })
    
  })
};




task=()=>{
this.setState({
  form_open:true
})

}


retriveInvoiceAddress=()=>{
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
    beneficiaryList:result.data    ///// invoice address  list show here
  })
})
}


addInvoice =()=>{
if(this.state.client_id!=="" && this.state.beneficiary_name!=="" && this.state.client_name!=="" && this.state.bill_date!=="" && this.state.due_date!=="" && this.state.billed_month!==null)
{
  this.setState({is_loader_open_circle:true},()=>{

  fetch(`${base.base_url}/add_service_based_invoice`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
client_id:this.state.client_id,
client_name:this.state.client_name,
bill_date:this.state.bill_date,
due_date:this.state.due_date,
billed_month  :this.state.billed_month,
po_no:this.state.po_no,
notes:this.state.notes,
items:[],

beneficiary_name:this.state.beneficiary_name,
sender_address:this.state.sender_address,

    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.instantRetriveInvoice();
this.setState({form_open:false})
this.setState({
beneficiary_name:"",
sender_address:{},
is_loader_open_circle:false,
invoice_id:"",
billed_month : null,
client_id:"",
client_name:"",
bill_date:"",
due_date:"",
po_no:"",
notes:"",
})
  })

  })

}else{
 this.fillAllFields()
}
  }
  



  handleChangeSearch=(e)=>{
    this.setState({[e.target.name]:e.target.value,is_loader_open:true},()=>{
 fetch(`${base.base_url}/retriving_service_based_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{

      this.setState({invoiceList:result.data,invoice_list_size:result.count,is_loader_open:false})

    })

    })

  }





editApply=()=>{
  if(this.state.client_id!==""&& this.state.beneficiary_name!==""  && this.state.client_name!=="" && this.state.bill_date!=="" && this.state.due_date!=="" && this.state.billed_month!==null )
{
  this.setState({is_loader_open_circle:true},()=>{

  fetch(`${base.base_url}/update_service_based_invoice`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'put',
    body:JSON.stringify({
invoice_id:this.state.invoice_id,
client_id:this.state.client_id,
client_name:this.state.client_name,
billed_month :this.state.billed_month,
bill_date:this.state.bill_date,
due_date:this.state.due_date,
po_no:this.state.po_no,
notes:this.state.notes,

beneficiary_name:this.state.beneficiary_name,
sender_address:this.state.sender_address,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.instantRetriveInvoice();
this.invoiceUpdated();
this.setState({
  edit_form:false,
  is_loader_open_circle:false,
  beneficiary_name:"",
 sender_address:{},
 billed_month : null,
  invoice_id:"",
client_id:"",
client_name:"",
bill_date:"",
due_date:"",
po_no:"",
notes:"",
})
  })

  })

}else{
  this.fillAllFields();
}
}


getAlert=()=>{
 this.setState({
  form_open:true
 })
}




statusUpdated=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Status Updated</Typography>, {
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


invoiceDeleted=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Invoice Deleted</Typography>, {
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


invoiceUpdated=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Invoice Updated</Typography>, {
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
    const currentDate = new Date();
    return (
      <div>
<Box>

<Box sx={{display:'flex',justifyContent:'right',mt:{xs:-2,sm:-3,md:-3},mb:2}}>
<Box sx={{display:'flex',justifyContent:'right',alignItems:'right',borderRadius:2,height:30}}>
<TextField  name='search' sx={{backgroundColor:'#f8f9ff',width:250,borderRadius:1}} onChange={this.handleChangeSearch} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191',}}/>, disableUnderline:true}}  placeholder='invoice id'/>
</Box>
</Box>


<TableContainer component={Box}>
      <Table sx={{minWidth:1520 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr no</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Invoice ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Client Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Bill Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Invoice</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Payment Received</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due </TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Discount </TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>PO No.</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.invoiceList.map((row,index) => (

            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:row.status=='Fully Paid'?'rgba(3, 110, 41,0.1)':row.status=='Cancel'?'rgba(227, 5, 12,0.1)':row.status=='OverDue'?'rgba(186, 2, 2,0.2)':'#fff' }}
            >{
              //// onClick={()=>this.props.navigate('/invoice/serviceInvoice/:'+row.invoice_id)}
            }
            <TableCell align='left' sx={{color:'#42526e'}}>{this.state.page * this.state.rowsPerPage + index + 1}</TableCell>
              <TableCell component="th"   scope="row" sx={{color:'#42526e'}}  >
              <Box sx={{minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}><Link style={{color:'#fff'}} to={`/invoice/serviceInvoice/:${row.invoice_id}`} sx={{color:'#fff'}}>{row.invoice_id}</Link> </Typography></Box> 
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.client_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.bill_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',display:'flex'}}>{moment(row.due_date).format('MM-DD-YYYY')} <Box sx={{display:((Date.parse(currentDate) > Date.parse(row.due_date)) && row.status!=='Fully Paid')? 'flex':'none',justifyContent:'left',alignItems:'center',ml:0.5}}><Typography sx={{paddingLeft:0.3,paddingRight:0.3,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'rgba(196, 8, 27,0.8)'}}>Over Due</Typography></Box> </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>$<CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.amount) , 0) - parseInt(row.discounts) }  />  </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>$<CountUp start={0} end={row.payments?  row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)  : 0} /></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>$<CountUp start={0} end={row.items?  row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.amount) , 0)  - row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0) - parseInt(row.discounts)   :0 }/></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>${parseInt(row.discounts)}</TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontWeight:'700',textTransform:'uppercase',fontSize:12}}><Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}>{row.po_no}</Typography></Box></TableCell>
              
              <TableCell align='center' sx={{color:'#42526e'}} >

              <TextField  size='small' SelectProps={{MenuProps:{sx:{height:300}}}} value={row.status} onChange={this.handleChange} variant='standard' InputProps={{sx:{fontSize:12,fontWeight:'600'},disableUnderline:true}} sx={{height:15,ml:1}} select>
     {
     invoiceStaus.map((p)=>(
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
       this.instantRetriveInvoice();
       this.statusUpdated()
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
  <IconButton disabled={this.state.invoice_role.is_edit?false:true} onClick={()=>{
   
   this.setState({
    edit_form:true,
    invoice_id:row.invoice_id,
    client_id:row.client_id,
    client_name:row.client_name,
    bill_date:row.bill_date,
    due_date:row.due_date,
    billed_month:row.billed_month,
    po_no:row.po_no,
    notes:row.notes,
    sender_address:row.sender_address,
    beneficiary_name:row.beneficiary_name,
   })

   } } size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete">
  <IconButton disabled={this.state.invoice_role.is_delete?false:true} onClick={()=>{

this.setState({
delete_confirmation:true,
 invoice_id_delete: row.invoice_id,
 client_id_delete:row.client_id,
 payment_del:row.payments,
 items_del:row.items,
 discount:parseInt(row.discounts),
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
          rowsPerPageOptions={[1, 10, 25]}
          component="div"
          count={this.state.invoice_list_size}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />


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
  this.setState({is_loader_open_circle:true},()=>{

  fetch(`${base.base_url}/delete_service_based_invoice_crm_admin`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
        invoice_id:this.state.invoice_id_delete,
        client_id:this.state.client_id_delete,
        discount:this.state.discount,
        total_invoice:this.state.items_del.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.amount) , 0)  ,
        amount_paid:this.state.payment_del.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.instantRetriveInvoice();
      this.invoiceDeleted()
      this.setState({
        delete_confirmation:false,
        is_loader_open_circle:false,
        invoice_id_delete:"",
        client_id_delete:"",
        items_del:[],
        payment_del:[],
        discount:0,
      })
    })

  })
  

}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({delete_confirmation:false,client_id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>


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

</Box>

</Box>
</Paper>
</Box>
</Modal>
</Box>



{//////////////////////////// add service invoice form
}



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
beneficiary_name:"",
sender_address:{},
invoice_id:"",
client_id:"",
client_name:"",
bill_date:"",
due_date:"",
po_no:"",
billed_month:null,
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Create Service Invoice</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Client Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} SelectProps={{MenuProps:{sx:{height:300}}}} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="client_name" fullWidth size='small'>
{
 this.state.clientList.map((data,index)=>(
<MenuItem key={index} value={data.client_name} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{
this.setState({client_id:data.client_id,client_name:data.client_name})
}}>
{data.client_name}
</MenuItem>

  ))
}
</TextField>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bill Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  type='Date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.bill_date} name="bill_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type='Date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.due_date} name="due_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Billed Month<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type='month' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.billed_month).format('YYYY-MM')} name='billed_month' fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>PO No.<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  onChange={(e)=>this.setState({po_no:(e.target.value).toUpperCase()})}  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'uppercase'}}} value={this.state.po_no}  name="po_no" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Address select<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} SelectProps={{MenuProps:{sx:{height:300}}}} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.beneficiary_name}  name="beneficiary_name" fullWidth size='small'>
{
this.state.beneficiaryList.map((data,index)=>(
<MenuItem key={index} value={data.beneficiary_name} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{
this.setState({sender_address:data,beneficiary_name:data.beneficiary_name})
}}>
{data.beneficiary_name}
</MenuItem>
  ))
}
</TextField>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}></Typography></Typography>
<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.notes} name="notes"/>

<Button variant='contained' onClick={this.addInvoice} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>

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


</Box>
</Box>
</Paper>
  </Box>
</Modal>
</Box>





<Box> 
<Modal
  open={this.state.edit_form}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
edit_form:false,
beneficiary_name:"",
sender_address:{},
invoice_id:"",
client_id:"",
client_name:"",
bill_date:"",
due_date:"",
po_no:"",
notes:"",
billed_month:null
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Service Invoice</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bill Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="date" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={moment(this.state.bill_date).format('YYYY-MM-DD')} name="bill_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type="date" InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.due_date).format('YYYY-MM-DD')} name="due_date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Billed Month<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type='month' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.billed_month).format('YYYY-MM')} name='billed_month' fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Beneficiary Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} SelectProps={{MenuProps:{sx:{height:300}}}} select value={this.state.beneficiary_name} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="beneficiary_name" fullWidth size='small'>
{
 this.state.beneficiaryList.map((data,index)=>(
<MenuItem key={index} value={data.beneficiary_name} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{
this.setState({sender_address:data,beneficiary_name:data.beneficiary_name})
}}>
{data.beneficiary_name}
</MenuItem>
  ))
}
</TextField>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row',textTransform:'uppercase'}}>PO No.<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={(e)=>this.setState({po_no:(e.target.value).toUpperCase()})}  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.po_no}  name="po_no" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}></Typography></Typography>

<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.notes} name="notes"/>


<Button variant='contained' onClick={this.editApply} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
 Edit Apply
</Button>


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

export default Invoice_by_services


export function Invoice_by_servicesc(props){
  const navigate = useNavigate();
  const location = useLocation();

  return (<Invoice_by_services  location={location} navigate={navigate}></Invoice_by_services>)
}


const invoiceStaus = [
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






