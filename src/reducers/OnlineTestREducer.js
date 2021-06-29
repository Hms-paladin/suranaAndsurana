import { GET_TEMPLATE_QUETIONS ,GET_NO_OF_QUETIONS} from "../utils/Constants.js";



const initalState = {
    GettemplateQuetions: [],
    GetNoOfQuetions:[]
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {

        case GET_TEMPLATE_QUETIONS:
            return { ...state, GettemplateQuetions: payload }
        case GET_NO_OF_QUETIONS:
            return { ...state, GetNoOfQuetions: payload }
        default:
            return state;
    }




}
