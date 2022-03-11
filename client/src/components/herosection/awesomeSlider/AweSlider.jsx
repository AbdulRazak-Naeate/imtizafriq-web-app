import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import './style.css';
const AweSlider = ({images}) => {
   const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
      <div className='awesomeSlider' >
        <AutoplaySlider className='autoSlider'
          play={true}
          organicArrows={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={6000}
          bullets={false}>
          {
            images.map((image,index)=>{
              return(
                <div className='image' key={index} data-src={`/server/uploads/slides/${image.filename}`} />
              )
            })
          }
          </AutoplaySlider>
          
    </div>
  )
}

export default AweSlider
