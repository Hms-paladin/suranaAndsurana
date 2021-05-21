import { GET_EXITSEVERANCE,INSERT_SEVERANCE } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import {notification} from 'antd'
import moment from "moment"

export const GetSeverance = () => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_severence',
            data:{
                "emp_id":localStorage.getItem("empId")
            }
        })
        .then((response) => {
            dispatch({type:GET_EXITSEVERANCE,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}
export const InsertSeverance = (ExitSeverance,emp_id) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'insert_reason_for_resignation',
            data:{
                "employee_id":emp_id,
                "date_of_resignation":ExitSeverance.date.value,
                "reason_for_resignation":ExitSeverance.reason.value,
                "created_on":moment().format('YYYY-MM-DD HH:m:s'),
                "updated_on":moment().format('YYYY-MM-DD HH:m:s'),
                "created_by":localStorage.getItem("empId"),
                "updated_by":localStorage.getItem("empId")
            }
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                    message: "Inserted successfully",
                });
            dispatch({type:INSERT_SEVERANCE,payload:response.data.data})
            dispatch(GetSeverance(emp_id))
            return Promise.resolve();
            }
        })
        
    } catch (err) {
        
    }
}