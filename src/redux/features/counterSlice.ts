import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  expiryDate: number | null; // UNIX timestamp for the expiry date
}

const initialState: AuthState = {
  isLoggedIn: false,
  expiryDate: null,
};

const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    islogin: (state) => {
      console.log("islogin : ", state.isLoggedIn);
      return { ...state, isLoggedIn: true };
    },
    islogout: (state) => {
      console.log("islogout : ", state.isLoggedIn);
      return { ...state, isLoggedIn: false };
    },
    setExpiryDate: (state, action: PayloadAction<number | null>) => {
      console.log("setExpiryDate : ", action.payload);
      return { ...state, expiryDate: action.payload };
    },
  },
});

export const { islogin, islogout, setExpiryDate } = counterSlice.actions;

export default counterSlice.reducer;
