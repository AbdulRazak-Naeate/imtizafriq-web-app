import React from 'react'
import {EmailOutlined,Call,HomeOutlined} from '@material-ui/icons';
import {Typography} from '@mui/material';
import {Link} from 'react-router-dom'
const ContactInfowidget = () => {
  return (
    <div>
        <div className="topbarContact">
         <div className="topbarContactItemLeft">
             <Link to='/' className='topnavlink'>
         <Typography variant='body2'><HomeOutlined  className=''/></Typography> 
         </Link>
         <Link to='/aboutus' className='topnavlink'>
          <Typography variant='body2' className="topleftTypo" >AboutUs</Typography>
         </Link>
        
         </div>
         <div className="topbarContactItemRight">
         <Typography variant="body2" className='topnavlink'> <EmailOutlined fontSize='small'/><a className='topnavlink' href='mailto:abdulrazakneate@gmail.com'>abdulrazakneate@gmail.com</a></Typography>
           <Typography className='topnavlink' variant="body2"> <Call fontSize='small'/><a  className='topnavlink' href='tel:+233548496121'>+233548496121</a></Typography>

         </div>
          </div>
    </div>
  )
}

export default ContactInfowidget
