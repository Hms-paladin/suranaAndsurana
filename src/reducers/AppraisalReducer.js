import { GET_EMP_APPRAISAL_DETAILS } from '../utils/Constants.js'

const intialState = {
    GetEmpAppraisalDetails: []
}

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_EMP_APPRAISAL_DETAILS:
            return { ...state, GetEmpAppraisalDetails: payload }

        default:
            return state;
    }

}
