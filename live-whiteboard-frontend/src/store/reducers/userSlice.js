import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myUser: undefined,
    allUsers: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateMyUser: (state, action) => {
            state.myUser = action.payload;
        },
        updateAllUsers: (state, action) => {
            state.allUsers = action.payload;
        }
    }
});

export const { updateMyUser, updateAllUsers } = userSlice.actions;

export default userSlice.reducer;