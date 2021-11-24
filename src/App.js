import {useState}from 'react';
import {BrowserRouter as Router,Switch,Route
} from "react-router-dom";
import  Dashboard from './dashboard/Dashboard'
import './App.css';
import LogIn from "./pages/login/LogIn";
import SignUp from './pages/signup/SignUp';
import {Topbar,Products,Cart } from   './components';
import { useEffect } from 'react';
import axios ,{post,patch} from 'axios';
import CheckOut from './components/checkoutform/checkout/CheckOut';
function App() {
  
   const createTempUserId= ()=>{
     var id='';
    if (localStorage.getItem('temp_id')===null){
       var result = '';
      // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZY';
 
     var charactersLength = characters.length;
     for ( var i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     id =result;
     localStorage.setItem('temp_id',result);

    }else{
      let uid=localStorage.getItem('_id');
      let loggedin=localStorage.getItem('loggedin');
      if (loggedin!==null){
        if (loggedin===true){ //if user signed In get user Id from locaStorage
       setUserId(uid); 
      //localStorage.removeItem('temp_id');

     }else if(loggedin===false){
      setUserId(localStorage.getItem('temp_id'));

     }
     }else{

        //if user its first time comer and user has not sign In cretae temp id for the user and set it in localStorage
         id=localStorage.getItem('temp_id');
       
     }
    }
     
     return id;
  }
  const[userid,setUserId]=useState(createTempUserId());
 
  const[products,setProducts]=useState([]);
     const[cart,setCart]=useState({});
     const[itemsCount,setItemsCount]=useState(0);
     const [errorMessage,setErrorMessage]=useState('');
     const [order,setOrder]=useState({});
     const[myOrder,setMyOrders]=useState([]);


  // eslint-disable-next-line no-unused-vars
  const handleEmptyCart = async ()=>{

      emptyCart().then((response)=>{
         if (response.status===200){
           //console.log(response)
           setCart(response.data.cart)
           setItemsCount(response.data.cart.items.length);

         }
      })
  }
  const  handleRemoveFromCart = async (productId)=>{
  
       deleteFromCart(productId).then((response)=>{
         if (response.status===200){
           //console.log(response)
           setCart(response.data.cart)
           setItemsCount(response.data.cart.items.length);

         }
       })
  }
  // eslint-disable-next-line no-unused-vars
  const emptyCart = async () =>{

    const url = `http://localhost:3001/api/carts/${userid}`;
   
 
    return axios.patch(url)
  
  };

  const deleteFromCart =async (productId)=>{
    console.log(productId)
    const url = `http://localhost:3001/api/carts/removeitem/${userid}`;
   
 
    return axios.patch(url,{
      productId:productId,
      userId:userid
    })
  
  };
  const handleUpdateCartQty = async (productId,quantity,price)=>{
          if (quantity>=1){
            updateCartQty(productId,quantity,price).then((response)=>{
              if (response.status===200){
               // console.log(response.data.cart.items)
                setCart(response.data.cart)
                setItemsCount(response.data.cart.items.length);

               } 
             })
          }
  }
  
  const updateCartQty =(productId,quantity,price)=>{
    
    const url = `http://localhost:3001/api/carts/quantity/${productId}`;
   
 
    return patch(url,  {
      productId:productId,
      quantity:quantity,
      price:price,
      userId:userid,
     
    })
  
  };
  const handleAddtoCart = async (productId,quantity)=>{

    addtoCart(productId,quantity).then((response) => {
     // console.log(response.data);
      if (response.status===200){
        
        setCart(response.data.cart)
        setItemsCount(response.data.cart.items.length);

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


     
   
  const incomingOrder = async (newOrder)=>{
    console.log(newOrder)
    let customer=newOrder.customer;
    let items=newOrder.line_items
    let shippingData=newOrder.shipping
    console.log(newOrder.line_items)
    
    

    const url = 'http://localhost:3001/api/orders';
   var response='';
      for(let i=0;i<items.length;i++){
         

      await  post(url,  {
          name:items[i].product.name,
          storeId:items[i].product.storeId,
          productId:items[i].product._id,
          orderNumber:shippingData.orderNumber,
          quantity:items[i].quantity,
          color:'null',
          size:'null',
          priceEach:items[i].product.price,
          totalPrice:items[i].line_item_sub_price,
          userId:userid,
          paymentMethod:"flutterwave",
          firstname:customer.firstname,
          lastname:customer.lastname,
          email:customer.email,
          phone:customer.phone,
          country:shippingData.country,
          state:shippingData.county_state,
          city:shippingData.town_city
         
        // eslint-disable-next-line no-loop-func
        },).then(ret=>{
          console.log(ret)
          response= ret;
        })
      }

      return response
  


    
  }
 
  const handleCaptureCheckout =async (checkoutTokenId,newOrder)=>{
   
    try{ 
          incomingOrder(newOrder).then((response)=>{
           console.log(response.data)
           setMyOrders(response.Data);
         })
          console.log(newOrder)
          setOrder(newOrder);
           //refreshCart();
    }catch(error){
           setErrorMessage(error.data.error.message);
    }
}
  

   useEffect(() => {
  
    const fetchProducts = async ()=>{
      try{
         const res  = await fetch(`http://localhost:3001/api/products`);
         const data = await res.json();
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
       //console.log(tmp);
    }catch(error){
  
    }
  } 
  
  const handlegetCart = async ()=>{
   console.log("get cart"+userid)
  
    getCart().then((response) => {
      console.log(response.data);
      if (response.status===200){
        try{
          setCart(response.data.cart)
          setItemsCount(response.data.cart.items.length);
        }catch(err){
          console.log(err)
        }
      }
      //addToast(exampleToast(response.data.message));
    })
  
}


  

  const getCart =()=>{

    const url = `http://localhost:3001/api/carts/${userid}`;
    
    return axios.get(url)
  
  };
    getProducts();
    handlegetCart();
   },[userid])
  return (
       <Router>
         
         <Topbar totalItems={itemsCount}/>
       <Switch>
       <Route exact path="/" >
       <Products products={products} onAddToCart={handleAddtoCart} />
      
       </Route>
       <Route exact path="/cart">
          <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}/>
       </Route>
       <Route exact path="/checkout">
         <CheckOut cart={cart}   order={order}  onCaptureCheckout={handleCaptureCheckout}/>
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
