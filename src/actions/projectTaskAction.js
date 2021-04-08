import { GET_ACTIVITY,GET_TAG,GET_PRIORITY,INSERT_TASK,INSERT_ADHOC_TASK,GET_LOCATION,GET_ASSIGN_TO } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const getActivity= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_activity'
        })
        .then((response) => {
            dispatch({type:GET_ACTIVITY,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getTagList= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_tag'
        })
        .then((response) => {
            dispatch({type:GET_TAG,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getPriorityList= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_priority'
        })
        .then((response) => {
            dispatch({type:GET_PRIORITY,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const inserTask = (params) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_task',
            data: params
          }).then((response) => {
            if (response.data.status === 1) {
                dispatch({type:INSERT_TASK,payload:response.data.status})
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
                dispatch({type:INSERT_ADHOC_TASK,payload:response.data.status})
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

export const getAssignedTo= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_employee_list'
        })
        .then((response) => {
            dispatch({type:GET_ASSIGN_TO,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getLocation= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_court'
        })
        .then((response) => {
            dispatch({type:GET_LOCATION,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}


