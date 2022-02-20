/* eslint-disable import/no-anonymous-default-export */
import { GET_TASK_LIST, GET_PROJECT_TIME_SHEET } from '../utils/Constants'
import { PROJECTWISE_TIME_SHEET_SEARCH, DAY_REPORT_SEARCH, GET_LAST_TIME_SHEET } from '../utils/Constants'
const intialState = {
    getTaskList: [], getTimeSheetProject: [], ProjectWise_TimeSheet: [], dayReportSearch: [], getLastTimeSheet: []
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TASK_LIST:
            return { ...state, getTaskList: payload }
        case GET_PROJECT_TIME_SHEET:
            return { ...state, getTimeSheetProject: payload }
        case GET_LAST_TIME_SHEET:
            return { ...state, getLastTimeSheet: payload }
        case PROJECTWISE_TIME_SHEET_SEARCH:
            return { ...state, ProjectWise_TimeSheet: payload }
        case DAY_REPORT_SEARCH:
            return { ...state, dayReportSearch: payload }
        default:
            return state;
    }

}