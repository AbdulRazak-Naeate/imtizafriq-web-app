import {useEffect,useState} from 'react';
import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../dummyData";
import Widgetsm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
function Home({transactions,aggregate}) {


  const user = JSON.parse(localStorage.getItem('user'));
   console.log('home');
   console.log(aggregate)
 useEffect(() => {
    
     
  
    },[]);
    return (
        <div className="home">
         <div className="widgetwrapper">
                <FeaturedInfo aggregate={aggregate}/>
            <Chart data={userData} title="User Analytics" grid datakey={"Active User"}/>
          <div className="homeWidgets"> 
           <Widgetsm/>
          {transactions.length> 0 ? <WidgetLg transactions={transactions}/> : ''}
          </div>
         </div>
        </div> 
    )
}

export default  Home
