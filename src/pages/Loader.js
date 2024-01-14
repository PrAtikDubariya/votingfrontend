import React from "react";
import "./CSS/Loader.css";

const Loader = () => {
    return (
        <div className="main-container">
            <div className="spinner"></div>
            <div className="message-color"><h1>{"<>"}Loading...{"</>"}</h1></div>
        </div>
    )
}

export default Loader;