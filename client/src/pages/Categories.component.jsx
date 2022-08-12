import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';

import { Stack, IconButton, Typography, Breadcrumbs, Link } from '@mui/material';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


import Section from '../components/Section.component';
import { ProductSearchBar, ProductShop} from '../components/shop';

import { getProductAll } from '../app/products/products.action';
import { selectProducts } from '../app/products/products.selector';



const Categories = ({sx}) => {
    const navigate = useNavigate();

    const { category }  = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductAll());
        // eslint-disable-next-line
    }, []);

    const fetchedProducts = useSelector(selectProducts)

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
      const filteredByCategory = fetchedProducts.filter((prod) => prod.type ===  category)
      setProducts(filteredByCategory)
    }, [fetchedProducts])

    const onSearchChange = event => {
      setSearch(event.target.value)
    }
    
    const filteredProducts = products.filter(product => {
      return product.business.toLowerCase().includes(search.toLowerCase()) || product.title.toLowerCase().includes(search.toLocaleLowerCase())
    })

    return ( 
      <main>
        <Section sx={{mt: 1}}>
          <Stack direction='row' gap={2} justifyContent='center' alignItems='center'>
            <IconButton sx={{p:0}} onClick={() => navigate(-1)}>
                <ArrowBackIosNewIcon sx={{color: 'common.black', height: 20, width: 20}} />
            </IconButton>
            <ProductSearchBar onSearchChange={onSearchChange} placeholder='Search for a reward' sx={{backgroundColor: 'grey.200', borderRadius: '3px', height: '35px', width: '100%'}}/>
          </Stack>
        </Section>
        <Section sx={{mt: 1.5}}>
            <Stack>
                 <Breadcrumbs separator="›" aria-label="breadcrumb">
                    [
                        <Link component={RouterLink} underline='hover' key='1' to='/shop' color='black'><Typography variant='body2'>Shop</Typography></Link>,
                        <Typography key='2' variant='body2'>{category}</Typography>
                    ]
                 </Breadcrumbs>
                <Typography sx={{mt: 0.2}}>{filteredProducts.length} results {search ? `for '${search}' in ${category}` : `in ${category}`}</Typography>
            </Stack>
            <ProductShop products={filteredProducts} sx={{mt: 0.5}}/>
        </Section>
      </main>
    );
}
 
export default Categories;
