import { GET_ADD_QUATIONS } from "../utils/Constants.js";



const initalState = {
    InesertQuations: [], getAddQuations: []
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ADD_QUATIONS:
            return { ...state, getAddQuations: payload }
        default:
            return state;
    }

}