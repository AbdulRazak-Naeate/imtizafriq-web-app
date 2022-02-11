import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import './style.css';
const AweSlider = () => {
   const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
      <div className='awesomeSlider' >
        <AutoplaySlider className='autoSlider'
          play={true}
          organicArrows={false}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={6000}
          bullets={false}>
          <div className='image' data-src="http://localhost:3002/server/uploads/heroslider/sliderimage0.png" />
          <div  className='image' data-src="http://localhost:3002/server/uploads/heroslider/sliderimage1.png" />
          <div  className='image' data-src="http://localhost:3002/server/uploads/heroslider/sliderimage2.png" />
          </AutoplaySlider>
          
    </div>
  )
}

export default AweSlider
