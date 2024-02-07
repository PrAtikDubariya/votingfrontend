import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from "./pages/Navbar";
import About from './pages/About';
import Vote from './pages/Vote';
import Register from "./pages/Register";
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import AdminNavbar from './pages/admin/AdminNavbar';
import Footer from './pages/Footer';
import AdminVoters from './pages/admin/AdminVoters';
import AdminCandidates from './pages/admin/AdminCandidates';


function App() {

  const { isAdminLogIn } = useContext(AppContext);

  return (
    <div className="App">
      {!isAdminLogIn ? (<AdminNavbar />) : (<Navbar />)}
      
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

      {!isAdminLogIn ? (<div/>) : <Footer />}
    </div>
  );
}

export default App;
