import React, { useContext, useEffect } from "react";
import "./CSS/AdminVoters.css";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import Loader  from "../Loader";

const AdminVoters = () => {
    
    const { voters, setVoters, searchInput, loading, setLoading } = useContext(AppContext);

    useEffect(() => {
        const fetchVoters = async () => {
            setLoading(true);
            try {
                const response = await axios.post("http://localhost:3001/api/admin/getallvoter");
                setVoters(response.data.voterData);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchVoters();
    }, [setVoters,setLoading]);

    const filteredVoters = voters.filter(voter =>
        voter.enrollmentNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
        voter.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        voter.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        `${voter.firstName} ${voter.lastName}`.toLowerCase().includes(searchInput.toLowerCase())
    );
    
    useEffect(() => {
        console.log("voters state updated:", voters);
    }, [voters]);

    const handleRemoveVoter = async (enrollmentNumber) => {
        setLoading(true);
        enrollmentNumber = enrollmentNumber.toUpperCase();

        try {
            const response = await axios.post("http://localhost:3001/api/admin/remove/voter", {
                enrollmentNumber:enrollmentNumber
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error("removing Unsucessfull");
            console.log(error);
        }
        try {
            const response = await axios.post("http://localhost:3001/api/admin/getallvoter");
            setVoters(response.data.voterData);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
        setLoading(false);
    };

    const votersToRender = searchInput !== "" ? filteredVoters : voters;

    return (
        <div>
            {loading ? <Loader/> :
                <div className="admin-voter-main-container">
                    {votersToRender.slice().reverse().map((voter, index) => (
                        <div className="voters-card-container">
                            <div className="voters-card-main-container">
                                <div key={index} className="voters-card-text">VOTER-ID CARD</div>
                                <div className="voters-card-basic-info">
                                    <div>{(voter.enrollmentNumber).toUpperCase()}</div>
                                    <div>{voter.firstName} {voter.lastName}</div>
                                </div>
                                <div className="voters-card-other-info">
                                    <div>Branch : {voter.branch}</div>
                                    <div>Admission Year : {voter.admissionYear}</div>
                                    <div>Last Year : {voter.admissionYear + 4}</div>
                                    <div>Gender : {voter.gender}</div>
                                    <div>Email : {voter.email}</div>
                                    <div>Has Vote : {voter.hasVoted}</div>
                                </div>
                                <div className="remove-card-icon" onClick={() => handleRemoveVoter(voter.enrollmentNumber)} ><FaTrash /></div>
                            </div>
                        </div>))}
                </div>
            }
        </div>
    );
};

export default AdminVoters;
