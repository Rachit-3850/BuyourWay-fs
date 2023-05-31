import React, { Fragment, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const ProtectedRoute = ({ isAdmin, children}) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    const navigate = useNavigate();
    if (Cookies.get()) {
		// for(let i = 0;i<10000000;i++) {}
		// if(isAdmin && "admin" !== user?.role) {
		// 	navigate('/')
		// }
		
		return children;
	} else {
		return navigate('/login');
	}
    
}



export default ProtectedRoute