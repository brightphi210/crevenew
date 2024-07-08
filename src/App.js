import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/AuthPage/Login';
import Register from './Pages/AuthPage/Register';
import OTP from './Pages/AuthPage/OTP';
import PrivateRoute from './Components/Auth/PrivateRoute';
import UserHomeDash from './Pages/UserDash/UserHomeDash';
import CreaiveHomeDash from './Pages/CreativeDash/CreaiveHomeDash';
import CreativeProfileDash from './Pages/CreativeDash/CreativeProfileDash';
import CreativeProfileUpdataDash from './Pages/CreativeDash/CreativeProfileUpdataDash';
import CreativeNotificationDashboard from './Components/CreativeDashboard/CreativeNotificationDashboard';
import CreativeBookingsDash from './Pages/CreativeDash/CreativeBookingsDash';


import AOS from 'aos';
import 'aos/dist/aos.css';
import HomeTalentPage from './Pages/HomeTalentPage';
import AboutPage from './Pages/AboutPage';
import BlogPage from './Pages/BlogPage';
import CreativeSettingDash from './Pages/CreativeDash/CreativeSettingDash';
import CreativeFAQsDash from './Pages/CreativeDash/CreativeFAQsDash';
import SingleUserCreative from './Pages/UserDash/SingleUserCreative';
AOS.init();

function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/otp' element={<OTP />}/>

          <Route path='/allTalents' element={<HomeTalentPage />}/>
          <Route path='/about' element={<AboutPage />}/>
          <Route path='/blog' element={<BlogPage />}/>


          <Route element={<PrivateRoute role="Client"/>}>
            <Route path='/user-dashboard-home' element={<UserHomeDash />}/>
            <Route path='/user-dashboard-single-creative/:id/' element={<SingleUserCreative />}/>
          </Route>

          <Route element={<PrivateRoute role="Creative"/>}>
            <Route path='/creative-dashboard-home' element={<CreaiveHomeDash />}/>
            <Route path='/creative-dashboard-profile' element={<CreativeProfileDash />}/>
            <Route path='/creative-dashboard-profile-update' element={<CreativeProfileUpdataDash />}/>
            <Route path='/creative-dashboard-notificationAll' element={<CreativeNotificationDashboard />}/>
            <Route path='/creative-dashboard-bookingsAll' element={<CreativeBookingsDash />}/>
            <Route path='/creative-dashboard-settings' element={<CreativeSettingDash />}/>
            <Route path='/creative-dashboard-FAQs' element={<CreativeFAQsDash />}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
