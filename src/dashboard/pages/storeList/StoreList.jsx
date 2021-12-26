import './storeList.css';
import {DataGrid} from '@material-ui/data-grid'
import { DeleteOutline,List, Add, Edit,Business } from '@material-ui/icons';
import { Link ,useHistory} from 'react-router-dom';
import {useState , useEffect} from "react";
import {Tooltip} from '@material-ui/core';
import AlertDialog from '../../components/alertdialog/AlertDialog'
import axios from 'axios';

export default function StoreList() {

    const [stores, setStores] = useState([]);
    const [storeid,setStoreid]=useState(['']);
    const [open,setOpen]=useState(false);
    
    const history=useHistory();

    const handleClickOpen = () => {
      setOpen(true);
     };

    const handleClose = (option) => {
      
      setOpen(false);
       if (option===true) {deleteStore(storeid)}
      console.log(option)
    };
    async function deleteStore(_id) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/stores/${_id}`);
        console.log(response);
        if (response.data.deletedCount>=1){
        setStores(stores.filter((item) => item._id !==_id))

        }
      } catch (error) {
        console.error(error);
      }
    }
  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));

  const fetchStores = async () => {//get User Stores 
   try {
    const res = await fetch(`http://localhost:3001/api/stores/user/${user._id}`);
    const data = await res.json();
    return data.store;
   } catch (error) {
     console.log({fetch_store_message:error})
   }
  }
    const getStores = async () => {
     try {
      const storesFromserver = await fetchStores();
      let tmp =[];
      for(let i=0;i<storesFromserver.length;i++){
        tmp.push(storesFromserver[i]);
        
      }
      setStores(tmp);
      localStorage.setItem('stores',JSON.stringify(tmp));
     } catch (error) {
       console.log({message:error})
     }
    };
   
    getStores();

  },[]);
  const handleNewproduct=(params)=>{
    history.push(`/dashboard/newProduct?storeId=${params.row._id}&storeName=${params.row.name}`);
  }
   const handleEdit = (params)=>{
      //navigate to store page
     history.push(`/dashboard/store?storeId=${params.row._id}&storeName=${params.row.name}`);
     localStorage.setItem('store', JSON.stringify(params.row));        
     }
    const handleList=(params)=>{
   //navigate to store Products
   history.push(`/dashboard/products?storeId=${params.row._id}&storeName=${params.row.name}`);
   localStorage.setItem('store', JSON.stringify(params.row));       
    }
    const handleTransactions=(params)=>{
      //navigate to store Products
      history.push(`/dashboard/transactions?storeId=${params.row._id}&storeName=${params.row.name}`);
      localStorage.setItem('store', JSON.stringify(params.row));       
       }
    const handleDelete=(_id)=>{
      setStoreid(_id);
      handleClickOpen();
    }
    const columns = [
      { field: '_id', headerName: 'Id', width: 120 },

        {
          field: 'name',
          headerName: 'name',
          width: 200,
        
          renderCell:(params)=>{
              return(
                  <div className="storeListItem">
                      <img className="storeListImg"  src={`http://localhost:3001/server/uploads/stores/${params.row.image[0].filename}`} onClick={() => {handleList(params)}}alt=""/>
                      {params.row.name}
                  </div>
              )
          },
          editable: false,
        },
        {
          field: 'phone',
          headerName: 'Phone',
          width: 130,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 220,
          }, {
            field: 'date',
            headerName: 'Date',
            width: 140,
          },
          {
            field: 'validStatus',
            headerName: 'Status',
            width: 120,
            
          },
          {
            field: 'currency',
            headerName: 'Currency',
            width: 140,
          },
        {
            field:"action",
            headerName:"Action",
            width:120,
            renderCell: (params)=>{
                return(
                  <div>
                    <Tooltip title="edit store" enterDelay={500} leaveDelay={200}>
                    <Edit className="iconEditstoreProduct storeListIcons" onClick={() => {handleEdit(params)}}/> 
                    </Tooltip>
                    <Tooltip title="add new product" enterDelay={500} leaveDelay={200}>
                    <Add className="iconAddstoreProduct storeListIcons" onClick={() => {handleNewproduct(params)}}/></Tooltip>
                    <Tooltip title="show store products" enterDelay={500} leaveDelay={200}>
                    <List className="iconListstoreProducts storeListIcons" onClick={() => {handleList(params)}}/>
                    </Tooltip>

                    <Tooltip title="show store transactions" enterDelay={500} leaveDelay={200}>
                    <Business className="iconListstoreProducts storeListIcons" onClick={() => {handleTransactions(params)}}/>
                    </Tooltip>

                    <Tooltip title="delete store" enterDelay={500} leaveDelay={200}>
                    <DeleteOutline className="storelistDelete" onClick={() => {handleDelete(params.row._id)}}/>
                    </Tooltip>
                  </div>
                )
            }
        },
      ];
    return (
        <div className="storesList"> 
           <AlertDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Delete Store" textContent="Are you sure you want to delete!"DeleteOutline={DeleteOutline}/>
            <div className="pageTitleContainer">
              <h1 className="pageTitle">Stores</h1>
            
            
          <Link to={`/dashboard/newStore?`}>
          <button className="pageTitleButton">New Store</button>
          </Link>

          </div>
             {
              stores.length>0 ?  <DataGrid rows={stores} getRowId={(row) => row._id} columns={columns} checkboxSelection
              disableSelectionOnClick
              
            />:<div> 
                <Link to="/dashboard/newStore">
                 <div className="addStoreButton link">Add New Store</div>
                </Link>
            </div>
             }
        </div>
    )
}