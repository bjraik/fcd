import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Paper, Switch, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,Link,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment,Checkbox} from '@mui/material'
import { createRoutesFromElements, json } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation,useNavigate } from 'react-router-dom'
import base from '../base'
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

export class CreateRoles extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       is_backdrop_open:false,





       role_name:"",
       client:{
        is_create:true,
        is_edit:true,
        is_delete:true,
        is_view:true
     },
     campaign:{
        is_create:true,
        is_edit:true,
        is_delete:true,
        is_view:true
     },
     User_And_Roles:{
        is_create:true,
        is_edit:true,
        is_delete:true,
        is_view:true
     },
     lead:{
        is_create:true,
        is_edit:true,
        is_delete:true,
        is_view:true
     },
     rfp:{
        is_create:true,
        is_edit:true,
        is_delete:true,
        is_view:true
     },
     invoice:{
        is_create:true,
        is_edit:true,
        is_delete:true,
        is_view:true
     },
    
    
     report:{
        is_create:true,
        is_edit:true,
        is_delete:true,
        is_view:true
     },


     user_and_roles : JSON.parse(window.sessionStorage.getItem('user_and_roles')),

    }
    this.handleChange = this.handleChange.bind(this);
  }

handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}




succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Roles Added</Typography>, {
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
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Roles deleted</Typography>, {
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
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>User & Role</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Add Roles</Typography>
</Box>

</Paper>

<Paper sx={{width:'100%',minHeight:600,mt:2}}>


<Box sx={{mt:0,padding:2}}>
<Box sx={{ml:{xs:'1%',sm:'3%',md:'24%'},mr:{xs:'1%',sm:'3%',md:'24%'}}}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Role Name<Typography sx={{color:'red'}}></Typography></Typography>
<TextField onChange={this.handleChange} name='role_name' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  fullWidth size='small'/>
</Box>

<br/>
<Typography sx={{fontSize:16,fontWeight:'550',padding:0.2,display:'flex',flexDirection:'row',mb:1,color:"#919191",ml:2}}>Permission<Typography sx={{color:'red'}}></Typography></Typography>
<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Module/Permission</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>View</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Create</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Edit</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
           <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Client</TableCell>

          <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                client:{
                is_create:e.target.checked,
                is_edit:e.target.checked,
                is_delete:e.target.checked,
                is_view:e.target.checked,
             },}))
              } size='small' checked={this.state.client.is_view}/></TableCell>


              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
        client:{
       
        is_create:e.target.checked,
        is_edit:this.state.client.is_edit,
        is_delete:this.state.client.is_delete,
       is_view:this.state.client.is_view,
     },}))
     
     } checked={this.state.client.is_create} sx={{color:'green'}}/></TableCell>


              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 client:{
 is_create:this.state.client.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.client.is_delete,
 is_view:this.state.client.is_view
},}))

         } size='small' checked={this.state.client.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                client:{
                is_create:this.state.client.is_create,
                is_edit:this.state.client.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.client.is_view
               },})) 
              } checked={this.state.client.is_delete}/></TableCell>
            </TableRow>

           



            <TableRow
              key={12}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Campaign</TableCell>

          <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                campaign:{
                is_create:e.target.checked,
                is_edit:e.target.checked,
                is_delete:e.target.checked,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.campaign.is_view}/></TableCell>

              

              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
        campaign:{
        is_create:e.target.checked,
        is_edit:this.state.campaign.is_edit,
        is_delete:this.state.campaign.is_delete,
        is_view:this.state.campaign.is_view
     },}))
     
     } checked={this.state.campaign.is_create} sx={{color:'green'}}/></TableCell>


            
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 campaign:{
 is_create:this.state.campaign.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.campaign.is_delete,
 is_view:this.state.campaign.is_view
},}))
} size='small' checked={this.state.campaign.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                campaign:{
                is_create:this.state.campaign.is_create,
                is_edit:this.state.campaign.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.campaign.is_view
               },})) 
              } checked={this.state.campaign.is_delete}/></TableCell>
            </TableRow>




            <TableRow
              key={13}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          User & Roles</TableCell>


          <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                User_And_Roles:{
                is_create:e.target.checked,
                is_edit:e.target.checked,
                is_delete:e.target.checked,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.User_And_Roles.is_view}/></TableCell>

              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          User_And_Roles:{
        is_create:e.target.checked,
        is_edit:this.state.User_And_Roles.is_edit,
        is_delete:this.state.User_And_Roles.is_delete,
        is_view:this.state.User_And_Roles.is_view
     },}))
     
     } checked={this.state.User_And_Roles.is_create} sx={{color:'green'}}/></TableCell>


     
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 User_And_Roles:{
 is_create:this.state.User_And_Roles.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.User_And_Roles.is_delete,
 is_view:this.state.User_And_Roles.is_view
},}))
} size='small' checked={this.state.User_And_Roles.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                User_And_Roles:{
                is_create:this.state.User_And_Roles.is_create,
                is_edit:this.state.User_And_Roles.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.User_And_Roles.is_view
               },})) 
              } checked={this.state.User_And_Roles.is_delete}/></TableCell>
            </TableRow>




            <TableRow
              key={14}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Leads</TableCell>


          <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                lead:{
                is_create:e.target.checked,
                is_edit:e.target.checked,
                is_delete:e.target.checked,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.lead.is_view}/></TableCell>


              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          lead:{
        is_create:e.target.checked,
        is_edit:this.state.lead.is_edit,
        is_delete:this.state.lead.is_delete,
        is_view:this.state.lead.is_view
     },}))
     
     } checked={this.state.lead.is_create} sx={{color:'green'}}/></TableCell>




            
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 lead:{
 is_create:this.state.lead.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.lead.is_delete,
 is_view:this.state.lead.is_view
},}))
} size='small' checked={this.state.lead.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                lead:{
                is_create:this.state.lead.is_create,
                is_edit:this.state.lead.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.lead.is_view
               },})) 
              } checked={this.state.lead.is_delete}/></TableCell>
            </TableRow>



            <TableRow
              key={15}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          RFP</TableCell>


          <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                rfp:{
                is_create:e.target.checked,
                is_edit:e.target.checked,
                is_delete:e.target.checked,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.rfp.is_view}/></TableCell>


              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          rfp:{
        is_create:e.target.checked,
        is_edit:this.state.rfp.is_edit,
        is_delete:this.state.rfp.is_delete,
        is_view:this.state.rfp.is_view
     },}))
     
     } checked={this.state.rfp.is_create} sx={{color:'green'}}/></TableCell>




             
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 rfp:{
 is_create:this.state.rfp.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.rfp.is_delete,
 is_view:this.state.rfp.is_view
},}))
} size='small' checked={this.state.rfp.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                rfp:{
                is_create:this.state.rfp.is_create,
                is_edit:this.state.rfp.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.rfp.is_view
               },})) 
              } checked={this.state.rfp.is_delete}/></TableCell>
            </TableRow>




            <TableRow
              key={16}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Invoice</TableCell>


          <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                invoice:{
                is_create:e.target.checked,
                is_edit:e.target.checked,
                is_delete:e.target.checked,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.invoice.is_view}/></TableCell>

              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          invoice:{
        is_create:e.target.checked,
        is_edit:this.state.invoice.is_edit,
        is_delete:this.state.invoice.is_delete,
        is_view:this.state.invoice.is_view
     },}))
     
     } checked={this.state.invoice.is_create} sx={{color:'green'}}/></TableCell>


          
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 invoice:{
 is_create:this.state.invoice.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.invoice.is_delete,
 is_view:this.state.invoice.is_view
},}))
} size='small' checked={this.state.invoice.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                invoice:{
                is_create:this.state.invoice.is_create,
                is_edit:this.state.invoice.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.invoice.is_view
               },})) 
              } checked={this.state.invoice.is_delete}/></TableCell>
            </TableRow>


            <TableRow
              key={19}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Report</TableCell>


          
          <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                report:{
                is_create:e.target.checked,
                is_edit:e.target.checked,
                is_delete:e.target.checked,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.report.is_view}/></TableCell>

              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          report:{
        is_create:e.target.checked,
        is_edit:this.state.report.is_edit,
        is_delete:this.state.report.is_delete,
        is_view:this.state.report.is_view
     },}))
     
     } checked={this.state.report.is_create} sx={{color:'green'}}/></TableCell>




 <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 report:{
 is_create:this.state.report.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.report.is_delete,
 is_view:this.state.report.is_view
},}))
} size='small' checked={this.state.report.is_edit}/></TableCell>



              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                report:{
                is_create:this.state.report.is_create,
                is_edit:this.state.report.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.report.is_view
               },})) 
              } checked={this.state.report.is_delete}/></TableCell>
            </TableRow>


        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
   <br/>
   <br/>

<Box sx={{display:'flex',justifyContent:'right',mr:2}}>
  <Button disabled={this.state.user_and_roles.is_create?false:true}   variant='contained' size='small' sx={{textTransform:'none'}} onClick={()=>{
 this.setState({is_backdrop_open:true},()=>{

 fetch(`${base.base_url}/addRoles`,{
      method:"post",
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      body:JSON.stringify({
    role_name:this.state.role_name,
    client:this.state.client,
     campaign:this.state.campaign,
     User_And_Roles:this.state.User_And_Roles,
     lead:this.state.lead,
     rfp:this.state.rfp,
     invoice:this.state.invoice,
     expence:this.state.expence,
     ticket:this.state.ticket,
     report:this.state.report
      })
    }).then((res)=>{return res.json()}).then((s)=>{
   this.succes();
   this.setState({is_backdrop_open:false})
   this.props.navigate('/roles')
    })

 })
   
  }}>Save</Button>  
</Box>



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
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'rgba(118,164,201,0.1)'}}
  open={this.state.is_backdrop_open}
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

export default CreateRoles

export function CreateRolesc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<CreateRoles location={location} navigate={navigate}></CreateRoles>)
}







