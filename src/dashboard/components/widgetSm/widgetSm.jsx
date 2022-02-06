import './widgetSm.css'
import {Visibility } from '@material-ui/icons'
function WidgetSm({products}) {
  console.log(products)
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Recent Products</span>
            <ul className="widgetSmList">
               {
                 products.map((product,index)=>{
                   return( <li className="widgetSmListItem">
                   <img src={`http://localhost:3002/server/uploads/products/${product.image[0].filename}`} alt="" className="widgetSmImg" />
                 <div className="widgetSmProduct">
                     <span className="widgetSmTitle">{product.name}</span>
                     <span className="widgetSmDescription">{product.desscription}</span>
                 </div>
                 <button className="widgetSmButton">
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
