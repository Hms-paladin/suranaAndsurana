
import { INSERT_GROUPACCESS, GET_GROUPNAME,GET_GROUPPERMISION } from '../utils/Constants.js';
// const initalState = {
//     getProject_type:[],

// }


const intialState = {
    InsertGroupAccess: [],
    GetGroupName: [],
    GetGroupPermision: [],

}


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {

        case INSERT_GROUPACCESS:
            return { ...state, InsertGroupAccess: payload }
        case GET_GROUPNAME:
            return { ...state, GetGroupName: payload }
        case GET_GROUPPERMISION:
            return { ...state, GetGroupPermision: payload }
        default:
            return state;
    }

}
