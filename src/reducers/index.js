import { combineReducers } from "redux";
import getInterviewquestions from "./interviewReducer";
import insertInterviewquestions from "./interviewReducer";
import getemplyoeeformid from "./employeeformReducer";

export default combineReducers({
    getInterviewquestions,
    insertInterviewquestions,
    getemplyoeeformid
})

