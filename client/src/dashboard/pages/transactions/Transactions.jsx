import React,  { useRef } from 'react';
import './transactions.css';
import {DataGrid,GridToolbar} from '@material-ui/data-grid';
import { Stack } from '@mui/material';
import {  Edit } from '@material-ui/icons';
import {useState , useEffect} from "react";
import AlertDialog from '../../components/alertdialog/AlertDialog'
import  {patch} from 'axios';
import {TransacModal} from  './modal/TransacModal'
import {CustomerDetailsModal} from './modal/CustomerDetailsModal'
import {PrintBox} from './printbox/PrintBox.jsx';

const Transactions = () => {
 // const query=QueryParams();
  const [transactions,setTransactions]=useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [user]=useState(localStorage.getItem('user'));
  const [selectedRows,setSelectedRows]=useState([]);
  const [selected_Ids,setSelected_Id]=useState([]);
  const [selectionModel,setSelectionModel]=useState([])
  const [status,setStatus]=useState('Approved');
  const [open,setOpen]=useState(false);
  const [openModal,setOpenModal]=useState(false)
  const [openCustomerModal,setOpenCustomerModal]=useState(false)
  const [orderid,setOrderId]=useState('');
  const [tranxData,setTranxData]=useState([]);
  const [transData,setTransData]=useState([]);
  const [istransactionsLoaded,setIstransactionsLoaded]=useState(false);

   // const history=useHistory();
   //const componentRef = useRef();

   /* const handlePrint = ()=>{
    setOpenModal(true);
    setTranxData(selectedRows);
    
   };
  
     const handleHover=()=>{
       return(
         <div>userDetails</div>
       )
     } */
     const handleClickOpen = (row) => {
           setOrderId(row._id);
           switch (row.status) {
             case 'Pending':
              setStatus('Processing') 
               break;
               case 'Processing':
                setStatus('Completed') 
                 break;
             default:
               break;
           }
       row.status!=="Completed" ? setOpen(true):setOpen(false);
       

      };
   /*  const handleOpenTransacModal =(data)=>{
       setOpenModal(true);
       var arr=[];
           arr.push(data)
       setTranxData(arr);
      
    } */
    const handleCloseTransacModal = () =>{ 
      setOpenModal(false);
    }
   const handleCloseCustomerModal=()=>{
     setOpenCustomerModal(false)
   }

    const handlOpenCustomerModal =(row)=>{
      setTransData(row)
      console.log(row)
     setOpenCustomerModal(!openCustomerModal)
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

  
    const fetchTransactions = async () => {//get Transactions 
  
     try {
       
       
    const res = await fetch(`/api/orders`);
    const data = await res.json();
    console.log(data)
    return data.orders;
   
    } catch (error) {
    console.log({fetch_store_message:error})
    }
  }
  
  const getTransactions = async () => {
   
    try {
    const transactionsFromServer = await fetchTransactions();  
     let tmp =[];
     for(let i=0;i<transactionsFromServer.length;i++){
       tmp.push(transactionsFromServer[i]);
       
     }
      setTransactions(tmp)
 
   } catch (error) {
     console.log({message:error})
   }
  };
  if (!istransactionsLoaded) getTransactions() ;
   return ()=>{
     if (transactions.length>0) setIstransactionsLoaded(true)
   }
  });

  /* const getDateNow =(dateNumber)=>{
    var dateString = new Date(parseInt(dateNumber)*1000);
      var newDate= `${dateString.getFullYear()}-${dateString.getMonth()}-${dateString.getDate()} ${dateString.getHours()}:${dateString.getMinutes()}`
      return newDate
   }  */




  const columns = [
    { field: '_id', headerName: 'Id', width: 210,
     renderCell:(params)=>{
        return(
          <div className="valueHilight" onClick={()=>{/* handleOpenTransacModal(params.row) */}}>
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
            <div className="userListUser valueHilight" onClick={()=>{handlOpenCustomerModal(params.row)}}>
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
      {/* <button onClick={()=>{
          var datenow= new Date()
        var futureDate = new Date(datenow.setMonth(datenow.getMonth()+1))
        console.log(futureDate.toISOString())
      }}>future Date</button> */}
        <TransacModal openModal={openModal} handleCloseTransacModal={handleCloseTransacModal} tranxData={tranxData} />
        
        <CustomerDetailsModal openCustomerModal={openCustomerModal} handleCloseCustomerModal={handleCloseCustomerModal} transData={transData}/>
       
       <AlertDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Mark transaction" textContent={`Are you sure you want to mark transaction status as ${status} !`}DeleteOutline={Edit}/>
       <div className="pageTitleContainer">
           <h1 className="pageTitle">Transactions</h1>    
            <div>
           {/*  <Link to={`/dashboard/transactions?`}>
          <button className="pageTitleButton">Reports</button>
          </Link> */}
            </div>
          </div>
      <div className="actionButtonsWrapper">
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Approved");         
      }}>Approve</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Completed")}}>Completed</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Pending")}}>Pending</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Declined")}}>Decline</button>
    {/*  <button className="actionButtons" onClick={()=>{
       setOpenModal(true);
       setTranxData(selectedRows);
       }}>Print List</button>
          */}
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
          Toolbar:GridToolbar,

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
      <div style={{marginBottom:'10%',top:10,border:'0px solid',overflow:'scroll'}}>
      {selectedRows.length > 0 ? <PrintBox style={{display:'none'}} tranxData={selectedRows}/> : ''}
      </div>

    </div>
   
  )
}

export default Transactions

