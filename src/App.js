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
  const[cart,setCart]=useState({});

  // eslint-disable-next-line no-unused-vars
  const handleEmotyCart = async (cartid)=>{

  }
  const  handleRemoveFromCart = async (productId)=>{
  
       deleteFromCart(productId).then((response)=>{
         if (response.status===200){
           console.log(response)
           setCart(response.data.cart.items)
         }
       })
  }
  // eslint-disable-next-line no-unused-vars
  const emptyCart =async (cartId)=>{
    
    const url = `http://localhost:3001/api/carts/${cartId}`;
   
 
    return axios.delete(url,  {
      cartId:cartId,
      userId:"87y748u2re8y48u39949992",
     
    })
  
  };

  const deleteFromCart =async (productId)=>{
    
    const url = `http://localhost:3001/api/carts/${productId}/87y748u2re8y48u39949992`;
   
 
    return axios.delete(url)
  
  };
  const handleUpdateCartQty = async (productId,quantity)=>{
             console.log(quantity)
            updateCartQty(productId,quantity).then((response)=>{
             if (response.status===200){
               console.log(response.data.cart.items)
               setCart(response.data.cart.items)
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
        
         setCart(response.data.cart.items)
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
               console.log("cart res : "+data[0].items[0].product._id);
               console.log("cart res : "+data[0].items[0].quantity);

               setCart(data[0].items);
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
         {console.log(cart)}
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
