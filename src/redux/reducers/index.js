import { combineReducers } from "redux";
import authReducers from "./authReducers";
import profileReducers from "./profileReducers";
import courseReducers from "./courseReducers";
import adminReducers from "./adminReducers";

export default combineReducers({
    auth: authReducers,
    profile: profileReducers,
    course: courseReducers,
    admin: adminReducers,
});
