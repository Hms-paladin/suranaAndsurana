import { GET_TEMPLATE_QUETIONS } from "../utils/Constants.js";



const initalState = {
    GettemplateQuetions: []
}

export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {

        case GET_TEMPLATE_QUETIONS:
            return { ...state, GettemplateQuetions: payload }
        
        default:
            return state;
    }




}
