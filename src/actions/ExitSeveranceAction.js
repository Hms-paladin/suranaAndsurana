import { GET_EXITSEVERANCE,INSERT_SEVERANCE,GET_RESIGNATION_APPROVAL,INSERT_RESIGNATION,GET_EMPLOYEE_DET} from "../utils/Constants";
import {UPDATE_ITNOC,UPDATE_HRNOC,UPDATE_ADMINNOC} from '../utils/Constants'
import {getOtherTask} from './TodoListAction'
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import {notification} from 'antd'
import moment from "moment"

export const GetSeverance = (emp_id) => async dispatch => {
    console.log("emp_id",emp_id)
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_severence',
            data:{
                // "emp_id":localStorage.getItem("empId")
                emp_id:emp_id
            }
        })
        .then((response) => {
            dispatch({type:GET_EXITSEVERANCE,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const GetEmployeeDetails = (emp_id) => async dispatch => {
    console.log("emp_id",emp_id)
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_severence',
            data:{
                "emp_id":localStorage.getItem("empId")
            }
        })
        .then((response) => {
            dispatch({type:GET_EMPLOYEE_DET,payload:response.data.data})
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
    // console.log(SeveranceId.severece_id,"check")
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
    console.log("sev_Id.severanceId",sev_Id)
    try {

        axios({
            method: 'POST',
            url: apiurl +'insert_resignation_approval',
            data:{
                "employee_id":emp_id,
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
                console.log("sss",sev_Id.severanceId)
            // }
            dispatch({type:INSERT_RESIGNATION,payload:true})
            dispatch(GetResignationApproval({value:sev_Id}))
            dispatch(getOtherTask())
            return Promise.resolve();
        })
        
    } catch (err) {
        
    }
}

export const UpdateItNoc = (checked,emp_id,task) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'update_it_noc',
            data:{
                "employee_id":emp_id,
                "it_noc_date":checked===true?moment().format('YYYY-MM-DD HH:m:s'):"",
                "it_noc_by":checked===true?localStorage.getItem("empId"):""
            }
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                message: "IT NOC approved successfully",
                });
            dispatch({type:UPDATE_ITNOC,payload:true})
            dispatch(GetSeverance(emp_id))
            dispatch(getOtherTask())
            return Promise.resolve();
            }
        })
        
    } catch (err) {
        
    }
}

export const UpdateAdminNoc = (checked,emp_id,task) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'update_admin_noc',
            data:{
                "employee_id":emp_id,
                "it_noc_date":checked===true?moment().format('YYYY-MM-DD HH:m:s'):"",
                "it_noc_by":checked===true?localStorage.getItem("empId"):""
            }
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                message: "ADMIN NOC approved successfully",
                });
            dispatch({type:UPDATE_ADMINNOC,payload:true})
            dispatch(GetSeverance({emp_id}))
            dispatch(getOtherTask())
            return Promise.resolve();
            }
        })
        
    } catch (err) {
        
    }
}


export const UpdateHrNoc = (checked,emp_id,task) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'update_hr_noc',
            data:{
                "employee_id":emp_id,
                "it_noc_date":checked===true?moment().format('YYYY-MM-DD HH:m:s'):"",
                "it_noc_by":checked===true?localStorage.getItem("empId"):""
            }
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                message: "HR NOC approved successfully",
                });
            dispatch({type:UPDATE_HRNOC,payload:true})
            dispatch(GetSeverance({emp_id}))
            dispatch(getOtherTask())
            }
            return Promise.resolve();

              
        })
        
    } catch (err) {
        
    }
}