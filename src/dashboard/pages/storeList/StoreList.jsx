import './storeList.css';
import {DataGrid} from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons';
import { Link ,useHistory} from 'react-router-dom';
import {useState , useEffect} from "react";
import {FormatDate} from '../../../utils/Utils';
export default function StoreList() {

    const [stores, setStores] = useState([]);
    const [storename,setStorename]=useState('');
    const [storeid,setStoreid]=useState(['']);

    const history=useHistory();

    const handleEdit = (params)=>{
      //navigate to store page
     history.push(`/dashboard/store?storeId=${params.row._id}&storeName=${params.row.name}`);
     localStorage.setItem('store', JSON.stringify(params.row));        
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
      setStores(tmp)
     } catch (error) {
       console.log({message:error})
     }
    };
   
    getStores();

  },[]);
  
    const handleDelete=(id)=>{
        setStores(stores.filter((item) => item.id !==id))
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
                      <img className="storeListImg" src={`http://localhost:3001/server/uploads/stores/${params.row.image[0].filename}`} alt=""/>
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
            field:"action",
            headerName:"Action",
            width:230,
            renderCell: (params)=>{
                return(
                  <div>
                    <span className="storelistEdit" onClick={()=>{handleEdit(params)}}>Update</span>
                  
                    <Link to={"/dashboard/newProduct?storeId="+params.row._id+"&storeName="+params.row.name} className="link"> 
                    <span className="storelistAddProduct">Add Product</span>
                    </Link>
                    <DeleteOutline className="storelistDelete" onClick={() => {handleDelete(params.row._id)}}/>
                  </div>
                )
            }
        },
      ];
    return (
        <div className="storesList"> 
               <div className="pageTitleContainer">
              <h1 className="pageTitle">Stores</h1>
            
            
          <Link to={`/dashboard/newStore?`}>
          <button className="pageTitleButton">New Store</button>
          </Link>

          </div>
             {
              stores.length>0 ?  <DataGrid rows={stores} getRowId={(row) => row._id} columns={columns} pageSize={8} checkboxSelection
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