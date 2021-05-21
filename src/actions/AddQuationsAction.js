import { GET_ADD_QUATIONS} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';

export const InesertQuations = (Add_question) => async dispatch => {
    console.log(Add_question, "Add_question")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'addquestion',
            data: {
                "question": [{
                    "quescatId": Add_question.category.value || 0,
                    "quesubcatId": Add_question.subcategory.value || 0,
                    "questiontype": Add_question.ques_type.value || 0,
                    "question": Add_question.type_ques.value || 0,
                    "choice": Add_question.option.value || 0,
                    "answer": Add_question.answer.value || 0

                }
                ]
            }


        })
            .then((response) => {
                console.log(response.data.status, "response.data.status")
                if (response.data.status === 0) {
                    notification.success({
                        message: 'Quations Added Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {
        notification.error({
            message: 'Something Went Wrong,Record Not Added',
        });
    }
}

export const getAddQuations = () => async (dispatch) => {
    const response = await axios.get(apiurl + "/getaddquestions");
    return dispatch({ type: GET_ADD_QUATIONS, payload: response.data.data });
};
