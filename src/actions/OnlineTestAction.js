import { GET_TEMPLATE_QUETIONS } from "../utils/Constants";
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
                console.log(response.data.data, "response.data.data")
                dispatch({ type: GET_TEMPLATE_QUETIONS, payload: response.data.data})

            })

    } catch (err) {

    }
}