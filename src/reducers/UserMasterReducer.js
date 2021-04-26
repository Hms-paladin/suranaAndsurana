import { GET_TABLE_NAME,GET_USER,EDIT_USER,DELETE_USER,GET_CANDIDATES_NAMES} from "../utils/Constants";
const intialState = {
    getCandidateName:[],getUser:[],TableNamedropdownData: [],
}

export default function (state = intialState, action) {
    const { type, payload } = action;

    console.log(payload,"test")
    switch (type) {
        case GET_TABLE_NAME:
            return  { ...state, TableNamedropdownData: payload.data }
        case GET_USER:
            return  { ...state, getUser: payload}
        case GET_CANDIDATES_NAMES:
            return  { ...state, getCandidateName: payload}
        default:
            return state;
    }

}