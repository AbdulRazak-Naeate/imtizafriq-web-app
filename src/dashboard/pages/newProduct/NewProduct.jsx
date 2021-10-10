import { useState } from 'react';
import {Link} from 'react-router-dom';
import './newProduct.css';
import QueryParams from '../../QueryParams';
import ImagesContainer from './ImagesContainer';
import Specification from './Specification';
import { post } from 'axios';

export default function NewProduct() {
    
    const [productImages,setProductImages]=useState({});
    const [digitalProductUrl, setdigitalProductUrl] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock,setStock]=useState('');
    const [active,setActive]=useState('');
    const [specification,setSpecification] = useState('none');
    const [showSpecification,setShowSpeicification]=useState(false);
    const [showDigitalProductFileInput,setShowDigitalProductFileInput] = useState(false);
    let query=QueryParams();
    const storeid= query.get('storeId');
    const storename =query.get("storeName");
        const onSpecificationChange = (e) => {
        setSpecification(e.target.value)
        if(e.target.value==="NONE"){
          setShowSpeicification(false)
        }else{
          setShowSpeicification(true)
          setShowDigitalProductFileInput(false) //Specification is set SPECIFIED ,hide Digital product file input
        }
        console.log(e.target.value)
      }
      const onAddProductCLick =()=>{
        //  let storeid=document.getElementById("storeselect").value
         // console.log(storeid)
          //setStoreId(storeid)
        
      }
    
    
      const onDigitalProductUrlChange = (e) => {
        setdigitalProductUrl(e.target.value);
      }
      const onDigitalProuctInputChange = (e)=>{
            if(e.target.value==="NONE"){
             setShowDigitalProductFileInput(false)
            }else{
             setShowDigitalProductFileInput(true)
            }
            console.log(e.target.value)
      }
        
      const handleImages=(Images)=>{
        let tmp=[];
       Images.map((item)=>{
          tmp.push(item)
         // console.log(tmp);
          return null
       })
       setProductImages(tmp);
    }
    
    
    
    
        //Get color and size input Values from input els, @elId is element Id 
      const getInputValues = (elId) => {
        var inputValues = [];
    
        var inputEl = document.getElementsByClassName(elId);
    
        for (var i = 0; i < inputEl.length; i++) {
             inputValues.push(inputEl[i].value);
        }
         //console.log(inputValues)
        return inputValues;
      }

      const onFormSubmit = (e) => {

        const form = e.currentTarget
        if (form.checkValidity() === false) {
          e.stopPropagation()
        }
        
        e.preventDefault()// Stop form default submit
        initiateAndCreateProduct().then((response) => {
          console.log(response.data);
         if (response.data.status===200){
          
           // let product=[temp.name,temp.id,temp.price,temp.size,temp.likes,temp.comments,temp.date];
          // console.log([...products,response.data.product])
           // onAddProduct(products,response.data.product);
            // alert(response.data.product);
         }
        })
      }
     const initiateAndCreateProduct =()=>{
        
        const url = 'http://localhost:3001/api/products/';
    
        console.log(productImages);
        const formData = new FormData();
        //getInput values
        let colors = getInputValues('color-specs');
        let sizes  = getInputValues('size-specs');
    
        for (let i = 0; i < colors.length; i++) {
          formData.append('color', colors[i]);
        }
        for (let j = 0; j < sizes.length; j++) {
          formData.append('size', sizes[j]);
        }
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('specification', specification);
        formData.append('digital_product_url', digitalProductUrl);//append digital
        formData.append('storeId', storeid);
        formData.append('stock',stock);
        formData.append('active',active)
        console.log(JSON.stringify(formData));
     
        //append files to image to create an a file array
      
        for (var i = 0; i <= productImages.length; i++) {
          formData.append('image', productImages[i]);
          //console.log(productImages);
        }
    
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwNjc4YWY2NzA3ZTI1YzAyODBiNmQiLCJpYXQiOjE2MjQyNzA3NjN9.YGbjKlP3gQTGY_-3Epsik8N6QCWmtTYrOABFm7Iu2fY',
          },
        }
        return post(url, formData, config)
      
      };
  
   
    return (
        <div className="newProduct">
    <span className="addproductStoreTitle">{storename}
                </span> 
          <div className="addProductTitleContainer">
              <h1 className="addProductTitle">Add New Product </h1>
            
            
          <Link to={`/dashboard/products?storeId=${storeid}&storeName=${storename}`}>
          <button className="ProductListButton">Products</button>
          </Link>

          </div>
          
          <div className="addProductFormContainer">
           <form className="addProductForm" onSubmit={onFormSubmit}>
               <div className="productFormTop">
                   <div className="productFormTopLeft">

                <div className="addProductItem">
                <label>Name</label>
                  <input type="text" placeholder="Name" required onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div className="addProductItem">
            <label >Price</label>
             <input type="number"  placeholder="100 pi" required onChange={(e)=>{setPrice(e.target.value)}} />
         </div>

         <div className="addProductItem">
             <label>Active</label>
             <select name="active" id="active" className="active" value="" onChange={(e)=>{setActive(e.target.value)}}>
             <option value="yes">Yes</option>
               <option value="no">No</option>
              </select>
            </div>
            <div className="addProductItem">
              <label htmlFor="validationTextarea">Description</label>
        <textarea id="description" name="description" rows="5"
         placeholder="Describe the product you are selling"
         required onChange={(e)=>{setDescription(e.target.value)}}></textarea>
         </div>
      </div>

    <div className="productFormTopRight">

     

      <div className="addProductItem">
             <label>Stock</label>
             <input type="text" placeholder="123" required onChange={(e)=>{setStock(e.target.value)}} />
           </div>
      <div className="addProductItem">
          
      </div>
      <div className="addProductItem">
           <label htmlFor="validationCustom04">Specification</label>
          <select id="validationCustom04" onChange={onSpecificationChange}>
             <option>NONE</option>
             <option>SPECIFIED</option>
          </select> 
      </div>
       <div className="addProductItem">
          { !showSpecification ? <>
         <label htmlFor="validationCustom05">Digital Product</label>
           <select id="validationCustom05" onChange={onDigitalProuctInputChange}>
              <option>NONE</option>
              <option>SPECIFIED</option>
             </select></>:''}  
          </div>

          <div className="addProductItem">
            {  showDigitalProductFileInput ?   <div className="digital_product">
               <label>Google Drive Url File</label>
               <div className="addProductItem">
               <input type="text" id="digital-product-file"placeholder="https://drive.google.com/file/d/1PzOdYqBftPID4BNvUa3T_OzEBkzUBwDT/view?usp=drivesdk" onChange={onDigitalProductUrlChange} />
               </div>
               </div> :<></>
           }
            </div>
        
      
         </div>
        </div>
               
              <ImagesContainer handleImages={handleImages}/>
              {showSpecification ? <Specification/> :<></>}

        <div className="addProductItem">
        <button className="addProductButton" type="submit" onClick={onAddProductCLick}>Create</button>

        </div>
        </form>
        </div>
       </div>         
    )
}
