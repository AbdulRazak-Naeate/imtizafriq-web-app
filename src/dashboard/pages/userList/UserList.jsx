import { useState,useEffect } from "react";
import './userList.css'
import {DataGrid} from '@material-ui/data-grid'
import { ContactSupportOutlined, DeleteOutline } from '@material-ui/icons';
import {userRows} from '../../dummyData';
import { Link } from 'react-router-dom';
import {FormatDate} from '../../../utils/Utils';

function UserList(){
    const [data,setData]=useState(userRows);
    const [users,setUsers]=useState([]);

    useEffect(() => {
   //const user = JSON.parse(localStorage.getItem('user'));
 
   const fetchUsers = async () => {//get User Stores 
 
    try {
   const res = await fetch(`http://localhost:3001/api/user/`);
   const data = await res.json();
  
   return data.users;
  
   } catch (error) {
   console.log({fetch_store_message:error})
   }
 }
 
 const getUsers = async () => {
  try {
   const usersFromserver = await fetchUsers();  
    let tmp =[];
    for(let i=0;i<usersFromserver.length;i++){
      tmp.push(usersFromserver[i]);
      
    }
  setUsers(tmp)

  } catch (error) {
    console.log({message:error})
  }
 };
 const convertObject = (responseData) => { //convert response data to Jasvscripts array
  let data = [];

  const convertoDateString=(ms)=>{
    var dateFormat = "Y-m-d H:i:s.v";
    return FormatDate(ms, dateFormat);
  }

  for (let i = 0; i < responseData.length; i++) {
    
    data.push({
       id:i,
       name:responseData[i].name,
       fullname:responseData[i].fullname,
       _id:responseData[i]._id,
       phone:responseData[i].phone,
       email:responseData[i].email,
       location:responseData[i].location,
       avatar:`http://localhost:3001/server/uploads/users/${responseData[i].image[0].filename}`,
       //date:convertoDateString(responseData[i].date),
       status:'active'});
  }
  console.log(data)
  return data;
};
 getUsers()
 },[]);
    const handleDelete=(id)=>{
        setData(data.filter((item) => item.id !==id))
    }
    const columns = [
        { field: '_id', headerName: 'Id', width: 210 },
        {
          field: 'name',
          headerName: 'User',
          width: 200,
          renderCell:(params)=>{
              return(
                  <div className="userListUser">
                      <img className="userListImg" src={`http://localhost:3001/server/uploads/users/${params.row.image[0].filename}`} alt=""/>
                      {params.row.name}
                  </div>
              )
          },
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 220,
          editable: true,
        },
       
        {
            field:"action",
            headerName:"Action",
            width:150,
            renderCell: (params)=>{
                return(
                   <>
                    <Link to={{pathname:`/dashboard/user/_id=${params.row._id}`,search:`user=${JSON.stringify(params.row)}`}}>
                    <span className="userlistEdit link">Edit</span>
                    </Link>
                    <DeleteOutline className="userlistDelete" onClick={() => {handleDelete(params.row._id)}}/>
                   </>
                )
            }
        }
      ];
    
    return (
        <div className="userList">
          <div className="userListTitleContainer">
              <h1 className="userListTitle">User List</h1>
              <Link to="/dashboard/newUser">
              <button className="addNewUserButton">New User</button>
              </Link>
          </div>
          <DataGrid rows={users} getRowId={(row) => row._id} columns={columns} pageSize={8} checkboxSelection
        disableSelectionOnClick
      />
        </div>
    )
}
export default UserList;