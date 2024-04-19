import React, { useContext } from "react";
import "./CSS/Navbar.css";
import { logo } from "./constants";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { IoPersonCircle } from "react-icons/io5";
import { toast } from "react-toastify";


const Navbar = () => {

    const { isLogIn, setIsLogIn,setIsRegister,isRegister } = useContext(AppContext);
    const navigate = useNavigate();
    
    const clickHandler = () => {
        setIsLogIn(false);
        setIsRegister(false);
        navigate("/");
    }
    
    return (
        <div className="navbar">
            <div className="navbar-inner">
                <div className="left-nav">
                    <img src={logo} alt="e-DemocraticVotingPortal" className="logo"/>
                </div>
                <div className="right-nav">
                    <NavLink to="/" style={({ isActive }) => ({textDecoration: isActive ? 'none' : 'none',
                        color: isActive ? 'black' : 'black',
                        borderBottom: isActive ? '2px solid #673ab7' : 'none'})}>
                        <div className="menu-buttons">Home</div>
                    </NavLink>
                    <NavLink to="/about" style={({ isActive }) => ({textDecoration: isActive ? 'none' : 'none',
                        color: isActive ? 'black' : 'black',
                        borderBottom: isActive ? '2px solid #673ab7' : 'none'})}>
                        <div className="menu-buttons">About</div>
                    </NavLink>
                    {isLogIn ?
                    <NavLink to="/register" style={({ isActive }) => ({
                            textDecoration: isActive ? 'none' : 'none',
                            color: isActive ? 'black' : 'black',
                            borderBottom: isActive ? '2px solid #673ab7' : 'none'
                        })}>
                            <div className="menu-buttons">Register</div>
                    </NavLink>:<div onClick={()=> {toast.error("You have not Login")}} className="menu-buttons">Register</div>}
                    {isRegister ?
                        <NavLink to="/vote" style={({ isActive }) => ({
                            textDecoration: isActive ? 'none' : 'none',
                            color: isActive ? 'black' : 'black',
                            borderBottom: isActive ? '2px solid #673ab7' : 'none'
                        })}>
                            <div className="menu-buttons">Vote</div>
                        </NavLink> : <div onClick={()=> {toast.error("You have not Register")}} className="menu-buttons">Vote</div>}
                    {isLogIn ? (
                        <div onClick={clickHandler}>
                            <NavLink style={({ isActive }) => ({
                            textDecoration: isActive ? 'none' : 'none',
                            color: isActive ? 'black' : 'black',})}>
                                <div className="profile-button"><IoPersonCircle /></div>
                            </NavLink>
                        </div>) :
                        (<NavLink to="/login" style={({ isActive }) => ({
                            textDecoration: isActive ? 'none' : 'none',
                            color: isActive ? 'black' : 'black',})}>
                                <div className="login-button">Login</div>
                        </NavLink>)}
                </div>
            </div>

        </div>
    )

}

export default Navbar;