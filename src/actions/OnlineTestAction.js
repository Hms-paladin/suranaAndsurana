import { GET_TEMPLATE_QUETIONS,GET_ONLINE_TEST_DETAILS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const GettemplateQuetions = (tempid) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'getOnlineTestQuestionBasedOnTemplate',
            data: {
                "testTemplateId": tempid || 0

            }
        })
            .then((response) => {
                dispatch({ type: GET_TEMPLATE_QUETIONS, payload: response.data.data})

            })

    } catch (err) {

    }
}

export const onlinetest = (designation,candidate,testData) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'onlinetest',
            data: {
                resId: candidate,
                desigId:designation,
                test:testData
            }
        })
            .then((response) => {
                if(response.data.status===1){
                notification.success({
                    message: 'Online Test Submitted Successfully',
                  });
                }
            })

    } catch (err) {

    }
}

export const getOnlineTestDetails = (data)  => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl +'getscoredetails',
            data: {
                ResId: data || 0
            }
        }).then((response) => {
            dispatch({ type: GET_ONLINE_TEST_DETAILS, payload: response.data.data})
        })

    } catch (err) {

    }
}