import React, { useState,useEffect } from 'react'
import thumbnail from './thumbnail-wide.png';
import {Button} from '@mui/material'
import { CloseRounded} from '@mui/icons-material';
import './index.css';
import axios from 'axios';
const SlidesImage = ({handleImages,slidesImages,setSlidesImages,base64EncodedImage,setPosition}) => {

    const [imageTagIndex, setImageTagIndex] = useState(null);
    const [ImageToLoadId, setImageToLoadId] = useState(null);
    const [imgobj]=useState({
     /*  "fieldname": "image",
      "originalname": "thumbnail-wide.png",
      "encoding":"7bit",
      "mimetype":"image/png",
      "destination":"./server/uploads/slides", */
      "url":thumbnail
  });
   
    const onImageClicked = (e) => {
        const formfile = document.getElementById("product-file");
        formfile.click()
        setImageToLoadId(e.target.id) //sets id of the image
        setPosition(e.target.id)
        let character = (e.target.id).toString(); //convert number to string
        //get last character of product-image# which gets cliked
        setImageTagIndex(character.charAt(13));

    }
   
    const removeLastIndex = (values) => {
      let arr=[...values];
       arr.pop(values.length-1);
       console.log(values);
    return arr;
  }

  const addSlide =()=>{
    setSlidesImages([...slidesImages,imgobj])
    console.log(slidesImages.length)
  }
  const removeSlide =(position,img)=>{
    setSlidesImages([...removeLastIndex(slidesImages)]);
    removeSlideItem(position,img)
  }

    function  onFileInputChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function (e) {

            let indextoRemove = parseInt(imageTagIndex);//gets Index of  clicked image 
           
                document.getElementById(ImageToLoadId).src = thumbnail;
          
              try{
            //push image item whiles Array length is 3 
            //else replace existing index with new image  
            slidesImages.length <= 2 ? slidesImages.push(file) : slidesImages.splice(indextoRemove, 1, file);
              
            base64EncodedImage.length <= 2 ? base64EncodedImage.push(e.target.result) : base64EncodedImage.splice(indextoRemove, 1, e.target.result);
            
            // console.log("replaced index "+typeof(indextoRemove));
              }catch(err){

                 console.log(err)
              }

            console.log(slidesImages.length);

            document.getElementById(ImageToLoadId).src = e.target.result

            handleImages(slidesImages,file)
        };
        try {
            reader.readAsDataURL(file)

        } catch (error) {
            console.log({ readAsDataURLError: error })
        }
    }
    const removeSlideItem =async (position,image)=>{
      try{
       const url =`/api/slides/deleteslide`
       const config = {
        headers: {
          'Content-Type':'application/json',

        }}

      const body={name:'heroslide',position:position,image:image}


       await axios.post(url,JSON.stringify(body),config).then((response)=>{
           // console.log(response.data.slides[0].image);
            setSlidesImages(response.data.slides[0].image)
       })
      }catch(err){
        console.log(err)
      }
     }
     useEffect(()=>{
       //console.log(slidesImages.length)
       if (slidesImages.length === 0 || slidesImages.length === undefined){
        setSlidesImages([...slidesImages,imgobj])
       }
     })
  return (
    <div className="slideImage">
         {
            slidesImages.length > 0  ?  slidesImages.map((img,index)=>{
              return(<div className='slideWrapper'>
             <CloseRounded className='removeSlide' color='primary' onClick={()=>{removeSlide(index,img)}} />
                  <img className="slidesImg"  alt={'slideimg'}  key={index} id={index} src={`${img.secure_url}`}  onClick={ (e) => { onImageClicked(e) }}/>   
              </div>)
               
            }):''
           
         }

                <div className='actions'>
                         {/*  <Button variant="outlined" id='action-btn-size-remove' size='small' onClick={()=>{removeSlide(2)}}>-</Button>  */}
                           <Button color='primary' variant="outlined" id="action-btn-size-add" size='large' onClick={()=>{addSlide()}}>+ Add Image</Button>
                          </div>
                <input style={{display:"none"}} type="file" id="product-file" multiple onChange={onFileInputChange} />
                </div>
  )
}

export default SlidesImage
