import {styled} from '@mui/material/styles'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const RootStyle = styled(LazyLoadImage)(() => ({
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    '&.lazy-load-image-background.blur': {
      filter: 'blur(0)',
      transition: 'filter .3s'      
    },
    '&.lazy-load-image-background.blue.lazy-load-image-loaded ':{
      filter: 'blur(15)'  
    }
  
}))


export default function Image({src, alt, effect, sx, ...others}) {
  return <RootStyle src={src} alt={alt} effect={effect} sx={sx} {...others} />
}


