
import { GET_INTERVIEW_QUESTIONS, INTERVIEWAPPROVER_TABLE_DATA } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import {notification} from 'antd'
import moment from 'moment'
import {getHrTaskList} from './TodoListAction'


export const Interview = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'/get_questions',
        })
        .then((response) => {
            dispatch({type:GET_INTERVIEW_QUESTIONS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const interviewApproverTableData = (resume_id,designation_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_to_do_interview_by_id',
            data:{
                resume_id:resume_id,
                designation_id:designation_id
            }
        })
        .then((response) => {
            dispatch({type:INTERVIEWAPPROVER_TABLE_DATA,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const InsertApprove = (ApproveForm,optionvalues,int_details_id,alldet,res_id,task_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + "insert_approve_status",
            data:{
                "status":3|| optionvalues.Id,
                "score":ApproveForm.final_score.value,
                "reviewer":localStorage.getItem("empId"),
                "approval":"1",
                "Interviewer_cmt":ApproveForm.comment.value,
                "approver_cmt":ApproveForm.comment.value,
                "prop_designation":alldet.designationID,
                "prop_int_date_time":alldet.date,
                "resume_id":res_id,
                "created_on":moment().format('YYYY-MM-DD HH:m:s'),
                "updated_on":moment().format('YYYY-MM-DD HH:m:s'),
                "created_by":localStorage.getItem("empId"),
                "updated_by":localStorage.getItem("empId"),
                "ip_address":"123",
                "int_detail_id":int_details_id,
                "task_id":task_id
            }
        })
        .then((response)=>{
            if(response.data.status===1){
                dispatch(getHrTaskList())
                notification.success({
                    message: 'Candidate Approved Successfully',
                  });
                  return Promise.resolve();
                }
        })
    }
    catch(err){

    }


}