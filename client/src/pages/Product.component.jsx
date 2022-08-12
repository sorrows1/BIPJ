import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';

import { Box, Typography, Stack, Button, IconButton, Paper, Dialog, DialogContent, Tooltip, Drawer, TextareaAutosize } from '@mui/material';
import Section from '../components/Section.component';

import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmailIcon from '@mui/icons-material/Email';

import { getProduct } from '../app/products/products.action';
import { selectProduct } from '../app/products/products.selector';
import { selectCurrentUser } from '../app/user/user.selector';
import { updateBalance } from '../app/user/user.action';
import { useEffect } from 'react';

const style = {
    '@media (max-width:380px)': {
            fontSize: '0.7rem'
    },
    '@media (max-width:330px)': {
            fontSize: '0.675rem'
    },
}


const Product = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)

    useEffect(() => {
        dispatch(getProduct(id))
    }, [])

    const product = useSelector(selectProduct)
    const quantity = product?.codes?.reduce((acc, code) => code.redeemed ? 0 : acc+1, 0)

    const { title, business, price, description, image, validity} = product

    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false);
    const [ openDrawer, setDrawer ] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const toggleDrawer = (open) => {
        setDrawer(open)
    }

    const renderButton = (quantity, balance, price) => {
   if (!quantity) {
        return (
            <Button disabled variant='contained' fullWidth sx={{mt: 2}}>
                Sold Out
            </Button>  
        )
   }

    if (balance >= price) {
        return (
            <Button variant='contained' onClick={() => toggleDrawer(true)} fullWidth sx={{mt: 2}}>
                Redeem
            </Button>
        )
    }

    if ( balance < price) {
        return (
            <Tooltip title='You do not have enough points'
            open={true}
            placement="top"
            arrow
            disableFocusListener
            disableHoverListener
            disableTouchListener
            >
            <span>
                <Button disabled variant='contained' fullWidth sx={{mt: 2}}>
                        Redeem
                </Button>
            </span>
            </Tooltip>
        )
    }
    }

    const redeemReward = (userId) => {
        axios.patch(`http://localhost:5000/api/v1/rewards/redeem/${id}`, {"userId": user.id.toString(), "price": price }, {withCredentials: TextareaAutosize})
        const remainingBalance = user.balance - price
        dispatch(updateBalance(remainingBalance))
        navigate('/activity')
    }

    return ( 
    <div style={{position: 'relative', height:'100%'}}>
        <IconButton sx={{position: 'absolute', p:1.5}} onClick={() => navigate(-1)}>
            <CloseIcon />
        </IconButton>
        <img src={`http://localhost:5000/uploads/${image}`} alt={title} style={{height: '180px', maxWidth: '100%', width: '100%'}} />
        <Section sx={{mt: 1.5}}>
            <Stack direction='row' alignItems='flex-end' justifyContent='space-between'>
                <Typography variant='subtitle2' textTransform='capitalize'>
                    {business}
                </Typography>
                <IconButton sx={{p: 0}} onClick={handleOpen}>
                    <HelpOutlineIcon sx={{height: 20, width: 20}} />
                </IconButton>
            </Stack>
            <Stack direction='row' gap={2} sx={{mt: 0.2}} justifyContent='space-between' alignItems='flex-start'>
                <Typography variant='subtitle1' sx={{fontWeight: '400', wordBreak: 'break-word'}}>
                    {`${title}`}
                </Typography>
                <Typography variant='subtitle1' sx={{fontWeight: '400', minWidth: '100px', textAlign: 'right'}}>
                    <strong>{`${price}`}</strong> Points
                </Typography>
            </Stack>
            <Box sx={{mt: 2, overflowY: 'scroll', overflowX: 'hidden'}}>
                <Typography variant='subtitle2' textTransform='capitalize'>
                    Expire At
                </Typography>
                <Moment format='DD MMMM YYYY'>{validity}</Moment>
                <Typography sx={{mt: 1}} variant='subtitle1' textTransform='capitalize'>
                    Description
                </Typography>
                <Typography  variant='body1'>
                    {description}
                </Typography>
            </Box>
        </Section>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {
        product.category === 'Gift Cards' ?
        (
        <>
        <Typography variant='subtitle1' textAlign='center' sx={{pt: 1.6}}>
            How to use this reward
        </Typography>
        <DialogContent>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start' gap={0.5}>
            <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                <PhoneIphoneIcon />
                <Typography variant='body2' textAlign='center' sx={style}>
                    Redeem the reward
                </Typography>
            </Stack>
            <ArrowRightAltIcon />
            <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                <EmailIcon />
                <Typography variant='body2' textAlign='center' sx={style}>
                    We will email you the code
                </Typography>
            </Stack>
            <ArrowRightAltIcon />
            <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                <AttachMoneyIcon />
                <Typography variant='body2' textAlign='center' sx={style}>
                    Use the gift code
                </Typography>
            </Stack>
        </Stack>
        </DialogContent>
        </>
        ) 
        :
        (
        <>
        <Typography variant='subtitle1' textAlign='center' sx={{pt: 1.6}}>
            How to use this reward
        </Typography>
        <DialogContent>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start' gap={0.5}>
            <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                <StorefrontIcon />
                <Typography variant='body2' textAlign='center' sx={style}>
                    Go to the store
                </Typography>
            </Stack>
            <ArrowRightAltIcon />
            <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                <PhoneIphoneIcon />
                <Typography variant='body2' textAlign='center' sx={style}>
                    Show the cashier this reward
                </Typography>
            </Stack>
            <ArrowRightAltIcon />
            <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                <AttachMoneyIcon />
                <Typography variant='body2' textAlign='center' sx={style}>
                    Receive the reward
                </Typography>
            </Stack>
        </Stack>
        </DialogContent>
        </>
        )
        }
      </Dialog>
        <Paper sx={{position: 'fixed', bottom: 0, py: 2, px: 1.2, width: 1}}>
            {
                renderButton(quantity, user.balance, product.price)
            }
            <Drawer
                anchor={'bottom'}
                open={openDrawer}
                onClose={() => toggleDrawer(false)}
            >
                <Paper sx={{py: 2, px: 1.6}}>
                    <Stack direction='column' gap={2}>
                        <div>
                            <Typography variant='h6'>Get this Reward</Typography> 
                            <Typography variant='body2'>Redeem with {price} points?</Typography>
                        </div>
                        <Stack direction='row' gap={1}>
                            <Button fullWidth variant='outlined' onClick={() => toggleDrawer(false)} color='primary' sx={{border: '1px solid #212B36', color:'grey.600', borderRadius: '5px'}}>Cancel</Button>
                            <Button fullWidth variant='contained' sx={{borderRadius: '5px'}} onClick={redeemReward}>Confirm</Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Drawer>
        </Paper>
    </div>
    );
}
 
export default Product;