import React, { Fragment, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const AdminRoute =  ({ isAdmin, children}) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    const navigate = useNavigate();
    if (Cookies.get() && user) {
        // console.log(user)
        // await user;
        if(user?.role === 'admin') {
            console.log(user.role);
            return children
        }
        else {
            return navigate('/');
        }
	} else {
		return navigate('/login');
	}
}

export default AdminRoute