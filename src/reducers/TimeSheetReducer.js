import {GET_TASK_LIST, GET_PROJECT_TIME_SHEET } from '../utils/Constants'
const intialState = {
    getTaskList: [], getTimeSheetProject: []
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TASK_LIST:
            return { ...state, getTaskList: payload }
        case GET_PROJECT_TIME_SHEET:
            return { ...state, getTimeSheetProject: payload }
        default:
            return state;
    }

}