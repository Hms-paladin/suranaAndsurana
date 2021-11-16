import { GET_STAGEMASTER,GET_STAGEMASTER_TABLEDATA, INSERT_STAGEMASTER, } from "../utils/Constants";
const intialState = {
    getStageMaster:[],getStageMasterTableData: [],insertStageMasterStatus:false,
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_STAGEMASTER_TABLEDATA:
            return  { ...state, getStageMasterTableData: payload }
        case INSERT_STAGEMASTER:
            return  { ...state, insertStageMasterStatus: payload }  
        case GET_STAGEMASTER:
            return  { ...state, getStageMaster: payload } 
        default:
            return state;
    }

}