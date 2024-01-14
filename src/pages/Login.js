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
import "./CSS/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const defaultTheme = createTheme();

export default function Login() {

    const navigate = useNavigate();

  const ROLE = ["admin", "student"];
    const { contractInstance,setAtLogInPage,setIsLogIn,setIsAdminLogIn } = React.useContext(AppContext);
    const [studentLogIn, setStudentLogIn] = React.useState({
      enrollmentNumber: "",
      role:"",
      password: "",
    });

    async function login() {
      
      const enteredRole = studentLogIn.role.toLowerCase();

      const Response = await contractInstance.signIn(studentLogIn.enrollmentNumber,enteredRole,studentLogIn.password);
      console.log(Response);
          
      if (Response.role === "admin" && Response.isLogin) {

        toast.success("Login Successful");
        setIsAdminLogIn(true);
        navigate("/admin");

      }
      else if (Response.role === "student" && Response.isLogin) {
          
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
        console.log(event.target.name, ":", event.target.value);
        
        setStudentLogIn((values) => ({ ...values, [name]: value }));
    
    }
  
  const validateInput = () => {
      
    if (studentLogIn.enrollmentNumber !== "" && studentLogIn.password!=="" && studentLogIn.role!=="") {
      
      if (ROLE.includes((studentLogIn.role).toLowerCase())) {
        login();
      } else {
        toast.error(`${studentLogIn.role} is Not Available`)
      }

    }
    else {
      
      toast.error("Input Require!")

    }

  }

  const handleSubmit = (event) => {
      
    event.preventDefault();
    validateInput();

  }

  const clickHandler = () => {

      setAtLogInPage(false);
      navigate("/signup");
  
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              autoFocus
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={studentLogIn.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 ,bgcolor: "#673ab7", cursor: "pointer",
                  ':hover': { backgroundColor: '#673ab7', }}}>
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item onClick={clickHandler}>
            <NavLink href="/signup" variant="body2"  style={({ isActive }) => ({
                textDecoration: isActive ? 'none' : 'none',
                color: isActive ? '#2196f3' : '#2196f3',
                })}>
                {"Don't have an account? Sign Up"}
            </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}