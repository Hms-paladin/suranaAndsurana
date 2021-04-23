import { GET_INTERVIEWERS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";


export const GetInterviewers = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_interviewers',
        })
        .then((response) => {
            console.log(response.data.data,"get_interviewers_action")
            dispatch({type:GET_INTERVIEWERS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}