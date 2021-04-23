import { UPDATE_LEAVE_BALANCE,GET_LEAVE_BALANCE,GET_EMPLOYEE,INSERT_LEAVE_UPDATE} from "../utils/Constants"

const intialState = {
    getLeaveBalance:[],getEmployee:[],insertLeaveUpdate:false,lengthData:""
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
       
        case INSERT_LEAVE_UPDATE:
            return  { ...state, insertLeaveUpdate: payload }  
        case GET_EMPLOYEE:
            return  { ...state, getEmployee: payload }
        case GET_LEAVE_BALANCE:
            return  { ...state, getLeaveBalance: payload }
        case UPDATE_LEAVE_BALANCE:
                return  { ...state, updateLeaveBalance: payload ,lengthData: payload.length}
        default:
            return state;
    }

}