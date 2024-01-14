import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from "./pages/Navbar";
import About from './pages/About';
import Vote from './pages/Vote';
import Register from "./pages/Register";
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import AdminPortal from './pages/admin/AdminPortal';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import AdminNavbar from './pages/admin/AdminNavbar';


function App() {

  const { isAdminLogIn } = useContext(AppContext);

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
        <Route path='/admin' element={<AdminPortal/>}/>
      </Routes>
    </div>
  );
}

export default App;
