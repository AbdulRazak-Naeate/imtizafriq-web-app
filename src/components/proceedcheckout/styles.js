import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    title: {
      marginTop: '4%',
    },
   container:{
     marginTop:'40px',
       display:'flex',
       justifyContent:'space-between',
       alignItems:'start',
       border:'0px solid'
   },
  
}))