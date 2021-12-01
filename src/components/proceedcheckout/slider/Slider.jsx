import React from 'react'
import {Card,CardMedia} from '@material-ui/core'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import useStyles from './styles'
const Slider = ({images}) => {
   const classes= useStyles();
    return (
    <div className={classes.slider}>
      {images.length>0 ? <Carousel showArrows={true} showStatus={true} showThumbs={true} showIndicators={true}>
      <div>
                    <img src={`http://localhost:3001/server/uploads/products/${images[0].filename}`} alt={images[0].filename}/>
                 {/*    <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={`http://localhost:3001/server/uploads/products/${images[1].filename}`} alt={images[1].filename} />
                   {/*  <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={`http://localhost:3001/server/uploads/products/${images[2].filename}`} alt={images[2].filename}/>
                   {/*  <p className="legend">Legend 3</p> */}
                </div>
               
               
            </Carousel>:''}
    </div>
  )
}

export default Slider
