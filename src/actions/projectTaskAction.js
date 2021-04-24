import {
    GET_ACTIVITY, GET_TAG, GET_PRIORITY, INSERT_TASK, INSERT_ADHOC_TASK,
    GET_LOCATION, GET_ASSIGN_TO, INSERT_TIME_SHEET, GET_EXPENSE_TYPE,
    GET_PAYMENT_MODE, GET_STAGESBY_PROJECT, GET_SUBSTAGES, GET_PROJECTSTAGES
} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

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
                dispatch({ type: INSERT_TASK, payload: response.data.status })
                dispatch(insertTimeSheet(timeSheetParams, 'id'))
                return Promise.resolve();
            }
        });

    } catch (err) {

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
                    message: "Time sheet updated",
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
                    return Promise.resolve();
                }
                dispatch(getStagesByProjectId(projectId, projectTypeId, subProjectId))
            });

    } catch (err) {
        notification.error({
            message: 'Record Not Added',
        });
    }
}


