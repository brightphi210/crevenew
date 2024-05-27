
import { Outlet, Navigate } from "react-router-dom";
import { useState, useContext, createContext } from "react";
import { jwtDecode } from "jwt-decode";



const PrivateRoute = ({role}) => {
    let [authUser, setAuthUser] = useState(()=>localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const userToken = jwtDecode(authUser?.access)
    console.log(userToken);

    if (!userToken) {
        return <Navigate to="/login" />;
    }
    return userToken.role === role ? <Outlet /> : <Navigate to={'/login'}/>
}

export default PrivateRoute; 


