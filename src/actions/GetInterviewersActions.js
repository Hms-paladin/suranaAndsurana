import { GET_INTERVIEWERS ,GET_INTERVIEW_APPR_FINALROUND} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";


export const GetInterviewers = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_interviewers',
        })
        .then((response) => {
            dispatch({type:GET_INTERVIEWERS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const GetInterviewersApprFinal = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'interview_approval_for_finalRound',
        })
        .then((response) => {
            dispatch({type:GET_INTERVIEW_APPR_FINALROUND,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}