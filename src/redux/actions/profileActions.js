import axios from "axios";
import { ENDPOINTS } from "../../utils/endpointApi";
import { setBuyingHistory, setProfileData } from "../reducers/profileReducers";
import toast from "react-hot-toast";
import { setRole } from "../reducers/authReducers";
import handleApiError from "../../utils/handleApiError";

export const getProfileData = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(ENDPOINTS.profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { profile } = response.data;

    localStorage.setItem("idProfile", profile.id);
    dispatch(setRole(profile.role.name));
    dispatch(setProfileData(profile));
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProfile = (formData) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.put(ENDPOINTS.profile, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const { message } = response.data;
    toast.success(message);

    window.location.reload();
  } catch (error) {
    handleApiError(error);
  }
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const response = await axios.put(
        ENDPOINTS.changepassword,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      handleApiError(error);
    }
  };

export const buyingHistory = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(ENDPOINTS.buyhistory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setBuyingHistory(response.data));
  } catch (error) {
    handleApiError(error);
  }
};
