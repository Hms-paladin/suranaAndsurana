import { GET_EMP_APPRAISAL_DETAILS, GET_EMP_APPRAISAL, GET_EMP_APPRAISAL_SUP_RATE, GET_EMP_APPRAISAL_DETAIL_EMPID } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { notification } from 'antd';
import { Redirect, Link } from "react-router-dom";


// const history = useHistory();
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
                        message: 'Appraisal Saved Successfully ',
                    });
                    dispatch({ type: GET_EMP_APPRAISAL_DETAILS, payload: response.data.data })
                    dispatch({ type: GET_EMP_APPRAISAL_DETAIL_EMPID, payload: response.data.data })
                    dispatch({ type: GET_EMP_APPRAISAL, payload: response.data.data })
                    return Promise.resolve();
                }
                if (response.data.msg === "Alredy Applied") {
                    notification.error({
                        message: 'Appraisal Already Saved '
                    });
                    dispatch({ type: GET_EMP_APPRAISAL_DETAILS, payload: response.data.data })
                    return Promise.resolve();
                }
            });

    } catch (err) {
        notification.error({
            message: 'Something Went Wrong,Record Not Added',
        });
    }
}

export const UpdateApplyAppraisal = (emp_appr_id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'update_emp_appraisal',
            data: {
                "emp_id": localStorage.getItem("empId"),
                "emp_appr_id": emp_appr_id
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Appraisal Applied Successfully',
                    });
                    dispatch({ type: GET_EMP_APPRAISAL_DETAILS, payload: response.data.data })
                    return Promise.resolve();
                }
                if (response.data.msg === "Alredy Applied") {
                    notification.error({
                        message: 'Appraisal Already Applied'
                    });
                    dispatch({ type: GET_EMP_APPRAISAL_DETAILS, payload: response.data.data })
                    dispatch({ type: GET_EMP_APPRAISAL_DETAIL_EMPID, payload: response.data.data })
                    dispatch({ type: GET_EMP_APPRAISAL, payload: response.data.data })
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
                        message: 'Area of Development Added Successfully',
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
                dispatch({ type: GET_EMP_APPRAISAL_DETAILS, payload: response.data.data[0] })
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
                "advice_manage_parter": supmodelComment.advice_manage_parter.values,
                "area_of_speci_remarks": supmodelComment.area_of_speci_remarks.values,
                "self_work_des_remarks": supmodelComment.self_work_des_remarks.values,
                "current_duties_remarks": supmodelComment.current_duties_remarks.values,
                "major_achievement_remarks": supmodelComment.major_achievement_remarks.values,
                "urge_to_learn_remarks": supmodelComment.urge_to_learn_remarks.values,
                "enhance_your_productivity_remarks": supmodelComment.enhance_your_productivity_remarks.values,
                "improvement_ssia_remarks": supmodelComment.improvement_ssia_remarks.values,
                "opinion_remark_remarks": supmodelComment.opinion_remark_remarks.values,
                "growth_plan_three_yrs_remarks": supmodelComment.growth_plan_three_yrs_remarks.values,
                "growth_plan_five_yrs_remarks": supmodelComment.growth_plan_five_yrs_remarks.values,
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Appraisal Supervisor Added Successfully',
                    });
                    window.location = "/Home/todoList"
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



export const GetEmpAppraisalDetailbyEmpid = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'get_emp_appra_detail_by_emp_id',
            data: {
                "emp_id": localStorage.getItem("empId"),
            }
        })
            .then((response) => {
                dispatch({ type: GET_EMP_APPRAISAL_DETAIL_EMPID, payload: response.data.data })
            })

    } catch (err) {

    }
}