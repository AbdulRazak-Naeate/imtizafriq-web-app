import './productsList.css'
import {DataGrid} from '@material-ui/data-grid';
import { DeleteOutline,EditOutlined } from '@material-ui/icons';
import {Tooltip} from '@material-ui/core';
import QueryParams from '../../QueryParams';
import { Link ,useHistory} from 'react-router-dom';
import {useState,useEffect} from "react";
import AlertDialog from '../../components/alertdialog/AlertDialog'
import axios from 'axios';
import { RestaurantRounded } from '@mui/icons-material';

export default function ProductsList() {   
    const query=QueryParams();
    const history=useHistory();
    const [products,setProducts]=useState([]);
    const [pageSize, setPageSize] =useState(5);

    const [storeid]=useState(query.get("storeId"));
    const [storename] =useState(query.get("storeName"));
     
    //alert Dialog
    const [open,setOpen]=useState(false);
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
      },[storeid]);
       
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

      
 

    const columns = [
        { field: '_id', headerName: 'Id', width: 220 },
        {
          field: 'name',
          headerName: 'Product',
          width: 330,
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
          width: 120,
          editable: true,
          renderCell:(params)=>{
            return(
              <div>{params.row.stock.currentstock}</div>
            )
          }
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
          width: 110,
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
            width:120,
            renderCell: (params)=>{
                return(
                   <>
                    <Tooltip title="edit product"  enterDelay={500} leaveDelay={200}>
                    <EditOutlined className="productlistEditIcon" onClick={()=>{handleEdit(params)}}>Edit</EditOutlined>
                  </Tooltip>
                  <Tooltip title="delete product" enterDelay={500} leaveDelay={200}>
                    <DeleteOutline className="productlistDelete" onClick={() => {handleDelete(params.row._id)}}/>
                  </Tooltip> 
                  </>
                )
            }
        }
      ];
    return (
        <div className="productsList"> 
            <AlertDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Are you sure you want to delete!"DeleteOutline={DeleteOutline}/>
          <span className="productsTitle">{storename}  </span> 

         <div className="productsTitleContainer">
         <h1 className="addProductTitle">Products </h1>

         <Link to={`/dashboard/newProduct?storeId=${storeid}&storeName=${storename}`}>
          <button className="AddProductButton">New Product</button>
          </Link> 
         
          </div>
          <div className="" style={{ height: 400, width: '100%' }}>
           <DataGrid rows={products} getRowId={(row) => row._id} columns={columns} 
           pageSize={pageSize}
           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20,50]}
            pagination
           checkboxSelection
            disableSelectionOnClick />
            </div>
        </div>
    )
}
