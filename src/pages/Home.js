import "./CSS/Home.css"
import Features from "./Features";
import decentralizedImage from "../images/home-image.jpeg";
import { useNavigate } from "react-router-dom";
import VoteStep from "./VoteStep";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Home = () => {

    const navigate = useNavigate();
    const { winners, isResult, setIsResult } = useContext(AppContext);


    const scroll = () => {

        navigate("/about");
    
    }

    // Function to close the result modal
    const clickHandler = () => {
        setIsResult(false);
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
            <VoteStep />
            {isResult && (
                <div className="result-modal">
                    <div className="result-content">
                        <h2>Voting Result is Declared</h2>
                        <p>Winner:</p>
                        <div>{winners.map((winner) => (
                            <div>
                                <p>Name: {winner.firstName} {winner.lastName}</p>
                                <p>Enrollment Number: {winner.enrollmentNumber}</p>
                                <p>Vote : {winner.voteCount}</p>
                            </div>))}
                        </div>
                        <button className="close-button" onClick={clickHandler}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Home;