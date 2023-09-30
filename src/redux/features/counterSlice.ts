import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  isLoggedIn: boolean;
  expiryDate: number | null; // UNIX timestamp for the expiry date
}

const initialState: AuthState = {
  email: "",
  isLoggedIn: false,
  expiryDate: null,
};

const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    islogin: (state, action: PayloadAction<string>) => {
      console.log("islogin : ", state.isLoggedIn);
      return { ...state, isLoggedIn: true, email: action.payload };
    },
    islogout: (state) => {
      console.log("islogout : ", state.isLoggedIn);
      alert("로그아웃 되었습니다.");
      return { ...state, isLoggedIn: false, expiryDate: null, email: "" };
    },
    setExpiryDate: (state, action: PayloadAction<number | null>) => {
      console.log("setExpiryDate : ", action.payload);
      return { ...state, expiryDate: action.payload };
    },
  },
});

export const { islogin, islogout, setExpiryDate } = counterSlice.actions;

export default counterSlice.reducer;
