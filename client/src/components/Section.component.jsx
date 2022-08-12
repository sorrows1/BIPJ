import { Container, Grid } from '@mui/material'


const Section = ({children, sx}) => {
    return (
        <section>
            <Grid display='grid' gridTemplateColumns='10px 1fr 10px' columnGap={0.2} sx={{...sx}}>
                <Container maxWidth='mx' disableGutters sx={{gridColumn: '2 / auto'}}>
                    {children}
                </Container>
            </Grid>
        </section>
    )
}

export default Section