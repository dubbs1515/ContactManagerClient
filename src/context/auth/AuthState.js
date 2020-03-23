import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';
import contactContext from '../contact/contactContext';


const AuthState = props => {
    const initialState = {
        // token stored in browser's local storage
        // ... and accessed via vanilla JS
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null 
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        console.log('token in loaduser 1 token: ' + localStorage.token);
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        
        try {
            await console.log('Here in load user...');
            const res = await axios.get('/api/auth');
            console.log('User data: ' + res.data);
 
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });            
        }
    }


    // Register User
    const register = async formData => {
        // Format http req headers for axios
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            // Proxy in package json file 
            const res = await axios.post('/api/users', formData, config);
            console.log('before dispatch');
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            console.log('here in register...');
            loadUser();
            console.log('User: ' + res.data);
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    }

    // Login User


    // Logout User


    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                clearErrors,
                loadUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};


export default AuthState;