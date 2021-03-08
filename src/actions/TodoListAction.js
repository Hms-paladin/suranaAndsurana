import { GET_HRTODOLIST } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";

import axios from "axios";

export const getHrTaskList = () =>async dispatch => {
    try{
        axios({
            method: 'POST',
            url: apiurl +'get_todo_list',
            data:{
                "assignee_id":localStorage.getItem("empId")
            }
        })
        .then((response) => {
            console.log(response,"responseresponse")
            dispatch({type:GET_HRTODOLIST,payload:response.data.data})
        })
    }
    catch(err){

    }
}
