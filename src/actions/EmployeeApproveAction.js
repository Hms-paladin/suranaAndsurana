
import { POST_EMPLOYEE_APPROVE } from "../utils/Constants";
import {GET_EMPLOYEE_APPROVE} from '../utils/Constants'
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { getHrTaskList } from "./TodoListAction";

export const GetEmployeeApprove = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_employee_approval',
        })
        .then((response) => {
            dispatch(getHrTaskList())
            dispatch({type:GET_EMPLOYEE_APPROVE,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}