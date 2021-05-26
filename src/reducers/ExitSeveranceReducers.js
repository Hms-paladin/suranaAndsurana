import {GET_EXITSEVERANCE,GET_RESIGNATION_APPROVAL,UPDATE_ITNOC,GET_EMPLOYEE_DET,
    UPDATE_ADMINNOC,UPDATE_HRNOC,VIEW_SEVERANCE} from '../utils/Constants.js'
const intialState = {
    GetSeverance:[],getResignation:[],Update_ItNoc:[],EmployeeDetails:[],Update_AdminNoc:[],ViewSeverance:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_EXITSEVERANCE:
            return { ...state, GetSeverance: payload }
        case GET_RESIGNATION_APPROVAL:
            return {...state,getResignation:payload}
        case UPDATE_ITNOC:
            return {...state,Update_ItNoc:payload} 
        case GET_EMPLOYEE_DET:
            return {...state,EmployeeDetails:payload}    
        case UPDATE_HRNOC:
            return {...state,Update_HrNoc:payload}
        case UPDATE_ADMINNOC:
            return {...state,Update_AdminNoc:payload}
        case VIEW_SEVERANCE:
            return {...state,ViewSeverance:payload}               
        default:
            return state;
    }

}