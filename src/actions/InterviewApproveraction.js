
import { GET_INTERVIEW_QUESTIONS, INTERVIEWAPPROVER_TABLE_DATA } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import {notification} from 'antd'


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

export const interviewApproverTableData = (props) => async dispatch => {
    console.log(props,"action")
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_to_do_interview_by_id',
            data:{
                resume_id:props.int_resume_id && props.int_resume_id.resume_id
                // resume_id:26
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
                "reviewer":1,
                "approval":5,
                "Interviewer_cmt":Rows.cmts,
                "approver_cmt":ApproveForm.comment.value,
                "prop_designation":Rows.viewer,
                "prop_int_date_time":Rows.date,
                "resume_id":props.int_resume_id && props.int_resume_id.resume_id,
                "created_on":"2021-02-01 12:00:00",
                "updated_on":"2021-02-12 12:00:00",
                "created_by":"2",
                "updated_by":"3",
                "ip_address":"123"
            }
        })
        .then((response)=>{
            console.log(response,"response")
            if(response.data.status===1){
                notification.success({
                    message: 'Interview Approve Successfully',
                  });
                }
        })
    }
    catch(err){

    }


}