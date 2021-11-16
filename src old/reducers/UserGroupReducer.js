
import { INSERT_USERGROUP, GET_GROUPNAME, UPDATE_GROUP_NAME, DELETE_GROUPNAME,
    GET_GROUP_EMP, GET_GROUP_LIST,GET_EMP_LIST,GET_GROUP_CONTROL_LIST,EDIT_GROUP_NAME,
    GET_EMP_GROUP_LIST,EDIT_GROUP_CONTROL,GET_CONTROL_LIST,INSERT_GROUP_CONTROL } from '../utils/Constants.js';
// const initalState = {
//     getProject_type:[],

// }


const intialState = {
    InsertUsergroup: [],
    getGroupName: [],
    getControl:[],
    updateGroupName: [],
    deleteGroupMaster: [],
    groupLists :[], employeeLists :[], employeeGroupDetLists :[] , getGroupControlLists :[],getGroupsForEmp:[],
    getTaskLists :[],

}


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case INSERT_USERGROUP:
            return { ...state, InsertUsergroup: payload }
        case GET_GROUPNAME:
            return { ...state, getGroupName: payload }
        case GET_CONTROL_LIST:
                return { ...state, getControl: payload }              
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
                case GET_GROUP_EMP:
                    return { ...state, getGroupsForEmp: payload }
                case  EDIT_GROUP_NAME:
                    return { ...state, editEmployeeGroup: payload }  
                case  EDIT_GROUP_CONTROL:
                        return { ...state, editGroupControl: payload }  
                case INSERT_GROUP_CONTROL:
                return { ...state, InsertGroupControlMaster: payload }
                
        default:
            return state;
    }

}
