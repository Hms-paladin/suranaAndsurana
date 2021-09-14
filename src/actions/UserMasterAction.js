import { INSERT_ACTIVITY, COMMON_INSERT_TEXT, GET_TABLE_NAME, INSERT_USER, GET_USER, MASTER_EMPLOYEE_DETAILS, EDIT_USER, DELETE_USER, GET_CANDIDATES_NAMES, INSERT_STATUS, INSERT_SUBSTAGE, INSERT_CLASS, INSERT_CHECKLIST } from "../utils/Constants";

import { GET_TABLE_GROUP, GET_USER_CLASS, COMMON_UPDATE_TEXT, UPDATE_SUBSTAGE, UPDATE_SUBACTIVITY } from '../utils/Constants'
import { get_emp_not_in_user } from "./UserGroupAction";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'
import moment from 'moment';
import {
  GET_TABLE_STATUS,
  GET_TABLE_SKILLS,
  GET_TABLE_TRATITS,
  GET_TABLE_CERTIFICATION,
  GET_TABLE_SPECIFICATION,
  GET_TABLE_QUALIFICATION,
  GET_TABLE_INDUSTRY,
  GET_TABLE_INSTITUTE,
  GET_TABLE_CAPABILITY,
  GET_TABLE_TALENTS,
  GET_TABLE_RESOURCE,
  GET_TABLE_DESGINATION,
  GET_TABLE_QUESTION,
  GET_TABLE_DEPARTMENT,
  GET_TABLE_ACTIVITY,
  GET_TABLE_COURT,
  GET_TABLE_SUB_STAGE,
  GET_TABLE_CLASS,
  GET_TABLE_SUBACTIVITY,
  GET_CHECKLIST,
  GET_CASE_TYPE,
  GET_COST_RANGE,
  GET_USER_STAGELIST,
  GET_CONTROLS,
  GET_LOCATION_LIST
} from '../utils/Constants'
export const get_Tablenames = () => async dispatch => {
  try {

    axios({
      method: 'GET',
      url: apiurl + 'get_table_names',
    })
      .then((response) => {
        dispatch(
          {
            type: GET_TABLE_NAME,
            payload: response.data
          }
        )
      })

  } catch (err) {

  }
}



export const insertUser = (UserMaster, password, changeActive) => async dispatch => {

  var DocumentData = new FormData();
  DocumentData.set("active_flag", changeActive === true ? 1 : 0)
  DocumentData.set("created_by", localStorage.getItem("empId"))
  DocumentData.set("email", UserMaster.emailid.value.trim())
  DocumentData.set("mobileno", UserMaster.mobilenumber.value)
  DocumentData.set("password", password)
  DocumentData.set("username", UserMaster.user_name.value)
  DocumentData.set("employee_id", UserMaster.emp_name.value)
  DocumentData.set("user_id", 0)
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insertUser',
      data: DocumentData
    }).then((response) => {
      if (response.data.status === 1) {
        notification.success({
          message: "User Inserted Successfully",
        });
        dispatch({ type: INSERT_USER, payload: response.data.status })
        dispatch(getUser())
        dispatch(get_emp_not_in_user())
        return Promise.resolve();
      }
    });

  } catch (err) {

  }
}

export const Common_insert_text = (data, state = false) => async dispatch => {


  try {
    axios({
      method: 'POST',
      url: apiurl + 'common_insert_text',
      data:
      {

        "table_names": data,
        "text_val": state?.groupname?.value ? state.groupname.value || "" : state?.skill_name?.value ? state.skill_name.value || "" :
          state?.traits_name?.value ? state.traits_name.value || "" : state?.certification_name?.value ? state.certification_name.value || "" :
            state?.specialization_name?.value ? state.specialization_name.value || "" : state?.qualification_name?.value ? state.qualification_name.value || "" :
              state?.industry?.value ? state.industry.value || "" : state?.institute?.value ? state.institute.value || "" : state?.capability?.value ? state.capability.value || "" :
                state?.talents?.value ? state.talents.value || "" : state?.resourse?.value ? state.resourse.value || "" : state?.designation?.value ? state.designation.value || "" :
                  state?.question?.value ? state.question.value || "" : state?.court?.value ? state.court.value || "" : state?.department?.value ? state.department.value || "" :
                    state?.activity?.value ? state.activity.value || "" : state?.stage_name?.value ? state.stage_name.value || "" : state?.case_type?.value ? state.case_type.value || "" :
                      state?.range?.value ? state.range.value || "" : state?.control.value ? state.control.value || "" : state?.office_Location.value ? state?.office_Location.value || "" : "",
        "created_by": localStorage.getItem("empId")


      },
    })
      .then((response) => {
        if (response.data.status === 1) {

          notification.success({
            message: response.data.msg
          })

          dispatch({ type: COMMON_INSERT_TEXT, payload: response.data.status })
          dispatch(getTableGroup())
          dispatch(getTableSkills())
          dispatch(getTableTraits())
          dispatch(getTableCertification())
          dispatch(getTableSpecification())
          dispatch(getTableQualification())
          dispatch(getTableIndustry())
          dispatch(getTableInsitute())
          dispatch(getTableCapability())
          dispatch(getTableTalents())
          dispatch(getTableResource())
          dispatch(getTableDesgination())
          dispatch(getTableQuestion())
          dispatch(getTableCourt())
          dispatch(getTableDepartment())
          dispatch(getTableActivity())
          dispatch(getCaseType())
          dispatch(getProjectCostRange())
          dispatch(getStageList())
          dispatch(getControls())
          dispatch(getLoactionsList())
          return Promise.resolve();
        }

      });

  }
  catch (err) {
    notification.error({
      message: 'Something Went Wrong,Record Not Added',
    });
  }
}

export const Common_Update_text = (data, state, editId, Editvisible) => async dispatch => {



  try {
    axios({
      method: 'POST',
      url: apiurl + 'common_update_text',
      data:
      {
        "id": Editvisible && state?.groupname?.value ? editId?.group?.group_id : state?.skill_name?.value ? editId?.skills.skill_id :
          state?.traits_name?.value ? editId?.traits.traitTable : state?.certification_name?.value ? editId?.certification.certification_id :
            state?.specialization_name?.value ? editId?.specification.specialization_id : state?.qualification_name?.value ? editId?.qualification.qualification_id :
              state?.industry?.value ? editId?.industry.industry_id : state?.institute?.value ? editId?.institute.institute_id :
                state?.capability?.value ? editId?.capability.capability_id : state?.talents?.value ? editId?.talents.talent_id :
                  state?.resourse?.value ? editId?.resource.resource_type_id : state?.designation?.value ? editId?.designation.designation_id :
                    state?.question?.value ? editId?.question.question_id : state?.department?.value ? editId?.department.department_id :
                      state?.activity?.value ? editId?.activity.activity_id : state?.court?.value ? editId?.court.location_id :
                        state?.range?.value ? editId?.range.range_id : state?.stage_name?.value ? editId?.stage.stage_id :
                          state?.case_type?.value ? editId?.casetype.case_type_id : state?.control.value ? editId?.control.screen_control_id : state?.office_Location.value ? editId?.office_Location.office_location_id : 0,
        "table_names": data,
        "text_val": state?.groupname?.value ? state.groupname.value || "" : state?.skill_name?.value ? state?.skill_name?.value || "" :
          state?.traits_name?.value ? state.traits_name.value || "" : state?.certification_name?.value ? state.certification_name.value || "" :
            state?.specialization_name?.value ? state.specialization_name.value || "" : state?.qualification_name?.value ? state.qualification_name.value || "" :
              state?.industry?.value ? state.industry.value || "" : state?.institute?.value ? state.institute.value || "" : state?.capability?.value ? state.capability.value || "" :
                state?.talents?.value ? state.talents.value || "" : state?.resourse?.value ? state.resourse.value || "" : state?.designation?.value ? state.designation.value || "" :
                  state?.question?.value ? state.question.value || "" : state?.department?.value ? state.department.value || "" : state?.court?.value ? state.court.value || "" :
                    state?.activity?.value ? state.activity.value || "" : state?.stage_name?.value ? state.stage_name.value || "" : state?.case_type?.value ? state.case_type.value || "" :
                      state?.range?.value ? state.range.value || "" : state?.control.value ? state.control.value || "" : state?.office_Location.value ? state?.office_Location.value || "" : "",
        "updated_by": localStorage.getItem("empId")

      },
    })
      .then((response) => {
        if (response.data.status === 1) {

          notification.success({
            message: response.data.msg,
          });
          dispatch({ type: COMMON_UPDATE_TEXT, payload: response.data.status })

          dispatch(getTableGroup())
          dispatch(getTableSkills())
          dispatch(getTableTraits())
          dispatch(getTableCertification())
          dispatch(getTableSpecification())
          dispatch(getTableQualification())
          dispatch(getTableIndustry())
          dispatch(getTableInsitute())
          dispatch(getTableCapability())
          dispatch(getTableTalents())
          dispatch(getTableResource())
          dispatch(getTableDesgination())
          dispatch(getTableCourt())
          dispatch(getTableDepartment())
          dispatch(getTableQuestion())
          dispatch(getProjectCostRange())
          dispatch(getStageList())
          dispatch(getTableActivity())
          dispatch(getTableCourt())
          dispatch(getCaseType())
          dispatch(getControls())
          dispatch(getLoactionsList())
          return Promise.resolve();
        }

      });

  }
  catch (err) {
    notification.error({
      message: 'Something Went Wrong,Record Not Updated',
    });
  }
}

// subactivity insert api 
export const InsertCheckList = (UserMaster, editdata, Editvisible) => async dispatch => {
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_check_list',
      data:
      {
        "check_list_id": Editvisible ? editdata && editdata.check_list_id : 0,
        "check_list": UserMaster.checklist_name.value,
        "project_type_id": UserMaster.project_type.value,
        "created_on": moment().format("YYYY-MM-DD HH:m:s"),
        "created_by": localStorage.getItem("empId")
      },
    })
      .then((response) => {
        if (response.data.status === 1) {
          dispatch({ type: INSERT_CHECKLIST, payload: response.data.status })
          notification.success({
            message: response.data.msg,
          });
          dispatch(getCheckList())
          return Promise.resolve();
        } else {
          notification.success({
            message: response.data.msg,
          });
        }
      });
  }
  catch (err) {
    notification.error({
      message: 'Something Went Wrong,Record Not Added',
    });
  }
}


// class insert api 
export const InsertClass = (UserMaster, ClassId, Editvisible, Classtype_id) => async dispatch => {
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_class',
      data:
      {

        "class_id": Editvisible ? ClassId.class_id : 0,
        "class_type": UserMaster.class_type.value,
        "class": UserMaster.class_name.value,
        "class_description": UserMaster.description.value,
        "created_on": moment().format("YYYY-MM-DD HH:m:s"),
        "created_by": localStorage.getItem("empId")
      },
    })
      .then((response) => {

        if (response.data.status === 1) {
          notification.success({
            message: response.data.msg,
          });
          // dispatch(getClass())
          dispatch({ type: INSERT_CLASS, payload: response.data.status })
          dispatch(getTableClass(Classtype_id))
          return Promise.resolve();
        }
        else if (response.data.status === 0) {
          notification.success({
            message: response.data.data,
          });
          return Promise.resolve();

        }
      });

  }
  catch (err) {
    notification.error({
      message: 'Something Went Wrong,Record Not Added',
    });
  }
}

// subactivity insert api 
export const InsertSubActivity = (UserMaster, EditId, Editvisible, ActivityId) => async dispatch => {

  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_sub_activity',
      data:
      {
        "activity": UserMaster.activity_drop.value,
        "sub_activity": UserMaster.sub_activity.value,
        // "sub_activity_id":Editvisible?EditId.sub_activity_id:0,
      },
    })
      .then((response) => {
        if (response.data.status === 1) {
          notification.success({
            message: response.data.msg,
          });
          dispatch({ type: INSERT_ACTIVITY, payload: response.data.status })

          dispatch(getSubActivity(ActivityId))
          return Promise.resolve();
        }
        else if (response.data.status === 0) {
          notification.success({
            message: response.data.msg,
          });
          return Promise.resolve();
        }
      });
  }
  catch (err) {
    notification.error({
      message: 'Something Went Wrong,Record Not Added',
    });
  }
}

// subactivity update api 
export const UpdateSubActivity = (UserMaster, EditId, Editvisible, ActivityId) => async dispatch => {

  try {
    axios({
      method: 'POST',
      url: apiurl + 'update_sub_activity',
      data:
      {
        "activity": UserMaster.activity_drop.value,
        "sub_activity": UserMaster.sub_activity.value,
        "sub_activity_id": Editvisible ? EditId.sub_activity_id : 0,
      },
    })
      .then((response) => {
        if (response.data.status === 1) {
          notification.success({
            message: response.data.msg,
          });
          dispatch({ type: UPDATE_SUBACTIVITY, payload: response.data.status })

          dispatch(getSubActivity(ActivityId))
          return Promise.resolve();
        }
        else if (response.data.status === 0) {
          notification.success({
            message: response.data.msg,
          });
          return Promise.resolve();
        }
      });
  }
  catch (err) {
    notification.error({
      message: 'Something Went Wrong,Record Not Added',
    });
  }
}


// stage insert api
export const InsertSubstage = (UserMaster, id) => async dispatch => {
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_sub_stage',
      data:
      {
        "stage_id": UserMaster.stage_dropdown.value,
        // "sub_stage_id": Editvisible?stageId&&stageId.sub_stage_id:0,
        "sub_stage": UserMaster.sub_stage.value,
        "created_on": moment().format("YYYY-MM-DD HH:m:s"),
        "created_by": localStorage.getItem("empId")
      },
    })
      .then((response) => {
        if (response.data.status === 1) {
          notification.success({
            message: response.data.msg,
          });
          dispatch({ type: INSERT_SUBSTAGE, payload: response.data.status })

          dispatch(getSubStage(id))
          return Promise.resolve();
        }

      });
  }
  catch (err) {
    notification.error({
      message: 'Something Went Wrong,Record Not Added',
    });
  }
}

export const UpdateSubstage = (UserMaster, stageId, Editvisible, id) => async dispatch => {
  try {
    axios({
      method: 'POST',
      url: apiurl + 'update_sub_stage',
      data:
      {

        "stage_id": UserMaster.stage_dropdown.value,
        "sub_stage_id": Editvisible ? stageId && stageId.sub_stage_id : 0,
        "sub_stage": UserMaster.sub_stage.value,
        "updated_on": moment().format("YYYY-MM-DD HH:m:s"),
        "updated_by": localStorage.getItem("empId")

      },
    })
      .then((response) => {
        if (response.data.status === 1) {
          notification.success({
            message: response.data.msg,
          });
          dispatch({ type: UPDATE_SUBSTAGE, payload: response.data.status })

          dispatch(getSubStage(id))
          return Promise.resolve();
        }

      });
  }
  catch (err) {
    notification.error({
      message: 'Something Went Wrong,Record Not Added',
    });
  }
}
// insert status insert api
export const InsertStatus = (UserMaster, StatusId, Editvisible, Statusvalue) => async dispatch => {
  console.log(StatusId, "StatusId")
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_status_master',
      data:
      {
        "status_id": Editvisible ? StatusId.status_id : 0,
        "status_type": Statusvalue?.value,
        "status": UserMaster.status_name.value,
        "created_on": moment().format("YYYY-MM-DD"),
        "created_by": localStorage.getItem("empId")
      }
    })
      .then((response) => {
        if (response.data.status === 1) {
          notification.success({
            message: response.data.msg,
          });


          dispatch({ type: INSERT_STATUS, payload: response.data.status })
          dispatch(getTableStatus({ value: Statusvalue && Statusvalue?.value }))
          return Promise.resolve();
        }
        else if (response.data.status === 0) {
          notification.success({
            message: response.data.msg,
          });
          return Promise.resolve();

        }
      });
  }
  catch (err) {
    notification.error({
      message: 'Something Went Wrong,Record Not Added',
    });
  }
}



export const getUser = () => async dispatch => {

  try {

    axios({
      method: "GET",
      url: apiurl + "getUser",
      data: {

      },
    }).then((response) => {
      if (response.data.status === 1) {
        dispatch({ type: GET_USER, payload: response.data.data })
        return Promise.resolve();
      }
    });

  } catch (err) {

  }
}

export const editUser = (UserMaster, password, changeActive, user_id) => async dispatch => {


  var DocumentData = new FormData();
  DocumentData.set("active_flag", changeActive === true ? 1 : 0)
  DocumentData.set("created_by", localStorage.getItem("empId"))
  DocumentData.set("email", UserMaster.emailid.value)
  DocumentData.set("mobileno", UserMaster.mobilenumber.value)
  DocumentData.set("password", password)
  DocumentData.set("username", UserMaster.user_name.value)
  DocumentData.set("employee_id", UserMaster.emp_name.value)
  DocumentData.set("user_id", user_id)
  try {
    axios({
      method: 'PUT',
      url: apiurl + 'editUser',
      data: DocumentData
    }).then((response) => {
      if (response.data.status === 1) {
        notification.success({
          message: "User Edited Successfully",
        });
        dispatch({ type: EDIT_USER, payload: response.data.status })
        dispatch(getUser())
        return Promise.resolve();
      }
    });

  } catch (err) {

  }
}

export const deleteUser = (user_id) => async dispatch => {

  var DocumentData = new FormData();
  DocumentData.set("user_id", user_id.user_id)

  try {
    axios({
      method: 'DELETE',
      url: apiurl + 'deleteUser',
      data: DocumentData
    }).then((response) => {
      if (response.data.status === 1) {
        notification.success({
          message: "User Deleted Successfully",
        });
        dispatch({ type: DELETE_USER, payload: response.data.status })
        dispatch(getUser())
        return Promise.resolve();
      }
    });

  } catch (err) {

  }
}

export const getCandidateName = () => async dispatch => {

  try {

    axios({
      method: "GET",
      url: apiurl + "getCandidateName",
    }).then((response) => {
      if (response.data.status === 1) {
        dispatch({ type: GET_CANDIDATES_NAMES, payload: response.data.data })
        return Promise.resolve();
      }
    });

  } catch (err) {

  }
}


export const GetEmployeeDetails = (data) => async dispatch => {

  try {
    if (data) {
      axios({
        method: "post",
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        url: apiurl + "get_employee_by_id",
        data: {
          "emp_id": data
        }
      })
        .then((response) => {
          dispatch({ type: MASTER_EMPLOYEE_DETAILS, payload: response.data.data })
        })
    } else {
      dispatch({ type: MASTER_EMPLOYEE_DETAILS, payload: [] })
    }
  } catch (err) {

  }
}
// get class dropdown


export const getClass = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_project_sub_type",
    data: {
      "project_type_id": "1"
    },
  });
  return dispatch({ type: GET_USER_CLASS, payload: response.data.data });
};

// table get api
export const getTableStatus = (id) => async (dispatch) => {
  //  alert(id?.value)
  const response = await axios({
    method: "post",
    url: apiurl + "get_s_tbl_m_status",
    data: {
      "status_type": id?.value
    },
  });
  return dispatch({ type: GET_TABLE_STATUS, payload: response.data.data });
};
export const getTableGroup = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_group");
  return dispatch({ type: GET_TABLE_GROUP, payload: response.data.data });
};
export const getCaseType = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_case_type");
  return dispatch({ type: GET_CASE_TYPE, payload: response.data.data });
};
export const getTableSkills = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_skills");
  return dispatch({ type: GET_TABLE_SKILLS, payload: response.data.data });
};
export const getTableTraits = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_traits");
  return dispatch({ type: GET_TABLE_TRATITS, payload: response.data.data });
};
export const getTableCertification = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_certification");
  return dispatch({ type: GET_TABLE_CERTIFICATION, payload: response.data.data });
};
export const getTableSpecification = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_specialization");
  return dispatch({ type: GET_TABLE_SPECIFICATION, payload: response.data.data });
};
export const getTableQualification = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_qual");
  return dispatch({ type: GET_TABLE_QUALIFICATION, payload: response.data.data });
};
export const getTableIndustry = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_industry");
  return dispatch({ type: GET_TABLE_INDUSTRY, payload: response.data.data });
};
export const getTableInsitute = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_institute");
  return dispatch({ type: GET_TABLE_INSTITUTE, payload: response.data.data });
};
export const getTableCapability = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_capability");
  return dispatch({ type: GET_TABLE_CAPABILITY, payload: response.data.data });
};
export const getTableTalents = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_talents");
  return dispatch({ type: GET_TABLE_TALENTS, payload: response.data.data });
};
export const getTableResource = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_resource_type");
  return dispatch({ type: GET_TABLE_RESOURCE, payload: response.data.data });
};
export const getTableDesgination = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_designation");
  return dispatch({ type: GET_TABLE_DESGINATION, payload: response.data.data });
};
export const getTableQuestion = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_questions");
  return dispatch({ type: GET_TABLE_QUESTION, payload: response.data.data });
};
export const getTableDepartment = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_department");
  return dispatch({ type: GET_TABLE_DEPARTMENT, payload: response.data.data });
};
export const getTableActivity = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_activity");
  return dispatch({ type: GET_TABLE_ACTIVITY, payload: response.data.data });
};
export const getTableCourt = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_court");
  return dispatch({ type: GET_TABLE_COURT, payload: response.data.data });
};


export const getStageList = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_stage_list");
  return dispatch({ type: GET_USER_STAGELIST, payload: response.data.data });
};

export const getSubStage = (id) => async (dispatch) => {
  // alert(id)
  const response = await axios({
    method: "post",
    url: apiurl + "get_sub_stage",
    data: {
      "stage_id": id
    },
  });
  return dispatch({ type: GET_TABLE_SUB_STAGE, payload: response.data.data });
};

export const getTableClass = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_class",
    data: {
      class_type: id,
    },
  });
  return dispatch({ type: GET_TABLE_CLASS, payload: response.data.data });
};

export const getSubActivity = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_sub_activity",
    data: {
      activity_id: id,
    },
  });
  return dispatch({ type: GET_TABLE_SUBACTIVITY, payload: response.data.data });
};

export const getCheckList = (id) => async (dispatch) => {
  const response = await axios({
    method: "get",
    url: apiurl + "get_checklist_collection",
  });
  return dispatch({ type: GET_CHECKLIST, payload: response.data.data });
};


export const getProjectCostRange = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_range");
  return dispatch({
    type: GET_COST_RANGE,
    payload: response.data.data,
  });
};

export const getControls = (id) => async (dispatch) => {
  const response = await axios({
    method: "get",
    url: apiurl + "get_controls",
  });
  return dispatch({ type: GET_CONTROLS, payload: response.data.data });
};

export const getLoactionsList = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_location_office_ticket");
  return dispatch({ type: GET_LOCATION_LIST, payload: response.data.data });
};

export const insertDesignationMaster = (data) => async dispatch => {

  try {
    await axios({
      method: 'POST',
      url: apiurl + 'insert_designation_master',
      data: data
    }).then((response) => {
      if (response.data.status === 1) {
        notification.success({
          message: `Designation ${data.designation_id === 0 ? 'Inserted' : 'Updated'} Successfully`,
        });
        dispatch(getTableDesgination())
        // dispatch({ type: DESIGNATION, payload: response.data.status })
        return Promise.resolve();
      }else if (response.data.status === 0){
        notification.success({
          message: response.data.msg,
        });
      }
    });

  } catch (err) {

  }
}