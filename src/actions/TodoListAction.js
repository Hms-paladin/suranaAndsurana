import { GET_HRTODOLIST } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";

export const getHrTaskList = () =>async dispatch => {
    alert("called")
    try{
        axios({
            method: 'POST',
            url: apiurl +'get_todo_list',
        })
        .then((response) => {
            console.log(response,"responseresponse")
            dispatch({type:GET_HRTODOLIST,payload:response.data.data})
        })
    }
    catch(err){

    }
}

// export const ResumeSearchStatus = () => async dispatch => {
//     try {

//         axios({
//             method: 'GET',
//             url: apiurl +'get_Interview_Status',
//         })
//         .then((response) => {
//             console.log(response.data.data,"ddd")
//             dispatch({type:GET_INTERVIEW_STATUS,payload:response.data.data})
//         })
        
//     } catch (err) {
        
//     }
// }