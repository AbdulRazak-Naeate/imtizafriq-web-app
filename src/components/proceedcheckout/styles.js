import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    title: {
      marginTop: '4%',
    },
   container:{
       display:'flex',
       justifyContent:'space-between',
       alignItems:'center',
       border:'1px solid'
   },
  
}))