import React from 'react';
import { TextField, Grid} from '@material-ui/core';

const FormInput = ({ name, label,type,size,margin,required,register}) => {

return (
   <Grid item xs={12} sm={6}>
       <TextField
         {...register(name)}
            fullWidth
            label={label}
            required={required}
            />
   </Grid>
 );
 }

export default FormInput;