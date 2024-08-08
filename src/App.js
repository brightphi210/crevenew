import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
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
import UserCreativeDash from './Pages/UserDash/UserCreativeDash';
import UserRequestBookings from './Components/UserDashboard/UserRequestBookings';
import UserFavoriteDash from './Pages/UserDash/UserFavoriteDash';
import UserProfile from './Pages/UserDash/UserProfile';
import CreativeChatDash from './Pages/CreativeDash/CreativeChatDash';
import UserChatDash from './Pages/UserDash/UserChatDash';
import Help from './Pages/Help';
import { BASE_URL } from './Components/Auth/BaseUrl';
AOS.init();

function App() {

  let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const userToken = authUser?.access ? jwtDecode(authUser.access) : null;


    const logout = async (e) => {
        localStorage.removeItem('token')
        window.location.href = '/';
    }


  async function refreshToken() {
    try {
      const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access);
      } else {
        console.error('Failed to refresh token');
        logout();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  }


  useEffect(() => {
    const refreshInterval = setInterval(() => {
      refreshToken();
    }, 24 * 60 * 60 * 1000);

    const logoutInterval = setInterval(() => {
      logout();
    }, 24 * 60 * 60 * 1000); // 24 hours
  

    return () => {
      clearInterval(refreshInterval);
      clearInterval(logoutInterval);
    };
  }, []);






  
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Homepage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/otp' element={<OTP />}/>

          <Route path='/about' element={<AboutPage />}/>
          <Route path='/blog' element={<BlogPage />}/>
          <Route path='/help' element={<Help />}/>
          <Route path='/allTalents' element={<HomeTalentPage />}/>
          <Route path='/user-dashboard-chat' element={<UserChatDash />}/>


          <Route element={<PrivateRoute role="Client"/>}>
            <Route path='/users-dashboard-chat' element={<UserChatDash />}/>
            <Route path='/user-dashboard-home' element={<UserHomeDash />}/>
            <Route path='/user-dashboard-single-creative/:id/' element={<SingleUserCreative />}/>
            <Route path='/user-dashboard-creative/' element={<UserCreativeDash />}/>
            <Route path='/user-dashboard-books/' element={<UserRequestBookings />}/>
            <Route path='/user-dashboard-profile/' element={<UserProfile />}/>
            <Route path='/user-dashboard-favourites/' element={<UserFavoriteDash />}/>
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
