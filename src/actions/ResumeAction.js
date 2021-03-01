
// import { INSERT_RESUME } from "../utils/Constants";
import { apiurl } from "../utils/baseUrl.js";
import axios from "axios";
import { notification } from 'antd';
import moment from "moment";

export const InesertResume = (Resume_Form) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'insert_s_tbl_pm_resume',
            data:{
                "user_id": 1,
                "name": Resume_Form.name.value,
                "type_of_resource": Resume_Form.candidate.value,
                "gender": Resume_Form.gender.value,
                "dob": moment(Resume_Form.DOB.value).format("YYYY-MM-DD"),
                "bas_qual": Resume_Form.basicQualification.value,
                "add_quali_1": Resume_Form.additionalQualification1.value,
                "add_quali_2": Resume_Form.additionalQualification2.value,
                "institution": Resume_Form.institution.value,
                "last_employer": Resume_Form.lastEmployer.value,
                "last_empr_start_date": Resume_Form.startDate.value ? moment(Resume_Form.startDate.value).format("YYYY-MM-DD") : "",
                "last_empr_end_date": Resume_Form.endDate.value ? moment(Resume_Form.endDate.value).format("YYYY-MM-DD") : "",
                "ref_email_1": Resume_Form.email1.value,
                "ref_email_2": Resume_Form.email2.value,
                "ref_phone_1": Resume_Form.phone1.value,
                "ref_phone_2": Resume_Form.phone2.value,
                "skills": Resume_Form.skills.valueById,
                "traits": Resume_Form.Traits.valueById,
                "certifications": Resume_Form.certifications.valueById,
                "specialization": Resume_Form.specializations.valueById,
                "achievement": "",
                "capability": "",
                "talent": Resume_Form.talents.valueById,
                "special_interest": Resume_Form.intrests.valueById,
                "con_ph_no": Resume_Form.contactPhone.value,
                "email_addr": Resume_Form.emailId.value,
                "postal_addr": Resume_Form.mailAddress.value,
                "state_of_domecile": Resume_Form.state.value,
                "city": Resume_Form.city.value,
                "status_resource": 1,
                "lang_known": Resume_Form.language.valueById,
                "industry": Resume_Form.industry.value,
                "created_on": "2021-02-18 04:57:18",
                "updated_on": "2021-02-18 04:57:18",
                "created_by": 1,
                "updated_by": 1,
                "ip_address": "123"
            }
          })
            .then(function (response) {
                // moment(Resume_Form.startDate).format("YYYY-MM-DD, hh:mm:ss")
                if(response.data.status===1){
                notification.success({
                    message: 'Record Added Successfully',
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
