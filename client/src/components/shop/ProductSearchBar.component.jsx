
import { Paper, IconButton, InputBase, Divider } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';



const ProductSearchBar = ({placeholder, onSearchChange, sx, ...other})  => {
    return (
    <Paper
      sx={{  display: 'flex', alignItems: 'center', borderRadius: '5px', ...sx }}
    >
      <IconButton type="submit" sx={{ p: '8px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': {placeholder} }}
        onChange={onSearchChange}
        {...other}
      />
      {/* <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px' }} aria-label="directions">
        <QrCodeScannerIcon />
      </IconButton> */}
    </Paper>
    )
};

export default ProductSearchBar;