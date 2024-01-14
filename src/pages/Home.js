import "./CSS/Home.css"
import Features from "./Features";
import decentralizedImage from "../images/home-image.jpeg";
import Feature from "./Feature";
import { useContext } from 'react';
import { AppContext } from "../context/AppContext";

const Home = () => {

    const { isConnected,connectToMetamask } = useContext(AppContext);
    
    const scroll = () => {

        let scroll = document.getElementById("featureScroll");
        scroll.scrollIntoView();
    
    }

    return (
        <div>
            <div className="main-home">
                <div className="left-side">
                    <div className="welcome-message"> 
                        <h1 className="heading-message">Welcome to</h1>
                        <h1 className="heading-message voting-portal">Voting Portal</h1>
                    </div>
                    <div className="para-message">
                        <p>This is BlockChain based voting system</p>
                        <p>which provides secure and transparent voting</p>
                    </div>
                    <div className="home-buttons">
                        <div className="read-button" onClick={scroll}>Read More...</div>
                        {!isConnected ? (<div className="read-button" onClick={connectToMetamask}>MetaMask</div>)
                        :(<div className="read-button">Connected</div>)}
                    </div>
                </div>
                <div className="right-side">
                    <img src={decentralizedImage} alt="homepage" />
                </div>
            </div>
            <Features />
            <div id="featureScroll"><Feature/></div>
        </div>
    )

}

export default Home;