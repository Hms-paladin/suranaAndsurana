import { GET_STAGEMONITOR, INSERT_STAGEMONITOR, } from "../utils/Constants";
const intialState = {
    getStageMonitor: [],insertStageMaonitor:false,
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_STAGEMONITOR:
            return  { ...state, getStageMonitor: payload }
        case INSERT_STAGEMONITOR:
            return  { ...state, insertStageMaonitor: payload }  
        default:
            return state;
    }

}