import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { GET_TASK_LIST, GET_PROJECT_TIME_SHEET} from '../utils/Constants'
import { PROJECTWISE_TIME_SHEET_SEARCH } from '../utils/Constants'

export const getTaskList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_task_list',
            data: {
                "assignee_id": localStorage.getItem("empId"),
            }
        })
            .then((response) => {

                dispatch({ type: GET_TASK_LIST, payload: response.data.data || [] })
            })

    } catch (err) {

    }
}
export const getProjectTimeSheetList = (project_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_time_sheet_project',
            data: {
                "project_id": project_id,
            }
        })
            .then((response) => {

                dispatch({ type: GET_PROJECT_TIME_SHEET, payload: response.data.data || [] })
            })

    } catch (err) {

    }
}

export const getProjectWise_TimeSheet = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_project_wise_timesheet_search',
            data: {
                "emp_id":data.emp_name.value||0,
                "project_type_id":data.project_type.value||1,
                "sub_project_id":data.project_subtype.value||0,
                "start_date":data.from_date.value||"0000-00-00",
                "end_date":data.to_date.value||"0000-00-00"
            }
        })
            .then((response) => {

                dispatch({ type: PROJECTWISE_TIME_SHEET_SEARCH, payload: response.data.data || [] })
            })

    } catch (err) {

    }
}
//select SEC_TO_TIME(sum(time_to_sec(TIMEDIFF(CONCAT(end_date,' ',end_time),CONCAT(start_date,' ',start_time))))) 
//FROM `s_tbl_pm_timesheet` where task_id=1092