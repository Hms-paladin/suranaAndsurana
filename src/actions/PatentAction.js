import { GET_COUNTRY,GET_PATENT_STATUS,INSERT_PATENT} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";



export const getCountry= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_activity'
        })
        .then((response) => {
            dispatch({type:GET_COUNTRY,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getPatentStatus= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_activity'
        })
        .then((response) => {
            dispatch({type:GET_PATENT_STATUS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const insertPatent = (params) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_patent',
            data: params
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Patent Added Successfully",
                  });
                dispatch({type:INSERT_PATENT,payload:response.data.status})
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}