import { ADD_CLIENT,ADD_CLIENT_DOCUMENT } from '../utils/Constants.js'

const intialState = {
    InsertClient: [],addClientDocumentStatus:"",
}

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_CLIENT:
            return  { ...state, InsertClient: payload }
            case ADD_CLIENT_DOCUMENT:
                return  { ...state, addClientDocumentStatus: payload ===1 ? true : "" }      
        default:
            return state;
    }

}
