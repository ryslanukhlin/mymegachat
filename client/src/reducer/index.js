import { combineReducers } from 'redux';
import userReducer from './userReducer';
import registerForm from "./registerForm";
import loginForm from "./loginForm";

const mainReducer = combineReducers({
    userReducer,
    registerForm,
    loginForm,
});

export default mainReducer;