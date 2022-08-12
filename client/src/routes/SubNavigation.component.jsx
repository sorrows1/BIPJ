import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box, IconButton,
} from '@mui/material';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const SubNavigation = () => {

  const navigate = useNavigate();

  return (
    <>
      <Box sx={{height: 80, backgroundColor: 'primary.main', position: 'relative'}} >
        <IconButton sx={{position: 'absolute', p:2}} onClick={() => navigate(-1)}>
         <ArrowBackIosNewIcon sx={{color: 'grey.0'}} />
        </IconButton>
      </Box>
      <Outlet></Outlet>
    </>
  );
};
