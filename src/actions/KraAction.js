import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from "moment";
import { notification } from 'antd';
import { GET_KRA, GET_KRA_APPROVE } from "../utils/Constants";
import {GetKpiAchivement} from './KPIActions'

export const InsertKra = (kpi_form, Active, Percent, refLength, i) => async dispatch => {
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
                    dispatch(getKra())
                    dispatch(GetKpiAchivement())
                    return Promise.resolve();
                }
            })

    } catch (err) {
        notification.error({
            message: 'Something Went Wrong,Record Not Added',
        });
    }
}

export const getKra = (from, to,empid) => async (dispatch) => {
    const response = await axios({
        method: "post",
        url: apiurl + "get_kra",
        data: {
            "emp_id":empid|| localStorage.getItem("empId"),
            "period_from":from?moment(from).format('YYYY-MM'):"",
            "period_to":to?moment(to).format('YYYY-MM') || moment().format('YYYY-MM'):''
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
    const response = await axios({
        method: "post",
        url: apiurl + "update_kra_precentage",
        data: {
            "kra_id": kra_id,
            "kra_percentage": kra_form
        }
    })
};


export const InsertApproveKra = (approveid, kraList, Active, Percent, refLength, i) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_kra_approval',
            data: {
                "kra_id": approveid,
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

// export const getKraCheckDate = (kpi_form) => async dispatch => {

//     try {
//         axios({
//             method: 'POST',
//             url: apiurl + 'get_kra_check_date',
//             data: {
//                 "emp_id": localStorage.getItem("empId"),
//                 "period_from": moment(kpi_form.fromperiod.value).format("YYYY-MM") || 0,
//                 "period_to": moment(kpi_form.toperiod.value).format("YYYY-MM") || 0,
//             }
//         })
//             .then((response) => {
//                 // if (response.data.status === 1) {
//                 //     if (i === refLength) {
//                 //         notification.success({
//                 //             message: 'KRA Approve Successfully',
//                 //         });
//                 //     }
               
//                     return response;
//                 // }
//             })

//     } catch (err) {

//     }
// }