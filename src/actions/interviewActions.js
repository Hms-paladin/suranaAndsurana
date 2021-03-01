import { GET_INTERVIEW_QUESTIONS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";


export const getInterviewquestions = () => async dispatch => {
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
// export const getInterviewers = () => async dispatch => {
//     try {

//         axios({
//             method: 'GET',
//             url: apiurl +'/get_interviewers',
//         })
//         .then((response) => {
//             console.log(response.data.data,"interview")
//             dispatch({type:GET_INTERVIEW_QUESTIONS,payload:response.data.data})
//         })
        
//     } catch (err) {
        
//     }
// }