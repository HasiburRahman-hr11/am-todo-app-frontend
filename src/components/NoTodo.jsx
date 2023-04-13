import React from 'react';
import {Box , Typography} from '@mui/material'

const NoTodo = () => {
  return (
    <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , width:'100%' , height:'100vh'}} >
        <Typography variant='h2' component="h2" >No Todo Found</Typography>
    </Box>
  )
}

export default NoTodo