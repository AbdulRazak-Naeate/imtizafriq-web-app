import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    padding:'0% 10%',
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
}));
