import { createSlice } from "@reduxjs/toolkit";
import { encryptValue, decryptValue } from "../../utils/encryptdecryptGoogle";

const initialState = {
  token: localStorage.getItem("token") || null,
  idUser: localStorage.getItem("idUser") || null,
  role: null,
  googleLogin: decryptValue(localStorage.getItem("googleLogin")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }

      state.token = action.payload;
    },
    setIdUser: (state, action) => {
      state.idUser = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setGoogleLogin: (state, action) => {
      const encryptedValue = encryptValue(action.payload);

      if (encryptedValue) {
        localStorage.setItem("googleLogin", encryptedValue);
      } else {
        localStorage.removeItem("googleLogin");
      }

      state.googleLogin = decryptValue(localStorage.getItem("googleLogin"));
    },
  },
});

export const { setToken, setIdUser, setRole, setGoogleLogin } =
  authSlice.actions;
export default authSlice.reducer;
