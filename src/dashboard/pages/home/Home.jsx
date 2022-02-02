import {useEffect,useState} from 'react';
import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../dummyData";
import Widgetsm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from 'axios';
function Home({handlegetProducts}) {

  const [transactions,setTransactions]=useState([]); 
  const user = JSON.parse(localStorage.getItem('user'));
 console.log('home');

 useEffect(() => {
    
      const fetchTransactions =  async () => {//get Orders 
 
           var url = `http://localhost:3001/api/analytics/transactions`
  
          const response = await axios.get(url).then((response)=>{
                          setTransactions(response.data.transactions);
                          

          });
        }

        
    const handlegetTransactions =  () => {
      
       try {
        fetchTransactions().then((response)=>{
                setTransactions(response.data.transactions)
  
        });  
      
      } catch (error) {
        console.log({message:error})
      }
     };
      
     handlegetTransactions()
  
    },[handlegetProducts, user._id]);
    return (
        <div className="home">
         <div className="widgetwrapper">
                <FeaturedInfo/>
            <Chart data={userData} title="User Analytics" grid datakey={"Active User"}/>
          <div className="homeWidgets"> 
           <Widgetsm/>
           <WidgetLg transactions={transactions}/>
          </div>
         </div>
        </div> 
    )
}

export default  Home
