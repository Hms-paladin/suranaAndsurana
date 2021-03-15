
import { GET_INTERVIEW_QUESTIONS, INTERVIEWAPPROVER_TABLE_DATA } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import {notification} from 'antd'
import moment from 'moment'

export const Interview = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'/get_questions',
        })
        .then((response) => {
            console.log(response.data.data,"datacheck")
            dispatch({type:GET_INTERVIEW_QUESTIONS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const interviewApproverTableData = (id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_to_do_interview_by_id',
            data:{
                resume_id:id
            }
        })
        .then((response) => {
            console.log(response,"res_id")
            dispatch({type:INTERVIEWAPPROVER_TABLE_DATA,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

 
export const InsertApprove = (ApproveForm,props,optionvalues,Rows) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + "insert_approve_status",
            data:{
                "status":optionvalues.Id,
                "score":ApproveForm.final_score.value,
                "reviewer":localStorage.getItem("empId"),
                "approval":"1",
                "Interviewer_cmt":Rows.cmts,
                "approver_cmt":ApproveForm.comment.value,
                "prop_designation":Rows.viewer,
                "prop_int_date_time":Rows.date,
                "resume_id":props.int_resume_id && props.int_resume_id.resume_id,
                "created_on":moment().format('YYYY-MM-DD HH:m:s')  ,
                "updated_on":moment().format('YYYY-MM-DD HH:m:s')  ,
                "created_by":localStorage.getItem("empId"),
                "updated_by":localStorage.getItem("empId"),
                "ip_address":"123"
            }
        })
        .then((response)=>{
            console.log(response,"response")
            if(response.data.status===1){
                notification.success({
                    message: 'Interview Approve Successfully',
                  });
                  return Promise.resolve();
                }
        })
    }
    catch(err){

    }


}