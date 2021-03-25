import { GET_VARIABLERATE_TABLE_DATA,INSERT_VARIABLERATE } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const getVariableRateTableData = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_variable_rate',
        })
        .then((response) => {
            dispatch({type:GET_VARIABLERATE_TABLE_DATA,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const InsertVariableRate = (RateMaster) => async dispatch => {
    try {

        axios({
            method: "POST",
            url: apiurl + "insert_vairable_rate",
            data: {
              range_id: RateMaster.range_project_cost.value ||0,
              location_id: RateMaster.court.value || 0,
              designation_id: RateMaster.designation.value || 0,
              activity_id: RateMaster.activity.value || 0,
              created_on: moment().format("YYYY-MM-DD HH:m:s"),
              updated_on: moment().format("YYYY-MM-DD HH:m:s"),
              created_by: localStorage.getItem("empId"),
              updated_by: localStorage.getItem("empId"),
              sub_activity_id: RateMaster.sub_activity.value || 0,
              rate: RateMaster.amount.value || 0,
              upper_limit: RateMaster.upper_limit.value || 0,
              lower_limit: RateMaster.lower_limit.value || 0,
              unit_id: RateMaster.unit_measurement.value || 0,
            },
          }).then((response) => {
           dispatch( getVariableRateTableData())

            if (response.data.status === 1) {
                dispatch({type:INSERT_VARIABLERATE,payload:true})
              notification.success({
                message: "Variable Rate Master Updated Successfully",
              });
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}
