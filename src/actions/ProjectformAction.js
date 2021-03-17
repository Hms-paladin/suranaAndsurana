
import { GET_PROJECT_TYPE} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import {notification} from 'antd'
import moment from 'moment'

export  const GetProject_Type = () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_project_type',
        })
        .then((response) => {
            console.log(response.data.data,"datacheck")
            dispatch({type:GET_PROJECT_TYPE,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

