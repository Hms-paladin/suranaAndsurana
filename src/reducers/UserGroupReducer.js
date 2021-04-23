
import { INSERT_USERGROUP, GET_GROUPNAME } from '../utils/Constants.js';
// const initalState = {
//     getProject_type:[],

// }


const intialState = {
    InsertUsergroup: [],
    GetGroupName: [],

}


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {

        case INSERT_USERGROUP:
            return { ...state, GetGroupName: payload }
        case GET_GROUPNAME:
            return { ...state, InsertUsergroup: payload }
        default:
            return state;
    }

}
