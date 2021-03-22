
// import { INSERT_RESUME } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';
import moment from "moment";

export const InesertResume = (Resume_Form, educationList, experienceList) => async dispatch => {
  try {
    axios({
      method: 'POST',
      url: apiurl + 'insert_s_tbl_pm_resume',
      data: {
        "user_id": localStorage.getItem("user_id"),
        "name": Resume_Form.name.value,
        "type_of_resource": Resume_Form.candidate.value,
        "gender": Resume_Form.gender.value === 1 ? "M": "F",
        "dob": moment(Resume_Form.DOB.value).format("YYYY-MM-DD"),
        "ref_email_1": Resume_Form.email1.value,
        "ref_email_2": Resume_Form.email2.value,
        "ref_phone_1": Resume_Form.phone1.value,
        "ref_phone_2": Resume_Form.phone2.value,
        "skills": Resume_Form.skills.valueById,
        "traits": Resume_Form.Traits.valueById,
        "certifications": Resume_Form.certifications.valueById,
        "specialization": Resume_Form.specializations.valueById,
        "talent": Resume_Form.talents.valueById,
        "special_interest": Resume_Form.intrests.valueById,
        "con_ph_no": Resume_Form.contactPhone.value,
        "email_addr": Resume_Form.emailId.value,
        "postal_addr": Resume_Form.mailAddress.value,
        "state_of_domecile": Resume_Form.state.value,
        "city": Resume_Form.city.value,
        "lang_known": Resume_Form.language.valueById,
        "qualification":educationList,
        "experience":experienceList,
        "organization1":Resume_Form.organization1.value,
        "organization2":Resume_Form.organization2.value,
        "ref_name1":Resume_Form.name1.value,
        "ref_name2":Resume_Form.name2.value,
        "linkedin":Resume_Form.linkedin.value,
        "twitter":Resume_Form.twitter.value,
        "created_on": moment().format('YYYY-MM-DD HH:m:s'),
        "updated_on": moment().format('YYYY-MM-DD HH:m:s'),
        "created_by": localStorage.getItem("empId"),
        "updated_by": localStorage.getItem("empId"),
        "ip_address": "123"
      }
    })
      .then(function (response) {
        // moment(Resume_Form.startDate).format("YYYY-MM-DD, hh:mm:ss")
        if (response.data.status === 1) {
          notification.success({
            message: 'Resume Added Successfully',
          });
          return Promise.resolve();
        }
      });

  } catch (err) {
    notification.error({
      message: 'Record Not Added',
    });
  }
}
