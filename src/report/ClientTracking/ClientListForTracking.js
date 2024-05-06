import { Paper,Box ,Backdrop,Tooltip,IconButton,CircularProgress,TableBody,Grid,Table,MenuItem,Tab,Tabs,TableContainer,Modal,TablePagination,Divider,TableCell,TableHead,TableRow,Button, Typography, TextField} from '@mui/material'
import React, { Component } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from 'rc-checkbox';
import base from '../../base'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import bg from "../../img/bgimg.svg"
import { CSVLink } from "react-csv";
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {SyncLoader} from 'react-spinners'
import CountUp from 'react-countup';

export class ClientListForTracking extends Component {
constructor(props) {
  super(props)

  this.state = {
    page:0,
    is_loader_open:true,
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


//////////////////// adat  ////////////////////


campaignSize : 0,
total_balence :0,
total_payment : 0,
total_discount : 0,



  }
  this.handleChange = this.handleChange.bind()
  this.handleSearch = this.handleSearch.bind()
}

handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
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

  this._retrive_analyticals_data(); 
   this.retriveClient();
}



_retrive_analyticals_data=()=>{

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




clearFileChoosen=()=>{
  document.getElementById("container").innerHTML = document.getElementById("container").innerHTML;
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
<Box sx={{mt:2}}>




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
{//#33339c
}
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



<Paper sx={{minHeight:500,width:'100%',mt:2}}>
<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30}}>
    <TextField onChange={this.handleSearch} name='search' value={this.state.search} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='Client Id' sx={{"& input::placeholder": {
      fontSize: "14px",
      fontWeight:'600',
      marginLeft:"2px"}}
    }/>
</Box>
</Box>


<Box sx={{mt:0,paddingLeft:2,paddingRight:2}}>
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

          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.clistList.map((row,index) => (
            <TableRow
              key={row.name}
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:index % 2?'#f9f9f9':'#fff' }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  onClick={()=>{localStorage.setItem('client',JSON.stringify(row));this.props.navigate('/report/report_c_tracking/:'+row.client_id)}} >
              <Box sx={{height:23,display:'flex',justifyContent:'left',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#2d85d1'}}> <Link style={{textDecoration:'underline',color:'#fff'}}>{row.client_id}</Link></Typography></Box> 
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>{row.client_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>{row.primary_contact.phone}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize'}}>
              <Box sx={{height:23,display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{paddingLeft:0.4,paddingRight:0.4,color:'#fff',fontWeight:'600',fontSize:12,backgroundColor:'#008ffb'}}>{row.client_group} </Typography></Box> 
                </TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize',fontWeight:'700'}}> <CountUp start={0} end={row.total_invoice}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize',fontWeight:'700'}}> <CountUp start={0} end={row.amount_paid} /></TableCell>
              <TableCell align='center' sx={{color:'#42526e',textTransform:'capitalize',fontWeight:'700'}}><Paper elevation={0} sx={{height:30,minWidth:30,borderRadius:5,backgroundColor:'rgba(37,158,250,0.1)',display:'flex',justifyContent:'center',alignItems:'center'}}> <CountUp start={0} end={row.total_invoice - row.amount_paid} />  </Paper></TableCell>

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
  open={this.state.is_loader_open}
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

export default ClientListForTracking
export function ClientListForTrackingc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ClientListForTracking location={location} navigate={navigate}></ClientListForTracking>)
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
      





















