import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import './footer.css';
import axios from 'axios';
const Footer = () => {
  const[email,setEmail]=useState('');
  const handleSubscription = (e) =>{
      
        e.preventDefault();
       var url =`http://localhost:3001/api/subscribe/${email}`;
          axios.post(url).then((response)=>{
          console.log(response)
     })
  }

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
                        <input  type='email' name='email' placeholder='Your Email'
                        className='footer-input' onChange={(e)=>{setEmail(e.target.value)}}/>
                            <Button type="submit" buttonStyle='btn--outline' >Subscribe</Button>
                     
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
                    <Link to='/'>Instagram</Link>
                    <Link to='/'>Facebook</Link>
                    <Link to='/'>Youtube</Link>
                    <Link to='/'>Twitter</Link>
 
                  </div>
                </div>
              </div> 
              <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              {process.env.REACT_APP_WEBSITE_NAME.toUpperCase()}
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>{`${process.env.REACT_APP_WEBSITE_NAME} © ${new Date().getFullYear()}`}</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
        </div> 
  )
}

export default Footer
