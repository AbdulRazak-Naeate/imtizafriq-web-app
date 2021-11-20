import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import {useForm, Controller } from 'react-hook-form';


const FormInput = ({ name, label, required,register}) => {
   const isError = false;

return (
   <Grid item xs={12} sm={6}>
        
                <TextField
                  {...register(name)}
                    fullWidth
                    label={label}
                    required
                />
   </Grid>
 );
 }

export default FormInput;