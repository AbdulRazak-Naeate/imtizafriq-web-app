import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import "./dashboard.css"
import Home from "./pages/home/Home";
import {BrowserRouter as Router,Switch,Route
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Store from "./pages/store/Store"
import StoreList from "./pages/storeList/StoreList";
import NewStore from "./pages/newStore/NewStore";
import ProductsList from "./pages/productlist/ProductsList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";

 function Dashboard() {
 
  return (
    <Router>
    <Topbar/>
     <div className="content">
     <Sidebar/>
     <Switch>
     <Route exact path="/dashboard">
         <Home/>
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

       <Route path="/dashboard/newProduct/">
        <NewProduct/>
       </Route>
     </Switch>
    
    </div>
    </Router>
  )
}

export default Dashboard