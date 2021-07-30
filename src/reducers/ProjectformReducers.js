import { GET_PROJECT_TYPE, INSERT_IPPROJECT,GET_EMP_BY_DEPARTMENT } from '../utils/Constants.js';
// const initalState = {
//     getProject_type:[],

// }


const intialState = {
    InsertIpProject: [],getEmployeeByDepartment:[]
}


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROJECT_TYPE:
            return payload
        case INSERT_IPPROJECT:
            return { ...state, InsertIpProject: payload }
        case GET_EMP_BY_DEPARTMENT:
            return { ...state, getEmployeeByDepartment: payload }
        default:
            return state;
    }

}
