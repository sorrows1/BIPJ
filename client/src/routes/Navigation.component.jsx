import { useState, useEffect } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar
} from '@mui/material';

import RedeemIcon from '@mui/icons-material/Redeem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export const Navigation = () => {

  const [value, setValue] = useState(0);
  const { pathname } = useLocation()
  
  useEffect(() => {
    if (pathname === '/shop') setValue(0)
    if (pathname === '/activity') setValue(1)
  }, [pathname])

 
  return (
    <>
      <AppBar sx={{ backgroundColor: 'grey.100',  top: 'auto', bottom: 0}} elevation={0}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Shop" icon={<LocalOfferIcon />} component={RouterLink} to='/shop' />
          <BottomNavigationAction label="My Rewards" icon={<RedeemIcon />} component={RouterLink} to='/activity' />
          <BottomNavigationAction label="Account" icon={<AccountCircleOutlinedIcon />} component={RouterLink} to='#' />
        </BottomNavigation>
      </AppBar>
      <Outlet></Outlet>
      <Toolbar sx={{height: 80}} />
    </>
  );
};
