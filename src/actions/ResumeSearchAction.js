
import { GET_INTERVIEW_STATUS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";


export const ResumeSearchStatus = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_Interview_Status',
        })
        .then((response) => {
            console.log(response.data.data,"ddd")
            dispatch({type:GET_INTERVIEW_STATUS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}