import axios from "axios"
import { apiurl } from '../utils/baseUrl'
import {notification} from 'antd'
import {GET_KPI_ACHIVEMENT,UPDATE_KPI_ACHIVEMENT,GET_KPI_APPROVAL,UPDATE_KPI_APPROVAL,INSERT_KPI} from '../utils/Constants'
import moment from "moment"
import {getOtherTask} from './TodoListAction'
export const GetKpiAchivement=(data,empid)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"post",
            url:apiurl+"get_kpi_achivement",
            data:{
                "emp_id":empid?empid:localStorage.getItem("empId"),
                "period_from":data.from.value?moment(data.from.value).format("YYYY-MM"):"",
                "period_to":data.from.value?moment(data.to.value).format("YYYY-MM"):moment().format("YYYY-MM")
            }
        });
        return dispatch({type:GET_KPI_ACHIVEMENT,payload:response.data.data})
    }
    catch (err) {

    }
}




export const UpdateKpiAchivement = (data,achivement) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'update_kpi_achievement',
            data: {
                "kpi_id":data,
                "achievement":achivement
            },
        })
        .then((response) => {
            dispatch({type:UPDATE_KPI_ACHIVEMENT,payload:response.data.data})
            if(response.data.status===1){
                notification.success({
                    message: 'Kpi achivement updated successfully',
                  });
                }
            dispatch(GetKpiAchivement())
        })
        
    } catch (err) {
        
    }
}


export const GetKpiApproval = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_kpi_approval',
            data: {
                "kpi_id":data.kpi_id
            },
        })
        .then((response) => {
            console.log("responsedata",response)
            dispatch({type:GET_KPI_APPROVAL,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}


export const ApproveKpi = (form,props) => async dispatch => {
    console.log("formdataaaa",form,props.kpi_id)
    try {
        axios({
            method: 'post',
            url: apiurl + 'insert_kpi_approval',
            data: {
                "kpi_id":props.kpi_id,
                "emp_id":props.employee_id,
                "period_from":props.start_date,
                "period_to":props.end_date,
                "approve_status":"1",
                "qualification":form.qualification.value,
                "additional_achievements":form.achivements.value,
                "seminar":form.seminar.value,
                "tranings":form.trainings.value,
                "approved_on":moment().format("YYYY-MM-DD"),
                "approved_by":localStorage.getItem("empId")
            },
        })
        .then((response) => {
            dispatch({type:UPDATE_KPI_APPROVAL,payload:response.data.data})
            console.log("responsedata",response)
            if(response.data.status===1){
                notification.success({
                    message: 'Kpi approved successfully',
                  });
                }
            dispatch(getOtherTask())    
            return Promise.resolve();
        })
        
    } catch (err) {
        notification.error({
            message: 'Something wrong,kpi not approved',
          });
    }
}


export const InsertKpi = (data) => async dispatch => {
    try {
        axios({
            method: 'post',
            url: apiurl + 'insert_kpi',
            data: {
                kpi:data||0
            },
        })
        .then((response) => {
            dispatch({type:INSERT_KPI,payload:response.data.data})
            console.log("responsedata",response)
            if(response.data.status===1){
                notification.success({
                    message: 'Kpi inserted successfully',
                  });
                }
            dispatch(getOtherTask())    
            return Promise.resolve();
        })
        
    } catch (err) {
        notification.error({
            message: 'Something wrong,kpi not inserted',
          });
    }
}