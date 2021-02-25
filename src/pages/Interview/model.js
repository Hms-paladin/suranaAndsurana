import React, {useState} from "react";
import { Modal } from 'antd';
import Labelbox from "../../helpers/labelbox/labelbox";


function DynModel(props){
    const [visible, setVisible] = React.useState(false);

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
            <div className="Employee_formdiv">
                <div className="employeeform_row1">
                      <div className="employeeform_r1"><div className="headcolor">Name</div><div className="employeecont">John Wick</div></div>
                      <div className="employeeform_r1"><div className="headcolor">Employee ID</div><div className="employeecont">J02445</div></div>
                      <div className="employeeform_r1"><div className="headcolor">Date of Birth</div><div className="employeecont">11 Jan 2021</div></div>
                      <div className="employeeform_r1"><div className="headcolor">Gender</div><div className="employeecont">M</div></div>
                      <div className="employeeform_r1"><div className="headcolor">Basic Qualification</div><div className="employeecont">B.Sc</div></div>
                      <div className="employeeform_r1"><div className="headcolor">Additional Qualification 1</div><div className="employeecont">B.Sc</div></div>
                      <div className="employeeform_r1"><div className="headcolor">Additional Qualification 2</div><div className="employeecont">B.Sc</div></div>


                </div>
                <div className="employeeform_row2">
                    <div className="employeeform_row2flex1">
                      <div className="employeeform_r1"><div className="headcolor">Institution</div><div className="employeecont">John Wick</div></div>
                      <div className="employeeform_r1"><div className="headcolor">Last Employer</div><div className="employeecont">J02445</div></div>
                      <div className="employeeform_r1"><div className="headcolor">Start Date</div><div className="employeecont">11 Jan 2021</div></div>
                      <div className="employeeform_r1"><div className="headcolor">End Date</div><div className="employeecont">11 Jan 2021</div></div>

                      </div>
                      <div className="employeeform_row2flex2">
                      <div className="employeeform_r2"><div className="headcolor">Skills</div><div className="employeecont">John Wick</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Acheivement</div><div className="employeecont">J02445</div></div>
                    
                      </div>

                </div>
                
            </div>
            <div className="employeeform_row3">
                      <div className="employeeform_r2"><div className="headcolor">Certifications</div><div className="employeecont">John Wick</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Specialization</div><div className="employeecont">J02445</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Acheivements</div><div className="employeecont">J02445</div></div>

                      </div>
                      <div className="employeeform_row4">
                      <div className="employeeform_r2"><div className="headcolor">Capabilitites</div><div className="employeecont">John Wick</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Talents</div><div className="employeecont">J02445</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Special Interest/Hobby</div><div className="employeecont">J02445</div></div>

                      </div> 
                      <div className="employeeform_row5">
                      <div className="employeeform_r2"><div className="headcolor">Contact Phone no.</div><div className="employeecont">John Wick</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">Email ID</div><div className="employeecont">J02445</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Mail Address</div><div className="employeecont">J02445</div></div>

                      </div>               
        </Modal>
    )
}

export default DynModel;