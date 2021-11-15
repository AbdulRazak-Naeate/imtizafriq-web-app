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
     const[userid,setUserId]=useState('');
     const[tempUserId,setTempUserId]=useState('');
  const[products,setProducts]=useState([]);
  const[cart,setCart]=useState({});
  
    
  // eslint-disable-next-line no-unused-vars
  const handleEmptyCart = async ()=>{

      emptyCart().then((response)=>{
         if (response.status===200){
           console.log(response)
           setCart(response.data.cart.items)
         }
      })
  }
  const  handleRemoveFromCart = async (productId)=>{
  
       deleteFromCart(productId).then((response)=>{
         if (response.status===200){
           //console.log(response)
           setCart(response.data.cart.items)
         }
       })
  }
  // eslint-disable-next-line no-unused-vars
  const emptyCart = async () =>{
    var userId='87y748u2re8y48u39949992'
    const url = `http://localhost:3001/api/carts/${userid}`;
   
 
    return axios.patch(url)
  
  };

  const deleteFromCart =async (productId)=>{
    var userId='87y748u2re8y48u39949992'
    const url = `http://localhost:3001/api/carts/${productId}/${userid}`;
   
 
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
      userId:userid,
     
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
      userId:userid,
     
    })
  
  };

   useEffect(() => {
     
  const createTempUserId= ()=>{
    var result           = '';
    // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var characters       = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZY';
 
     var charactersLength = characters.length;
     for ( var i = 0; i < 18; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     localStorage.setItem('temp_id',result)

     console.log(result);
     return result;
  }
   const checkandSetUserId =()=>{
    let uid=localStorage.getItem('_id');
    let tempuid=localStorage.getItem('temp_id');
    if (uid===null && tempuid===null){//if user its first time comer and user has not sign In cretae temp id for the user and set it in localStorage
        createTempUserId();
        setUserId(localStorage.getItem('temp_id'));
        console.log(userid)
      }else{//user revisited 
     
        if (localStorage.getItem('loggedin')===true){ //if user signed In get user Id from locaStorage
        setUserId(localStorage.getItem('_id'));
        console.log(userid)
     }else{//user revisited but not signIn Used temp_id
        setUserId(localStorage.getItem('temp_id'));
        console.log(userid);
     }
    }}
    
    const fetchCart = async ()=>{
      try{
         const res = await fetch(`http://localhost:3001/api/carts/${userid}`);
         const data=await res.json();
               //console.log("cart res : "+data[0].items[0].product._id);
               //console.log("cart res : "+data[0].items[0].quantity);

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
    checkandSetUserId();
    getProducts();
    fetchCart()
   },[userid])
  return (
       <Router>
         <Topbar totalItems={cart.length}/>
       <Switch>
       <Route exact path="/" >
       <Products products={products} onAddToCart={handleAddtoCart} />
      
       </Route>
       <Route exact path="/cart">
         {console.log(cart)}
          <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}/>
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
