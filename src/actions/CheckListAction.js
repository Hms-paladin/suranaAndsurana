import {
    GET_FREQUENCY_BY_CHECKLIST, GET_EMP_SUPERVISOR, INSERT_CHECKLIST_CREATION, GET_PROJ_SUBPROJ, GET_CHECKLIST_LISTS, GET_CHECKLIST_LISTS_NAMES, GET_CHECK_LIST_ASSIGNED, GET_CHECK_LIST_VIEW, GET_DAYS_WEEK, GET_FREQUENCY
} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";


export const insertCheckList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_check_list_creation',
            data: data
        })
            .then(function (response) {
                if (response.data.status === 1) {
                    dispatch(getCheckListsNames())
                    dispatch(getCheckLists());
                    notification.success({
                        message: 'Checklist created Successfully',
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

export const insert_check_list_assign = (data) => async dispatch => {
    console.log(data, "dataaa")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_check_list_assign',
            data: data
        })
            .then(function (response) {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Checklist Assigned Successfully',
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

export const getCheckLists = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            // url: apiurl + 'get_check_list_creation'
            url: apiurl + 'get_checklist_search'
        })
            .then((response) => {
                dispatch({ type: GET_CHECKLIST_LISTS, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getDaysOfWeek = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_days_of_week'
        })
            .then((response) => {
                dispatch({ type: GET_DAYS_WEEK, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getCheckListsNames = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl + 'get_check_list_name'
        })
            .then((response) => {
                dispatch({ type: GET_CHECKLIST_LISTS_NAMES, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getCheckListsAssigned = (projectId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_checklist',
            data: {
                "project_id": projectId,
            }
        })
            .then((response) => {
                dispatch({ type: GET_CHECK_LIST_ASSIGNED, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const get_projType_subProjType_by_projId = (projectId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_projType_subProjType_by_projId',
            data: {
                "project_id": projectId || 0
            }
        })
            .then((response) => {
                dispatch({ type: GET_PROJ_SUBPROJ, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const insertCheckListsAssigned = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_checklist',
            data: data
        })
            .then(function (response) {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Checklist updated Successfully',
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

// Checklist View:

export const getCheckListsView = (emp_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_checklist_by_empId ',
            data: {
                "emp_id": emp_id,
            }
        })
            .then((response) => {
                dispatch({ type: GET_CHECK_LIST_VIEW, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getEmpSupervisor = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_emp_supervisor ',
            data: {
                "emp_id": localStorage.getItem("empId"),
            }
        })
            .then((response) => {
                dispatch({ type:GET_EMP_SUPERVISOR, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const getFrequencyByCheckListId = (id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_frequency_by_checkListId ',
            data: {
                "check_list_id": id,
            }
        })
            .then((response) => {
                dispatch({ type: GET_FREQUENCY_BY_CHECKLIST, payload: response.data.data })
            })

    } catch (err) {

    }
}