import React, { useContext, useEffect, useState } from "react";
import "./CSS/Vote.css";
import { logoVotePage } from "./constants";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { MdLabelImportant } from "react-icons/md";
import { toast } from "react-toastify";

const Vote = () => {

    const { isVotingStart,trackStudent,setIsVotingStart,votingDuration, setRemainingTime, } = useContext(AppContext);
    const [candidate, setCandidate] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {

        const fetchVoters = async () => {
            try {
                const response = await axios.post("http://localhost:3001/api/admin/getallcandidate");
                console.log(response.data.candidateData);
                setCandidate(response.data.candidateData);
                setIsVotingStart(isVotingStart);
            } catch (error) {
                console.log(error);
            }
        }
        fetchVoters();
    }, [setIsVotingStart, isVotingStart]);
    
    useEffect(() => {
        // Update remaining time every second if voting is ongoing
        if (isVotingStart && votingDuration) {
            const intervalId = setInterval(() => {
                const now = Date.now();
                const endTime = now + votingDuration * 60 * 1000; // Convert voting duration to milliseconds
                const timeDifference = endTime - now;

                if (timeDifference <= 0) {
                    setRemainingTime("00:00:00"); // If time is up, set remaining time to 00:00:00
                } else {
                    const formattedTime = formatTime(timeDifference);
                    setRemainingTime(formattedTime);
                }
            }, 1000); // Update every second

            return () => clearInterval(intervalId); // Cleanup the interval
        }
    }, [isVotingStart, votingDuration,setRemainingTime]);

    // Function to format time in HH:mm:ss format
    const formatTime = (timeDifference) => {
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
    

    const castVote = async () => {
        console.log("Voter is :", trackStudent);
        console.log("Candidate is :", selectedCandidate);
        setShowConfirmation(false);
        document.body.style.overflow = '';

    }

    const confirmationHandler = () => {
        if (selectedCandidate) {
            setShowConfirmation(true);
            document.body.style.overflow = "hidden";    
        }
        else {
            toast.info("Select Candidate");
        }
        
    }
    
    const handleCandidateChange = (event) => {
        const selectedEnrollmentNumber = event.target.value;
        const selectedCandidate = candidate.find(candidate => candidate.enrollmentNumber === selectedEnrollmentNumber);
        setSelectedCandidate(selectedCandidate);
    };

    return (
        <div>
            <div className="vote-container">
                <div className="vote-background-image-container">
                    <div className="vote-background-image-child-container">
                        <div className="vote-background-image-inner-container">
                            <div className="vote-page-header-text-container">
                                {isVotingStart ? <div className="vote-page-voting-text">Voting is Started</div> :
                                    <div className="vote-page-voting-text">Voting is Not Started Yet</div>}
                                <div>
                                    {/* {votingDuration && <div>
                                        <span>Remaining Time : </span><span>{remainingTime}</span>
                                    </div>} */}
                                    <div>Democracy is about voting and it’s about a majority vote.</div>
                                    <div>And it’s time that we started exercising the Democratic process.</div>
                                </div>
                            </div>
                            <div className="vote-page-logo-container">
                                <img src={logoVotePage} alt="Vote Symbol" />
                            </div>
                            <div className="vote-page-cast-vote-card-container">
                                <div className="vote-page-cast-vote-card-inner-container">
                                    <div className="vote-page-cast-vote-card-inner-left-container">
                                        {selectedCandidate &&
                                            <div className="voters-card-container">
                                                <div className="voters-card-main-container">
                                                    <div className="voters-card-text">CANDIDATE-ID CARD</div>
                                                    <div className="voters-card-basic-info">
                                                        <div>{(selectedCandidate.enrollmentNumber).toUpperCase()}</div>
                                                        <div>{selectedCandidate.firstName} {selectedCandidate.lastName}</div>
                                                    </div>
                                                    <div className="voters-card-other-info">
                                                        <div>Branch : {selectedCandidate.branch}</div>
                                                        <div>Admission Year : {selectedCandidate.admissionYear}</div>
                                                        <div>Gender : {selectedCandidate.gender}</div>
                                                    </div>
                                                </div>
                                            </div>}
                                            {!selectedCandidate &&
                                            <div className="voters-card-container">
                                                <div className="voters-card-main-container">
                                                    <div className="voters-card-text">CANDIDATE-ID CARD</div>
                                                    <div className="voters-card-basic-info">
                                                        <div>ENROLLMENT NUMBER</div>
                                                        <div>NAME</div>
                                                    </div>
                                                    <div className="voters-card-other-info">
                                                        <div>Branch : </div>
                                                        <div>Admission Year :</div>
                                                        <div>Gender : </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        <div className="vote-page-select-candidate-container">
                                            <select onChange={handleCandidateChange}>
                                                <option disabled selected>Select Option</option>
                                                {candidate.map((candidate, index) => (
                                                    <option value={candidate.enrollmentNumber}>{(candidate.enrollmentNumber).toUpperCase()}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="vote-page-cast-vote-card-inner-right-container">
                                        <div className="vote-page-cast-vote-card-inner-right-container-text">
                                            <div className="vote-page-cast-vote-instruction-text">
                                                <div><MdLabelImportant/></div>
                                                <div>Select the candidate from the Dropdown.</div>
                                            </div>
                                            <div className="vote-page-cast-vote-instruction-text">
                                                <div><MdLabelImportant/></div>
                                                <div>Confirm the details of the candidate from the card.</div>
                                            </div>
                                            <div className="vote-page-cast-vote-instruction-text">
                                                <div><MdLabelImportant/></div>
                                                <div>To cast the vote click on the Below CAST VOTE button.</div>
                                            </div>
                                            <div className="vote-page-cast-vote-instruction-text">
                                                <div><MdLabelImportant/></div>
                                                <div>Once the button clicked it can not be undo.</div>
                                            </div>
                                        </div>
                                        <div className="vote-page-cast-vote-button" onClick={confirmationHandler} >Cast Vote</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmation &&
                <div className="cast-vote-popup-main-container">
                    <div className="cast-vote-confirmation-popup">
                        <div>Voter Id :
                            {trackStudent.toUpperCase()}
                        </div>
                        <div>Candidate Id : {selectedCandidate.enrollmentNumber.toUpperCase()}</div>
                        <p>Are you sure you want to cast your vote?</p>
                        <div className="vote-page-confirmation-popup-button">
                            <div onClick={castVote}>Yes</div>
                            <div onClick={() => {
                                setShowConfirmation(false);
                                document.body.style.overflow = '';
                            }}>No</div>
                        </div>
                    </div>
                </div>    
            }
        </div>
    )

}

export default Vote;