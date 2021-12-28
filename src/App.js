/* eslint-disable no-unused-vars */
import {useState}from 'react';
import {BrowserRouter as withRouter,Switch,Route,useHistory
} from "react-router-dom";
import  Dashboard from './dashboard/Dashboard';
import './App.css';
import LogIn from "./pages/login/LogIn";
import SignUp from './pages/signup/SignUp';
import {Topbar,BottomNav,Products,Cart,Orders,ProceedCheckOut,Account } from './components';
import React, { useEffect } from 'react';
import axios ,{post,patch} from 'axios';
import CheckOut from './components/checkoutform/checkout/CheckOut';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {RModal} from './components/modal/RModal'
import { blue, orange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {

  const ref = React.useRef(null);
  const theme = createTheme({
    palette: {
      primary:{
        main:blue[500],
      /*   main:"#3f51b5", */
      },
        secondary: {
            main:orange[500],
            contrastText:'#fff'
        }
      },
});   
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
        if (loggedin==='true'){ //if user signed In get user Id from locaStorage
          console.log(uid)
       id=uid; 
      //localStorage.removeItem('temp_id');

     }else if(loggedin==='false'){
      id=localStorage.getItem('temp_id');

     }
     }else{

        //if user its first time comer and user has not sign In cretae temp id for the user and set it in localStorage
         id=localStorage.getItem('temp_id');
       
     }
    }
     
     return id;
  }
     const[userid]=useState(createTempUserId());
     const[products,setProducts]=useState([]);
     const[product,setProduct]=useState([]);
     const[cart,setCart]=useState({});
     const[itemsCount,setItemsCount]=useState(0);
     const [errorMessage,setErrorMessage]=useState('');
     const [order,setOrder]=useState({});
     const[myOrders,setMyOrders]=useState([]);
     const[orderCount,setMyOrderCount]=useState(0);
     const[openModal,setOpenModal]=useState(false)
    const paths=['/','/cart','/checkout','/orders','/proceedcheckout','/account']
     let history = useHistory();
     const handleCloseModal = () =>{ 
      setOpenModal(false);
    }
    const handleOnchange =(value) => {
      if(value===0){
        history.push('/')
      }else if (value===1){
        history.push('/cart')
      }else if (value===2){
        if (localStorage.getItem('loggedin')==="true"){
        // history.push('/account') 
         setOpenModal(true)
        }else{
         
        }
        
      }
    }
    const sendConfirmationEmail = (_id,newOrder)=>{
     console.log("id "+_id + "email "+newOrder.customer.email)
      const url = `http://localhost:3001/api/email/confirmorder/${_id}`;

    post(url,{email:newOrder.customer.email,data:newOrder}).then((response)=>{
        console.log(response)
    })
  }

 
  
  const handleEmptyCart = async ()=>{

      emptyCart().then((response)=>{
         if (response.status===200){
           //console.log(response)
           setCart(response.data.cart)
           setItemsCount(response.data.cart.items.length);

         }
      })
  } 
  
  const refreshCart = async ()=>{
    const url=`http://localhost:3001/api/carts/refreshcart/${userid}`
    return axios.patch(url).then((response)=>{
      // eslint-disable-next-line no-cond-assign
      if(response.status=200){
       try{
        setCart(response.data.cart);
        setItemsCount(response.data.cart.items.length);

       }catch(err){
         console.log(err)
       }
      }
    });
  }
  const emptyCart = async () =>{

    const url = `http://localhost:3001/api/carts/${userid}`;
   
 
    return axios.patch(url)
  
  };
  const  handleRemoveFromCart = async (productId)=>{
  
       deleteFromCart(productId).then((response)=>{
         if (response.status===200){
           //console.log(response)
           setCart(response.data.cart)
           setItemsCount(response.data.cart.items.length);

         }
       })
  }
 

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

  const handleupdateColorSize = async (productId,type,value)=>{
  
    updateColorAndSizeSpecs(productId,type,value).then((response)=>{
        if (response.status===200){
         // console.log(response.data.cart.items)
          setCart(response.data.cart)
          setItemsCount(response.data.cart.items.length);

         } 
       })
    
   }
  const updateColorAndSizeSpecs =(productId,type,value)=>{
    
    const url = `http://localhost:3001/api/carts/specs/colorandsize`;
     
 
    return patch(url,  {
      productId:productId,
      type:type,
      value:value,
      userId:userid,
    })
  
  };

  const handleupdateSelection = async (productId,value)=>{
  
    updateSelection(productId,value).then((response)=>{
        if (response.status===200){
            try{
           // console.log(response.data.cart.items)
              setCart(response.data.cart)
              setItemsCount(response.data.cart.items.length);

            }catch(err){
              console.log(err)
            }
         } 
       })
    
   }
  const updateSelection =(productId,value)=>{
    console.log(value)
    const url = `http://localhost:3001/api/carts/item/selection`;
     
 
    return patch(url,  {
      productId:productId,
      selected:value,
      userId:userid,
    })
  
  };
  const handleupdateMeasurement = async (productId,measurement)=>{
  
    updateMeasurement(productId,measurement).then((response)=>{
      console.log(measurement)
        if (response.status===200){
         // console.log(response.data.cart.items)
          setCart(response.data.cart)
          setItemsCount(response.data.cart.items.length);

         } 
       })
    
   }
  const updateMeasurement =(productId,measurement)=>{
    
    const url = `http://localhost:3001/api/carts/specs/measurement`;
     
 
    return patch(url,  {
      productId:productId,
      measurement:measurement,
      userId:userid,
    })
  
  };
  const handleAddtoCart = async (product,quantity)=>{
  /*   sendConfirmationEmail(userid,"abdulrazakneate@gmail.com") */

    addtoCart(product,quantity).then((response) => {
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
        if(items[i].selected){//make order fro only selected items

          await  post(url,  {
            name:items[i].product.name,
            storeId:items[i].product.storeId,
            productId:items[i].product._id,
            orderNumber:shippingData.orderNumber,
            quantity:items[i].quantity,
            color:items[i].color,
            size:items[i].size,
            measurement:items[i].measurement,
            filename:items[i].product.image[0].filename,
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
            city:shippingData.town_city,
            street:shippingData.street,
            homeAddress:shippingData.home_address    
          // eslint-disable-next-line no-loop-func
          },).then(ret=>{
            console.log(ret)
            response= ret;
          })
        }

      }

      return response
  


    
  }
 
  const handleCaptureCheckout =async (checkoutTokenId,newOrder)=>{
   
    try{ 
          incomingOrder(newOrder).then((response)=>{
           console.log(response)
           setMyOrders(response.data.orders)
           setMyOrderCount(response.data.orders.length)
          
         })
          console.log(newOrder)
          setOrder(newOrder);
          sendConfirmationEmail(userid,newOrder)
         // refreshCart();
    }catch(error){
           setErrorMessage(error.data.error.message);
    }
}
  
const handlegetProduct = async (productid)=>{
           
  fetchProduct(productid).then((response) => {
    console.log(response.data);
    if (response.status===200){
       
      try{
        setProduct(response.data.product)
       
      }catch(err){
        console.log(err)
      }
    }
    //addToast(exampleToast(response.data.message));
  })

}




const fetchProduct =(productid)=>{

  const url = `http://localhost:3001/api/products/${productid}`;
  
  return axios.get(url)

};

   useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;

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

  const getOrders =()=>{

    const url = `http://localhost:3001/api/orders/user/${userid}`;
    
    return axios.get(url).then((response)=>{
       try{
         if (response.status===200){
           setMyOrders(response.data.orders)
           setMyOrderCount(response.data.orders.length)
         }

       }catch(err){
          console.log(err)
       }
    })
  
  };
    getProducts();
    handlegetCart();
    getOrders();
   },[userid])
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
       
         <Route exact path={paths}>
         <Topbar totalItems={itemsCount} totalOrders={orderCount}/>
         </Route>
         <RModal openModal={openModal} handleCloseModal={handleCloseModal} ref={ref}/>
       <Switch>   
        
       <Route exact path="/" >   
       <Products products={products} onAddToCart={handleAddtoCart} />
       </Route>
       <Route exact path="/cart">
          <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleupdateColorSize={handleupdateColorSize} handleupdateMeasurement={handleupdateMeasurement} handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart} handleupdateSelection={handleupdateSelection}/>
       </Route>
       <Route exact path="/checkout">
         <CheckOut cart={cart}   order={order}  onCaptureCheckout={handleCaptureCheckout}/>
       </Route>
        <Route exact path="/orders">
        <Orders orders={myOrders}/>
         </Route>
        <Route exact path="/proceedcheckout">
          <ProceedCheckOut onAddToCart={handleAddtoCart}/>
        </Route>
         <Route path="/login">
           <LogIn/>
         </Route>
          <Route path="/signup">
           <SignUp/>
         </Route>
         <Route path="/account">
           <Account/>
         </Route>
         <Route path="/dashboard">
            <Dashboard/>
         </Route>
       </Switch>
       <Route exact path={paths}>
       <BottomNav onBottomNavChange={handleOnchange}/>
         </Route>
     </Box>
     </ThemeProvider>
  );
}

export default App;
