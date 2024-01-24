import React from "react";
import "./CSS/Feature.css";
import { FaRegCircleCheck } from "react-icons/fa6";
import feature1Image from "../images/feature1-image.png";
import feature2Image from "../images/feature2-image.png";

const Feature = () => {
    return (
        <div>
            <div className="feature-container">
                <div className="main-feature">
                    <div className="image-container">
                        <img src={feature1Image} height={450} width={450} alt="fake-img" />
                    </div>
                    <div className="text-container">
                        <div className="feature-header">
                            <h1>
                                Easy User Experience
                            </h1>
                        </div>
                        <div>
                            <div className="feature-para">
                                <span className="check-mark"><FaRegCircleCheck /></span>
                                <div>Easy for users to interact</div></div>
                            <div className="feature-para"><span className="check-mark"><FaRegCircleCheck/></span><div>A straight forward instruction to vote</div></div>
                            <div className="feature-para"><span className="check-mark"><FaRegCircleCheck/></span><div>Register here,Vote anywhere</div></div>
                            <div className="feature-para"><span className="check-mark"><FaRegCircleCheck/></span><div>Quick login and Authentication</div></div>
                            <div className="feature-para"><span className="check-mark"><FaRegCircleCheck/></span><div>Easy Profile Management</div></div>
                        </div>
                    </div>
                </div>
                <div className="main-feature2"><div className="image-container">
                        <img src={feature2Image} height={450} width={450} alt="fake-img" />
                    </div>
                    <div className="text-container">
                        <div className="feature-header">
                            <h1>
                                What makes us different
                            </h1>
                        </div>
                        <div>
                            <div className="feature-para"><span className="check-mark"><FaRegCircleCheck /></span><div>Secure and Transparent Voting</div></div>
                            <div className="feature-para"><span className="check-mark"><FaRegCircleCheck/></span><div>Decentralized Data Management</div></div>
                            <div className="feature-para"><span className="check-mark"><FaRegCircleCheck/></span><div>Step by Step Voting Process Information</div></div>
                            <div className="feature-para"><span className="check-mark"><FaRegCircleCheck/></span><div>Voter's Data Encryption</div></div>
                            <div className="feature-para"><span className="check-mark"><FaRegCircleCheck/></span><div>Verification on Successful Vote</div></div>
                        </div>
                    </div></div>
            </div>
        </div>
    )

}

export default Feature;