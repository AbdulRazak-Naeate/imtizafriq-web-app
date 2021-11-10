import { useState } from "react";
import React from 'react';
import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import "./dashboard.css"
import {BrowserRouter as Router,Switch,Route
} from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Store from "./pages/store/Store"
import StoreList from "./pages/storeList/StoreList";
import NewStore from "./pages/newStore/NewStore";
import ProductsList from "./pages/productlist/ProductsList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Transactions from "./pages/transactions/Transactions";
import Sales from './pages/sales/Sales';
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
 function Dashboard() {
 const [showSidebar,setShowSideBar]=useState(true);

 const handletoggleSideBar=(bol)=>{
   setShowSideBar(bol);
 }
  const toggleSideBar=()=>{
    setShowSideBar(!showSidebar);
  }
  return (
    <Router>
    <Topbar/>
     <div className="content">
    <div>
       {showSidebar && <Sidebar/>} 
    </div>
   
      
     <div className="toggleSidebarButton" onClick={toggleSideBar}></div>
    
     <Switch>
     <Route exact  path="/dashboard">
         <Home toggleSideBar={handletoggleSideBar}/>
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
       <Route path="/dashboard/store">
         <Store/>
         </Route>

       <Route path="/dashboard/stores">
        <StoreList/>
       </Route>
       <Route path="/dashboard/store/:storeId">
       
       </Route>

       <Route path="/dashboard/newStore/">
        <NewStore/>
       </Route>

       <Route path="/dashboard/products">
        <ProductsList/>
       </Route>
       <Route path="/dashboard/product">
        <Product/>
       </Route>

       <Route path="/dashboard/newProduct">
        <NewProduct/>
       </Route>

       <Route path="/dashboard/transactions">
        <Transactions/>
       </Route>
       <Route path="/dashboard/sales">
        <Sales/>
       </Route>
       <Route path="/dashboard/login" >
         <LogIn toggleSideBar={handletoggleSideBar}/>
       </Route>
       <Route path="/dashboard/signup">
         <SignUp  toggleSideBar={handletoggleSideBar} />
       </Route>
     </Switch>
    
    </div>
    </Router>
  )
}

export default Dashboard