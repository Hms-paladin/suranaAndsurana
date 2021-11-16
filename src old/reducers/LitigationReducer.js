import { INSERT_LITIGATION,GET_LITIGATION ,UPDATE_LITIGATION_DETAILS} from "../utils/Constants";

const intialState = {
    insertLitigationStatus:false,getLitigation:[],updateLitigationDetails:false,
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case INSERT_LITIGATION:
            return  { ...state, insertLitigationStatus: payload }
        case GET_LITIGATION:
            return  { ...state, getLitigation: payload }  
            case UPDATE_LITIGATION_DETAILS:
                return  { ...state, updateLitigationDetails: payload}
        default:
            return state;
    }

}