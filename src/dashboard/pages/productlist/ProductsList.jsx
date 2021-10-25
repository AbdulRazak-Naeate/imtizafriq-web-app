import './productsList.css'
import {DataGrid} from '@material-ui/data-grid';
import { DeleteOutline,EditOutlined } from '@material-ui/icons';
import QueryParams from '../../QueryParams';
import { Link ,useHistory} from 'react-router-dom';
import {useState,useEffect} from "react";
import {FormatDate} from '../../../utils/Utils';
import AlertDailog from '../../components/alertdialog/AlertDialog'
import axios from 'axios';

export default function ProductsList() {   
    const query=QueryParams();
    const history=useHistory();
    const [products,setProducts]=useState([]);

    const [storeid,setStoreId]=useState(query.get("storeId"));
    const [storename,setStoreName] =useState(query.get("storeName"));
     
    //alert Dialog
    const [open,setOpen]=useState(false);
    const [action,setAction]=useState(false);
    const [productId,setProductId]=useState('');
    const handleClickOpen = () => {
      setOpen(true);
     };

    const handleClose = (option) => {
      
      setOpen(false);
       if (option===true) {deleteProduct(productId)}
      console.log(option)
    };

    const handleDelete=(_id)=>{
       /// setData(data.filter((item) => item.id !==id))
       setProductId(_id)
       handleClickOpen();
      //deleteProduct(_id);
    }

    const handleEdit = (params)=>{
         //navigate to product page
        history.push(`/dashboard/product?productId=${params.row._id}&productName=${params.row.name}&storeId=${storeid}&storeName=${storename}`);

        localStorage.setItem('product', JSON.stringify(params.row));        
    }
      useEffect(()=>{

        const fetchProducts = async ()=>{
              try{
                 const res = await fetch(`http://localhost:3001/api/products/store/${storeid}`);
                 const data=await res.json();
                       console.log(data);
                       return data.products;
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
      },[]);
       
      async function deleteProduct(_id) {
        try {
          const response = await axios.delete(`http://localhost:3001/api/products/${_id}`);
          console.log(response);
          if (response.data.deletedCount>=1){
          setProducts(products.filter((item) => item._id !==_id))

          }
        } catch (error) {
          console.error(error);
        }
      }

      const convertObject = (responseData) => { //convert response data to Jasvscripts array
        let data = [];
      
        const convertoDateString=(ms)=>{
          var dateFormat = "Y-m-d H:i:s.v";
          return FormatDate(ms, dateFormat);
        }
      
        for (let i = 0; i < responseData.length; i++) {
          
          data.push({
             id:i,
             name:responseData[i].name,
             _id:responseData[i]._id,
             stock:responseData[i].stock,
             active:responseData[i].active,
             image:`http://localhost:3001/server/uploads/products/${responseData[i].image[0].filename}`,
             price:"$"+responseData[i].price});
        }
        console.log(data)
        return data;
      };

 

    const columns = [
        { field: '_id', headerName: 'Id', width: 120 },
        {
          field: 'name',
          headerName: 'Product',
          width: 200,
          renderCell:(params)=>{
              return(
                  <div className="productListItem">
                      <img className="productListImg" src={`http://localhost:3001/server/uploads/products/${params.row.image[0].filename}`} alt=""/>
                      {params.row.name}
                  </div>
              )
          },
          editable: true,
        },
        {
          field: 'stock',
          headerName: 'Stock',
          width: 220,
          editable: true,
        },
        {
          field: 'active',
          headerName: 'Active',
          width: 120,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Price',
          width: 220,
          renderCell:(params)=>{
            return(
              <>
               <span>{`π${params.row.price}`}</span>
              </>
            )
          }
        },
        {
            field:"action",
            headerName:"Action",
            width:150,
            renderCell: (params)=>{
                return(
                   <>
                 
                    <EditOutlined className="productlistEditIcon" onClick={()=>{handleEdit(params)}}>Edit</EditOutlined>
                  
                    <DeleteOutline className="productlistDelete" onClick={() => {handleDelete(params.row._id)}}/>
                   </>
                )
            }
        }
      ];
    return (
        <div className="productsList"> 
            <AlertDailog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Are you sure you want to delete!"DeleteOutline={DeleteOutline}/>
          <span className="productsTitle">{storename}  </span> 

         <div className="productsTitleContainer">
         <h1 className="addProductTitle">Products </h1>

         <Link to={`/dashboard/newProduct?storeId=${storeid}&storeName=${storename}`}>
          <button className="AddProductButton">New Product</button>
          </Link> 
         
          </div>
       <DataGrid rows={products} getRowId={(row) => row._id} columns={columns} 
       pageSize={5}
       checkboxSelection
       disableSelectionOnClick/>
        </div>
    )
}
