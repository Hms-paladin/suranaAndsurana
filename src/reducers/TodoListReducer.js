import { GET_HRTODOLIST, GET_INTERVIEW_QUESTIONS,GET_SELECTED_CANDIDATES,GET_OTHER_TASK} from "../utils/Constants";
const intialState = {
  getHrToDoListTableData: [],
  getQuestions: [],getSelectedCandidates:[],getOtherTask:[]
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
    case GET_OTHER_TASK:
      return {...state, getOtherTask: payload}
    default:
      return state;
  }
}
