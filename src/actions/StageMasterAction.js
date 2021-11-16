import { GET_STAGEMASTER,GET_STAGEMASTER_SEARCH } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const getStageMaster = () => async dispatch => {
  try {

    axios({
      method: 'GET',
      url: apiurl + 'get_stage_master',
    })
      .then((response) => {
        dispatch(
          {
            type: GET_STAGEMASTER,
            payload: response.data.data
          }
        )
      })

  } catch (err) {

  }
}

export const InsertStageMaster = (RateMaster) => async dispatch => {
    try {

        axios({
            method: "POST",
            url: apiurl + 'insert_stage_master',
            data: {
              "project_type_id": RateMaster.project_type.value,
              "process_id": RateMaster.process_type.value || 0,
              "sub_proj_type_id": RateMaster.sub_project_type.value || 0,
              "stage_id": RateMaster.stages.value,
              "sub_stage_id": RateMaster.sub_stages.value || 0,
              "no_of_compliance_days": RateMaster.compliance.value,
              "remainder_days": RateMaster.noOfDays.value,
              "created_on": moment().format('YYYY-MM-DD HH:m:s'),
              "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
              "created_by": localStorage.getItem("empId"),
              "updated_by": localStorage.getItem("empId"),
            }
          }).then((response) => {
            if (response.data.status === 1) {
                dispatch(getStageMaster())
                notification.success({
                  message: 'Stage Master Added Successfully',
                });
                return Promise.resolve();
            }else if (response.data.status === 0){
                notification.warn({
                    message: 'Given Data Already Exist',
                  });
                  return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

export const getStageMasterSearch = (RateMaster) => async dispatch => {
  try {

      axios({
          method: "POST",
          url: apiurl + 'get_stage_master_search',
          data: {
            "project_type_id": RateMaster.project_type_search.value,
            "process_id": RateMaster.process_type_search.value || 0,
            "sub_project_type_id": RateMaster.sub_project_type_search.value || 0,
          }
        }).then((response) => {
          if (response.data.status === 1) {
            dispatch(
              {
                type: GET_STAGEMASTER_SEARCH,
                payload: response.data.data
              }
            )
              return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}
