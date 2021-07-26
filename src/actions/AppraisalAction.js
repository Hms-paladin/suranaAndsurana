import { GET_EMP_APPRAISAL_DETAILS, GET_EMP_APPRAISAL, GET_EMP_APPRAISAL_SUP_RATE } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';

export const ApplyAppraisal = (modelComment, respbtn, assignbtn, Appraisal) => async dispatch => {
    console.log(modelComment, respbtn, assignbtn, "Add_question")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_emp_appraisal',
            data:
            {
                "emp_id": localStorage.getItem("empId"),
                "area_of_speci": modelComment.area_of_speci.value,
                "self_work_des": modelComment.self_work_des.value,
                "current_duties": modelComment.current_duties.value,
                "major_achievement": modelComment.major_achievement.value,
                "current_responsibilites": respbtn === 1 ? "Yes" : "No",
                "urge_to_learn": modelComment.urge_to_learn.value,
                "enhance_your_productivity": modelComment.enhance_your_productivity.value,
                "improvement_ssia": modelComment.improvement_ssia.value,
                "current_assignment": assignbtn === 1 ? "Yes" : "No",
                "current_assignment_command": Appraisal.comment.value,
                "opinion_remark": modelComment.opinion_remark.value,
                "growth_plan_three_yrs": modelComment.growth_plan_three_yrs.value,
                "growth_plan_five_yrs": modelComment.growth_plan_five_yrs.value
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Appraisal Apply Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {
        notification.error({
            message: 'Something Went Wrong,Record Not Added',
        });
    }
}


export const InsertAreaDevelopment = (showKeys, details, date) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_area_development',
            data:
            {
                "emp_id": localStorage.getItem("empId"),
                "area_development_id": showKeys,
                "details": details,
                "details_date": date
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Area Development Added Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {
    }
}

export const GetEmpAppraisalDetails = (tempid) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_emp_appraisal_details',
            data: {
                "emp_appr_id": tempid
            }
        })
            .then((response) => {
                dispatch({ type: GET_EMP_APPRAISAL_DETAILS, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const InsertApraisalSupervisor = (supmodelComment, emp_appr_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_emp_appraisal_supervisor',
            data: {
                "emp_appr_id": emp_appr_id,
                "appraisar_comments": supmodelComment.advice_manage_parter.values,
                "instruction_action": supmodelComment.instruction_action.values,
                "advice_manage_parter": supmodelComment.advice_manage_parter.values
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Appraisal Supervisor Added Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {

    }
}

export const InsertSupervisorRate = (rateList) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_emp_appraisal_super_rating',
            data: {
                "rating": rateList,
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: ' Rating Added Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {

    }
}


export const GetEmpAppraisal = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_emp_appraisal',
            data: {
                "emp_id": localStorage.getItem("empId"),
            }
        })
            .then((response) => {
                dispatch({ type: GET_EMP_APPRAISAL, payload: response.data.data })
            })

    } catch (err) {

    }
}

export const GetEmpAppraisalSupRate = (empid) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_emp_appraisal_super_rating',
            data: {
                "emp_id": empid,
            }
        })
            .then((response) => {
                dispatch({ type: GET_EMP_APPRAISAL_SUP_RATE, payload: response.data.data })
            })

    } catch (err) {

    }
}


export const InsertManagingPartnerRate = (rateList) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_emp_appraisal_manag_partner_rating',
            data: {
                "rating": rateList,
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: ' Rating Updated Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {

    }
}

export const InsertManagingPartnerEmpAppraisal = (managemodelComment, emp_appr_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_emp_appraisal_manag_parter',
            data: {
                "emp_appr_id": emp_appr_id,
                "instruction_to_appraise": managemodelComment.instruction_to_appraise.value,
                "advice_to_hod": managemodelComment.advice_to_hod.value,
                "instruction_to_admin_hod": managemodelComment.instruction_to_admin_hod.value,
                "fb_managing_parter": managemodelComment.fb_managing_parter.value
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Manager Approved Successfully',
                    });
                    return Promise.resolve();
                }
            });

    } catch (err) {

    }
}

