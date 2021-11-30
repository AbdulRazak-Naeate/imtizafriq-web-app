import {makeStyles} from '@material-ui/core/styles';

export default  makeStyles(()=>({
    root:{  
        padding:'10px 20px',
        height:440,
        width:'100%',
        border:'0px solid',
        justifyContent:'flex-start',
        alignItems:'start'
    },
    card:{
      height:'100%'
    },
    cardContent:{
     height:'100%',
     display:'flex',
     flexDirection:'column',
     justifyContent:'space-between'
    },
    detailsWrapper:{
      backgroundColor:'blue',
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-start',

    },
    title:{
        color:'#fff'
    },
    description:{
       color:'#fff'
    },
    priceWrapper:{
        backgroundColor:'#dddd3d'
    }
    ,price:{
        color:'red'
    },
    actions:{
        display:'flex',justifyContent:'space-between' 
    }

}))