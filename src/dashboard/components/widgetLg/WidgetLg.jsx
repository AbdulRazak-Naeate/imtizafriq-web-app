import { formatWithCurrencySymbol, truncateString } from "../../../utils/Utils"
import "./widgetLg.css";
import {PersonOutlineRounded} from '@mui/icons-material'
 function WidgetLg({transactions}) {
     const Button=({type})=>{
         return <button className={"widgetLgButton "+type}>{type}</button>
     }
    return (
        <div className="widgetLg">
            <h3 className="wdigetLgTitle">Latest Transactions</h3>
            <table className="widgetLgTable">
              <tbody>
              <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Product</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
               
              {  
                  transactions.length > 0 ? <> {transactions.map((transaction,index)=>{
                    return(
                    
                    <tr className="widgetLgTr" key={index}>
                    <td className="widgetLgUser">
                       <>
                       <PersonOutlineRounded className="widgetLgImg" />
                        {/* <img src="https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?cs=srgb&dl=pexels-cottonbro-4620866.jpg&fm=jpg" alt="user" />*/}
                        <span className="widgetLgName"> {transaction.customer.firstname}</span>
                       </>
                    </td>
                    <td className="widgetLgProduct">{truncateString(transaction.name,26)}</td>
                    <td className="widgetLgDate">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="widgetLgAmount">{formatWithCurrencySymbol(transaction.totalPrice,'GHS')}</td>
                    <td className="widgetLgStatus"><Button type={`${transaction.status}`}/></td>
                </tr>)
                })}</> : ''
              }
              </tbody>
            </table>
        </div>
    )
}
export default WidgetLg
 