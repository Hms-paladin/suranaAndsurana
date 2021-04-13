
import { GET_LEAVE_FORM ,GET_SUBJECT_LIST} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";

// Leave Type (CEP)

//Professional_course

export const getProfessionalCourse = () => async (dispatch) => {
    const response = await axios.get(apiurl + "/get_professional_course");
    return dispatch({ type: GET_LEAVE_FORM, payload: response.data.data });
};

export const SubjectList = (data) => async dispatch => {
    console.log(data, "actiondata")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_subject',
            data: {
                "professional_course_id": data,

            }
        })
            .then((response) => {
                // console.log(response.data.data,"GET_HRSEARCH_ROWDATA")

                dispatch({ type: GET_SUBJECT_LIST, payload: response.data.data })
            })

    } catch (err) {

    }
}