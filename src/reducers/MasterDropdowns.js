import { GET_SKILLS } from "../utils/Constants.js";
import { GET_TRAITS } from "../utils/Constants.js";
import { GET_CERTIFICATION } from "../utils/Constants.js";
import { GET_ACHIEVEMENT } from "../utils/Constants.js";
import { GET_SPECILIZATION } from "../utils/Constants.js";
import { GET_CAPABILITY } from "../utils/Constants.js";
import { USER_GET_CLASS, USER_GET_STATUS } from '../utils/Constants.js';
import { GET_CATEGORY, GET_SUBCATEGORY } from "../utils/Constants.js";
import {
  GET_TALENTS,
  GET_DESIGNATION_LIST,
  GET_DEPARTMENT,
  GET_LOCATION_LIST,
  GET_INTERVIEWERS_LIST, GET_FREQUENCY,
  GET_INTERVIEW_STATUS, GET_CANDIDATES_NAMES, GET_TEMPLATE_NAME, GET_CHECKLIST_TYPE, GET_CHECKLIST_CAT
} from "../utils/Constants.js";
import {
  GET_STATUS,
  GET_QUALIFICATION,
  GET_INDUSTRY,
  GET_STAGELIST,
  GET_PROJECT_SUB_TYPE,
  GET_PROCESS_TYPE,
  GET_SUB_STAGE,
  GET_INTERVIEW_APPROVER,
  GET_CLIENT_TYPE,
  GET_CLIENT,
  GET_PROJECT_TYPE,
  GET_PROJECT_NAME,
  GET_BILLABLE_TYPE,
  GET_FILING_TYPE,
  GET_EMPLOYEE_LIST,
  GET_CLIENT_LIST,
  GET_PROJECT_COST_RANGE,
  GET_COURT_LOCATION,
  GET_TRADE_MARK_STATUS,
  GET_CASE_TYPE,
  GET_SUB_CASE_TYPE, GET_QUATIONTYPE,
  GET_EMP_LIST_DEPARTMENT,
  GET_PROJECT_NAME_BY_DESIG
} from "../utils/Constants.js";
import {
  GET_RESOURCE_TYPE,
  GET_INSTITUTE,
  GET_SPECIAL_INTEREST,
  GET_STATE,
  GET_CITY,
  GET_LANGUAGES,
  GET_ACTIVITY,
  GET_SUBACTIVITY,
  GET_LITIGATION_COUNSEL,
  GET_LEAVETYPE, GET_USERGROUP,
  GET_CITY_BY_ID,
  GET_AREA_DEVELOPMENT, GET_DEVELOPMENT
} from "../utils/Constants.js";

const initalState = {
  getResourcesType: [],
  getInstitute: [],
  getSpecialInterest: [],
  getState: [],
  getCity: [],
  getLanguages: [],
  getSkills: [],
  getTraits: [],
  getCertification: [],
  getAchievement: [],
  getSpecilization: [],
  getCapability: [],
  getTalents: [],
  getStatus: [],
  getQualification: [],
  getIndustry: [],
  getProjectSubType: [],
  getProcessType: [],
  getSubStage: [],
  getInterviewApprover: [],
  getClientType: [],
  getClient: [],
  getProjectType: [],
  getProjectName: [],
  getBillableType: [],
  getFilingType: [],
  getEmpListDepartment: [],
  getProjectCostRange: [],
  getClientlist: [],
  getStageList: [],
  getDesignationList: [],
  getLoactionList: [],
  getDepartment: [],
  getInterviewersList: [],
  getInterviewStatus: [],
  getCourtLocation: [],
  GET_TRADE_MARK_STATUS: [],
  getCaseType: [],
  getSubCaseType: [],
  getActivity: [],
  getSubactivity: [],
  getLitigationCounsel: [],
  getLeaveType: [],
  getClass: [],
  getUserStatus: [],
  getUserGroup: [],
  getCategory: [],
  getCity_By_Id: [],
  getSubCategory: [],
  getQuestionType: [],
  getCandidateName: [],
  GetTemplateName: [],
  getCchecklistcategory: [],
  getCchecklisttype: [],
  getFrequency: [],
  GetAreaDevelopment: [],
  GetDevelopment: [],
  getEmployeeList:[],
  get_projectName_by_Desig:[]
};

export default function (state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RESOURCE_TYPE:
      return { ...state, getResourcesType: payload };
    case GET_INSTITUTE:
      return { ...state, getInstitute: payload };
    case GET_SPECIAL_INTEREST:
      return { ...state, getSpecialInterest: payload };
    case GET_STATE:
      return { ...state, getState: payload };
    case GET_CITY:
      return { ...state, getCity: payload };
    case GET_CITY_BY_ID:
      return { ...state, getCity_By_Id: payload };
    case GET_LANGUAGES:
      return { ...state, getLanguages: payload };
    case GET_SKILLS:
      return { ...state, getSkills: payload };
    case GET_TRAITS:
      return { ...state, getTraits: payload };
    case GET_CERTIFICATION:
      return { ...state, getCertification: payload };
    case GET_ACHIEVEMENT:
      return { ...state, getAchievement: payload };
    case GET_SPECILIZATION:
      return { ...state, getSpecilization: payload };
    case GET_CAPABILITY:
      return { ...state, getCapability: payload };
    case GET_TALENTS:
      return { ...state, getTalents: payload };
    case GET_STATUS:
      return { ...state, getStatus: payload };
    case GET_QUALIFICATION:
      return { ...state, getQualification: payload };
    case GET_INDUSTRY:
      return { ...state, getIndustry: payload };
    case GET_PROJECT_SUB_TYPE:
      return { ...state, getProjectSubType: payload };
    case GET_PROCESS_TYPE:
      return { ...state, getProcessType: payload };
    case GET_SUB_STAGE:
      return { ...state, getSubStage: payload };
    case GET_INTERVIEW_APPROVER:
      return { ...state, getInterviewApprover: payload };
    case GET_CLIENT_TYPE:
      return { ...state, getClientType: payload };
    case GET_CLIENT:
      return { ...state, getClient: payload };
    case GET_PROJECT_TYPE:
      return { ...state, getProjectType: payload };
    case GET_PROJECT_NAME:
      return { ...state, getProjectName: payload };
    case GET_BILLABLE_TYPE:
      return { ...state, getBillableType: payload };
    case GET_FILING_TYPE:
      return { ...state, getFilingType: payload };
    case GET_EMPLOYEE_LIST:
      return { ...state, getEmployeeList: payload };
    case GET_DESIGNATION_LIST:
      return { ...state, getDesignationList: payload };
    case GET_LOCATION_LIST:
      return { ...state, getLoactionList: payload };
    case GET_DEPARTMENT:
      return { ...state, getDepartment: payload };
    case GET_INTERVIEWERS_LIST:
      return { ...state, getInterviewersList: payload };
    case GET_INTERVIEW_STATUS:
      return { ...state, getInterviewStatus: payload };
    case GET_COURT_LOCATION:
      return { ...state, getCourtLocation: payload };
    case GET_TRADE_MARK_STATUS:
      return { ...state, getTradeMarkStatus: payload };
    case GET_CASE_TYPE:
      return { ...state, getCaseType: payload };
    case GET_SUB_CASE_TYPE:
      return { ...state, getSubCaseType: payload };
    case GET_PROJECT_COST_RANGE:
      return { ...state, getProjectCostRange: payload };
    case GET_CLIENT_LIST:
      return { ...state, getClientlist: payload };
    case GET_STAGELIST:
      return { ...state, getStageList: payload };
    case GET_ACTIVITY:
      return { ...state, getActivity: payload };
    case GET_SUBACTIVITY:
      return { ...state, getSubactivity: payload };
    case GET_LITIGATION_COUNSEL:
      return { ...state, getLitigationCounsel: payload };
    case GET_LEAVETYPE:
      return { ...state, getLeaveType: payload };
    case USER_GET_CLASS:
      return { ...state, getClass: payload };
    case USER_GET_STATUS:
      return { ...state, getUserStatus: payload };
    case GET_USERGROUP:
      return { ...state, getUserGroup: payload };
    case GET_CATEGORY:
      return { ...state, getCategory: payload };
    case GET_SUBCATEGORY:
      return { ...state, getSubCategory: payload };
    case GET_QUATIONTYPE:
      return { ...state, getQuestionType: payload };
    case GET_CANDIDATES_NAMES:
      return { ...state, getCandidateName: payload };
    case GET_TEMPLATE_NAME:
      return { ...state, GetTemplateName: payload };
    case GET_CHECKLIST_TYPE:
      return { ...state, getCchecklisttype: payload };
    case GET_CHECKLIST_CAT:
      return { ...state, getCchecklistcategory: payload };
    case GET_FREQUENCY:
      return { ...state, getFrequency: payload };
    case GET_AREA_DEVELOPMENT:
      return { ...state, GetAreaDevelopment: payload };
    case GET_DEVELOPMENT:
      return { ...state, GetDevelopment: payload };
    case GET_EMP_LIST_DEPARTMENT:
      return { ...state, getEmpListDepartment: payload };
      case GET_PROJECT_NAME_BY_DESIG:
        return { ...state, get_projectName_by_Desig: payload }; 
    default:
      return state;
  }
}
