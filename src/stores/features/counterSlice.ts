import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "@/apis/postUser";

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
      return { ...state, isLoggedIn: true, email: action.payload };
    },
    islogout: (state) => {
      logout();
      return { ...state, isLoggedIn: false, expiryDate: null, email: "" };
    },
    setExpiryDate: (state, action: PayloadAction<number | null>) => {
      return { ...state, expiryDate: action.payload };
    },
  },
});

export const { islogin, islogout, setExpiryDate } = counterSlice.actions;

export default counterSlice.reducer;
