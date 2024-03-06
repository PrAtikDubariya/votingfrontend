import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loader from "./Loader";
import "./CSS/Register.css";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const Register = () => {

    const navigate = useNavigate();
    const ROLE = ["candidate", "voter"];
    const { loading, setLoading, trackStudent, setVoters, setIsRegister } = React.useContext(AppContext);
    const [isVotingStart, setIsVotingStart] = React.useState(false);
    const [otp, setOTP] = React.useState("");
    const [studentRegister, setStudentRegister] = React.useState({
        enrollmentNumber: "",
        role:"",
        otp: "",
    });

    React.useEffect(() => {
        const fetchVotingStatus = async () => {
            const response = await axios.post("http://localhost:3001/api/admin/get/voting/status");
            if (response.data.votingStatus === true) {
                console.log(response.data.votingStatus);
                setIsVotingStart(response.data.votingStatus);
            }
        }
        fetchVotingStatus();
    },[isVotingStart,setIsVotingStart]);

    const getOTP = async () => {
        if (isVotingStart) {
            toast.error("Voting Started");
        } else {
            const validateInputResponse = await validateInput();
            console.log(validateInputResponse);
            if (validateInputResponse) {
                const response = await axios.post("http://localhost:3001/api/login/getotp/registration", {
                    enrollmentNumber: studentRegister.enrollmentNumber
                });
                toast.info("Check Your Mail");
                setOTP(response.data.otp);
            }
        }
        
    }

    const registerVoterAndCandidate = async () => {
        console.log(otp);
        console.log(studentRegister.otp);
        if (otp.toString() === studentRegister.otp) {

            setLoading(true);
            if (studentRegister.role.toLowerCase() === "voter") {
                try {
                    const response = await axios.post("http://localhost:3001/api/login/registervoter", {
                        enrollmentNumber: studentRegister.enrollmentNumber
                    });
                    console.log(response);
                    if (response.data.voterObject.enrollmentNumber === "") {
                        toast.success(`${studentRegister.enrollmentNumber.toUpperCase()} is registered as Voter`);
                        setVoters(prev => [...prev, response.data.voterObject]);
                        setIsRegister(true);
                    } else {
                        toast.info(`${studentRegister.enrollmentNumber.toUpperCase()} is already registered as Voter`);
                        setIsRegister(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else if (studentRegister.role.toLowerCase() === "candidate") {
                try {
                    const response = await axios.post("http://localhost:3001/api/login/registercandidate", {
                        enrollmentNumber: studentRegister.enrollmentNumber
                    });
                    console.log(response);

                    if (response.data.candidateObject.enrollmentNumber === "") {
                        toast.success(`${studentRegister.enrollmentNumber.toUpperCase()} is not Eligible for Candidate`);
                    } else {
                        toast.info(`${studentRegister.enrollmentNumber.toUpperCase()} is registered as Candidate`)
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            setLoading(false);

        }
        else {
            toast.error("Wrong OTP");
        }
    }

    const validateInput = async () => {
        console.log("enroll",trackStudent);
        console.log("ENROLL",studentRegister.enrollmentNumber);
        if (studentRegister.enrollmentNumber !== "" && studentRegister.role!=="") {
            if (ROLE.includes((studentRegister.role).toLowerCase())) {
                if (studentRegister.enrollmentNumber.toUpperCase() === trackStudent.toUpperCase()) {
                    return true;
                } else {
                    toast.error("It seems you have entered wrong enrollment");
                    return false;
                }
            } else {
                toast.error(`${studentRegister.role} is Not Available`);
                return false
            }
        }
        else {
            toast.error("Input Require!");
            return false;
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setStudentRegister((values) => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerVoterAndCandidate();
    }

    const goToVotePage = () => {
        navigate("/vote");
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {loading ? <div className="loader-main-container"><Loader /></div> :
                <div className="login-container">
                    <Box
                        sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                            }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: "#2196f3" }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Register
                    </Typography>
                    <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="enrollmentNumber"
                            label="Enrollment Number"
                            name="enrollmentNumber"
                            autoComplete="enrollmentNumber"
                            value={studentRegister.enrollmentNumber}
                            onChange={handleChange}
                            autoFocus />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="role"
                            label="Role"
                            name="role"
                            autoComplete="role"
                            value={studentRegister.role}
                            onChange={handleChange}
                            autoFocus={false}
                        />
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                            required
                            fullWidth
                            name="otp"
                            label="Enter OTP"
                            type="text"
                            id="otp"
                            value={studentRegister.otp}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={getOTP}
                            sx={{
                            padding: "15px 0",
                            bgcolor: "#673ab7", cursor: "pointer",
                            ':hover': { backgroundColor: '#673ab7', }
                            }}>
                            Get OTP
                        </Button>
                        </Grid>
                        <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // onClick={handleSubmit}
                            sx={{
                            mt: 1, mb: 2, bgcolor: "#673ab7", cursor: "pointer",
                            ':hover': { backgroundColor: '#673ab7', }
                            }}>
                            Register
                        </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
                </div>}
                {isVotingStart &&
                <div className="cast-vote-popup-main-container">
                    <div className="cast-vote-confirmation-popup">
                            <p>Voting is Started</p>
                            <p>Click Yes To Go Vote Page</p>
                        <div className="vote-page-confirmation-popup-button">
                            <div onClick={goToVotePage}>Yes</div>
                        </div>
                    </div>
                </div>    
            }
        </Container>
    </ThemeProvider>
    )

}

export default Register;