import React, { useContext, useEffect, useState } from "react";
import "./CSS/AdminCandidates.css";
import AdminRegisterCandidate from "./AdminRegisterCandidate";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Loader from "../Loader";
import { toast } from "react-toastify";

const AdminCandidates = () => {

    const { remainingTime, setRemainingTime,
        isVotingStart, setIsVotingStart,
        candidate, setCandidate,
        successRegistration, setSuccessRegistration,
        votingDuration, setVotingDuration
    } = useContext(AppContext);
    
    const [loading, setLoading] = useState(false);
    const [currentStatementIndex, setCurrentStatementIndex] = useState(0);

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
    }, [statements.length]);

    useEffect(() => {
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
    
    const startVotingHandler = async () => {
        setLoading(true);
        await axios.post("http://localhost:3001/api/admin/set/voting/status/true", {
            votingDuration:votingDuration
        });
        setLoading(false);
    }

    const endVotingHandler = async () => {
        const response = await axios.post("http://localhost:3001/api/admin/set/voting/status/false");
        console.log(response.data.isVotingStart);
        setIsVotingStart(response.data.isVotingStart);
        setRemainingTime("00:00:00");
        proceedBatchVotes();
    };

    const proceedBatchVotes = async () => {
        const response = await axios.post("http://localhost:3001/api/admin/proceed/batch/votes");
        console.log(response);
        toast.info("Votes are Counted Successfully");
        getWinner();
    }

    const getWinner = async () => {
        const response = await axios.post("http://localhost:3001/api/admin/get/winner");
        console.log(response.data.winners);
        toast.info("result is declared");
    }

    const calculateRemainingTime = () => {
        if (isVotingStart && votingDuration) {
            const endTime = new Date(votingDuration);
            const difference = endTime - new Date();
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                return `${days}d ${hours}h ${minutes}m ${seconds}s`;
            } else {
                // If time has elapsed, end the voting
                endVotingHandler();
                return "Voting ended";
            }
        } else {
            return "Voting not started";
        }
    };
    

    useEffect(() => {
        // Update remaining time every second
        const timer = setInterval(() => {
            setRemainingTime(calculateRemainingTime());
        }, 1000);

        // Clear the interval on component unmount
        return () => clearInterval(timer);
    }, [votingDuration]);

    

    const handleDurationChange = (event) => {
        const value = event.target.value;        
        setVotingDuration(value);

        console.log(isVotingStart);
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
                    {loading ? <div className="admin-candidate-start-voting-uppar-container"><Loader/></div> :
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
                                                    autoFocus={false}
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
                        </div>}
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