import {GET_EXITSEVERANCE} from '../utils/Constants.js'
const intialState = {
    GetSeverance:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_EXITSEVERANCE:
            return { ...state, GetSeverance: payload }
        
        default:
            return state;
    }

}