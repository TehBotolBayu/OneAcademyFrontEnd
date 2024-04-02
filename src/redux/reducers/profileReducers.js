import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: null,
    buyHistory: [],
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        setBuyingHistory: (state, action) => {
            state.buyHistory = action.payload;
        },
    },
});

export const { setProfileData, setBuyingHistory } = profileSlice.actions;
export default profileSlice.reducer;
