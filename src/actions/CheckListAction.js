import {
    INSERT_CHECKLIST_CREATION, GET_CHECKLIST_LISTS, GET_CHECKLIST_LISTS_NAMES, GET_CHECK_LIST_ASSIGNED,GET_CHECK_LIST_VIEW
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
            url: apiurl + 'get_check_list_creation'
        })
            .then((response) => {
                dispatch({ type: GET_CHECKLIST_LISTS, payload: response.data.data })
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

export const getCheckListsAssigned = (projectId, projectTypeId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_checklist',
            data: {
                "project_id": projectId,
                "project_type_id": projectTypeId,
            }
        })
            .then((response) => {
                dispatch({ type: GET_CHECK_LIST_ASSIGNED, payload: response.data.data })
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