import React, { Component } from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Box, Button, Paper, TextField, Typography,IconButton } from '@mui/material';
import lo from '../src/img/chatt.svg'
import ForumIcon from '@mui/icons-material/Forum';
import SearchIcon from '@mui/icons-material/Search';
import man from '../src/img/man.jpg'
import moment from 'moment'
import SendIcon from '@mui/icons-material/Send';
import Face6Icon from '@mui/icons-material/Face6';
export class Chat extends Component {
constructor(props) {
  super(props)

  this.state = {
     AllChatList:false,
     SingleChatList:false,
  }
}



  render() {
    return (
      <div>
<Box sx={{display:'none',flexDirection:'row'}}>



<Box sx={{height:400,background:'white', display:this.state.SingleChatList?"block":'none'}}>
<Paper elevation={10}  sx={{width:290,height:400,backgroundColor:'white',borderColor:'grey',marginRight:2,borderRadius:2}}>
<Typography sx={{fontSize:17,fontWeight:'bold',textAlign:'center',padding:1}}>Chat</Typography>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mt:2,height:50,flexDirection:'row',width:'100%'}}>
  <Avatar src={man} />
  <Box sx={{marginLeft:1,backgroundColor:'#e1e5ff',minHeight:50,width:'80%',borderTopRightRadius:9,borderBottomRightRadius:9,borderTopLeftRadius:9}}>
  <Typography sx={{fontSize:11,fontWeight:'400',fontFamily:'sans-serif',margin:0.5,textAlign:'justify'}}>jThe TextField wrapper component is a complete form control including a label, input, and help text. It comes with three variants: outlined (default), filled, and standard.</Typography>
  </Box>
  </Box>


  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mt:6,height:50,flexDirection:'row',width:'100%'}}>
  <Box sx={{marginRight:1,backgroundColor:'#e1e5ff',minHeight:50,width:'80%',borderTopRightRadius:9,borderTopLeftRadius:9,borderBottomLeftRadius:9}}>
  <Typography sx={{fontSize:11,fontWeight:'400',fontFamily:'sans-serif',margin:0.5,textAlign:'justify'}}>jThe TextField wrapper component is a complete form control including a label, input, and help text. It comes with three variants: outlined (default), filled, and standard.</Typography>
  </Box>
  <Avatar src={man} />
  </Box>
</Paper>
  <Paper elevation={0} sx={{height:30,width:290,mt:-3.8}}>
    <Box sx={{height:'100%',width:'100%',display:'flex',justifyContent:'space-between',backgroundColor:'#f8f9ff'}}>
    <TextField  
    placeholder='send message'
 sx={{backgroundColor:'#f8f9ff',borderRadius:2,width:'60%',ml:1}}
 size='small' 
 variant='standard'
 fullWidth
  InputProps={{
    sx:{fontSize:12},
    startAdornment: <Face6Icon sx={{color:'#c1c1c1',marginLeft:1}}/>,
    disableUnderline:true
  }}
 />

<IconButton color="#33abdf" aria-label="add an alarm" sx={{mr:1,color:'#33abdf'}}>
  <SendIcon />
</IconButton>

    </Box>
</Paper>
</Box>





<Paper elevation={10}  sx={{ display:this.state.AllChatList?"block":'none' ,width:290,height:400,backgroundColor:'white',borderColor:'grey',borderRadius:3}}>
<Typography sx={{fontSize:17,fontWeight:'bold',textAlign:'center',padding:1}}>Chat</Typography>
<Box sx={{marginLeft:1,marginRight:3,marginBottom:1}}>
 <TextField  
 sx={{backgroundColor:'#f8f9ff',margin:0.5,borderRadius:2}}
 size='small' 
 variant='standard'
 fullWidth
  InputProps={{
    sx:{fontSize:12},
    startAdornment: <SearchIcon sx={{color:'#c1c1c1',marginLeft:1}}/>,
    disableUnderline:true
  }}
 />
</Box>


{
[1,2,3,4].map(()=>(
  <Box onClick={()=>this.setState({SingleChatList:true})} sx={{height:50,marginLeft:2,marginRight:2,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:50,flexDirection:'row'}}>
  <Avatar src={man} />
  <Box sx={{marginLeft:1}}>
  <Typography sx={{fontSize:13,fontWeight:'bold',fontFamily:'sans-serif',display:'inline-block',width:150,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Nitish kumar</Typography>
  <Typography sx={{fontSize:11,color:'#42526e',display:'inline-block',width:150,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>hi how are youu we can not do in goog iasjnnnnfj j</Typography>
  </Box>
  </Box>

  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:50}}>
    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
   <Typography sx={{fontSize:10,fontWeight:'bold',fontFamily:'sans-serif',mb:0.4}}>{moment().format('hh:mm')}</Typography>
   <Typography sx={{fontSize:10,color:'#42526e',textAlign:'center',mt:0.4,backgroundColor:'#2987c8',borderRadius:20,color:'white'}}>1</Typography>
    </Box>
  </Box>
</Box>
))
  }
</Paper>







<Box sx={{height:400,width:80,display:'flex',flexDirection:'column',justifyContent:'flex-end'}} >
<Box sx={{minHeight:20,minWidth:20,backgroundColor:'transparent',borderRadius:14,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Fab onClick={()=>this.state.AllChatList? this.setState({AllChatList:false,SingleChatList:false}):this.setState({AllChatList:true}) } size='small' disableFocusRipple sx={{backgroundColor:'transparent'}}>
<img src={lo}/>
</Fab>
</Box>
</Box>


 
 </Box>
      </div>
    )
  }
}

export default Chat


/*



<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mt:2,height:50,flexDirection:'row',width:'100%'}}>
  <Avatar src={man} />
  <Box sx={{marginLeft:1,backgroundColor:'#e1e5ff',minHeight:50,width:'80%',borderTopRightRadius:9,borderBottomRightRadius:9,borderTopLeftRadius:9}}>
  <Typography sx={{fontSize:11,fontWeight:'400',fontFamily:'sans-serif',margin:0.5,textAlign:'justify'}}>jThe TextField wrapper component is a complete form control including a label, input, and help text. It comes with three variants: outlined (default), filled, and standard.</Typography>
  </Box>
  </Box>


  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mt:6,height:50,flexDirection:'row',width:'100%'}}>
  <Box sx={{marginRight:1,backgroundColor:'#e1e5ff',minHeight:50,width:'80%',borderTopRightRadius:9,borderTopLeftRadius:9,borderBottomLeftRadius:9}}>
  <Typography sx={{fontSize:11,fontWeight:'400',fontFamily:'sans-serif',margin:0.5,textAlign:'justify'}}>jThe TextField wrapper component is a complete form control including a label, input, and help text. It comes with three variants: outlined (default), filled, and standard.</Typography>
  </Box>
  <Avatar src={man} />
  </Box>



*/