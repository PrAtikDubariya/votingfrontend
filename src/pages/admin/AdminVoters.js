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
                setVoters(response.data.signUpData);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchVoters();
    }, []);

    const filteredVoters = voters.filter(voter =>
        voter.enrollmentNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
        voter.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        voter.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        `${voter.firstName} ${voter.lastName}`.toLowerCase().includes(searchInput.toLowerCase())
    );
    
    useEffect(() => {
        console.log("voters state updated:", voters);
    }, [voters]);

    const handleRemoveVoter = (enrollmentNumber) => {
        console.log("Removing voter with enrollment number:", enrollmentNumber);

        setVoters((prevVoters) => {
            const votersArray = prevVoters.filter((voter) => voter.enrollmentNumber !== enrollmentNumber);
            console.log("Updated voters array:", votersArray);
            return votersArray;
        });
        toast.success("done");
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
