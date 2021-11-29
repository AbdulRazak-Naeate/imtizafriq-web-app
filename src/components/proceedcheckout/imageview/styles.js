import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=>({
    root:{
        maxWidth:'100%',
    },
    thumbnailContainer:{
        flex:'1',
       },
    thumbnailList:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
    },
    mediaThumbnail:{
        height:100,
        width:100,
        margin:10,

    },
    disSelect:{
        border:'0px solid',
       
      }
     ,select:{
        border:'2px solid #f50057',
      },
    previewContainer:{
        flex:'4'
    },
    mediaPreview:{
        height:400,
        width:320,
        border:'1px solid'
    },
    viewcontainer:{
        display:'flex',
        alignItems:'flex-start',
        padding:'10px 20px',
        border:'1px solid'
         
    }
}))