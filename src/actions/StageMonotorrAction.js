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


          let dt = '<Labelbox type="datepicker" placeholder={"Actual Date"} />';
          let b = true;
          for (let x of response.data.data) {
                if(b && !response.data.data['actual_date']){
                  x['actual_date'] = true;
                  b = false;
                }
          }
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
            url: apiurl + 'update_stage_completion_date',
            data: {
              "actual_date":"2021-03-03",
              "stage_list_id":"3"
            }
          }).then((response) => {
            if (response.data.status === 1) {
                dispatch(getStageMonitor())
                notification.success({
                  message: 'Stage Completion date Successfully',
                });
                return Promise.resolve();
            }else if (response.data.status === 0){
                notification.warn({
                    message: response.data.msg,
                  });
                  return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}
