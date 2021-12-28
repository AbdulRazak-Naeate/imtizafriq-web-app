import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root:{
    color: "darkgray",
    "&.Mui-selected": {
      color: "#ed9720"
    },

     /* Styles applied to the root element if selected. */
  selected: {},
 },
}));
