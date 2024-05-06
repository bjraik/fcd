import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import { Sidebarc } from '../../Sidebar'
import { Button, Paper, Typography,Switch } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate,useLocation,useMatch,Link, useParams } from 'react-router-dom';
import {Tooltip,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import base from '../../../base'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import moment from 'moment'
import ReactTimeAgo from 'react-time-ago'
import { SyncLoader } from 'react-spinners';
import en from 'javascript-time-ago/locale/en.json'
import TimeAgo from 'javascript-time-ago'
import bg from '../../../img/bgimg.svg'
TimeAgo.addDefaultLocale(en)
const JsonSearch = require('search-array').default


const drawerWidth = 240;



const password = require('secure-random-password');



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


function stableSortContact(array, comparator) {
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



export class ClientdashboardDepartmentAdd extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         client_details : JSON.parse(sessionStorage.getItem('payload')),

         open_form_add_dept : false,
         edit_dept_form : false,
         department_name:"",
         department_list:[],
         contact_List:[],
         delete_confirmation:false,
         department_id:"",
         search:"",
         page:0,
         rowsPerPage:10,

         searchContact:"",
         pageContact:0,
         rowsPerPageContact:10,

         is_loader_open:true,
         is_contact_list_show:false,
         is_backdrop_open:false,
     

         permissiondata : JSON.parse(sessionStorage.getItem('permission')),


      }
      this.handleChange = this.handleChange.bind(this)
    }



handleChange=(e)=>{
  this.setState({
   [e.target.name] : e.target.value
  })
}

handleChangePage = (event, newPage) => {
  this.setState({page:newPage})
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0})
};


handleChangePageContact = (event, newPage) => {
  this.setState({pageContact:newPage})
};

handleChangeRowsPerPageContact = (event) => {
  this.setState({rowsPerPageContact:parseInt(event.target.value, 10)})
  this.setState({pageContact:0})
};



componentDidMount(){
  this.setState({is_loader_open:true})
  fetch(`${base.base_url}/retrive_all_dept_new`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id:this.state.client_details.client_id,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.setState({department_list:result.data})
this.setState({is_loader_open:false})
  })
}



InstantRetrive=()=>{
  this.setState({is_loader_open:true})
  fetch(`${base.base_url}/retrive_all_dept_new`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id:this.state.client_details.client_id,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.setState({department_list:result.data,is_loader_open:false})
  })
}



    succes=()=>{
      toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Department Successfully Added</Typography>, {
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
    

  departmentDeleted=()=>{
      toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Department Successfully Deleted</Typography>, {
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


    departmentEdited=()=>{
      toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Department Successfully Updated</Typography>, {
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


    AllFieldRequired=()=>{
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




    active=()=>{
      toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Person Successfully Active</Typography>, {
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

    inactive=()=>{
      toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Person Successfully Inactive</Typography>, {
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

    const searcher = new JsonSearch(this.state.department_list, {
      indice: {
        'department_name':'department_name', // search the `title`
      }
    })

    let filtered_data = searcher.query(this.state.search)

    let mm =   stableSort(filtered_data, getComparator(this.state.order, this.state.orderBy)).slice(
      this.state.page * this.state.rowsPerPage,
      this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
    )


    ////////// handle slice for contact of single departmnent //////////


    const searcherrr = new JsonSearch(this.state.contact_List, {
      indice: {
       // search the `title`
       'department_name':'department_name',
        'first_name': 'first_name', // search the `author` but it's renamed as `name` in queries
        'last_name':'last_name',
        'job_title':'job_title',
        'phone_no':'phone_no',
        'email_id':'email_id'
      }
    })

    let filtered_data_contact = searcherrr.query(this.state.searchContact)



    let contactListSliced =   stableSortContact(filtered_data_contact, getComparatorContact(this.state.order, this.state.orderBy)).slice(
      this.state.pageContact * this.state.rowsPerPageContact,
      this.state.pageContact * this.state.rowsPerPageContact + this.state.rowsPerPageContact,
    )



    return (
  <div>

<Box sx={{display:'flex'}}>

<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:2,sm:3}, mt:6}}>



<Box sx={{width:'100%',mt:2}}>
<Box>
<Paper sx={{minHeight:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:{xs:'column',sm:'row'},justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',color:'#666666',mt:1,mb:1,ml:2}}>Department List</Typography>
</Box>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row'},ml:1,mr:1,mb:1,justifyContent:{XS:'left',sm:'right'},alignItems:{xs:'left',sm:'center'},mr:{xs:1,sm:2,md:3}}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30,mr:1,mt:1}}>
<TextField  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}} onChange={this.handleChange} name='search'  placeholder='search'/>
</Box>



  <Box sx={{mt:1}}>
  <Button size='small' disabled={this.state.permissiondata?this.state.permissiondata.department.is_create?false:true:true} onClick={()=>this.setState({open_form_add_dept:true})}  sx={{textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon sx={{color:'#fff'}}/>}>
   Add Department
</Button>
</Box>

</Box>
</Paper>



<Box sx={{minHeight:600,mt:1}}>
<Box sx={{mt:0}}>
<TableContainer component={Paper}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr. No</TableCell>
          <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Dept ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Dept Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Created At</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191',mr:2}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mm.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:index % 2?'#f9f9f9':'#fff' }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#42526e'}}  >
               {index+1}.
              </TableCell> 
              <TableCell align='center' sx={{color:'#42526e'}}>{row.department_id}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}  onClick={()=>{
                this.setState({
                  is_contact_list_show:true,
                  is_backdrop_open:true,
                })
               fetch(`${base.base_url}/retriveAllContactByDepartmentId`,{
                headers:{
                  'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
                  'content-type':'application/json',
                },
                method:'post',
                body:JSON.stringify({
                  department_id:row.department_id,
                })
              }).then((res)=>{return res.json()}).then((result)=>{
            this.setState({contact_List:result.data,is_backdrop_open:false})
              })
            }}> <Button variant='contained' sx={{fontSize:10,fontWeight:'600',height:20,backgroundColor:'#259efa'}}  disableElevation size='small' ><Link style={{color:'#fff'}}>{row.department_name}</Link></Button></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.created_at).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small' disabled={this.state.permissiondata?this.state.permissiondata.department.is_edit?false:true:true} onClick={()=>this.setState({
  edit_dept_form:true,
  department_name:row.department_name,
  department_id:row.department_id
  })}>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete" >
  <IconButton size='small' disabled={this.state.permissiondata?this.state.permissiondata.department.is_delete?false:true:true} onClick={()=>{
this.setState({
  department_id:row.department_id,
  delete_confirmation:true
})
  }}>
<DeleteForeverIcon sx={{color:'#f29494',height:15,width:15}}/>
</IconButton>
</Tooltip>
 </Box></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider sx={{marginBottom:0.5}}/>

   <TablePagination
  
          rowsPerPageOptions={[5, 10, 25]}
          component={Paper}
          count={filtered_data.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
</Box>

<Box sx={{display:mm.length>0?'none':'flex',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
  <img src={bg} style={{height:170,width:170,opacity:0.5}}/>
  <Typography sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>No Data Found</Typography>
</Box>



</Box>
</Box>
</Box>
</Box>


</Box>
</Box>









{
    /// below for add form dept
}

<Box> 
<Modal
  open={this.state.open_form_add_dept}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'55%',lg:'30%'},height:'30vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({open_form_add_dept:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Box sx={{paddingLeft:3,paddingRight:3}}>
<Typography sx={{fontSize:18,fontWeight:'600',mb:2}}>Add Department</Typography>
<TextField onChange={this.handleChange}  value={this.state.department_name} name='department_name'  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  fullWidth size='small'/>
<Button size='small' disableElevation onClick={()=>{
  // function for add dept
  if(this.state.department_name!==""){
    // function for add dept
    fetch(`${base.base_url}/add_department_new`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        client_id:this.state.client_details.client_id,
        department_name:this.state.department_name
      })
    }).then((res)=>{return res.json()}).then((result)=>{
     this.succes();
this.InstantRetrive()
     this.setState({
      department_name:"",
      open_form_add_dept:false
     })
    })
  
    }else{
      this.AllFieldRequired();
    }
}}  variant='contained' sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},textTransform:'none',mt:2}}>Add Department</Button>
</Box>
</Paper>
</Box>
</Modal>
</Box>






{
    /// edit form dept
}
<Box> 
<Modal
  open={this.state.edit_dept_form}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'55%',lg:'30%'},height:'30vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({edit_dept_form:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Box sx={{paddingLeft:3,paddingRight:3}}>
<Typography sx={{fontSize:18,fontWeight:'600',mb:2}}>Edit Department</Typography>
<TextField onChange={this.handleChange}  value={this.state.department_name} name='department_name'  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  fullWidth size='small'/>
<Button size='small' disableElevation onClick={()=>{
  
  if(this.state.department_name!==""){
    // function for add dept
    fetch(`${base.base_url}/update_department_new`,{
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      method:'put',
      body:JSON.stringify({
        client_id:this.state.client_details.client_id,
        department_name:this.state.department_name,
        department_id:this.state.department_id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
     this.InstantRetrive()
     this.departmentEdited()
     this.setState({
      department_name:"",
      department_id:"",
      edit_dept_form:false
     })
    })
  
    }else{
      this.AllFieldRequired();
    }
}}  variant='contained' sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},textTransform:'none',mt:2}}>Edit Department</Button>



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

fetch(`${base.base_url}/delete_department_new`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'delete',
    body:JSON.stringify({
  department_id:this.state.department_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
  this.InstantRetrive();
  this.departmentDeleted();
  this.setState({
    delete_confirmation:false,
    is_backdrop_open:false,
    department_id:""
  })
  })

  })
  



}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({delete_confirmation:false,department_id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>

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







{
  //// all contact in sigle department
}



<Box>
<Modal
  open={this.state.is_contact_list_show}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'80%',lg:'70%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
 is_contact_list_show:false
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row'},justifyContent:'space-between'}}>
  <Typography sx={{fontSize:18,fontWeight:'600',mb:{xs:1,sm:2},ml:{xs:2,sm:7},mt:4,color:'#737373'}}>Contact List</Typography>
  <Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30,mr:1,mt:{xs:1,sm:4},mr:{xs:2,sm:7},ml:{xs:2,sm:7}}}>
  <TextField  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}} onChange={this.handleChange} name='searchContact' value={this.state.searchContact}  placeholder='search'/>
</Box>
</Box>

<Box sx={{paddingLeft:{xs:2,sm:5},paddingRight:{xs:2,sm:5}}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:920 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr. No</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Name</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Job Title</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Email Id</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Phone No</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Active/Inactive</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactListSliced.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  component="th"  scope="row" sx={{color:'#42526e',fontSize:13,textTransform:'capitalize',ml:5}}  >
             <Typography sx={{ml:1,fontSize:13}}>{this.state.pageContact * this.state.rowsPerPageContact + i + 1}</Typography> 
              </TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}}>{row.first_name + " " + row.last_name}</TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}}>{row.job_title}</TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}}>{row.email_id}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:13,textTransform:'capitalize'}}>{row.phone_no}</TableCell>
              <TableCell align='right'><Box sx={{mr:3}}><Switch size='small' checked={row.is_active} onClick={()=>{
           fetch(`${base.base_url}/changeContactStatus`,{
           headers:{
            'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
           'content-type':'application/json',
           },
            method:'put',
            body:JSON.stringify({
            is_active:!row.is_active,
            contact_id:row.contact_id
           })
           }).then((res)=>{return res.json()}).then((result)=>{
           
           if(!row.is_active){
           this.active()
           }else{
            this.inactive()
           }


            fetch(`${base.base_url}/retriveAllContactByDepartmentId`,{
              headers:{
                'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
                'content-type':'application/json',
              },
              method:'post',
              body:JSON.stringify({
                department_id:row.department_id,
              })
            }).then((res)=>{return res.json()}).then((result)=>{
          this.setState({contact_List:result.data})
            })
           })
              }}/></Box></TableCell>
            </TableRow>
          ))
        
        }
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
  
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component='div'
          count={filtered_data_contact.length}
          rowsPerPage={this.state.rowsPerPageContact}
          page={this.state.pageContact}
          onPageChange={this.handleChangePageContact}
          onRowsPerPageChange={this.handleChangeRowsPerPageContact}
        /> 



</Box>

<Box sx={{display:contactListSliced.length>0?'none':'flex',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
  <img src={bg} style={{height:170,width:170,opacity:0.5}}/>
  <Typography sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>No Data Found</Typography>
</Box>


{
  //// showing loading status
}
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_backdrop_open}
>
  <Paper elevation={0} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
  <CircularProgress size={80} sx={{color:'#0088cc'}} thickness={1} />
  </Paper>
</Backdrop>


</Paper>
  </Box>
</Modal>
</Box>










<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>

     </div>
    )
  }
}

export default ClientdashboardDepartmentAdd

export function ClientdashboardDepartmentAddc(props){
  const navigate = useNavigate();
  const param  = useParams();
  const location = useLocation();
  return (<ClientdashboardDepartmentAdd location={location} param={param} navigate={navigate}></ClientdashboardDepartmentAdd>)
}


















