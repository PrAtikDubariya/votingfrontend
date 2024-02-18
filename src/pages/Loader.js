import React from "react";
import "./CSS/Loader.css";

const Loader = () => {
    return (
        <div className="loader-main-container">
            <div className="spinner"></div>
            <div className="message-color"><h3>{"<>"}Loading...{"</>"}</h3></div>
        </div>
    )
}

export default Loader;