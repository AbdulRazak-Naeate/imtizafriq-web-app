import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import './user.css'
import {Link} from 'react-router-dom';
export default function User() {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
              <Link to="/dashboard/newUser">
              <button className="userAddButton">Create</button>
              </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?cs=srgb&dl=pexels-cottonbro-4620866.jpg&fm=jpg" alt="" className="userShowImg" />
                       <div className="userShowTopTitle">
                           <span className="userShowUsername">Mardia Abubakari</span>
                           <span className="userShowUserTitle">Marketer</span>
                       </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                             <PermIdentity className="userShowIcon"/>
                        <span className="userShowInfoTitle">mardiaabu33</span>
                        </div>
                        <div className="userShowInfo">
                             <CalendarToday className="userShowIcon"/>
                        <span className="userShowInfoTitle">12.43.1996</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                             <PhoneAndroid className="userShowIcon"/>
                        <span className="userShowInfoTitle">+23358473829</span>
                        </div>
                        <div className="userShowInfo">
                             <MailOutline className="userShowIcon"/>
                        <span className="userShowInfoTitle">mardiaabu33@gmail.com</span>
                        </div>
                        <div className="userShowInfo">
                             <LocationSearching className="userShowIcon"/>
                        <span className="userShowInfoTitle">Tamale ,Northern Region</span>
                        </div>
                       </div>
                </div>
                <div className="userUpdate"> 
                    <span className="userUpdateTitle">Edit</span>
                    <form  className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>UserName</label>
                            <input type="text" placeholder="mardiaabu33" className="userUpdateInput"/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Full Name</label>
                            <input type="text" placeholder="Mardia Abubakari" className="userUpdateInput"/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input type="text" placeholder="mardiaabu33@gmail.com" className="userUpdateInput"/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" placeholder="+23358473829" className="userUpdateInput"/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Location</label>
                            <input type="text" placeholder="Tamale ,Northern Region" className="userUpdateInput"/>
                        </div>

                        </div> 
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src="https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?cs=srgb&dl=pexels-cottonbro-4620866.jpg&fm=jpg" alt="" className="userUpdateImg" />
                            <label htmlFor="file"> <Publish className="userUpdateIcon"/> </label>
                                <input type="file" id="file" style={{display:"none"}}/>
                       </div>
                       <button className="userUpDateButton">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
