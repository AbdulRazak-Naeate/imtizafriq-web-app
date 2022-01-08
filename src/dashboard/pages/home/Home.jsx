import {useEffect} from 'react';
import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../dummyData";
import Widgetsm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

function Home({}) {
    useEffect(()=>{
       
       },[]);
    return (
        <div className="home">
         <div className="widgetwrapper">
                <FeaturedInfo/>
            <Chart data={userData} title="User Analytics" grid datakey={"Active User"}/>
          <div className="homeWidgets"> 
           <Widgetsm/>
           <WidgetLg/>
          </div>
         </div>
        </div> 
    )
}

export default  Home
