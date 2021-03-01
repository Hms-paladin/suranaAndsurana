import { combineReducers } from "redux";
import getInterviewquestions from "./interviewReducer"
import ResumeSearchStatus from './ResumeSearch'
import GetInterviewers from './InterviewSchedule'
import GetDesignation from './InterviewSchedule'
export default combineReducers({
    getInterviewquestions,
    ResumeSearchStatus,
    GetInterviewers,
    GetDesignation

})
