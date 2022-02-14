import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { GET_PROJECT_TIME_SHEET } from '../utils/Constants'
import { PROJECTWISE_TIME_SHEET_SEARCH, DAY_REPORT_SEARCH } from '../utils/Constants'
import { notification } from "antd";

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
    dataObj["status"] = 0

    if (!data.emp_name.value || data.emp_name.value === "") {
        dataObj["emp_id"] = localStorage.getItem("empId");
    } else if (data.emp_name.value && data.emp_name.value !== "") {
        if (Number(localStorage.getItem("empId")) === data.emp_name.value) {
            dataObj["emp_id"] = localStorage.getItem("empId");
        } else {
            dataObj["emp_id"] = data.emp_name.value
            dataObj["status"] = 1
        }

    }

    if (data.from_date.value) {
        dataObj["start_date"] = data.from_date.value
    } if (data.to_date.value) {
        dataObj["end_date"] = data.to_date.value
    }

    try {
        await axios({
            method: 'POST',
            url: apiurl + 'get_project_wise_timesheet_search',
            data: dataObj
        })
            .then((response) => {
                if (response.data.status === 1) {
                    dispatch({ type: PROJECTWISE_TIME_SHEET_SEARCH, payload: response.data.data || [] })
                    // if (response.data.data.length === 0) {
                    //     notification.error({
                    //         message: "No Data Found",
                    //     });
                    // }
                }
            })

    } catch (err) {
        notification.error({
            message: "PROJECTWISE TIME SHEET SEARCH FAILED",
        });
    }
}

export const getDayReport_TimeSheet = (data) => async dispatch => {
    // let dataObj = {}
    // if (data.emp_name?.value) {
    //     dataObj["emp_id"] = data?.emp_name?.value
    // }
    // if (data.curr_date?.value) {
    //     dataObj["cur_date"] = data?.curr_date?.value
    // }

    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_day_report',
            data: {
                "dates": data.dates.value,
                "status": Number(data.day_report_type.value) === 1 ? 0 : 1,
            }
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


export const update_approve_timesheet = (data, status) => async dispatch => {

    var updatelist = [];
    data && data.length > 0 && data.map((data) => {
        if (data.editicon) {
            var listarray = {
                timesheet_id: data.timesheet_id === null ? '0' : data.timesheet_id,
                approve_start_date: data.start_date === null ? '0000-00-00' : data.start_date,
                approved_start_time: data.start_time === null ? '00:00' : data.start_time,
                approved_end_date: data.end_date === null ? '0000-00-00' : data.end_date,
                approved_end_time: data.end_time === null ? '00:00' : data.end_time,
                approved_by: localStorage.getItem("empId"),
                status: status,
            };
            updatelist.push(listarray);
        }
    })

    if (updatelist.length > 0) {
        try {
            await axios({
                method: 'PUT',
                url: apiurl + 'update_approve_timesheet',
                data: {
                    "timesheet": updatelist
                }
            })
                .then((response) => {
                    if (response.data.status === 1) {
                        notification.success({
                            message: `Timesheet ${status === 1 ? 'Approved' : 'Rejected'} Successfully`,
                        });
                        return Promise.resolve();
                    }
                })

        } catch (err) {

        }
    }
}

export const update_submit_timesheet = (data) => async dispatch => {

    var updatelist = [];
    data && data.length > 0 && data.map((data) => {
        if (data.editicon) {
            var listarray = {
                timesheet_id: data.timesheet_id === null ? '0' : data.timesheet_id,
            };
            updatelist.push(listarray);
        }
    })

    if (updatelist.length > 0) {
        try {
            await axios({
                method: 'PUT',
                url: apiurl + 'update_submit_timesheet',
                data: {
                    "timesheet": updatelist
                }
            })
                .then((response) => {
                    if (response.data.status === 1) {
                        notification.success({
                            message: 'Timesheet Submitted Successfully',
                        });
                        return Promise.resolve();
                    }
                })

        } catch (err) {

        }
    }
}

export const EditProjectwiseTimesheet = (data, project_wise) => async dispatch => {

    try {
        await axios({
            method: 'POST',
            url: apiurl + 'update_project_timesheet',
            data: data
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Timesheet Updated Successfully',
                    });
                    dispatch(getProjectWise_TimeSheet(project_wise))
                    return Promise.resolve();
                }
            })

    } catch (err) {

    }
}

export const insert_day_report_reassign = (data) => async dispatch => {
    try {
        await axios({
            method: 'POST',
            url: apiurl + 'day_report_reassign',
            data: {
                "assignee_id": data.emp_name.value,
                "task_id": data.select_task_id.value || "0",
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Employee ReAssigned Successfully',
                    });
                    dispatch(getDayReport_TimeSheet(data));
                    return Promise.resolve();
                }

            })

    } catch (err) {

    }
}

