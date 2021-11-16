import { GET_DESIGN_DETAILS } from "../utils/Constants.js";

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_DESIGN_DETAILS:
            return payload
        default:
            return state;
    }
}
