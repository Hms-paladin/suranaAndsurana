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
import HrSearchRowData from "./HrSearchRowData";
import variableRateMaster from "./variableRateMaster"
import projectSearchReducer from "./ProjectSearchReducers"
import ProjectFillingFinalReducer from "./ProjectFillingFinalReducer"
import StageMasterReducer from "./StageMasterReducer"
import CandidateAndEmployeeDetails from "./CandidateAndEmployeeDetails"
import projectTasksReducer from "./projectTasksReducer"
import LitigationReducer from "./LitigationReducer"
import tradeMarkReducer from "./tradeMarkReducer"
import PatentReducer from "./PatentReducer"
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
    interviewApproverTableData,HrSearchRowData,
    variableRateMaster,projectSearchReducer,ProjectFillingFinalReducer,StageMasterReducer,CandidateAndEmployeeDetails,
    projectTasksReducer,LitigationReducer,tradeMarkReducer,PatentReducer
})
