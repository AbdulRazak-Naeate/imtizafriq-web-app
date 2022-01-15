import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
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
  }
}));
