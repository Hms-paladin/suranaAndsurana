 import { GET_INTERVIEW_QUESTIONS,GET_CANDIDATES_DETAILS,POST_INTERVIEW_QUESTIONS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";

export const getInterviewquestions = () => async dispatch => {
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

export const insertInterviewquestions =(postData,id,data)=> async dispatch =>{
    try {
        console.log(postData,"obj")
        axios({
            method:'POST',
            url:apiurl + 'insert_interview_scores',
            data:{
                "designation":data.designation_id,
                "comment":postData.comment.value,
                "score_inital":postData.initial_score.value,
                "score_reviewer":"2",
                "final_score":postData.final_score.value,
                "status":postData.init_status.value,
                "int_details_id":data.interviewer_id,
                "resume_id":id,
                "created_on":new Date(),
                "updated_on":new Date(),
                "created_by":"2",
                "updated_by":"2",
                "ip_address":"Fify Two",
                "task_id":data.task_id
            }
        })
        .then((response)=> {
            console.log(response,"response")
            // dispatch({type:POST_INTERVIEW_QUESTIONS,payload:response})
        })
    }
    catch(err){
        alert(err)

    }
}
export const GetCandiateDetails = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_selected_candidates',
            data:{
                "int_detail_id":"1"
            }
        })
        .then((response) => {
            console.log(response.data.data,"candiate")
            dispatch({type:GET_CANDIDATES_DETAILS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}