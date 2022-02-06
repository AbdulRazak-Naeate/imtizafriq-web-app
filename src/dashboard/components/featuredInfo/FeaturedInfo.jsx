import {useState}from 'react';
import "./featuredInfo.css";
import { ArrowDownward,ArrowUpward,Add} from "@material-ui/icons"
import { formatWithCurrencySymbol } from "../../../utils/Utils"

export const FeaturedInfo = ({aggregate}) => {
   
   var count=0;
   var sales=0
   try{
    console.log(aggregate[0].total)
     count = aggregate[0].count
     sales = aggregate[0].total
   }catch(err){
       console.log(err)
   }
    return (
       <>
       {
           <div className="featured">
            <div className="featuredItem">
            <span className="featureTitle">Orders</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredMoney">{count}</span>
                 <span className="featuredMoneyRate">
                 <Add  className="featuredIcon positive"/>
                 </span>
             </div>
             <span className="featuredSub">All times orders</span>
            </div>
 
            <div className="featuredItem">
            <span className="featureTitle">Sales</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredMoney">{`${formatWithCurrencySymbol(sales,'GHS')}`}</span>
                 <span className="featuredMoneyRate">-11.4
                 <ArrowDownward className="featuredIcon negative"/>
                 </span>
             </div>
             <span className="featuredSub">All time sales made</span>
            </div>
          {/*   <div className="featuredItem">
            <span className="featureTitle">Cost</span>
             <div className="featuredMoneyContainer">
                 <span className="featuredMoney">$4,415</span>
                 <span className="featuredMoneyRate">+2.4
                 <ArrowUpward  className="featuredIcon"/>
                 </span>
             </div>
             <span className="featuredSub">Compared to last month</span>
            </div> */}
         </div>
       }
       </>
    )
}
