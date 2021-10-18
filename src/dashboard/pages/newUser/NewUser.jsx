import './newUser.css'
import {Link} from 'react-router-dom'
export default function NewUser() {
    return (
        <div className="newUser">
            <div className="newUserTitleContainer">
            <h1 className="newUserTitle">New User</h1>
            <Link to="/dashboard/users">
              <button className="userAddButton">Users</button>
              </Link>
            </div>
            <form action="" className="newUserForm">
            <div className="newUserItem">
                <label>Username</label>
                <input type="text" placeholder="Abdul Razak"/>
            </div>
            <div className="newUserItem">
                <label>Full Name</label>
                <input type="text" placeholder="Abdul Razak Abubakari"/>
            </div>
            <div className="newUserItem">
                <label>Email</label>
                <input type="email" placeholder="abdulrazakneate@gmail.com"/>
            </div>
            <div className="newUserItem">
                <label>Password</label>
                <input type="password" placeholder="password"/>
            </div>
            <div className="newUserItem">
                <label>Phone</label>
                <input type="text" placeholder="+23354625367"/>
            </div>
            <div className="newUserItem">
                <label>Address</label>
                <input type="address" placeholder="Tamale Northern Region"/>
            </div>
            <div className="newUserItem">
                <label>Gender</label>
               <div className="newUserGender">
               <input type="radio" name="gender" id="male" value="male"/>
                 <label for="male">Male</label>
                <input type="radio" name="gender" id="female" value="female"/>
                 <label for="f
                 emale">Female</label>
               </div>  
            </div>
            <div className="newUserItem">
                <label>Active</label>
               <select name="active" id="active" className="newUserSelect">
               <option value="yes">Yes</option>
               <option value="no">No</option>
               </select>
            </div>
           <div className="newUserItem">
           <button className="newUserButton">Create</button>
           </div>
            </form>
        </div>
    )
}
