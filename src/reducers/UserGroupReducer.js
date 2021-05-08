
import { INSERT_USERGROUP, GET_GROUPNAME, UPDATE_GROUP_NAME, DELETE_GROUPNAME, GET_GROUP_LIST,GET_EMP_LIST,GET_GROUP_CONTROL_LIST,
    GET_EMP_GROUP_LIST } from '../utils/Constants.js';
// const initalState = {
//     getProject_type:[],

// }


const intialState = {
    InsertUsergroup: [],
    getGroupName: [],
    updateGroupName: [],
    deleteGroupMaster: [],
    groupLists :[], employeeLists :[], employeeGroupDetLists :[] , getGroupControlLists :[]

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
            case GET_GROUP_LIST:
                return { ...state, groupLists: payload }
            case GET_EMP_LIST:
                return { ...state, employeeLists: payload }
                case GET_EMP_GROUP_LIST:
                return { ...state, employeeGroupDetLists: payload }
                case GET_GROUP_CONTROL_LIST:
                return { ...state, getGroupControlLists: payload }
        default:
            return state;
    }

}
