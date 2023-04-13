import React from 'react';
import {Box, CircularProgress} from '@mui/material'

const LoadingTodo = () => {
  return (
    <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , width:'100%' , height:'100vh'}} >
        <CircularProgress />
    </Box>
  )
}

export default LoadingTodo