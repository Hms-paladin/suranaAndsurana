import {GET_KPI_ACHIVEMENT,GET_KPI_APPROVAL,UPDATE_KPI_APPROVAL} from '../utils/Constants.js'
const intialState = {
    GetKpi_Achivement: [],ApprovalData:[],kpiApproval:[]
}
export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_KPI_ACHIVEMENT:
            return { ...state, GetKpi_Achivement: payload }
        case GET_KPI_APPROVAL:
            return {...state,ApprovalData:payload} 
        case UPDATE_KPI_APPROVAL:
            return {...state,kpiApproval:payload}       
        default:
            return state;
    }

}
