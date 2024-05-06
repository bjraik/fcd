
import React, { Component } from 'react'

import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Checkbox, Paper, Typography, touchRippleClasses } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {Tooltip,IconButton,Grid,Link,TableBody,Table,ButtonGroup,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import base from '../base'
import Textarea from '@mui/joy/Textarea';
import moment from 'moment'
import {SyncLoader} from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CountUp from 'react-countup';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import Invoice_by_services, { Invoice_by_servicesc } from '../../src/Invoice/Invoice_by_services'
const JsonSearch = require('search-array').default



const drawerWidth = 240;






function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}




/// for contact pop list data


function descendingComparatorContact(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparatorContact(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSortAddress(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



export class Invoice extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:false,
       is_loader_open_circle:false,

       form_open:false,
       edit_form:false,
      page:0,
      search:"",
      rowsPerPage:10,
     ///  invoice form
     clistList:[],
     delete_confirmation:false,
     
invoice_list_size:0,
invoiceList:[],
campaignSize : 0,
total_balence :0,
total_payment : 0,
total_discount : 0,
/////////////////////////////
client_id:"",
client_name:"",
bill_date:"",
due_date:"",

billed_month :null,


po_no:"",
notes:"",
items:[],
payment_received:"",
invoice_id:"",
invoice_role : JSON.parse(window.sessionStorage.getItem('invoice_role')),

////////////// delete data ///////////////

invoice_id_delete: "",
client_id_delete:"",
payment_del:[],
items_del:[],
discount:0,


/////////////////////////////////// new added address fields ///////////////////////////////////////////
is_invoice : "services",   ////// tab switching 
search_for_address:"",
is_add_address : false ,    //adding adddress poppup  open
is_edit_address  : false,    ///  is edit address  popup open  
is_delete_confirmation_address : false,  ///  delete popup open
addresList:[],
invoiceAddressListPage:0,
invoiceAddressListrowPerPage : 10,



id:"",
beneficiary_name:"",
sender_address:{},
country:"",
state:"",
city:"",
area:"",
pincode:"",
email:"",
phone_no:"",

////// finacial details /// 

bank_account_no:0,
swift_code : "",
bank_address :"",
bank_name:"",




    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
    this.child = React.createRef();
   
  }



  openFormForAddingInvoice = () => {
    this.child.current.getAlert();
  };



handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

handleChangeSearch=(e)=>{
  this.setState({
    [e.target.name]:e.target.value,page:0,is_loader_open:true
  },()=>{
    fetch(`${base.base_url}/retriveInvoice`,{
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
      this.setState({invoiceList:result.data,invoice_list_size:result.length,is_loader_open:false})
    })
  })
}



  componentDidMount(){
    this.retriveCampaignSize();
    this.setState({is_loader_open:true},()=>{
    fetch(`${base.base_url}/retriveInvoice`,{
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
      this.setState({invoiceList:result.data,invoice_list_size:result.length,is_loader_open:false})
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
      this.setState({clistList:result.data,})
    })

    })
  })
  this.retriveInvoiceAddress();
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
      addresList:result.data    ///// invoice address  list show here
    })
  })
  }





retriveCampaignSize=()=>{
  fetch(`${base.base_url}/findCampaignSize`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({
       campaignSize : result.totalCampaign ,
       total_balence :result.total_balance,
       total_payment : result.total_payment,
       total_discount : result.total_discount
    })
  })
}



instantRetriveInvoice=()=>{
  this.setState({is_loader_open:true},()=>{
  fetch(`${base.base_url}/retriveInvoice`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search : this.state.search,
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({invoiceList:result.data,invoice_list_size:result.length,is_loader_open:false})
  })

  })
}


handleChangePage = (event, newPage) => {
  this.setState({page:newPage,is_loader_open:true},()=>{
    fetch(`${base.base_url}/retriveInvoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search : this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_list_size:result.length,is_loader_open:false})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0,is_loader_open:true},()=>{

    fetch(`${base.base_url}/retriveInvoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search : this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_list_size:result.length,is_loader_open:false})
    })

  })
};





  addInvoice =()=>{
if(this.state.client_id!=="" && this.state.beneficiary_name!=="" && this.state.client_name!=="" && this.state.bill_date!=="" && this.state.due_date!=="" && this.state.billed_month!==null)
{
  this.setState({is_loader_open_circle:true},()=>{

fetch(`${base.base_url}/addInvoice`,{
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
this.invoiceAdded();
this.setState({form_open:false})
this.setState({
beneficiary_name:"",
is_loader_open_circle:false,
sender_address:{},
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
  


editApply=()=>{
  if(this.state.client_id!==""&& this.state.beneficiary_name!==""  && this.state.client_name!=="" && this.state.bill_date!=="" && this.state.due_date!=="" && this.state.billed_month!==null )
{
  this.setState({is_loader_open_circle:true},()=>{
    fetch(`${base.base_url}/editInvoice`,{
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
this.invoiceEdited();
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








invoiceAdded=()=>{
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


invoiceEdited=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Invoice Successfully Edited</Typography>, {
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
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Invoice Successfully Deleted</Typography>, {
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


addressAdded=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Address Successfully Added</Typography>, {
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

addressEdited=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Address Successfully Edited</Typography>, {
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

addressDeleted=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Address Successfully Deleted</Typography>, {
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


///////// handle change  ////////////////



handleChangePageAddress = (event, newPage) => {
  this.setState({invoiceAddressListPage:newPage})
};



handleChangeRowsPerPageAddress = (event) => {
  this.setState({invoiceAddressListrowPerPage:parseInt(event.target.value, 10)})
  this.setState({invoiceAddressListPage:0})
};





////////////// open invice form for add 

openAddInvoiceFormForservice=()=>{

  this.props.task();

}




  render() {
   let currentDate = new Date();

    const searcher = new JsonSearch(this.state.addresList, {
      indice: {
        'country':'country',
        'state':'state',
        'city':'city',
        'area':'area',
        'pincode':'pincode',
        'email' :'email',
        'phone_no' :'phone_no',
        'bank_account_no' :'bank_account_no',
        'ifsc_code' : 'ifsc_code',
        'branch_name' :'branch_name',
        'bank_name':'bank_name',
      }
    })


    
    let filtered_data = searcher.query(this.state.search_for_address)
    let data =   stableSort(filtered_data, getComparator(this.state.order, this.state.orderBy)).slice(
      this.state.invoiceAddressListPage * this.state.invoiceAddressListrowPerPage,
      this.state.invoiceAddressListPage * this.state.invoiceAddressListrowPerPage + this.state.invoiceAddressListrowPerPage,
    )


    return (
  <div>

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

<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,mt:{xs:1,sm:1,md:0},paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Invoice</Typography>


<Grid container spacing={{xs:1,sm:2}}>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#00a3ff'}}>

<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<ExploreIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Campaign</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}> <CountUp start={0} end={this.state.campaignSize}  /></Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#28176f'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<PaidIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Payment</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$ <CountUp start={0} end={this.state.total_payment}  /></Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#fe964a'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<DescriptionIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total invoice</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$ <CountUp start={0} end={this.state.total_balence - this.state.total_discount}  /></Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#9a5252'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<AccountBalanceWalletIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Due</Typography>
</Box>
<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>$ <CountUp start={0} end={this.state.total_balence - this.state.total_payment - this.state.total_discount}  /></Typography>
</Paper>
</Grid>
</Grid>



<Box sx={{width:'100%',pt:1.5}}>
<Paper sx={{height:50,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',overflow:'scroll', scrollbarWidth:'none','&::-webkit-scrollbar': {display: 'none', }, }}>

<Box sx={{minWidth:{xs:500,sm:'100%'},display:'flex',flexDirection:'row',justifyContent:'space-between',overflow:'scroll',scrollbarWidth:'none','&::-webkit-scrollbar': {display: 'none', },}}>

<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{whiteSpace:'nowrap',textAlign:'center', fontSize:17,fontWeight:'500',display:'flex',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Invoice List</Typography>
</Box>

<Box sx={{mr:{xs:1,sm:2,md:3},display:'flex',pt:1.2}}>

<Button  disabled={this.state.invoice_role.is_create?false:true} onClick={()=>{this.setState({is_add_address:true})}}  component="label" sx={{whiteSpace:'nowrap',textAlign:'center',textTransform:'none',fontSize:13,height:30,backgroundColor:'#008ffb',ml:{xs:1,sm:1,md:2},fontWeight:'600'}} disableElevation variant="contained" startIcon={<BusinessIcon  sx={{color:'#fff'}}/>}>
Add Address
</Button>
<Button  disabled={this.state.invoice_role.is_create?false:true} onClick={()=>{this.setState({form_open:true})}} component="label" sx={{whiteSpace:'nowrap',textAlign:'center',textTransform:'none',fontSize:13,height:30,backgroundColor:'#008ffb',ml:{xs:1,sm:1,md:2},fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon  sx={{color:'#fff'}}/>}>
Add Invoice
</Button>

<Button  disabled={this.state.invoice_role.is_create?false:true} onClick={()=>{
this.openFormForAddingInvoice();
}} component="label" sx={{whiteSpace:'nowrap',textAlign:'center',textTransform:'none',fontSize:13,height:30,backgroundColor:'#008ffb',ml:{xs:1,sm:1,md:2},fontWeight:'600'}} disableElevation variant="contained" startIcon={<AttachMoneyIcon  sx={{color:'#fff'}}/>}>
Service Invoice
</Button>
</Box>


</Box>
</Paper>
</Box>




<Paper sx={{width:'100%',minHeight:600,mt:2}}>
<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'column',md:'row'},padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{width:'100%',pt:1.5}}>
<Box sx={{height:50,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',overflow:'scroll', scrollbarWidth:'none','&::-webkit-scrollbar': {display: 'none', }, }}>
<Box sx={{minWidth:{xs:500,sm:'100%'},display:'flex',flexDirection:'row',justifyContent:'space-between',overflow:'scroll',scrollbarWidth:'none','&::-webkit-scrollbar': {display: 'none', },}}>
<ButtonGroup
size='small'
  disableElevation
  variant="outlined"
  aria-label="Disabled button group"
>
   <Button size='small' variant={this.state.is_invoice=="services"?'contained':'outlined'} onClick={()=>this.setState({is_invoice:'services'})} sx={{whiteSpace:'nowrap',textAlign:'center',textTransform:'none',height:30,fontWeight:'600',backgroundColor:this.state.is_invoice=='services'?'#008ff':'#fff'}} startIcon={<AttachMoneyIcon/>}>Services</Button>
  <Button size='small' variant={this.state.is_invoice=="invoice"?'contained':'outlined'} onClick={()=>this.setState({is_invoice:'invoice'})} sx={{whiteSpace:'nowrap',textAlign:'center',textTransform:'none',height:30,fontWeight:'600',backgroundColor:this.state.is_invoice=='invoice'?'#008ff':'#fff'}} startIcon={<PaidIcon/>}>Campaign</Button>
  <Button size='small' variant={this.state.is_invoice=="address"?'contained':'outlined'} onClick={()=>this.setState({is_invoice:'address'})} sx={{whiteSpace:'nowrap',textAlign:'center',textTransform:'none',height:30,fontWeight:'600',backgroundColor:this.state.is_invoice=='address'?'#008ff':'#fff'}} startIcon={<BusinessIcon/>}>Address</Button>
</ButtonGroup>
</Box>
</Box>
</Box>

</Box>


<Box sx={{display:'flex',justifyContent:'right',mr:2,mt:{xs:-1,sm:-2,md:-4}}}>

<Box sx={{display:this.state.is_invoice=='invoice'?'flex':this.state.is_invoice=='address'?'flex':'none',justifyContent:'left',alignItems:'left',borderRadius:2,height:30}}>
<TextField sx={{display:this.state.is_invoice=='invoice'?'block':'none',width:250,backgroundColor:'#f8f9ff',borderRadius:1}}   name='search' onChange={this.handleChangeSearch} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='invoice id'/>
<TextField sx={{display:this.state.is_invoice=='address'?'block':'none',width:250,backgroundColor:'#f8f9ff',borderRadius:1}}   name='search_for_address' onChange={(e)=>{this.setState({search_for_address:e.target.value})}} value={this.state.search_for_address} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>

</Box>


<Box sx={{mt:0,padding:2,display:this.state.is_invoice=='invoice'?'block':'none'}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1520 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr. no</TableCell>
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
            >
               <TableCell component="th"   scope="row" sx={{color:'#42526e'}}  >
            {this.state.page * this.state.rowsPerPage + index + 1}
              </TableCell>
              <TableCell component="th" onClick={()=>this.props.navigate('/invoice/:'+row.invoice_id)}  scope="row" sx={{color:'#42526e'}}  >
              <Box sx={{height:22,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}><Link sx={{color:'#fff'}}>{row.invoice_id}</Link> </Typography></Box> 
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.client_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.bill_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',display:'flex'}}>{moment(row.due_date).format('MM-DD-YYYY')} <Box sx={{height:23,display:((Date.parse(currentDate) > Date.parse(row.due_date)) && row.status!=='Fully Paid')? 'flex':'none',justifyContent:'left',alignItems:'center',ml:0.5}}><Typography sx={{paddingLeft:0.3,paddingRight:0.3,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'rgba(196, 8, 27,0.8)'}}>Over Due</Typography></Box> </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>$<CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0) - parseInt(row.discounts)   }  />  </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>$<CountUp start={0} end={row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)  } /></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>$<CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)  - row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0) - parseInt(row.discounts)  }/></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>${parseInt(row.discounts)}</TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontWeight:'700',textTransform:'uppercase',fontSize:12}}><Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}>{row.po_no}</Typography></Box></TableCell>
              
              <TableCell align='center' sx={{color:'#42526e'}} >

              <TextField  size='small' value={row.status} onChange={this.handleChange} SelectProps={{MenuProps:{sx:{height:300}}}} variant='standard' InputProps={{sx:{fontSize:12,fontWeight:'600'},disableUnderline:true}} sx={{height:15,ml:1}} select>
     {
     invoiceStaus.map((p)=>(
      <MenuItem key={p.id} value={p.status} sx={{fontSize:12,fontWeight:'600', color:'#42526e'}} onClick={()=>{

        fetch(`${base.base_url}/updateInvoiceStatus`,{
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
         this.invoiceEdited();
         this.instantRetriveInvoice();
        this.retriveCampaignSize();
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.invoice_list_size}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
</Box>





{
  /////  below code for invoice
}

<Box sx={{mt:0,padding:2,display:this.state.is_invoice=='services'?'block':'none'}}>
<Invoice_by_services   ref={this.child}  />
</Box>




{
  //// below entire code for adddress
}



<Box sx={{mt:0,padding:2,display:this.state.is_invoice=="address"?'block':'none'}}>

<TableContainer component={Box}>
      <Table sx={{minWidth:1720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr. No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Beneficiary</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Country</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>State</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>City</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Area</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Pincode</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Email </TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Phone </TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Account No</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Swift CODE</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Bank Address</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Bank Name</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,backgroundColor:index % 2?'#f9f9f9':'#fff'}}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
              {index + 1}
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:12,fontWeight:600}}>{row.beneficiary_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,fontWeight:500}}>{row.country}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,fontWeight:500}}>{row.state}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,fontWeight:500}}>{row.city}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,fontWeight:500}}>{row.area} </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,fontWeight:500}}>{row.pincode}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,fontWeight:500}}>{row.email}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,fontWeight:500}}>{row.phone_no}</TableCell>
              <TableCell align='left' sx={{color:'#42526e'}}><Box sx={{height:23,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{paddingLeft:1,paddingRight:1,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#2d85d1'}}>{row.bank_account_no}</Typography></Box></TableCell>
              <TableCell align='left' sx={{color:'#42526e'}}><Box sx={{height:23,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{paddingLeft:1,paddingRight:1,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#2d85d1'}}>{row.swift_code}</Typography></Box></TableCell>
              <TableCell align='left' sx={{color:'#42526e'}}><Textarea maxRows={2}  sx={{fontSize:13,border:'none',outline:'none'}} value={row.bank_address}/></TableCell>
              <TableCell align='left' sx={{color:'#42526e'}}><Box sx={{height:23,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{paddingLeft:1,paddingRight:1,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#2d85d1'}}>  {row.bank_name}</Typography></Box></TableCell>
              
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton disabled={this.state.invoice_role.is_edit?false:true} onClick={()=>{
   this.setState({
    is_edit_address:true,
    beneficiary_name:row.beneficiary_name,
    id:row.id,
    country:row.country,
    state:row.state,
    city:row.city,
    area:row.area,
    pincode:row.pincode,
    email:row.email,
    phone_no:row.phone_no,
    bank_account_no:row.bank_account_no,
    swift_code : row.swift_code,
    bank_address :row.bank_address,
    bank_name:row.bank_name,
   })
   } } size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete">
  <IconButton disabled={this.state.invoice_role.is_delete?false:true} onClick={()=>{
  this.setState({
    is_delete_confirmation_address:true,
    id:row.id,
   
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
          count={filtered_data.length}
          rowsPerPage={this.state.invoiceAddressListrowPerPage}
          page={this.state.invoiceAddressListPage}
          onPageChange={this.handleChangePageAddress}
          onRowsPerPageChange={this.handleChangeRowsPerPageAddress}
        />
</Box>



</Paper>
</Box>
</Box>
</Box>

<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
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

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Create Invoice</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Client Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} SelectProps={{MenuProps:{sx:{height:300}}}} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="client_name" fullWidth size='small'>
{
 this.state.clistList.map((data,index)=>(
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
<TextField   onChange={this.handleChange} type='month' 
InputProps={{
 sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.billed_month).format('YYYY-MM')} name='billed_month' fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>PO No.<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  onChange={(e)=>this.setState({po_no:(e.target.value).toUpperCase()})}  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'uppercase'}}} value={this.state.po_no}  name="po_no" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Address select<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} SelectProps={{MenuProps:{sx:{height:300}}}} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.beneficiary_name}  name="beneficiary_name" fullWidth size='small'>
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

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Invoice</Typography>
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
 this.state.addresList.map((data,index)=>(
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

 (`${base.base_url}/deleteInvoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
        invoice_id:this.state.invoice_id_delete,
        client_id:this.state.client_id_delete,
        discount:this.state.discount,
        total_invoice:this.state.items_del.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)  ,
        amount_paid:this.state.payment_del.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.retriveCampaignSize();
      this.instantRetriveInvoice();
      this.invoiceDeleted();
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


{
  //////////////////////////////////////////////// entire fields for address //////////////////////////////
}


<Box> 
<Modal
  open={this.state.is_add_address}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  is_add_address:false,
  id:"",
beneficiary_name:"",
country:"",
state:"",
city:"",
area:"",
pincode:"",
email:"",
phone_no:"",
bank_account_no:0,
swift_code : "",
bank_address :"",
bank_name:"",
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>


<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Address </Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Beneficiary Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={(e)=>{this.setState({beneficiary_name:(e.target.value).toUpperCase()})}} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.beneficiary_name} name="beneficiary_name" fullWidth size='small'/>




<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.country} name="country" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.city} name="city" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.state} name="state" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Area<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.area} name="area" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Pincode<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.pincode} name="pincode" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Phone no<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.phone_no} name="phone_no" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Email<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.email} name="email" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:3,display:'flex',flexDirection:'row',color:'#2e7d32'}}>Financial Details :- <Typography sx={{color:'red'}}></Typography></Typography>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bank Account No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="number" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.bank_account_no} name="bank_account_no" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Swift Code<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={(e)=>this.setState({swift_code:(e.target.value).toUpperCase()})}  sx={{textTransform:'uppercase'}} InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'uppercase'}}}  value={this.state.swift_code} name="swift_code" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bank Address<Typography sx={{color:'red'}}>*</Typography></Typography>
<Textarea onChange={this.handleChange} minRows={3} sx={{fontSize:12,fontWeight:'600',padding:1}}  value={this.state.bank_address} name="bank_address" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bank Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={(e)=>{this.setState({bank_name:(e.target.value).toUpperCase()})}} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.bank_name} name="bank_name" fullWidth size='small'/>



<Button variant='contained' onClick={()=>{
if(this.state.country!=="" && this.state.beneficiary_name!==""&&this.state.state!==""&&this.state.city!==""&&this.state.area!==""&&this.state.pincode!==""&&this.state.email!==""&&this.state.phone_no!==""&& (this.state.bank_account_no!==0 && this.state.bank_account_no > 0) &&this.state.swift_code!=="" && this.state.bank_address !=="" && this.state.bank_name!==""){
 
  this.setState({is_loader_open_circle:true},()=>{

  fetch(`${base.base_url}/add_invoice_sender_details`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      country:this.state.country,
      beneficiary_name:this.state.beneficiary_name,
      state:this.state.state,
      city:this.state.city,
      area:this.state.area,
      pincode:this.state.pincode,
      email:this.state.email,
      phone_no:this.state.phone_no,
      bank_account_no:this.state.bank_account_no,
      swift_code : this.state.swift_code,
      bank_address :this.state.bank_address,
      bank_name:this.state.bank_name,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.addressAdded();
this.setState({
is_add_address:false,
is_loader_open_circle:false,
id:"",
      country:"",
      beneficiary_name:"",
      state:"",
      city:"",
      area:"",
      pincode:"",
      email:"",
      phone_no:"",
      bank_account_no:0,
      swift_code : "",
      bank_address :"",
      bank_name:"",
    },()=>{
      this.retriveInvoiceAddress();
    })

  })


  })
 

}else{
  
this.fillAllFields();

}

  }}  disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
Add Address
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





{
  ///// address edit fields 
}



<Box> 
<Modal
  open={this.state.is_edit_address}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'30%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  is_edit_address:false,
  id:"",
 address_heading:"",
 country:"",
 state:"",
 city:"",
 area:"",
 pincode:"",
 email:"",
 phone_no:"",
 bank_account_no:0,
 ifsc_code : "",
 branch_name :"",
 bank_name:"",
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Address </Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Beneficiary Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={(e)=>{this.setState({beneficiary_name:(e.target.value).toUpperCase()})}} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.beneficiary_name} name="beneficiary_name" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.country} name="country" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.city} name="city" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.state} name="state" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Area<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.area} name="area" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Pincode<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.pincode} name="pincode" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Phone no<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.phone_no} name="phone_no" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Email<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.email} name="email" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:3,display:'flex',flexDirection:'row',color:'#2e7d32'}}>Financial Details :- <Typography sx={{color:'red'}}></Typography></Typography>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bank Account No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="number" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.bank_account_no} name="bank_account_no" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Swift Code<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={(e)=>this.setState({swift_code:(e.target.value).toUpperCase()})}  sx={{textTransform:'uppercase'}} InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'uppercase'}}}  value={this.state.swift_code} name="swift_code" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bank Address<Typography sx={{color:'red'}}>*</Typography></Typography>
<Textarea onChange={this.handleChange} minRows={3} sx={{fontSize:12,fontWeight:'600',padding:1}}   value={this.state.bank_address} name="bank_address" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bank Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={(e)=>{this.setState({bank_name:(e.target.value).toUpperCase()})}} type="text" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.bank_name} name="bank_name" fullWidth size='small'/>


<Button variant='contained' onClick={()=>{
if(this.state.country!=="" && this.state.beneficiary_name!==""&&this.state.state!==""&&this.state.city!==""&&this.state.area!==""&&this.state.pincode!==""&&this.state.email!==""&&this.state.phone_no!==""&& (this.state.bank_account_no!==0 && this.state.bank_account_no > 0) &&this.state.swift_code!=="" && this.state.bank_address !=="" && this.state.bank_name!==""){
 this.setState({is_loader_open_circle:true},()=>{

  fetch(`${base.base_url}/update_invoice_sender_details`,{
    headers:{
      'content-type':'application/json',
    },
    method:'put',
    body:JSON.stringify({
      id:this.state.id,
      beneficiary_name:this.state.beneficiary_name,
      country:this.state.country,
      state:this.state.state,
      city:this.state.city,
      area:this.state.area,
      pincode:this.state.pincode,
      email:this.state.email,
      phone_no:this.state.phone_no,
      bank_account_no:this.state.bank_account_no,
      swift_code : this.state.swift_code,
      bank_address :this.state.bank_address,
      bank_name:this.state.bank_name,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.addressEdited();
this.setState({
  is_loader_open_circle:false,
  is_edit_address:false,
  id:this.state.id,
  beneficiary_name:this.state.beneficiary_name,
  country:this.state.country,
  state:this.state.state,
  city:this.state.city,
  area:this.state.area,
  pincode:this.state.pincode,
  email:this.state.email,
  phone_no:this.state.phone_no,
  bank_account_no:this.state.bank_account_no,
  swift_code : this.state.swift_code,
  bank_address :this.state.bank_address,
  bank_name:this.state.bank_name,
    },()=>{
      this.retriveInvoiceAddress();
    })

  })

 })




}else{
  
this.fillAllFields();


}

  }}  disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
Edit Address
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



{
  //// deletd confirmation
}



<Box> 
<Modal
  open={this.state.is_delete_confirmation_address}
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

   fetch(`${base.base_url}/delete_invoice_sender_details`,{
      headers:{
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
      id:this.state.id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.retriveInvoiceAddress();
      this.addressDeleted();
      this.setState({
       id:"",
       is_loader_open_circle:false,
       is_delete_confirmation_address:false
      })
    })

  })
  

}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({is_delete_confirmation_address:false,id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>


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

export default Invoice


export function Invoicec(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Invoice location={location} navigate={navigate}></Invoice>)
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






