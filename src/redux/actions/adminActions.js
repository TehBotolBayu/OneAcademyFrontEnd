import axios from "axios";
import toast from "react-hot-toast";
import { setPaymentStatus, setTotalPages } from "../reducers/adminReducers";
import { ENDPOINTS } from "../../utils/endpointApi";
import { setGoogleLogin, setIdUser, setToken } from "../reducers/authReducers";
import { setProfileData } from "../reducers/profileReducers";
import { listCourse } from "./courseActions";
import handleApiError from "../../utils/handleApiError";

export const getTransactionData = (page) => async (dispatch) => {
  try {
    const datatransaction = ENDPOINTS.transactioncourse(page);
    const response = await axios.get(datatransaction);

    const { transactions, totalPages } = response.data;
    dispatch(setPaymentStatus(transactions));
    dispatch(setTotalPages(totalPages));
  } catch (error) {
    handleApiError(error);
  }
};

export const addcourse = (formData) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    await axios.post(ENDPOINTS.addcourse, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(listCourse(getState().course.coursePage));
    toast.success("Kelas baru berhasil dibuat");
  } catch (error) {
    handleApiError(error);
  }
};

export const updateCourse = (id, formData) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const chapterupdate = ENDPOINTS.courseupdate(id);

    await axios.put(chapterupdate, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(`Chapter ${id} updated successfully`);
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const courseDeleteRequest = ENDPOINTS.deletecourse(id);

    await axios.delete(courseDeleteRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(listCourse(getState().course.coursePage));
    toast.success("Kelas berhasil dihapus");
  } catch (error) {
    handleApiError(error);
  }
};

export const addcategory = (formData) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;

    await axios.post(ENDPOINTS.addcategory, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Kategori baru berhasil dibuat");
  } catch (error) {
    handleApiError(error);
  }
};

export const updatedCategory = (id, formData) => async (dispatch, getState) => {
  try {
    const updateCategory = ENDPOINTS.updatedeletecategory(id);
    const { token } = getState().auth;
    await axios.put(updateCategory, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Kategori berhasil diubah");
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    const deletedCategory = ENDPOINTS.updatedeletecategory(id);
    const { token } = getState().auth;

    await axios.delete(deletedCategory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(`Kategori Berhasil Dihapus`);
  } catch (error) {
    handleApiError(error);
  }
};

export const addChapter =
  (totalDuration, step, title, id) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      await axios.post(
        ENDPOINTS.addchapter,
        {
          totalDuration,
          step,
          title,
          courseId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Chapter baru berhasil dibuat");
    } catch (error) {
      handleApiError(error);
    }
  };

export const updatedChapter =
  (totalDuration, step, title, id, chapterId) => async (dispatch, getState) => {
    try {
      const updateChapter = ENDPOINTS.updatedeletechapter(chapterId);
      const { token } = getState().auth;
      await axios.put(
        updateChapter,
        {
          totalDuration,
          step,
          title,
          courseId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Chapter berhasil diubah");
    } catch (error) {
      handleApiError(error);
    }
  };

export const deleteChapter = (chapterId) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const chapterDeleteRequest = ENDPOINTS.updatedeletechapter(chapterId);
    await axios.delete(chapterDeleteRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Chapter berhasil dihapus");
  } catch (error) {
    handleApiError(error);
  }
};

export const createMaterial =
  (step, title, videoURL, duration, id, chapterId) =>
  async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      await axios.post(
        ENDPOINTS.addmaterial,
        {
          step,
          title,
          videoURL,
          duration,
          courseId: id,
          chapterId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Material baru berhasil dibuat");
    } catch (error) {
      handleApiError(error);
    }
  };

export const deleteMaterial = (materialId) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const materialDeleteRequest = ENDPOINTS.updatedeletematerial(materialId);
    await axios.delete(materialDeleteRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Material berhasil dihapus");
  } catch (error) {
    handleApiError(error);
  }
};

export const logoutAdmin = (navigate) => (dispatch) => {
  localStorage.clear();
  dispatch(setToken(null));
  dispatch(setIdUser(null));
  dispatch(setProfileData(null));
  dispatch(setGoogleLogin(null));
  dispatch(setPaymentStatus([]));
  navigate("/");
};
