import React from 'react'
import {EmailOutlined,Call,HomeOutlined} from '@material-ui/icons';
import {Typography} from '@mui/material';
import {Link} from 'react-router-dom'
const ContactInfowidget = ({contacts}) => {
    
  
  return (
    <div>
        <div className="topbarContact">
         <div className="topbarContactLeft">
             <Link to='/' className='topnavlink'>
         <Typography variant='body2'><HomeOutlined  className='topbarinfoIcon'/></Typography> 
         </Link>
         <Link to='/aboutus' className='topnavlink'>
          <Typography variant='body2' className="topleftTypo" >AboutUs</Typography>
         </Link>
        
         </div>
         <div className="topbarContactRight">
         <Typography variant="body2" className='topnavlink'> <EmailOutlined fontSize='small'className='topbarinfoIcon'/><a className='topnavlink' href='mailto:abdulrazakneate@gmail.com'>{`${contacts[1].contacttext}`}</a></Typography>
           <Typography className='topnavlink' variant="body2"> <Call fontSize='small' className='topbarinfoIcon'/><a  className='topnavlink' href='tel:+233548496121'>{`${contacts[0].contacttext}`}</a></Typography>

         </div>
          </div>
    </div>
  )
}

export default ContactInfowidget
