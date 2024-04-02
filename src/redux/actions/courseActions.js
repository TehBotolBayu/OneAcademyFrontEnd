import axios from "axios";
import { ENDPOINTS } from "../../utils/endpointApi";
import toast from "react-hot-toast";
import {
  setCourseDetails,
  setCourseMaterial,
  setCoursePage,
  setFilterSearch,
  setListCategory,
  setListCourse,
  setProgressCourse,
  setTransaction,
} from "../reducers/courseReducers";
import handleApiError from "../../utils/handleApiError";

export const listCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(ENDPOINTS.category);
    const { category } = response.data;

    dispatch(setListCategory(category));
  } catch (error) {
    handleApiError(error);
  }
};

export const listCourse = (page) => async (dispatch) => {
  const listCourses = ENDPOINTS.listcourse(page);
  try {
    const response = await axios.get(listCourses);
    const { courses } = response.data;

    dispatch(setListCourse(courses));
  } catch (error) {
    handleApiError(error);
  }
};

export const detailsCourse = (id) => async (dispatch, getState) => {
  if (!id) {
    dispatch(setCourseDetails([]));
    return;
  }
  const detailCourse = ENDPOINTS.detailcourse(id);
  try {
    const { token } = getState().auth;
    const response = await axios.get(detailCourse, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { course, chapters, transaction } = response.data;

    dispatch(setCourseDetails(course));
    dispatch(setCourseMaterial(chapters));
    dispatch(setTransaction(transaction));
  } catch (error) {
    handleApiError(error);
  }
};

export const temporarybuyCourse =
  (id, navigate) => async (dispatch, getState) => {
    try {
      const temporarybuy = ENDPOINTS.temporarybuycourses(id);

      const { token } = getState().auth;
      const response = await axios.post(
        temporarybuy,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { transaction } = response.data;
      dispatch(setTransaction(transaction));

      toast.success("Processing your order..");

      setTimeout(() => {
        navigate(`/payment/${id}`);
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.error;

        // Check if the error message indicates an existing transaction
        if (
          errorMessage === "You already have a transaction for this course!"
        ) {
          // Redirect to the payment page
          navigate(`/payment/${id}`);
        } else {
          // Handle other errors
          toast.error(errorMessage, {
            duration: 2000,
          });
        }
      } else {
        // Handle non-Axios errors
        toast.error(`${error?.data?.error}`, {
          duration: 2000,
        });
      }
    }
  };

export const transactionDetails = (id) => async (dispatch, getState) => {
  try {
    const detail = ENDPOINTS.detailtransaction(id);

    const { token } = getState().auth;
    const response = await axios.get(detail, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { transaction, course } = response.data;
    localStorage.setItem("date", transaction.paymentDate);
    dispatch(setTransaction(transaction));
    dispatch(setCourseDetails(course));
  } catch (error) {
    handleApiError(error);
  }
};

export const payCourses = (transcationid) => async (dispatch, getState) => {
  try {
    const pay = ENDPOINTS.paycourses(transcationid);
    const { token } = getState().auth;
    await axios.post(
      pay,
      {
        paymentMethod: "Credit Card",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Payment success!");

    setTimeout(() => {
      window.location.reload();
      // navigate(`/payment/${id}`);
    }, 1000);
  } catch (error) {
    handleApiError(error);
  }
};

export const payCoursesWithoutPayment =
  (transcationid) => async (dispatch, getState) => {
    try {
      const pay = ENDPOINTS.paycourses(transcationid);
      const { token } = getState().auth;
      await axios.post(
        pay,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Payment success!");

      setTimeout(() => {
        window.location.reload();
        // navigate(`/payment/${id}`);
      }, 1000);
    } catch (error) {
      handleApiError(error);
    }
  };

export const searchFilter = (filters, currentPage) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/v1/course/filtersearch/?page=${currentPage}`,
      {
        params: filters,
      }
    );

    const { courses, totalPages } = response.data;
    dispatch(setFilterSearch(courses));
    dispatch(setCoursePage(totalPages));
  } catch (error) {
    handleApiError(error);
  }
};

export const addProgress =
  (materialid, courseId) => async (dispatch, getState) => {
    try {
      const add = ENDPOINTS.addprogress(materialid);
      const { token } = getState().auth;
      await axios.put(
        add,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getProgress(courseId));
    } catch (error) {
      handleApiError(error);
    }
  };

export const getProgress = (id) => async (dispatch, getState) => {
  try {
    const getDataProgress = ENDPOINTS.checkprogress(id);
    const { token } = getState().auth;
    const response = await axios.get(getDataProgress, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { progress } = response.data;

    dispatch(setProgressCourse(progress));
  } catch (error) {
    handleApiError(error);
  }
};
