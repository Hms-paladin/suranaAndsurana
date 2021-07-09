import {GET_KPI_ACHIVEMENT} from '../utils/Constants.js'
const intialState = {
    GetKpi_Achivement: []
}
export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_KPI_ACHIVEMENT:
            return { ...state, GetKpi_Achivement: payload }
        default:
            return state;
    }

}
