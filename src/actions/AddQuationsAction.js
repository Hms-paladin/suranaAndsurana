import { GET_ADD_QUATIONS, VIEW_ADDQUATIONS, EDIT_QUESTIONS, DELETE_QUESTIONS} from "../utils/Constants";
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
                if (response.data.status === 0) {
                    notification.success({
                        message: 'Quetions Added Successfully',
                    });
                    dispatch(getAddQuations());

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


export const editQuestions = (QuesID, answer, options, question) => async dispatch => {

    try {

        axios({
            method: "POST",
            url: apiurl + "editquestion",
            data: {
                "question": {
                    "question": question,
                    "choice": options,
                    "answer": answer,
                    "QuesId": QuesID
                }
            },
        }).then((response) => {
            if (response.data.status === 0) {
                dispatch({ type: EDIT_QUESTIONS, payload: response.data.data })
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const deleteQuestions = (QuesID) => async dispatch => {

    try {

        axios({
            method: "DELEte",
            url: apiurl + "removeInterviewquestion",
            data: {

                "QuesId": QuesID

            },
        }).then((response) => {
            if (response.data.status === 0) {
                dispatch({ type: DELETE_QUESTIONS, payload: response.data.data })
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}

export const viewAddedQuestions = (QuesCatId, QuesubcatId, QuesType) => async dispatch => {

    try {

        axios({
            method: "POST",
            url: apiurl + "viewaddedquestions",
            data: {
                "quescatId": QuesCatId || 0,
                "quesubcatId": QuesubcatId || 0,
                "questiontype": QuesType || 0
            },
        }).then((response) => {
            if (response.data.status === 0) {
                dispatch({ type: VIEW_ADDQUATIONS, payload: response.data.data })
                return Promise.resolve();
            }
        });

    } catch (err) {

    }
}