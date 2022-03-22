import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import './style.css';
import useStyles from './styles';
import {Card,CardMedia} from '@mui/material'
const AweSlider = ({images}) => {
   const AutoplaySlider = withAutoplay(AwesomeSlider);
   const classes = useStyles()
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
                <Card>
                    <CardMedia className={classes.media} key={index} image={`${image.url}`}/>
                </Card>
                
              )
            })
          }
          </AutoplaySlider>
          
    </div>
  )
}

export default AweSlider
