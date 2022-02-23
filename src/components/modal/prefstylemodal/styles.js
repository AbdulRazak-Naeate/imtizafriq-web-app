import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    width: '50%',
    padding:0,
    [theme.breakpoints.up('xs')]:{
        top: '50%',
        width: '35%',
      },[theme.breakpoints.down('xs')]:{
        top: '50%',
        width: '98%',
      },

    
  },
  content:{
      display:'flex',
      height:'100%',
  },
  contentLeft:{
    width:'100%',
    padding:'5px 5px',
  },
  contentRight:{
    width:'50%',

  },
  contentLeftSub:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    height:'70%',
    padding:'5px 10px',
    border:'0px solid',
    margin:'5px 5px',
  },
  contentLeftText:{
    marginTop:'5%',
    display:'flex',
   textAlign:'center',
  },
  contentLeftSubaction:{
   height:'18%',
   border:'1px solid',
   

  },
  captanImage:{
    height:'100%',
    width:'100%',
  },
  link:{
    textDecoration:'none'
  }
}))