import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Checkbox, Grid, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import logo from '../img/logo.jpeg'
import {Tooltip,IconButton,TableBody,Menu,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch,Link, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import base from '../../src/base'
import moment from 'moment'
import Textarea from '@mui/joy/Textarea';
import {ClimbingBoxLoader, SyncLoader} from 'react-spinners'
import base_url from '../../src/base';
import { ToastContainer, toast } from 'react-toastify';
const drawerWidth = 240;

export class Invoice_by_service_details extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:false,
       open_loader_for_edit_page_popup:false,
       form_open:false,
       anchorEl : null,
      open: false,
      form_open_for_invoice_to_client: false,
      client_id:'',
      campaignList:[],   //// only live compaign
      is_discount_add_form_open:false,
      item_update_form:false,


      itemsList:[],
      payments:[],
      /////////////// single invoice details / ////
   
      singleInvoiceDetails : {},
      sngleClientDetails:{},
      client_billing_details:{},
      invoice_sender_address:{},




   /////////////////////////////////////////
  /////////////// add item in list 

  item_name:"",
  amount:"",
  quentity:"",
  note:"",


////////////////// discount section /////////
 has_discount : false,
 discount_amt : 0,
 pre_discount_amt : 0,
 discount_ref:0,

///////// payments /////////////

payment_method:"",
payment_date:"",
payment_amount:0,
notes:""

















    }
    this.setAnchorEl = this.setAnchorEl.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
  
  }

handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value});
}







retriveSingleClientInvoiceDetails=()=>{

  this.setState({is_loader_open:true},()=>{
  fetch(`${base.base_url}/retriveSingleInvoiceDetails_service_based`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
  invoice_id:this.props.param.invoiceid.replace(/:/g,'')
    })
  }).then((res)=>{return res.json()}).then((resultt)=>{

    this.setState({
      invoice_sender_address:resultt.data.sender_address,singleInvoiceDetails:resultt.data,itemsList:resultt.data.items,payments:resultt.data.payments,is_loader_open:false,discount_amt:parseInt(resultt.data.discounts),has_discount:resultt.data.has_discount
    })
  })

  })

}



  componentDidMount(){ 
 
    this.setState({
      is_loader_open:true
    },()=>{
       fetch(`${base.base_url}/retriveSingleInvoiceDetails_service_based`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
        invoice_id:this.props.param.invoiceid.replace(/:/g,'')
        })
      }).then((res)=>{return res.json()}).then((resultt)=>{

        this.setState({invoice_sender_address:resultt.data.sender_address,singleInvoiceDetails:resultt.data,itemsList:resultt.data.items,payments:resultt.data.payments,discount_amt:parseInt(resultt.data.discounts),has_discount:resultt.data.has_discount},()=>{
          
          
          fetch(`${base.base_url}/getSingleClientData`,{
            headers:{
              'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
              'content-type':'application/json',
            },
            method:'post',
            body:JSON.stringify({
             client_id:resultt.data.client_id
            })
          }).then((res)=>{return res.json()}).then((result)=>{
            this.setState({
              sngleClientDetails:result.data,
              client_billing_details:result.data.billing_info,
              is_loader_open:false
            })
          })
        });
      })

    })
      
  }



  handleClick(event) {
    this.setAnchorEl(event.currentTarget);
}
    setAnchorEl(value){
        this.setState({
            anchorEl: value,
            open: !this.state.open
        })
    }
handleClose=() =>{
    this.setAnchorEl(null);
    this.setState({form_open_for_invoice_to_client:true})
}




sendEmailInvoiceToClient=()=>{
  this.setState({open_loader_for_edit_page_popup:true,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retriveSingleInvoiceDetails_service_based`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      invoice_id:this.props.param.invoiceid.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((invoice_data_details)=>{


    fetch(`${base.base_url}/createInvoiceWithAttachments_service_based`,{
     headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
       'content-type':'application/json',
     },
     method:'post',
     body:JSON.stringify({
      invoice_id:this.props.param.invoiceid.replace(/:/g,''),
       invoice_data : invoice_data_details.data,
       client_billing_details :this.state.client_billing_details,
     })
   }).then((res)=>{return res.json()}).then((result)=>{
   this.setState({open_loader_for_edit_page_popup:false,is_loader_open:false},()=>{
     this.MailSend();
   }) 
   });
   })

  })


}



printInvoice=()=>{
  
  this.setState({open_loader_for_edit_page_popup:true,is_loader_open:true},()=>{
    fetch(`${base.base_url}/retriveSingleInvoiceDetails_service_based`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      invoice_id:this.props.param.invoiceid.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((invoice_data_details)=>{

       fetch(`${base.base_url}/createInvoice_service_based`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
                },
      method:'post',
      body:JSON.stringify({
         invoice_id:this.props.param.invoiceid.replace(/:/g,''),
         invoice_data:invoice_data_details.data,
         client_billing_details :this.state.client_billing_details,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({open_loader_for_edit_page_popup:false,is_loader_open:false})
      window.open(`${base_url.base_url}/${result.path}.pdf`)
      //this.handleClose();
    })
    });

  })
  

}



  renderMenu(){
    return(
    <Menu id="fade-menu" onClick={this.handleClose} anchorEl={this.state.anchorEl} open={this.state.open}  sx={{mt:1}}>
        <MenuItem  sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}} onClick={this.sendEmailInvoiceToClient}>Email Invoice To Client</MenuItem>
        <MenuItem onClick={this.printInvoice} sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}} >Download PDF</MenuItem>
        <MenuItem onClick={this.statusChange} sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}}>Mark As Cancel</MenuItem>
        
      </Menu>
     )
  }





  actionForCloseInvoice=()=>{

    this.handleClose();
    this.setState({is_loader_open:true},()=>{
      
       fetch(`${base.base_url}/update_invoice_status_service_based`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'put',
      body:JSON.stringify({
        invoice_id:this.props.param.invoiceid.replace(/:/g,''),
        status:'Fully Paid',
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.retriveSingleClientInvoiceDetails();
    this.setState({is_loader_open:false});
    this.invoiceStatusUpdated();
    })
    })

  }




statusChange=()=>{

  this.handleClose();
  this.setState({is_loader_open:true},()=>{

     fetch(`${base.base_url}/update_invoice_status_service_based`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'put',
    body:JSON.stringify({
      invoice_id:this.props.param.invoiceid.replace(/:/g,''),
      status:'Cancel',
    })
  }).then((res)=>{return res.json()}).then((result)=>{
  this.retriveSingleClientInvoiceDetails();
  this.setState({is_loader_open:false});
  this.invoiceStatusUpdated();
  })
  })

}




MailSend=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Mail sent</Typography>, {
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

ItemAdded=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Item Added</Typography>, {
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


discountRemoved=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Discount Removed</Typography>, {
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


ItemDeleted=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Item Removed</Typography>, {
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


PaymantAdded=()=>{
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

zeropaymentNotadd=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Zero Payment Can't Add</Typography>, {
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



fillAllFields=()=>{
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


invoiceStatusUpdated=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Invoice status updated</Typography>, {
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




discountAdded=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Discount Added</Typography>, {
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


itemRemoved=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Item Removed</Typography>, {
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
///////////// this total amount to pay ///////////////////////////


let total_Amount = 0;

for (let i = 0; i < this.state.itemsList.length; i++) {
  total_Amount = total_Amount + (parseInt(this.state.itemsList[i].amount) * parseInt(this.state.itemsList[i].quentity))
}
///////////////// payment done amount ////////////

let total_payment_done = 0
for (let i = 0; i < this.state.payments.length; i++) {
  total_payment_done = total_payment_done + (parseInt(this.state.payments[i].payment_amount))
 }

let finalPaymentRemains =  total_Amount - total_payment_done - parseInt(this.state.discount_amt) ;



   

    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Invoice Details</Typography>

<Paper sx={{height:50,backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between',}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Invoice Details</Typography>
</Box>

<Box sx={{display:'flex',alignItems:'center',mr:{xs:1,sm:2,md:3}}}>
<Box>
<Button aria-owns={this.state.open ? 'fade-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} sx={{textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600',mr:1}} disableElevation variant="contained">
Action
</Button>
{this.renderMenu()}
</Box>
<Button onClick={()=>this.setState({form_open:true,payment_amount:finalPaymentRemains})} sx={{textTransform:'none',height:30,fontWeight:'600',}} disableElevation variant="outlined" startIcon={<AddIcon sx={{color:'primary'}}/>}>
Add Payment
</Button>

</Box>
</Paper>



<Box sx={{mt:2}}>
<Grid container spacing={1} columnSpacing={2}>
<Grid item xs={12} sm={12} md={9}>
<Box sx={{minHeight:400}}>
<Paper component={Grid} sx={{minHeight:800,width:'100%',backgroundColor:'#fff'}}>

<Grid container  columnSpacing={2}>
<Grid item xs={6}>
<Box sx={{backgroundColor:'#fff',minHeight:200,display:'flex',justifyContent:'left',flexDirection:'column'}}>
<Box sx={{minHeight:100,width:'70%',backgroundColor:'#fff',mt:5,ml:{xs:'2%',sm:'5%',md:'8%'},display:'flex',justifyContent:'left',alignItems:'center'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',ml:2}}>
<img src={logo} style={{height:120,objectFit:'contain'}}/>
  </Box>
</Box>

<Box sx={{minHeight:60,width:'85%',backgroundColor:'#fff',mt:2,ml:'8%',display:'flex',flexDirection:'column'}}>
<Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row',ml:0.5}}> From,</Typography>
<Typography sx={{fontWeight:'600',mt:0.3,mb:0.3,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}><Typography sx={{fontSize:{xs:11,sm:12},fontWeight:'700',color:'#404040',ml:0.5,textTransform:'capitalize'}}>First Connect Digital,</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.3,mb:0.3,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}><Typography sx={{fontSize:{xs:11,sm:12},fontWeight:'700',color:'#404040',ml:0.5,textTransform:'capitalize'}}>{this.state.invoice_sender_address?this.state.invoice_sender_address.area:""}, {this.state.invoice_sender_address?this.state.invoice_sender_address.city:""}, {this.state.invoice_sender_address?this.state.invoice_sender_address.state:""}, {this.state.invoice_sender_address?this.state.invoice_sender_address.country:""} - {this.state.invoice_sender_address?this.state.invoice_sender_address.pincode:""}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.3,mb:0.3,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}><Typography sx={{fontSize:{xs:11,sm:12},fontWeight:'700',color:'#404040',ml:0.5,textTransform:'capitalize'}}>{this.state.invoice_sender_address?this.state.invoice_sender_address.email:""}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.3,mb:0.3,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}><Typography sx={{fontSize:{xs:11,sm:12},fontWeight:'700',color:'#404040',ml:0.5,textTransform:'capitalize'}}>{this.state.invoice_sender_address?this.state.invoice_sender_address.phone_no:""}</Typography></Typography>
</Box>

</Box>
</Grid>
<Grid item xs={6}>
<Box sx={{backgroundColor:'#fff',minHeight:200,width:'100%',display:'flex',justifyContent:'right',flexDirection:'column'}}>
<Box sx={{minHeight:10,backgroundColor:'#fff',mt:5,mr:'8%',display:"flex",justifyContent:'right'}}>
<Box sx={{minWidth:110,height:40,display:'flex',backgroundColor:'#d9d9d9',justifyContent:'center',alignItems:'center'}}>
<Typography sx={{fontWeight:'700',fontSize:16,ml:0.5,mr:0.5}}>{
this.props.param.invoiceid.replace(/:/g,'')
}</Typography>
</Box>
</Box>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:13,sm:14},mt:2,display:this.state.singleInvoiceDetails.po_no==""?'none':'flex',flexDirection:'row',justifyContent:'right',mr:'8%'}}>PO CODE<Typography sx={{fontSize:12,fontWeight:'700',color:'#404040',ml:0.5}}>: {this.state.singleInvoiceDetails.po_no}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row',justifyContent:'right',mr:'8%'}}>Bill Date<Typography sx={{fontSize:12,fontWeight:'700',color:'#404040',ml:0.5}}>: {moment(this.state.singleInvoiceDetails.bill_date).format('DD-MM-YYYY')}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row',justifyContent:'right',mr:'8%'}}>Due Date<Typography sx={{fontSize:12,fontWeight:'700',color:'#404040',ml:0.5}}>: {moment(this.state.singleInvoiceDetails.due_date).format('DD-MM-YYYY')}</Typography></Typography>
   
<Box sx={{minHeight:60,width:'90%',backgroundColor:'#fff',mt:2,ml:'8%',display:'flex',flexDirection:'column'}}>
    <Typography sx={{fontWeight:'600',color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>Bill To,</Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:11,sm:12},display:'flex',flexDirection:'row'}}>{this.state.client_billing_details.billing_name},</Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:11,sm:12},display:'flex',flexDirection:'row'}}>{this.state.client_billing_details.billing_address},</Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:11,sm:12},display:'flex',flexDirection:'row'}}>{this.state.client_billing_details.billing_city},{this.state.client_billing_details.billing_state}</Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:11,sm:12},display:'flex',flexDirection:'row'}}>{this.state.client_billing_details.billing_postal_code},</Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:11,sm:12},display:'flex',flexDirection:'row'}}>{this.state.client_billing_details.billing_email_id},</Typography>

</Box>


</Box>
</Grid>
</Grid>

<br/>
<br/>

<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table size="small" aria-label="a dense table">
     
        <TableHead sx={{backgroundColor:'#d3e2f8'}}>
          <TableRow sx={{borderTop:1,borderBottom:1}}>
          <TableCell align='left' sx={{fontSize:12,fontWeight:'600',color:'#4a3e40',borderRight:1,width:'5%'}}>NO</TableCell>
            <TableCell align='left' sx={{fontSize:12,fontWeight:'600',color:'#4a3e40',borderRight:1,width:'40%'}}>DESCRIPTION</TableCell>
            <TableCell align='center' sx={{fontSize:12,fontWeight:'600',color:'#4a3e40',borderRight:1}}>AMOUNT</TableCell>
            <TableCell align='center' sx={{fontSize:12,fontWeight:'600',color:'#4a3e40',borderRight:1}}>QTY</TableCell>
            <TableCell align='center' sx={{fontSize:12,fontWeight:'600',color:'#4a3e40',borderRight:1}}>TOTAL AMOUNT</TableCell>
            <TableCell align='right' sx={{fontSize:12,fontWeight:'600',color:'#4a3e40'}}>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.itemsList.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:i %2 ?'#f9f9f9':'#fff' }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#42526e',fontWeight:'600',fontSize:12,width:'5%',borderRight:1}}  >
              {i+1}
              </TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontWeight:'600',fontSize:12,width:'40%',borderRight:1,textTransform:'uppercase'}}>{row.item_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:12,borderRight:1}}>{(row.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:12,borderRight:1}}>{(row.quentity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:12,borderRight:1}}>{(row.amount * row.quentity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'600',fontSize:12}}>
              <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>

<Tooltip title="Delete" >
  <IconButton sx={{mr:2}} size='small' onClick={()=>{

fetch(`${base.base_url}/delete_item_service_based`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'delete',
  body:JSON.stringify({
    client_id:this.state.singleInvoiceDetails.client_id,
    quentity:row.quentity,
    amount : row.amount,
    id:row.id,
    invoice_id:this.props.param.invoiceid.replace(/:/g,'')
  })
}).then((res)=>{return res.json()}).then((result)=>{
  this.itemRemoved()
  this.retriveSingleClientInvoiceDetails();
 this.setState({itemsList:result.data});
})

}}>
<DeleteForeverIcon sx={{color:'#f29494',height:15,width:15}}/>
</IconButton>
</Tooltip>

 </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
</Box>


<Box sx={{display:'flex',justifyContent:'space-between',padding:2}}>
  <Box>
<Button size='small' onClick={()=>this.setState({item_add_form:true})} startIcon={<AddIcon sx={{color:'#fff'}}/>} variant='contained' disableElevation sx={{height:30,textTransform:'none'}}>Add more</Button>
<Box sx={{display:'flex',mt:2}}>
  <Checkbox size='small' checked={this.state.has_discount}  onChange={()=>this.state.has_discount? this.setState({has_discount:false,is_loader_open:true,pre_discount_amt:this.state.discount_amt},()=>{
   

   fetch(`${base.base_url}/update_discount_for_service_based_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({

     client_id:this.state.singleInvoiceDetails.client_id,
     invoice_id:this.props.param.invoiceid.replace(/:/g,''),
     pre_discount_amt :this.state.discount_amt,
     discount_amt : 0,
     has_discount:false,


      })
    }).then((res)=>{return res.json()}).then((ssp)=>{
    this.setState({
      is_discount_add_form_open:false ,
      is_loader_open:false,
    },()=>{

      this.retriveSingleClientInvoiceDetails();

    })

     this.discountRemoved();
     
    })

  
  }):this.setState({has_discount:true})}/> 
  <Typography sx={{fontSize:12,fontWeight:'600',mr:1,mt:1.4}}>Discounts?</Typography>
</Box>


<br/>
<br/>


<Box sx={{minHeight:60,backgroundColor:'#fff',padding:2,display:'flex',flexDirection:'column'}}>
    <Typography sx={{fontWeight:'700',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:12,display:'flex',flexDirection:'row'}}>Beneficiary Name<Typography sx={{color:'#4a3e40',fontSize:12,fontWeight:'700',ml:1}}>: {this.state.invoice_sender_address?this.state.invoice_sender_address.beneficiary_name:""}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:12,display:'flex',flexDirection:'row'}}>Account No<Typography sx={{color:'#4a3e40',fontSize:12,fontWeight:'500',ml:1}}>: {this.state.invoice_sender_address?this.state.invoice_sender_address.bank_account_no:""}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:12,display:'flex',flexDirection:'row'}}>Bank Name<Typography sx={{color:'#4a3e40',fontSize:12,fontWeight:'500',ml:1}}>: {this.state.invoice_sender_address?this.state.invoice_sender_address.bank_name:""}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:12,display:'flex',flexDirection:'row'}}>Swift Code<Typography sx={{color:'#4a3e40',fontSize:12,fontWeight:'500',ml:1}}>: {this.state.invoice_sender_address?this.state.invoice_sender_address.swift_code:""}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:12,display:'flex',flexDirection:'row'}}>Bank Address<Typography sx={{color:'#4a3e40',fontSize:12,fontWeight:'500',ml:1}}>: {this.state.invoice_sender_address?this.state.invoice_sender_address.bank_address:""}</Typography></Typography>
</Box>





</Box>



<Box sx={{minHeight:60,backgroundColor:'#fff',mt:2,ml:'8%',display:'flex',flexDirection:'column'}}>
    <Typography sx={{fontWeight:'600',color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>Sub Total<Typography sx={{color:'#4a3e40',fontSize:{xs:13,sm:14},fontWeight:'600',ml:1}}>: $ {(total_Amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Typography></Typography>
<Divider/>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:1,color:'#4a3e40',fontSize:{xs:13,sm:14},display:this.state.has_discount?'flex':'none',flexDirection:'row',mt:2}}>Discount<Typography sx={{color:'#4a3e40',fontSize:{xs:13,sm:14},fontWeight:'600',ml:1}}>: $ {this.state.discount_amt}<IconButton onClick={()=>this.setState({is_discount_add_form_open:true,discount_ref:parseInt(this.state.discount_amt),pre_discount_amt : parseInt(this.state.discount_amt)})} sx={{backgroundColor:'#f2f8ff ',ml:1.5}} size='small'><DriveFileRenameOutlineIcon color='primary' sx={{height:17,width:17}}/></IconButton></Typography></Typography>
<Divider/>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row',mt:2}}>Due Balence<Typography sx={{color:'#4a3e40',fontSize:{xs:13,sm:14},fontWeight:'600',ml:1}}>: $ {finalPaymentRemains.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Typography></Typography>
</Box>
</Box>
</Paper>
</Box>
</Grid>



<Grid item  xs={12} sm={12} md={3}>
<Box sx={{minHeight:400}}>
<Paper sx={{minHeight:600,width:'100%',backgroundColor:'#fff'}}>
<br/>

<Box sx={{minHeight:60,backgroundColor:'#fff',padding:2,display:'flex',flexDirection:'column'}}>
    <Typography sx={{fontWeight:'600',color:'#4a3e40',mt:0.5,mb:0.5,fontSize:14,display:'flex',flexDirection:'row'}}>Client Name : <Typography sx={{color:'#259efa',fontSize:13,fontWeight:'500',ml:1}} >: {this.state.sngleClientDetails?this.state.sngleClientDetails.client_name:""}</Typography></Typography>
    <Typography sx={{fontWeight:'700',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:13,display:'flex',flexDirection:'row'}}>Status : <Typography sx={{color:'#fff',backgroundColor:'#259efa',pl:0.5,pr:0.5,fontSize:14,fontWeight:'600',ml:1}}> {this.state.singleInvoiceDetails.status}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:14,display:'flex',flexDirection:'row'}}>Due Date<Typography sx={{color:'#4a3e40',fontSize:14,fontWeight:'500',ml:1}}>: {moment(this.state.singleInvoiceDetails.due_date).format('DD-MM-YYYY')}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:14,display:'flex',flexDirection:'row'}}>Reminder<Typography sx={{color:'#4a3e40',fontSize:14,fontWeight:'500',ml:1}}>: </Typography></Typography>
</Box>

</Paper>
</Box> 
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






{
  ////// add payments
}

<Box> 
<Modal
  open={this.state.form_open}  ////    for payments add and serverved
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'55%',lg:'30%'},height:'80vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  form_open:false,
  payment_method:"",
  payment_date:"",
  payment_amount:0,
  notes:""
  
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Payment</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Payment Method<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.payment_method}  name="payment_method" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Payment Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.payment_date} name="payment_date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Amount<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={
(e)=>{

  let input = e.target.value ;
if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) ){
  if( parseInt(e.target.value)<= finalPaymentRemains){
   this.setState({payment_amount:parseInt(e.target.value)}) 
  }

}
 
  }
} type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.payment_amount} name="payment_amount" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}></Typography></Typography>
<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.notes} name="notes"/>



<Button onClick={()=>{

  
if(parseInt(this.state.payment_amount)==0){
  this.zeropaymentNotadd();
}else{



if(this.state.payment_method!=="" && this.state.payment_amount!==0  && (parseInt(this.state.payment_amount) > 0) && this.state.payment_date!=""){
  
 this.setState({is_loader_open:true},()=>{

  fetch(`${base.base_url}/add_payments_service_based_invoice`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id:this.state.singleInvoiceDetails.client_id,
      invoice_id:this.state.singleInvoiceDetails.invoice_id,
      client_name:this.state.singleInvoiceDetails.client_name,
      payment_method:this.state.payment_method,
      payment_date:this.state.payment_date,
      payment_amount:this.state.payment_amount,
      note:this.state.notes,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.retriveSingleClientInvoiceDetails();
this.setState({
  form_open:false,
  payment_method:"",
  payment_date:"",
  payment_amount:0,
  notes:""
});
this.PaymantAdded();
  })

})
  
}else{
 this.fillAllFields();
}



}

}} variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>


<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_loader_open}
  //this.state.is_loader_open
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





{

  /////// add item in list 
}

<Box> 
<Modal
  open={this.state.item_add_form}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'80vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  item_add_form:false,
  item_name:"",
  amount:"",
  quentity:"",
  note:"",
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

 
<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Items</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Item Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.item_name}  name="item_name" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Amount<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='number'  onChange={(e)=>{

let input = e.target.value ;
if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) ){
this.setState({amount:parseInt(e.target.value)})
}
}
} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.amount} name="amount" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Quantity<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='number' onChange={(e)=>{
let input = e.target.value ;
if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) ){
this.setState({quentity:parseInt(e.target.value)})
}
}} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.quentity} name="quentity" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}></Typography></Typography>
<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.note} name="note"/>

<Button onClick={()=>{
if(this.state.item_name!=="" && parseInt(this.state.amount) > 0 &&  parseInt(this.state.quentity) > 0 ){
let item_id = Math.round(Math.random() * 1000004004388) + Math.round(Math.random() * 10347764388)  + Math.round(Math.random() * 904877764388)
this.setState({is_loader_open:true},()=>{
  this.setState(prevState => ({
    itemsList: [...prevState.itemsList,{   
      id: item_id,
      item_name:this.state.item_name,
      quentity:this.state.quentity,
      amount:this.state.amount,
      note:this.state.note,
         }] 
   }),()=>{
///// send data to save in server 

    fetch(`${base.base_url}/add_item_for_sevice_invoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        id: item_id,
        client_id:this.state.singleInvoiceDetails.client_id,
        invoice_id : this.props.param.invoiceid.replace(/:/g,''),
        item_name:this.state.item_name,
        quentity:this.state.quentity,
        amount:this.state.amount,
        note:this.state.note,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.retriveSingleClientInvoiceDetails()
    this.setState({
      item_add_form:false,
      item_name:"",
      quentity:"",
      amount:"",
      note:"",
    });


   // this.ItemAdded()
 

    })

   })

  })


}else{
this.fillAllFields()
}


}} variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>



<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_loader_open}
  //this.state.is_loader_open
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
<Modal
  open={this.state.is_discount_add_form_open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'50%',lg:'30%'},height:'25vh',backgroundColor:'white',borderRadius:2}}>
<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>{this.setState({
is_discount_add_form_open:false
  })
  }} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>
<Typography sx={{fontSize:16,fontWeight:'600',padding:0.2,ml:2,display:'flex',flexDirection:'row'}}>Add Discounts</Typography>

<Box sx={{ml:'5%',mr:'5%',mt:1}}>
  <TextField type='number' name='discount_ref' value={this.state.discount_ref} onChange={(e)=>{

let input = e.target.value ;
if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) ){

if(e.target.value <= finalPaymentRemains && e.target.value >= 0 ){
   this.setState({discount_ref:parseInt(e.target.value,10)})
}

}
  }
  } fullWidth size='small' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} />
</Box>

<Box sx={{display:'flex',justifyContent:'right',mr:3,mt:1.5}}>
<Button onClick={()=>{

  if(this.state.discount_ref >= 0){

    this.setState({is_loader_open:true},()=>{

 fetch(`${base.base_url}/update_discount_for_service_based_invoice`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
client_id:this.state.singleInvoiceDetails.client_id,
invoice_id:this.props.param.invoiceid.replace(/:/g,''),

pre_discount_amt :this.state.pre_discount_amt,
discount_amt : this.state.discount_ref,

has_discount:this.state.has_discount,
  })
}).then((res)=>{return res.json()}).then((ssp)=>{

this.retriveSingleClientInvoiceDetails();

this.setState({
  is_discount_add_form_open:false,
})


 this.discountAdded();

})


    })


      

  }else{
    alert('Add Discount 0 not allow')
  }

  
  }}  variant='contained'  disableElevation sx={{display:'flex',flexDirection:'row',justifyContent:'right',textTransform:'none',height:30}}>
  Add Discount
</Button>


<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_loader_open}
  //this.state.is_loader_open
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>
</Box>
</Box>

</Paper>
</Box>
</Modal>
</Box>


{
  ////// item update form  in voice /////////////////
}









<Box> 
<Modal
  open={this.state.item_update_form}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'80vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  item_update_form:false,
  item_id:"",
  campain_name:"", 
  campain_id:"",
  costPerLead:'',
  quentity:"",
  notes:""
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Update Items</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Campaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text'  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.campain_name}  name="campain_name" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Enter Quantity<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='number' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.quentity} name="quentity" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Cost Per Lead<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.costPerLead} name="costPerLead" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}>*</Typography></Typography>


<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.notes} name="notes"/>

<Button onClick={()=>{

  /*
if(this.state.campain_name!=="" && this.state.campain_id!=="" &&  this.state.costPerLead!=="" && this.state.quentity!=="" ){

///// data update to server  /////////
    fetch(`${base.base_url}/updateItem`,{
      headers:{
        'content-type':'application/json',
      },
      method:'put',
      body:JSON.stringify({
        id: this.state.item_id,
        invoice_id : this.props.param.invoiceid.replace(/:/g,''),
        campaignName:this.state.campain_name,
        campaignId:this.state.campain_id,
        costPerLead:this.state.costPerLead,
        quentity:this.state.quentity,
        notes:this.state.notes,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({
      item_update_form:false,
      item_id:"",
      campain_name:"", 
      campain_id:"",
      costPerLead:'',
      quentity:"",
      notes:""
    });
    this.ItemAdded();
    this.instantRetriveCampaign();
    })
}else{
this.fillAllFields()
}

*/
}} variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>

</Box>
</Box>
</Paper>
  </Box>
</Modal>
</Box>





<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_loader_open}
  //this.state.is_loader_open
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

export default Invoice_by_service_details
export function Invoice_by_service_detailsc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<Invoice_by_service_details location={location} param={param} navigate={navigate}></Invoice_by_service_details>)
}




 