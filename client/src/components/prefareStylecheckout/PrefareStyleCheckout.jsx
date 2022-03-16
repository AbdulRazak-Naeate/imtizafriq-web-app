import React,{useState,useEffect} from 'react';
import{Grid} from '@mui/material';
import ImageView from './imageview/ImageView';
import ProductDetails from './productDetails/ProductDetails';
import useStyles from './styles';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import axios from 'axios';
import { randNumber } from '../../utils/Utils';
/* import body from 'form-data';
 */
const PrefareStyleCheckout = ({onAddToCart}) => {
  
    const classes=useStyles();
    const [productImages,setProductImages]=useState([]);
    const [loadedImage,setLoadedImages]=useState([]);
    const [productname,setProductName]= useState("PrefareStyle-"+ randNumber(5));
    const [sizes]=useState(['M','L','XL','XXL','XXXL'])
    const [product,setProduct]=useState({name:productname,price:'150',description:''})

    const onImageClicked = (e) => {
        const formfile = document.getElementById("product-file");
        formfile.click();
    }
    

   function  onFileInputChange(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function (e) {       
      
       setProductImages(file);

        console.log(file);
        setLoadedImages( e.target.result)

        document.getElementById('imgpreview').style.backgroundImage = e.target.result
    };
    try {
        reader.readAsDataURL(file)

    } catch (error) {
        console.log({ readAsDataURLError: error })
    }
}
const uploadAndCreateProduct =()=>{
  
  const url = `/api/products/prefstyle`;

  const body={
      name: productname,
      price: "150",
      category:"null",
      description:"null",
      specification: "none",
      digital_product_url: 'null',
      stock:'0',
      size:sizes,
      active:'0',
      product_type :'special',
      encodedimages:loadedImage,
  }



  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return axios.post(url, JSON.stringify(body), config)

};
const initiateAndCreateProduct =(sizes)=>{
  
  const url = `/api/products/prefstyle`;

  //console.log(colors);
  const formData = new FormData();
  //getInput values
 // let colors = getInputValues('color-specs');
  //let sizes  = getInputValues('size-specs');

 /*  for (let i = 0; i < colors.length; i++) {
     if(colors[i]!==""){
      formData.append('color', colors[i]);
     }
  } */
 /*  for (let j = 0; j < sizes.length; j++) {
    if (sizes[j]!==""){
      formData.append('size', sizes[j]);
    }
  } */
  formData.append('name',productname);
  formData.append('price', "150");
  formData.append('category',"null");
  formData.append('description', "null");
  formData.append('specification', "none");
  formData.append('digital_product_url', 'null');//append digital
  formData.append('stock','0');
  formData.append('active','0');
  formData.append('product_type','special');
  for (let i=0 ;i<sizes.length;i++){
    formData.append('size',sizes[i]);

  }
  //console.log(JSON.stringify(formData));

  //append files to image to create an a file array

  //for (var i = 0; i <= productImages.length; i++) {
    formData.append('image', productImages);
    console.log(productImages);
 // }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
     /*  'auth-token': user.auth_token, */
    },
  }
  return axios.post(url, formData, config)

};

    const handleMakeOrder=()=>{
      if (loadedImage.length > 0){

        uploadAndCreateProduct().then((response) => {
          console.log(response.data);
         if (response.data.status===200){
          //window.location.reload();
          var pn="PrefareStyle-"+randNumber(5)
          setProductName(pn);
          setProduct({name:pn,price:'150',description:''})
          setLoadedImages([]);
          onAddToCart(response.data.product,1);
            
         }else if (response.data.status===400){ 
  
          Alert.error(response.data.message, {
            position: 'top-left',
            effect: 'jelly'
  
        });
       // history.go(0);
         }
        }); 
        /* initiateAndCreateProduct(sizes).then((response) => {
          console.log(response.data);
         if (response.data.status===200){
          //window.location.reload();
          onAddToCart(response.data.product,1);
            //clearFields();
         }else if (response.data.status===400){ 
  
          Alert.error(response.data.message, {
            position: 'top-left',
            effect: 'jelly'
  
        });
       // history.go(0);
         }
        });  */
      }else{
        Alert.error('Please click on the style image to upload your design ', {
          position: 'top-right',
          effect: 'jelly'

      });
      }
      
    }
    /*  useEffect(()=>{
      if(productname ===''){
        setProductName("PrefareStyle-"+ randNumber(5))
      }
     },[setProductName, productname]);
 */
  return (
    <div className={classes.content}> 
           <Alert stack={{limit: 3}} />
        <Grid container justifyContent="center" spacing={1}>
        
        <Grid item={true} xs={12} sm={12} md={5} lg={5}>
        <ImageView  loadedImage={loadedImage} onImageClicked={onImageClicked} onFileInputChange={onFileInputChange}className={classes.imageView}/> 
       
        </Grid>
        <Grid item={true} xs={12} sm={12} md={5} lg={4}> 
        <ProductDetails product={product}  handleMakeOrder={handleMakeOrder}/>
         {/*   <ProductDetails product={product} onAddToCart={onAddToCart}/>
           */}
        </Grid>
         
         </Grid>
         

         </div>
  )
}

export default PrefareStyleCheckout
