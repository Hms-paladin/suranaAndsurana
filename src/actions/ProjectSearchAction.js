import { GET_PROJECT_SEARCH_TABLEDATA } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const getProjectSearchTableData = (data) => async dispatch => {
    try {

        axios({
            method: 'POST',
            url: apiurl + 'get_resume_project_search',
            data: {
                emp_id: localStorage.getItem("empId"),
                client_type_id: data.clienttype.value,
                client_id: data.client.value,
                project_type_id: data.projecttype.value,
                project_id: data.projectname.value,
                billable_type_id: data.billabletype.value
            }
        })
            .then((response) => {
                dispatch({ type: GET_PROJECT_SEARCH_TABLEDATA, payload: response.data.data })

                var checkAllTrue = response.data.data.every((data)=>{
                    return (data.project_details.length === 0)
                })
                if(checkAllTrue){
                    notification.success({
                        message: " No Data found",
                      })
                    }
               
            })

    } catch (err) {

    }
}


