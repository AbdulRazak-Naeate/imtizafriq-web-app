import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(()=>({
    root:{
        maxWidth:'100%',
    },
    media:{
        height:'10%',
        paddingTop: '56.25%',
        
        
    },
    cardActions:{
        display:'flex',
        justifyContent:'flex-end',
    },
    cardContent:{
        height:'160px',
    },
    cardContentSub:{
      display:'flex',
      justifyContent:'space-between',
      height:'70%'
    },
    orderDetails:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    orderDetails2:{
        top:'3px',
        display:'flex',
        justifyContent:'space-between',
       
    },

    color:{
        padding:'3px 4px',
    border:'1px solid #f50057',
    borderRadius:'30px',
    backgroundColor:'#f50057',
    color:'white'
      },
      size:{
        padding:'3px 4px',
        border:'1px solid #f50057',
        borderRadius:'30px',
        backgroundColor:'#f50057',
        color:'white'
      },
  approved:{
    backgroundColor: '#e5faf2',
    color:'#3bb077' ,
  },
 declined:{
    backgroundColor:' #fff0f1',
    color:'#d95087',
  },
  pending:{
    backgroundColor:' #ebf1fe',
    color:'#2a7ade'
  }
}))