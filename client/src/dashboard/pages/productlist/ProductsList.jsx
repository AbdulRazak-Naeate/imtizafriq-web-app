import './productsList.css'
import {DataGrid,GridToolbar} from '@material-ui/data-grid';
import { DeleteOutline,EditOutlined } from '@material-ui/icons';
import { Stack } from '@mui/material';
import {Tooltip} from '@material-ui/core';
import QueryParams from '../../QueryParams';
import { Link ,useHistory} from 'react-router-dom';
import React , {useState} from "react";
import AlertDialog from '../../components/alertdialog/AlertDialog'
import { formatWithCurrencySymbol } from "../../../utils/Utils"
export default function ProductsList({products,handleDeleteProduct}) {   
    const query=QueryParams();
    const history=useHistory();
    const [pageSize, setPageSize] =useState(10);
    const [category] =useState(query.get("categoryId"));
     
    //alert Dialog
    const [open,setOpen]=useState(false);
    const [productId,setProductId]=useState('');
    const handleClickOpen = () => {
      setOpen(true);
     };

    const handleClose = (option) => {
      
      setOpen(false);
       if (option===true) {handleDeleteProduct(productId)}
      console.log(option)
    };

    const onDelete=(_id)=>{
       /// setData(data.filter((item) => item.id !==id))
       setProductId(_id)
       handleClickOpen();
      //deleteProduct(_id);
    }

    const handleEdit = (params)=>{
         //navigate to product page
        history.push(`/dashboard/product?productId=${params.row._id}&productName=${params.row.name}`);

        localStorage.setItem('product', JSON.stringify(params.row));        
    }
     
    const columns = [
        { field: '_id', headerName: 'Id', width: 220 },
        {
          field: 'name',
          headerName: 'Product',
          width: 330,
          renderCell:(params)=>{
              return(
                  <div className="productListItem" onClick={()=>{handleEdit(params)}}>
                      <img className="productListImg"  src={`${params.row.image[0].secure_url}`} alt=""/>
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
            {/*   π */}
               <span>{`${formatWithCurrencySymbol(params.row.price,'GHS')}`}</span>
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
                    <DeleteOutline className="productlistDelete" onClick={() => {onDelete(params.row._id)}}/>
                  </Tooltip> 
                  </>
                )
            }
        }
      ];
    return (
        <div className="productsList"> 
            <AlertDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Are you sure you want to delete!"DeleteOutline={DeleteOutline}/>
{/*           <span className="productsTitle"> </span> 
 */}
         <div className="productsTitleContainer">
         <h1 className="addProductTitle">Products </h1>
         
         <Link to={`/dashboard/newProduct?categoryId=${category}`}>
          <button className="AddProductButton">New Product</button>
          </Link> 
         
          </div>
          <div className="" style={{ height: '100vh', width: '100%' }}>
           <DataGrid rows={products} getRowId={(row) => row._id} columns={columns} 
           pageSize={pageSize}
           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 10, 20,50]}
            pagination
           checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar:GridToolbar,
              NoRowsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  No products found ,click on new product to add products
                </Stack>
              ),
              NoResultsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Local filter returns no result
                </Stack>
              )
            }}
            />
            </div>
        </div>
    )
}
