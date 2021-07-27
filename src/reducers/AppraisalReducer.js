import { GET_EMP_APPRAISAL_DETAILS, GET_EMP_APPRAISAL, GET_EMP_APPRAISAL_SUP_RATE } from '../utils/Constants.js'

const intialState = {
    GetEmpAppraisalDetails: [], GetEmpAppraisal: [], GetEmpAppraisalSupRate: []
}

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_EMP_APPRAISAL_DETAILS:
            return { ...state, GetEmpAppraisalDetails: payload }
        case GET_EMP_APPRAISAL:
            return { ...state, GetEmpAppraisal: payload }
        case GET_EMP_APPRAISAL_SUP_RATE:
            return { ...state, GetEmpAppraisalSupRate: payload }
        default:
            return state;
    }

}
