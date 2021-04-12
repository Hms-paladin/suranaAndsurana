import { GET_ACTIVITY,GET_TAG,GET_PRIORITY,INSERT_TASK,INSERT_ADHOC_TASK,
    GET_LOCATION,GET_ASSIGN_TO,INSERT_TIME_SHEET,GET_EXPENSE_TYPE,GET_PAYMENT_MODE } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from 'moment';
import { notification } from "antd";

export const getActivity= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_activity'
        })
        .then((response) => {
            dispatch({type:GET_ACTIVITY,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getTagList= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_tag'
        })
        .then((response) => {
            dispatch({type:GET_TAG,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getPriorityList= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_priority'
        })
        .then((response) => {
            dispatch({type:GET_PRIORITY,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const inserTask = (params,timeSheetParams) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_task',
            data: params
          }).then((response) => {
            if (response.data.status === 1) {
                notification.success({
                    message: "Task added Successfully",
                  });
                dispatch({type:INSERT_TASK,payload:response.data.status})
                dispatch(insertTimeSheet(timeSheetParams,'id'))
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

export const insertAdhocTask = (params) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_adhoc_task',
            data: params
          }).then((response) => {
            if (response.data.status === 1) {
                var msg = response.data.msg;
                notification.success({
                    message: msg != "" ? msg : "Adhoc Task added Successfully",
                  });
                dispatch({type:INSERT_ADHOC_TASK,payload:response.data.status})
                return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

export const insertTimeSheet= (params,id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_start_time',
            data: params
          }).then((response) => {
            if (response.data.status === 1) {
                var msg = response.data.msg;
                notification.success({
                    message: "Time sheet updated",
                  });
                dispatch({type:INSERT_TIME_SHEET,payload:response.data.status})
                
              return Promise.resolve();
            }
          });
        
    } catch (err) {
        
    }
}

export const getAssignedTo= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_employee_list'
        })
        .then((response) => {
            dispatch({type:GET_ASSIGN_TO,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const getLocation= () => async dispatch => {
    try {

        axios({
            method: 'GET',
            url: apiurl +'get_court'
        })
        .then((response) => {
            dispatch({type:GET_LOCATION,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}
    export const getExpenseType= () => async dispatch => {
        try {
    
            axios({
                method: 'GET',
                url: apiurl +'get_expense_type'
            })
            .then((response) => {
                console.log(response.data.data, "dropdown");
                dispatch({type:GET_EXPENSE_TYPE,payload:response.data.data})
            })
            
        } catch (err) {
            
        }
    }
    
    export const getPaymentMode= () => async dispatch => {
        try {
    
            axios({
                method: 'GET',
                url: apiurl +'get_payment_mode'
            })
            .then((response) => {
                console.log(response.data.data, "dropdown");
                dispatch({type:GET_PAYMENT_MODE,payload:response.data.data})
            })
            
        } catch (err) {
            
        }
    }
    
    export const InsertOPE= (ope_form) => async dispatch => {
        // try {
        //     axios({
        //       method: 'POST',
        //       url: apiurl + 'insert_s_tbl_pm_resume',
        //       data: {
        //         "user_id": localStorage.getItem("user_id"),
        //     "created_on": moment().format('YYYY-MM-DD HH:m:s'),
        //     "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
        //     "created_by": localStorage.getItem("empId"),
        //     "updated_by": localStorage.getItem("empId"),
            
        //       }
        //     })
        //       .then(function (response) {
        //         if (response.data.status === 1) {
        //           notification.success({
        //             message: 'Resume Added Successfully',
        //           });
        //           return Promise.resolve();
        //         }
        //       });
        
        //   } catch (err) {
        //     notification.error({
        //       message: 'Record Not Added',
        //     });
        //   }
    }


