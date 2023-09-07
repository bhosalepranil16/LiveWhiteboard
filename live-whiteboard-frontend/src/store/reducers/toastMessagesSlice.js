import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastMessages: [],
};

export const toastSlice = createSlice({
  name: "toastMessages",
  initialState,
  reducers: {
    showToastMessage: (state, action) => {
      state.toastMessages.push(action.payload);
    },
    hideToastMessage: (state, action) => {
      state.toastMessages = state.toastMessages.filter(
        (t) => t.id !== action.payload
      );
    },
  },
});

export const { showToastMessage, hideToastMessage } = toastSlice.actions;

export default toastSlice.reducer;
