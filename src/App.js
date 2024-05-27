import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/AuthPage/Login';
import Register from './Pages/AuthPage/Register';
import OTP from './Pages/AuthPage/OTP';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/otp' element={<OTP />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
