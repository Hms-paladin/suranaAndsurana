import { GET_EMPLOYEEFORM_ID } from '../utils/Constants';
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";

export const getemplyoeeformid = ()=> async dispatch =>{
    alert("actions")
    try{
        axios({
            method:'GET',
            url: apiurl + 'get_candidate_details_by_id',
        })
        .then((response)=>{
            console.log(response,"ress")
            dispatch({type:GET_EMPLOYEEFORM_ID, payload:response})
        })
    }
    catch(err){
        
        
    }
}