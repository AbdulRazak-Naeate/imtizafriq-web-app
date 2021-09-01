import React from 'react'
import "./topbar.css"
import {NotificationsNone,  Language,Settings} from '@material-ui/icons'
export const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">AbdulRazak Admin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIonContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIonContainer">
                        <Language/>
                        <span className="topIconBadge">2</span>
                    </div> 
                    <div className="topbarIonContainer">
                        <Settings/>
                    </div>
                    <img src="https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?cs=srgb&dl=pexels-cottonbro-4620866.jpg&fm=jpg" alt="" className="topAvatar" />
                </div>

            </div>
        </div>
    )
}
