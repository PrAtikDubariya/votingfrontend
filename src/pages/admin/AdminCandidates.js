import React, { useContext, useEffect, useState } from "react";
import "./CSS/AdminCandidates.css";
import AdminRegisterCandidate from "./AdminRegisterCandidate";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const AdminCandidates = () => {

    const { remainingTime, setRemainingTime,
        isVotingStart, setIsVotingStart,
        candidate, setCandidate,
        successRegistration, setSuccessRegistration
    } = useContext(AppContext);
    
    // const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
    const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
    const [votingDuration, setVotingDuration] = useState(12 * 60 * 60);

    const statements = [
        'College President',
        'College Union',
        'Branch Representative',
        'Class Representative',
        'Union Memebers',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentStatementIndex((prevIndex) => (prevIndex + 1) % statements.length);
        }, 5000);
    
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log(successRegistration);
        const fetchVoters = async () => {
            const response = await axios.post("http://localhost:3001/api/admin/getallcandidate");
            console.log(response);
            setCandidate(response.data.candidateData);
        }
        if (successRegistration) {
            setSuccessRegistration(false);
        }
        fetchVoters();
    },[setCandidate,successRegistration,setSuccessRegistration]);
    
    const startVotingHandler = () => {
        if (!isVotingStart) {
            setIsVotingStart(true);
            startTimer();
        }
    }

    const endVotingHandler = () => {
        setIsVotingStart(false);
        setRemainingTime("00:00:00");
    };

    const startTimer = () => {
        const endTime = Date.now() + votingDuration * 1000;
        updateRemainingTime(endTime);
    
        const timerInterval = setInterval(() => {
          updateRemainingTime(endTime);
    
          if (Date.now() >= endTime) {
            clearInterval(timerInterval);
            endVotingHandler();
          }
        }, 1000);
    };
    
    const updateRemainingTime = (endTime) => {
        const now = Date.now();
        const timeDifference = new Date(endTime - now);
        const hours = timeDifference.getUTCHours();
        const minutes = timeDifference.getUTCMinutes();
        const seconds = timeDifference.getUTCSeconds();
    
        const formattedTime =
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setRemainingTime(formattedTime);
    };

    const handleDurationChange = (event) => {
        const value = event.target.value;
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
          setVotingDuration(parsedValue * 60);
        }
    };
    
    return (
        <div>
            <div className="admin-candidate-container">
                <div className="admin-candidate-previous-winner-container">
                    <div className="admin-candidate-previous-winner">
                        <h1 className="admin-candidate-header-text">Previous Election Winner</h1>
                        <h1 className="admin-candidate-winner">Winner</h1>
                    </div>
                </div>
                <div className="admin-candidate-register-candidate">
                    <AdminRegisterCandidate />
                    <div className="admin-candidate-start-voting-uppar-container">
                        <div className="admin-candidate-start-voting">
                            {isVotingStart ? <div className="admin-candidate-time-remain"> Time Remain : {remainingTime}</div> :
                                <div className="admin-candidate-time-remain">Time Remain : 00:00:00</div>}
                            <div className="admin-candidate-change-statements-container">
                                <div className="admin-candidate-start-voting-statement">Start Voting For</div>
                                <div className="admin-candidate-change-statements">{statements[currentStatementIndex]}</div>
                            </div>
                            {isVotingStart ? <div className="admin-candidate-start-voting-button">Voting Started</div> :
                            <div>
                                <div>
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="startVoting"
                                    label="Voting Time (in min)"
                                    name="votingTime"
                                    autoComplete="votingTime"
                                    autoFocus
                                    onChange={handleDurationChange}
                                    />
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={startVotingHandler}
                                    >
                                    Start Voting
                                    </Button>
                                </Box>
                                </div>
                            </div>}
                        </div>
                    </div>
                    {candidate.length > 0 ? <div className="admin-candidate-card-main-container">
                    <div className="admin-candidate-card-container">
                        {candidate.slice().reverse().map((candidate, index) => (
                            <div className="voters-card-container">
                                <div className="voters-card-main-container">
                                    <div key={index} className="voters-card-text">CANDIDATE-ID CARD</div>
                                    <div className="voters-card-basic-info">
                                        <div>{(candidate.enrollmentNumber).toUpperCase()}</div>
                                        <div>{candidate.firstName} {candidate.lastName}</div>
                                    </div>
                                    <div className="voters-card-other-info">
                                        <div>Branch : {candidate.branch}</div>
                                        <div>Admission Year : {candidate.admissionYear}</div>
                                        <div>Last Year : {candidate.admissionYear + 4}</div>
                                        <div>Gender : {candidate.gender}</div>
                                        <div>Email : {candidate.email}</div>
                                        <div>Vote : {candidate.voteCount}</div>
                                    </div>
                                </div>
                            </div>))}
                        </div>
                    </div>:
                    <div />}
                </div>
            </div>
        </div>
    )

}

export default AdminCandidates;