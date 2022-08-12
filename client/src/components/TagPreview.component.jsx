import { Stack, Typography } from "@mui/material";
import Tag from './Tag.component'

const TagPreview = ( { types, limit = 2, sx, ...other } ) => {
    const showTypes = types.slice(0, limit);
    const moreTypes = types.length - limit;
    return ( 
        <Stack direction='row'>
            { showTypes.map((type) => {
                const { id, name } = type;
                return <Tag key={id} type={name} sx={sx} {...other}  />
            })}

            {types.length > limit && <Typography variant="subtitle2">{`+${moreTypes}`}</Typography>}
        </Stack>
     );
}
 
export default TagPreview;