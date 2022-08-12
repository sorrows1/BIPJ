import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

import { Stack, Typography, Tab, Tabs, Box, Card, CardActions, Link} from '@mui/material';

import Section from '../components/Section.component';

import { selectCurrentUser } from '../app/user/user.selector';
import { useEffect } from 'react';

function TabPanel({ children, value, index, ...other }) {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const Activity = () => {
    const [value, setValue] = useState(0);
    const [ rewards, setRewards ] = useState([])

    const user = useSelector(selectCurrentUser)
    const currentDate = new Date().toISOString()
    console.log(user)
    useEffect(() => {
      const getRewards = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/api/v1/rewards/user/${user.id}`, {withCredentials: true});
            setRewards(response.data)
        } catch (err) {
          console.log(err)
        }
      }
      getRewards()
    }, [user])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return ( 
        <main>
        <Typography variant='subtitle1' textAlign='center' sx={{fontWeight: 500, mt: 2, mb: 1}}>My Rewards</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} variant='fullWidth' onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Active Rewards" />
              <Tab label="Past Rewards" />
          </Tabs>
        </Box>
        <Section sx={{mt: 1}}>
            <TabPanel value={value} index={0}>
                <Stack direction='column' gap={1.5}>
                    {rewards.map((val) => {
                        return val.codes.map((reward) => {
                          const { id, redeemed } = reward
                          if (redeemed || currentDate > new Date(val.validity).toISOString()) return null
                          return (
                          <Link component={RouterLink} key={`${val.id}${id}`} underline='none' to={`/reward/${id}`}>
                            <Card sx={{borderRadius: '3px'}}>
                              <Stack direction='row' sx={{py: 1, px: 1.8}} justifyContent='space-between' alignItems='flex-end'>
                                <div>
                                  <Typography variant='caption' color="text.secondary" gutterBottom>
                                    {val.business}
                                  </Typography>
                                  <Typography variant="subtitle1" component="div">
                                    {val.title}
                                  </Typography>
                                  <Typography variant='body2'>
                                    {val.minPurchase ? `Min. S$${val.minPurchase} spend` : 'No order limit'}
                                  </Typography>
                                </div>
                                <img style={{height: '50px', width: '50px', borderRadius: '5px'}} src={`http://localhost:5000/uploads/${val.image}`} alt="" />
                              </Stack>
                              <CardActions sx={{justifyContent: 'space-between',py: 1, px: 1.8}} >
                                  <Typography variant='body2'>Until <Moment format='DD MMMM YYYY'>{val.validity}</Moment></Typography>
                                  <Typography variant='body2' sx={{color: 'info.main', fontWeight: 600}}>Use Now</Typography>
                              </CardActions>
                            </Card>
                          </Link>
                        )
                        })
                    })}
                </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Stack direction='column' gap={1.5}>
                  {rewards.map((val) => {
                      return val.codes.map((reward) => {
                        const { id, redeemed } = reward
                        if (!redeemed && (!redeemed && !(currentDate > new Date(val.validity).toISOString()))) return null
                        return (
                        <Card key={`${val.id}${id}`} sx={{borderRadius: '3px', color: 'text.disabled'}}>
                          <Stack direction='row' sx={{py: 1, px: 1.8}} justifyContent='space-between' alignItems='flex-end'>
                            <div>
                              <Typography variant='caption' color="text.secondary" gutterBottom>
                                {val.business}
                              </Typography>
                              <Typography variant="subtitle1" component="div" color='text.primary'>
                                {val.title}
                              </Typography>
                              <Typography variant='body2'>
                                {val.minPurchase ? `Min. S$${val.minPurchase} spend` : 'No order limit'}
                              </Typography>
                            </div>
                            <img style={{height: '50px', width: '50px', borderRadius: '5px'}} src={`http://localhost:5000/uploads/${val.image}`} alt="" />
                          </Stack>
                          <CardActions sx={{justifyContent: 'space-between',py: 1, px: 1.8}} >
                              <div></div>
                              <Typography variant='body2' sx={{fontWeight: 600}}>Used</Typography>
                          </CardActions>
                        </Card>
                      )
                      })
                  })}
                </Stack>
            </TabPanel>
        </Section>
        </main>
        
     );
}
 
export default Activity;