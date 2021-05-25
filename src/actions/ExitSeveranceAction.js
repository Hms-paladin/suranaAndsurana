import { GET_EXITSEVERANCE,INSERT_SEVERANCE,GET_RESIGNATION_APPROVAL,INSERT_RESIGNATION} from "../utils/Constants";
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

export const GetResignationApproval = (SeveranceId) => async dispatch => {
    console.log(SeveranceId.severece_id,"check")
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_resignation_approval',
            data:{
                "severece_id":SeveranceId.severece_id
            }
        })
        .then((response) => {
            dispatch({type:GET_RESIGNATION_APPROVAL,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}


export const InsertResignation = (status,data,emp_id,sev_Id) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'insert_resignation_approval',
            data:{
                "employee_id":localStorage.getItem("empId"),
                "resignation_accepted_on":data.accept_date.value,
                "proposed_date_relieving":data.releive_date.value,
                "approve_status":status===true?1:0,
                "updated_by":localStorage.getItem("empId")
            }
        })
        .then((response) => {
            // if(response.data.status===1){
            //     notification.success({
            //         message: "Resignation approved successfully",
            //     });
           
            // }
            // else if(response.data.status===1){
            //     notification.success({
            //         message: "Resignation Rejected",
            //     });
            // }
            dispatch({type:INSERT_RESIGNATION,payload:response.data.data})
            dispatch(GetResignationApproval(sev_Id.severanceId))
            return Promise.resolve();
        })
        
    } catch (err) {
        
    }
}
