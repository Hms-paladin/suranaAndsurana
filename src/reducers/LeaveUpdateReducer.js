import { GET_EMPLOYEE,INSERT_LEAVE_UPDATE} from "../utils/Constants"

const intialState = {
    getEmployee:[],insertLeaveUpdateStatus:false,lengthData:""
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
       
        case INSERT_LEAVE_UPDATE:
            return  { ...state, insertLeaveUpdateStatus: payload }  
        case GET_EMPLOYEE:
            return  { ...state, getEmployee: payload }
        // case UPDATE_COPYRIGHT:
        //         return  { ...state, updateCopyrightStatus: payload ,lengthData: payload.length}
        default:
            return state;
    }

}