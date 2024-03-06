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
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loader from "./Loader";
import "./CSS/Login.css";

const defaultTheme = createTheme();

export default function Login() {

    const navigate = useNavigate();

    const ROLE = ["admin", "student"];
    const [otp, setOTP] = React.useState("");
    const [apiIsLogin, setAPIIsLogin] = React.useState(false);
    const [apiRole, setAPIRole] = React.useState("");
    const { setAtLogInPage,setIsLogIn,setIsAdminLogIn,setLoading,loading,setTrackStudent,setIsRegister } = React.useContext(AppContext);
    const [studentLogIn, setStudentLogIn] = React.useState({
      enrollmentNumber: "",
      role:"",
      otp: "",
    });

    async function login() {
      if ((apiRole === "admin") && apiIsLogin && (otp === studentLogIn.otp)) {
        toast.success("Login Successful");
        setIsAdminLogIn(true);
        navigate("/admin/voters");

      }
      else if ((apiRole === "student") && apiIsLogin && (otp === studentLogIn.otp)) {
          
          toast.success("Login Successful");
          setIsLogIn(true);
          navigate("/");
          
      }
      else {
          toast.error("Don't have Account or Password is wrong");
      }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setStudentLogIn((values) => ({ ...values, [name]: value }));
    
    }
  
  const validateInput = () => {
      
    if (studentLogIn.enrollmentNumber !== "" && studentLogIn.role!=="") {
      
      if (ROLE.includes((studentLogIn.role).toLowerCase())) {
        return true;
      } else {
        toast.error(`${studentLogIn.role} is Not Available`);
      }

    }
    else {
      toast.error("Input Require!");
    }

  }

  const checkRegistrationStatus = async () => {
    try {
      console.log(studentLogIn.enrollmentNumber);
      const response = await axios.post("http://localhost:3001/api/admin/getsinglevoter", {
        enrollmentNumber:studentLogIn.enrollmentNumber
      });
      console.log(response);
      if (response.data.voterData.enrollmentNumber === studentLogIn.enrollmentNumber.toUpperCase()) {
        setIsRegister(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }

  const handleSubmit = (event) => {
      
    event.preventDefault();

    if (validateInput()) {
      login();
      checkRegistrationStatus();
    }
  }

  const clickHandler = () => {

      setAtLogInPage(false);
      navigate("/signup");
  
  }

  const getOTP = async () => {

    if (validateInput()) {

      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3001/api/login/signin", {
          enrollmentNumber:studentLogIn.enrollmentNumber,
          role:studentLogIn.role
        });
        if (response.data.isLogin) {
          toast.info("Check Your Mail");
          setAPIIsLogin(response.data.isLogin);
          setAPIRole(response.data.role);
          setOTP((response.data.otp).toString());
          setTrackStudent(response.data.enrollmentNumber);
        }
        else {
          toast.error("Don't have Account!");
        }

        
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);

    }
    
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {loading ? <div className="loader-main-container"><Loader/></div> :
          <div className="login-container">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "#2196f3" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
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
                    value={studentLogIn.enrollmentNumber}
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
                    value={studentLogIn.role}
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
                    value={studentLogIn.otp}
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
                    onClick={handleSubmit}
                    sx={{
                      mt: 1, mb: 2, bgcolor: "#673ab7", cursor: "pointer",
                      ':hover': { backgroundColor: '#673ab7', }
                    }}>
                    Sign In
                  </Button>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item onClick={clickHandler}>
                    <NavLink href="/signup" variant="body2" style={({ isActive }) => ({
                      textDecoration: isActive ? 'none' : 'none',
                      color: isActive ? '#2196f3' : '#2196f3',
                    })}>
                      {"Don't have an account? Sign Up"}
                    </NavLink>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
          </div>}
      </Container>
    </ThemeProvider>
  );
}