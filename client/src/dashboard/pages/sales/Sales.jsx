import React from 'react';
import './sales.css';
import {DataGrid,GridToolbar} from '@material-ui/data-grid';
import { Stack } from '@mui/material';
import {  Edit } from '@material-ui/icons';
import {useState , useEffect} from "react";
import AlertDialog from '../../components/alertdialog/AlertDialog'
import {patch} from 'axios';

const Sales = () => {
  const [transactions,setTransactions]=useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [user]=useState(localStorage.getItem('user'));
 // const [stores]=useState(JSON.parse(localStorage.getItem('stores')));

  const [setSelectedRows]=useState([]);
  const [selected_Ids,setSelected_Id]=useState([]);
  const [selectionModel,setSelectionModel]=useState([])
  const [status,setStatus]=useState('Approved');
  const [open,setOpen]=useState(false);
  const [orderid,setOrderId]=useState('');
  const [isTransactionLoaded,setIsTransactionLoaded]=useState(false)
   // const history=useHistory();
     

 
    const handleClickOpen = (row) => {
           setOrderId(row._id);
     /*   row.status==="Pending" ? setStatus('Approved') :setStatus('');
       row.status!=="Approved" ? setOpen(true):setOpen(false);
        */

      };

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
const url = `/api/orders/${orderid}`;
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
       setTransactions(response.data.data);
       setSelectionModel([])
      }                   

  });
}

const editTransactions =(option)=>{
  const ids=JSON.stringify(selected_Ids);
  const url = `/api/orders/many/${ids}`;

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
   

    const fetchOrders = async () => {//get Orders 
  
     try {
     
       
    const res = await fetch(`/api/orders/completed`);
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
  if (!isTransactionLoaded) getOrders() 
   return  () =>{
       if(transactions.length>0){
         setIsTransactionLoaded(true)
       }
   }
  });
  

  const columns = [
    { field: '_id', headerName: 'Id', width: 210 },
    {
      field: 'name',
      headerName: 'Product',
      width: 200,
     /*  renderCell:(params)=>{
          return(
              <div className="userListUser">
                  <img className="userListImg" src={`/server/uploads/users/${params.row.image[0].filename}`} alt=""/>
                  {params.row.username}
              </div>
          )
      }, */
      editable: true,
    },
    {
      field:'orderNumber',
      headerName:"OrderNumber",
      width:170,
    },
   /*  {
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
    }, */
    {
      field:'totalPrice',
      headerName:"Amount",
      width:140,
      renderCell:(params)=>{
          return(<div>{`${params.row.totalPrice}`}</div>)
      }
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
               {new Date(params.row.date).toUTCString()}
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
           <h1 className="pageTitle">Sales</h1>    
            <div>
           
           {/*  <Link to={`/dashboard/sales?`}>
          <button className="pageTitleButton">Reports</button>
          </Link> */}
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
             setSelectionModel(newSelection)
             setSelected_Id(newSelection);
             console.log(newSelection);
            const selectedIDs = new Set(newSelection);
            const selectedData=transactions.filter((trans)=>
               selectedIDs.has(trans._id)
            );
            
          try{
            console.log(selectedData)
            setSelectedRows(selectedData);
          }catch(err){
            console.log(err)
          }
        }}
        selectionModel={selectionModel}
        components={{
          Toolbar:GridToolbar,
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No sales recorded
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Local filter returns no result
            </Stack>
          )
        }}
      />
  {/*    <div className="actionButtonsContainer">
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Approved");         
}}>Approve</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Pending")}}>Pending</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Declined")}}>Decline</button>
     </div> */}
    </div>
  )
}

export default Sales

