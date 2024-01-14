import React from "react";
import "./CSS/Features.css";
import securityImage from "../images/security-image.png";
import ethereumImage from "../images/ethereum-image.png";
import decentralizedImage from "../images/decentralized-image.png";

const Features = () => {
    
    return (
        <div className="features-main">
            <div className="features">
                <div className="features-inner ethereum">
                    <div className="border-images">
                        <img src={ethereumImage} width={60} alt="ethereum-img" />
                    </div>
                    <div className="features-para">
                        <p>Ethereum</p>
                        <p>Based</p>
                    </div>
                </div>
                <div></div>
                <div className="features-inner security">
                    <div className="border-images">
                        <img src={securityImage} height={60} alt="security-img" />
                    </div>
                    <div className="features-para">
                        <p>Secured</p>
                    </div>
                </div>
                <div></div>
                <div className="features-inner decentralized">
                    <div className="border-images">
                        <img src={decentralizedImage} height={60} alt="decentralized-img" />
                    </div>
                    <div className="features-para">
                        <p>Decentralized</p>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )

}

export default Features