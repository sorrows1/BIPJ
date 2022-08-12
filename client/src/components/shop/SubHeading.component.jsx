import { Link as RouterLink } from 'react-router-dom';

import { Link, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const SubHeading = ({text, path}) => {
    return (
        <Link component={RouterLink} to={path} sx={{textDecoration: 'none', color:'inherit'}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' sx={{fontWeight: 500}}>
                {text}
                </Typography>
                <Stack direction='row' alignItems='center'>
                    <Typography variant='body2'>
                        See all
                    </Typography>
                    <ChevronRightIcon sx={{ height: 20, width: 20}} />
                </Stack>
            </Stack>
        </Link>
    )
}

export default SubHeading