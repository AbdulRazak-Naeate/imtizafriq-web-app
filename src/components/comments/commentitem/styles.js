import { makeStyles } from '@material-ui/core/styles';

 export default makeStyles((theme)=>({
   root:{
       marginTop:20,
   },
   commentItem:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor:'snow',
        padding:'2px 3px',
        margin:'2px 3px',
        
    },
    commentsItemPrimary:{
        display:'flex',
        justifyContent:'flex-end',
        backgroundColor:'snow',
        padding:'2px 3px'
    },
    commentsItemSecondary:{
        display:'flex',
        justifyContent:'flex-end',
      
    },
    
    userContainer:{
        width:'12%',
        border:'0px solid'
    },
    text:{
        width:'86%',
        color:'darkgray',
        border:'0px solid',
    },
    inputactions:{
        display:'flex',
        justifyContent:'space-between'
    },
}))