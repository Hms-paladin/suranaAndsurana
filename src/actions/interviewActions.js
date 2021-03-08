 import { GET_INTERVIEW_QUESTIONS,GET_CANDIDATES_DETAILS,POST_INTERVIEW_QUESTIONS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification} from "antd";
 
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

export const insertInterviewquestions =(postData,id,int_details,optionvalues)=> async dispatch =>{
    try {       
        console.log(optionvalues,"obj")
        axios({
            method:'POST',
            url:apiurl + '/insert_interview_scores',
            data:{
                "question":"From which source India got the concept of Single order of court?",
                "designation":"1",
                "comment":postData.comment.value,
                "score_inital":postData.initial_score.value,
                "score_reviewer":"2",
                "final_score":postData.final_score.value,
                "status":optionvalues.id,
                "int_details_id":int_details.id,
                "resume_id":id,
                "created_on":"2021-02-21 12:12:00",
                "updated_on":"2021-02-23 12:12:00",
                "created_by":"2",
                "updated_by":"1",
                "ip_address":"Fify Two"
            }
        })
        .then((response)=> {
            console.log(response,"response")
            notification.success({
                message: `Employee approved successfully`,
                placement: "topRight",
              });
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