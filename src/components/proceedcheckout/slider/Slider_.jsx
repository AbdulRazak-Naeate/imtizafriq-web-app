import React,{useState} from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";

import useStyles from './styles'
const Slider_ = ({images}) => {
   const classes= useStyles(); 
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  


const Dslider = ({images})=>{
    return(
     <Slider {...settings}>
    <div>
   <img className={classes.sliderItem} style={{objectFit:'cover'}} src={`http://localhost:3001/server/uploads/products/${images[0].filename}`} alt={images[0].filename}  />
    </div>
    <div>
   <img className={classes.sliderItem} style={{objectFit:'cover'}} src={`http://localhost:3001/server/uploads/products/${images[1].filename}`} alt={images[1].filename}  />
    </div>
    <div>
   <img className={classes.sliderItem} style={{objectFit:'cover'}} src={`http://localhost:3001/server/uploads/products/${images[2].filename}`} alt={images[2].filename}  />
    </div>
  </Slider>
)}
    return (
    <div className={classes.slider}>
      {images.length>0 ?<Dslider images={images}/>:''}
    </div>
  )
}

export default Slider_
