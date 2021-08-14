import { INSERT_TESTTEMPLATE ,GET_NO_OF_QUETIONS} from '../utils/Constants'
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
                    message: "Template Added Successfully",
                });
                return Promise.resolve();
            }
        });
    }
    catch (error) {

    }
}

export const GetNoOfQuetions = (QuesCatId,QuesubcatId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_no_of_questions',
            data: {
                "QuesCatId": QuesCatId || 0,
                "QuesubcatId": QuesubcatId || 0

            }
        })
            .then((response) => {
                console.log(response.data.data, "response.data.data")
                dispatch({ type: GET_NO_OF_QUETIONS, payload: response.data.data})

            })

    } catch (err) {

    }
}