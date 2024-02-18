import React from "react";
import "./CSS/VoteStep.css";
import stepRegister from "../images/step-register-image.png";
import stepSignin from "../images/step-signin.png";
import stepVoteDashboard from "../images/step-vote-dashboard.png";
import stepCandidate from "../images/step-candidate.png";

const VoteStep = () => {

    return (
        <div className="vote-step-main-container">
            <div className="vote-step-sub-container">
                <div className="header-vote">
                    Follow Steps to Vote
                </div>
                <div className="steps-container">
                    <div className="inner-steps-container">
                        <div className="step-image-container"><img src={stepRegister} alt="vote-register" height={75}/></div>
                        <div>Register yourself by filling the required informations</div>
                    </div>
                    <div className="inner-steps-container">
                        <div className="step-image-container"><img src={stepSignin} alt="vote-signin" height={75}/></div>
                        <div>Signin as user</div>
                    </div>
                    <div className="inner-steps-container">
                        <div className="step-image-container"><img src={stepVoteDashboard} alt="vote-dashboard" height={75}/></div>
                        <div>Go to vote option on dashboard</div>
                    </div>
                    <div className="inner-steps-container">
                        <div className="step-image-container"><img src={stepCandidate} alt="vote-candidate" height={75}/></div>
                        <div>Vote your candidate and submit</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default VoteStep;