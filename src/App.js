import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from "./pages/Navbar";
import About from './pages/About';
import Vote from './pages/Vote';
import Register from "./pages/Register";
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';
import AdminNavbar from './pages/admin/AdminNavbar';
import Footer from './pages/Footer';
import AdminVoters from './pages/admin/AdminVoters';
import AdminCandidates from './pages/admin/AdminCandidates';
import { io } from 'socket.io-client';
import { ADDRESS } from './pages/constants';
import { toast } from 'react-toastify';
import axios from 'axios';



function App() {

  const { isAdminLogIn, setIsVotingStart, setVotingDuration, setIsResult, setWinners } = useContext(AppContext);

  useEffect(() => {
    const socket = io.connect(ADDRESS);

    const checkVotingStatus = async () => {
      const response = await axios.post("http://localhost:3001/api/admin/get/voting/status");
      setIsVotingStart(response.data.votingStatus)
    }

    socket.on('connect', () => {
      console.log('Connected to server');
      if (checkVotingStatus()) {
        setIsVotingStart(true);
      }
    });

    socket.on('votingStarted', ({ isVotingStart }) => {
        console.log('Voting has started:', isVotingStart);
        toast.info("Voting has been started");
        setIsVotingStart(isVotingStart);
    });

    socket.on('votingDuration', ({ votingDuration }) => {

      setVotingDuration(votingDuration);
    });

    socket.on('votingEnded', ({ isVotingStart }) => {
      toast.info("Voting has been ended");
      setIsVotingStart(isVotingStart);
    });

    socket.on('resultDeclared', ({ isResult }) => {
      toast.info(`is Result Declared ${isResult}`);
      console.log("Result isssssss ==== >>>>>>>",isResult);
      setIsResult(isResult);
    });

    socket.on('Winners', ({ winners }) => {
      toast.info("Winners");
      console.log("Winners are : ======= >>>>>> ",winners);
      setWinners(winners);
    });

    socket.on('reconnect', ({ isVotingStart }) => {
      checkVotingStatus()
    });

    return () => {
      socket.disconnect();
    }
    
}, [setIsVotingStart,setVotingDuration,setIsResult,setWinners]);

  return (
    <div className="App">
      {isAdminLogIn ? (<AdminNavbar />) : (<Navbar />)}
      
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/vote' element={<Vote />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path="/admin/voters" element={<AdminVoters />} />
        <Route path="/admin/candidates" element={<AdminCandidates/>} />
      </Routes>

      {isAdminLogIn ? (<div/>) : <Footer />}
    </div>
  );
}

export default App;
