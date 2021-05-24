import {GET_EXITSEVERANCE,GET_RESIGNATION_APPROVAL} from '../utils/Constants.js'
const intialState = {
    GetSeverance:[],getResignation:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_EXITSEVERANCE:
            return { ...state, GetSeverance: payload }
        case GET_RESIGNATION_APPROVAL:
            return {...state,getResignation:payload}
        default:
            return state;
    }

}