import { GET_COUNTRY,GET_PATENT_STATUS,INSERT_PATENT,GET_PATENT} from "../utils/Constants";
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

export const getPatent= (projectId) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl +'get_patent',
            data :{
                "project_id" :projectId

            }
        })
        .then((response) => {
            dispatch({type:GET_PATENT,payload:response.data.data})
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
                    message: "Patent added sucessfully",
                  });
                dispatch({type:INSERT_PATENT,payload:response.data.status})
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}