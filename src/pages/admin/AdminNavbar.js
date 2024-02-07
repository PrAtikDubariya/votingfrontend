import React, { useContext, useEffect, useState } from "react";
import "./CSS/AdminNavbar.css";
import { logo } from "../constants";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdLabelImportant } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {

    const navigate = useNavigate();
    const { setIsLogIn, setIsAdminLogIn, searchInput, setSearchInput } = useContext(AppContext);

    const [notificaitonIcon, setNotificationIcon] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [notificationDropDown, setNotificationDropDown] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [search, setSearch] = useState("");

    const handleLogOut = () => {
        setIsLogIn(false);
        setIsAdminLogIn(false);
        navigate("/login");
    }

    const addNotification = (message) => {
        const messages = Array.isArray(message) ? message : [message];
        let latestNotifications = [...notifications, ...messages];
        if (latestNotifications.length >= 5) {
            latestNotifications = latestNotifications.slice(-5);    
        }

        setNotifications(latestNotifications);
    };

    const getData = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/login/getalldata");
            addNotification(response.data.signUpData);    
            setNotificationIcon(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getSingleVoterData = () => {
        console.log(search);
        setSearchInput(search);
        console.log(searchInput);
    }

    useEffect(() => {
        getData();
    }, []);

    const toggleLogOutDropDown = () => {
        setShowDropDown((prev) => !prev);
    }

    const toggleNotificationDropDown = () => {
        setNotificationDropDown((prev) => !prev);
        setNotificationIcon(true);
    }

    const toggleNotificationDropDownLeave = () => {
        setNotificationDropDown((prev) => !prev);
        setNotificationIcon(false);
    }

    return (
        <div>
            <div className="admin-nav-container">
                <div className="admin-nav-logo-container"><img src={logo} alt="logo" height={50} /></div>
                <div className="admin-nav-search-container">
                    <div className="admin-nav-search-input">
                        <input
                            name="enrollmentNumber"
                            placeholder="Enter Enrollment" 
                            onChange={(event)=> setSearch(event.target.value)}
                            /></div>
                    <div className="admin-nav-search-icon">{<FaSearch
                        onClick={getSingleVoterData}
                    />}</div>
                </div>
                <div className="admin-nav-right-container">
                    <NavLink to="/admin/voters" style={({ isActive }) => ({textDecoration: isActive ? 'none' : 'none',
                        color: isActive ? 'black' : 'black',
                        borderBottom: isActive ? '2px solid #673ab7' : 'none'})}>
                        <div className="admin-portal-pages admin-nav-voters">Voters</div>
                    </NavLink>
                    <NavLink to="/admin/candidates" style={({ isActive }) => ({textDecoration: isActive ? 'none' : 'none',
                        color: isActive ? 'black' : 'black',
                        borderBottom: isActive ? '2px solid #673ab7' : 'none'})}>
                        <div className="admin-portal-pages admin-nav-candidates">Candidates</div>
                    </NavLink>
                    <div className="admin-nav-notification"
                        onMouseEnter={toggleNotificationDropDown} onMouseLeave={toggleNotificationDropDownLeave} >
                        <div className="admin-notificaiton-icon">{notificaitonIcon ? (<MdOutlineNotificationsActive />)
                            :(<IoMdNotificationsOutline />)}
                        </div>
                        {notificationDropDown && 
                        <div className="admin-nav-notification-dropdown">
                            <div className="admin-notification-dropdown-text">Recent Signup Students</div>
                                {notifications.slice().reverse().map((notification, index) => (
                                    <div className="admin-signed-student-card">
                                        <div className="admin-signed-student-arrow"><MdLabelImportant /></div>
                                        <div>
                                            <div className="admin-nav-card-detail">
                                                <div key={index}>{notification.enrollmentNumber}</div>
                                                <div >{notification.firstName} {notification.lastName}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        }
                    </div>
                    <div className="admin-nav-profile-button" onClick={handleLogOut} onMouseEnter={toggleLogOutDropDown} onMouseLeave={toggleLogOutDropDown}>
                        <IoPersonCircle />
                        {showDropDown &&
                            <div className="admin-nav-logout-dropdown">
                                <div>Log Out</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AdminNavbar;