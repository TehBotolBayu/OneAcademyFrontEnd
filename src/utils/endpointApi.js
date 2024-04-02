const API_URL = import.meta.env.VITE_BASE_URL;

export const ENDPOINTS = {
  //auth endpoints
  login: `${API_URL}/api/v1/user/login`,
  loginwithgoogle: `${API_URL}/api/v1/user/auth/google`,
  register: `${API_URL}/api/v1/user/register`,
  activateaccount: `${API_URL}/api/v1/user/verify`,
  resendotp: `${API_URL}/api/v1/user/resetOTP`,
  resetpassword: `${API_URL}/api/v1/user/reset-password`,
  setpassword: `${API_URL}/api/v1/user/set-password`,

  //users endpoints
  profile: `${API_URL}/api/v1/user/me`,
  updateprofile: `${API_URL}/api/v1/user/me`,
  changepassword: `${API_URL}/api/v1/user/me/change-password`,
  buyhistory: `${API_URL}/api/v1/user/me/history-transaction`,

  //course endpoints
  category: `${API_URL}/api/v1/category`,
  filtersearch: (page) => {
    `${API_URL}/api/v1/course/filtersearch/?page=${page}`;
  },
  listcourse: (page) => {
    return `${API_URL}/api/v1/course/?page=${page}`;
  },
  detailcourse: (id) => {
    return `${API_URL}/api/v1/course/${id}`;
  },
  temporarybuycourses: (courseid) => {
    return `${API_URL}/api/v1/transaction/${courseid}/buy`;
  },
  detailtransaction: (id) => {
    return `${API_URL}/api/v1/transaction/${id}/detailTransaction`;
  },
  paycourses: (transcationid) => {
    return `${API_URL}/api/v1/transaction/${transcationid}/pay`;
  },

  addprogress: (materialid) => {
    return `${API_URL}/api/v1/myClass/progress/complete/${materialid}`;
  },
  checkprogress: (courseid) => {
    return `${API_URL}/api/v1/myClass/progress/course/${courseid}`;
  },

  //admin endpoints
  transactioncourse: (page) => {
    return `${API_URL}/api/v1/transaction/?page=${page}`;
  },
  admincoursedetails: (id) => {
    return `${API_URL}/api/v1/course/${id}`;
  },

  addcourse: `${API_URL}/api/v1/course/create`,
  courseupdate: (id) => {
    return `${API_URL}/api/v1/course/update/${id}`;
  },
  deletecourse: (id) => {
    return `${API_URL}/api/v1/course/${id}`;
  },

  addcategory: `${API_URL}/api/v1/category/create`,
  updatedeletecategory: (id) => {
    return `${API_URL}/api/v1/category/${id}`;
  },

  addchapter: `${API_URL}/api/v1/chapter/create`,
  updatedeletechapter: (id) => {
    return `${API_URL}/api/v1/chapter/${id}`;
  },

  addmaterial: `${API_URL}/api/v1/material/create`,
  updatedeletematerial: (materialId) => {
    return `${API_URL}/api/v1/material/${materialId}`;
  },
};
