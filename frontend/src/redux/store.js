
// let's take out configurestore and applymiddleware if we dont use it
import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './reducers/authReducer';

export default configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
    },

})