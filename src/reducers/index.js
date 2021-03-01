import { combineReducers } from "redux";
import getInterviewquestions from "./interviewReducer"
import ResumeSearchStatus from './ResumeSearch'
import GetEmployeeApprove from './EmployeeApproveReducer'
export default combineReducers({
    getInterviewquestions,
    ResumeSearchStatus,
    GetEmployeeApprove,
})
