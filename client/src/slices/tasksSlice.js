import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks:localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) :[],
    change: false
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setChange:(state,action)=>{
            state.change=action.payload
        }
    },
});

export const { setTasks,setChange } = tasksSlice.actions;
export default tasksSlice.reducer;