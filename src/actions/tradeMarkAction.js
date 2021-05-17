import { GET_TRADEMARKSTATUS,GET_CLASS_DETS,GET_POA,
    GET_TRADEMARK_USAGE_DETS,GET_COUNTRY,INSERT_TRADE_MARK,GET_TRADE_MARK } from "../utils/Constants";
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
            method: 'POST',
            url: apiurl +'get_class',
            data :{
                "class_type" :1

            }
        })
        .then((response) => {
            dispatch({type:GET_CLASS_DETS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getTradeMark= (projectId) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_trade_mark',
            data :{
                "project_id" :projectId

            }
        })
        .then((response) => {
            dispatch({type:GET_TRADE_MARK,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}



export const getPoaDetails= (clientId) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : {
                "client_id":clientId
            }
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
        var url ='insert_trade_mark';
        var method = 'POST';
        var message="Trade Mark Added Successfully";
        if(params.trademark_id !=0){
            url = 'update_trade_mark';
            method ='PUT';
            message="Trade Mark Updated Successfully";
        }
        axios({
            method: method,
            url: apiurl + url,
            data: params
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: message,
                  });
                dispatch({type:INSERT_TRADE_MARK,payload:response.data.status})
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}