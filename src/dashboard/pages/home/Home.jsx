import {useEffect,useState} from 'react';
import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../dummyData";
import Widgetsm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
function Home({products,transactions,aggregate}) {


    return (
        <div className="home">
        {aggregate ?  <div className="widgetwrapper">
                <FeaturedInfo aggregate={aggregate}/>
            <Chart data={userData} title="User Analytics" grid datakey={"Active User"}/>
          <div className="homeWidgets"> 
           <Widgetsm products={products}/>
          <WidgetLg transactions={transactions}/>
          </div>
         </div>:''}
        </div> 
    )
}

export default  Home
