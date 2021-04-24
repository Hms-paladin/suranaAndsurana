import { GET_STAGEMASTER_TABLEDATA, INSERT_STAGEMASTER, } from "../utils/Constants";
const intialState = {
    getStageMasterTableData: [],insertStageMasterStatus:false,
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_STAGEMASTER_TABLEDATA:
            return  { ...state, getStageMasterTableData: payload }
        case INSERT_STAGEMASTER:
            return  { ...state, insertStageMasterStatus: payload }  
        default:
            return state;
    }

}