import { GET_TRADEMARKSTATUS,GET_CLASS_DETS,GET_POA,GET_TRADEMARK_USAGE_DETS,GET_COUNTRY,INSERT_TRADE_MARK } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const getTradeMarkStatus= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_trade_mark_status'
        })
        .then((response) => {
            dispatch({type:GET_TRADEMARKSTATUS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getClassDetails= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_activity'
        })
        .then((response) => {
            dispatch({type:GET_CLASS_DETS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getPoaDetails= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_activity'
        })
        .then((response) => {
            dispatch({type:GET_POA,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getUsageDetails= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_trade_mark_usage_details'
        })
        .then((response) => {
            dispatch({type:GET_TRADEMARK_USAGE_DETS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getCountryDetails= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_country'
        })
        .then((response) => {
            dispatch({type:GET_COUNTRY,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const insertTradeMark = (params) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_trade_mark',
            data: params
          }).then((response) => {
            if (response.data.status === 1) {
                dispatch({type:INSERT_TRADE_MARK,payload:response.data.status})
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}