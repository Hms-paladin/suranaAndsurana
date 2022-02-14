import { GET_OPE_BY_PROJECT_ID, GET_OPE_SEARCH, GET_OPE_ADVANCE, GET_OPEPROJECT_TYPE, GET_PROJECT_TYPEBASED_CLIENT_TYPE } from '../utils/Constants.js'

const intialState = {
    OutofPacketList: [],
    Ope_advance: [],
    projectTypebase_projectName: [],
    projectNameBased_ClientName: [],
    GetOpeByProjectId: []
}

export default function ope(state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_OPE_SEARCH:
            return { ...state, OutofPacketList: payload }
        case GET_OPE_BY_PROJECT_ID:
            return { ...state, GetOpeByProjectId: payload }
        case GET_OPE_ADVANCE:
            return { ...state, Ope_advance: payload }
        case GET_OPEPROJECT_TYPE:
            return { ...state, projectTypebase_projectName: payload }
        case GET_PROJECT_TYPEBASED_CLIENT_TYPE:
            return { ...state, projectNameBased_ClientName: payload }
        default:
            return state;
    }

}