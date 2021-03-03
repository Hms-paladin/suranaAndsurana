import React, {useEffect, useState} from "react";
import { Modal } from 'antd';
import Labelbox from "../../helpers/labelbox/labelbox";
import Axios from 'axios';
import { apiurl } from "../../utils/baseUrl";


function DynModel(props){
    const [visible, setVisible] = React.useState(false);
    const [getdata, setgetData]= useState([])


    useEffect(()=>{
  
        Axios({
            method:"POST",
            url: apiurl + '/get_candidate_details_by_id',         
            data:{
                "resume_id":"2"
            }
        })
        .then((response)=>{
            setgetData(response.data.data)
        })
    },[])

    function handleCancel() {
        setVisible(false)
        props.handleChangeCloseModel(false)
    }

    React.useEffect(()=>{
        setVisible(props.handleChangeModel)
    },[props.handleChangeModel])

    return(
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
            {getdata.map((val,index)=>{
                return(
                    <div className="Employee_formdiv">
                       <div className="employeeform_row1">
                          <div className="employeeform_r1"><div className="headcolor">Name</div><div className="employeecont">{val.name}</div></div>
                          <div className="employeeform_r1"><div className="headcolor">Employee ID</div><div className="employeecont">{val.user_id}</div></div>
                          <div className="employeeform_r1"><div className="headcolor">Date of Birth</div><div className="employeecont">{val.dob}</div></div>
                          <div className="employeeform_r1"><div className="headcolor">Gender</div><div className="employeecont">{val.gender}</div></div>
                          <div className="employeeform_r1"><div className="headcolor">Basic Qualification</div><div className="employeecont">{val.bas_qual}</div></div>
                          <div className="employeeform_r1"><div className="headcolor">Additional Qualification 1</div><div className="employeecont">{val.add_quali_1}</div></div>
                          <div className="employeeform_r1"><div className="headcolor">Additional Qualification 2</div><div className="employeecont">{val.add_quali_2}</div></div>
                       </div>
                    <div className="employeeform_row2">
                        <div className="employeeform_row2flex1">
                          <div className="employeeform_r1"><div className="headcolor">Institution</div><div className="employeecont">{val.institution}</div></div>
                          <div className="employeeform_r1"><div className="headcolor">Last Employer</div><div className="employeecont">{val.last_employer}</div></div>
                          <div className="employeeform_r1"><div className="headcolor">Start Date</div><div className="employeecont">{val.last_empr_start_date}</div></div>
                          <div className="employeeform_r1"><div className="headcolor">End Date</div><div className="employeecont">{val.last_empr_end_date}</div></div>
                        </div>
                        <div className="employeeform_row2flex2">
                          <div className="employeeform_r2"><div className="headcolor">Skills</div><div className="employeecont">{val.skills}</div></div>
                          <div className="employeeform_r2 traitsdiv"><div className="headcolor">Traits</div><div className="employeecont">{val.traits}</div></div>
                        </div>
                    </div>
                    <div className="employeeform_row3">
                      <div className="employeeform_r2"><div className="headcolor">Certifications</div><div className="employeecont">{val.certifications}</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Specialization</div><div className="employeecont">{val.specialization}</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Acheivements</div><div className="employeecont">{val.achievement}</div></div>
                    </div>
                    <div className="employeeform_row4">
                      <div className="employeeform_r2"><div className="headcolor">Capabilitites</div><div className="employeecont">{val.capability}</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Talents</div><div className="employeecont">{val.talent}</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Special Interest/Hobby</div><div className="employeecont">{val.special_interest}</div></div>
                    </div> 
                    <div className="employeeform_row5">
                      <div className="employeeform_r2"><div className="headcolor">Contact Phone no.</div><div className="employeecont">{val.con_ph_no}</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Email ID</div><div className="employeecont">{val.email_addr}</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Mail Address</div><div className="employeecont">{val.email_addr}</div></div>
                    </div>
                    <div className="employeeform_row6">
                      <div className="employeeform_r2"><div className="headcolor">State of Domecile</div><div className="employeecont">{val.state_of_domecile}</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">City</div><div className="employeecont">{val.city}</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Status of the Candidate</div><div className="employeecont">{val.status_resource}</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Languages Known</div><div className="employeecont">{val.lang_known}</div></div>
                    </div>     
                </div>
                )  
            })
            }
        </Modal>
    )
}

export default DynModel;