import { GET_ADD_QUATIONS, VIEW_ADDQUATIONS, EDIT_QUESTIONS, DELETE_QUESTIONS } from "../utils/Constants.js";



const initalState = {
    InesertQuations: [], getAddQuations: [], viewAddedQuestions: [],
    editQuestions: [], delQuestions: []
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {

        case GET_ADD_QUATIONS:
            return { ...state, getAddQuations: payload }
        case VIEW_ADDQUATIONS:
            return { ...state, viewAddedQuestions: payload }
        case EDIT_QUESTIONS:
            return { ...state, editQuestions: payload }
        case DELETE_QUESTIONS:
            return { ...state, delQuestions: payload }
        default:
            return state;
    }




}
