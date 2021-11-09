/* eslint-disable no-unused-vars */
import React from 'react';
import './transactions.css';
import {DataGrid} from '@material-ui/data-grid'
import { DeleteOutline,List, Add, Edit } from '@material-ui/icons';
import { Link ,useHistory} from 'react-router-dom';
import {useState , useEffect} from "react";
import {Tooltip} from '@material-ui/core';
import AlertDialog from '../../components/alertdialog/AlertDialog'
import axios ,{patch} from 'axios';
import QueryParams from '../../QueryParams';

const Transactions = () => {

  const [transactions,setTransactions]=useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [user]=useState(localStorage.getItem('user'));
  const [stores]=useState(JSON.parse(localStorage.getItem('stores')));
  const [storeid,setStoreId]=useState();
  const [selectedRows,setSelectedRows]=useState([]);
  const [selected_Ids,setSelected_Id]=useState([]);
  const [selectionModel,setSelectionModel]=useState()
  const [status,setStatus]=useState('Approved');
  const [open,setOpen]=useState(false);
  const [orderid,setOrderId]=useState('');
  const [updated,setUpdated]=useState(false);

  
   // const history=useHistory();
    
    const handleClickOpen = (row) => {
           setOrderId(row._id);
       row.status==="Pending" ? setStatus('Approved') :setStatus('');
       row.status!=="Approved" ? setOpen(true):setOpen(false);
       

      };

    const handleClose = (option) => {
      
      setOpen(false);
       if (option===true) {handleUpdate(orderid)}
      //console.log(orderid);
    };
    const updateStatusSpanAttr=(orderid,type)=>{//uodate span ui attributes
       let idPrefix=orderid;
       var span=document.getElementById("status-span-"+idPrefix); 
      //console.log(span.className);
          let classname ="transStatusSpan "+type;
          span.innerHTML=type
          span.className =classname;
          
    }
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
       let type=data.status
        if(response.status===200){
          updateStatusSpanAttr(orderid,type)
        }                   
 
    });
}

const editTransaction =(orderid)=>{
const url = `http://localhost:3001/api/orders/${orderid}`;
const body={
         status:status,
      
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
        var type=response.data.statusString
       // console.log(response.data);
        for (var i=0;i<selected_Ids.length;i++){
          updateStatusSpanAttr(selected_Ids[i],type);
        }
        //setSelectionModel([])
      }                   

  });
}

const editTransactions =(option)=>{
  const ids=JSON.stringify(selected_Ids);
  const url = `http://localhost:3001/api/orders/many/${ids}`;

const body={
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
   const getStoreId =()=>{
    let query=QueryParams();
    if ( query.get('storeId')!=='undefined'){//setting store id from store list item show tranx button
      setStoreId(query.get('storeId'));
    }else{//setting store id from user stores first index
      setStoreId(stores[0]._id)
    }
   }
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
  //getStoreId();
  getOrders()
  },[stores]);
  

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
       <AlertDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Mark transaction" textContent={`Are you sure you want to mark transaction status as ${status} !`}DeleteOutline={Edit}/>
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
          onSelectionModelChange={(newSelection) => {
            // setSelectionModel(newSelection)
             setSelected_Id(newSelection);
             console.log(newSelection);
            const selectedIDs = new Set(newSelection);
            const selectedData=transactions.filter((trans)=>
               selectedIDs.has(trans._id)
            );
            
           console.log(selectedData)
           setSelectedRows(selectedData);
        }}
       // selectionModel={selectionModel}
      />
     <div className="actionButtonsContainer">
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Approved")}}>Approve</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Pending")}}>Pending</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Declined")}}>Decline</button>
     </div>
    </div>
  )
}

export default Transactions

