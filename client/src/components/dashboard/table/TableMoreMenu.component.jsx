import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { removeProduct } from '../../../app/products/products.action';
// component

// ----------------------------------------------------------------------

export default function TableMoreMenu({id}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(removeProduct(id))
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon sx={{height: 20, width: 20}} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete}>
            <ListItemIcon>
                <DeleteIcon sx={{height: 24, width: 24}} />
            </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <ModeEditIcon sx={{height: 24, width: 24}} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
