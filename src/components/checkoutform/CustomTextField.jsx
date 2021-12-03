import React from 'react';
import { TextField, Grid} from '@material-ui/core';

const FormInput = ({ name, label,type,size,margin,required,register}) => {
   const isError = false;

return (
   <Grid item xs={2} sm={2}>
        
                <TextField
                  {...register(name)}
                    fullWidth
                    label={label}
                    type={type}
                    size={size}
                    margin={margin}
                    required={required}
                    variant='outlined'
                />
   </Grid>
 );
 }

export default FormInput;