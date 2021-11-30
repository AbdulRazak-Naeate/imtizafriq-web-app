import React,{useState,useEffect} from 'react'
import useStyles from './styles';
import ImageView from './imageview/ImageView';
import ProductDetails from './productDetails/ProductDetails';
import QueryParams from '../../QueryParams';
import axios from 'axios'

const ProceedcheckOut = () => {
    const query =QueryParams()
    const classes = useStyles();
    const[productid]=useState(query.get('productId'));
    const[product,setProduct]=useState([]);
    const[images,setImages]=useState([])


    useEffect(()=>{



        const getProduct = async ()=>{
           
             fetchProduct().then((response) => {
              console.log(response.data);
               if (response.status===200){
                   
                 try{
                  let tmp =[];
                     
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

        getProduct();
       
    },[productid])
  return (
      
    <div className={classes.container}>
     { product ? <>
      <ImageView images={images}/> 
     <ProductDetails product={product}/></>
     : ''}
     </div>
  )
}
export default ProceedcheckOut
