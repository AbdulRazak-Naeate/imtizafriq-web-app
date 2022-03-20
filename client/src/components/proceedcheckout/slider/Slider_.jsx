import React from 'react'
import './styles.css';
import Slider from "react-slick/lib";
import {Card,CardMedia,CardActions,Typography,IconButton} from '@mui/material';
import useStyles from './styles'
const Slider_ = ({images}) => {
   const classes= useStyles(); 
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  


const Dslider = ({images})=>{
    return(
     <Slider {...settings}>
        {
          images.map((image,index)=>{
            return(
              <Card key={index}>
              <img className={classes.sliderItem}  style={{objectFit:'cover'}} src={`${image.url}`} alt={image.public_id}  />
               </Card>
             
            )
          })
        }
  </Slider>
)}
    return (
    <div className={classes.slider}>
      {images.length>0 ?<Dslider  style={{width:'100%',border:'1px solid red'}} images={images}/>:''}
    </div>
  )
}

export default Slider_
