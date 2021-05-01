import { INSERT_LEAVE_FORM,GET_EMP_LEAVE_BALANCE,GET_LEAVE_FORM, GET_SUBJECT_LIST,GET_LEAVE_FORM_DETAILS } from '../utils/Constants.js'

const intialState = {
    getLeaveForm:[],leaveformstatus: [], leavefromsubject: [], getEmpAvailableBalance: []
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
        default:
            return state;
    }

}