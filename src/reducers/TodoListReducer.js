import { GET_HRTODOLIST } from "../utils/Constants";


export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_HRTODOLIST:
            return payload
        default:
            return state;
    }

}