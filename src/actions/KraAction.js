import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from "moment";
import { notification } from 'antd';
import { GET_KRA } from "../utils/Constants";


export const InsertKra = (kpi_form, Active, Percent, refLength, i) => async dispatch => {

    console.log(i, refLength, "kpi_form, Active, Percent")

    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_kra',
            data: {
                "emp_id": localStorage.getItem("empId"),
                "period_from": kpi_form.fromperiod.value || 0,
                "period_to": kpi_form.toperiod.value,
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

                    // dispatch(getDesignDetails(ProjectDetails.project_id))
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
