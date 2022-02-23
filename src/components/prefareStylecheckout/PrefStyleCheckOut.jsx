import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { randNumber } from '../../utils/Utils';

const PrefStyleCheckOut = ({onAddToCart}) => {

  //  const classes=useStyles();
    const [productImages,setProductImages]=useState([]);
    const [loadedImage,setLoadedImages]=useState([]);
    const [productname]= useState("PrefareStyle-"+randNumber(5));
    const[product]=useState({name:productname,price:'150',description:''});
    const[isloaded,setIsloaded]=useState(false);

    const[user]=useState(JSON.parse(localStorage.getItem('user')));
    
    const initiateAndCreateProduct =()=>{
        
        const url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/prefarestyle`;
    
        const formData = new FormData();
       
        formData.append('name', 'name');
        formData.append('price', '150');
        formData.append('category','null');
        formData.append('description', 'null');
        formData.append('specification', 'none');
        formData.append('digital_product_url', 'digitalProductUrl');//
           for (var pair of formData.entries()){
            console.log(pair[0]+ ' '+pair[1]);
           }
        
           
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token':
              user.auth_token,
          },
        }
        return axios.post(url, formData.entries())
      
      };
  
   useEffect(()=>{
       if (!isloaded){
        initiateAndCreateProduct().then((response) => {
            console.log(response.data);
           if (response.data.status===200){
            //window.location.reload();
           }else if (response.data.status===400){ 

            
         // history.go(0);
           }
          });
       }
         return ()=>{
             setIsloaded(true)
         }
    },)
  return (
    <div>
      
    </div>
  )
}

export default PrefStyleCheckOut
