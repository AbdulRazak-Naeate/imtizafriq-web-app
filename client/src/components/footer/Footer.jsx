import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import {EmailOutlined,Call,HomeOutlined} from '@material-ui/icons';
import {Facebook,Instagram,Twitter} from '@mui/icons-material'
import {Typography} from '@mui/material';

import './footer.css';
import axios from 'axios';
const Footer = () => {
  const[email,setEmail]=useState('');
   const [faceBook,setFaceBook]=useState('');
    const [twitter,setTwitter]=useState('');
    const [instagram,setInstagram]=useState(''); 
    const[medialinks,setMedialinks]=useState('')
    const [islinksloaded,setIslinksLoaded]=useState(false);
  const handleSubscription = (e) =>{
      
        e.preventDefault();
       var url =`/api/subscribe/${email}`;
          axios.post(url).then((response)=>{
             setEmail('');
          console.log(response)
     })
  }
  useEffect(()=>{
    const handlegetLinks = async ()=>{
      const url=`/api/socialmedialinks`
  
      await axios.get(url).then((response)=>{
        try{

           let facebookUrl=response.data.socialmedialinks[0].medialinks[0].linktext
           let instagramUrl=response.data.socialmedialinks[0].medialinks[1].linktext
           let twitterUrl=response.data.socialmedialinks[0].medialinks[2].linktext
 
           setFaceBook(facebookUrl   ? facebookUrl   : '')
           setInstagram(instagramUrl ? instagramUrl  : '')
           setTwitter(twitterUrl     ? twitterUrl    : '')
           setMedialinks(response.data.socialmedialinks[0])
          //getObjectbyValue(response.data.socialmedialinks,'Twitter')
        }catch(err){
            console.log(err)
        }
      })
  }
  
  if (!islinksloaded){
     handlegetLinks();
  }
  return ()=>{
    setIslinksLoaded(true)
  }
  })
  return (
       <div className='footer-container'>
      <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the Adventure newsletter to recieve deals
                </p >
                <p className='footer-subscription-text'>
                    You can unsubscribe at any time
                </p>
                <div className='input-areas'>
                    <form onSubmit={handleSubscription} >
                        <input  type='email' name='email' placeholder='Your Email' value={email}
                        className='footer-input' onChange={(e)=>{setEmail(e.target.value)}}/>
                            <Button type="submit" variant="outlined" >Subscribe</Button>
                     
                    </form>
                </div>
            </section>
       <div className='footer-links'>
            {/*   <div className='footer-link-wrapper'>
                  <div className="footer-link-items">
                    <h2>About Us</h2>
                    <Link to='signup'>How it works</Link>
                    <Link to='/'>Testimonials</Link>
                    <Link to='/'>Careers</Link>
                    <Link to='/'>Investors</Link>
                    <Link to='/'>Terms of Service</Link>

                  </div>
                  <div className="footer-link-items">
                    <h2>Contact Us</h2>
                    <Link to='/'>Contact</Link>
                    <Link to='/'>Support</Link>
                    <Link to='/'>Destinations</Link>
                    <Link to='/'>Sponsorship</Link>
 
                  </div>
              </div> */}
              <div className='footer-link-wrapper'>
                  {/* <div className="footer-link-items">
                    <h2>Videos</h2>
                    <Link to='/'>Submit Videos</Link>
                    <Link to='/'>Ambassodors</Link>
                    <Link to='/'>Agency</Link>
                    <Link to='/'>Influencer</Link>
                  </div> */}
                  <div className="footer-link-items">
                     {medialinks.length > 0 ? <>
                      <h5>Connect with US </h5> 
                     
                    
                     { instagram !==''  ? <a href={`${instagram}`} target={'_blank'} rel="noreferrer"> <Instagram/></a> : ''}
                     { faceBook  !==''  ? <a href={`${faceBook}`} target={'_blank'} rel="noreferrer">  <Facebook/></a>  : ''}
                     { twitter   !==''  ? <a href={`${twitter}`} target={'_blank'} rel="noreferrer">   <Twitter/></a>   : ''} 
                     </>
                  : '' }
                  </div>
                </div>
              </div> 
              <section className='social-media'>
                
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              {process.env.REACT_APP_WEBSITE_NAME.toUpperCase()}
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>{`${process.env.REACT_APP_WEBSITE_NAME} © ${new Date().getFullYear()}`}</small>
        <div>
        <small className='website-rights'>Designed by NaeateStudios</small>
          <Typography className='topnavlink' variant="body2">
             <Call fontSize='small' className='topbarinfoIcon'/>
             <a  className='topnavlink' href='tel:+2330207055540'>{`+2330207055540`}</a>
             </Typography>
        </div>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
        </div> 
  )
}

export default Footer
