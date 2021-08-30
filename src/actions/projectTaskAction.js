import {
    GET_ACTIVITY, GET_TAG, GET_PRIORITY, INSERT_TASK, INSERT_BACK_LOG, INSERT_ADHOC_TASK, GET_TIMESHEET_BY_TASK,
    GET_LOCATION, GET_ASSIGN_TO, INSERT_TIME_SHEET, GET_EXPENSE_TYPE,
    GET_PAYMENT_MODE, GET_STAGESBY_PROJECT, GET_SUBSTAGES, GET_PROJECTSTAGES,
    GET_PROJECT_STAGES_LIST, GET_TASK_LIST, GET_TASK_TIME_SHEET, GET_HEARING_DETS, GET_ADJOURN_DET, INSERT_ADJOURN, INSERT_HEARING, GET_ADJOURN_TAKEN_BY
} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";
import { GetOpeSearch } from './OutofPacketActions'

export const getActivity = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_activity'
        })
            .then((response) => {
                dispatch({ type: GET_ACTIVITY, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getTagList = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_tag'
        })
            .then((response) => {
                dispatch({ type: GET_TAG, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getPriorityList = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_priority'
        })
            .then((response) => {
                dispatch({ type: GET_PRIORITY, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const inserTask = (params, timeSheetParams) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_task',
            data: params
        }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Task added Successfully",
                });


                dispatch({ type: INSERT_TASK, payload: response.data.data })
                if (timeSheetParams && response.data.data && response.data.data.length > 0 && response.data.data[response.data.data.length - 1]) {
                    let tid = response.data.data[response.data.data.length - 1].task_id;
                    timeSheetParams.task_id = tid;
                    dispatch(insertTimeSheet(timeSheetParams, 'id'))
                }

                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const insertChangeLog = (params) => async dispatch => {
    try {
        await axios({
            method: "POST",
            url: apiurl + 'update_backlog_timesheet',
            data: params
        }).then(function (response) {
            if (response.data.status === 1) {
                notification.success({
                    message: 'Time sheet Added Successfully',
                });
                return Promise.resolve();
            }
        });

    } catch (err) {
        console.log(err)
    }
}

export const insertAdhocTask = (params) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_adhoc_task',
            data: params
        }).then((response) => {
            if (response.data.status === 1) {
                var msg = response.data.msg;
                notification.success({
                    message: msg != "" ? msg : "Adhoc Task added Successfully",
                });
                dispatch({ type: INSERT_ADHOC_TASK, payload: response.data.status })
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const insertTimeSheet = (params, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_start_time',
            data: params
        }).then((response) => {
            if (response.data.status === 1) {
                var msg = response.data.msg;
                notification.success({
                    message: "Time Sheet Started",
                });
                dispatch({ type: INSERT_TIME_SHEET, payload: response.data.status })

                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}


export const updateTaskDates = (params) => async dispatch => {
    try {
        let par = {};
        if (params.project_id != null) {
            par = {
                activiity_id: params.activiity_id,
                task_id: params.task_id,
                sub_activity_id: params.sub_activity_id,
                assignee_id: params.assignee_id,
                actual_start_date: params.actual_start_date != null ? params.actual_start_date : null,
                actual_end_date: params.actual_end_date != null ? params.actual_end_date : null,
                priority: params.Priority,
                description: params.description,
                tag: params.tag_id,
            };
        } else {
            par = {
                task_id: params.task_id,
                assignee_id: params.assignee_id,
                actual_start_date: params.actual_start_date != null ? params.actual_start_date : null,
                actual_end_date: params.actual_end_date != null ? params.actual_end_date : null,
                description: params.description,
                tag: params.tag_id,
            };
        }

        axios({
            method: 'PUT',
            url: apiurl + 'update_task',
            data: par
        }).then((response) => {
            if (response.data.status === 1) {
                var msg = response.data.msg;
                //notification.success({
                // message: msg != "" ? msg : "Adhoc Task added Successfully",
                //});
                // dispatch({ type: INSERT_ADHOC_TASK, payload: response.data.status })
                dispatch(getTaskList(params.assignee_id));//localStorage.getItem("empId")));
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const insertTimeSheetbyTime = (params, time, task) => async dispatch => {
    var url = 'insert_stop_time';
    if (time == true) {
        url = 'insert_start_time'
    }
    try {
        axios({
            method: 'POST',
            url: apiurl + url,
            data: params
        }).then((response) => {
            if (response.data.status === 1) {
                task.Priority = task.priority_id;
                task.tag = task.tag_id;
                if (time == true && task && task.actual_start_date == null) {
                    task.actual_start_date = params.start_date;

                    dispatch(updateTaskDates(task));
                } else {
                    task.actual_end_date = params.end_date;
                    dispatch(updateTaskDates(task));
                }

                dispatch(getTaskList(localStorage.getItem("empId"), "Active"));
                var msg = response.data.msg;
                notification.success({
                    message: `Time Sheet ${time === true ? 'Started' : 'Stopped'}`,
                });
                dispatch({ type: INSERT_TIME_SHEET, payload: response.data.status })

                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const getAssignedTo = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_employee_list'
        })
            .then((response) => {
                dispatch({ type: GET_ASSIGN_TO, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getLocation = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_court'
        })
            .then((response) => {
                dispatch({ type: GET_LOCATION, payload: response.data.data })
            })

    } catch (err) {

    }
}
export const getExpenseType = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_expense_type'
        })
            .then((response) => {
                console.log(response.data.data, "dropdown");
                dispatch({ type: GET_EXPENSE_TYPE, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getPaymentMode = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_payment_mode'
        })
            .then((response) => {
                console.log(response.data.data, "dropdown");
                dispatch({ type: GET_PAYMENT_MODE, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const InsertOPE = (ope_form) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_ope',
            data: ope_form
        })
            .then(function (response) {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'OPE Added Successfully',
                    });
                    dispatch(GetOpeSearch())
                    return Promise.resolve();
                }
            });

    } catch (err) {
        notification.error({
            message: 'Record Not Added',
        });
    }
}


export const getStagesByProjectId = (projectId, projectTypeId, subProjectId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_project_stage',
            data: {
                "project_id": projectId,
                "project_type_id": projectTypeId,
                "sub_project_id": subProjectId
            }
        })
            .then((response) => {
                dispatch({ type: GET_STAGESBY_PROJECT, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getStages = () => async dispatch => {
    try {
        axios({
            method: 'GEt',
            url: apiurl + 'get_stage_list',
        })
            .then((response) => {
                dispatch({ type: GET_PROJECTSTAGES, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getProjectStageList = (project_type_id, sub_proj_type_id, process_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_project_stage_list',
            data: {
                "project_type_id": project_type_id,
                "sub_proj_type_id": sub_proj_type_id,
                "project_id": process_id,
            }
        })
            .then((response) => {
                dispatch({ type: GET_PROJECT_STAGES_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getSubStages = (stageId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_sub_stage',
            data: {
                "stage_id": stageId,
            }
        })
            .then((response) => {
                dispatch({ type: GET_SUBSTAGES, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const insertStages = (params, projectId, projectTypeId, subProjectId) => async dispatch => {
    try {
        if (params.sub_stage_id === "")
            params.sub_stage_id = 0

        axios({
            method: 'POST',
            url: apiurl + 'insert_project_stage',
            data: params
        })
            .then(function (response) {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Stages Added Successfully',
                    });
                    dispatch(getStagesByProjectId(projectId, projectTypeId, subProjectId));
                    return Promise.resolve();

                } else if (response.data.status === 0) {

                    notification.success({
                        message: response.data.msg,
                    });
                    return Promise.resolve();
                }

            });

    } catch (err) {
        notification.error({
            message: 'Record Not Added',
        });
    }
}


export const getTaskList = (empId, status,task_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_task_list',
            data: {
                "assignee_id": empId || localStorage.getItem("empId"),
                "status": status || 'Active',
                "task_id": task_id || "0",
            }
        })
            .then((response) => {

                dispatch({ type: GET_TASK_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}


export const getTaskTimeSheetbyTaskId = (taskId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_time_sheet',
            data: {
                "task_id": taskId,
            }
        })
            .then((response) => {
                dispatch({ type: GET_TIMESHEET_BY_TASK, payload: response.data.data })
                // return response.data.data;
            })

    } catch (err) {

    }
}


export const getTaskTimeSheet = (taskId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_task_timesheet',
            data: {
                "task_id": taskId,
                "project_id":0
            }
        })
            .then((response) => {
                dispatch({ type: GET_TASK_TIME_SHEET, payload: response.data.data })
            })

    } catch (err) {

    }
}
export const getHearingDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_hearing_details',
            data: {
                "project_id": data.project_id,
                "task_id": data.task_id
            }
        })
            .then((response) => {
                dispatch({ type: GET_HEARING_DETS, payload: response.data.data })
            })

    } catch (err) {

    }
}//GET_HEARING_DETS,GET_ADJOURN_DET,INSERT_ADJOURN,INSERT_HEARING

export const InsertHearingDets = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_hearing',
            data: data
        })
            .then(function (response) {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Hearing Details Added Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {
        notification.error({
            message: 'Record Not Added',
        });
    }
}

export const getAdjournTakenBy = () => async dispatch => {
    try {
        axios({
            method: 'GET',
            url: apiurl + 'get_adjourn_taken_by',
        })
            .then((response) => {
                dispatch({ type: GET_ADJOURN_TAKEN_BY, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const InsertHearingAdjourn = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_hearing_adjourn',
            data: data
        })
            .then(function (response) {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Hearing Adjourn Details Added Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {
        notification.error({
            message: 'Record Not Added',
        });
    }
}