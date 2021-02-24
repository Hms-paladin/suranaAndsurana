import { Button } from "@material-ui/core";
import React from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import './employeeform.scss'

function Employeeform(){
    
    return(
        <div>
            <div style={{marginBottom:"10px",fontSize:'16px',fontWeight:"600"}}>Employee form</div>
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
                      <div className="employeeform_row6">
                      <div className="employeeform_r2"><div className="headcolor">State of Domecile</div><div className="employeecont">John Wick</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor">City</div><div className="employeecont">J02445</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Status of the Candidate</div><div className="employeecont">J02445</div></div>
                      <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Languages Known</div><div className="employeecont">J02445</div></div>

                      </div>
                      <div className="employeeform_row7">
                      <div><Labelbox type="select" placeholder="Designation"/></div>
                      <div><Labelbox type="text" placeholder="Date of Joining"/></div>
                      <div><Labelbox type="text" placeholder="Supervisor's Name"/></div>
                      <div><Labelbox type="text" placeholder="Supervisor's Email ID"/></div>
                      <div><Labelbox type="text" placeholder="Supervisor's Phone No."/></div>


                      </div>
                      <div className="employeeform_row8">
                      <div><Labelbox type="text" placeholder="Official Email ID"/></div>
                      <div><Labelbox type="text" placeholder="Official Contact No."/></div>
                      <div><Labelbox type="select" placeholder="Department"/></div>
                      <div><Labelbox type="text" placeholder="Employee Code"/></div>


                      </div>
                      <div className="employeeform_row8 empform_upload_doc">
                      <div><Labelbox type="text" placeholder="Upload Document"/></div>
                      


                      </div>
                      <div className="employeeform_save"><Button>Save</Button></div>
                      
        </div>
    )
}

export default Employeeform;