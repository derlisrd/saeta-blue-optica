import { Box } from '@mui/material';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import DrawerMainMenu from '../Components/Menu/DrawerMainMenu'
import MenuProvider from '../Components/Menu/MenuProvider';
import {env} from '../App/config'
import ToolbarMain from '../Components/Menu/ToolbarMain';
import { useAuth } from '../Providers/AuthProvider';

const Base = () => {
  const {DRAWER_WIDTH} = env

  const {userData} = useAuth()

  

  if(!userData.login){
    return <Navigate to="/" />
  }

  return (
    <SimpleBar forceVisible="y" autoHide={false}>
      <MenuProvider>
      <DrawerMainMenu />
        <Box sx={{ minHeight:'100vh'}}>
        <ToolbarMain />
        <Box component="main" 
            sx={{px:2, ml:{ md: `${DRAWER_WIDTH}px`}, width: { md: `calc(100% - ${DRAWER_WIDTH}px)`},bgcolor:'background.paper' }} >
          
          <Outlet />
        </Box>
        </Box>
      </MenuProvider>
    </SimpleBar>
  )
}

export default Base
