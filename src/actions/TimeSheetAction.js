import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { GET_TASK_LIST } from '../utils/Constants'


export const getTaskList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_task_list',
            data: {
                "assignee_id": localStorage.getItem("empId"),
            }
        })
            .then((response) => {

                dispatch({ type: GET_TASK_LIST, payload: response.data.data || [] })
            })

    } catch (err) {

    }
}