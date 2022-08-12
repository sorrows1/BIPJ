import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardSidebar from './DashboardSidebar.component';
import DashboardNavbar from './DashboardNavbar.component';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 50;
const APP_BAR_DESKTOP = 32;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('main')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const openSidebar = () => setOpen(true)
  const closeSidebar = () => setOpen(false)
  const isDesktop = useResponsive('up', 'lg')

  return (
    <RootStyle>
      {!isDesktop && <DashboardNavbar onOpenSidebar={openSidebar} />}
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={closeSidebar} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
