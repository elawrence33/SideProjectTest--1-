import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// RETURN ERRORS
// the id is optional in this case
export const returnErrors = (msg, status, id = null) => { 
    return { 
        type: GET_ERRORS, 
        payload: { msg, status, id }
    };
};

// CLEAR ERRORS
export const clearErrors = () => { 
    return { 
        type: CLEAR_ERRORS
    };
};