import { Grid } from "@mui/material";

import ProductCard from "./ProductCard.component";


const ProductShop = ({products, ...other}) => {
    return (
        <Grid container spacing={1.5} {...other} >
            {products.map((product, indx) => (
                <Grid item key={indx} xs={6} sm={4} md={3}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    )
            } 
export default ProductShop;