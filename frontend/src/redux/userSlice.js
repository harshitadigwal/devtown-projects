import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    fullName: "",
    image: "",
    _id: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            console.log(action.payload.data)
            //state.user = action.payload.data
            state._id = action.payload.data._id
            state.email = action.payload.data.email
            state.fullName = action.payload.data.fullName
            state.image = action.payload.data.image

        },

        logoutRedux: (state, action) => {
            state._id = "";
            state.email = "";
            state.fullName = "";
            state.image = "";

        }
    }
})

export const { loginRedux, logoutRedux } = userSlice.actions

export default userSlice.reducer