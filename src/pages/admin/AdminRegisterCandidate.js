import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import Loader from '../Loader';


const defaultTheme = createTheme();

export default function AdminRegisterCandidate() {

  const { setSuccessRegistration, isVotingStart } = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const containerRef = React.useRef(null);

  const [register, setRegister] = React.useState({
    enrollmentNumber:"",
  });

  React.useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--loader-height', `${height}px`);
    }
  }, [loading]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);
    console.log(isVotingStart);
    setRegister(values => ({ ...values, [name]: value }));
  }

  const validateInput = () => {

    const regex = /[a-zA-Z]/;
    const ENROLLMENT_NUMBER = register.enrollmentNumber.slice(-5);
    const hasAlphabets = regex.test(ENROLLMENT_NUMBER);

    if (((register.enrollmentNumber.length === 11) || (register.enrollmentNumber.length === 13)) && (!hasAlphabets)) {
      return true;
    }
    else {
      toast.error("Invalid Enrollment")
    }

  }

  const registerCandidate = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/admin/registercandidate", {
        enrollmentNumber: register.enrollmentNumber,
      });
      if (!response.data.isLock) {
        if (response.data.candidate.enrollmentNumber === "") {
          toast.success(`${(register.enrollmentNumber).toUpperCase()} is Registered`);
        }
        else {
          toast.info(`${(register.enrollmentNumber).toUpperCase()} is already Registered`);
        }
      } else {
        toast.info(`Already Requested, Wait Before Try Again`);
      }
      setSuccessRegistration(true);
    } catch (error) {
      console.error("Error during registration:", error);
    }

  }

  const isCandidateSignUp = async () => {
    setLoading(true);
    const response = await axios.post("http://localhost:3001/api/login/getalldata");
    const allSignUps = response.data.signUpData;
    const enrollmentNumbers = allSignUps.map(student => student.enrollmentNumber);

    if (enrollmentNumbers.includes(register.enrollmentNumber.toUpperCase())) {
      await registerCandidate();
    }
    else {
      toast.error("Student not SignUp");
    }
    setLoading(false);
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    if (isVotingStart) {
      toast.info("Can not Register While Voting is Started");
      console.log("Voting Started",isVotingStart);
    } else {
      if (validateInput()) {
        isCandidateSignUp();
      } 
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" ref={containerRef}>
        <CssBaseline />
        {loading ? <Box
          display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ height: '273px' }}
        >
          <Loader/>
        </Box> :
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontSize: 30,
                fontWeight: "600",
                color: "rgb(94, 53, 177)",
                textAlign: "center",
              }}
            >
              Register Candidate Here
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="enrollmentNumber"
                label="Enrollment Number"
                name="enrollmentNumber"
                autoComplete="enrollmentNumber"
                autoFocus
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register Candidate
              </Button>
            </Box>
          </Box>
        }
      </Container>
    </ThemeProvider>
  );
}