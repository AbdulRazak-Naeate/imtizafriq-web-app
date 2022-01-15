import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    marginTop:10,
    padding:'0% 25%',
    flexGrow: 1,
    [theme.breakpoints.down(620)]:{
      padding:'0px',
    },
  },
  title: {
    marginTop: '4%',
  },
  link: {
    textDecoration: 'none',
  },
  commentsTitle:{
    display:'flex',
    justifyContent:'space-between',
    padding:'3px 5px',
  }, 
   ordercard:{
      border:'0px solid',
      display:'flex',
      height:'80px',
      width:'24%',
      marginLeft:'1%'     
   },
   media:{
    height:80,
    width:'100%', 
  },
}));
