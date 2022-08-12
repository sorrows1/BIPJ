import { Link as RouterLink } from 'react-router-dom';

import { Box, Card, Link, Typography, Stack } from '@mui/material';

import Image from '../Image.component';

const Category = ( {product} ) => {
    const {business, title, image, category} = product;
    return (
    <Link to={`/shop/${category}/${business}`} underline='none' component={RouterLink}>
        <Card sx={{border: "none", borderRadius:'5px',  boxShadow: "none"}}>
            <Box sx={{pt: '60%', position:'relative'}}>
                <Image src={`/static/imgs/${image}`} alt={title} effect='blur' sx={{top: 0, position: 'absolute'}} />
            </Box>
            <Stack spacing={0.5} sx={{py: 1 }}>
                <Typography variant='body2' textTransform='capitalize'>
                    {`${business} - ${category}`}
                </Typography>
            </Stack>
        </Card>
    </Link>
    );
}
 
export default Category;