
import { POST_EMPLOYEE_APPROVE } from "../utils/Constants";
import {GET_EMPLOYEE_APPROVE} from '../utils/Constants'
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { getHrTaskList } from "./TodoListAction";


// export const EmployeeApproveInsert = () => async dispatch => {
//     try {

//         axios({
//             method: 'post',
//             url: apiurl +'insert_employee_status',
//             data:{
//                 "emp_id":"1",
//                 "approved_by":"1",
//                 "approved_date":"2021-02-21",
//                 "emp_status":"2"
//             }
//         })
//         .then((response) => {
//             console.log(response.data.data,"ddd")
//             dispatch({type:POST_EMPLOYEE_APPROVE,payload:response.data.data})
//         })
        
//     } catch (err) {
        
//     }
// }
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