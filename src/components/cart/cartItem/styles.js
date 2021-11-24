import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    height: 200,
  },
  cardContent: {
    height:100,
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    border:'0px solid',
    height:200,
    display:'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
  },
  buttons: {
    width:'100%',
    display: 'flex',
    alignItems: 'center',
  },
  specifications:{
   display:'flex',
   flexDirection:'column',
   border:'0px solid',
   width:'100%',
  },
  gridSpecsList:{
    width:'100%',
    border:'0px solid'
  },
  specsGrid:{
    border:'0px solid #afb4b0',
    width:'100%',
    padding:'5px 0px',
    display:'flex',
    justifyContent:'space-around',
  },
  gridSpecsItem:{
    cursor:'pointer',
    fontSize:12
  },
  disSelect:{
    padding:'3px 5px',
    border:'1px solid #afb4b0',
    borderRadius:'30px',
  }
 ,select:{
    padding:'3px 5px',
    border:'1px solid red',
    borderRadius:'30px',
    backgroundColor:'red',
    color:'white'
  }
}));
