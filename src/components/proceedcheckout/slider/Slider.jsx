import React,{useState} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import useStyles from './styles'
const Slider = ({images}) => {
   const classes= useStyles(); 
   const handleDragStart = (e) => e.preventDefault();

   const items = []
    if (images.length>0){
     items.push( <div className="item" data-value="1"><img className={classes.sliderItem}src={`http://localhost:3001/server/uploads/products/${images[0].filename}`} alt={images[0].filename} onDragStart={handleDragStart} role="presentation" /></div>)
     items.push(<div className="item" data-value="2"> <img className={classes.sliderItem}  src={`http://localhost:3001/server/uploads/products/${images[1].filename}`} alt={images[1].filename} onDragStart={handleDragStart} role="presentation" /></div>)
     items.push(<div className="item" data-value="3"> <img className={classes.sliderItem}  src={`http://localhost:3001/server/uploads/products/${images[2].filename}`} alt={images[2].filename} onDragStart={handleDragStart} role="presentation" /></div>)
    }
   const thumbItems = (items, [setThumbIndex, setThumbAnimation]) => {
      return items.map((item, i) => (
          <div className="thumb" onClick={() => (setThumbIndex(i), setThumbAnimation(true))}>
              {item}
          </div>
      ));
  };
   const [mainIndex, setMainIndex] = useState(0);
   const [mainAnimation, setMainAnimation] = useState(false);
   const [thumbIndex, setThumbIndex] = useState(0);
   const [thumbAnimation, setThumbAnimation] = useState(false);
   const [thumbs] = useState(thumbItems(items, [setThumbIndex, setThumbAnimation]));
  
   const responsive = {
      0: { items: 1 },
      568: { items: 2 },
      1024: { items: 3 },
  };

  const Carousel = () => {
   const [mainIndex, setMainIndex] = useState(0);
   const [mainAnimation, setMainAnimation] = useState(false);
   const [thumbIndex, setThumbIndex] = useState(0);
   const [thumbAnimation, setThumbAnimation] = useState(false);
   const [thumbs] = useState(thumbItems(items, [setThumbIndex, setThumbAnimation]));

   const slideNext = () => {
       if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
           setThumbAnimation(true);
           setThumbIndex(thumbIndex + 1);
       }
   };

   const slidePrev = () => {
       if (!thumbAnimation && thumbIndex > 0) {
           setThumbAnimation(true);
           setThumbIndex(thumbIndex - 1);
       }
   };

   const syncMainBeforeChange = (e) => {
       setMainAnimation(true);
   };

   const syncMainAfterChange = (e) => {
       setMainAnimation(false);

       if (e.type === 'action') {
           setThumbIndex(e.item);
           setThumbAnimation(false);
       } else {
           setMainIndex(thumbIndex);
       }
   };

   const syncThumbs = (e) => {
       setThumbIndex(e.item);
       setThumbAnimation(false);

       if (!mainAnimation) {
           setMainIndex(e.item);
       }
   };

   return [
      <AliceCarousel
           activeIndex={mainIndex}
           animationType="fadeout"
           animationDuration={800}
           infinite
           items={items}
           responsive={responsive}
           mouseTracking={!thumbAnimation}
           onSlideChange={syncMainBeforeChange}
           onSlideChanged={syncMainAfterChange}
           touchTracking={!thumbAnimation}
           key={0}
      />
   ]
};
    return (
    <div className={classes.slider}>
      {images.length>0 ?<Carousel/>:''}
    </div>
  )
}

export default Slider
