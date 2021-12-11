import React,{useState,useEffect,useRef} from 'react'
import useStyles from './styles';
import ImageView from './imageview/ImageView';
import ProductDetails from './productDetails/ProductDetails';
import QueryParams from '../../QueryParams';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Slider from './slider/Slider'

const ProceedcheckOut = ({onAddToCart}) => {
    const query =QueryParams()
    const classes = useStyles();
    const[productid]=useState(query.get('productId'));
    const[product,setProduct]=useState([]);
    const[images,setImages]=useState([]);
    const isMountedRef =useRef(true)

/* const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
})); */

    useEffect(()=>{
     isMountedRef.current=false


        const getProduct = async ()=>{
           
             fetchProduct().then((response) => {
              console.log(response.data);
               if (response.status===200){
                   
                 try{
                     
                   setProduct(response.data.product)
                   setImages(response.data.product.image)
                  
                 }catch(err){
                   console.log(err)
                 }
               }
               //addToast(exampleToast(response.data.message));
             })
           
         }
         
         
           
         
           const fetchProduct =()=>{
         
             const url = `http://localhost:3001/api/products/${productid}`;
             
             return axios.get(url)
           
           };

      if (productid){
        getProduct();
      }
       
    },[productid])
  return (
   <div className={classes.content}> { product ?
    <Grid container justifyContent="center" spacing={1}>
    
    <Grid item={true} xs={12} sm={6} md={4} lg={5}>
    <ImageView images={images} className={classes.imageView}/> 
    <Slider images={images} />
    </Grid>
    <Grid item={true} xs={12} sm={6} md={4} lg={5}>
       <ProductDetails product={product} onAddToCart={onAddToCart}/>
     
    </Grid>
     
     </Grid>
     
     : ''}
     </div>
  )
}
export default ProceedcheckOut
