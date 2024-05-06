import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../Appheader'
import Sidebar from '../../Sidebar'
import { Sidebarc } from '../../Sidebar'
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
import base from '../../../base'
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

export class CreateClientRoles extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       role_name:"",
       clientData : JSON.parse(sessionStorage.getItem('AllClientData')),

       campaign:{
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
     User_And_Roles:{
        is_create:false,
        is_edit:false,
        is_delete:false,
        is_view:false
     },
     lead:{
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
     department:{
        is_create:true,
        is_edit:true,
        is_delete:true,
        is_view:true
     },
  
     end_client:{
      is_create:true,
      is_edit:true,
      is_delete:true,
      is_view:true
    },
     
     permissiondata : JSON.parse(sessionStorage.getItem('permission')),
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


failed=()=>{
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
              Report</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                  report:{
                  is_create:e.target.checked,
                  is_edit:e.target.checked,
                  is_delete:e.target.checked,
                  is_view:e.target.checked
               },}))
              } checked={this.state.report.is_view}/></TableCell>
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
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                 report:{
                 is_create:this.state.report.is_create,
                 is_edit:this.state.report.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.report.is_view
              },}))
              } size='small' checked={this.state.report.is_delete}/></TableCell>
          
            </TableRow>
    
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
              Campaign</TableCell>

              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                    campaign:{
                      is_create:e.target.checked,
                      is_edit:e.target.checked,
                      is_delete:e.target.checked,
                      is_view:e.target.checked
               },}))
              } checked={this.state.campaign.is_view}/></TableCell>

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
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  campaign:{
                 is_create:this.state.campaign.is_create,
                 is_edit:this.state.campaign.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.campaign.is_view
              },}))
              } size='small' checked={this.state.campaign.is_delete}/></TableCell>
            
            </TableRow>




            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
              Lead</TableCell>


              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                    lead:{
                      is_create:e.target.checked,
                      is_edit:e.target.checked,
                      is_delete:e.target.checked,
                      is_view:e.target.checked
               },}))
              } checked={this.state.lead.is_view}/></TableCell>

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
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  lead:{
                 is_create:this.state.lead.is_create,
                 is_edit:this.state.lead.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.lead.is_view
              },}))
              } size='small' checked={this.state.lead.is_delete}/></TableCell>
             
            </TableRow>




            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
              Invoice</TableCell>

              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                    invoice:{
                      is_create:e.target.checked,
                      is_edit:e.target.checked,
                      is_delete:e.target.checked,
                      is_view:e.target.checked
               },}))
              } checked={this.state.invoice.is_view}/></TableCell>


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
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  invoice:{
                 is_create:this.state.invoice.is_create,
                 is_edit:this.state.invoice.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.invoice.is_view
              },}))
              } size='small' checked={this.state.invoice.is_delete}/></TableCell>
            
            </TableRow>


            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
               Department</TableCell>

               <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                    department:{
                      is_create:e.target.checked,
                      is_edit:e.target.checked,
                      is_delete:e.target.checked,
                      is_view:e.target.checked
               },}))
              } checked={this.state.department.is_view}/></TableCell>

              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                department:{
                is_create:e.target.checked,
                is_edit:this.state.department.is_edit,
                is_delete:this.state.department.is_delete,
                is_view:this.state.department.is_view
             },}))
              } checked={this.state.department.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  department:{
                 is_create:this.state.department.is_create,
                 is_edit:e.target.checked,
                 is_delete:this.state.department.is_delete,
                 is_view:this.state.department.is_view
              },}))
              } size='small' checked={this.state.department.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  department:{
                 is_create:this.state.department.is_create,
                 is_edit:this.state.department.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.department.is_view
              },}))
              } size='small' checked={this.state.department.is_delete}/></TableCell>
              
            </TableRow>



            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
              End Client</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                  (e)=>
                  this.setState(prevState => ({...prevState,  
                    end_client:{
                      is_create:e.target.checked,
                      is_edit:e.target.checked,
                      is_delete:e.target.checked,
                      is_view:e.target.checked
               },}))
              } checked={this.state.end_client.is_view}/></TableCell>


              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                end_client:{
                is_create:e.target.checked,
                is_edit:this.state.end_client.is_edit,
                is_delete:this.state.end_client.is_delete,
                is_view:this.state.end_client.is_view
             },}))
              } checked={this.state.end_client.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  end_client:{
                 is_create:this.state.end_client.is_create,
                 is_edit:e.target.checked,
                 is_delete:this.state.end_client.is_delete,
                 is_view:this.state.end_client.is_view
              },}))
              } size='small' checked={this.state.end_client.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                 (e)=>
                 this.setState(prevState => ({...prevState,  
                  end_client:{
                 is_create:this.state.end_client.is_create,
                 is_edit:this.state.end_client.is_edit,
                 is_delete:e.target.checked,
                 is_view:this.state.end_client.is_view
              },}))
              } size='small' checked={this.state.end_client.is_delete}/></TableCell>
            
            </TableRow>





        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
   <br/>
   <br/>


<Box sx={{display:'flex',justifyContent:'right',mr:2}}>
  <Button variant='contained' disableElevation size='small' sx={{textTransform:'none'}} onClick={()=>{
 
if(this.state.role_name!==""){
   fetch(`${base.base_url}/addClientUserRoles`,{
      method:"post",
      headers:{
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`,
        'content-type':'application/json',
      },
      body:JSON.stringify({
       role_name:this.state.role_name,
       client_id:this.state.clientData.client_id,
       campaign:this.state.campaign,
       report:this.state.report,
       User_And_Roles:this.state.User_And_Roles,
       lead:this.state.lead,
       invoice:this.state.invoice,
       department:this.state.department,
       end_client  :this.state.end_client,
       role_name:this.state.role_name,

      })
    }).then((res)=>{return res.json()}).then((s)=>{
   this.succes();
   this.props.navigate('/clientRoleList')
    })

}else{
this.failed();
}
   

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

export default CreateClientRoles

export function CreateClientRolesc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<CreateClientRoles location={location} navigate={navigate}></CreateClientRoles>)
}














