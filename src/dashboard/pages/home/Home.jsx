import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
//import {monthlySales} from "../../analyticsData";
import Widgetsm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
function Home({products,transactions,completedAggregate,inCompletedAggregate,alltimeAggregate,monthlySales}) {

    return (
        <div className="home">
       <div className="widgetwrapper">
                 {alltimeAggregate ?  <FeaturedInfo completedAggregate={completedAggregate} inCompletedAggregate={inCompletedAggregate} alltimeAggregate={alltimeAggregate}/>: ''}
            {monthlySales ?  <Chart data={monthlySales} title="Sales Analytics" grid datakey={"Monthly Sales"}/>:''}
          <div className="homeWidgets">
           <Widgetsm products={products}/>
          <WidgetLg transactions={transactions}/>
          </div>
         </div> 
        </div> 
    )
}

export default  Home
