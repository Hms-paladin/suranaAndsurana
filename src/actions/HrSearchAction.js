
import {GET_HRSEARCH_ROWDATA } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";

export const searchRowdata = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_hr_resume_search',
            data:{
                 "designation_id":data.designation_id.value,
                 "round":data.round.value,
                 "status_id":data.status_id.value
                }
        })
        .then((response) => {

            dispatch({type:GET_HRSEARCH_ROWDATA,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}