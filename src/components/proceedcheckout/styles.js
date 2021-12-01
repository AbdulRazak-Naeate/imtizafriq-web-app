import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    title: {
      marginTop: '4%',
    },
   content:{
      height:'auto',
       marginTop:'40px',
       display:'flex',
       justifyContent:'space-between',
       alignItems:'start',
       [theme.breakpoints.down(620)]:{
        marginTop:'1px',
       }
   },
   slider:{
    [theme.breakpoints.up(620)]:{
      display:'none',
     },
     [theme.breakpoints.down(620)]:{
      display:'block',
     }
   },
   
  
}))