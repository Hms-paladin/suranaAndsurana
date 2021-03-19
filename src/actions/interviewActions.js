import { GET_INTERVIEW_QUESTIONS,GET_CANDIDATES_DETAILS,POST_INTERVIEW_QUESTIONS } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';
import moment from 'moment'




export const getInterviewquestions = () => async dispatch => {
    try {
        axios({
            method: 'GET',
            url: apiurl +'/get_questions',
        })
        .then((response) => {
            dispatch({type:GET_INTERVIEW_QUESTIONS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}

export const InsertInterviewquestions =(postData,id,data,round)=> async dispatch =>{
    try {
        console.log(postData,"obj")
        axios({
            method:'POST',
            url:apiurl + 'insert_interview_scores',
            data:{
                "designation":data.designation_id,
                "comment":postData.comment.value,
                "score_inital":postData.initial_score.value,
                "score_reviewer":localStorage.getItem("empId"),
                "final_score":postData.final_score.value,
                "status":postData.init_status.value,
                "int_details_id":data.int_details_id    ,
                "resume_id":id,
                "created_on":moment().format('YYYY-MM-DD HH:m:s')   ,
                "updated_on":moment().format('YYYY-MM-DD HH:m:s') ,
                "created_by":localStorage.getItem("empId"),
                "updated_by":localStorage.getItem("empId"),
                "ip_address":"Fify Two",
                "task_id": data.no_of_candidates === 1 ?  data.task_id : 0,
                "round":round
            }
        })
        // .then((response)=> {
        //     // dispatch({type:POST_INTERVIEW_QUESTIONS,payload:response})
          
        // }) 
         .then(function (response) {
            console.log(response,"response")
            // moment(Resume_Form.startDate).format("YYYY-MM-DD, hh:mm:ss")
            if(response.data.status===1){
            notification.success({
                message: 'Scores Updated Successfully',
              });
            return Promise.resolve();
            }
        });
    }
    catch(err){
        alert(err)

    }
}
export const GetCandiateDetails = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl +'get_selected_candidates',
            data:{
                "int_detail_id":"1"
            }
        })
        .then((response) => {
            console.log(response.data.data,"candiate")
            dispatch({type:GET_CANDIDATES_DETAILS,payload:response.data.data})
        })
        
    } catch (err) {
        
    }
}