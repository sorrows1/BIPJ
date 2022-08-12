import { Link as RouterLink } from 'react-router-dom';

import {  Card, Link, Typography, Stack } from '@mui/material';


const ProductCard = ( {product} ) => {
    const {id, title, image, price, business} = product;
    return (
    <Link to={`/product/${id}`} underline='none' component={RouterLink}>
        <Card sx={{border: "none", borderRadius:'5px',  boxShadow: "none"}}>
            <img src={`http://localhost:5000/uploads/${image}`} style={{borderRadius: '5px', width: '100%', height: '116px'}}alt={title} />
            <Stack spacing={0.5} sx={{py: 1 }}>
                <Stack direction='column'>
                    <Typography variant='subtitle2' textTransform='capitalize'>
                        {title}
                    </Typography>
                    <Typography variant='caption'>
                        {business}
                    </Typography>
                </Stack>
                <Stack direction='row' alignItems="center" gap={0.2}>
                    <Typography variant='subtitle1' color='success.dark'>
                        {`${price}`}
                    </Typography>
                    <Typography variant='body2'>
                        points
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    </Link>
    );
}
 
export default ProductCard;