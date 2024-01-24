import "./CSS/Home.css"
import Features from "./Features";
import decentralizedImage from "../images/home-image.jpeg";
import { useNavigate } from "react-router-dom";
import VoteStep from "./VoteStep";

const Home = () => {

    const navigate = useNavigate();
    
    const scroll = () => {

        // let scroll = document.getElementById("featureScroll");
        // scroll.scrollIntoView();
        navigate("/about");
    
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
                    </div>
                </div>
                <div className="right-side">
                    <img src={decentralizedImage} alt="homepage" />
                </div>
            </div>
            <Features />
            <VoteStep/>
        </div>
    )

}

export default Home;