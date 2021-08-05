import { GET_EXITSEVERANCE,INSERT_SEVERANCE,GET_RESIGNATION_APPROVAL,INSERT_RESIGNATION,GET_EMPLOYEE_DET} from "../utils/Constants";
import {UPDATE_ITNOC,UPDATE_HRNOC,UPDATE_ADMINNOC,VIEW_SEVERANCE,INSERT_FEEDBACK,UPDATE_RELIEVING} from '../utils/Constants'
import {getOtherTask} from './TodoListAction'
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import {notification} from 'antd'
import moment from "moment"
import { FeedbackOutlined } from "@material-ui/icons";

export const GetSeverance = (emp_id) => async dispatch => {
    console.log("emp_id",emp_id)
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_severence',
            data:{
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
            url: apiurl +'get_employee_by_id',
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
                    message: "Resignation Applied Successfully",
                });
            dispatch({type:INSERT_SEVERANCE,payload:response.data.data})
            dispatch(GetEmployeeDetails(emp_id))
            dispatch(getOtherTask())
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
    try {

        axios({
            method: 'POST',
            url: apiurl +'insert_resignation_approval',
            data:{
                "employee_id":emp_id,
                "resignation_accepted_on":data.accept_date.value,
                "proposed_date_relieving":data.releive_date.value,
                "approve_status":status===true?1:2,
                "updated_by":localStorage.getItem("empId")
            }
        })
        .then((response) => {
            if(response.data){
            //     notification.success({
            //         message: "Resignation approved successfully",
            //     });
           
            // }
            // else if(response.data.status===1){
            //     notification.success({
            //         message: "Resignation Rejected",
            //     });
                // console.log("sss",sev_Id.severanceId)
            // }
            notification.success({
                        message: `Resignation ${status===true?'Approved':'Rejected'} successfully`,
            });
            dispatch({type:INSERT_RESIGNATION,payload:true})
            // dispatch(GetResignationApproval(sev_Id))
            dispatch(GetSeverance(emp_id))
            dispatch(getOtherTask())
            }
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
            dispatch({type:UPDATE_ITNOC,payload:response.data.status})
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
                "admin_noc_date":checked===true?moment().format('YYYY-MM-DD HH:m:s'):"",
                "admin_noc_by":checked===true?localStorage.getItem("empId"):""
            }
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                message: "ADMIN NOC approved successfully",
                });
            dispatch({type:UPDATE_ADMINNOC,payload:response.data.status})
            dispatch(GetSeverance(emp_id))
            dispatch(getOtherTask())
            return Promise.resolve();
            }
        })
        
    } catch (err) {
        
    }
}


export const UpdateHrNoc = (checked,emp_id) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'update_hr_noc',
            data:{

                "employee_id":emp_id,
                "hr_noc_date":checked===true?moment().format('YYYY-MM-DD HH:m:s'):"",
                "hr_noc_by":checked===true?localStorage.getItem("empId"):""
            }
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                message: "HR NOC approved successfully",
                });
            dispatch({type:UPDATE_HRNOC,payload:response.data.status})
            dispatch(GetSeverance(emp_id))
            dispatch(getOtherTask())
            }
            return Promise.resolve();

              
        })
        
    } catch (err) {
        
    }
}

export const ViewSeverance = () => async dispatch => {
    // console.log("emp_id",emp_id)
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_severence',
            data:{
                "emp_id":localStorage.getItem("empId")
            }
        })
        .then((response) => {
            dispatch({type:VIEW_SEVERANCE,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}


export const InsertFeedback = (data,feedbackId) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'insert_feed_back',
            data:{
                "employee_id":localStorage.getItem("empId"),
                "decision_to_leave":feedbackId,
                "work_environment":data.feedback.value,
                "compensation":data.compansation.value,
            }
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                message: "Employee feedback inserted successfully",
                });
            dispatch({type:INSERT_FEEDBACK,payload:true})
            return Promise.resolve();
            }
        })
        
    } catch (err) {
        
    }
}



export const UpdateReleiving = (data,emp_id) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'insert_final_relieving',
            data:{
                "employee_id":emp_id,
                "actual_date_relieving":data.actualdate_relieving.value
            }
        })
        .then((response) => {
            if(response.data.status===1){
                notification.success({
                message: "Final Relieving Approved",
                });
            dispatch({type:UPDATE_RELIEVING,payload:response.data.status})
            dispatch(GetSeverance(emp_id))
            dispatch(getOtherTask())
            }
            return Promise.resolve();

              
        })
        
    } catch (err) {
        
    }
}