import { GET_HRTODOLIST, GET_INTERVIEW_QUESTIONS,GET_SELECTED_CANDIDATES,GET_PROJECT_TASK } from "../utils/Constants";
import {GET_OTHER_TASK} from '../utils/Constants'
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from "moment";
import { notification } from "antd";
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

//InterviewApproveActions
//EmployeeFormActions
//EmployeeApproveAction

export const EmployeeApproveOrReject = (EmpId,status,taskId) =>async dispatch => {

    try{
        axios({
            method: 'POST',
            url: apiurl +'insert_employee_status',
            data:{
                "emp_id":EmpId,
                "approved_by":localStorage.getItem("empId"),
                "approved_date":moment().format('YYYY-MM-DD') ,
                "emp_status":status === true?1 :0, 
                "task_id":taskId                               
            },
        })
        .then((response)=>{
            if(response.data.status==1){
                notification.success({
                    message: `Employee Approved Successfully`,
                    placement: "topRight",
                  });
            }
            if(response.data.status==0){
                notification.warning({
                    message: `Employee Rejected Successfully`,
                    placement: "topRight",
                  });
            }
            dispatch(getHrTaskList())
        })
    }
    catch(err){
    }
}

// other task
export const getOtherTask = () =>async dispatch => {
    try{
        axios({
            method: 'POST',
            url: apiurl +'get_other_tasks',
            data:{
                "assignee_id":localStorage.getItem("empId")
                // assignee_id:1
            }
        })
        .then((response) => {
            dispatch({type:GET_OTHER_TASK,payload:response.data.data})
        })
    }
    catch(err){

    }
}

// project task
export const getProjectTasks = () =>async dispatch => {
    try{
        axios({
            method: 'POST',
            url: apiurl +'get_project_tasks',
            data:{
                "emp_id":localStorage.getItem("empId")
            }
        })
        .then((response) => {
            dispatch({type:GET_PROJECT_TASK,payload:response.data.data})
        })
    }
    catch(err){

    }
}

export const unblockUser = (data) =>async dispatch => {
    try{
        axios({
            method: 'POST',
            url: apiurl +'update_unblock_status',
            data:{
                "emp_id":data.employee_id,
                "active_flag":"1",
                "status_change_datetime":"2021-02-01"
            }
        })
        .then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "User Unblocked Successfully",
                  });
                }
        })
    }
    catch(err){

    }
}