import { GET_TABLE_NAME} from "../utils/Constants";
const intialState = {
    TableNamedropdownData: [],
}

export default function (state = intialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TABLE_NAME:
            return  { ...state, TableNamedropdownData: payload.data }
      
        default:
            return state;
    }

}