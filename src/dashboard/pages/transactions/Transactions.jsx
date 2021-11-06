import React from 'react';
import './transactions.css';
import {DataGrid} from '@material-ui/data-grid'
import { DeleteOutline,List, Add, Edit } from '@material-ui/icons';
import { Link ,useHistory} from 'react-router-dom';
import {useState , useEffect} from "react";
import {Tooltip} from '@material-ui/core';
import AlertDialog from '../../components/alertdialog/AlertDialog'
import axios from 'axios';
const Transactions = () => {

  const [transactions,setTransactions]=useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [user]=useState(localStorage.getItem('user'));
  const [stores]=useState(localStorage.getItem('stores'));
  const [selectedRows,setSelectedRows]=useState([]);
  useEffect(() => {
 
    const fetchOrders = async () => {//get Orders 
  
     try {
    const res = await fetch(`http://localhost:3001/api/orders/`);
    const data = await res.json();
   
    return data.orders;
   
    } catch (error) {
    console.log({fetch_store_message:error})
    }
  }
  
  const getOrders = async () => {
 
    try {
    const ordersFromServer = await fetchOrders();  
     let tmp =[];
     for(let i=0;i<ordersFromServer.length;i++){
       tmp.push(ordersFromServer[i]);
       
     }
      setTransactions(tmp)
 
   } catch (error) {
     console.log({message:error})
   }
  };
  
  getOrders()
  },[]);
  

  const columns = [
    { field: '_id', headerName: 'Id', width: 210 },
    {
      field: 'name',
      headerName: 'Product',
      width: 200,
     /*  renderCell:(params)=>{
          return(
              <div className="userListUser">
                  <img className="userListImg" src={`http://localhost:3001/server/uploads/users/${params.row.image[0].filename}`} alt=""/>
                  {params.row.username}
              </div>
          )
      }, */
      editable: true,
    },
    {
      field:'storeId',
      headerName:"Store Id",
      width:210,
      editable:true
    },
    {
      field:'productId',
      headerName:"Product Id",
      width:210,
    },
    {
      field:'quantity',
      headerName:"Quantity",
      width:130
    },
    {
      field:'color',
      headerName:"Color",
      width:120
    },
    {
      field:'size',
      headerName:"Size",
      width:120
    },
    {
      field:'priceEach',
      headerName:"Price Each",
      width:140
    },
    {
      field:'totalPrice',
      headerName:"Total Price",
      width:140
    },
  /*   {
      field: 'fullname',
      headerName: 'Full Name',
      width: 220,
      editable: true,
      renderCell:(params)=>{
         return(
          <div>{`${params.row.firstname} ${params.row.lastname}`}</div>
         )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      editable: true,
    }, */
    {
      field:"status",
      headerName:"Status",
      width:120
    },
    {
        field:"action",
        headerName:"Action",
        width:140,
        renderCell: (params)=>{
            return(
               <>

                <Link to={{pathname:`/dashboard/user/_id=${params.row._id}`,search:`user=${JSON.stringify(params.row)}`}}>
                <Edit className="userlistDelete storeListIcons" />

                </Link>
                <DeleteOutline className="userlistDelete" onClick={() => {}}/>
               </>
            )
        }
    }
  ];

  return (
    <div className="transactions">
       <div className="pageTitleContainer">
           <h1 className="pageTitle">Transactions</h1>    
            <div>
              <select className="select-store">

              </select>
            <Link to={`/dashboard/newStore?`}>
          <button className="pageTitleButton">Reports</button>
          </Link>
            </div>
          </div>
          <DataGrid rows={transactions} getRowId={(row) => row._id}   columns={columns}
           pageSize={pageSize}
           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
           rowsPerPageOptions={[5, 10, 20]}
           pagination
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedData=transactions.filter((trans)=>
               selectedIDs.has(trans._id)
            );
            console.log(selectedData)
        }}
      />
    </div>
  )
}

export default Transactions

