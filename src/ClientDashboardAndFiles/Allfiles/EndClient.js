import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import moment from 'moment'
import { Sidebarc } from '../Sidebar'
import { Divider,Button, Grid, Paper, Typography,Backdrop, alertClasses, Switch } from '@mui/material'
import {Tooltip,IconButton,Box,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Tabs from '@mui/material/Tabs';
import Checkbox from 'rc-checkbox';
import {Link} from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {SyncLoader} from 'react-spinners'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import base from '../../base'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Mail from '@mui/icons-material/Mail'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { ToastContainer, toast } from 'react-toastify';
import bg from '../../../src/img/bgimg.svg'
import 'react-toastify/dist/ReactToastify.css';


const drawerWidth = 240;

const JsonSearch = require('search-array').default


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








export class EndClient extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       open_form_add_end_client:false,
       open_form_edit_end_client:false,
       search:'',

        id:"",
       end_client_name : '',
       end_client_list : [],



       rowsPerPage:10,
       page:0,

       permissiondata : JSON.parse(sessionStorage.getItem('permission')),
       credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
     
    }
    this.handlechange = this.handlechange.bind()
  }

handlechange= (e)=>{
  this.setState({[e.target.name]:e.target.value})
}


handleChangePage = (event, newPage) => {
  this.setState({page:newPage})
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0})
};


 async componentDidMount(){
  this.setState({is_loader_open:true},()=>{

     fetch(`${base.base_url}/retriveEndClient`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id : this.state.credential_type.client_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
   this.setState({
    end_client_list : result.data,
    is_loader_open : false
   })
  })
  })
 

  }






instantReload=()=>{

  this.setState({is_loader_open:true},()=>{
  fetch(`${base.base_url}/retriveEndClient`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id : this.state.credential_type.client_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
   this.setState({
    end_client_list : result.data,
    is_loader_open:false
   })
  })
  })
}


update=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>End Client Updated</Typography>, {
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

success=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>End Client added</Typography>, {
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


fillAllField=()=>{
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



    const searcher = new JsonSearch(this.state.end_client_list, {
      indice: {
        'end_client_name':'end_client_name', // search the `title`
      }
    })

    let filtered_data = searcher.query(this.state.search)

    let mm =   stableSort(filtered_data, getComparator(this.state.order, this.state.orderBy)).slice(
      this.state.page * this.state.rowsPerPage,
      this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
    )
    


    ////////// handle slice for contact of single departmnent //////////


    
  


    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,},marginBottom:1,marginLeft:2,mt:{xs:3,sm:2,md:1},fontWeight:'500',color:'#3e3e40'}}>End Client</Typography>

<Box sx={{display:'flex'}}>

<Box sx={{width:'100%',mt:2}}>
<Box>
<Paper elevation={1} sx={{minHeight:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:'space-between',}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',color:'#666666',mt:1,mb:1,ml:2}}>End Client</Typography>
</Box>

<Box sx={{display:'flex',mt:1,flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:{sx:'right',sm:'right'},mr:2,ml:2,mb:1,alignItems:{xs:'left',sm:'center'},mr:{xs:1,sm:2,md:3}}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30,mr:1}}>
<TextField  sx={{minWidth:100}} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}} onChange={this.handlechange} name='search'  placeholder='search'/>
</Box>
<Box>
 <Button  disabled={this.state.permissiondata?this.state.permissiondata.end_client.is_create?false:true:true} onClick={()=>this.setState({open_form_add_end_client:true})}  sx={{textTransform:'none',mt:{xs:1,sm:1,md:0},height:30,backgroundColor:'#008ffb',fontWeight:'600',minWidth:100}} disableElevation variant="contained" startIcon={<AddIcon sx={{color:'#fff'}}/>}>
 End Client
</Button> 
</Box>
</Box>
</Paper>



<Paper sx={{minHeight:300,mt:1}}>
  <br/>
<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr. No</TableCell>
          <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Client</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Created At</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Active/InActive</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191',mr:2}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mm.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,backgroundColor:row.is_active?'':'rgba(242,148,148,0.1)'}}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#42526e'}}  >
               {index+1}.
              </TableCell> 
              <TableCell align='center' sx={{color:'#42526e'}}>{row.id}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}} >
            
              <Box sx={{height:23,display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#2d85d1'}}>{row.end_client_name}</Typography></Box> 
          
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small'  checked={row.is_active} onClick={()=>{

fetch(`${base.base_url}/updateEndClientStatus`,{
  headers:{
    'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
    'content-type':'application/json',
  },
  method:'put',
  body:JSON.stringify({
   id:row.id,
   status : row.is_active?false:true
  })
}).then((res)=>{return res.json()}).then((result)=>{
this.instantReload();
this.update();
})

              }}/></TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
                <Tooltip title="Edit">
  <IconButton disabled={this.state.permissiondata?this.state.permissiondata.end_client.is_edit?false:true:true} onClick={()=>{
this.setState({
  end_client_name:row.end_client_name,
  id:row.id,
  open_form_edit_end_client:true
})

  }} sx={{backgroundColor:'rgba(242,148,148,0.1)'}} size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#f29494',height:15,width:15}}/>
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
   <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.end_client_list.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
</Box>

<Box sx={{display:this.state.end_client_list.length>0?'none':'flex',width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
  <img src={bg} style={{height:170,width:170,opacity:0.5}}/>
  <Typography sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>No Data Found</Typography>
</Box>



</Paper>
</Box>
</Box>
</Box>



</Box>
</Box>
</Box>

<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>





<Box> 
<Modal
  open={this.state.open_form_add_end_client}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'55%',lg:'35%'},height:'30vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({open_form_add_end_client:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Box sx={{paddingLeft:3,paddingRight:3}}>
<Typography sx={{fontSize:18,fontWeight:'600',mb:2}}>Add End Client</Typography>
<TextField onChange={this.handlechange}  value={this.state.end_client_name} name='end_client_name'  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  fullWidth size='small'/>
<Button size='small' disableElevation onClick={()=>{
  // function for add end client
  
if(this.state.end_client_name!==""){

  fetch(`${base.base_url}/addEndClientData`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      end_client_name : this.state.end_client_name,
      client_id : this.state.credential_type.client_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.success();
    this.instantReload();
    this.setState({
      end_client_name:"",
      id:"",
      open_form_add_end_client:false
    })
  })


}else{
  this.fillAllField();
}



}}  variant='contained' sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},textTransform:'none',mt:2}}>Add</Button>
</Box>
</Paper>
</Box>
</Modal>
</Box>




<Box> 
<Modal
  open={this.state.open_form_edit_end_client}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'55%',lg:'35%'},height:'30vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  open_form_edit_end_client:false,
  end_client_name:"",
  id:"",
  
  })} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Box sx={{paddingLeft:3,paddingRight:3}}>
<Typography sx={{fontSize:18,fontWeight:'600',mb:2}}>Add End Client</Typography>
<TextField onChange={this.handlechange}  value={this.state.end_client_name} name='end_client_name'  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  fullWidth size='small'/>
<Button size='small' disableElevation onClick={()=>{
  // function for add end client
  
if(this.state.end_client_name!==""){

  fetch(`${base.base_url}/updateEndClientData`,{
    headers:{
      'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
      'content-type':'application/json',
    },
    method:'put',
    body:JSON.stringify({
      end_client_name : this.state.end_client_name,
      id:this.state.id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.update();
    this.instantReload();
    this.setState({
      end_client_name:"",
      id:"",
      open_form_edit_end_client:false
    })
  })


}else{
  this.fillAllField();
}



}}  variant='contained' sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},textTransform:'none',mt:2}}>Add</Button>
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


     </div>
    )
  }
}

export default EndClient


