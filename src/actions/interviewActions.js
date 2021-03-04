// import { GET_INTERVIEW_QUESTIONS } from "../utils/Constants";
// import { POST_INTERVIEW_QUESTIONS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";


// export const getInterviewquestions = () => async dispatch => {
//     try {
//         axios({
//             method: 'GET',
//             url: apiurl +'/get_questions',
//         })
//         .then((response) => {
//             console.log(response.data.data,"datacheck")
//             dispatch({type:GET_INTERVIEW_QUESTIONS,payload:response.data.data})
//         })
        
//     } catch (err) {
        
//     }
// }

export const insertInterviewquestions =(postData)=> async dispatch =>{
    try {
        console.log(postData,"obj")
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
                "status":"1",
                "int_details_id":"1",
                "resume_id":"1",
                "created_on":"2021-02-21 12:12:00",
                "updated_on":"2021-02-23 12:12:00",
                "created_by":"2",
                "updated_by":"1",
                "ip_address":"Fify Two"
            }
        })
        .then((response)=> {
            alert("response")
            console.log(response,"response")
            // dispatch({type:POST_INTERVIEW_QUESTIONS,payload:response})
        })
    }
    catch(err){
        alert(err)

    }
}
