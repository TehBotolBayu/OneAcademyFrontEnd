import axios from "axios";
import {
  setGoogleLogin,
  setIdUser,
  setRole,
  setToken,
} from "../reducers/authReducers";
import { ENDPOINTS } from "../../utils/endpointApi";
import toast from "react-hot-toast";
import { setProfileData } from "../reducers/profileReducers";
import handleApiError from "../../utils/handleApiError";
import { setPaymentStatus } from "../reducers/adminReducers";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(ENDPOINTS.login, {
      email,
      password,
    });

    const { token } = response.data.data;
    const { id, roleId } = response.data;

    dispatch(setToken(token));
    dispatch(setIdUser(id));

    localStorage.setItem("idUser", id);
    localStorage.removeItem("countdown");
    localStorage.setItem("r", roleId);

    if (roleId !== 2) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const loginWithGoogle = (accessToken, navigate) => async (dispatch) => {
  try {
    let data = JSON.stringify({
      access_token: accessToken,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: ENDPOINTS.loginwithgoogle,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data;
    const { id, roleId } = response.data.user;

    dispatch(setToken(token));
    dispatch(setIdUser(id));

    localStorage.setItem("idUser", id);
    localStorage.removeItem("countdown");
    localStorage.setItem("r", roleId);
    dispatch(setGoogleLogin("true"));

    if (roleId !== 2) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const register =
  (email, password, name, phone, navigate) => async () => {
    try {
      const response = await axios.post(ENDPOINTS.register, {
        email,
        name,
        phone,
        password,
        roleId: 2,
      });

      const { message, user } = response.data;

      toast.success(message);
      localStorage.setItem("email", user.email);

      setTimeout(() => {
        navigate("/validate");
      }, 2000);
    } catch (error) {
      handleApiError(error);
    }
  };

export const activateAccount = (OTP, navigate) => async () => {
  try {
    const email = localStorage.getItem("email");

    const response = await axios.post(ENDPOINTS.activateaccount, {
      email,
      OTP,
    });

    const { message } = response.data;

    toast.success(message);
    localStorage.removeItem("email");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    handleApiError(error);
  }
};

export const resendOtp = () => async () => {
  try {
    const email = localStorage.getItem("email");

    await axios.post(ENDPOINTS.resendotp, {
      email,
    });

    toast.success("Otp berhasil dikirim");
  } catch (error) {
    handleApiError(error);
  }
};

export const resetPassword = (email) => async () => {
  try {
    const response = await axios.post(ENDPOINTS.resetpassword, {
      email,
    });

    const { message } = response.data;
    localStorage.removeItem("countdown");
    toast.success(message);
  } catch (error) {
    handleApiError(error);
  }
};

export const forgotPassword = (password, id, navigate) => async () => {
  try {
    const response = await axios.post(ENDPOINTS.setpassword, {
      key: id,
      password,
    });

    const { message } = response.data;
    toast.success(message);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  } catch (error) {
    handleApiError(error);
  }
};

export const logout = (navigate) => (dispatch) => {
  localStorage.clear();
  dispatch(setToken(null));
  dispatch(setIdUser(null));
  dispatch(setProfileData(null));
  dispatch(setRole(null));
  dispatch(setGoogleLogin(null));
  dispatch(setPaymentStatus([]));
  navigate("/login");
};
