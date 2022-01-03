import React from 'react'
import {EmailOutlined,Call,HomeOutlined} from '@material-ui/icons';
import {Typography} from '@mui/material';
const ContactInfowidget = () => {
  return (
    <div>
        <div className="topbarContact">
         <div className="topbarContactItemLeft">
         <Typography variant='body2'><HomeOutlined fontSize='small' className='topbarinfoIcon'/></Typography><Typography variant='body2' className="topleftTypo" >AboutUs</Typography>
         </div>
         <div className="topbarContactItemRight">
         <Typography variant="body2"> <EmailOutlined fontSize='small'/><a className='topnavlink' href='mailto:abdulrazakneate@gmail.com'>abdulrazakneate@gmail.com</a></Typography>
           <Typography variant="body2"> <Call fontSize='small'/><a className='topnavlink' href='tel:+233548496121'>+233548496121</a></Typography>

         </div>
          </div>
    </div>
  )
}

export default ContactInfowidget
