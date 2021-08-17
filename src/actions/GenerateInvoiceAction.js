import {UPDATE_BILLABLE_HOURS, GET_BEI_BY_PROJECT,GET_BEI_SEARCH,INSERT_GENERATE_INVOICE } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const insertGenerateInvoice = (params,employee_id,eligible_leave,employee_code) => async dispatch => {

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
            url: apiurl + 'insert_generate_invoice',
            data: DocumentData
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Invoice Generated Successfully",
                  });
                dispatch({type:INSERT_GENERATE_INVOICE,payload:response.data.status})
                dispatch(getBeiListByProjectId(params,employee_code))
              return Promise.resolve();
            }else{
              let exist=false
              notification.success({
                message: response.data.data,
              });
              dispatch({type:INSERT_GENERATE_INVOICE,payload:exist})
              return Promise.resolve(); 
            }
          });
        
    } catch (err) {
        
    }
}

export const getBeiListByProjectId = (project_id) => async dispatch => {

  try {

      axios({
          method: "POST",
          url: apiurl + "get_bei_list_by_projectId",
          data: {
            project_id: project_id,
          },
        }).then((response) => {
          if (response.data.status === 1) {
            // console.log(response.data.data.length,"//")
              dispatch({type:GET_BEI_BY_PROJECT,payload:response.data.data})
            return Promise.resolve();
          }
        });
      
  } catch (err) {
      
  }
}

export const getBeiSearch = (params) => async dispatch => {

    try {
  
        axios({
            method: "POST",
            url: apiurl + "get_bei_search",
            data: {
                client_id: params.client.value,
                from_date: params.from_date.value,
                to_date:  params.to_date.value,
            },
          }).then((response) => {
            if (response.data.status === 1) {
              // console.log(response.data.data.length,"//")
                dispatch({type:GET_BEI_SEARCH,payload:response.data.data})
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
  }

  export const updateBillableHours = (params,eligible_leave,emp_leave_mas_id,employee_code) => async dispatch => {

    var DocumentData = new FormData();
    DocumentData.set("emp_leave_mas_id",emp_leave_mas_id)
    DocumentData.set("eligible_leave",eligible_leave)
    DocumentData.set("start_date",params.start_date.value)
    DocumentData.set("end_date",params.end_date.value)
    DocumentData.set("created_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("updated_on",moment().format('YYYY-MM-DD HH:m:s')  )
    DocumentData.set("created_by",localStorage.getItem("empId"))
    DocumentData.set("updated_by",localStorage.getItem("empId"))
    try {
        axios({
            method: 'PUT',
            url: apiurl + 'update_billable_hours',
            data: DocumentData
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Leave Balance Updated Successfully",
                  });
                dispatch({type:UPDATE_BILLABLE_HOURS,payload:response.data.status})
                dispatch(getBeiListByProjectId(params,employee_code))
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
