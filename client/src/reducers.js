import {combineReducers} from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
    tasks:tasksReducer,
    auth:authReducer
});

export default rootReducer;