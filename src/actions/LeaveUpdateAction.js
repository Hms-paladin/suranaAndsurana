import {UPDATE_LEAVE_BALANCE, GET_LEAVE_BALANCE,GET_EMPLOYEE,INSERT_LEAVE_UPDATE } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const insertLeaveUpdate = (params,employee_id,eligible_leave) => async dispatch => {

    var DocumentData = new FormData();
    DocumentData.set("employee_id",employee_id)
    DocumentData.set("leave_type_id",params.leavetype.value)
    DocumentData.set("eligible_leave",eligible_leave)
    DocumentData.set("start_date",params.start_date.value)
    DocumentData.set("end_date",params.end_date.value)
    DocumentData.set("created_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("updated_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("created_by",localStorage.getItem("empId"))
    DocumentData.set("updated_by",localStorage.getItem("empId"))
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_leave_balance',
            data: DocumentData
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Leave Balance added sucessfully",
                  });
                dispatch({type:INSERT_LEAVE_UPDATE,payload:response.data.status})
                // dispatch(getCopyRight(IdDetails.project_id))
              return Promise.resolve();
            }else{
              let exist=false
              notification.success({
                message: response.data.data,
              });
              dispatch({type:INSERT_LEAVE_UPDATE,payload:exist})
              return Promise.resolve(); 
            }
          });
        
    } catch (err) {
        
    }
}

export const getEmployee = (emp_code) => async dispatch => {

  try {

      axios({
          method: "POST",
          url: apiurl + "get_emp_by_code",
          data: {
            employee_code: emp_code,
          },
        }).then((response) => {
          if (response.data.status === 1) {
            // console.log(response.data.data.length,"//")
              dispatch({type:GET_EMPLOYEE,payload:response.data.data})
            return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}

export const getLeaveBalance = (params,employee_code) => async dispatch => {

    try {
  
        axios({
            method: "POST",
            url: apiurl + "get_leave_balance",
            data: {
              employee_code: employee_code,
              start_date: params.start_date.value,
              end_date: params.end_date.value,
            },
          }).then((response) => {
            if (response.data.status === 1) {
              // console.log(response.data.data.length,"//")
                dispatch({type:GET_LEAVE_BALANCE,payload:response.data.data})
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
  }

  export const updateLeaveBalance = (params,employee_id,eligible_leave,emp_leave_mas_id) => async dispatch => {

    var DocumentData = new FormData();
    DocumentData.set("emp_leave_mas_id",employee_id)
    DocumentData.set("employee_id",employee_id)
    DocumentData.set("leave_type_id",params.leavetype.value)
    DocumentData.set("eligible_leave",eligible_leave)
    DocumentData.set("start_date",params.start_date.value)
    DocumentData.set("end_date",params.end_date.value)
    DocumentData.set("created_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("updated_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("created_by",localStorage.getItem("empId"))
    DocumentData.set("updated_by",localStorage.getItem("empId"))
    try {
        axios({
            method: 'POST',
            url: apiurl + 'update_leave_balance',
            data: DocumentData
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Leave Balance updated sucessfully",
                  });
                dispatch({type:UPDATE_LEAVE_BALANCE,payload:response.data.status})
                // dispatch(getCopyRight(IdDetails.project_id))
              return Promise.resolve();
            }else{
              notification.success({
                message: response.data.data,
              });
              return Promise.resolve(); 
            }
          });
        
    } catch (err) {
        
    }
}
