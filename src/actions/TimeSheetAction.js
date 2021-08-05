import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { GET_TASK_LIST, GET_PROJECT_TIME_SHEET } from '../utils/Constants'
import { PROJECTWISE_TIME_SHEET_SEARCH, DAY_REPORT_SEARCH } from '../utils/Constants'
import { notification } from "antd";

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
export const getProjectTimeSheetList = (project_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_time_sheet_project',
            data: {
                "project_id": project_id,
            }
        })
            .then((response) => {

                dispatch({ type: GET_PROJECT_TIME_SHEET, payload: response.data.data || [] })
            })

    } catch (err) {

    }
}

export const getProjectTimeSheetListByTaskId = (taskId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_timesheet_by_taskid',
            data: {
                "task_id": taskId,
            }
        })
            .then((response) => {

                dispatch({ type: GET_PROJECT_TIME_SHEET, payload: response.data.data || [] })
            })

    } catch (err) {

    }
}



export const getProjectWise_TimeSheet = (data) => async dispatch => {
    let dataObj = {}
    if (data.emp_name.value) {
        dataObj["emp_id"] = data.emp_name.value
    }
    if (data.project_type.value) {
        dataObj["project_type_id"] = data.project_type.value
    } if (data.project_subtype.value) {
        dataObj["sub_project_id"] = data.project_subtype.value
    } if (data.proj_name.value) {
        dataObj["project_id"] = data.proj_name.value
    } if (data.from_date.value) {
        dataObj["start_date"] = data.from_date.value
    } if (data.to_date.value) {
        dataObj["end_date"] = data.to_date.value
    }
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_project_wise_timesheet_search',
            data: dataObj
        })
            .then((response) => {

                dispatch({ type: PROJECTWISE_TIME_SHEET_SEARCH, payload: response.data.data || [] })
            })

    } catch (err) {
        notification.error({
            message: "PROJECTWISE TIME SHEET SEARCH FAILED",
        });
    }
}

export const getDayReport_TimeSheet = (data) => async dispatch => {
    let dataObj = {}
    if (data.emp_name?.value) {
        dataObj["emp_id"] = data?.emp_name?.value
    }
    if (data.curr_date?.value) {
        dataObj["cur_date"] = data?.curr_date?.value
    }
    console.log(dataObj, "dataObj")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_dashboard_day_report',
            data: dataObj
        })
            .then((response) => {

                dispatch({ type: DAY_REPORT_SEARCH, payload: response.data.data || [] })
            })

    } catch (err) {
        notification.error({
            message: "DAY REPORT SEARCH FAILED",
        });
    }
}


export const update_approve_timesheet = (data) => async dispatch => {

    var updatelist = [];
    data && data.length > 0 && data.map((data) => {
        if (data.editicon) {
            var listarray = {
                timesheet_id: data.timesheet_id === null ? '-' : data.timesheet_id,
                approve_start_date: data.start_date === null ? '-' : data.start_date,
                approved_start_time: data.start_time === null ? '-' : data.start_time,
                approved_end_date: data.end_date === null ? '-' : data.end_date,
                approved_end_time: data.end_time === null ? '-' : data.end_time,
                approved_by: 1
            };
            updatelist.push(listarray);
        }
    })
    console.log(updatelist, "update_approve_timesheet")
    if (updatelist.length > 0) {
        try {
            axios({
                method: 'PUT',
                url: apiurl + 'update_approve_timesheet',
                data: {
                    "timesheet": [updatelist]
                }
            })
                .then((response) => {

                    notification.success({
                        message: 'Timesheet Approved Successfully',
                    });
                })

        } catch (err) {

        }
    }
}
//select SEC_TO_TIME(sum(time_to_sec(TIMEDIFF(CONCAT(end_date,' ',end_time),CONCAT(start_date,' ',start_time)))))
//FROM `s_tbl_pm_timesheet` where task_id=1092