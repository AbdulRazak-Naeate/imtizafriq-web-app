import {useEffect, useState} from 'react'
import './product.css';
import {Link} from "react-router-dom";
import { Chart } from '../../components/charts/Chart';
import { productData } from '../../dummyData';
import { Publish } from '@material-ui/icons';
import QueryParams from '../../QueryParams';
import {patch}from 'axios';

export default function Product() {
    const query=QueryParams();
    const [product,setProduct]= useState(JSON.parse(localStorage.getItem('product')));
    const [storeid]=useState(query.get('storeId'));
    const [storename]=useState(query.get('storeName'));
    const [productid]=useState(product._id); 
    const [productname]=useState(product.name);
    // eslint-disable-next-line no-unused-vars
    const [stock,setStock]=useState(product.stock.currentstock);
    const [addStock,setaddStock]=useState(0);
    const [active,setActive]=useState(product.active);
    const [price,setPrice]=useState(product.price);
    const [productUpdated,setProductUpdated]=useState(false);
    const[user]=useState(JSON.parse(localStorage.getItem('user')));

      const handleUpdate=(e)=>{
            e.preventDefault();
            editProduct().then((response)=>{
                if(response.status===200){
                     setProduct(response.data)
                     setStock(response.data.stock.currentstock);
                     setPrice(response.data.price);
                     setActive(response.data.active);
                     console.log(response);              
                     setProductUpdated(!productUpdated)
}                    setaddStock(0);
               

            });
      }

      const editProduct =()=>{
        const url = `http://localhost:3001/api/products/${productid}`;
         console.log(addStock)
        const body={
                 productId:productid,
                 price:price,
                 stock:addStock,
                 active:active
        }
        const config = {
            headers: {
                'auth-token':
                  user.auth_token,
              },
        }
        return patch(url, body,config)
      
      };
      
      useEffect(()=>{
         //var addStockput = document.getElementById('stock');
        // addStockput.innerText=product.stock;
      })
    return (
        <div className="product">
            <span>{storename}</span>
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to={`/dashboard/newproduct?storeId=${storeid}&storeName=${storename}`}>
                <button className="productAddButon">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productData} datakey="Sales" title="Sales Performance"/>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={`http://localhost:3001/server/uploads/products/${product.image[0].filename}`} alt="" className="productInfoImg" />
                       <span className="productName">{productname}</span>
                    </div>
                    <div className="productInfoBottom">
                        <span className="productInfoItem">
                            <span className="productInfoKey">id: </span>
                            <span className="productInfoValue">{" "+product._id}</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">sales</span>
                            <span className="productInfoValue">5123</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">active</span>
                            <span className="productInfoValue">{active}</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <label className="productInfoValue" >{product.stock.currentstock}</label>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">price:</span>
                            <label className="productInfoValue" id="stock">{`π${product.price}`}</label>
                        </span>
                    </div>
                    </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleUpdate}>
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" value={product.name}placeholder="Apple Airpod"/>
                        <label>Price</label>
                        <input type="text" placeholder="π10.00"value={price}onChange={(e)=>{setPrice(e.target.value)}}/>
                        <label>Add Stock</label>
                        <input type="text" id="stock" value={addStock}   placeholder="0" onChange={(e)=>{setaddStock(e.target.value)}}/>
                        <label>Active</label>
                        <select name="active" id="" className="active" onChange={(e)=>{setActive(e.target.value)}}>
                            <option selected='selected'>{product.active}</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={`http://localhost:3001/server/uploads/products/${product.image[0].filename}`} alt="" className="productUploadImg" />
                            <label htmlFor="file" style={{display:'none'}}>
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display:"none"}} />
                        </div>
                        <button type="submit" className="productButton" >Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}