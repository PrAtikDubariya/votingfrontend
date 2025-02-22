import React from "react";
import "./CSS/Features.css";

const Features = () => {
    
    return (
        <div className="features-main">
            <div className="features">
                <div className="features-inner ethereum">
                    <div className="border-images">
                        <img src={`${process.env.PUBLIC_URL}/images/ethereum-image.png`} width={60} alt="ethereum-img" />
                    </div>
                    <div className="features-para">
                        <p>Ethereum</p>
                        <p>Based</p>
                    </div>
                </div>
                <div></div>
                <div className="features-inner security">
                    <div className="border-images">
                        <img src={`${process.env.PUBLIC_URL}/images/security-image.png`} height={60} alt="security-img" />
                    </div>
                    <div className="features-para">
                        <p>Secured</p>
                    </div>
                </div>
                <div></div>
                <div className="features-inner decentralized">
                    <div className="border-images">
                        <img src={`${process.env.PUBLIC_URL}/images/decentralized-image.png`} height={60} alt="decentralized-img" />
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