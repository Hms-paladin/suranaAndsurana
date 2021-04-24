
import { GET_CLASS, GET_COUNTRY, GET_IPSTATUS } from "../utils/Constants.js";

const initalState = {
    getClass: [],
    getCountry: [],
    getIPStatus: [],
};

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CLASS:
            return { ...state, getClass: payload };
        case GET_COUNTRY:
            return { ...state, getCountry: payload };
        case GET_IPSTATUS:
            return { ...state, getIPStatus: payload };
        default:
            return state;
    }
}
