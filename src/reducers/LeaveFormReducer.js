import { INSERT_LEAVE_FORM, GET_EMP_LEAVE_BALANCE, GET_LEAVE_FORM, GET_SUBJECT_LIST, GET_LEAVE_FORM_DETAILS, UPDATE_LEAVE_FROM } from '../utils/Constants.js'
import {GET_EMP_APPROVAL,UPDATE_EMP_APPROVAL} from '../utils/Constants'
const intialState = {
    getLeaveForm: [], leaveformstatus: [], leavefromsubject: [], getEmpAvailableBalance: [], updateLeaveFrom: [],getLeaveApproval:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LEAVE_FORM:
            return { ...state, leaveformstatus: payload }
        case GET_SUBJECT_LIST:
            return { ...state, leavefromsubject: payload }
        case GET_EMP_LEAVE_BALANCE:
            return { ...state, getEmpAvailableBalance: payload }
        case INSERT_LEAVE_FORM:
            return { ...state, insertLeaveForm: payload }
        case GET_LEAVE_FORM_DETAILS:
            return { ...state, getLeaveForm: payload }
        case UPDATE_LEAVE_FROM:
            return { ...state, updateLeaveFrom: payload }
        case GET_EMP_APPROVAL:
            return {...state,getLeaveApproval: payload}
        default:
            return state;
    }

}