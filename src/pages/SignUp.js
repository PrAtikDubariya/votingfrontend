import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from "./Loader";

const defaultTheme = createTheme();

export default function SignUp() {

  const { contractInstance, account, setAtLogInPage,loading,setLoading } = React.useContext(AppContext);
  const navigate = useNavigate();

  const [studentSignUp, setStudentSignUp] = React.useState({
    firstName: "",
    lastName: "",
    admissionYear: 0,
    enrollmentNumber: "".toUpperCase(),
    branch: "".toUpperCase(),
    gender: "".toUpperCase(),
    setPassword: "",
    confirmPassword: "",
  });

  async function registerStudent() {

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/api/checksignup", { enrollmentNumber: studentSignUp.enrollmentNumber });
      console.log(response);

      if (!response.data) {

        await contractInstance.signUpStudents(studentSignUp.firstName, studentSignUp.lastName, studentSignUp.admissionYear,
        studentSignUp.enrollmentNumber, studentSignUp.branch,
        studentSignUp.gender, studentSignUp.setPassword, studentSignUp.confirmPassword);
      
        setLoading(false);
        toast.success("Thank you for SignUp!");
        navigate("/login");
      }
      else {
        setLoading(false);
        toast.error(`Already have an account!`);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    
    
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(event.target.name, ":", event.target.value);
    setStudentSignUp(values => ({ ...values, [name]: value }));
  }


  const validateInput = () => {

    const regex = /[a-zA-Z]/;
    const GENDER = ["male", "female"]; 
    const ENROLLMENT_NUMBER = studentSignUp.enrollmentNumber.slice(-5);
    const hasAlphabets = regex.test(ENROLLMENT_NUMBER);

    const BRANCH = studentSignUp.enrollmentNumber.slice(-7, -5).toLowerCase();
    const enteredBranch = studentSignUp.branch.toLowerCase();
    const enteredYear = studentSignUp.admissionYear.toString().slice(-2);
    const enteredGender = studentSignUp.gender.toLowerCase();

    let ADMISSION_YEAR;
    if (studentSignUp.enrollmentNumber.length > 11) {
      ADMISSION_YEAR = studentSignUp.enrollmentNumber.slice(1, 3);
    }
    else {
      ADMISSION_YEAR = studentSignUp.enrollmentNumber.slice(0, 2);
    }


    if (((studentSignUp.enrollmentNumber.length === 11) || (studentSignUp.enrollmentNumber.length === 13)) && (!hasAlphabets)) {
        
      if ((studentSignUp.branch !== "") && (enteredYear !== "") && 
        (studentSignUp.firstName !== "") && (studentSignUp.lastName !== "") && (enteredGender !== "") &&
        (studentSignUp.setPassword !== "") && (studentSignUp.confirmPassword !== "")) {
        
        if ((BRANCH === enteredBranch) && (ADMISSION_YEAR === enteredYear) && GENDER.includes(enteredGender)) {
          if (studentSignUp.setPassword === studentSignUp.confirmPassword) {
            return true;
          }
          else {
            toast.error(`Set Password should match Confirm Password`);
          }
        }
        else {
          toast.info(`Invalid Input`);
        }
        
      }
      else {
        toast.error("Fill All the Value")
      }
    }
    else {
      toast.info(`InValid Enrollment :${studentSignUp.enrollmentNumber}`);
    }

    
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    if (validateInput()) {
      registerStudent();
    }
  
  }

    const clickHandler = () => {
      setAtLogInPage(true);
      navigate('/login');
    }


    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {loading ? <Loader /> :
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Avatar sx={{ m: 1, bgcolor: '#2196f3' }}>
                <LockOutlinedIcon />
              </Avatar>
            
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Typography component="h5" variant='h5'>MetaMask Account : {(account).slice(0, 4)}...{(account).slice(-5)}</Typography>
            
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={studentSignUp.firstName}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={studentSignUp.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="enrollmentNumber"
                      label="Enrollment Number"
                      name="enrollmentNumber"
                      autoComplete="enrollmentNumber"
                      value={studentSignUp.enrollmentNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="admissionYear"
                      label="Admission Year"
                      name="admissionYear"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="branch"
                      label="Branch"
                      name="branch"
                      value={studentSignUp.branch}
                      onChange={handleChange}
                      autoComplete="branch"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      id="gender"
                      label="Gender"
                      name="gender"
                      value={studentSignUp.gender}
                      onChange={handleChange}
                      autoComplete="gender"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="setPassword"
                      label="Set Password"
                      type="password"
                      id="setPassword"
                      value={studentSignUp.setPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      value={studentSignUp.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    mt: 3, mb: 2, bgcolor: "#673ab7", cursor: "pointer",
                    ':hover': { backgroundColor: '#673ab7', }
                  }}>
                  Sign Up
                </Button>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <ToastContainer />
                <Grid container justifyContent="flex-end">
                  <Grid item sx={{ color: "#2196f3" }}>
                    <Link onClick={clickHandler} href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>}
        </Container>
      </ThemeProvider>
    );

}