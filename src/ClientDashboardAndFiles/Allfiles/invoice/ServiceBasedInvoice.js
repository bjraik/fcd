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
import {Tooltip,IconButton,TableBody,Table,Modal,MenuItem,Button,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
import base from '../../../base'
import { SyncLoader } from 'react-spinners';
import PaidIcon from '@mui/icons-material/Paid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import moment from 'moment'
import CountUp from 'react-countup';

const drawerWidth = 240;

export class ServiceBasedInvoice extends Component {


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



       single_client_data : {}
    }
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }

  componentDidMount(){
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
            ////// setting single client data and json
  
              this.setState({single_client_data:resulttt.data,is_loader_open:false})
  
  
           })
            }

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


  render() {

let currentDate = new  Date();

    return (
  <div>

<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:2,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Invoice</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Invoice List</Typography>
</Box>

</Paper>






<Paper sx={{width:'100%',minHeight:600,mt:2}}>

<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Typography sx={{fontSize:15,fontWeight:'600',color:'#666666',ml:1}}>Invoice List</Typography>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30}}>
<TextField onChange={this.handleChangeSearch} name='search'  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>
</Box>



<Box sx={{mt:0,padding:2}}>
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
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Discount</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Po No</TableCell>
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
              <TableCell align='center' sx={{color:'#42526e',display:'flex'}}>{moment(row.due_date).format('MM-DD-YYYY')} <Box sx={{height:23,display:((Date.parse(currentDate) > Date.parse(row.due_date)) && row.status!=='Fully Paid')? 'flex':'none',justifyContent:'left',alignItems:'center',ml:0.5}}><Typography sx={{paddingLeft:0.3,paddingRight:0.3,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'rgba(196, 8, 27,0.8)'}}>Over Due</Typography></Box> </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}><CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0) - parseInt(row.discounts)   }  />  </TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}><CountUp start={0} end={row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0)  } /></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}><CountUp start={0} end={row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)  - row.payments.reduce( ( sum , cur ) => sum + parseInt(cur.payment_amount) , 0) - parseInt(row.discounts)  }/></TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontWeight:'700'}}>{parseInt(row.discounts)}</TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontWeight:'700',textTransform:'uppercase',fontSize:12}}><Box sx={{height:20,minWidth:60,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{fontSize:12,fontWeight:'700',paddingLeft:1,paddingRight:1,backgroundColor:'#0088cc',color:'#fff'}}>{row.po_no}</Typography></Box></TableCell>
              

              <TableCell align='center' sx={{color:'#42526e',fontSize:12,fontWeight:'600'}}><Box sx={{height:20,minWidth:30,borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#fbfcfe'}}>{row.status}</Box></TableCell>
            

            
              <TableCell align='center' sx={{color:'#42526e',fontSize:12,fontWeight:'600'}}> <Button size='small' variant='contained' onClick={()=>{


this.setState({is_loader_open:true},()=>{
  fetch(`${base.base_url}/retriveSingleInvoiceDetails_service_based`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },   
    method:'post',
    body:JSON.stringify({
      invoice_id:row.invoice_id,
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
       client_billing_details :this.state.client_billing_details,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({open_loader_for_edit_page_popup:false,is_loader_open:false})
    window.open(`${base_url.base_url}/${result.path}.pdf`)
    //this.handleClose();
  })
  });

})

  




              }} disableElevation sx={{height:17,fontSize:11}}>View</Button>  <Button disableElevation variant='outlined'  size='small' sx={{height:17,ml:1,fontSize:11}}>Print</Button></TableCell>
            
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

export default ServiceBasedInvoice
export function ServiceBasedInvoicec(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ServiceBasedInvoice location={location} navigate={navigate}></ServiceBasedInvoice>)
}
















