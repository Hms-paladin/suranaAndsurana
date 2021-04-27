import { GET_STAGEMONITOR, INSERT_STAGEMONITOR, } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const getStageMonitor = (data) => async dispatch => {


    try {
        axios({
            method: 'POST',
            url: apiurl +'get_stage_monitor',//'get_project_stage',
            data:{
                "project_id":data[0].project_id,
                "project_type_id":data[0].project_type_id,
                "sub_project_id":data[0].sub_project_id,
            }
        })
        .then((response) => {
           dispatch({type:GET_STAGEMONITOR,payload:response.data.data})
        })
        
    } catch (err) {
    }

}
    export const getStageMonitorsssss = (data,res) => async dispatch => {
        try {
            axios({
                method: 'POST',
                url: apiurl +'get_stage_',//get_stage_monitor
                data:{
                    "project_id":data,
                    "project_type_id":res.data[0].project_type_id,
                    "sub_project_id":res.data[0].sub_project_id,
                }
            })
            .then((response) => {
               dispatch({type:GET_STAGEMONITOR,payload:response.data.data})
            })
            
        } catch (err) {
        }
    }
        
  /*try {

    axios({
      method: 'GET',
      url: apiurl + 'get_stage_master',
    })
      .then((response) => {
        dispatch(
          {
            type: GET_STAGEMONITOR,
            payload: response.data.data
          }
        )
      })

  } catch (err) {

  }*/


export const insertStageMaonitor = () => async dispatch => {
    try {

        axios({
            method: "POST",
            url: apiurl + 'insert_stage_master',
            data: {
              /*"project_type_id": RateMaster.project_type.value,
              "process_id": RateMaster.process_type.value || 0,
              "sub_proj_type_id": RateMaster.sub_project_type.value || 0,
              "stage_id": RateMaster.stages.value,
              "sub_stage_id": RateMaster.sub_stages.value || 0,
              "no_of_compliance_days": RateMaster.compliance.value,
              "remainder_days": RateMaster.noOfDays.value,
              "created_on": moment().format('YYYY-MM-DD HH:m:s'),
              "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
              "created_by": localStorage.getItem("empId"),
              "updated_by": localStorage.getItem("empId"),*/
            }
          }).then((response) => {
            if (response.data.status === 1) {
                dispatch(getStageMonitor())
                notification.success({
                  message: 'Stage Master Updated Successfully',
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
