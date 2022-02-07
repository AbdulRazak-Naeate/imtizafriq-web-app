import './widgetSm.css';
import {Link,useHistory} from 'react-router-dom';
import {Visibility } from '@material-ui/icons'
function WidgetSm({products}) {
  console.log(products)
  const history=useHistory();
  console.log(products)
  const handleEdit = (product)=>{
    //navigate to product page
   history.push(`/dashboard/product?productId=${product._id}&productName=${product.name}`);
   localStorage.setItem('product', JSON.stringify(product));        

}
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Recent Products</span>
            <ul className="widgetSmList">
               {
                 products.map((product,index)=>{
                   return( <li className="widgetSmListItem">
                   <img src={`http://localhost:3002/server/uploads/products/${product.image[0].filename}`} alt="" className="widgetSmImg" />
                 <div className="widgetSmProduct">
                     <span className="widgetSmProductTitle">{product.name}</span>
                     <span className="widgetSmProductDescription">{product.desscription}</span>
                 </div>
             
               <button className="widgetSmButton" onClick={()=>{handleEdit(product)}}>
                   <Visibility className="widgetSmIcon"/>
                   Display
                 </button>
            
               </li>)
                 })
               }
               
            </ul>
        </div>
    )
}

export default WidgetSm
