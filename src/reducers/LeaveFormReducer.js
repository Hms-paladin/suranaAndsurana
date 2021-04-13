import { GET_LEAVE_FORM, GET_SUBJECT_LIST } from '../utils/Constants.js'

const intialState = {
    leaveformstatus: [], leavefromsubject: []
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LEAVE_FORM:
            return { ...state, leaveformstatus: payload }
        case GET_SUBJECT_LIST:
            return { ...state, leavefromsubject: payload }
        default:
            return state;
    }

}