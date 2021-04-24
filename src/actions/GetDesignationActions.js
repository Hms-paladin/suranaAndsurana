import { GET_DESIGNATION } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";


export const GetDesignation = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_s_tbl_m_designation',
        })
        .then((response) => {
            console.log(response.data.data,"get_designation_action")
            dispatch({type:GET_DESIGNATION,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}