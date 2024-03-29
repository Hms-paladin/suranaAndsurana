import { combineReducers } from "redux";
import getInterviewquestions from "./interviewReducer";
import ResumeSearchStatus from "./ResumeSearch";
import InterviewSchedule from "./InterviewSchedule";
import GetEmployeeApprove from "./EmployeeApproveReducer";
import insertInterviewquestions from "./interviewReducer";
import getemplyoeeformid from "./employeeformReducer";
import getResumeSearchDropDownOptions from "./MasterDropdowns";
import getResumeSearchRowdata from "./ResumeSearchRowdata";
import getHrTodoList from "./TodoListReducer";
import interviewApproverTableData from "./interviewApproverReducer";
import HrSearchRowData from "./HrSearchRowData";
import LeaveFormReducer from "./LeaveFormReducer";
import variableRateMaster from "./variableRateMaster";
import projectSearchReducer from "./ProjectSearchReducers";
import ProjectFillingFinalReducer from "./ProjectFillingFinalReducer";
import StageMasterReducer from "./StageMasterReducer";
import CandidateAndEmployeeDetails from "./CandidateAndEmployeeDetails";
import projectTasksReducer from "./projectTasksReducer";
import LitigationReducer from "./LitigationReducer";
import IPDropdownReducer from "./IPDropdownReducer";
import tradeMarkReducer from "./tradeMarkReducer";
import copyrightReducer from "./copyrightReducer";
import PatentReducer from "./PatentReducer";
import LeaveUpdateReducer from "./LeaveUpdateReducer";
import UserMasterReducer from './UserMasterReducer';
import UserGroupReducer from "./UserGroupReducer";
import UserPermissionReducer from "./UserPermissionReducer";
import EmployeeListReducer from "./EmployeeListReducer";
import TicketCreationReducer from './TicketCreationReducer';
import StageMonotorReducer from './StageMonotorReducer';
import AddClientReducer from './AddClientReducer';
import getDesignDetails from "./insertDesign";
import getTaskList from './TimeSheetReducer';
import GetResumeList from './ResumeReducer';
import ExitSeverance from './ExitSeveranceReducers'
import AddQuations from "./AddQuationsReducer";
import OnlineTest from './OnlineTestREducer';
import KraReducer from './KraReducer';
import CheckListReducer from './CheckListReducer';
import OutofPacket from './OutofPacketReducers'
import KpiReducer from './KPIReducers';
import GetEmpAppraisalDetails from './AppraisalReducer';
import ProjectformReducers from './ProjectformReducers';
import GenerateInvoiceReducer from './GenerateInvoiceReducer';

export default combineReducers({
  getInterviewquestions,
  ResumeSearchStatus,
  InterviewSchedule,
  GetEmployeeApprove,
  insertInterviewquestions,
  interviewApproverTableData,
  HrSearchRowData,
  variableRateMaster,
  projectSearchReducer,
  ProjectFillingFinalReducer,
  StageMasterReducer,
  CandidateAndEmployeeDetails,
  projectTasksReducer,
  LitigationReducer,
  tradeMarkReducer,
  getemplyoeeformid,
  getOptions: getResumeSearchDropDownOptions,
  getResumeSearchRowdata,
  getHrTodoList,
  LeaveFormReducer,
  IPDropdownReducer,
  PatentReducer,
  copyrightReducer,
  LeaveUpdateReducer,
  UserMasterReducer,
  UserGroupReducer,
  UserPermissionReducer,
  EmployeeListReducer,
  StageMonotorReducer,
  TicketCreationReducer,
  AddClientReducer,
  getDesignDetails,
  getTaskList,
  GetResumeList,
  ExitSeverance,
  AddQuations,
  OnlineTest,
  KraReducer,
  CheckListReducer,
  OutofPacket,
  KpiReducer,
  GetEmpAppraisalDetails,
  ProjectformReducers,
  GenerateInvoiceReducer
});


