

import { Button } from "@material-ui/core";
import './employeeform.scss'
import React ,{useState,useEffect}from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import { Upload, message,Select} from 'antd';
import PublishIcon from '@material-ui/icons/Publish';
import Axios from 'axios';
import {apiurl} from '../../utils/baseUrl'
import './employeeform.scss'
import ValidationLibrary from "../../helpers/validationfunction";
const { Option } = Select;
function Employeeform(props){
     const [getdata, setgetData]= useState({})
     const [dept, setdept]= useState({})
     const [sup_name, setsup_name]= useState({})
     const [EmpForm, setEmpFrom] = useState({
        desgination: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        department: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        supervisor_name: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        supervisor_email: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        supervisor_ph: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })
    
    function checkValidation(data, key, multipleId) {
        console.log("key", key);
        console.log("data>>", data);
        if(key==="supervisor_name"){

           Sup_nameGetId(data)
        }
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            EmpForm[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: EmpForm[key].validation
        }
        setEmpFrom(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    useEffect(() => {
        Axios({
            method:"get",
            url:apiurl+"get_s_tbl_m_designation",
        }).then((response)=>{
            console.log(response,"response")
            let Designation=[]
            response.data.data.map((data,index)=>
            Designation.push({id:data.designation_id,value:data.designation})
             )
             setgetData({Designation})
             console.log(getdata,"values")
        })
        Axios({
            method:"get",
            url:apiurl+"get_department",
        }).then((response)=>{
            console.log(response,"response")
            let Department=[]
            response.data.data.map((data,index)=>
            Department.push({id:data.department_id,value:data.department})
             )
             setdept({Department})
             console.log(Department,"department")
        })
        Axios({
            method:"get",
            url:apiurl+"get_interviewers",
        }).then((response)=>{
            console.log(response,"sup")
            let Supervisor=[]
            response.data.data.map((data,index)=>
            Supervisor.push({id:data.emp_id,value:data.name})
             )
             setsup_name({Supervisor})
             console.log(dept,"dept")
        })
        

     }, [])
     function Sup_nameGetId(data){
         alert(data,"data")
        Axios({
            method:"get",
            url:apiurl+"get_employee_by_id",
            data:{
                emp_id:data
            }
        }).then((response)=>{
            console.log(response,"sup")
            let Sup_nameId=[]
            response.data.data.map((data,index)=>
            Sup_nameId.push({id:data.emp_id,value:data.name})
             )
             setsup_name({Sup_nameId})
             console.log(dept,"dept")
        })
     }
    
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
                      <div>
                          <Labelbox type="select" placeholder="Designation"
                                dropdown={getdata.Designation}
                                changeData={(data) => checkValidation(data, "desgination")}
                                value={EmpForm.desgination.value}
                                error={EmpForm.desgination.error}
                                errmsg={EmpForm.desgination.errmsg}
                         />
                      </div>
                      <div>
                          <Labelbox type="datepicker" placeholder="Date of Joining"
                           
                          /></div>
                      <div>
                          <Labelbox type="select" placeholder="Supervisor's Name"
                             dropdown={sup_name.Supervisor}
                             changeData={(data) => checkValidation(data, "supervisor_name")}
                             value={EmpForm.supervisor_name.value}
                             error={EmpForm.supervisor_name.error}
                             errmsg={EmpForm.supervisor_name.errmsg}
                      /></div>
                      <div><Labelbox type="text" placeholder="Supervisor's Email ID"
                      changeData={(data) => checkValidation(data, "supervisor_email")}
                      value={EmpForm.supervisor_email.value}
                      error={EmpForm.supervisor_email.error}
                      errmsg={EmpForm.supervisor_email.errmsg}
                      />
                      </div>
                      <div><Labelbox type="text" placeholder="Supervisor's Phone No."
                        changeData={(data) => checkValidation(data, "supervisor_ph")}
                        value={EmpForm.supervisor_ph.value}
                        error={EmpForm.supervisor_ph.error}
                        errmsg={EmpForm.supervisor_ph.errmsg}
                      />
                      </div>


                      </div>
                      <div className="employeeform_row8">
                      <div><Labelbox type="text" placeholder="Official Email ID"/></div>
                      <div><Labelbox type="text" placeholder="Official Contact No."/></div> 
                      <div>
                          <Labelbox type="select" placeholder="Department"
                            dropdown={dept.Department}
                            changeData={(data) => checkValidation(data, "department")}
                            value={EmpForm.department.value}
                            error={EmpForm.department.error}
                            errmsg={EmpForm.department.errmsg}
                      />
                      </div>
                       <div><Labelbox type="text" placeholder="Employee Code"/></div>
                      
                      


                      </div>
                      <div className="upload_div">
                      {/* <div><Labelbox type="text" placeholder="Upload Document"/></div> */}
                       <div style={{width:"50%"}}>
                      <Upload {...props} className="upload_tag"
                      action= 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    //   onChange= {(info)=>handleChange(info) } 
                    //   fileList={fileListData}
                    >
                      
                          <div className="upload_file_inside"><label>Click to upload</label><PublishIcon/></div>
                     </Upload>,
                   
                {/* <input type="file" onChange={uploadFile} id="pdfupload"/> */}

              

               
            
                      </div>  

                      </div>
                      <div className="employeeform_save"><Button>Save</Button></div>
                     
                      
        </div>
    )
}



export default Employeeform;