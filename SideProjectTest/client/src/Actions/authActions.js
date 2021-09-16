import axios from 'axios'; 
import { returnErrors } from './errorActions';

import { 
    USER_LOADED, 
    USER_LOADING, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL
} from "../Actions/types"; 

// Check token and load user: 
export const loadUser = () => (dispatch, getState) => { 
    // User laoding: 
    dispatch({ type: USER_LOADING });

    // Getting toke from localstorage: 
    const token = getState().auth.token; 

    // Headers 
    const config = { 
        headers: { 
            "Content-type": "application/json"
        }
    }

    // If there is a token, add it to the headers: 
    if (token) { 
        config.headers['x-auth-token'] = token; 
    }
    
    axios.get('/api/user', config)
        .then(res => dispatch({ 
            type: USER_LOADED, 
                payload: res.data
        }))
        .catch(err => { 
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ 
                type: AUTH_ERROR
            });
        });
}