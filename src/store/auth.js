import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoiggedIn: false },
    reducers: {
        login(state) {
            state.isLoiggedIn = true;
        },
        logout(state) {
            state.isLoiggedIn = false;
        },
    },  
});

export const authActions = authSlice.actions;
export default authSlice.reducer;