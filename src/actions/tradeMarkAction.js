import { GET_TRADEMARKSTATUS,GET_CLASS_DETS,GET_POA,
    GET_TRADEMARK_USAGE_DETS,GET_COUNTRY,INSERT_TRADE_MARK,GET_TRADE_MARK,
    INSERT_APPEAL_FILING, INSERT_RECTIFICATION_DEFENDED, INSERT_PATENT_APPEAL_FILING,
    INSERT_PATENT_RECTIFICATION_DEF, INSERT_PATENT_RECTIFICATION_FILED, INSERT_PATENT_REVOCATION_DEF, INSERT_PATENT_REVOCATION_FILED,
    INSERT_RECTIFICATION_FILED, INSERT_REVOCATION_DEFENDED, INSERT_REVOCATION_FILED,INSERT_IPAB,GET_IPAP,
 } from "../utils/Constants";
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

export const getIPAP= (projectId) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_trade_ipab',
            data :{
                "project_id" :projectId

            }
        })
        .then((response) => {
             let repData= response.data.data;


            dispatch({type:GET_IPAP,payload:response.data.data})
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
export const insertIPAB = (params) => async dispatch => {
    try {

        for (var x in params){
            if(x && x !='trademark_ipab_id'){
                let da = params[x];
                if(da && da=='' && da.length &&  da.length <1){
                    params[x]=null;
                }

            }

        }
        var url ='insert_ipab';
        var method = 'POST';
        var message="IPAB added sucessfully";
        if(params.trademark_ipab_id !=0){
            url = 'update_tipab';
            method ='PUT';
            message="IPAB updated sucessfully";
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
                dispatch({type:INSERT_IPAB,payload:response.data.status})
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

export const insertAppealFiling = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type:INSERT_APPEAL_FILING,
                payload:response.data.data
            })
            console.log("Insert Appeal Filing", data)
        })
        
    } catch (err) {
        
    }
}

export const insertRectificationDefended = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type: INSERT_RECTIFICATION_DEFENDED,
                payload:response.data.data
            })
            console.log("insert Rectification Defended", data)
        })
        
    } catch (err) {
        
    }
}

export const insertPatentAppealFiling = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type: INSERT_PATENT_APPEAL_FILING,
                payload:response.data.data
            })
            console.log("insert Patent Appeal Filing", data)
        })
        
    } catch (err) {
        
    }
}

export const insertPatentRectificationDef = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type: INSERT_PATENT_RECTIFICATION_DEF,
                payload:response.data.data
            })
            console.log("insert Patent Rectification Def", data)
        })
        
    } catch (err) {
        
    }
}

export const insertPatentRectificationFiled = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type: INSERT_PATENT_RECTIFICATION_FILED,
                payload:response.data.data
            })
            console.log("insert Patent Rectification FILED", data)
        })
        
    } catch (err) {
        
    }
}


export const insertPatentRevocationDef = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type: INSERT_PATENT_REVOCATION_DEF,
                payload:response.data.data
            })
            console.log("insert Patent Revocation Def", data)
        })
        
    } catch (err) {
        
    }
}
export const insertPatentRevocationFiled = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type: INSERT_PATENT_REVOCATION_FILED,
                payload:response.data.data
            })
            console.log("insert Patent Revocation filed", data)
        })
        
    } catch (err) {
        
    }
}

export const insertRectificationFiled = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type: INSERT_RECTIFICATION_FILED,
                payload:response.data.data
            })
            console.log("insert Rectification filed", data)
        })
        
    } catch (err) {
        
    }
}

export const insertRevocationDefended = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type: INSERT_REVOCATION_DEFENDED,
                payload:response.data.data
            })
            console.log("insert Revocation Defended", data)
        })
        
    } catch (err) {
        
    }
}
export const insertRevocationFiled = (data) => async dispatch =>{
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_poa',
            data : data
        })
        .then((response) => {
            dispatch({
                type: INSERT_REVOCATION_FILED,
                payload:response.data.data
            })
            console.log("insert Revocation Filed", data)
        })
        
    } catch (err) {
        
    }
}