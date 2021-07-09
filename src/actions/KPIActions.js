import axios from "axios"
import { apiurl } from '../utils/baseUrl'
import {GET_KPI_ACHIVEMENT} from '../utils/Constants'
export default GetKpiAchivement=(data)=>async (dispatch)=>{
    try{
        const response=await axios({
            method:"post",
            url:apiurl+"get_kpi_achivement",
            data:{
                "emp_id":localStorage.getItem("empId"),
                "period_from":"2021-01-01",
                "period_to":"2021-06-01"
            }
        });
        return dispatch({type:GET_KPI_ACHIVEMENT,payload:response.data.data})
    }
}