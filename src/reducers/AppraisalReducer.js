import { GET_EMP_APPRAISAL_DETAILS, GET_EMP_APPRAISAL, GET_EMP_APPRAISAL_SUP_RATE, GET_EMP_APPRAISAL_DETAIL_EMPID } from '../utils/Constants.js'

const intialState = {
    GetEmpAppraisalDetails: [], GetEmpAppraisal: [], GetEmpAppraisalSupRate: [], GetEmpAppraisalDetailbyEmpid: []
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
        case GET_EMP_APPRAISAL_DETAIL_EMPID:
            return { ...state, GetEmpAppraisalDetailbyEmpid: payload }
        default:
            return state;
    }

}
