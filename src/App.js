import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/AuthPage/Login';
import Register from './Pages/AuthPage/Register';
import OTP from './Pages/AuthPage/OTP';
import PrivateRoute from './Components/Auth/AuthContext';
import UserHomeDash from './Pages/UserDash/UserHomeDash';
import CreaiveHomeDash from './Pages/CreativeDash/CreaiveHomeDash';
import CreativeProfileDash from './Pages/CreativeDash/CreativeProfileDash';
import CreativeProfileUpdataDash from './Pages/CreativeDash/CreativeProfileUpdataDash';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/otp' element={<OTP />}/>


          <Route element={<PrivateRoute role="Client"/>}>
            <Route path='/user-dashboard-home' element={<UserHomeDash />}/>
          </Route>

          <Route element={<PrivateRoute role="Creative"/>}>
            <Route path='/creative-dashboard-home' element={<CreaiveHomeDash />}/>
            <Route path='/creative-dashboard-profile' element={<CreativeProfileDash />}/>
            <Route path='/creative-dashboard-profile-update' element={<CreativeProfileUpdataDash />}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
