import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import openSocket from 'socket.io-client'

import { Stack, Typography, IconButton } from "@mui/material";
import Section from "../components/Section.component";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Redeem = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const socket = openSocket('http://localhost:5000')
    socket.on('redeemed', data => {
        console.log(data)
        navigate(data.url)
    })

    return ( 
        <Section sx={{position: 'relative', mt: 2}}>
            <IconButton sx={{p:0, position:'absolute'}} onClick={() => navigate(-1)}>
                <ArrowBackIosNewIcon sx={{color: 'common.black', height: 20, width: 20}} />
            </IconButton>
            <Typography textAlign='center'>Redeem</Typography>            
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} sx={{mt: 3}}>
                <Typography variant='h5' fontWeight={500}>Show QR-Code to Cashier</Typography>
                <QRCode value={`http://localhost:3000/scan/${id}`}/> 
            </Stack>
        </Section>
     );
}
 
export default Redeem;