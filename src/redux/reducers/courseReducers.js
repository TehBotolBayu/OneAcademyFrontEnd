import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCategory: [],
  listCourse: [],
  filtersearch: [],
  courseDetails: [],
  courseMaterial: [],
  progressCourse: [] || null,
  transaction: null,
  coursePage: null,
};

const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setListCategory: (state, action) => {
      state.listCategory = action.payload;
    },
    setListCourse: (state, action) => {
      state.listCourse = action.payload;
    },
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
    setCourseMaterial: (state, action) => {
      state.courseMaterial = action.payload;
    },
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    setProgressCourse: (state, action) => {
      state.progressCourse = action.payload;
    },
    setFilterSearch: (state, action) => {
      state.filtersearch = action.payload;
    },
    setCoursePage: (state, action) => {
      state.coursePage = action.payload;
    },
  },
});

export const {
  setListCategory,
  setListCourse,
  setCourseDetails,
  setCourseStatus,
  setCoursePage,
  setCourseMaterial,
  setProgressCourse,
  setTransaction,
  setFilterSearch,
} = CourseSlice.actions;
export default CourseSlice.reducer;
