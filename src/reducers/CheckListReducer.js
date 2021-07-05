import { INSERT_CHECKLIST_CREATION,GET_CHECKLIST_LISTS,GET_CHECKLIST_LISTS_NAMES,GET_CHECK_LIST_ASSIGNED
} from "../utils/Constants.js";



const initalState = {
    insertCheckList: [], getCheckListscreation: [], getCheckListsNames: [], getCheckListsAssigned:[]
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {

        case INSERT_CHECKLIST_CREATION:
            return { ...state, insertCheckList: payload }
        case GET_CHECKLIST_LISTS:
            return { ...state, getCheckListscreation: payload }
            case GET_CHECKLIST_LISTS_NAMES:
                return { ...state, getCheckListsNames: payload }
        case GET_CHECK_LIST_ASSIGNED:
            return { ...state, getCheckListsAssigned: payload }
        default:
            return state;
    }




}