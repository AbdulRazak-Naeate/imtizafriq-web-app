import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=>({
    root:{
        maxWidth:'100%',
        margin:'0px 20px 20px 40px'
    },
    thumbnailContainer:{
        flex:'1',
       },
    thumbnailList:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        border:'0px solid'
    },
    mediaThumbnail:{
        height:120,
        width:120,
       
    },
    disSelect:{
        border:'0px solid',
       
      }
     ,select:{
        border:'2px solid #f50057',
      },
    previewContainer:{
        flex:'4',
        margin:'0px 40px'
    },
    mediaPreview:{
        height:420,
        width:400,
        border:'0px solid'
    },
    viewcontainer:{
        display:'flex',
        padding:'10px 20px',
        border:'0px solid',
        marginLeft:'10%',
        justifyContent:'space-between',
       
         
    }
}))