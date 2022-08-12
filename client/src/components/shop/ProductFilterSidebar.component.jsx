import PropTypes from 'prop-types';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ClearAllIcon from '@mui/icons-material/ClearAll';

// components
import Scrollbar from '../ScrollBar.component';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_DIET_OPTIONS = ['Dairy Free', 'Gluten Free', 'Ketogenic', 'low Fodmap', 'Vegan', 'Vegeterian', 'Very Healthy'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];


// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ isOpenFilter, onOpenFilter, onCloseFilter,}) {
  return (
    <>
      <Button disableRipple variant='textInherit' endIcon={<FilterListIcon />} onClick={onOpenFilter}>
        <Typography variant='subtitle1' component='span'>
          Filters
        </Typography>
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <CloseIcon width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Diet
              </Typography>
              <FormGroup>
                {FILTER_DIET_OPTIONS.map((item) => (
                  <FormControlLabel key={item} control={<Checkbox />} label={item} />
                ))}
              </FormGroup>
            </div>


            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      '& > :first-of-type': { py: 0.5 },
                      '&:hover': {
                        opacity: 0.48,
                        '& > *': { bgcolor: 'transparent' },
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<ClearAllIcon />}
          >
            <Typography variant='subtitle1'>
              Clear All
            </Typography>
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
