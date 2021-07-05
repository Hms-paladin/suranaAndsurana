import {GET_TASK_LIST, GET_PROJECT_TIME_SHEET } from '../utils/Constants'
import { PROJECTWISE_TIME_SHEET_SEARCH } from '../utils/Constants'
const intialState = {
    getTaskList: [], getTimeSheetProject: [],ProjectWise_TimeSheet:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TASK_LIST:
            return { ...state, getTaskList: payload }
        case GET_PROJECT_TIME_SHEET:
            return { ...state, getTimeSheetProject: payload }
        case PROJECTWISE_TIME_SHEET_SEARCH:
            return {...state,ProjectWise_TimeSheet: payload}    
        default:
            return state;
    }

}