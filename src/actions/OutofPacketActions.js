import {GET_OPE_SEARCH,GET_OPE_ADVANCE,INSERT_OPE_ADVANCE} from "../utils/Constants";
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

export const GetOpeAdvance = (data) => async dispatch => {
    console.log(data,"data")
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
            dispatch(GetOpeSearch(localStorage.getItem("empId")))    
        })
        
    } catch (err) {
        
    }
}


export const InsertOpeExpenses = (data,file) => async dispatch => {
    // console.log("data",file[0].response.url)
    var fromData=new FormData()
    fromData.set("project_id",data.project_name.value)
    fromData.set("project_type_id",data.project_type.value)
    fromData.set("client_id",data.client.value)
    fromData.set("amount",data.amount.value)
    fromData.set("description",data.description.value)
    fromData.set("expence_type",data.expense.value)
    fromData.set("mode_of_payment",data.modeofpayment.value)
    fromData.set("created_on",moment().format("YYYY-MM-DD hh:mm:s"))
    fromData.set("created_by",localStorage.getItem("empId"))
    fromData.append("bill", file)
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
                }
            dispatch(GetOpeAdvance())
            dispatch(GetOpeSearch(localStorage.getItem("empId")))    
        })
        
    } catch (err) {
        
    }
}