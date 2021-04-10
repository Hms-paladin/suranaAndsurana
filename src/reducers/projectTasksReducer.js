import { GET_ACTIVITY, GET_PRIORITY,GET_TAG,INSERT_TASK,INSERT_ADHOC_TASK,
    GET_ASSIGN_TO,GET_LOCATION,INSERT_TIME_SHEET}  from '../utils/Constants.js'

const intialState = {
    getActivityList: [], prioritysList:[],tagsList:[],insertTask :[], insertAdhocTask :[] ,  assignToLists :[],locationLists :[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ACTIVITY:
            return  { ...state, getActivityList: payload } 
            case GET_TAG:
            return  { ...state, tagsList: payload } 
            case GET_PRIORITY:
            return  { ...state, prioritysList: payload }
            case INSERT_TASK:
                return  { ...state, insertTask: payload }
            case INSERT_ADHOC_TASK:
            return  { ...state, insertAdhocTask: payload }
            case GET_ASSIGN_TO:
            return  { ...state, assignToLists: payload }
            case GET_LOCATION:
            return  { ...state, locationLists: payload }
            case INSERT_TIME_SHEET:
                return  { ...state, insertTask: payload }
        default:
            return state;
    }

}