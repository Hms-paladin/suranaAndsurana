import React, { useEffect, useState } from "react";
import { Modal } from 'antd';
import Labelbox from "../../helpers/labelbox/labelbox";
import Axios from 'axios';
import { apiurl } from "../../utils/baseUrl";
import moment from 'moment'
import './candidateModel.scss';

function DynModelView(props) {
  const [visible, setVisible] = React.useState(false);
  const [getdata, setgetData] = useState([])
  const [res_id, setres_id] = useState({})
  useEffect(() => {
    console.log(props, "propsprops")
    setres_id(props.data_id && props.data_id.resume_id)
    console.log(props.data_id, "//")
    Axios({
      method: "POST",
      url: apiurl + 'get_candidate_details_by_id',
      data: {
        "resume_id": props.res_data_id || props.data_id && props.data_id.resume_id
      }
    })
      .then((response) => {
        setgetData(response.data.data[0].result)
      })


    // setres_id(props.data_id.map((data,index)=>{

    //   getres_id(data.resume_id)

    // }))

    // setres_id(prevState =>({
    //   ...prevState,
    //    res_id:props.data_id&&props.data_id.resume_id
    // }))


  }, [props.res_data_id])

  console.log(getdata.type_of_resource, "type_of_resource")


  function handleCancel() {
    setVisible(false)
    props.handleChangeCloseModel(false)
  }


  React.useEffect(() => {
    setVisible(props.handleChangeModel)
  }, [props.handleChangeModel])


  return (
    <Modal
      className="modelContainer"
      title={props.modelTitle}
      centered={props.centered ? true : false}
      visible={visible}
      footer={null}
      width={props.width ? props.width : 1000}
      zIndex={1201}
      onCancel={handleCancel}
    >
      {getdata.map((val, index) => {
        console.log(val, "gender")
        return (
          <div className="Employee_formdiv">

            <div className="employeeform_row2">
              <div className="employeeform_row2flex1">
                <div className="employeeform_r1"><div className="headcolor">Name</div><div className="employeecont">{val.name ? val.name : "-"}</div></div>
                <div className="employeeform_r1"><div className="headcolor">Resume ID</div><div className="employeecont">{val.resume_id ? val.resume_id : ""}</div></div>
                <div className="employeeform_r1"><div className="headcolor">Date of Birth</div><div className="employeecont">{val.dob ? moment(val.dob).format("DD-MMM-YYYY") : "-"}</div></div>
                <div className="employeeform_r1"><div className="headcolor">Gender</div><div className="employeecont">{val.gender == "M" ? "Male" : "Female"}</div></div>
              </div>
              <div className="employeeform_row2flex2">
                <div className="employeeform_r2"><div className="headcolor">Skills</div><div className="employeecont">{val.skill_name ? val.skill_name : "-"}</div></div>
                <div className="employeeform_r2 traitsdiv"><div className="headcolor">Traits</div><div className="employeecont">{val.traits ? val.traits : "-"}</div></div>
              </div>
            </div>
            <div className="tableHeading">Education</div>
            <div className="employeeform_row2">

              <div className="educationtable">
                <div className="educationHeader">
                  <div>S.No</div>
                  <div>Qualification</div>
                  <div>Institution/University</div>
                  <div>Year of Passing</div>
                  <div >Percentage/CGPA</div>
                </div>
                {val.qualification.map((values, index) => {
                  return (
                    <div className="educationRow">
                      <div>{index + 1}</div>
                      <div>{values.qual_name}</div>
                      <div>{values.institution}</div>
                      <div>{values.year_of_passing}</div>
                      <div className="educcatiocgpa">{values.cgpa}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {val.type_of_resource !== 'Intern' && <div className="expDetailes">
              <div className="tableHeading">Previous Employer Details</div>
              <div className="educationtable">
                <div className="EmployeeHeader">
                  <div>S.No</div>
                  <div>Type of Industry</div>
                  <div>Company Name</div>
                  <div>City</div>
                  <div>Department</div>
                  <div>Designation</div>
                  <div>Period From</div>
                  <div>Period To</div>
                </div>
                {val.experience.map((values, index) => {
                  return (
                    <div className="EmployeeRow">
                      <div>{index + 1}</div>
                      <div>{values.industry}</div>
                      <div>{values.company_name}</div>
                      <div>{values.city}</div>
                      <div>{values.department_id}</div>
                      <div>{values.designation_id}</div>
                      <div>{values.period_from}</div>
                      <div>{values.period_to}</div>
                    </div>

                  )
                })}

              </div>
            </div>}
            <div className="employeeform_row3">
              <div className="employeeform_r2"><div className="headcolor">Certifications</div><div className="employeecont">{val.certification ? val.certification : "-"}</div></div>
              <div className="employeeform_r2 traitsdiv"><div className="headcolor">Specialization</div><div className="employeecont">{val.specilization ? val.specilization : "-"}</div></div>
              <div className="employeeform_r2 traitsdiv"><div className="headcolor">Achievements</div><div className="employeecont">{val.achievement ? val.achievement : "-"}</div></div>
            </div>
            <div className="employeeform_row4">
              <div className="employeeform_r2"><div className="headcolor">Capabilities</div><div className="employeecont">{val.capability ? val.capability : "-"}</div></div>
              <div className="employeeform_r2 traitsdiv"><div className="headcolor">Talents</div><div className="employeecont">{val.talent ? val.talent : "-"}</div></div>
              <div className="employeeform_r2 traitsdiv"><div className="headcolor">Special Interest/Hobby</div><div className="employeecont">{val.special_interest ? val.special_interest : "-"}</div></div>
            </div>
            <div className="employeeform_row5">
              <div className="employeeform_r2"><div className="headcolor">Contact Phone no.</div><div className="employeecont">{val.con_ph_no ? val.con_ph_no : "-"}</div></div>
              <div className="employeeform_r2 traitsdiv"><div className="headcolor">Email ID</div><div className="employeecont">{val.email_addr ? val.email_addr : "-"}</div></div>
              <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Mail Address</div><div className="employeecont">{val.email_addr ? val.postal_addr : "-"}</div></div>
            </div>
            <div className="employeeform_row6">
              <div className="employeeform_r2"><div className="headcolor">State of Domicile</div><div className="employeecont">{val.state_of_domecile ? val.state_of_domecile : "-"}</div></div>
              <div className="employeeform_r2 traitsdiv"><div className="headcolor">City</div><div className="employeecont">{val.city ? val.city : "-"}</div></div>
              <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Languages Known</div><div className="employeecont">{val.language ? val.language : "-"}</div></div>
              <div className="employeeform_r2 traitsdiv"><div className="headcolor">Interview Status</div><div className="employeecont">{val.status_resource ? val.status_resource : "-"}</div></div>

            </div>
          </div>
        )
      })
      }
    </Modal>
  )
}

export default DynModelView;