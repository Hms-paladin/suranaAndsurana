import { ADD_CLIENT,ADD_CLIENT_DOCUMENT, CLIENT_NAME_CHECK } from '../utils/Constants.js'

const intialState = {
    InsertClient: [], addClientDocumentStatus: "", clientNameCheck:{}
}

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_CLIENT:
            return  { ...state, InsertClient: payload }
        case ADD_CLIENT_DOCUMENT:
                return  { ...state, addClientDocumentStatus: payload ===1 ? true : "" }   
        case CLIENT_NAME_CHECK:
            return   {...state,clientNameCheck:payload} 
        default:
            return state;
    }

}
