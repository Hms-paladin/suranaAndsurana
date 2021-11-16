import { UPDATE_COPYRIGHT,GET_COPYRIGHT,INSERT_COPYRIGHT } from "../utils/Constants"

const intialState = {
    getCopyRight: [],insertCopyright:false,lengthData:""
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_COPYRIGHT:
            return  { ...state, getCopyRight: payload }
        case INSERT_COPYRIGHT:
            return  { ...state, insertCopyright: payload }  
        case UPDATE_COPYRIGHT:
                return  { ...state, updateCopyrightStatus: payload ,lengthData: payload.length}
        default:
            return state;
    }

}