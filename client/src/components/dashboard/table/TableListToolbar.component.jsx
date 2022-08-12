// material
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
// component

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

export default function TabelListToolbar({ numSelected, filterName, onFilterName }) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{height: 20, width: 20}} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteOutlineIcon color='primary' sx={{height: 24, width: 24}} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
