import { INSERT_IPPROJECT,GET_EMP_BY_DEPARTMENT } from '../utils/Constants.js';

const intialState = {
    InsertIpProject: [],getEmployeeByDepartment:[]
}


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case INSERT_IPPROJECT:
            return { ...state, InsertIpProject: payload }
        case GET_EMP_BY_DEPARTMENT:
            return { ...state, getEmployeeByDepartment: payload }
        default:
            return state;
    }

}
