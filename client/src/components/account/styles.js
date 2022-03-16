import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=>({
   root:{
       margin:'80px 5px',
       padding:'40px 40px',
       [theme.breakpoints.down(620)]:{
        padding:'0px'
       }
      
   },
}))