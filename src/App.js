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



function App() {

  const { isAdminLogIn, setIsVotingStart, setVotingDuration } = useContext(AppContext);

  useEffect(() => {
    const socket = io.connect(ADDRESS);

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('votingStarted', ({ isVotingStart }) => {
        console.log('Voting has started:', isVotingStart);
        toast.info("Voting has been started");
        setIsVotingStart(true);
    });

    socket.on('votingDuration', ({ votingDuration }) => {
      setVotingDuration(votingDuration);
    });

    socket.on('votingEnded', ({ isVotingStart }) => {
      toast.info("Voting has been ended");
      setIsVotingStart(isVotingStart);
    })
    
}, [setIsVotingStart,setVotingDuration]);

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
