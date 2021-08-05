import {GET_OPE_SEARCH,GET_OPE_ADVANCE,INSERT_OPE_ADVANCE,GET_OPEPROJECT_TYPE,GET_PROJECT_TYPEBASED_CLIENT_TYPE} from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';
import moment from 'moment'

export const GetOpeSearch = (data) => async dispatch => {
    console.log(data,"data")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_ope_search',
            data: {
                "from_date":data.from_date.value,
	            "to_date":data.to_date.value,
	            "employee_id":data.employee.value
            },
        })
        .then((response) => {
            
            dispatch({type:GET_OPE_SEARCH,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const GetOpeAdvance = (id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_ope_advance_details',
            data: {
                "employee_id":localStorage.getItem("empId")
            },
        })
        .then((response) => {
            dispatch({type:GET_OPE_ADVANCE,payload:response.data.data})
          
        })
        
    } catch (err) {
        
    }
}



export const InsertOpeAdvance = (amt) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_ope_advance',
            data: {
                "employee_id":localStorage.getItem("empId"),
                "advance_amount":amt,
                "created_on":moment().format("YYYY-MM-DD"),
                "created_by":localStorage.getItem("empId")
            },
        })
        .then((response) => {
            dispatch({type:INSERT_OPE_ADVANCE,payload:response.data.data})
            if(response.data.status===1){
                notification.success({
                    message: 'Advance added successfully',
                  });
                }
            dispatch(GetOpeAdvance())
            dispatch(GetOpeSearch()) 
            return Promise.resolve();   
        })
        
    } catch (err) {
        
    }
}


export const InsertOpeExpenses = (data,file,state) => async dispatch => {
    var fromData=new FormData()
    fromData.set("date",data.date.value)
    fromData.set("project_id",data.project_name.value)
    fromData.set("project_type_id",data.project_type.value)
    fromData.set("client_id",data.client.id)
    fromData.set("amount",data.amount.value)
    fromData.set("description",data.description.value)
    fromData.set("expence_type",data.expense.value)
    fromData.set("mode_of_payment",data.modeofpayment.value)
    fromData.set("created_on",moment().format("YYYY-MM-DD"))
    fromData.set("created_by",localStorage.getItem("empId"))
    // fromData.set("bill", file)
    fromData.append('bill', file)
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_ope_expenses',
            data: fromData
              
        })
        .then((response) => {
            
            dispatch({type:INSERT_OPE_ADVANCE,payload:response.data.data})
            if(response.data.status===1){
                notification.success({
                    message: 'Expense added successfully',
                  });
                  dispatch(GetOpeAdvance())
                  dispatch(GetOpeSearch(state))
                  
            }
              
            return Promise.resolve();   
        })
        
    } catch (err) {
        
    }
}

export const GetOpeProjectType = (id) => async (dispatch) => {
    try {
      const response = await axios({
        method: 'POST',
        url: apiurl + "get_projectId_by_projectType",
        data: {
            project_type_id: id
        }
      });
      return dispatch({ type: GET_OPEPROJECT_TYPE, payload: response.data.data });
    }
    catch (err) { }
  }

  export const ProjectBased_ClientName = (id) => async (dispatch) => {
    try {
      const response = await axios({
        method: 'POST',
        url: apiurl + "get_clientId_by_projectId",
        data: {
            project_id: id
        }
      });
      return dispatch({ type: GET_PROJECT_TYPEBASED_CLIENT_TYPE, payload: response.data.data });
    }
    catch (err) { }
  }