import {GET_EMPLOYEE_LIST_SEARCH,GET_EMPLOYEE_CODE} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";


export const getEmployeeListSearch = (empCodeName,params) => async dispatch => {
 
  try {

      axios({
          method: "POST",
          url: apiurl + "get_employee_list_search",
          data: {
            employee_code: empCodeName,
            designation: params.designation.value===""?0:params.designation.value,
            department: params.department.value===""?0:params.department.value,
          },
        }).then((response) => {
          if (response.data.status === 1) {
            // console.log(response.data.data.length,"//")
              dispatch({type:GET_EMPLOYEE_LIST_SEARCH,payload:response.data.data})
            return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}


  export const getEmployeeCode = () => async (dispatch) => {
    const response = await axios.get(apiurl + "/get_employee_code");
    return dispatch({ type: GET_EMPLOYEE_CODE, payload: response.data.data });
  };


