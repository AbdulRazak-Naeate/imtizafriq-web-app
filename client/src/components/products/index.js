import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginBottom:'10vh',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  BtnWrapper:{
    width:'100%',
    padding:40,
    display:'flex',
    justifyContent:'center',
  }
}));
