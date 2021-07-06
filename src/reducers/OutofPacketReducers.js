import { GET_OPE_SEARCH,GET_OPE_ADVANCE}  from '../utils/Constants.js'

const intialState = {
    OutofPacketList:[],
    Ope_advance:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_OPE_SEARCH:
            return  { ...state, OutofPacketList: payload } 
        case GET_OPE_ADVANCE:
            return {...state,Ope_advance:payload}          
        default:
            return state;
    }

}