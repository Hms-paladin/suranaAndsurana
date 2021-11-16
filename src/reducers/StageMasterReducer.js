import { GET_STAGEMASTER, INSERT_STAGEMASTER,GET_STAGEMASTER_SEARCH } from "../utils/Constants";
const intialState = {
    getStageMaster:[],getStageMasterTableData: [],insertStageMasterStatus:false,getStageMasterSearch:[]
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_STAGEMASTER_SEARCH:
            return  { ...state, getStageMasterSearch: payload }
        case INSERT_STAGEMASTER:
            return  { ...state, insertStageMasterStatus: payload }  
        case GET_STAGEMASTER:
            return  { ...state, getStageMaster: payload } 
        default:
            return state;
    }

}