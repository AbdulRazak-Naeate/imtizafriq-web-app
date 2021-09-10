import './productsList.css'
import {DataGrid} from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons';
import {productRows} from '../../dummyData';
import QueryParams from '../../QueryParams';

import { Link } from 'react-router-dom';
import {useState,useEffect} from "react";
import {FormatDate} from '../../../utils/Utils';

export default function ProductsList() {   
   const query=QueryParams();

    const [data,setData]=useState(productRows);
    const [products,setProducts]=useState({});

    const [storeid,setStoreId]=useState(query.get("storeId"));
    const [storename,setStoreName] =useState(query.get("storeName"));
     
    const handleDelete=(id)=>{
        setData(data.filter((item) => item.id !==id))
    }

    useEffect(()=>{   

      const getProducts = async() =>{
      try {
          const data = await fetchProducts();    
           setProducts(convertObject(data));
           console.log(convertObject(data))

      } catch (error) {
        
      }

   }
   //get selected store Porduct
  const fetchProducts = async () =>{
    let query=QueryParams();
   let sid=query.get("storeId");
  let url=`http://localhost:3001/api/products/store/${sid}`;
  const res = await fetch(url)
  const data = await res.json();

// console.log(data);
return data;
}
    getProducts();
},[])  

const convertObject = (responseData) => { //convert response data to Jasvscripts array
  let data = [];

  const convertoDateString=(ms)=>{
    var dateFormat = "Y-m-d H:i:s.v";
    return FormatDate(ms, dateFormat);
  }

  for (let i = 0; i < responseData.length; i++) {
    
    data.push({
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
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Product',
          width: 200,
          renderCell:(params)=>{
              return(
                  <div className="productListItem">
                      <img className="productListImg" src={params.row.image[0]} alt=""/>
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
        },
        {
            field:"action",
            headerName:"Action",
            width:150,
            renderCell: (params)=>{
                return(
                   <>
                    <Link to={`/dashboard/product?productId=${params.row._id}&storeId=${storeid}&storeName=${storename}`}>
                    <span className="productlistEdit link">Edit</span>
                    </Link>
                    <DeleteOutline className="productlistDelete" onClick={() => {handleDelete(params.row._id)}}/>
                   </>
                )
            }
        }
      ];
    return (
        <div className="productsList"> 
 
       <div className="productsTitleContainer">
         <span className="productsTitle">{storename}  </span> 
         <span className="">Products</span>
          </div>
       <DataGrid rows={productRows} columns={columns} pageSize={8} checkboxSelection
        disableSelectionOnClick
      />
        </div>
    )
}
