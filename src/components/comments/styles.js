import { makeStyles } from '@material-ui/core/styles';

 export default makeStyles((theme)=>({

    commentList:{
      display:'flex',
      flexDirection:'column',
      marginBottom:'20px'
      
    },
    commentItem:{
        display:'flex',
        justifyContent:'space-between',
    },
    userContainer:{
        width:'12%',
        border:'1px solid'
    },
    text:{
        width:'86%',
        border:'1px solid',
    },
    inputactions:{
        display:'flex',
        justifyContent:'space-between'
    },
    textinput:{
        width:'80%'
    },
    btnsend:{
        width:'26%'
    }
}))