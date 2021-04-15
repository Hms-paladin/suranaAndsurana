import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import moment from "moment";
import { notification } from 'antd';

export const InsertDesign = (data, ProjectDetails) => async dispatch => {
    console.log(data, ProjectDetails, "ProjectDetailsTest")

    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_design',
            data: {
                "design_id": ProjectDetails.project_id,
                "project_id": ProjectDetails.project_type_id,
                "file_cover": data.file_cover && data.file_cover.value || "",
                "associate": data.associate && data.associate.value || "",
                "our_reference": data.our_ref && data.our_ref.value || "",
                "client_reference": data.client_ref && data.client_ref.value || "",
                "application_no": data.app_num && data.app_num.value || "",
                "application_date": data.app_date && data.app_date.value ? moment(data.app_date.value).format("YYYY-MM-DD") : 0,
                "applicant": data.applicant && data.applicant.value || "",
                "title": data.title && data.title.value || "",
                "class_id": data.class && data.class.value || 0,
                "country_id": data.country && data.country.value || 0,
                "priority_country_id": data.priority_country && data.priority_country.value || 0,
                "priority_date": data.priority_date && data.priority_date.value ? moment(data.priority_date.value).format("YYYY-MM-DD") : 0,
                "status": data.status && data.status.value || 0,
                "comments": data.comments && data.comments.value || "",
                "renewal_date": data.renewal_date && data.renewal_date.value ? moment(data.renewal_date.value).format("YYYY-MM-DD") : 0,
                "client_petitioner": "",
                "design_number": data.des_number && data.des_number.value || "",
                "petitioner": data.petitioner && data.petitioner.value || "",
                "responent_rep": data.respondent_rep && data.respondent_rep.value || "",
                "created_on": moment().format('YYYY-MM-DD HH:m:s'),
                "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
                "created_by": localStorage.getItem("empId"),
                "updated_by": localStorage.getItem("empId")
            }
        })
            .then((response) => {
                if (response.data.status === 1) {
                    notification.success({
                        message: 'Record Added Successfully',
                    });
                    return Promise.resolve();
                }
            })

    } catch (err) {
        notification.error({
            message: 'Something Went Wrong,Record Not Added',
          });
    }
}

// "design_id": "2",
// "project_id": "8",
// "file_cover": "Cover",
// "associate": "Associate Levels",
// "our_reference": "Refered",
// "client_reference": "Client Refered",
// "application_no": "4",
// "application_date": "2021-02-03",
// "applicant": "Apllicant",
// "title": "The Shepered",
// "class_id": "6",
// "country_id": "3",
// "priority_country_id": "2",
// "priority_date": "2021-02-03",
// "status": "2",
// "comments": "Very Poor",
// "renewal_date": "2021-03-02",
// "client_petitioner": "Petitioner",
// "design_number": "1",
// "petitioner": "Next Petitioner",
// "responent_rep": "Responent",
// "created_on": "2021-03-08",
// "updated_on": "2021-03-09",
// "created_by": "2",
// "updated_by": "1"