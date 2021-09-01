import './productsList.css'
import {DataGrid} from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons';
import {productRows} from '../../dummyData';
import { Link } from 'react-router-dom';
import {useState} from "react";
export default function ProductsList() {
    const [data,setData]=useState(productRows);
    
    const handleDelete=(id)=>{
        setData(data.filter((item) => item.id !==id))
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'product',
          headerName: 'Product',
          width: 200,
          renderCell:(params)=>{
              return(
                  <div className="productListItem">
                      <img className="productListImg" src={params.row.image} alt=""/>
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
          field: 'status',
          headerName: 'Status',
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
                    <Link to={"/dashboard/product/"+params.row.id}>
                    <button className="productlistEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="productlistDelete" onClick={() => {handleDelete(params.row.id)}}/>
                   </>
                )
            }
        }
      ];
    return (
        <div className="productsList"> 
                   <DataGrid rows={data} columns={columns} pageSize={8} checkboxSelection
        disableSelectionOnClick
      />
        </div>
    )
}
