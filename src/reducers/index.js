import { combineReducers } from "redux";
import getInterviewquestions from "./interviewReducer"
import ResumeSearchStatus from './ResumeSearch'
import GetInterviewers from './InterviewSchedule'
import GetDesignation from './InterviewSchedule'
import GetEmployeeApprove from './EmployeeApproveReducer'
import insertInterviewquestions from "./interviewReducer";
import getemplyoeeformid from "./employeeformReducer";
import getResumeSearchDropDownOptions from "./MasterDropdowns";
import getResumeSearchRowdata from "./ResumeSearchRowdata";
import getHrTodoList from "./TodoListReducer";
import interviewApproverTableData from "./interviewApproverReducer"


export default combineReducers({
    getInterviewquestions,
    ResumeSearchStatus,
    GetInterviewers,
    GetDesignation,
    GetEmployeeApprove,
    insertInterviewquestions,
    getemplyoeeformid,
    getOptions:getResumeSearchDropDownOptions,
    getResumeSearchRowdata,
    getHrTodoList,
    interviewApproverTableData
})
