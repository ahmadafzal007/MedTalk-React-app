import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        _id:"",
        name:"",
        email:"",
        auth:false,
        role:""
    },

    reducers:{
        login:(state,action)=>{
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.auth = true;
            state.role = action.payload.role;
        },
        logout:(state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.auth = false;
            state.role = "";
        },
        updateUser: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.auth = true;
            state.role = action.payload.role;


        }

    }
});


export const {login,logout,updateUser} = userSlice.actions;
export default userSlice.reducer;