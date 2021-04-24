import axios from "axios";
import { apiurl } from "../utils/baseUrl.js";

import { GET_CLASS, GET_COUNTRY, GET_IPSTATUS } from "../utils/Constants.js";

export const getClass  = () => async (dispatch) => {
    const response = await axios({
        method: "post",
        url: apiurl + "get_class",
        data: {
            class_type: "2",
        },
      });
    return dispatch({ type: GET_CLASS, payload: response.data.data });
};

export const getCountry = () => async (dispatch) => {
    const response = await axios.get(apiurl + "/get_country");
    return dispatch({ type: GET_COUNTRY, payload: response.data.data });
};

export const getIPStatus = () => async (dispatch) => {
    const response = await axios.get(apiurl + "/get_trade_mark_status");
    return dispatch({ type: GET_IPSTATUS, payload: response.data.data });
};
