import { createSlice } from "@reduxjs/toolkit";

// create initial data variable
const voidUser = {
    _id:"",
    name:"",
    // email:"",
    username:'',
    auth:false
}

export const userSlice = createSlice({
    name:'userSlice',
    initialState:voidUser,
    reducers:{
        setUser:(state,action)=>{
            const {_id,username, auth, name} = action.payload
            // const {_id, email,username, auth, name} = action.payload
            state._id = _id
            state.auth = auth
            state.username = username
            state.name = name
            // state.email = email
        },
        resetUser:(state,action)=>{
            state._id = ''
            state.auth = false
            state.username = ''
            state.name = ''
            // state.email = ''
        },
    }
}) 

export const {setUser, resetUser} = userSlice.actions

export default userSlice.reducer