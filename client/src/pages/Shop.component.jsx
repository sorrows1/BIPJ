import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, IconButton, Typography, Grid, Chip} from '@mui/material';

import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaletteIcon from '@mui/icons-material/Palette';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

import Section from '../components/Section.component';
import { ProductSearchBar, ProductShop, SubHeading} from '../components/shop';

import { selectCurrentUser } from '../app/user/user.selector';

import { getProductAll } from '../app/products/products.action';
import { selectProducts } from '../app/products/products.selector';


const categories = [
  {
    avatar: <FastfoodIcon sx={{height: 30, width: 30}} />,
    title: 'Food',
  },
  {
    avatar: <NewspaperIcon sx={{height: 30, width: 30}} />,
    title: 'Groceries',
  },
  {
    avatar: <ShoppingCartIcon sx={{height: 30, width: 30}} />,
    title: 'Shopping',
  },
  {
    avatar: <FlightIcon sx={{height: 30, width: 30}} />,
    title: 'Travel',
  },{
    avatar: <DirectionsCarIcon sx={{height: 30, width: 30}} />,
    title: 'Transport',
  },{
    avatar: <PaletteIcon sx={{height: 30, width: 30}} />,
    title: 'Activities',
  },{
    avatar: <LocalHospitalIcon sx={{height: 30, width: 30}} />,
    title: 'Health',
  },{
    avatar: <AttachMoneyIcon sx={{height: 30, width: 30}} />,
    title: 'Finance',
  },
]

const Shop = ({sx}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductAll());
        // eslint-disable-next-line
    }, []);

    const navigate = useNavigate()
    const fetchedProducts = useSelector(selectProducts)
    const user = useSelector(selectCurrentUser)

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
      setProducts(fetchedProducts)
    }, [fetchedProducts])

    const handleNavigate = () => {
      navigate('/activity')
    }

    const onSearchChange = event => {
      setSearch(event.target.value)
    }

    const Food = products.filter((product, indx) => {
      if (indx > 1) return false;
      return product.type === 'Food'
    })

    const filteredProducts = products.filter(product => {
      return product.business.toLowerCase().includes(search.toLowerCase()) || product.title.toLowerCase().includes(search.toLocaleLowerCase())
    })

    return ( 
      <main>
        <Section sx={{height: 148, backgroundColor: 'primary.main'}} >
          <Stack direction='column' sx={{mt: 2}}>
            <Stack direction='row' justifyContent='space-between'>
              <Stack direction='column'>
                <Typography variant='h4' lineHeight={1.1} color='primary.contrastText' sx={{fontWeight: 500}}>Pulse Rewards</Typography>
                <Typography variant='h4' color='primary.contrastText' sx={{fontWeight: 600}}>{user?.balance} Points</Typography>
              </Stack>
              <Chip onClick={handleNavigate} icon={<ConfirmationNumberOutlinedIcon sx={{height: 18, width: 18, color:'#f44336 !important'}} />} label={`My Rewards`} sx={{backgroundColor: '#fff', color:'primary.main', fontWeight:600, pl: 0.7}} />
            </Stack>
            <ProductSearchBar  onSearchChange={onSearchChange} placeholder='Search for a reward' sx={{mt: 2, boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'}} />
          </Stack>
        </Section>
        <Section>
          {!search && (
            <>
          <Grid container sx={{mt: 2}}>
            {categories.map((category, indx) => {
              return (
                <Grid item xs={3} key={indx} textAlign='center'>
                  <IconButton sx={{flexDirection: 'column'}} onClick={() => navigate(`${category.title}`)}>
                    {/* <CardGiftcardIcon sx={{height: 30, width: 30}} /> */}
                    {category.avatar}
                    <Typography variant='body2' sx={{mt: 0.4}}>
                      {category.title}
                    </Typography>
                  </IconButton>
                </Grid>
              )
            })}
          </Grid>
          </>
          )}
        </Section>
        {!search && (
        <Section sx={{mt: 2}}>
            <SubHeading text='Food' path='Food' />
            <ProductShop products={Food} sx={{mt: 0.3}} />
        </Section>
        )}
        <Section>
            {search && <Typography sx={{mt: 1}}>{filteredProducts.length} results for '{search}'</Typography>}
            {!search && <Typography variant='h6' fontWeight={500} sx={{mt: 1}}>Recommended For You</Typography>}
            <ProductShop products={filteredProducts} sx={{mt: 0.3}} />
        </Section>

      </main>
      
    );
}
 
export default Shop;
