import { INSERT_TESTTEMPLATE } from '../utils/Constants'
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";
export const InsertTestTemplate = (tempname,postarr,maxques,durations) => async dispatch => {
    try {
        console.log(tempname,postarr,maxques,durations,"actions")
        axios({
            method: 'POST',
            url: apiurl + 'postquestion',
            data: {
                postquestion:postarr,
                duration:durations,
                maximumquestions:maxques,
                templateName:tempname,
            },
        }).then((response) => {
            if (response.data.status === 0) {
                dispatch({ type: INSERT_TESTTEMPLATE, payload: response.status.msg })
                notification.success({
                    message: "Template Added Sucessfully",
                });
                return Promise.resolve();
            }
        });
    }
    catch (error) {

    }
}