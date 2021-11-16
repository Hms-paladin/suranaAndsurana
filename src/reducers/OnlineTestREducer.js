import { GET_TEMPLATE_QUETIONS ,GET_NO_OF_QUETIONS,GET_ONLINE_TEST_DETAILS} from "../utils/Constants.js";



const initalState = {
    GettemplateQuetions: [],
    GetNoOfQuetions:[],
    getOnlineTestDetails:[]
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {

        case GET_TEMPLATE_QUETIONS:
            return { ...state, GettemplateQuetions: payload }
        case GET_NO_OF_QUETIONS:
            return { ...state, GetNoOfQuetions: payload }
        case GET_ONLINE_TEST_DETAILS:
             return { ...state, getOnlineTestDetails: payload }
        default:
            return state;
    }




}
