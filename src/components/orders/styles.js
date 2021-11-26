import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: '4%',
  },
  link: {
    textDecoration: 'none',
  },
}));
