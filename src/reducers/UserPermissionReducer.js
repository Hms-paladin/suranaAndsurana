import { GET_USER_PERMISSION} from "../utils/Constants"

const intialState = {
    getUserPermission:[],lengthData:""
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
       
        case GET_USER_PERMISSION:
            return  { ...state, getUserPermission: payload }  
        default:
            return state;
    }

}