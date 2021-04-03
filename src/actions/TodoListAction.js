import { GET_HRTODOLIST, GET_INTERVIEW_QUESTIONS,GET_SELECTED_CANDIDATES } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
//TodoList-->Interview,InterviewApprove,EmployeeForm and EmployeeApprovel
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
            dispatch({type:GET_HRTODOLIST,payload:response.data.data})
        })
    }
    catch(err){

    }
}
//InterviewPage
export const getInterviewQuestions = () =>async dispatch => {
    try{
        axios({
            method: 'GET',
            url: apiurl +'get_questions',
        })
        .then((response) => {
            dispatch({type:GET_INTERVIEW_QUESTIONS,payload:response.data.data})
        })
    }
    catch(err){
    }
} 
export const getSelectedCandidates = (data) =>async dispatch => {
    try{
        axios({
            method: 'POST',
            url: apiurl +'get_selected_candidates',
            data: {
                int_detail_id:data
              } 
        })
        .then((response) => {
            dispatch({type:GET_SELECTED_CANDIDATES,payload:response.data.data})
        })
    }
    catch(err){
    }
}