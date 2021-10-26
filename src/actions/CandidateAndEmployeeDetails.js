import { GET_BANK_NAME,GET_CANDIDATES_DETAILS,GET_EMPLOYEE_DETAILS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';
import moment from 'moment'

export const GetCandiateDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_candidate_details_by_id',
            data: {
                "resume_id":data
            },
        })
        .then((response) => {
            dispatch({type:GET_CANDIDATES_DETAILS,payload:response.data.data[0].result})
        console.log("consolelog",response.data.data[0].result)
        })
        
    } catch (err) {
        
    }
}

export const GetEmployeeDetails = (data) => async dispatch => {

    try {
        axios({
            method: "post",
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            url: apiurl + "get_employee_by_id",
            data: {
                "emp_id": data||0
            }
        })
        .then((response) => {
            dispatch({type:GET_EMPLOYEE_DETAILS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getBankName = () => async (dispatch) => {
    const response = await axios.get(apiurl + "/get_bank_name");
    return dispatch({ type: GET_BANK_NAME, payload: response.data.data });
  };
