
import { GET_INTERVIEW_QUESTIONS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";


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
 
export const InsertApprove = (ApproveForm) => async dispatch => {
    alert("d")
    console.log(ApproveForm,"form")
    try {
        axios({
            method: 'POST',
            url: apiurl + "insert_approve_status",
            data:{
                "status":"1",
                "score":ApproveForm.final_score.value,
                "reviewer":"1",
                "approval":"5",
                "Interviewer_cmt":"Good",
                "approver_cmt":ApproveForm.comment.value,
                "prop_designation":"1",
                "prop_int_date_time":"2021-02-01 12:00:00",
                "resume_id":"1",
                "created_on":"2021-02-01 12:00:00",
                "updated_on":"2021-02-12 12:00:00",
                "created_by":"2",
                "updated_by":"3",
                "ip_address":"Chennai"
            }
        })
        .then((response)=>{
            console.log(response,"res")
        })
    }
    catch(err){

    }


}