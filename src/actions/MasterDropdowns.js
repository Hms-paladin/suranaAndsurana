import axios from "axios";
import { apiurl } from "../utils/baseUrl.js";


import { GET_SKILLS } from '../utils/Constants.js';
import { GET_TRAITS } from '../utils/Constants.js';
import { GET_CERTIFICATION } from '../utils/Constants.js';
import { GET_ACHIEVEMENT } from '../utils/Constants.js';
import { GET_SPECILIZATION } from '../utils/Constants.js';
import { GET_CAPABILITY } from '../utils/Constants.js';
import { GET_TALENTS } from '../utils/Constants.js';
import { GET_RESOURCE_TYPE,GET_INSTITUTE,GET_SPECIAL_INTEREST,GET_STATE,GET_CITY,GET_LANGUAGES } from '../utils/Constants.js';
import { GET_STATUS, GET_QUALIFICATION, GET_INDUSTRY, GET_PROJECT_SUB_TYPE, GET_PROCESS_TYPE, GET_STAGELIST ,GET_SUB_STAGE, GET_INTERVIEW_APPROVER, GET_CLIENT_TYPE, GET_CLIENT, GET_PROJECT_TYPE, GET_PROJECT_NAME, GET_BILLABLE_TYPE, GET_FILING_TYPE, GET_EMPLOYEE_LIST ,GET_CLIENT_LIST,GET_PROJECT_COST_RANGE} from '../utils/Constants.js';

//_________________________________
export const getResourceType = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_resource_type');
    return dispatch(({ type: GET_RESOURCE_TYPE, payload: response.data.data }));
};
export const getInstitute = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_institute');
    return dispatch(({ type: GET_INSTITUTE, payload: response.data.data }));
};
export const getSpecialInterest = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_special_interest');
    return dispatch(({ type: GET_SPECIAL_INTEREST, payload: response.data.data }));
};
export const getStates = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_state');
    return dispatch(({ type: GET_STATE, payload: response.data.data }));
};
export const getCity = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_city');
    return dispatch(({ type: GET_CITY, payload: response.data.data }));
};
export const getLanguages = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_language');
    return dispatch(({ type: GET_LANGUAGES, payload: response.data.data }));
};
//___________________________
export const getSkills = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_skills');
    return dispatch(({ type: GET_SKILLS, payload: response.data.data }));
};

export const getTraits = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_traits');
    return dispatch(({ type: GET_TRAITS, payload: response.data.data }));
};

export const getCertification = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_certification');
    return dispatch(({ type: GET_CERTIFICATION, payload: response.data.data }));
};

export const getAchievement = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_achievement');
    return dispatch(({ type: GET_ACHIEVEMENT, payload: response.data.data }));
};

export const getSpecilization = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_specialization');
    return dispatch(({ type: GET_SPECILIZATION, payload: response.data.data }));
};

export const getCapability = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_capability');
    return dispatch(({ type: GET_CAPABILITY, payload: response.data.data }));
};

export const getTalents = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_talents');
    return dispatch(({ type: GET_TALENTS, payload: response.data.data }));
};

export const getStatus = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_status');
    return dispatch(({ type: GET_STATUS, payload: response.data.data }));
};

export const getQualification = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_qual');
    return dispatch(({ type: GET_QUALIFICATION, payload: response.data.data }));
};

export const getIndustry = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_s_tbl_m_industry');
    return dispatch(({ type: GET_INDUSTRY, payload: response.data.data }));
};

// Project Search dropdown 

export const getClientType = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_client_type');
    return dispatch(({ type: GET_CLIENT_TYPE, payload: response.data.data }));
};


export const getClient = (id) => async (dispatch) => {
    const response = await axios({
        method: "post",
        url: apiurl + 'get_client',
        data: {
            "client_id": id,
        },
    })
    return dispatch(({ type: GET_CLIENT, payload: response.data.data }));
};

export const getProjectType = () => async (dispatch) => {
    const response = await axios.get(apiurl + 'get_project_type');
    return dispatch(({ type: GET_PROJECT_TYPE, payload: response.data.data }));
};

export const getProjectName = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_project_name');
    return dispatch(({ type: GET_PROJECT_NAME, payload: response.data.data }));
};


export const getBillableType = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_billable_type');
    return dispatch(({ type: GET_BILLABLE_TYPE, payload: response.data.data }));
};

// Project form Create:

export const getProjectSubType = (id) => async (dispatch) => {
    const response = await axios({
        method: "post",
        url: apiurl + 'get_project_sub_type',
        data: {
            "project_type_id": id,
        },
    })
    return dispatch(({ type: GET_PROJECT_SUB_TYPE, payload: response.data.data }));
};

export const getProcessType = (id) => async (dispatch) => {
    const response = await axios({
        method: "post",
        url: apiurl + 'get_process_type',
        data: {
            "project_type_id": id.ProjectType,
            "sub_project_type_id": id.ProjectSubtype
        },
    })
    return dispatch(({ type: GET_PROCESS_TYPE, payload: response.data.data }));
};

export const getFilingType = (id) => async (dispatch) => {
    const response = await axios({
        method: "post",
        url: apiurl + 'get_filing_type',
        data: {
            "project_type_id": id.ProjectType,
            "sub_project_type_id": id.ProjectSubtype,
            "process_id": id.ProcessType
        },
    })
    return dispatch(({ type: GET_FILING_TYPE, payload: response.data.data }));
};

// get_employee_list (API) ==> Hod/Attony,Counsel,DRA and DDRA using with one api

export const getEmployeeList = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_employee_list');
    return dispatch(({ type: GET_EMPLOYEE_LIST, payload: response.data.data }));
};

export const getProjectCostRange = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_range');
    return dispatch(({ type: GET_PROJECT_COST_RANGE, payload: response.data.data }));
};


export const getClientlist = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_client_list');
    return dispatch(({ type: GET_CLIENT_LIST, payload: response.data.data }));
};




//StageMaster
export const getStageList = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_stage_list');
    return dispatch(({ type: GET_STAGELIST, payload: response.data.data }));
};

export const getSubStage = (id) => async (dispatch) => {
    const response = await axios({
        method: "post",
        url: apiurl + 'get_sub_stage',
        data: {
            "stage_id": id,
        },
    })
    return dispatch(({ type: GET_SUB_STAGE, payload: response.data.data }));
};
//HRSchedule Interview Approver
export const getInterviewApprover = () => async (dispatch) => {
    const response = await axios.get(apiurl + '/get_interview_approver');
    return dispatch(({ type: GET_INTERVIEW_APPROVER, payload: response.data.data }));
};