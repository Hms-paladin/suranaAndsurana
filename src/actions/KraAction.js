import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from "moment";
import { notification } from 'antd';
import { GET_KRA, GET_KRA_APPROVE } from "../utils/Constants";


export const InsertKra = (kpi_form, Active, Percent, refLength, i) => async dispatch => {
    console.log(moment(kpi_form.fromperiod.value).format('YYYY-MM-DD HH:m:s'), kpi_form, "kra")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_kra',
            data: {
                "emp_id": localStorage.getItem("empId"),
                "period_from": moment(kpi_form.fromperiod.value).format('YYYY-MM-DD HH:m:s') || 0,
                "period_to": moment(kpi_form.toperiod.value).format('YYYY-MM-DD HH:m:s'),
                "activity_id": Active,
                "kra_percentage": Percent,
                "created_on": moment().format('YYYY-MM-DD HH:m:s'),
                "created_by": localStorage.getItem("empId"),
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    if (i === refLength) {
                        notification.success({
                            message: 'KRA Added Successfully',
                        });
                    }
                    return Promise.resolve();
                }
            })

    } catch (err) {
        notification.error({
            message: 'Something Went Wrong,Record Not Added',
        });
    }
}

export const getKra = (kra_Model) => async (dispatch) => {
    const response = await axios({
        method: "post",
        url: apiurl + "get_kra",
        data: {
            "emp_id": kra_Model.employee.value,
            "period_from": kra_Model.fromperiod.value,
            "period_to": kra_Model.toperiod.value
        }
    });
    return dispatch({ type: GET_KRA, payload: response.data.data });
};

export const getKraApprove = (kra_id) => async (dispatch) => {
    const response = await axios({
        method: "post",
        url: apiurl + "get_kra_approval",
        data: {
            "kra_id": kra_id
        }
    });
    return dispatch({ type: GET_KRA_APPROVE, payload: response.data.data });
};


export const updateKraApprove = (kra_id, kra_form, approveid) => async (dispatch) => {
    console.log(kra_id, kra_form, approveid, "approveid")
    const response = await axios({
        method: "post",
        url: apiurl + "update_kra_precentage",
        data: {
            "kra_id": kra_id,
            "kra_percentage": kra_form
        }
    })
};


export const InsertApproveKra = (kraList, Active, Percent, refLength, i) => async dispatch => {
    console.log(i, refLength, "kpi_form, Active, Percent")
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_kra_approval',
            data: {
                "emp_id": localStorage.getItem("empId"),
                "period_from": kraList.period_from || 0,
                "period_to": kraList.period_to || 0,
                "activity_id": Active,
                "kra_percentage": Percent,
                "created_on": moment().format('YYYY-MM-DD HH:m:s'),
                "created_by": localStorage.getItem("empId"),
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    if (i === refLength) {
                        notification.success({
                            message: 'KRA Approve Successfully',
                        });
                    }
                    return Promise.resolve();
                }
            })

    } catch (err) {

    }
}