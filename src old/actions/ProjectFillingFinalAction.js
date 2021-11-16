import {GET_PROJECT_DETAILS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";




export const getProjectDetails = (data) => async dispatch => {
    // console.log(data,"actiondata")
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_project_form',
            data:{
                "project_id":data
            }
        })
        .then((response) => {
            // console.log(response.data.data,"GET_HRSEARCH_ROWDATA")

            dispatch({type:GET_PROJECT_DETAILS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}