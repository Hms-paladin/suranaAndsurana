import { GET_HRTODOLIST, GET_INTERVIEW_QUESTIONS,GET_SELECTED_CANDIDATES } from "../utils/Constants";
const intialState = {
  getHrToDoListTableData: [],
  getQuestions: [],getSelectedCandidates:[]
};

export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_HRTODOLIST:
      return { ...state, getHrToDoListTableData: payload };
    case GET_INTERVIEW_QUESTIONS:
      return { ...state, getQuestions: payload };
      case GET_SELECTED_CANDIDATES:
      return { ...state, getSelectedCandidates: payload };
    default:
      return state;
  }
}
