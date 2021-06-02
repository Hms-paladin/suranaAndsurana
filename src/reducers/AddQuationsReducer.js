import { GET_ADD_QUATIONS, VIEW_ADDQUATIONS } from "../utils/Constants.js";



const initalState = {
    InesertQuations: [], getAddQuations: [], viewAddedQuestions: []
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {

        case GET_ADD_QUATIONS:
            return { ...state, getAddQuations: payload }
        case VIEW_ADDQUATIONS:
            return { ...state, viewAddedQuestions: payload }
        default:
            return state;
    }




}
