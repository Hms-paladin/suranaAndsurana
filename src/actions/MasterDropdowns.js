import axios from "axios";
import { apiurl } from "../utils/baseUrl.js";

import { GET_CANDIDATES_NAMES, GET_SKILLS } from "../utils/Constants.js";
import { GET_TRAITS } from "../utils/Constants.js";
import { GET_CERTIFICATION } from "../utils/Constants.js";
import { GET_ACHIEVEMENT } from "../utils/Constants.js";
import { GET_SPECILIZATION } from "../utils/Constants.js";
import { GET_CAPABILITY } from "../utils/Constants.js";
import { GET_TALENTS } from "../utils/Constants.js";
import { GET_QUALIFICATION } from '../utils/Constants.js'
import { USER_GET_CLASS, USER_GET_STATUS } from '../utils/Constants'
import {
  GET_DESIGNATION_LIST,
  GET_RESOURCE_TYPE,
  GET_INSTITUTE,
  GET_SPECIAL_INTEREST,
  GET_STATE,
  GET_CITY,
  GET_TRADE_MARK_STATUS,
  GET_LANGUAGES,
  GET_DESIGNATION_LIST_BY_DEPT,
  GET_DEPARTMENT,
  GET_INTERVIEWERS_LIST,
  GET_INTERVIEW_STATUS,
  GET_CASE_TYPE,
  GET_SUB_CASE_TYPE,
  GET_CITY_BY_ID, GET_CHECKLIST_TYPE, GET_CHECKLIST_CAT, GET_FREQUENCY,
  GET_EMP_ALL,
  GET_EMP_LIST_DEPARTMENT
} from "../utils/Constants.js";
import {
  GET_STATUS,
  GET_INDUSTRY,
  GET_PROJECT_SUB_TYPE,
  GET_PROCESS_TYPE,
  GET_STAGELIST,
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
  GET_ACTIVITY,
  GET_LITIGATION_COUNSEL,
  GET_SUBACTIVITY,
  GET_LOCATION_LIST,
  GET_LEAVETYPE,
  GET_USERGROUP,
  GET_CATEGORY,
  GET_SUBCATEGORY,
  GET_QUATIONTYPE,
  GET_TEMPLATE_NAME,
  GET_FILING_TYPE_IPAB,
  GET_AREA_DEVELOPMENT,
  GET_DEVELOPMENT,
  GET_PROJECT_NAME_BY_DESIG,
  GET_SUPERVISOR_BY_DEPT,
  GET_EMP_LIST_PROJECT,
  GET_CLIENT_DETAILS
} from "../utils/Constants.js";
//_________________________________
export const getResourceType = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_resource_type");
  return dispatch({ type: GET_RESOURCE_TYPE, payload: response.data.data });
};
export const getInstitute = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_institute");
  return dispatch({ type: GET_INSTITUTE, payload: response.data.data });
};
export const getSpecialInterest = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_special_interest");
  return dispatch({ type: GET_SPECIAL_INTEREST, payload: response.data.data });
};
export const getStates = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_state");
  return dispatch({ type: GET_STATE, payload: response.data.data });
};
export const getCity = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_city");
  return dispatch({ type: GET_CITY, payload: response.data.data });
};
export const getLanguages = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_language");
  return dispatch({ type: GET_LANGUAGES, payload: response.data.data });
};
//___________________________
export const getSkills = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_skills");
  return dispatch({ type: GET_SKILLS, payload: response.data.data });
};

export const getTraits = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_traits");
  return dispatch({ type: GET_TRAITS, payload: response.data.data });
};

export const getCertification = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_certification");
  return dispatch({ type: GET_CERTIFICATION, payload: response.data.data });
};

export const getAchievement = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_achievement");
  return dispatch({ type: GET_ACHIEVEMENT, payload: response.data.data });
};

export const getSpecilization = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_specialization");
  return dispatch({ type: GET_SPECILIZATION, payload: response.data.data });
};

export const getCapability = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_capability");
  return dispatch({ type: GET_CAPABILITY, payload: response.data.data });
};

export const getTalents = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_talents");
  return dispatch({ type: GET_TALENTS, payload: response.data.data });
};

// export const getStatus = () => async (dispatch) => {
//   const response = await axios.get(apiurl + "/get_s_tbl_m_status");
//   return dispatch({ type: GET_STATUS, payload: response.data.data });
// };

export const getQualification = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_qual");
  return dispatch({ type: GET_QUALIFICATION, payload: response.data.data });
};

export const getIndustry = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_industry");
  return dispatch({ type: GET_INDUSTRY, payload: response.data.data });
};

export const getDepartment = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_department");
  return dispatch({ type: GET_DEPARTMENT, payload: response.data.data });
};

export const getInterviewers = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_interviewers");
  return dispatch({ type: GET_INTERVIEWERS_LIST, payload: response.data.data });
};
//HR-->ToDoList

export const getSupervisorByDepartment = (id) => async (dispatch) => {

  const response = await axios({
    method: "post",
    url: apiurl + "/get_supervisor_by_departmentId",
    data: {
      department_id: id,
    },
  });
  return dispatch({ type: GET_SUPERVISOR_BY_DEPT, payload: response.data.data });
};

export const getInterviewStatus = (id) => async (dispatch) => {
  //const response = await axios.get(apiurl + "/get_Interview_Status");
  const response = await axios({
    method: "post",
    url: apiurl + "/get_Interview_Status",
    data: {
      status_id: id,
    },
  });
  return dispatch({ type: GET_INTERVIEW_STATUS, payload: response.data.data });
};
export const getDesignationList = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_designation");
  return dispatch({ type: GET_DESIGNATION_LIST, payload: response.data.data });
};

export const getDesignationListByDept = () => async (dispatch) => {
  const response = await axios({
    method: "POST",
    url: apiurl + "/get_designation_by_departmentId",
    data: {
      department_id: localStorage.getItem("department_id"),
    },
  });
  return dispatch({ type: GET_DESIGNATION_LIST_BY_DEPT, payload: response.data.data });
};
export const getLoactionsList = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_location_office_ticket");
  return dispatch({ type: GET_LOCATION_LIST, payload: response.data.data });
};

// Project Search dropdown

export const getClientType = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_client_type");
  return dispatch({ type: GET_CLIENT_TYPE, payload: response.data.data });
};

export const getClient = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_client",
    data: {
      client_id: id,
    },
  });
  return dispatch({ type: GET_CLIENT, payload: response.data.data });
};

export const getProjectType = () => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_project_type_department",
    data: {
      emp_id: localStorage.getItem("empId"),
    },
  });
  return dispatch({ type: GET_PROJECT_TYPE, payload: response.data.data });
};

export const getProjectName = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_project_name");
  return dispatch({ type: GET_PROJECT_NAME, payload: response.data.data });
};

export const get_projectName_by_Desig = () => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_projectName_by_empIdandDesig",
    data: {
      emp_id: localStorage.getItem("empId"),
    },
  });
  return dispatch({ type: GET_PROJECT_NAME_BY_DESIG, payload: response.data.data });
};

export const getBillableType = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_billable_type");
  return dispatch({ type: GET_BILLABLE_TYPE, payload: response.data.data });
};

// Project form Create:

export const getProjectSubType = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_project_sub_type",
    data: {
      project_type_id: id,
    },
  });
  return dispatch({ type: GET_PROJECT_SUB_TYPE, payload: response.data.data });
};

export const getCity_By_Id = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_city_by_id",
    data: {
      state_id: id,
    },
  });

  return dispatch({ type: GET_CITY_BY_ID, payload: response.data.data });
};

export const getProcessType = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_process_type",
    data: {
      project_type_id: id.ProjectType,
      sub_project_type_id: id.ProjectSubtype,
    },
  });
  return dispatch({ type: GET_PROCESS_TYPE, payload: response.data.data });
};

export const getFilingType = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_filing_type",
    data: {
      project_type_id: id.ProjectType,
      sub_project_type_id: id.ProjectSubtype,
      process_id: id.ProcessType,
    },
  });
  return dispatch({ type: GET_FILING_TYPE, payload: response.data.data });
};

export const getFilingTypeIpab = () => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_filing_type_ipab",
    data: {
      filling_gp: 'IPAB',
    },
  });
  return dispatch({ type: GET_FILING_TYPE_IPAB, payload: response.data.data });
};

// get_employee_list (API) ==> Hod/Attony,Counsel,DRA and DDRA using with one api

export const getEmpListAll = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_employee_list");
  return dispatch({ type: GET_EMP_ALL, payload: response.data.data });
};

export const getEmployeeListForTicket = () => async (dispatch) => {
  //const response = await axios.get(apiurl + "/get_assigned_to_emmId_ticket");
  const response = await axios({
    method: "POST",
    url: apiurl + "get_assigned_to_emmId_ticket",
    data: {
      emp_id: localStorage.getItem("empId"),
    },
  });
  return dispatch({ type: GET_EMPLOYEE_LIST, payload: response.data.data });
};

export const getProjectCostRange = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_range");
  return dispatch({
    type: GET_PROJECT_COST_RANGE,
    payload: response.data.data,
  });
};

export const getClientlist = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_client_list");
  return dispatch({ type: GET_CLIENT_LIST, payload: response.data.data });
};

//StageMaster
export const getStageList = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_stage_list");
  return dispatch({ type: GET_STAGELIST, payload: response.data.data });
};

export const getSubStage = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_sub_stage",
    data: {
      stage_id: id,
    },
  });
  return dispatch({ type: GET_SUB_STAGE, payload: response.data.data });
};
//HRSchedule Interview Approver
export const getInterviewApprover = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_interview_approver");
  return dispatch({
    type: GET_INTERVIEW_APPROVER,
    payload: response.data.data,
  });
};

export const getLocation = () => async (dispatch) => {
  try {
    axios({
      method: "GET",
      url: apiurl + "get_court",
    }).then((response) => {
      dispatch({ type: GET_COURT_LOCATION, payload: response.data.data });
    });
  } catch (err) { }
};

export const getTradeMarkStatus = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_trade_mark_status");
  return dispatch({ type: GET_TRADE_MARK_STATUS, payload: response.data.data });
};
export const getCaseType = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_case_type");
  return dispatch({ type: GET_CASE_TYPE, payload: response.data.data });
};
export const getSubCaseType = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_sub_case",
    data: {
      client_id: id,
    },
  });
  return dispatch({ type: GET_SUB_CASE_TYPE, payload: response.data.data });
};

// TimeSheet==>

export const getActivity = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_activity");
  return dispatch({ type: GET_ACTIVITY, payload: response.data.data });
};

export const getSubactivity = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_sub_activity",
    data: {
      activity_id: id.Activity || id,
    },
  });
  return dispatch({ type: GET_SUBACTIVITY, payload: response.data.data });
};

//Litigation
export const getLitigationCounsel = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_litigation_councel");
  return dispatch({ type: GET_LITIGATION_COUNSEL, payload: response.data.data });
};
// Leave Update


export const getLeaveType = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_leave_type");
  return dispatch({ type: GET_LEAVETYPE, payload: response.data.data });
};

// user master dropdown
export const getClass = () => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_class",
    data: {
      class_type: "1",
    },
  });
  return dispatch({ type: USER_GET_CLASS, payload: response.data.data });
};
export const UsergetStatus = () => async (dispatch) => {
  const response = await axios({
    method: "get",
    url: apiurl + "get_status_type",
  });
  return dispatch({ type: USER_GET_STATUS, payload: response.data.data });
};
//GET_USERGROUP

export const getUserGroup = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/getGroupMaster");
  return dispatch({ type: GET_USERGROUP, payload: response.data.data });
};

// Online test - Ad questions

export const getQuestionType = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/questiontype");
  return dispatch({ type: GET_QUATIONTYPE, payload: response.data.data });
};
//Test Template
export const getCategory = () => async (dispatch) => {
  try {
    axios({
      method: 'GET',
      url: apiurl + "category",
    })
      .then((response) => {
        dispatch({ type: GET_CATEGORY, payload: response.data.data })
      });
  }
  catch (err) { }
}

export const getCheckListType = () => async (dispatch) => {
  try {
    axios({
      method: 'GET',
      url: apiurl + "get_checklist_type",
    })
      .then((response) => {
        dispatch({ type: GET_CHECKLIST_TYPE, payload: response.data.data })
      });
  }
  catch (err) { }
}

export const getCheckListCategory = () => async (dispatch) => {
  try {
    axios({
      method: 'GET',
      url: apiurl + "get_category",
    })
      .then((response) => {
        dispatch({ type: GET_CHECKLIST_CAT, payload: response.data.data })
      });
  }
  catch (err) { }
}

export const getFrequency = () => async (dispatch) => {
  try {
    axios({
      method: 'GET',
      url: apiurl + "get_frequency",
    })
      .then((response) => {
        dispatch({ type: GET_FREQUENCY, payload: response.data.data })
      });
  }
  catch (err) { }
}

export const getSubCategory = (id) => async (dispatch) => {
  try {
    const response = await axios({
      method: 'POST',
      url: apiurl + "subcategory",
      data: {
        categoryId: id
      }
    });
    return dispatch({ type: GET_SUBCATEGORY, payload: response.data.data });
  }
  catch (err) { }
}

//get_candidate_name

export const getCandidateName = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_candidate_name");
  return dispatch({ type: GET_CANDIDATES_NAMES, payload: response.data.data });
};

export const GetTemplateName = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/onlineTestTemplateList");
  return dispatch({ type: GET_TEMPLATE_NAME, payload: response.data.data });
};

// Appraisal 
export const GetAreaDevelopment = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_area_development");
  return dispatch({ type: GET_AREA_DEVELOPMENT, payload: response.data.data });
};

export const GetDevelopment = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_development");
  return dispatch({ type: GET_DEVELOPMENT, payload: response.data.data });
};

export const getEmployeeList = () => async dispatch => {

  await axios({
    method: 'POST',
    url: apiurl + 'get_emp_supervisor',
    data: {
      "emp_id": localStorage.getItem("empId"),
    }
  })
    .then((response) => {
      dispatch({ type: GET_EMPLOYEE_LIST, payload: response.data.data })
    })

}

export const getEmpListDepartment = () => async dispatch => {

  await axios({
    method: 'POST',
    url: apiurl + 'get_emplist_department',
    data: {
      "emp_id": localStorage.getItem("empId"),
    }
  })
    .then((response) => {
      dispatch({ type: GET_EMP_LIST_DEPARTMENT, payload: response.data.data })
    })

}
export const getEmpListByProjectId = (project_id) => async dispatch => {

  await axios({
    method: 'POST',
    url: apiurl + 'get_emp_by_projectId',
    data: {
      "project_id": project_id,
    }
  })
    .then((response) => {
      dispatch({ type: GET_EMP_LIST_PROJECT, payload: response.data.data })
    })
}

export const getClientDetails = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_client_details");
  return dispatch({ type: GET_CLIENT_DETAILS, payload: response.data.data });
};
