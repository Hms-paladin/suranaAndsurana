import {GET_EMPLOYEE_LIST_SEARCH,GET_EMPLOYEE_CODE} from "../utils/Constants";

const intialState = {
    getEmployeeCode:[],getEmpListDepartmentSearch:[],insertLeaveUpdate:false,lengthData:""
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
       
        // case INSERT_LEAVE_UPDATE:
        //     return  { ...state, insertLeaveUpdate: payload }  
        case GET_EMPLOYEE_CODE:
            return  { ...state, getEmployeeCode: payload }
        case GET_EMPLOYEE_LIST_SEARCH:
            return  { ...state, getEmpListDepartmentSearch: payload }
        // case UPDATE_LEAVE_BALANCE:
        //         return  { ...state, updateLeaveBalance: payload ,lengthData: payload.length}
        default:
            return state;
    }

}