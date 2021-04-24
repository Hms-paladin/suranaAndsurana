
import { INSERT_USERGROUP, GET_GROUPNAME, UPDATE_GROUP_NAME, DELETE_GROUPNAME } from '../utils/Constants.js';
// const initalState = {
//     getProject_type:[],

// }


const intialState = {
    InsertUsergroup: [],
    getGroupName: [],
    updateGroupName: [],
    deleteGroupMaster: []

}


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {

        case INSERT_USERGROUP:
            return { ...state, InsertUsergroup: payload }
        case GET_GROUPNAME:
            return { ...state, getGroupName: payload }
        case UPDATE_GROUP_NAME:
            return { ...state, updateGroupName: payload }
        case DELETE_GROUPNAME:
            return { ...state, deleteGroupMaster: payload }
        default:
            return state;
    }

}
