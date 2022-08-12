import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, Collapse, } from '@mui/material';

import navConfig from './navConfig';
import Scrollbar from '../ScrollBar.component';
import NavSection from '../NavSection.component';

import useResponsive from '../../hooks/useResponsive';
import Logo from '../../assets/logo.png';



const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));


const DashboardSidebar = ({isOpenSidebar, onCloseSidebar}) => {
    const { pathname } = useLocation();
    const isDesktop = useResponsive('up', 'lg')

    useEffect(() => {
      if (isOpenSidebar){
        onCloseSidebar()
      }
      // eslint-disable-next-line
    }, [pathname])

    const renderContent = (
      <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}>
        <NavSection navConfig={navConfig} />
      </Scrollbar>
    )

    return (  
        <RootStyle>
          {!isDesktop && (
            <Drawer
              open={isOpenSidebar}
              onClose={onCloseSidebar}
              PaperProps={
                {sx: {width: DRAWER_WIDTH}}
              }
            >
              {renderContent}
            </Drawer>
          )}

          {isDesktop && (
            <Drawer
              open
              onClose={onCloseSidebar}
              PaperProps={
                {sx: {width: DRAWER_WIDTH, borderRightStyle: 'dashed', bgcolor: 'background.default', top: 'auto'}}
              }
              variant='persistent'
            >
              {renderContent}
            </Drawer>
          )}

        </RootStyle>
    );
}
 
export default DashboardSidebar;