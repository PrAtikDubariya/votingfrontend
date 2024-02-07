import React, { useContext } from "react";
import "./CSS/Navbar.css";
import {logo} from "./constants"
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { IoPersonCircle } from "react-icons/io5";


const Navbar = () => {

    const { isLogIn, setIsLogIn } = useContext(AppContext);
    const navigate = useNavigate();
    
    const clickHandler = () => {
        setIsLogIn(false);
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
                    <NavLink to="/vote" style={({ isActive }) => ({textDecoration: isActive ? 'none' : 'none',
                        color: isActive ? 'black' : 'black',
                        borderBottom: isActive ? '2px solid #673ab7' : 'none'})}>
                        <div className="menu-buttons">Vote</div>
                    </NavLink>
                    <NavLink to="/register" style={({ isActive }) => ({textDecoration: isActive ? 'none' : 'none',
                        color: isActive ? 'black' : 'black',
                        borderBottom: isActive ? '2px solid #673ab7' : 'none'})}>
                      
                        <div className="menu-buttons">Register</div>
                   
                    </NavLink>
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