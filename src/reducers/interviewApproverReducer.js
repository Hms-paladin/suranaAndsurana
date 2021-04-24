import { INTERVIEWAPPROVER_TABLE_DATA } from "../utils/Constants.js";

export default function (state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case INTERVIEWAPPROVER_TABLE_DATA:
            return payload
        default:
            return state;
    }

}
