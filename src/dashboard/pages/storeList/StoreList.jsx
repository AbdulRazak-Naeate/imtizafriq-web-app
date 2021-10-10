import './storeList.css';
import {DataGrid} from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {useState , useEffect} from "react";
import {FormatDate} from '../../../utils/Utils';
export default function StoreList() {
    const [stores, setStores] = useState([]);

  
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
      setStores(convertObject(storesFromserver))
     } catch (error) {
       console.log({message:error})
     }
    };
   
    const convertObject = (responseData) => { //convert response data to Jasvscripts array
      const data = [];

      const convertoDateString=(ms)=>{
        var dateFormat = "Y-m-d H:i:s.v";
        return FormatDate(ms, dateFormat);
      }

      for (let i = 0; i < responseData.length; i++) {
        
        data.push({
           id:i,
           name:responseData[i].name,
           _id:responseData[i]._id,
           phone:responseData[i].phone,
           email:responseData[i].email,
           image:`http://localhost:3001/server/uploads/stores/${responseData[i].image[0].filename}`,
           date:convertoDateString(responseData[i].date),
           validStatus:responseData[i].validStatus});
      }
      console.log(data)
      return data;
    };
    getStores();

  },[]);
  
    const handleDelete=(id)=>{
        setStores(stores.filter((item) => item.id !==id))
    }
    const columns = [
     
        {
          field: 'name',
          headerName: 'name',
          width: 200,
        
          renderCell:(params)=>{
              return(
                  <div className="storeListItem">
                      <img className="storeListImg" src={params.row.image} alt=""/>
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
            width:210,
            renderCell: (params)=>{
                return(
                  <div >
                     <Link to={"/dashboard/store/"+params.row._id} className="link">
                    <span className="storelistEdit">Edit</span>
                    </Link>
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
             {
              stores.length>0 ?  <DataGrid rows={stores} columns={columns} pageSize={8} checkboxSelection
              disableSelectionOnClick
              
            />:'...Loading'
             }
        </div>
    )
}