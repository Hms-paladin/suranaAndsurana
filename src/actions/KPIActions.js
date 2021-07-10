import axios from "axios"
import { apiurl } from '../utils/baseUrl'
import {notification} from 'antd'
import {GET_KPI_ACHIVEMENT,UPDATE_KPI_ACHIVEMENT,GET_KPI_APPROVAL} from '../utils/Constants'
export const GetKpiAchivement=(data)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"post",
            url:apiurl+"get_kpi_achivement",
            data:{
                "emp_id":4,
                "period_from":"2021-01-01",
                "period_to":"2021-06-01"
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
                "kpi_id":data
            },
        })
        .then((response) => {
            dispatch({type:GET_KPI_APPROVAL,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}