import {
    GET_ACTIVITY, GET_PRIORITY, GET_TAG, INSERT_TASK, INSERT_BACK_LOG, INSERT_ADHOC_TASK, GET_TIMESHEET_BY_TASK,
    GET_ASSIGN_TO, GET_LOCATION, INSERT_TIME_SHEET, GET_EXPENSE_TYPE,
<<<<<<< HEAD
     GET_PAYMENT_MODE, GET_STAGESBY_PROJECT, GET_SUBSTAGES, GET_PROJECTSTAGES,GET_PROJECT_STAGES_LIST,GET_TASK_TIME_SHEET,
     GET_TASK_LIST,GET_HEARING_DETS,GET_ADJOURN_DET,INSERT_ADJOURN,INSERT_HEARING,GET_ADJOURN_TAKEN_BY
=======
    GET_PAYMENT_MODE, GET_STAGESBY_PROJECT, GET_SUBSTAGES, GET_PROJECTSTAGES, GET_PROJECT_STAGES_LIST, GET_TASK_TIME_SHEET,
    GET_TASK_LIST, GET_HEARING_DETS, GET_ADJOURN_DET, INSERT_ADJOURN, INSERT_HEARING
>>>>>>> 7e357b3d25a7de2d769c2cfd80d5772b0cca75da
} from '../utils/Constants.js'

const intialState = {
    getProjectStageList: [], getActivityList: [], prioritysList: [], tagsList: [], insertTask: [], getTaskLists: [],
    insertAdhocTask: [], assignToLists: [], locationLists: [], stagesList: [], SubStagesList: [], getAllStage: [],
<<<<<<< HEAD
    getTaskTimeSheet :[],getHearingDets :[],getAdjournDets :[],InsertHearingDets:[],InsertAdjournDets :[],getTaskTimeSheetbyTaskId:[],
    backLog:[],getAdjournTakenBy:[]
=======
    getTaskTimeSheet: [], getHearingDets: [], getAdjournDets: [], InsertHearingDets: [], InsertAdjournDets: [], getTaskTimeSheetbyTaskId: [],
    backLog: []
>>>>>>> 7e357b3d25a7de2d769c2cfd80d5772b0cca75da
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ACTIVITY:
            return { ...state, getActivityList: payload }
        case GET_TAG:
            return { ...state, tagsList: payload }
        case GET_PRIORITY:
            return { ...state, prioritysList: payload }
        case INSERT_TASK:
            return { ...state, insertTask: payload }
        case INSERT_BACK_LOG:
            return { backLog: payload }
        case INSERT_ADHOC_TASK:
            return { ...state, insertAdhocTask: payload }
        case GET_ASSIGN_TO:
            return { ...state, assignToLists: payload }
        case GET_LOCATION:
            return { ...state, locationLists: payload }
        case INSERT_TIME_SHEET:
            return { ...state, insertTask: payload }
        case GET_EXPENSE_TYPE:
            return { ...state, expenseType: payload }
        case GET_PAYMENT_MODE:
            return { ...state, paymentMode: payload }
        case GET_STAGESBY_PROJECT:
            return { ...state, getAllStage: payload }
        case GET_SUBSTAGES:
            return { ...state, SubStagesList: payload }
        case GET_PROJECTSTAGES:
            return { ...state, stagesList: payload }
        case GET_PROJECT_STAGES_LIST:
            return { ...state, getProjectStageList: payload }
        case GET_TASK_LIST:
            return { ...state, getTaskLists: payload }
        case GET_TASK_TIME_SHEET:
            return { ...state, getTaskTimeSheet: payload }
        case GET_HEARING_DETS:
            return { ...state, getHearingDets: payload }
        case GET_ADJOURN_DET:
            return { ...state, getAdjournDets: payload }
        case INSERT_ADJOURN:
            return { ...state, InsertHearingDets: payload }
        case INSERT_HEARING:
            return { ...state, InsertAdjournDets: payload }
        case GET_TIMESHEET_BY_TASK:
<<<<<<< HEAD
            return { ...state, getTaskTimeSheetbyTaskId: payload } 
        case GET_ADJOURN_TAKEN_BY:
            return { ...state, getAdjournTakenBy: payload }   
=======
            return { ...state, getTaskTimeSheetbyTaskId: payload }
>>>>>>> 7e357b3d25a7de2d769c2cfd80d5772b0cca75da
        default:
            return state;
    }

}