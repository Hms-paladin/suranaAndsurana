import {  INSERT_ACTIVITY,COMMON_INSERT_TEXT,GET_TABLE_NAME,INSERT_USER, GET_USER, EDIT_USER, DELETE_USER, GET_CANDIDATES_NAMES ,INSERT_STATUS,INSERT_SUBSTAGE,INSERT_CLASS,INSERT_CHECKLIST} from "../utils/Constants";

import {GET_TABLE_GROUP,GET_USER_CLASS,COMMON_UPDATE_TEXT} from '../utils/Constants'
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd'
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
} from '../utils/Constants'
export const get_Tablenames = () => async dispatch => {
  try {

    axios({
      method: 'GET',
      url: apiurl + 'get_table_names',
    })
      .then((response) => {
        console.log("resuser", response)
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
  DocumentData.set("email", UserMaster.emailid.value)
  DocumentData.set("groupId", UserMaster.usergroup.value)
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
        return Promise.resolve();
      }
    });

  } catch (err) {

  }
}

export const Common_insert_text = (data, state=false) => async dispatch => {

 
  try {
  console.log(data, "name_divya")
  // try {
    axios({
      method: 'POST',
      url: apiurl + 'common_insert_text',
      data:
      {

        "table_names":data,
        "text_val":state?.traits_name?.value ? state?.traits_name?.value||"":state?.skill_name?.value ? state?.skill_name?.value||"":
        state?.groupname?.value ? state?.groupname?.value||"":state?.specialization_name?.value?state?.specialization_name?.value||"":
        state?.specialization_name?.value?state?.specialization_name?.value||"":state?.certification_name?.value?state?.certification_name?.value||"":
        state?.qualification_name?.value?state?.qualification_name?.value||"":state?.industry?.value?state?.industry?.value||"":
        state?.institute?.value?state?.institute?.value||"":state?.capability?.value?state?.capability?.value||"":
        state?.talents?.value?state?.talents?.value||"":state?.resourse?.value?state?.resourse?.value||"":
        state?.designation?.value?state?.designation?.value||"":state?.department?.value?state?.department?.value||"":
        state?.activity?.value?state?.activity?.value||"":state?.stage?.value?state?.stage?.value||"":"0",
        "created_by":"2"
       

      },
    })
      .then((response) => {
        console.log("names", response)
        if (response.data.status === 1) {

          notification.success({
            message: 'Inserted Successfully',
          });
        dispatch({ type: COMMON_INSERT_TEXT, payload: response.data.status })

          dispatch(getTableGroup())
          dispatch(getTableSkills())
          dispatch(getTableTraits())
          dispatch(getTableCapability())
          dispatch(getTableCertification())
          dispatch(getTableCourt())
          dispatch(getTableDepartment())
          dispatch(getTableDesgination())
          dispatch(getTableQualification())
          dispatch(getTableResource())
          dispatch(getTableSpecification())
          dispatch(getTableTalents())
          dispatch(getTableCourt)
          dispatch(getTableIndustry())
          dispatch(getTableInsitute())
          dispatch(getTableActivity())
          dispatch(getTableCourt())
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

export const Common_Update_text = (data, state,editId,Editvisible) => async dispatch => {

 

  console.log(editId.group.group_id, "id_divya")
  try {
    axios({
      method: 'POST',
      url: apiurl + 'common_update_text',
      data:
      {
        // "id":Editvisible?editId.group.group_id:"",
        "id":"1",
        "table_names":data,
        "text_val":state?.traits_name?.value ? state?.traits_name?.value||"":state?.skill_name?.value ? state?.skill_name?.value||"":
        state?.groupname?.value ? state?.groupname?.value||"":state?.specialization_name?.value?state?.specialization_name?.value||"":
        state?.specialization_name?.value?state?.specialization_name?.value||"":state?.certification_name?.value?state?.certification_name?.value||"":
        state?.qualification_name?.value?state?.qualification_name?.value||"":state?.industry?.value?state?.industry?.value||"":
        state?.institute?.value?state?.institute?.value||"":state?.capability?.value?state?.capability?.value||"":
        state?.talents?.value?state?.talents?.value||"":state?.resourse?.value?state?.resourse?.value||"":
        state?.designation?.value?state?.designation?.value||"":state?.department?.value?state?.department?.value||"":
        state?.activity?.value?state?.activity?.value||"":state?.stage?.value?state?.stage?.value||"":"0",
        "created_by":"2"
        
        
        
        

      },
    })
      .then((response) => {
        console.log("names", response)
        if (response.data.status === 1) {

          notification.success({
            message: 'Updated Successfully',
          });
        dispatch({ type: COMMON_UPDATE_TEXT, payload: response.data.status })

          dispatch(getTableGroup())
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
export const InsertCheckList = (UserMaster,editdata,Editvisible) => async dispatch => {
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_check_list',
      data:
      {
        "check_list_id": Editvisible?editdata&&editdata.check_list_id:0,
        "check_list": UserMaster.checklist_name.value,
        "project_type_id": UserMaster.project_type.value,
        "created_on": "2021-03-02",
        "created_by": "3"
      },
    })
      .then((response) => {
        if (response.data.status === 1) {
        dispatch({ type: INSERT_CHECKLIST, payload: response.data.status })
          notification.success({
            message:response.data.msg,
          });
          dispatch(getCheckList())
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


// class insert api 
export const InsertClass = (UserMaster,ClassId,Editvisible,id) => async dispatch => {
  console.log(UserMaster.class_type.value, "ttt_s")
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_class',
      data:
      {

        "class_id":Editvisible?ClassId.class_id:0,
        "class_type":UserMaster.class_type.value,
        "class":UserMaster.class_name.value,
        "class_description":UserMaster.description.value,
        "created_on":"2021-03-02",
        "created_by":"3"
      },
    })
      .then((response) => {
        console.log("names", response)

        if (response.data.status === 1) {
        dispatch({ type: INSERT_CLASS, payload: response.data.status })

          notification.success({
            message: response.data.msg,
          });
          // dispatch(getClass())
          dispatch(getTableClass())
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
export const InsertSubActivity = (UserMaster) => async dispatch => {
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_sub_activity',
      data:
      {
        "activity": UserMaster.activity_drop.value,
        "sub_activity": UserMaster.sub_activity.value,
      },
    })
      .then((response) => {
        if (response.data.status === 1) {
        dispatch({ type: INSERT_ACTIVITY, payload: response.data.status })
          notification.success({
            message: 'Inserted Successfully',
          });
          dispatch(getSubActivity())
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
export const InsertSubstage = (UserMaster, props) => async dispatch => {
  console.log(UserMaster,"checkvalue")
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_sub_stage',
      data:
      {
        "stage_id": UserMaster.stage_dropdown.value,
        "stage": UserMaster.sub_stage.value,
        "created_on": "2021-03-02",
        "created_by": "3"
      },
    })
      .then((response) => {
        console.log("response",response)
        dispatch({ type: INSERT_SUBSTAGE, payload: response.data.status })
        if (response.data.status === 1) {
          notification.success({
            message: 'Inserted Successfully',
          });

          dispatch(getSubStage())
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
export const InsertStatus = (UserMaster,StatusId,Editvisible) => async dispatch => {
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_status_master',
      data:
      {
        //"status_id":Editvisible?StatusId.status_id:0,
        // "status_type": UserMaster.status_type.value,
        "status_type":UserMaster.status_type.value,
        "status": UserMaster.status_name.value,
        "created_on": "2021-02-01",
        "created_by": "2"
      }
    })
      .then((response) => {
        dispatch({ type: INSERT_STATUS, payload: response.data.status })
        if (response.data.status === 1) {
          notification.success({
            message:response.data.msg,
          });
          dispatch(getTableStatus())
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
        // console.log(response.data.data.length,"//")
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
  DocumentData.set("groupId", UserMaster.usergroup.value)
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
  DocumentData.set("user_id", user_id)

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
        // console.log(response.data.data.length,"//")
        dispatch({ type: GET_CANDIDATES_NAMES, payload: response.data.data })
        return Promise.resolve();
      }
    });

  } catch (err) {

  }
}

// get class dropdown


export const getClass = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_project_sub_type",
    data: {
      "project_type_id":"1"
    },
  });
  return dispatch({ type: GET_USER_CLASS, payload: response.data.data });
};

// table get api
export const getTableStatus = (id) => async (dispatch) => {
 
const response = await axios({
  method: "post",
  url: apiurl + "get_s_tbl_m_status",
  data: {
    "status_type":"Interview"
  },
});
  return dispatch({ type: GET_TABLE_STATUS, payload: response.data.data});
};
export const getTableGroup = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_group");
  return dispatch({ type: GET_TABLE_GROUP, payload: response.data.data});
};
export const getTableSkills = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_skills");
  return dispatch({ type: GET_TABLE_SKILLS, payload: response.data.data});
};
export const getTableTraits = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_traits");
  return dispatch({ type: GET_TABLE_TRATITS, payload: response.data.data});
};
export const getTableCertification = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_certification");
  return dispatch({ type: GET_TABLE_CERTIFICATION, payload: response.data.data});
};
export const getTableSpecification = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_specialization");
  return dispatch({ type: GET_TABLE_SPECIFICATION, payload: response.data.data});
};
export const getTableQualification = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_qual");
  return dispatch({ type: GET_TABLE_QUALIFICATION, payload: response.data.data});
};
export const getTableIndustry = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_industry");
  return dispatch({ type: GET_TABLE_INDUSTRY, payload: response.data.data});
};
export const getTableInsitute = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_institute");
  return dispatch({ type: GET_TABLE_INSTITUTE, payload: response.data.data});
};
export const getTableCapability = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_capability");
  return dispatch({ type: GET_TABLE_CAPABILITY, payload: response.data.data});
};
export const getTableTalents = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_talents");
  return dispatch({ type: GET_TABLE_TALENTS, payload: response.data.data});
};
export const getTableResource = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_resource_type");
  return dispatch({ type: GET_TABLE_RESOURCE, payload: response.data.data});
};
export const getTableDesgination = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_s_tbl_m_designation");
  return dispatch({ type: GET_TABLE_DESGINATION, payload: response.data.data});
};
export const getTableQuestion = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_questions");
  return dispatch({ type: GET_TABLE_QUESTION, payload: response.data.data});
};
export const getTableDepartment = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_department");
  return dispatch({ type: GET_TABLE_DEPARTMENT, payload: response.data.data});
};
export const getTableActivity = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_activity");
  return dispatch({ type: GET_TABLE_ACTIVITY, payload: response.data.data});
};
export const getTableCourt = () => async (dispatch) => {
  const response = await axios.get(apiurl + "/get_court");
  return dispatch({ type: GET_TABLE_COURT, payload: response.data.data});
};

export const getSubStage = (id) => async (dispatch) => {
  const response = await axios({
    method: "post",
    url: apiurl + "get_sub_stage",
    data: {
      "stage_id":id
    },
  });
  return dispatch({ type: GET_TABLE_SUB_STAGE, payload: response.data.data });
};

export const getTableClass  = (id) => async (dispatch) => {
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
