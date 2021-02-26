import { combineReducers } from "redux";
import getInterviewquestions from "./interviewReducer"
import ResumeSearchStatus from './ResumeSearch'
export default combineReducers({
    getInterviewquestions,
    ResumeSearchStatus,
})
