import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../../ClientDashboardAndFiles/Appheader'
import Sidebar from '../../../ClientDashboardAndFiles/Appheader'
import Chat from '../../../Chat'
import { Sidebarc } from '../../../ClientDashboardAndFiles/Sidebar'
import { Button, Paper, Typography, touchRippleClasses } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,IconButton,TableBody,Table,Modal,ButtonGroup,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
import base from '../../../base'
import { SyncLoader } from 'react-spinners';
import moment from 'moment'
import CountUp from 'react-countup';
import PaidIcon from '@mui/icons-material/Paid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
const drawerWidth = 240;

export class ClientdashboardInvoice extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       search:'',
       departmentData : JSON.parse(sessionStorage.getItem('AllClientData')),
       credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
       invoiceList:[],
       invoice_list_size:0,
      page:0,
      rowsPerPage:10,
////////////// service based search
permissiondata : JSON.parse(sessionStorage.getItem('permission')),



       service_based_invoice_list:[],
       service_based_invoice_size:0,
        service_based_invoice_search :"",
        s_page : 0,
        s_rowsPerPage  :10,



//////////////////////////// 

        single_client_data : {},


       is_invoice:"invoice"
    }
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
    this.handleChangeSearch_service_invoice = this.handleChangeSearch_service_invoice.bind(this)
  }

  componentDidMount(){
///// retrive_service_based_invoice_for_client_admin

  this.setState({is_loader_open:true},()=>{
fetch(`${base.base_url}/allInvoiceForSingleClientForClientSide`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage,
          client_id:this.state.departmentData.client_id,
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({invoiceList:result.data,invoice_list_size:result.length})
      }).then(()=>{

        fetch(`${base.base_url}/retrive_service_based_invoice_for_client_admin`,{
          headers:{
            'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
            'content-type':'application/json',
          },
          method:'post',
          body:JSON.stringify({
            search:this.state.service_based_invoice_search,
            page:this.state.s_page,
            rowsPerPage:this.state.s_rowsPerPage,
            client_id:this.state.departmentData.client_id,
          })
        }).then((res)=>{return res.json()}).then((result)=>{
          this.setState({service_based_invoice_list:result.data,service_based_invoice_size:result.length})
        }).then(async()=>{

        if(this.state.departmentData.is_admin){
        let payload  =  JSON.parse(await sessionStorage.getItem('payload'));

         fetch(`${base.base_url}/getSingleClientData`,{    ////// getting single client data 
         headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
         'content-type':'application/json',
         },
         method:'post',
         body:JSON.stringify({
         client_id:payload.client_id
         })
         }).then((res)=>{return res.json()}).then((resulttt)=>{

         //  console.log(resulttt)
          ////// setting single client data and json

            this.setState({single_client_data:resulttt.data,is_loader_open:false})


         })
          }

        })
      })
  })
       
  }



handleChangeSearch=(e)=>{
this.setState({
  [e.target.name] :e.target.value,page:0,is_loader_open:true
},()=>{
  fetch(`${base.base_url}/allInvoiceForSingleClientForClientSide`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search:this.state.search,
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage,
      client_id:this.state.departmentData.client_id,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({invoiceList:result.data,is_loader_open:false,invoice_list_size:result.length})
  })
})
}



handleChangeSearch_service_invoice=(e)=>{
  this.setState({
    [e.target.name] :e.target.value,page:0,is_loader_open:true
  },()=>{
    fetch(`${base.base_url}/retrive_service_based_invoice_for_client_admin`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.service_based_invoice_search,
        page:this.state.s_page,
        rowsPerPage:this.state.s_rowsPerPage,
        client_id:this.state.departmentData.client_id,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({service_based_invoice_list:result.data,is_loader_open:false,service_based_invoice_size:result.length})
    })
  })
  }
  render() {

let currentDate = new  Date();

    return (
  <div>
    
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:2,sm:3}, mt:6}}>


<Paper sx={{width:'100%',minHeight:300,mt:2,display:this.state.is_invoice=="invoice"?'block':'none'}}>
<Box>
<Box sx={{pt:3,ml:2}}>
       
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
</Box>



<Box sx={{display:'flex',flexDirection:'row',paddingLeft:{xs:1,sm:2,md:3},paddingTop:{xs:1,sm:2,md:3},justifyContent:'space-between',mt:1}}>
<Typography sx={{fontSize:17,fontWeight:'600',color:'#666666',ml:1}}>Invoice List</Typography>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30,mr:2}}>
<TextField onChange={this.handleChangeSearch} name='search'  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>
</Box>

<br/>

<Box sx={{mt:0,paddingLeft:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1220 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Invoice ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Bill Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Invoice</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Paid</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due</TableCell>
           
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>PO No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.invoiceList.map((row) => (
               <TableRow
               key={row.name}
               sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:row.status=='Fully Paid'?'rgba(3, 110, 41,0.1)':row.status=='Cancel'?'rgba(227, 5, 12,0.1)':row.status=='OverDue'?'rgba(186, 2, 2,0.2)':'#fff' }}
             >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
               {row.invoice_id}
              </TableCell> 
            
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.bill_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',display:'flex',flexDirection:'row'}}><Typography>{moment(row.due_date).format('MM-DD-YYYY')} </Typography><Box sx={{height:23,display:((Date.parse(currentDate) > Date.parse(row.due_date)) && row.status!=='Fully Paid')? 'flex':'none',justifyContent:'left',alignItems:'center',ml:0.5}}><Typography sx={{paddingLeft:0.3,paddingRight:0.3,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'rgba(196, 8, 27,0.8)'}}>Over Due</Typography></Box> </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>$<CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0) - parseInt(row.discounts)   }  />  </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>$<CountUp start={0} end={row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)  } /></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>$<CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)  - row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0) - parseInt(row.discounts)  }/></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700',textTransform:'uppercase',fontSize:12}}><Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}>{row.po_no}</Typography></Box></TableCell>
              

              <TableCell align='center' sx={{color:'#42526e',fontSize:12,fontWeight:'600'}}><Box sx={{height:20,minWidth:30,borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#fbfcfe'}}>{row.status}</Box></TableCell>
            

              <TableCell align='center' sx={{color:'#42526e',fontSize:12,fontWeight:'600'}}> <Button disabled={this.state.permissiondata?this.state.permissiondata.invoice.is_view?false:true:true}  size='small' variant='contained' onClick={()=>{


this.setState({is_loader_open:true},()=>{
  fetch(`${base.base_url}/retriveSingleInvoiceData`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },   
    method:'post',
    body:JSON.stringify({
    invoice_id:row.invoice_id
    })
  }).then((res)=>{return res.json()}).then((invoice_data_details)=>{

     fetch(`${base.base_url}/createInvoice`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
              },
    method:'post',
    body:JSON.stringify({
       invoice_id:row.invoice_id,
       invoice_data:invoice_data_details.data,
       client_billing_details :this.state.single_client_data.billing_info,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({is_loader_open:false})
    window.open(`${base.base_url}/${result.path}.pdf`)
    //this.handleClose();
  })
  });

})


}} disableElevation sx={{height:17,fontSize:11}}  >View</Button>  </TableCell>
            
            
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
          rowsPerPage={10}
          page={0}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
</Box>
</Paper>



<Paper sx={{width:'100%',minHeight:600,mt:2,display:this.state.is_invoice=="services"?'block':'none'}}>


<Box>
<Box sx={{pt:3,ml:2}}>
       
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
</Box>



<Box sx={{display:'flex',flexDirection:'row',paddingLeft:{xs:1,sm:2,md:3},paddingTop:{xs:1,sm:2,md:3},justifyContent:'space-between',mt:1}}>
<Typography sx={{fontSize:17,fontWeight:'600',color:'#666666',ml:1}}>Invoice List</Typography>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30,mr:2}}>
<TextField onChange={this.handleChangeSearch_service_invoice} value={this.state.service_based_invoice_search} name='service_based_invoice_search'  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>
</Box>

<br/>

<Box sx={{mt:0,paddingLeft:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1220 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Invoice ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Bill Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Invoice</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Paid</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due</TableCell>

            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>PO No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>


            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.service_based_invoice_list.map((row) => (
               <TableRow
               key={row.name}
               sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:row.status=='Fully Paid'?'rgba(3, 110, 41,0.1)':row.status=='Cancel'?'rgba(227, 5, 12,0.1)':row.status=='OverDue'?'rgba(186, 2, 2,0.2)':'#fff' }}
             >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
               {row.invoice_id}
              </TableCell> 
            
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.bill_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',display:'flex',flexDirection:'row'}}><Typography>{moment(row.due_date).format('MM-DD-YYYY')} </Typography><Box sx={{height:23,display:((Date.parse(currentDate) > Date.parse(row.due_date)) && row.status!=='Fully Paid')? 'flex':'none',justifyContent:'left',alignItems:'center',ml:0.5}}><Typography sx={{paddingLeft:0.3,paddingRight:0.3,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'rgba(196, 8, 27,0.8)'}}>Over Due</Typography></Box> </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}><CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.amount) , 0) - parseInt(row.discounts)   }  />  </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}><CountUp start={0} end={row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)  } /></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}><CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.amount) , 0)  - row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0) - parseInt(row.discounts)  }/></TableCell>

              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700',textTransform:'uppercase',fontSize:12}}><Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}>{row.po_no}</Typography></Box></TableCell>
              

              <TableCell align='center' sx={{color:'#42526e',fontSize:12,fontWeight:'600'}}><Box sx={{height:20,minWidth:30,borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#fbfcfe'}}>{row.status}</Box></TableCell>

              <TableCell align='center' sx={{color:'#42526e',fontSize:12,fontWeight:'600'}}> <Button disabled={this.state.permissiondata?this.state.permissiondata.invoice.is_view?false:true:true}   size='small' variant='contained' onClick={()=>{


this.setState({is_loader_open:true},()=>{
  fetch(`${base.base_url}/retriveSingleInvoiceDetails_service_based`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },   
    method:'post',
    body:JSON.stringify({
    invoice_id:row.invoice_id 
    })
  }).then((res)=>{return res.json()}).then((invoice_data_details)=>{

     fetch(`${base.base_url}/createInvoice_service_based`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
              },
    method:'post',
       body:JSON.stringify({
       invoice_id:row.invoice_id,
       invoice_data:invoice_data_details.data,
       client_billing_details :this.state.single_client_data.billing_info,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({is_loader_open:false})
    window.open(`${base.base_url}/${result.path}.pdf`)
    //this.handleClose();
  })
  });

})


              }} disableElevation sx={{height:17,fontSize:11}}  >View</Button>  </TableCell>
            
            
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
   <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.service_based_invoice_size}
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

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Compaign</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Compaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Client<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField value='--' type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Department<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="date" fullWidth size='small'>
<MenuItem  sx={{fontSize:12,fontWeight:'600'}}>
---
</MenuItem>
{[1,2,3].map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))}
</TextField>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Allocation<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Start Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>End Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Campaign Budget<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'},  endAdornment: <Typography sx={{fontSize:12,fontWeight:'600',color:'#65aacf',width:100,textAlign:'right'}}>Per Lead</Typography>,}}  name="first_name" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Total Spend<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Description<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' maxRows={10} InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  name="first_name" fullWidth size='small'/>


<Box sx={{minHeight:120,width:'100%',mt:4}}>
  <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
    <Typography sx={{fontWeight:'bold',fontSize:16}}>Question</Typography>
    <Button size='small' disableElevation sx={{textTransform:'none'}} variant='contained'>Add Question</Button>
  </Box>


<Divider sx={{padding:0.5}}/>


  <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Question Type<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  select maxRows={10} InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{['type-1','type-2','type-33'].map((option) => (
            <MenuItem key={option} sx={{fontSize:12}} value={option}>
              {option}
            </MenuItem>
          ))}
</TextField>
<TextField  placeholder='Type Question' InputProps={{sx:{fontSize:12,fontWeight:'600',mt:1}}}  name="first_name" fullWidth size='small'/>



<Box sx={{width:'100%',display:'flex',flexDirection:'row',mt:2,mb:1,justifyContent:'space-between',alignItems:'center'}}>
    <Typography sx={{fontWeight:'bold',fontSize:16}}>Question</Typography>
    <Button size='small' disableElevation sx={{textTransform:'none'}} variant='contained'>Add Option</Button>
  </Box>

</Box>



<br/>
<br/>




<Button variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>
<br/>
<br/>
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
     </div>
    )
  }
}

export default ClientdashboardInvoice
export function ClientdashboardInvoicec(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ClientdashboardInvoice location={location} navigate={navigate}></ClientdashboardInvoice>)
}
















 