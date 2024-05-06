import { Typography ,Box} from '@mui/material'
import React, { Component } from 'react'

export class Error extends Component {
  render() {
    return (
      <div>
        <Box>
            <Typography sx={{fontSize:14,fontWeight:'bold',color:'red'}}>404 Page Not Found</Typography>
        </Box>
      </div>
    )
  }
}

export default Error