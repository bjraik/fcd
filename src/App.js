import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  useNavigate,
  useLocation,
  useParams
} from "react-router-dom";
import Dashboard from './Dashboard';
import { Box ,Modal,Paper,Typography} from '@mui/material';
import Login from '../src/security/Login'
import Register from '../src/security/Register'
import Client, { Clientc } from './Client/Client';
import Compaign, { Compaignc } from './Compaign/compaignmanagement/Compaign';
import Singleclientview, { Singleclientviewc } from './Client/Singleclient/Singleclientview';
import Client_Profile, { Contact_Profile } from './Client/Contact_Profile';
import CompaignAnalytics from './Compaign/compaignmanagement/CompaignAnalytics';
import CompaignRequest, { CompaignRequestc } from './Compaign/compaignrequest/CompaignRequest';
import LeadList, { LeadListc } from './Lead/LeadList';
import AddCompaign, { AddCompaignc } from './Compaign/compaignmanagement/AddCompaign';
import ConpaignDescription from './Compaign/compaignrequest/ConpaignDescription';
import Addclient, { Addclientc } from './Client/Addclient';
import Rfp, { Rfpc } from './Rfp/Rfp';
import ViewRfp, { ViewRfpc } from './Rfp/ViewRfp';
import User from './User/User';
import DashboardClient from './ClientDashboardAndFiles/DashboardClient';
import ClientdashboardCompaign, { ClientdashboardCompaignc } from './ClientDashboardAndFiles/Allfiles/compaign/ClientdashboardCompaign';
import { ClientdashboardRFPc } from './ClientDashboardAndFiles/Allfiles/rfp/ClientdashboardRFP';
import { ClientdashboardInvoicec } from './ClientDashboardAndFiles/Allfiles/invoice/ClientdashboardInvoice';
import ClientdashboardTicket from './ClientDashboardAndFiles/Allfiles/ticket/ClientdashboardTicket';

import Roles, { Rolesc } from './User/Roles';
import CreateRoles, { CreateRolesc } from './User/CreateRoles';
import Invoice, { Invoicec } from './Invoice/Invoice';
import InvoiceDetails, { InvoiceDetailsc } from './Invoice/InvoiceDetails';
import AddcompainForm, { AddcompainFormc } from './ClientDashboardAndFiles/Allfiles/compaign/AddcompainForm';
import CloseIcon from '@mui/icons-material/Close';
import { ViewLeadsc } from './Lead/ViewLeads';
import ManageLeads, { ManageLeadsc } from './Lead/ManageLeads';
import BunnchLeadList, { BunnchLeadListc } from './Lead/management/BunnchLeadList';
import LeadListForSingleCampaign, { LeadListForSingleCampaignc } from './Lead/management/LeadListForSingleCampaign';
import Error from '../src/security/Error'
import Invoice_by_service_details, { Invoice_by_service_detailsc } from './Invoice/Invoice_by_service_details'

import { Component } from 'react'

import CampaignListWithLeads, { CampaignListWithLeadsc } from './ClientDashboardAndFiles/Allfiles/lead/CampaignListWithLeads';
import BunchUploadedHistory, { BunchUploadedHistoryc } from './ClientDashboardAndFiles/Allfiles/lead/folder/BunchUploadedHistory';
import SingleCampaignLeadList, { SingleCampaignLeadListc } from './ClientDashboardAndFiles/Allfiles/lead/folder/SingleCampaignLeadList';
import SingleBunchLeadList, { SingleBunchLeadListc } from './ClientDashboardAndFiles/Allfiles/lead/folder/SingleBunchLeadList';
import AllFilesController from './ClientDashboardAndFiles/Allfiles/alloverview/AllFilesController';
import { ClientdashboardDepartmentAddc } from './ClientDashboardAndFiles/Allfiles/department/ClientdashboardDepartmentAdd';
import ClientDashboardContactAdd, { ClientDashboardContactAddc } from './ClientDashboardAndFiles/Allfiles/department/ClientDashboardContactAdd';
import ClientContactProfile from './ClientDashboardAndFiles/Allfiles/department/ClientContactProfile';
import { ClientRolesListc } from './ClientDashboardAndFiles/Allfiles/userAndRoles/ClientRolesList';
import ClientUsers from './ClientDashboardAndFiles/Allfiles/userAndRoles/ClientUsers';
import { CreateClientRolesc } from './ClientDashboardAndFiles/Allfiles/userAndRoles/CreateClientRoles';
import base from './base';
import Personal_tracking from './report/Personal_tracking';
import Overall_tracking, { Overall_trackingc } from './report/Overall_tracking';
import PersonalTrackingClient, { PersonalTrackingClientc } from './ClientDashboardAndFiles/Allfiles/report/PersonalTracking/PersonalTrackingClient';
import OverAllTrackingClient from './ClientDashboardAndFiles/Allfiles/report/OverAllTracking/OverAllTrackingClient';
import Personal_Tracking_single_campaign_client, { Personal_Tracking_single_campaign_clientc } from './ClientDashboardAndFiles/Allfiles/report/PersonalTracking/Personal_Tracking_single_campaign_client';
import Over_all_tracking_for_single_campaign_admin, { Over_all_tracking_for_single_campaign_adminc } from './report/overAllTrackingFolder/Over_all_tracking_for_single_campaign_admin';
import EndClient from './ClientDashboardAndFiles/Allfiles/EndClient';
import ClientTracking from './report/ClientTracking';
import SingleClientTrackingAndAnalytics, { SingleClientTrackingAndAnalyticsc } from './report/ClientTracking/SingleClientTrackingAndAnalytics';
import EndClientWiseTracking from './report/PersonalTrackingByCampaignManager/EndClientWiseTracking';
import Endclienttracking_client_side from './ClientDashboardAndFiles/Allfiles/report/Endclienttracking_client_side';


export class App extends Component {

constructor(props) {
  super(props)
  this.state = {
    client_role : JSON.parse(window.sessionStorage.getItem('client_role')) ,  //// for client model roles
    campaign_role : JSON.parse(window.sessionStorage.getItem('campaign_role')),
    user_and_roles : JSON.parse(window.sessionStorage.getItem('user_and_roles')),
    lead_role : JSON.parse(window.sessionStorage.getItem('lead_role')),
    rfp_role : JSON.parse(window.sessionStorage.getItem('rfp_role')),
    invoice_role : JSON.parse(window.sessionStorage.getItem('invoice_role')),
    report_role :  JSON.parse(window.sessionStorage.getItem('report_role')),
    admin_credential : JSON.parse(window.sessionStorage.getItem('credential_type')),

    crm_admin_permission_id:sessionStorage.getItem('crm_admin_permission_id'),
    //////// this contains all permission for client side  /////////////////////////////////////
    permissiondata : JSON.parse(sessionStorage.getItem('permission')),
    client_user_permission:JSON.parse(sessionStorage.getItem('client_user_permission')),

    credential_type_client:JSON.parse(sessionStorage.getItem('credential_type_client'))
  }
}



// retriveRoleForClientUser

/// retriveCrmAdminRole
componentDidMount(){









}





  render() {
    return (
      <Box sx={{backgroundColor:'#f8f9ff'}}>
    <React.StrictMode>
    <RouterProvider router={createBrowserRouter([
  
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/register",
    element:<Register/>,
  },

  {
    path: this.state.admin_credential?this.state.admin_credential.Crm_Admin? "/dashboard":"/":"/",
    element:<Dashboard/>,
  },
  //////////////////////  client
  {
    path: this.state.client_role? this.state.client_role.is_view?"/client":"/":"/",
    element: this.state.client_role? this.state.client_role.is_view?<Clientc/>:<Error/>:<Error/>
  }, 


   {
    path: this.state.client_role?this.state.client_role.is_view?"/client/:singleclient":"/":"/",     ///////////   client id done 
    element:this.state.client_role?this.state.client_role.is_view?<Singleclientviewc/>:<Error/>:<Error/>,
  },


  {
    path: this.state.client_role?this.state.client_role.is_view?"/client/add":"/":"/",
    element:this.state.client_role?this.state.client_role.is_view?<Addclientc/>:<Error/>:<Error/>,
  },
  {
    path:this.state.client_role?this.state.client_role.is_view? "/client/singleContact/profile" :"/":"/",
    element:this.state.client_role?this.state.client_role.is_view?<Contact_Profile/>:<Error/>:<Error/>,
  },

//////////////////// compaign

  {
    path: this.state.campaign_role?this.state.campaign_role.is_view?"/compaign" :'/':"/",
    element:this.state.campaign_role?this.state.campaign_role.is_view?<Compaignc/>:<Error/>:<Error/>,
  },
  {
    path: this.state.campaign_role?this.state.campaign_role.is_view? "/compaign/analytics" :"/":'/',
    element:this.state.campaign_role?this.state.campaign_role.is_view?<CompaignAnalytics/>:<Error/>:<Error/>,
  },
  {
    path:this.state.campaign_role?this.state.campaign_role.is_view? "/compaign/request" :"/":'/',
    element:this.state.campaign_role?this.state.campaign_role.is_view?<CompaignRequestc/>:<Error/>:<Error/>,
  },
  {
    path:this.state.campaign_role?this.state.campaign_role.is_view? "/compaign/request/description":"/":'/',
    element:this.state.campaign_role?this.state.campaign_role.is_view?<ConpaignDescription/>:<Error/>:<Error/>,
  },
  {
    path:this.state.campaign_role?this.state.campaign_role.is_view? "/compaign/add" :"/":'/',
    element:this.state.campaign_role?this.state.campaign_role.is_view?<AddCompaignc/>:<Error/>:<Error/>,
  },
  
//////////// leads
{
  path:this.state.lead_role?this.state.lead_role.is_view? "/Lead" :"/":'/',
  element:this.state.lead_role?this.state.lead_role.is_view?<LeadListc/>:<Error/>:<Error/>,
},
{
  path:this.state.lead_role?this.state.lead_role.is_view?"/manageLeads":"/":"/",
  element:this.state.lead_role?this.state.lead_role.is_view?<ManageLeadsc/>:<Error/>:<Error/>,
},
{
  path:this.state.lead_role?this.state.lead_role.is_view?"/Lead/:bunchId":"/":"/",
  element:this.state.lead_role?this.state.lead_role.is_view?<ViewLeadsc/>:<Error/>:<Error/>,       /////  this is for all lead group of all cmpaing
},

{
  path:this.state.lead_role?this.state.lead_role.is_view?"/manageLeads/:bunchLeadListId":'/':'/',
  element:this.state.lead_role?this.state.lead_role.is_view?<BunnchLeadListc/>:<Error/>:<Error/>,
},
{
  path:this.state.lead_role?this.state.lead_role.is_view?"/manageLeads/campaign/:campaignId":"/":"/",
  element:this.state.lead_role?this.state.lead_role.is_view?<LeadListForSingleCampaignc/>:<Error/>:<Error/>,
},




///// RFP
{
  path:this.state.rfp_role?this.state.rfp_role.is_view? "/Rfp":"/":"/",
  element:this.state.rfp_role?this.state.rfp_role.is_view?<Rfpc/>:<Error/>:<Error/>,
},
{
  path:this.state.rfp_role?this.state.rfp_role.is_view? "/Rfp/:rfpid":"/":'/',
  element:this.state.rfp_role?this.state.rfp_role.is_view?<ViewRfpc/>:<Error/>:<Error/>,
},


//////////// user and roles model
{
  path: this.state.user_and_roles?this.state.user_and_roles.is_view?"/userManagement":"/":"/",
  element:this.state.user_and_roles?this.state.user_and_roles.is_view?<User/>:<Error/>:<Error/>,
},
{
  path: this.state.user_and_roles?this.state.user_and_roles.is_view?"/roles":"/":"/",
  element:this.state.user_and_roles?this.state.user_and_roles.is_view?<Rolesc/>:<Error/>:<Error/>,
},
{
  path: this.state.user_and_roles?this.state.user_and_roles.is_view?"/roles/createRoles":"/":"/",
  element:this.state.user_and_roles?this.state.user_and_roles.is_view?<CreateRolesc/>:<Error/>:<Error/>,
},

//////////////////////// invoices 
         /// this for campaign invoice
{
  path: this.state.invoice_role?this.state.invoice_role.is_view?"/invoice":"/":"/",
  element:this.state.invoice_role?this.state.invoice_role.is_view?<Invoicec/>:<Error/>:<Error/>,
},
{
  path: this.state.invoice_role?this.state.invoice_role.is_view?"/invoice/:invoiceid":"/":"/",
  element:this.state.invoice_role?this.state.invoice_role.is_view?<InvoiceDetailsc/>:<Error/>:<Error/>,
},

/// this for service invoice
{
  path: this.state.invoice_role?this.state.invoice_role.is_view? "/invoice/serviceInvoice/:invoiceid":'/':'/',
  element:this.state.invoice_role?this.state.invoice_role.is_view?<Invoice_by_service_detailsc/>:<Error/>:<Error/>,
},




////////////////////////////// report ////////////////// /////////////

{
  path:this.state.report_role?this.state.report_role.is_view? "/report/personal_tracking" :"/":"/",
  element:this.state.report_role?this.state.report_role.is_view?<Personal_tracking/>:<Error/>:<Error/>
},





{
  path: this.state.report_role?this.state.report_role.is_view?"/report/overall_tracking":"/":"/",
  element:this.state.report_role?this.state.report_role.is_view?<Overall_trackingc/>:<Error/>:<Error/>
},

//// new created model client tracking

{
  path: this.state.report_role?this.state.report_role.is_view?"/report/report_c_tracking":"/":"/",
  element:this.state.report_role?this.state.report_role.is_view?<ClientTracking/>:<Error/>:<Error/>
},


{
  path:this.state.report_role?this.state.report_role.is_view? "/report/report_c_tracking/:client_id":"/":"/",
  element:this.state.report_role?this.state.report_role.is_view?<SingleClientTrackingAndAnalyticsc/>:<Error/>:<Error/>
},

{
  path: this.state.report_role?this.state.report_role.is_view?"/over_all_tracking_for_single_campaign_admin/:cam_id":"/":"/",
  element:this.state.report_role?this.state.report_role.is_view?<Over_all_tracking_for_single_campaign_adminc/>:<Error/>:<Error/>
}
,




/////////////////////////////////////////////////////////////////////////////   //////////////////////////////////////////////////  //////////////////  /////////////////////////
//////////////////////////////////////////////////////////  client dashboard routes  //////////////////////////////////////////////////////

{
  path: this.state.credential_type_client?this.state.credential_type_client.Crm_Admin==false? "/clientDashboard" :"/":"/",
  element:<DashboardClient/>,
},
///////////////////////////////////// client compain section

{
  path: this.state.permissiondata?this.state.permissiondata.campaign.is_view?"/clientCampaign":"/":'/',
  element:this.state.permissiondata?this.state.permissiondata.campaign.is_view?<ClientdashboardCompaignc/>:<Error/>:<Error/>,
},


{
  path: this.state.permissiondata?(this.state.permissiondata.campaign.is_view && this.state.permissiondata.campaign.is_create)?"/clientCampaign/add":"/":"/",
  element:this.state.permissiondata?(this.state.permissiondata.campaign.is_view && this.state.permissiondata.campaign.is_create)?<AddcompainFormc/>:<Error/>:<Error/>,
},


//////////////////////////////////////// clienrt lead section

{
  path: this.state.permissiondata?this.state.permissiondata.lead.is_view?"/campaignListwithleads": "/" : "/",
  element:this.state.permissiondata?this.state.permissiondata.lead.is_view?<CampaignListWithLeadsc/>:<Error/>:<Error/>,
},

{
  path: this.state.permissiondata?this.state.permissiondata.lead.is_view?"/campaignListwithleads/:campaignId": "/" : "/",
  element:this.state.permissiondata?this.state.permissiondata.lead.is_view?<BunchUploadedHistoryc/>:<Error/>:<Error/>,
},

{
  path:this.state.permissiondata?this.state.permissiondata.lead.is_view? "/campaignListwithleads/campaign/:campaignId": "/" : "/",
  element:this.state.permissiondata?this.state.permissiondata.lead.is_view?<SingleCampaignLeadListc/>:<Error/>:<Error/>,
},

{
  path: this.state.permissiondata?this.state.permissiondata.lead.is_view?"/campaignListwithleads/leadList/:bunchId" : "/" : "/",
  element:this.state.permissiondata?this.state.permissiondata.lead.is_view?<SingleBunchLeadListc/>:<Error/>:<Error/>,
},




//////////////// overviewfiles ///////////
{
  path: "/overviewControllers",
  element:<AllFilesController/>,
},


//////////// client lead section

{
  path: "/clientRFP",
  element:<ClientdashboardRFPc/>,
},

{
  path:this.state.permissiondata?this.state.permissiondata.invoice.is_view? "/clientInvoice" : "/" :"/",
  element: this.state.permissiondata?this.state.permissiondata.invoice.is_view?<ClientdashboardInvoicec/>:<Error/> : <Error/>,
},

{
  path: "/clientTicket",
  element:<ClientdashboardTicket/>,
},



/////// department ///////



{
  path: this.state.permissiondata?this.state.permissiondata.department.is_view?"/clientDepartmentAdd" :"/":"/",
  element:this.state.permissiondata?this.state.permissiondata.department.is_view?<ClientdashboardDepartmentAddc/>:<Error/>:<Error/>,
},
{
  path:this.state.permissiondata?this.state.permissiondata.department.is_view? "/clientConatctAdd":"/":"/",
  element:this.state.permissiondata?this.state.permissiondata.department.is_view?<ClientDashboardContactAddc/>:<Error/>:<Error/>,
},
{
  path: this.state.permissiondata?this.state.permissiondata.department.is_view?"/clientConatctAdd/profile":"/":"/",
  element:this.state.permissiondata?this.state.permissiondata.department.is_view?<ClientContactProfile/>:<Error/>:<Error/>,
},




/////////// roles and user /////////////
{
  path: this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_view?"/clientRoleList" : "/" :"/",
  element:this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_view?<ClientRolesListc/>:<Error/>:<Error/>,
},
{
  path: this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_view?"/clientCreateRoles": "/" :"/",
  element:this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_view?<CreateClientRolesc/>:<Error/>:<Error/>,
},
{
  path: this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_view?"/clientUser": "/" :"/",
  element:this.state.permissiondata?this.state.permissiondata.User_And_Roles.is_view?<ClientUsers/>:<Error/>:<Error/>,
},


//////////////////// report  ///////////


{
  path: this.state.permissiondata?this.state.permissiondata.report.is_view?"/reportClient/personal_tracking_client": "/" :"/",
  element:this.state.permissiondata?this.state.permissiondata.report.is_view?<PersonalTrackingClientc/>:<Error/>:<Error/>
},
{
  path:this.state.permissiondata?this.state.permissiondata.report.is_view? "/reportClient/personal_tracking_client/:campaign_id": "/" :"/",
  element:this.state.permissiondata?this.state.permissiondata.report.is_view?<Personal_Tracking_single_campaign_clientc/>:<Error/>:<Error/>
},
{
  path: this.state.permissiondata?this.state.permissiondata.report.is_view?"/report_client/overall_tracking_client": "/" :"/",
  element:this.state.permissiondata?this.state.permissiondata.report.is_view?<OverAllTrackingClient/>:<Error/>:<Error/>
},
{  //// end client wise tracking 
  path: this.state.permissiondata?this.state.permissiondata.report.is_view?"/report_client/end_client_wise_tracking" : "/" :"/",
  element:this.state.permissiondata?this.state.permissiondata.report.is_view?<Endclienttracking_client_side/>:<Error/>:<Error/>
},


////////////////////// end clien routess //////////
{
  path:this.state.permissiondata?this.state.permissiondata.end_client.is_view? "/endClient" :"/":"/",
   element:this.state.permissiondata?this.state.permissiondata.end_client.is_view?<EndClient/>:<Error/>:<Error/>,
  
  
}



])} />





<Box> 
<Modal
  open={false}
 // onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'60%'},height:'50vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={this.mm} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>


<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4}}}>



</Box>
</Box>
</Paper>
</Box>
</Modal>
</Box>



  </React.StrictMode>
  </Box>
    )
  }
}

export default App

















/*
function App() {

 const [showPopup,SetshowPopup] = useState(false);




setInterval(()=>{
    if(window.navigator.onLine){
      console.log("online")
    }else{
      console.log("ofline")
    }
},5000)

 


  return (
    <Box sx={{backgroundColor:'#f8f9ff'}}>
    <React.StrictMode>
    <RouterProvider router={createBrowserRouter([
  
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/register",
    element:<Register/>,
  },

  {
    path: "/dashboard",
    element:<Dashboard/>,
  },
  //////////////////////  client
  {
    path: "/client",
    element:<Clientc/>,
  }, 



   {
    path: "/client/:singleclient",     ///////////   client id done 
    element:<Singleclientviewc/>,
  },


  {
    path: "/client/add",
    element:<Addclient/>,
  },
  {
    path: "/client/singleclient/profile",
    element:<Client_Profile/>,
  },

//////////////////// compaign
  {
    path: "/compaign",
    element:<Compaignc/>,
  },
  {
    path: "/compaign/analytics",
    element:<CompaignAnalytics/>,
  },
  {
    path: "/compaign/request",
    element:<CompaignRequestc/>,
  },
  {
    path: "/compaign/request/description",
    element:<ConpaignDescription/>,
  },
  {
    path: "/compaign/add",
    element:<AddCompaignc/>,
  },
  
//////////// leads
{
  path: "/Lead",
  element:<LeadListc/>,
},
{
  path:"/manageLeads",
  element:<ManageLeadsc/>,
},
{
  path:"/Lead/:bunchId",
  element:<ViewLeadsc/>,       /////  this is for all lead group of all cmpaing
},

{
  path:"/manageLeads/:bunchLeadListId",
  element:<BunnchLeadListc/>,
},
{
  path:"/manageLeads/campaign/:campaignId",
  element:<LeadListForSingleCampaignc/>,
},




///// RFP
{
  path: "/Rfp",
  element:<Rfpc/>,
},
{
  path: "/Rfp/viewrfp",
  element:<ViewRfpc/>,
},


//////////// user and roles model
{
  path: "/userManagement",
  element:<User/>,
},
{
  path: "/roles",
  element:<Rolesc/>,
},
{
  path: "/roles/createRoles",
  element:<CreateRoles/>,
},

//////////////////////// invoices 

{
  path: "/invoice",
  element:<Invoicec/>,
},
{
  path: "/invoice/:invoiceid",
  element:<InvoiceDetailsc/>,
},



///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////  client dashboard routes

{
  path: "/clientDashboard",
  element:<DashboardClient/>,
},
///////////////////////////////////// client compain section
{
  path: "/clientCampaign",
  element:<ClientdashboardCompaignc/>,
},
{
  path: "/clientCampaign/add",
  element:<AddcompainForm/>,
},


////////////////////////////////////////

{
  path: "/clientLeads",
  element:<ClientdashboardLeads/>,
},
{
  path: "/clientRFP",
  element:<ClientdashboardRFPc/>,
},

{
  path: "/clientInvoice",
  element:<ClientdashboardInvoicec/>,
},

{
  path: "/clientTicket",
  element:<ClientdashboardTicket/>,
},

{
  path: "/clientDepartment",
  element:<ClientdashboardDepartmentc/>,
},

{
  path: "/clientReport",
  element:<ClientdashboardReportc/>,
},
{
  path: "/clientReport/singleReportView",
  element:<ClientdashboardviewsingleReport/>,
},










])} />











<Box> 
<Modal
  open={showPopup}
 // onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'60%'},height:'50vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>SetshowPopup(false)} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>


<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4}}}>



</Box>
</Box>
</Paper>
</Box>
</Modal>
</Box>



  </React.StrictMode>
  </Box>
  );
}

export default App;
*/