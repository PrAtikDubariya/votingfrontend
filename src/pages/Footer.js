import React, { useState } from "react";
import "./CSS/Footer.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {

    const [feedback, setFeedback] = useState({
        feedback: "",
        email: "",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFeedback(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        if (feedback.feedback !== "" && feedback.email !== "") {
            if (feedback.email.includes("@gmail.com") || feedback.email.includes("@ldrp.ac.in")){
                toast.success("thank you for feedback");    
                console.log(feedback);
            }
            else {
                toast.error("Email is not valid");   
            }
        }
        else {
            toast.error("All field required");
        }
        event.preventDefault();
    }
    
    return (
        <div>
            <div className="footer-main-container">
                <div className="footer-contactus-container">
                    <div className="footer-left-container">
                        <div className="footer-contactus-text">
                            Contact Us
                        </div>
                        <div className="footer-phone-email">
                            <div>
                                <div>Phone:</div>
                                <div>+91 9876543210</div>
                            </div>
                            <div>
                                <div>Email:</div>
                                <div>vp.votingportal@gmail.com</div>
                            </div>
                         </div>
                    </div>
                    <div className="footer-form-container">
                        <div className="footer-form-feedback">Feedback</div>
                        <div className="footer-form">
                            <textarea name="feedback" onChange={handleChange} placeholder="feedback..." rows={8} cols={35} />
                            <input type="email" onChange={handleChange} name="email" placeholder="email"/>
                            <div className="footer-submit" onClick={handleSubmit}>Submit</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright-main-container">
                <div className="footer-copyright-container">
                    <div className="copy-right-symbol">
                        ©Voting Portal 
                    </div>
                    <div className="footer-icons">
                        <div><FaXTwitter className="footer-x"/></div>
                        <div><FaYoutube className="footer-utube"/></div>
                        <div><FaInstagram className="footer-instagram"/></div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Footer;