/* eslint-disable no-unused-vars */
import React,  { useRef } from 'react';
import './transactions.css';
import {DataGrid} from '@material-ui/data-grid';
import { Stack,Button } from '@mui/material';
import { DeleteOutline,List, Add, Edit,Business } from '@material-ui/icons';
import { Link ,useHistory} from 'react-router-dom';
import {useState , useEffect} from "react";
import AlertDialog from '../../components/alertdialog/AlertDialog'
import axios ,{patch} from 'axios';
import QueryParams from '../../QueryParams';
import TransacModal from  './modal/TransacModal'
import ReactToPrint from 'react-to-print';
const Transactions = () => {
  const query=QueryParams();
  const [transactions,setTransactions]=useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [user]=useState(localStorage.getItem('user'));
  const [stores]=useState(JSON.parse(localStorage.getItem('stores')));
  const [storeid,setStoreId]=useState(query.get('storeId'));
  const [selectedRows,setSelectedRows]=useState([]);
  const [selected_Ids,setSelected_Id]=useState([]);
  const [selectionModel,setSelectionModel]=useState([])
  const [status,setStatus]=useState('Approved');
  const [open,setOpen]=useState(false);
  const [openModal,setOpenModal]=useState(false)
  const [orderid,setOrderId]=useState('');
  const [tranxData,setTranxData]=useState([]);
  
   // const history=useHistory();
     

     const handleHover=()=>{
       return(
         <div>userDetails</div>
       )
     }
     const handleClickOpen = (row) => {
           setOrderId(row._id);
       row.status==="Pending" ? setStatus('Approved') :setStatus('');
       row.status!=="Approved" ? setOpen(true):setOpen(false);
       

      };
    const handleOpenTransacModal =(data)=>{
       setOpenModal(true);
       var arr=[];
           arr.push(data)
       setTranxData(arr);
      
    }
    const handleCloseTransacModal = () =>{ 
      setOpenModal(false);
    }


    const handleClose = (option) => {
      
      setOpen(false);
       if (option===true) {handleUpdate(orderid)}
      //console.log(orderid);
    };
 
  const Span=({id,onClick,type})=>{ 
    /*@param id is the order id 
     *@param onClick is the click event 
     *@param type is the button class type Pending ,Approved Declined
     */
    return <span onClick={onClick} id={"status-span-"+id} className={"transStatusSpan "+type}>{type}</span>
}
  const handleUpdate=(orderid)=>{
     
    editTransaction(orderid).then((response)=>{

      const data=response.data.data;
      setTransactions(data)//set transaction data  with new updated one 
      setSelectionModel([]);
      //console.log(response.data);
      
    });
}

const editTransaction =(orderid)=>{
const url = `http://localhost:3001/api/orders/${orderid}`;
const body={
         status:status,
         storeId:storeid
      
}
const config = {
    headers: {
        'auth-token':
          user.auth_token,
      },
}
return patch(url, body,config)

};


const handleUpdateMany=(option)=>{

  
  editTransactions(option).then((response)=>{            

      if(response.status===200){
       setTransactions(response.data.data);
       setSelectionModel([])
      }                   

  });
}

const editTransactions =(option)=>{
  const ids=JSON.stringify(selected_Ids);
  const url = `http://localhost:3001/api/orders/many/${ids}`;

const body={
       storeId:storeid,
       status:option,
       ids: ids
    
}
const config = {
  headers: {
      'auth-token':
        user.auth_token,
    },
}
return patch(url, body,config)

};
   
  useEffect(() => {  

  
    const fetchOrders = async () => {//get Orders 
  
     try {
       if (storeid===null){
        try{
          setStoreId(stores[0]._id)
        }catch(err){
          console.log(err)
        }

       }
       
    const res = await fetch(`http://localhost:3001/api/orders/${storeid}`);
    const data = await res.json();
    console.log(data)
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
     setStoreId(stores[0]._id);
     console.log({message:error})
   }
  };
  getOrders()
  },[storeid,stores]);
  

  const columns = [
    { field: '_id', headerName: 'Id', width: 210,
     renderCell:(params)=>{
        return(
          <div style={{color:'cadetblue',cursor:'pointer'}} onClick={()=>{handleOpenTransacModal(params.row)}}>
            {`${params.row._id}`}
          </div>
        )
     },
  },
    {
      field:'user',
      headerName:"Customer",
      width:200,
        renderCell:(params)=>{
          return(
            <div className="userListUser">
                {`${params.row.customer.firstname} ${params.row.customer.lastname}`}
            </div>
        )}, 
    },
    {
      field: 'name',
      headerName: 'Product',
      width: 200,
      editable: true,
    },
    
    {
      field:'storeId',
      headerName:"Store Id",
      width:210,
      editable:true
    },
    {
      field:'orderNumber',
      headerName:"OrderNumber",
      width:170,
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
      width:160
    },
    {
      field:'totalPrice',
      headerName:"Total Price",
      width:180
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
      width:120,
      renderCell:(params)=>{
        return(
               <div> <Span id={params.row._id} onClick={()=>handleClickOpen(params.row)} type={`${params.row.status}`}></Span></div>
             )
      }
    },
    {
      field:'date',
      headerName:"Date",
      width:300,
      renderCell:(params)=>{
        return(
            <div>
               {new Date(parseInt(params.row.date)).toUTCString()}
            </div>
        )
      }
    },
   /*  {
        field:"action",
        headerName:"Action",
        width:140,
        renderCell: (params)=>{
            return(
               <>
                <Edit  className="userlistDelete storeListIcons" />

            
                <DeleteOutline className="userlistDelete" onClick={() => {}}/>
               </>
            )
        }
    } */
  ];

  return (
    <div className="transactions">
        <TransacModal openModal={openModal} handleCloseTransacModal={handleCloseTransacModal} tranxData={tranxData}/>
       <AlertDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Mark transaction" textContent={`Are you sure you want to mark transaction status as ${status} !`}DeleteOutline={Edit}/>
       <div className="pageTitleContainer">
           <h1 className="pageTitle">Transactions</h1>    
            <div>
            { stores.length ?  <select  className="select-store" value={storeid} onChange={(e)=>{setStoreId(e.target.value)}}>
                  {stores.map((store,index)=>{
                  return(  <option key={index} value={store._id} className="opt">{store.name}</option>)
                  })}
              </select>:''}
            <Link to={`/dashboard/transactions?`}>
          <button className="pageTitleButton">Reports</button>
          </Link>
            </div>
          </div>
      <div className="actionButtonsWrapper">
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Approved");         
      }}>Approve</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Pending")}}>Pending</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Declined")}}>Decline</button>
     <button className="actionButtons" onClick={()=>{
       setOpenModal(true);
       setTranxData(selectedRows);
       }}>Print List</button>
     </div>
          <DataGrid rows={transactions} getRowId={(row) => row._id}   columns={columns}
           pageSize={pageSize}
           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
           rowsPerPageOptions={[5, 10, 20]}
           pagination
          checkboxSelection
          disableSelectionOnClick
         
          onSelectionModelChange={(newSelection) => {
             setSelectionModel(newSelection)
             setSelected_Id(newSelection);
             console.log(newSelection);
            const selectedIDs = new Set(newSelection);
            const selectedData=transactions.filter((trans)=>
               selectedIDs.has(trans._id)
            );
            console.log(selectedData)
           setSelectedRows(selectedData);
        }}
        selectionModel={selectionModel}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No transactions recorded
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
   
  )
}

export default Transactions

