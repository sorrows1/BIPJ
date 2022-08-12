import { Chip, styled } from "@mui/material";

const TYPE_COLOR_OPTIONS = {
    dairyFree: '#FFC107',
    glutenFree: '#ffae53',
    ketogenic: '#e67e22',
    lowFodmap: '#94D82D',
    vegan: '#54D62C',
    vegeterian: '#00AB55',
    veryHealthy: '#229A16'
}

const RootStyle = styled(Chip)(({theme, type}) => {
    return (
    {
        height: 22,
        minWidth: 22,
        zIndex: 9,
        cursor: 'default',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        justifyContent: 'center',
        color: theme.palette.grey[800],
        backgroundColor: TYPE_COLOR_OPTIONS[type],
        fontSize: theme.typography.pxToRem(12),
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightMedium,
        textTransform: 'uppercase'
    }
    )
})

const Tag = ({type, sx, ...others}) => {
    const label = type.replace(/([a-z])([A-Z])/g, '$1 $2')
    return ( 
        <RootStyle
         type={type}
         label={label}
         {...others} 
         sx={{ ...sx}}
        />
    );
}
 
export default Tag;