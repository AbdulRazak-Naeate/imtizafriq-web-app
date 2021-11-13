import {useState}from 'react';
import {BrowserRouter as Router,Switch,Route
} from "react-router-dom";
import  Dashboard from './dashboard/Dashboard'
import './App.css';
import LogIn from "./pages/login/LogIn";
import SignUp from './pages/signup/SignUp';
import Topbar from   './components/topbar/Topbar';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import { useEffect } from 'react';
import axios ,{post,patch} from 'axios';
function App() {
  const[products,setProducts]=useState([]);
  const[cart,setCart]=useState([]);


  const  handleRemoveFromCart = async (productId)=>{

       deleteFromCart(productId).then((response)=>{
         if (response.status===200){
           setCart(response.data.cart)
         }
       })
  }

  const deleteFromCart =async (productId)=>{
    
    const url = `http://localhost:3001/api/carts/${productId}`;
   
 
    return axios.delete(url,  {
      productId:productId,
      userId:"87y748u2re8y48u39949992",
     
    })
  
  };
  const handleUpdateCartQty = async (productId,quantity)=>{
             console.log(quantity)
            updateCartQty(productId,quantity).then((response)=>{
             if (response.status===200){
                setCart(response.data.cart)
              } 
            })
  }
  
  const updateCartQty =(productId,quantity)=>{
    
    const url = `http://localhost:3001/api/carts/quantity/${productId}`;
   
 
    return patch(url,  {
      productId:productId,
      quantity:quantity,
      userId:"87y748u2re8y48u39949992",
     
    })
  
  };
  const handleAddtoCart = async (productId,quantity)=>{

    addtoCart(productId,quantity).then((response) => {
      console.log(response.data);
      if (response.status===200){
         setCart(response.data.cart)
      }else{
       
      
      }
      //addToast(exampleToast(response.data.message));
    })
}


  

  const addtoCart =(product,quantity)=>{
    
    const url = 'http://localhost:3001/api/carts';
   
 
    return post(url,  {
      productId:product._id,
      quantity:quantity,
      product:product,
      userId:"87y748u2re8y48u39949992",
     
    })
  
  };

   useEffect(() => {

    const fetchCart = async ()=>{
      try{
         const res = await fetch(`http://localhost:3001/api/carts`);
         const data=await res.json();
               console.log(data);
               setCart(data);
               return data;
      }catch(error){
  
      }
  }
    const fetchProducts = async ()=>{
      try{
         const res = await fetch(`http://localhost:3001/api/products`);
         const data=await res.json();
               console.log(data);
               return data;
      }catch(error){
  
      }
  }

  const getProducts =async() => {
    try{
       const productsFromServer = await fetchProducts();
       let tmp =[];
          for(let i=0;i<productsFromServer.length;i++){
            tmp.push(productsFromServer[i]);
            
          }
       setProducts(tmp);
       console.log(tmp);
    }catch(error){
  
    }
  }
    getProducts();
    fetchCart()
   },[])
  return (
       <Router>
         <Topbar totalItems={cart.length}/>
       <Switch>
       <Route exact path="/" >
       <Products products={products} onAddToCart={handleAddtoCart} />

       </Route>
       <Route exact path="/cart">
          <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
       </Route>
        </Switch> 
        
         <Switch>
         <Route path="/login">
           <LogIn/>
         </Route>
          <Route path="/signup">
           <SignUp/>
         </Route>
         <Route path="/dashboard">
            <Dashboard/>
         </Route>
       </Switch>
       </Router>
  );
}

export default App;
