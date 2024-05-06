import { Paper,Box ,Backdrop,FormControl,Select,InputLabel,Tooltip,CircularProgress,IconButton,TableBody,Grid,Table,MenuItem,Tab,Tabs,TableContainer,Modal,TablePagination,Divider,TableCell,TableHead,TableRow,Button, Typography, TextField} from '@mui/material'
import React, { Component } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from 'rc-checkbox';
import base from '../base'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import bg from "../img/bgimg.svg"
import { CSVLink } from "react-csv";
import {SyncLoader} from 'react-spinners'
import CountUp from 'react-countup';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


export class ClientList extends Component {
constructor(props) {
  super(props)

  this.state = {
    page:0,
    is_loader_open:true,
    is_backdrop_open :false,



    dense:false,
    docLength:0,
    rowsPerPage:10,
     clistList:[],
     delete_confirmation:false,
     delete_confirmation_all:false,
     client_id:"",
     form_open:false,
     search:"",
     AllClientForExport:[],
     client_role : JSON.parse(sessionStorage.getItem('client_role')),
//////////////// for edit section 

tab_value:'general_info',


/////////////////// data for client add       (general innfo) 
client_name:"",
client_phone:"",
client_group:"",
client_address_1:"",
client_address_2:"",
client_postal_code:"",
client_country:"",
client_state:"",
client_city:"",
client_email:"",
client_password:"",
////////////////// primary_contact
p_client_designation:"",
p_name:"",
p_phone:"",
p_email:"",
p_address:"",
p_postal_code:"",
p_country:"",
p_state:"",
p_city:"",

///////////////////// billing info
billing_name:"",
biling_email_id:"",
billing_phone:"",
billing_address:"",
billing_postal_code:"",
billing_country:"",
billing_state:"",
billing_city:"",
billing_gst_no:"",
billing_currency:"",
billing_symbol:"",

//////////////////////// doc descriopm and set up 
document:[],

doc_name:"",
doc_id:"",
files:"",




  }
  this.handleChange = this.handleChange.bind()
  this.handleChangeee =this.handleChangeee.bind()
  this.handleSearch = this.handleSearch.bind()
}

handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}


handleChangeee=(e)=>{
if(e.target.files[0].size < 5000000 ){
 this.setState({[e.target.name]:e.target.files[0]})
}else{
  this.sizeIsGreterThan5mb();
  this.clearFileChoosen();
}
  
}



sizeIsGreterThan5mb=()=>{
  
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>File Size Greter Than 5mb</Typography>, {
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


handleSearch=(e)=>{
  this.setState({
    [e.target.name]:e.target.value,page:0,is_loader_open:true
  },()=>{
    fetch(`${base.base_url}/retriveClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search : this.state.search,
        page:this.state.page,
        rowperpage:this.state.rowsPerPage,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({clistList:result.data,docLength:result.length,is_loader_open:false})
    })
  })
}

componentDidMount(){
  this.retriveClient();
}

retriveClient=()=>{
  fetch(`${base.base_url}/retriveClient`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search : this.state.search,
      page:this.state.page,
      rowperpage:this.state.rowsPerPage,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({clistList:result.data,docLength:result.length,is_loader_open:false})
  }).then(()=>{
    fetch(`${base.base_url}/retriveAllClientForExport`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      }),
    }).then((res)=>{return res.json()}).then((result)=>{
     this.setState({
      AllClientForExport:result.data
     })
    })
  })
}





handleChangePage = (event, newPage) => {
  this.setState({page:newPage,is_loader_open:true},()=>{
    fetch(`${base.base_url}/retriveClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search : this.state.search,
        page:this.state.page,
        rowperpage:this.state.rowsPerPage,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({clistList:result.data,docLength:result.length,is_loader_open:false})
    
    })


  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10),is_loader_open:true})
  this.setState({page:0},()=>{
    fetch(`${base.base_url}/retriveClient`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search : this.state.search,
        page:this.state.page,
        rowperpage:this.state.rowsPerPage,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({clistList:result.data,docLength:result.length,is_loader_open:false})
    })
  })
};



removeDoc=(id)=>{
  let filterData = this.state.document.filter((e)=> e.id!==id);
  this.setState({document:filterData});
}



clearFileChoosen=()=>{
  document.getElementById("container").innerHTML = document.getElementById("container").innerHTML;
}


edit=()=>{
  if(this.state.client_name=="" || this.state.client_email==""  || this.state.client_password=="" || this.state.p_client_designation=="" ||  this.state.client_phone==""  || this.state.client_group=="" || this.state.client_address_1=="" || this.state.client_address_2=="" || this.state.client_postal_code=="" || this.state.client_country=="" || this.state.client_state=="" || this.state.client_city=="" || this.state.p_name=="" || this.state.p_phone=="" || this.state.p_email=="" || this.state.p_address=="" || this.state.p_postal_code=="" || this.state.p_country=="" || this.state.p_state=="" || this.state.p_city=="" || this.state. billing_name=="" || this.state.biling_email_id=="" || this.state. billing_phone=="" || this.state.billing_address=="" || this.state.billing_postal_code=="" || this.state.billing_country=="" || this.state.billing_state=="" || this.state.billing_city==""  || this.state. billing_currency==""|| this.state. billing_symbol=="" ){
    this.fieldunfilled();
      }else{
        this.setState({is_backdrop_open:true},()=>{

        let formData = new FormData();
        formData.append('client_id',this.state.client_id)
        formData.append('client_name',this.state.client_name)
        formData.append('client_phone',this.state.client_phone)
        formData.append('client_group',this.state.client_group)
        formData.append('client_address_1',this.state.client_address_1)
        formData.append('client_address_2',this.state.client_address_2)
        formData.append('client_postal_code',this.state.client_postal_code)
        formData.append('client_country',this.state.client_country)
        formData.append('client_state',this.state.client_state)
        formData.append('client_city',this.state.client_city)
        formData.append('client_email',this.state.client_email)
        formData.append('client_password',this.state.client_password)
        ////////// primary content
        formData.append('p_client_designation',this.state.p_client_designation)
        formData.append("p_name",this.state.p_name)
        formData.append('p_phone',this.state.p_phone)
        formData.append('p_email',this.state.p_email)
        formData.append('p_address',this.state.p_address)
        formData.append('p_postal_code',this.state.p_postal_code)
        formData.append('p_country',this.state.p_country)
        formData.append('p_state',this.state.p_state)
        formData.append('p_city',this.state.p_city)
        
        ///////////////// billing info 
        
        formData.append("billing_name",this.state.billing_name)
        formData.append('biling_email_id',this.state.biling_email_id)
        formData.append('billing_phone',this.state.billing_phone)
        formData.append('billing_address',this.state.billing_address)
        formData.append('billing_postal_code',this.state.billing_postal_code)
        formData.append('billing_country',this.state.billing_country)
        formData.append('billing_state',this.state.billing_state)
        formData.append('billing_city',this.state.billing_city)
        
        formData.append('billing_gst_no',this.state.billing_gst_no)
        formData.append('billing_currency',this.state.billing_currency)
        formData.append('billing_symbol',this.state.billing_symbol)
        
        fetch(`${base.base_url}/updateClientInfo`,{
          headers:{
            'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
            //'content-type':'application/json',
          },
          method:'put',
          body:formData,
        }).then((res)=>{return res.json()}).then((result)=>{

          if(result.status){         
         this.succes();
          this.setState({
            is_backdrop_open:false,
    form_open:false,
    tab_value:'general_info',
    client_id:'',
    client_name:"",
    client_phone:"",
    client_group:"",
    client_address_1:"",
    client_address_2:"",
    client_postal_code:"",
    client_country:"",
    client_state:"",
    client_city:"",
    client_email:"",
    client_password:"",
    ////////////////// primary_contact
    p_client_designation:"",
    p_name:"",
    p_phone:"",
    p_email:"",
    p_address:"",
    p_postal_code:"",
    p_country:"",
    p_state:"",
    p_city:"",
    ///////////////////// billing info
    
    billing_name:"",
    biling_email_id:"",
    billing_phone:"",
    billing_address:"",
    billing_postal_code:"",
    billing_country:"",
    billing_state:"",
    billing_city:"",
    billing_gst_no:"",
    billing_currency:"",
    billing_symbol:"",
    /////////////////// files
    document:[],
    documentName:[],
    doc_name:"",
    doc_id:"",
    files:"",
    },()=>{
      this.retriveClient();
    })



  }else{
  this.userExixts();
  }



  })



})


}


  


}


fieldunfilled=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields </Typography>, {
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

userExixts=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Client Email Exists</Typography>, {
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


succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Client Successfully Update</Typography>, {
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

delete=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Deleted</Typography>, {
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


fieldunfilled=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields </Typography>, {
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


succesdox=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Documents Added</Typography>, {
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

docsfail=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Required doc name and file</Typography>, {
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
<Box sx={{mt:1}}>



<Paper sx={{minHeight:500,width:'100%'}}>
<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row'}}>
<Box sx={{height:30,width:30,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Export PDF">
<PictureAsPdfIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>

<Box sx={{height:30,width:30,borderRadius:1,ml:1,mr:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<CSVLink data={this.state.AllClientForExport} title='Client List'>
<Tooltip title="Export Exel">
<DriveFileMoveIcon sx={{color:'#fff',height:20,width:20}} />
</Tooltip>
</CSVLink>
</Box>

<Box onClick={()=>{
  this.setState({delete_confirmation_all:true})
}}  sx={{height:30,width:30,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Delete All">
<DeleteForeverIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
</Box>




<Box sx={{display:'flex'}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30}}>
    <TextField onChange={this.handleSearch} name='search' value={this.state.search} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='Client Id' sx={{"& input::placeholder": {
      fontSize: "14px",
      fontWeight:'600',
      marginLeft:"2px"}}
    }/>
</Box>


</Box>
</Box>


<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1220 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191',ml:3}}>Client Id</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Client Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Primary Contact</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Client group</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Invoice</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Payment Received</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.clistList.map((row,index) => (
            <TableRow
              key={row.name}
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:index % 2?'#f9f9f9':'#fff' }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  onClick={()=>{localStorage.setItem('client',JSON.stringify(row));this.props.navigate('/client/:'+row.client_id)}} >
              <Box sx={{height:23,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#2d85d1'}}> <Link style={{textDecoration:'underline',color:'#fff'}}>{row.client_id}</Link></Typography></Box> 
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>{row.client_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>{row.primary_contact.phone}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>
              <Box sx={{height:23,display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#008ffb'}}>{row.client_group} </Typography></Box> 
                </TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize',fontWeight:'700'}}> $<CountUp start={0} end={row.total_invoice}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize',fontWeight:'700'}}> $<CountUp start={0} end={row.amount_paid} /></TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize',fontWeight:'700'}}><Paper elevation={0} sx={{height:30,minWidth:30,borderRadius:5,backgroundColor:'rgba(37,158,250,0.1)',display:'flex',justifyContent:'center',alignItems:'center'}}> <CountUp start={0} end={row.total_invoice - row.amount_paid} />  </Paper></TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton disabled={this.state.client_role.is_edit?false:true} size='small' onClick={()=>{
this.setState({
client_id:row.client_id,
client_name:row.client_name,
client_phone:row.client_phone,
client_designation:row.client_designation,
client_group:row.client_group,
client_address_1:row.client_address_1,
client_address_2:row.client_address_2,
client_postal_code:row.client_postal_code,
client_country:row.client_country,
client_state:row.client_state,
client_city:row.client_city,

client_email:row.user_name,
client_password:row.password,
////////////////// primary_contact
p_client_designation:row.primary_contact.designation,

p_name:row.primary_contact.name,
p_phone:row.primary_contact.phone,
p_email:row.primary_contact.email,
p_address:row.primary_contact.address,
p_postal_code:row.primary_contact.postal_code,
p_country:row.primary_contact.country,
p_state:row.primary_contact.state,
p_city:row.primary_contact.city,

///////////////////// billing info

billing_name:row.billing_info.billing_name,
biling_email_id:row.billing_info.billing_email_id,
billing_phone:row.billing_info.billing_phone_no,
billing_address:row.billing_info.billing_address,
billing_postal_code:row.billing_info.billing_postal_code,
billing_country:row.billing_info.billing_country,
billing_state:row.billing_info.billing_state,
billing_city:row.billing_info.billing_city,
billing_gst_no:row.billing_info.billing_gst_no,
billing_currency:row.billing_info.billing_currency,
billing_symbol:row.billing_info.billing_symbole,

//////////////////////// doc descriopm and set up 
document:row.attachment,
documentName:'',
doc_name:'',
doc_id:'',
files:'',

form_open:true,

})
  }}>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete"     onClick={()=>{
   this.setState({client_id:row.client_id,delete_confirmation:true})
}}>
  <IconButton disabled={this.state.client_role.is_delete?false:true}  size='small' >
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
          count={this.state.docLength}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
</Box>

<Box sx={{display:this.state.clistList.length>0?'none':'flex',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
  <img src={bg} style={{height:170,width:170,opacity:0.5}}/>
  <Typography sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>No Data Found</Typography>
</Box>

</Paper>
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
  fetch(`${base.base_url}/clientDelete`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'delete',
    body:JSON.stringify({
      client_id:this.state.client_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({delete_confirmation:false})
    this.retriveClient();
   this.delete();
  })
}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({delete_confirmation:false,client_id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>
</Box>

</Box>
</Paper>
</Box>
</Modal>
</Box>







<Box> 
<Modal
  open={this.state.delete_confirmation_all}
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
<Typography sx={{fontSize:13,color:'grey',textAlign:'center'}}>This action cannot be undone. All value associate to ALL Fields Deleted will be deleted</Typography>
</Box>

<Box sx={{ml:{xs:1,sm:3,md:6},mr:{xs:1,sm:3,md:6},mt:3,display:'flex',flexDirection:'column'}}>
<Button size='small'  variant='contained' onClick={()=>{

   fetch(`${base.base_url}/deleteAllClient`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'delete',
    body:JSON.stringify({
    }),
  }).then((res)=>{return res.json()}).then((result)=>{
    this.delete();
    this.setState({delete_confirmation_all:false})
    this.retriveClient();
  })
}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({delete_confirmation_all:false,client_id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>
</Box>
</Box>
</Paper>
</Box>
</Modal>
</Box>







<Box> 
<Modal
  open={this.state.form_open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'80%',lg:'80%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  form_open:false,
    client_id:'',
    client_name:"",
    client_phone:"",
    client_designation:"",
    client_group:"",
    client_address_1:"",
    client_address_2:"",
    client_postal_code:"",
    client_country:"",
    client_state:"",
    client_city:"",
    client_email:"",
client_password:"",
////////////////// primary_contact
p_client_designation:"",
    
    p_name:"",
    p_phone:"",
    p_email:"",
    p_address:"",
    p_postal_code:"",
    p_country:"",
    p_state:"",
    p_city:"",
    ///////////////////// billing info
    
    billing_name:"",
    biling_email_id:"",
    billing_phone:"",
    billing_address:"",
    billing_postal_code:"",
    billing_country:"",
    billing_state:"",
    billing_city:"",
    billing_gst_no:"",
    billing_currency:"",
    billing_symbol:"",
    /////////////////// files
    document:[],
    documentName:[],
    doc_name:"",
    doc_id:"",
    files:"",
  
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Client</Typography>

<Box sx={{width:'100%',height:50,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
<Tabs
  value={this.state.tab_value}
  //onChange={this.handleChange}
  textColor="primary"
  indicatorColor="primary"
  aria-label="tab-selector"
>
<Tab value="general_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:''}} label="General Info"  onClick={()=>{this.setState({tab_value:'general_info'})}}/>
  <Tab value="billing_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Billing Info" onClick={()=>{
   if(this.state.client_name!==""&&this.state.client_phone!==""&&this.state.client_group!==""&&this.state.client_address_1!==""&&this.state.client_address_2!==""&& this.state.client_postal_code!==""&&this.state.client_country!==""&&this.state.client_city!==""&&this.state.client_email!==""&&this.state.client_password!==""&&this.state.p_client_designation!==""&&this.state.p_name!==""&&this.state.p_phone!==""&&this.state.p_email!==""&&this.state.p_address!==""&&this.state.p_postal_code!==""&&this.state.p_country!==""&&this.state.p_city!==""
   ){
       this.setState({tab_value:'billing_info'})
   }else{
     this.fieldunfilled();
   }
  }}/>
  <Tab value="attachment" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Attachment" onClick={()=>{
     if(
      this.state.client_name!==""&&
      this.state.client_phone!==""&&
      this.state.client_group!==""&&
      this.state.client_address_1!==""&&
      this.state.client_address_2!==""&& 
      this.state.client_postal_code!==""&&
      this.state.client_country!==""&&
      this.state.client_city!==""&&
      this.state.client_email!==""&&
      this.state.client_password!==""&&
      this.state.p_client_designation!==""&&
      this.state.p_name!==""&&
      this.state.p_phone!==""&&
      this.state.p_email!==""&&
      this.state.p_address!==""&&
      this.state.p_postal_code!==""&&
      this.state.p_country!==""&&
      this.state.p_city!=="" &&
      this.state.billing_name!==""&&
     this.state.biling_email_id!==""&&
     this.state.billing_phone!==""&&
     this.state.billing_address!==""&&
     this.state.billing_postal_code!==""&&
     this.state.billing_country!==""&&
     this.state.billing_city!==""&&
     this.state.billing_currency!==""&&
     this.state.billing_symbol!==""
     ){
      
       this.setState({tab_value:'attachment'}) 
     }else{
       this.fieldunfilled();
     }
  }} />
</Tabs>



</Box>
<br/>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 },height:'66vh'}}>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'100%'}}>

<Box>


{
<Box sx={{ml:{xs:'1%',sm:'3%',md:'10%'},mr:{xs:'1%',sm:'3%',md:'10%'},display:this.state.tab_value==="general_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Group<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' select onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.client_group}  name="client_group" fullWidth size='small'>
  {
    [{id:1,name:'Direct'},{id:2,name:"Agency"},{id:3,name:'Publisher'}].map((s)=>(
      <MenuItem key={s.id} value={s.name} onClick={()=>this.setState({client_group:s.name})}>
      {s.name}
      </MenuItem>
    ))
  }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.client_name} name="client_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Phone No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.client_phone} name="client_phone" fullWidth size='small'/>
</Box>
</Grid>





<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address 1<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.client_address_1} name="client_address_1" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address 2<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} name="client_address_2" value={this.state.client_address_2} fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Postal Code <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.client_postal_code}  name="client_postal_code" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField   select InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.client_country} name="client_country" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))
  
 }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.client_state} name="client_state" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.client_city} name="client_city" fullWidth size='small'/>
</Box>
</Grid>



<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Email (For Login)<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.client_email} name="client_email" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Password<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='password' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.client_password} name="client_password" fullWidth size='small'/>
</Box>
</Grid>


</Grid>
<br/>
<br/>
<Typography sx={{fontSize:15,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Primary Contact<Typography sx={{color:'red'}}>*</Typography></Typography>
<br/>


<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.p_name} name="p_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Phone No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_phone}  name="p_phone" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Designation<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.p_client_designation}  name="p_client_designation" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Email ID<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_email}  name="p_email" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.p_address} name="p_address" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Postal Code<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_postal_code}  name="p_postal_code" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.p_country} name="p_country" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))
  
 }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_state} name="p_state" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_city}  name="p_city" fullWidth size='small'/>
</Box>
</Grid>


</Grid>

<br/>
<br/>
<Button variant='contained' size='small' onClick={()=>{
   if(this.state.client_name!==""&&this.state.client_phone!==""&&this.state.client_designation!==""&&this.state.client_group!==""&&this.state.client_address_1!==""&&this.state.client_address_2!==""&& this.state.client_postal_code!==""&&this.state.client_country!==""&&this.state.client_city!==""&&this.state.client_email!==""&&this.state.client_password!==""&&this.state.p_client_designation!==""&&this.state.p_name!==""&&this.state.p_phone!==""&&this.state.p_email!==""&&this.state.p_address!==""&&this.state.p_postal_code!==""&&this.state.p_country!==""&&this.state.p_city!==""
   ){
       this.setState({tab_value:'billing_info'})
   }else{
     this.fieldunfilled();
   }
}}  sx={{width:100,textTransform:'none',mr:1}}>Next</Button>
<br/>
<br/>
<br/>
<br/>

</Box>
}






{
    <Box sx={{ml:{xs:'1%',sm:'3%',md:'10%'},mr:{xs:'1%',sm:'3%',md:'10%'},display:this.state.tab_value==="billing_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Billing Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.billing_name}  name="billing_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
 <Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Email ID<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.biling_email_id} name="biling_email_id" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Phone Number<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_phone}  name="billing_phone" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address 1<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_address}  name="billing_address" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.billing_country} name="billing_country" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))
  
 }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Postal Code<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_postal_code}  name="billing_postal_code" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.billing_state} name="billing_state" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
< Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_city}  name="billing_city" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Currency<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_currency} name="billing_currency" fullWidth size='small'>
{[{ id:1,currency:"INR",currency_symbole:"₹"},{id:2,currency:"USD",currency_symbole:"$"},{id:3,currency:"Pounds",currency_symbole:"₤"},{id:4,currency:"Australian Dollar",currency_symbole:"AU$"}].map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.currency}  onClick={()=>this.setState({billing_currency:option.currency,billing_symbol:option.currency_symbole})}>
              {option.currency}
            </MenuItem>
          ))}
</TextField>
</Box>
</Grid>



<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Currency Symbol<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_symbol}  name="billing_symbol" fullWidth size='small'>
</TextField>
</Box>
</Grid>
</Grid>


<br/>

<Button variant='contained' size='small' onClick={()=>{
  if(this.state.billing_name!==""&&
  this.state.biling_email_id!==""&&
  this.state.billing_phone!==""&&
  this.state.billing_address!==""&&
  this.state.billing_postal_code!==""&&
  this.state.billing_country!==""&&
  this.state.billing_city!==""&&
  this.state.billing_currency!==""&&
  this.state.billing_symbol!==""
  ){
   
    this.setState({tab_value:'attachment'}) 
  }else{
    this.fieldunfilled();
  }
}}  sx={{width:100,textTransform:'none'}}>Next</Button>

<br/>
<br/>
<br/>
<br/>

</Box>
}




{
    <Box sx={{ml:{xs:'3%',sm:'5%',md:'25%'},mr:{xs:'2%',sm:'5%',md:'25%'},display:this.state.tab_value==="attachment"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={12} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Documents<Typography sx={{color:'red'}}></Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.doc_name} name="doc_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={12} >
<Box >

  <div id='container'>

    <input type='file'  name='files' onChange={this.handleChangeee}/>

  </div>

</Box>
</Grid>
<br/>
<br/>
<br/>
<Button size='small' onClick={()=>{
if(this.state.client_id!=="" && this.state.doc_name!=="" && this.state.files!==""){

const formData = new FormData();

formData.append('files',this.state.files);
formData.append('file_Name',this.state.doc_name)
formData.append('client_id',this.state.client_id)
this.setState({is_backdrop_open:true},()=>{
 fetch(`${base.base_url}/addMoreDocument`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    //'content-type':'application/json',
  },

  method:'put',
  body:formData,
}).then((res)=>{return res.json()}).then((data)=>{

 this.setState({document:data.data,is_backdrop_open:false},()=>{
  this.setState({doc_name:"", files:"",},()=>{
  // this.clearFileChoosen();
  })
 })
 this.succesdox()
}) 

})

}else{
this.docsfail();
}

}}  disableElevation variant='contained' startIcon={<AddIcon/>} sx={{textTransform:"none",ml:2,height:30}}>Add Documents</Button>
<br/>
<br/>
<Divider/>
<br/>
{
  this.state.document.map((e)=>(
    <Grid item xs={12} sm={12} >
    <Box sx={{display:'flex',flexDirection:'row'}} >
    <TextField   value={e.doc_name}  InputProps={{sx:{fontSize:12,fontWeight:'600'},endAdornment:<IconButton   onClick={()=>{
      fetch(`${base.base_url}/deleteDocuments`,{
        headers:{
          'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
          'content-type':'application/json',
        },
        method:'delete',
        body:JSON.stringify({
    client_id:this.state.client_id,
    doc_id:e.doc_id
        }),
      }).then((res)=>{return res.json()}).then((result)=>{
        this.delete();
       this.setState({document:result.data.attachment})
      })
    }}><CloseIcon sx={{color:'red',height:20,width:20}}/></IconButton>}}  name="first_name" fullWidth size='small' />

 <Paper onClick={()=>window.open(`${base.base_url}/`+e.url)} sx={{height:30,width:30,backgroundColor:'#145180',ml:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<DownloadIcon sx={{color:'#fff',height:17,width:17}}  />
   </Paper>

    </Box>
    </Grid>
  ))
}

</Grid>


<br/>
<br/>
<Button variant='contained'  disableElevation size='small' onClick={this.edit}  sx={{width:100,textTransform:'none'}}>Edit Apply</Button>


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
<br/>
<br/>
<br/>


</Box>
}





</Box>

<br/>
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







      </div>
    )
  }
}

export default ClientList
export function ClientListc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ClientList location={location} navigate={navigate}></ClientList>)
}





const country= ['Afghanistan',
'Albania',
'Algeria',
'Andorra',
'Angola',
'Antigua and Barbuda',
'Argentina',
'Armenia',
'Australia',
'Austria',
'Azerbaijan',
'The Bahamas',
'Bahrain',
'Bangladesh',
'Barbados',
'Belarus',
'Belgium',
'Belize',
'Benin',
'Bhutan',
'Bolivia',
'Bosnia and Herzegovina',
'Botswana',
'Brazil',
'Brunei',
'Bulgaria',
'Burkina Faso',
'Burundi',
'Cabo Verde',
'Cambodia',
'Cameroon',
'Canada',
'Central African Republic',
'Chad',
'Chile',
'China',
'Colombia',
'Comoros',
'Congo, Democratic Republic of the',
'Congo, Republic of the',
'Costa Rica',
'Côte d’Ivoire',
'Croatia',
'Cuba',
'Cyprus',
'Czech Republic',
'Denmark',
'Djibouti',
'Dominica',
'Dominican Republic',
'East Timor (Timor-Leste)',
'Ecuador',
'Egypt',
'El Salvador',
'Equatorial Guinea',
'Eritrea',
'Estonia',
'Eswatini',
'Ethiopia',
'Fiji',
'Finland',
'France',
'Gabon',
'The Gambia',
'Georgia',
'Germany',
'Ghana',
'Greece',
'Grenada',
'Guatemala',
'Guinea',
'Guinea-Bissau',
'Guyana',
'Haiti',
'Honduras',
'Hungary',
'Iceland',
'India',
'Indonesia',
'Iran',
'Iraq',
'Ireland',
'Israel',
'Italy',
'Jamaica',
'Japan',
'Jordan',
'Kazakhstan',
'Kenya',
'Kiribati',
'Korea, North',
'Korea, South',
'Kosovo',
'Kuwait',
'Kyrgyzstan',
'Laos',
'Latvia',
'Lebanon',
'Lesotho',
'Liberia',
'Libya',
'Liechtenstein',
'Lithuania',
'Luxembourg',
'Madagascar',
'Malawi',
'Malaysia',
'Maldives',
'Mali',
'Malta',
'Marshall Islands',
'Mauritania',
'Mauritius',
'Mexico',
'Micronesia, Federated States of',
'Moldova',
'Monaco',
'Mongolia',
'Montenegro',
'Morocco',
'Mozambique',
'Myanmar (Burma)',
'Namibia',
'Nauru',
'Nepal',
'Netherlands',
'New Zealand',
'Nicaragua',
'Niger',
'Nigeria',
'North Macedonia',
'Norway',
'Oman',
'Pakistan',
'Palau',
'Panama',
'Papua New Guinea',
'Paraguay',
'Peru',
'Philippines',
'Poland',
'Portugal',
'Qatar',
'Romania',
'Russia',
'Rwanda',
'Saint Kitts and Nevis',
'Saint Lucia',
'Saint Vincent and the Grenadines',
'Samoa',
'San Marino',
'Sao Tome and Principe',
'Saudi Arabia',
'Senegal',
'Serbia',
'Seychelles',
'Sierra Leone',
'Singapore',
'Slovakia',
'Slovenia',
'Solomon Islands',
'Somalia',
'South Africa',
'Spain',
'Sri Lanka',
'Sudan',
'Sudan, South',
'Suriname',
'Sweden',
'Switzerland',
'Syria',
'Taiwan',
'Tajikistan',
'Tanzania',
'Thailand',
'Togo',
'Tonga',
'Trinidad and Tobago',
'Tunisia',
'Turkey',
'Turkmenistan',
'Tuvalu',
'Uganda',
'Ukraine',
'United Arab Emirates',
'United Kingdom',
'United States',
'Uruguay',
'Uzbekistan',
'Vanuatu',
'Vatican City',
'Venezuela',
'Vietnam',
'Yemen',
'Zambia',
'Zimbabwe'];


const industry = [
    "Abrasives and Nonmetallic Minerals Manufacturing", 
    "Accommodation",
    "Accounting Domain",
    "Administration of Justice",
    "Administrative and Support Services",
    "Advertising Services",
    "Agricultural Chemical Manufacturing",
    "Agriculture, Construction, Mining Machinery Manufacturing",
    "Air, Water, and Waste Program ",
    "Airlines and Aviation",
    "Alternative Dispute Resolution",
    "Alternative Medicine",
    "Ambulance Services",
    "Amusement Parks and Arcades",
    "Animal Feed Manufacturing",
    "Animation and Post-production",
    "Apparel Manufacturing",
    "Appliances, Electrical, and Electronics Manufacturing",
    "Architectural and Structural Metal Manufacturing",
    "Architecture and Planning",
    "Armed Forces",
    "Artificial Rubber and Synthetic Fiber Manufacturing",
    "Artists and Writers",
    "Audio and Video Equipment Manufacturing",
    "Automation Machinery Manufacturing",
    "Aviation and Aerospace Component Manufacturing",
    "Baked Goods Manufacturing",
    "Banking",
    "Bars, Taverns, and Nightclubs",
    "Bed-and-Breakfasts, Hostels, Homestays",
    "Beverage Manufacturing",
    "Biomass Electric Power Generation",
    "Biotechnology Research",
    "Blockchain Services",
    "Blogs",
    "Boilers, Tanks, and Shipping Container Manufacturing",
    "Book and Periodical Publishing",
    "Book Publishing",
    "Breweries",
    "Broadcast Media Production and Distribution",
    "Building Construction",
    "Building Equipment Contractors",
    "Building Finishing Contractors",
    "Building Structure and Exterior Contractors",
    "Business Consulting and Services",
    "Business Content",
    "Business Intelligence Platforms",
    "Cable and Satellite Programming",
    "Capital Markets",
    "Caterers",
    "Chemical Manufacturing",
    "Chemical Raw Materials Manufacturing",
    "Child Day Care Services",
    "Chiropractors",
    "Circuses and Magic Shows",
    "Civic and Social Organizations",
    "Civil Engineering",
    "Claims Adjusting, Actuarial Services",
    "Clay and Refractory Products Manufacturing",
    "Coal Mining",
    "Collection Agencies",
    "Commercial and Industrial Equipment Rental",
    "Commercial and Industrial Machinery Maintenance",
    "Commercial and Service Industry Machinery Manufacturing",
    "Communications Equipment Manufacturing",
    "Community Development and Urban Planning",
    "Community Services",
    "Computer and Network Security",
    "Computer Games",
    "Computer Hardware Manufacturing",
    "Computer Networking Products",
    "Computers and Electronics Manufacturing",
    "Conservation Programs",
    "Construction",
    "Construction Hardware Manufacturing",
    "Consumer Goods Rental",
    "Consumer Services",
    "Correctional Institutions",
    "Cosmetology and Barber Schools",
    "Courts of Law",
    "Credit Intermediation",
    "Cutlery and Handtool Manufacturing",
    "Dairy Product Manufacturing",
    "Dance Companies",
    "Data Infrastructure and Analytics",
    "Data Security Software Products",
    "Defense and Space Manufacturing",
    "Dentists",
    "Design Services",
    "Desktop Computing Software Products",
    "Distilleries",
    "Economic Programs",
    "Education",
    "Education Administration Programs",
    "E-Learning Providers",
    "Electric Lighting Equipment Manufacturing",
    "Electric Power Generation",
    "Electric Power Transmission, Control, and Distribution",
    "Electrical Equipment Manufacturing",
    "Electronic and Precision Equipment Maintenance",
    "Embedded Software Products",
    "Emergency and Relief Services",
    "Engineering Services",
    "Engines and Power Transmission Equipment Manufacturing",
    "Entertainment Providers",
    "Environmental Quality Programs",
    "Environmental Services",
    "Equipment Rental Services",
    "Events Services",
    "Executive Offices",
    "Executive Search Services",
    "Fabricated Metal Products",
    "Facilities Services",
    "Family Planning Centers",
    "Farming",
    "Farming, Ranching, Forestry",
    "Fashion Accessories Manufacturing",
    "Financial Services",
    "Fine Arts Schools",
    "Fire Protection",
    "Fisheries",
    "Flight Training",
    "Food and Beverage Manufacturing",
    "Food and Beverage Retail",
    "Food and Beverage Services",
    "Footwear and Leather Goods Repair",
    "Footwear Manufacturing",
    "Forestry and Logging",
    "Fossil Fuel Electric Power Generation",
    "Freight and Package Transportation",
    "Fruit and Vegetable Preserves Manufacturing",
    "Fundraising",
    "Funds and Trusts",
    "Furniture and Home Furnishings Manufacturing",
    "Gambling Facilities and Casinos",
    "Geothermal Electric Power Generation",
    "Glass Product Manufacturing",
    "Glass, Ceramics and Concrete Manufacturing",
    "Golf Courses and Country Clubs",
    "Government Administration",
    "Government Relations Services",
    "Graphic Design",
    "Ground Passenger Transportation",
    "Health and Human Services",
    "Higher Education",
    "Highway, Street, and Bridge Construction",
    "Historical Sites",
    "Holding Companies",
    "Home Health Care Services",
    "Horticulture",
    "Hospitality",
    "Hospitals",
    "Hospitals and Health Care",
    "Hotels and Motels",
    "Household and Institutional Furniture Manufacturing",
    "Household Appliance Manufacturing",
    "Household Services",
    "Housing and Community Development",
    "Housing Programs",
    "Human Resources Services",
    "HVAC and Refrigeration Equipment Manufacturing",
    "Hydroelectric Power Generation",
    "Individual and Family Services",
    "Industrial Machinery Manufacturing",
    "Industry Associations",
    "Information Services",
    "Insurance",
    "Insurance Agencies and Brokerages",
    "Insurance and Employee Benefit Funds",
    "Insurance Carriers",
    "Interior Design",
    "International Affairs",
    "International Trade and Development",
    "Internet Marketplace Platforms",
    "Internet News",
    "Internet Publishing",
    "Interurban and Rural Bus Services",
    "Investment Banking",
    "Investment Advice",
    "Investment Management",
    "IT Services and IT Consulting",
    "IT System Custom Software Development",
    "IT System Data Services",
    "IT System Design Services",
    "IT System Installation and Disposal",
    "IT System Operations and Maintenance",
    "IT System Testing and Evaluation",
    "IT System Training and Support",
    "Janitorial Services",
    "Landscaping Services",
    "Language Schools",
    "Laundry and Drycleaning Services",
    "Law Enforcement",
    "Law Practice",
    "Leasing Non-residential Real Estate",
    "Leasing Residential Real Estate",
    "Leather Product Manufacturing",
    "Legal Services",
    "Legislative Offices",
    "Libraries",
    "Lime and Gypsum Products Manufacturing",
    "Loan Brokers",
    "Machinery Manufacturing",
    "Magnetic and Optical Media Manufacturing",
    "Manufacturing",
    "Maritime Transportation",
    "Market Research",
    "Marketing Services",
    "Mattress and Blinds Manufacturing",
    "Measuring and Control Instrument Manufacturing",
    "Meat Products Manufacturing",
    "Media and Telecommunications",
    "Media Production",
    "Medical and Diagnostic Laboratories",
    "Medical Equipment Manufacturing",
    "Medical Practices",
    "Mental Health Care",
    "Metal Ore Mining",
    "Metal Treatments",
    "Metal Valve, Ball, and Roller Manufacturing",
    "Metalworking Machinery Manufacturing",
    "Military and International Affairs",
    "Mining",
    "Mobile Computing Software Products",
    "Mobile Food Services",
    "Mobile Gaming Apps",
    "Motor Vehicle Manufacturing",
    "Motor Vehicle Parts Manufacturing",
    "Movies and Sound Recording",
    "Movies, Videos, and Sound",
    "Museums",
    "Museums, Historical Sites, and Zoos",
    "Musicians",
    "Nanotechnology Research",
    "Natural Gas Distribution",
    "Natural Gas Extraction",
    "Newspaper Publishing",
    "Nonmetallic Mineral Mining",
    "Non-profit Organizations",
    "Nonresidential Building Construction",
    "Nuclear Electric Power Generation",
    "Nursing Homes and Residential Care Facilities",
    "Office Administration",
    "Office Furniture and Fixtures Manufacturing",
    "Oil and Coal Product Manufacturing",
    "Oil and Gas",
    "Oil Extraction",
    "Oil, Gas, and Mining",
    "Online and Mail Order Retail",
    "Online Audio and Video Media",
    "Operations Consulting",
    "Optometrists",
    "Outpatient Care Centers",
    "Outsourcing and Offshoring Consulting",
    "Packaging and Containers Manufacturing",
    "Paint, Coating, and Adhesive Manufacturing",
    "Paper and Forest Product Manufacturing",
    "Pension Funds",
    "Performing Arts",
    "Performing Arts and Spectator Sports",
    "Periodical Publishing",
    "Personal and Laundry Services",
    "Personal Care Product Manufacturing",
    "Personal Care Services",
    "Pet Services",
    "Pharmaceutical Manufacturing",
    "Philanthropic Fundraising Services",
    "Photography",
    "Physical, Occupational and Speech Therapists",
    "Physicians",
    "Pipeline Transportation",
    "Plastics and Rubber Product Manufacturing",
    "Plastics Manufacturing",
    "Political Organizations",
    "Postal Services",
    "Primary and Secondary Education",
    "Primary Metal Manufacturing",
    "Printing Services",
    "Professional Organizations",
    "Professional Services",
    "Professional Training and Coaching",
    "Public Assistance Programs",
    "Public Health",
    "Public Policy Offices",
    "Public Relations and Communications Services",
    "Public Safety",
    "Racetracks",
    "Radio and Television Broadcasting",
    "Rail Transportation",
    "Railroad Equipment Manufacturing",
    "Ranching",
    "Ranching and Fisheries",
    "Real Estate",
    "Real Estate Agents and Brokers",
    "Real Estate and Equipment Rental Services",
    "Recreational Facilities",
    "Religious Institutions",
    "Renewable Energy Equipment Manufacturing",
    "Renewable Energy Power Generation",
    "Renewable Energy Semiconductor Manufacturing",
    "Repair and Maintenance",
    "Research Services",
    "Residential Building Construction",
    "Restaurants",
    "Retail",
    "Retail Apparel and Fashion",
    "Retail Appliances, Electrical, and Electronic Equipment",
    "Retail Art Dealers",
    "Retail Art Supplies",
    "Retail Books and Printed News",
    "Retail Building Materials and Garden Equipment",
    "Retail Florists",
    "Retail Furniture and Home Furnishings",
    
    "Retail Groceries",
    "Retail Health and Personal Care Products",
    "Retail Luxury Goods and Jewelry",
    "Retail Motor Vehicles",
    "Retail Musical Instruments",
    "Office Equipment",
    "Retail Office Supplies and Gifts",
    "Retail Recyclable Materials & Used Merchandise",
    "Reupholstery and Furniture Repair",
    "Rubber Products Manufacturing",
    "Satellite Telecommunications",
    "Savings Institutions",
    "School and Employee Bus Services",
    "Seafood Product Manufacturing",
    "Secretarial Schools",
    "Securities and Commodity Exchanges",
    "Security and Investigations",
    "Security Guards and Patrol Services",
    "Security Systems Services",
    "Semiconductor Manufacturing",
    "Services for Renewable Energy",
    "Services for the Elderly and Disabled",
    "Sheet Music Publishing",
    "Shipbuilding",
    "Shuttles and Special Needs Transportation Services",
    "Sightseeing Transportation",
    "Skiing Facilities",
    "Soap and Cleaning Product Manufacturing",
    "Social Networking Platforms",
    "Software Development",
    "Solar Electric Power Generation",
    "Sound Recording",
    "Space Research and Technology",
    "Specialty Trade Contractors",
    "Spectator Sports",
    "Sporting Goods Manufacturing",
    "Sports and Recreation Instruction",
    "Sports Teams and Clubs",
    "Spring and Wire Product Manufacturing",
    "Staffing and Recruiting",
    "Steam and Air-Conditioning Supply",
    "Strategic Management Services",
    "Subdivision of Land",
    "Sugar and Confectionery Product Manufacturing",
    "Taxi and Limousine Services",
    "Technical and Vocational Training",
    "Technology, Information and Internet",
    "Technology, Information and Media",
    "Telecommunications",
    "Telecommunications Carriers",
    "Telephone Call Centers",
    "Temporary Help Services",
    "Textile Manufacturing",
    "Theater Companies",
    "Think Tanks",
    "Tobacco Manufacturing",
    "Translation and Localization",
    "Transportation Equipment Manufacturing",
    "Transportation Programs",
    "Transportation, Logistics, Supply Chain and Storage",
    "Travel Arrangements",
    "Truck Transportation",
    "Trusts and Estates",
    "Turned Products and Fastener Manufacturing",
    "Urban Transit Services",
    "Utilities",
    "Utilities Administration",
    "Utility System Construction",
    "Vehicle Repair and Maintenance",
    "Venture Capital and Private Equity Principals",
    "Veterinary Services",
    "Vocational Rehabilitation Services",
    "Warehousing and Storage",
    "Waste Collection",
    "Waste Treatment and Disposal",
    "Water Supply and Irrigation Systems",
    "Water, Waste, Steam, and Air Conditioning Services",
    "Wellness and Fitness Services",
    "Wholesale",
    "Wholesale Alcoholic Beverages",
    "Wholesale Apparel and Sewing Supplies",
    "Wholesale Appliances, Electrical, and Electronics",
    "Wholesale Building Materials",
    "Wholesale Chemical and Allied Products",
    "Wholesale Computer Equipment",
    "Wholesale Drugs and Sundries",
    "Wholesale Food and Beverage",
    "Wholesale Footwear",
    "Wholesale Furniture and Home Furnishings",
    "Wholesale Hardware, Plumbing, Heating Equipment",
    "Wholesale Import and Export",
    "Wholesale Luxury Goods and Jewelry",
    "Wholesale Machinery",
    "Wholesale Metals and Minerals",
    "Wholesale Motor Vehicles and Parts",
    "Wholesale Paper Products",
    "Wholesale Petroleum and Petroleum Products",
    "Wholesale Photography Equipment and Supplies",
    "Wholesale Raw Farm Products",
    "Wholesale Recyclable Materials",
    "Wind Electric Power Generation",
    "Wineries",
    "Wireless Services",
    "Women's Handbag Manufacturing",
    "Wood Product Manufacturing",
    "Writing and Editing",
    "Zoos and Botanical Gardens",
    "Other",
    
    ]
      







