import { useState,useEffect } from "react";
import React from 'react';
import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import Confirm from "./components/email/Confirm"
import "./dashboard.css"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductsList from "./pages/productlist/ProductsList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Transactions from "./pages/transactions/Transactions";
import Sales from './pages/sales/Sales';
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import Settings from "./pages/settings/Settings"
import axios from 'axios';

 function  Dashboard() {
 const [showSidebar,setShowSideBar]=useState(true);
 const [products,setProducts]=useState([]);
 const [analytics,setAnalytics]=useState({});
 const [transactions,setTransactions]=useState({});
 const [completedAggregate,setCompletedAggregate]=useState([]);
 const [inCompletedAggregate,setinCompletedAggregate]=useState([]);
 const [alltimeAggregate,setAlltimeAggregate]=useState([]);
 const [analyticsLoaded,setIsanalyticsLoaded]=useState(false);
 const [isproductsLoaded,setIsproductsLoaded]=useState(false);
 const [monthlySales,setMonthlySales]=useState([]);
 const [ismonthlySalesLoaded,setIsmonthlySalesLoaded]=useState(false);

const paths =[ 
    '/dashboard',   
    '/dashboard/users',
    '/dashboard/user/:userId',
    '/dashboard/newUser/',
    '/dashboard/products',
    '/dashboard/product',
    '/dashboard/newProduct',
    '/dashboard/transactions',
    '/dashboard/sales','/dashboard/settings',]
    
 const handletoggleSideBar=(bol)=>{
   setShowSideBar(bol);
 }
  const toggleSideBar=()=>{
    setShowSideBar(!showSidebar);
  }
  

    
    async function handleDeleteProduct(_id) {
      try {
        const response = await axios.delete(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/products/${_id}`);
       
        if (response.data.deletedCount>=1){
        setProducts(products.filter((item) => item._id !==_id))

        }
      } catch (error) {
        console.error(error);
      }
    }

   
    const fetchProducts = async ()=>{
      console.log(process.env.REACT_APP_SERVER_PORT)
      try{
         const res = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/products`);
         const data=await res.json();
               //console.log(data);
               return data.products;
      }catch(error){

      }
}
const handlegetProducts = async() => {
    try{
       const productsFromServer = await fetchProducts();
       let tmp =[];
          for(let i=0;i<productsFromServer.length;i++){
            tmp.push(productsFromServer[i]);
            
          }
       setProducts(tmp);
      // console.log(tmp);
    }catch(error){

    }
}
  const handlegetMonthAnalytics =  async () => {//get Orders 
 
    var url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/analytics/transactions/sales/monthly`
  
    await axios.post(url,{year:2022}).then((response)=>{
      //console.log(response.data)
          setMonthlySales(response.data.monthlySales);
         
  
   });
  }
useEffect(()=>{
  const handlegetAnalytics =  async () => {//get Orders 
 
    var url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/analytics/transactions`

    await axios.get(url).then((response)=>{
     // console.log(response.data.transactions)
          setAnalytics(response.data);
          setTransactions(response.data.transactions);
          setCompletedAggregate(response.data.completedAggregate);
          setinCompletedAggregate(response.data.inCompleteAggregate);
          setAlltimeAggregate(response.data.alltimeAggregate);

   });
 }
 if (!isproductsLoaded) {handlegetProducts();}
 if (!ismonthlySalesLoaded){ handlegetMonthAnalytics();}
 if (!analyticsLoaded){ handlegetAnalytics();}

return ()=>{
  
     setIsproductsLoaded(true);
     setIsanalyticsLoaded(true);
     setIsmonthlySalesLoaded(true);
  
}


});


 
  return (
    <Router>
    <Route exact path={paths}>
         <Topbar/>
         </Route>
     <div className="content">

    <div>
       {showSidebar &&
       <Route exact path={paths}> <Sidebar/></Route>
        } 
    </div>
   
      <Route exact path={paths}>
        <div className="toggleSidebarButton" onClick={toggleSideBar}></div>
      </Route>
     
    
     <Switch>
     <Route exact  path="/dashboard">
         <Home products={products} transactions={transactions} completedAggregate={completedAggregate} inCompletedAggregate={inCompletedAggregate} alltimeAggregate={alltimeAggregate} monthlySales={monthlySales}/>
       </Route>
       <Route path="/dashboard/users">
        <UserList/>
       </Route>
       <Route path="/dashboard/user/:userId">
        <User/>
       </Route>
       <Route path="/dashboard/newUser/">
        <NewUser/>
       </Route>
       <Route path="/dashboard/products">
        <ProductsList products={products} handleDeleteProduct={handleDeleteProduct}/>
       </Route>
       <Route path="/dashboard/product">
        <Product/>
       </Route>
       <Route path="/dashboard/newProduct">
        <NewProduct/>
       </Route>
       
       <Route path="/dashboard/transactions">
        <Transactions />
       </Route>
       <Route path="/dashboard/sales">
        <Sales />
       </Route>
       <Route path="/dashboard/settings">
        <Settings />
       </Route>
       <Route path="/dashboard/login" >
         <LogIn toggleSideBar={handletoggleSideBar}/>
       </Route>
       <Route path="/dashboard/signup">
         <SignUp  toggleSideBar={handletoggleSideBar} />
       </Route>
       <Route path="/dashboard/email/confirm">
         <Confirm/>
       </Route>
     </Switch>
    
    </div>
    </Router>
  )
}

export default Dashboard