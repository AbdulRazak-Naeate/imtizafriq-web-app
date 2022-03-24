import React , { useState,useEffect } from "react";
import './userList.css'
import {DataGrid,GridToolbar} from '@material-ui/data-grid'
import { Stack } from '@mui/material';

import { DeleteOutline, Edit } from '@material-ui/icons';
import {userRows} from '../../dummyData';
import { Link} from 'react-router-dom';

function UserList(){
    const [data,setData]=useState(userRows);
    const [users,setUsers]=useState([]);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
 
   const fetchUsers = async () => {//get User Stores 
 
    try {
   const res = await fetch(`/api/user/`);
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
                      <img className="userListImg" src={`${params.row.image.secure_url}`} alt=""/>
                      {params.row.username}
                  </div>
              )
          },
          editable: true,
        },
        {
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
        },
       
        {
            field:"action",
            headerName:"Action",
            width:150,
            renderCell: (params)=>{
                return(
                   <>

                    <Link to={{pathname:`/dashboard/user/_id=${params.row._id}`,search:`user=${JSON.stringify(params.row)}`}}>
                    <Edit className=" storeListIcons" />

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
          <DataGrid rows={users} getRowId={(row) => row._id} columns={columns}
           pageSize={pageSize}
           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
           rowsPerPageOptions={[5, 10, 20]}
           pagination
           checkboxSelection
           disableSelectionOnClick
           components={{Toolbar:GridToolbar,
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No user found ,click on new user to add users
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
export default UserList;