
import {GET_HRSEARCH_ROWDATA } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";




export const searchRowdata = (data) => async dispatch => {
    console.log(data,"actiondata")
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_hr_resume_search',
            data:{
                 "designation_id":data.designation_id,
                 "round":data.round,
                 "status_id":data.status_id
                }
        })
        .then((response) => {
            console.log(response.data.data,"GET_HRSEARCH_ROWDATA")

            dispatch({type:GET_HRSEARCH_ROWDATA,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}