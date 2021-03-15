import { Button } from "@material-ui/core";
import React ,{useState,useEffect}from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import { Upload, message} from 'antd';
import PublishIcon from '@material-ui/icons/Publish';
import Axios from 'axios';
import {apiurl} from '../../utils/baseUrl'
import './employeeform.scss'
import ValidationLibrary from "../../helpers/validationfunction";
import {notification} from 'antd';

function Employeeform(props){
    const [getDetails,setgetDetails]=useState([])
    const [getdata, setgetData]= useState([])
    const [dept, setdept]= useState({})
     const [sup_name, setsup_name]= useState({})
     const [name, setname]= useState({})
     const [file,setfile]=useState("")
     const [fileList,setfileList]=useState("")
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
        date_of_birth: {
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
        EmpOfficialEmail: {
            value: "",
            validation: [{ "name": "required" },{ "name": "email" }],
            error: null,
            errmsg: null,
        },
        EmpOfficialContact: {
            value: "",
            validation: [{ "name": "required" },{ "name": "allowNumaricOnly" },{ "name": "mobile" }],
            error: null,
            errmsg: null,
        },
        employee_code: {
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
        let multipleIdList = []

        if (multipleId) {
            multipleId.map((item) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i] === item.value) {
                        multipleIdList.push(item.id)
                    }
                }
            })
            dynObj.valueId = multipleIdList.toString()
        }
        // (end)

        setEmpFrom(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    useEffect(() => {
        Axios({
            method: 'POST',
            url: apiurl +'get_employee_by_id',
            data:{
              "emp_id":"2"
            },
           
        })
        .then((response) => {
            console.log(response.data.data,"response")
             setgetDetails(response.data.data)
            
        })
        .catch((error) => {
  
        })
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
        Axios({
            method:"post",
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            url:apiurl+"get_employee_by_id",
            data:{
                "emp_id":data
            }
        }).then((response)=>{
            console.log(response,"sup")
            let empData= []
            // let phone = null
            response.data.data.map((data,index)=>
            // Sup_nameId.push({ph_no:data.con_ph_no,email:data.supervisor_email})
            empData.push(data)
             )
            //  setname({Sup_nameId})
             setEmpFrom(prevState => ({
                ...prevState,
                    supervisor_email:{value:empData[0].supervisor_email},
                    supervisor_ph:{value:empData[0].con_ph_no}
            }));
             console.log(name,"sup_name")
        })
     }
    function InsertApi(){
        console.log(EmpForm.supervisor_name.value,"dfgh")

        var formData = new FormData();
        formData.set("name","sam")
        formData.set("type_of_resource","Type")
        formData.set("gender","M")
        formData.set("dob","2021-02-26")
        formData.set("bas_qual","Type")
        formData.set("add_quali_1","Type")
        formData.set("add_quali_2","Type")
        formData.set("institution","DMI")
        formData.set("last_employer","player")
        formData.set("start_date","2021-02-26")
        formData.set("end_date","2021-02-26")
        formData.set("skills","Player")
        formData.set("traits","Very Good Level")
        formData.set("certification","Level 1")
        formData.set("specialization","High")
        formData.set("achievement","Top")
        formData.set("capabilities","Communication")
        formData.set("talents","Learning")
        formData.set("special_interest","Reading")
        formData.set("con_ph_no",EmpForm.supervisor_ph.value)
        formData.set("email_addr","sam@gmail.com")
        formData.set("address","Chennai")
        formData.set("state_of_domecile","TN")
        formData.set("city","Chennai")
        formData.set("status",1)
        formData.set("lang_known","Tamil")
        formData.set("industry","English")
        formData.set("designation",EmpForm.supervisor_name.value)
        formData.set("doj",EmpForm.date_of_birth.value)
        formData.set("supervisor",EmpForm.supervisor_name.value)
        formData.set("email",EmpForm.EmpOfficialEmail.value)
        formData.set("supervisor_name","")
        formData.set("supervisor_email",EmpForm.supervisor_email.value)
        formData.set("official_email",EmpForm.EmpOfficialEmail.value)
        formData.set("official_contact",EmpForm.EmpOfficialEmail.value)
        formData.set("department",1)
        formData.set("employee__code",EmpForm.employee_code.value)
        formData.append("upload_document",file)
        formData.set("biometric_data","")
        formData.set("approved_by",2)
        formData.set("approved_date","2021-02-26")
        formData.set("is_interviewer",1)
        formData.set("created_on","2021-02-24")
        formData.set("updated_on","2021-02-26")
        formData.set("created_by",3)
        formData.set("updated_by",1)
        formData.set("ip_address","Adress")
        Axios({
            method:"POST",
            url:apiurl+"insert_employee",
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            data:{
                "name":"",
                "type_of_resource":"",
                "gender":"M",
                "dob":"2021-02-21",
                "bas_qual":"Type",
                "add_quali_1":"Type",
                "add_quali_2":"Type",
                "institution":"DMI",
                "last_employer":"Yes",
                "start_date":"2021-02-24",
                "end_date":"2021-02-26",
                "skills":"Player",
                "traits":"Very Good Level",
                "certification":"Level 1",
                "specialization":"High",
                "achievement":"Top",
                "capabilities":"Communication",
                "talents":"Learning",
                "special_interest":"Reading",
                "con_ph_no":EmpForm.supervisor_ph.value,
                "email_addr":"sam@gmail.com",
                "address":"Chennai",
                "state_of_domecile":"TN",
                "city":"Chennai",
                "status":"1",
                "lang_known":"Tamil",
                "industry":"English",
                "designation":EmpForm.desgination.value,
                "doj":EmpForm.date_of_birth.value,
                "supervisor":EmpForm.supervisor_name.value,
                "email":"visu@gmail.com",
                "supervisor_name":EmpForm.supervisor_name.value,
                "supervisor_email":EmpForm.supervisor_email.value,
                "official_email":"",
                "official_contact":"",
                "department":EmpForm.department.value,
                "employee__code":EmpForm.employee_code.value,
                "upload_document":file,
                "biometric_data":"Notes",
                "approved_by":"2",
                "approved_date":"2021-02-26",
                "is_interviewer":"1",
                "created_on":"2021-02-24",
                "updated_on":"2021-02-26",
                "created_by":"3",
                "updated_by":"1",
                "ip_address":"Adress"
            }
            
        }).then((response)=>{
            console.log(response,"insert")
            // Sup_nameGetId()
            if(response.data.status===1){
                notification.success({
                    message: 'Record Added Successfully',
                  });
                }
               
        })
          handleCancel()
    }
   
      const  onSubmit=()=>{
        var mainvalue = {};
        var targetkeys = Object.keys(EmpForm);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                EmpForm[targetkeys[i]].value,
                EmpForm[targetkeys[i]].validation
            );
            EmpForm[targetkeys[i]].error = !errorcheck.state;
            EmpForm[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = EmpForm[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => EmpForm[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
           
        } else {
            // setResumeFrom({ error: false });
            InsertApi()
           
        } 
        setEmpFrom(prevState => ({
            ...prevState
        }));


    };

    const handleCancel = () =>{
        let From_key = [
            "desgination","date_of_birth","supervisor_name","supervisor_email","supervisor_ph","EmpOfficialContact","EmpOfficialEmail","employee_code","department"
        ]

        From_key.map((data)=>{
            EmpForm[data].value = ""
        })
        setEmpFrom(prevState => ({
            ...prevState,
        }));
    }
    function onFileChange (e) {
        console.log("sdfjsdhfjdshflsdf",e.target.files[0].name)
        setfileList(e.target.files[0])
       setfile(e.target.files[0].name)
       
  console.log(file,"hjkgfh")
      }
    return(
        
        <div>
            <div style={{marginBottom:"10px",fontSize:'16px',fontWeight:"600"}}>Employee form</div>
            {getDetails.map((val,index)=>{
                console.log(val,"vall")
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
                            changeData={(data) => checkValidation(data, "date_of_birth")}
                            value={EmpForm.date_of_birth.value}
                            error={EmpForm.date_of_birth.error}
                            errmsg={EmpForm.date_of_birth.errmsg}
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
                      <div><Labelbox type="text" placeholder="Official Email ID"
                           changeData={(data) => checkValidation(data, "EmpOfficialEmail")}
                           value={EmpForm.EmpOfficialEmail.value}
                           error={EmpForm.EmpOfficialEmail.error}
                           errmsg={EmpForm.EmpOfficialEmail.errmsg}
                      /></div>
                      <div><Labelbox type="text" placeholder="Official Contact No."
                           changeData={(data) => checkValidation(data, "EmpOfficialContact")}
                           value={EmpForm.EmpOfficialContact.value}
                           error={EmpForm.EmpOfficialContact.error}
                           errmsg={EmpForm.EmpOfficialContact.errmsg}
                      /></div> 
                      <div>
                          <Labelbox type="select" placeholder="Department"
                            dropdown={dept.Department}
                            changeData={(data) => checkValidation(data, "department")}
                            value={EmpForm.department.value}
                            error={EmpForm.department.error}
                            errmsg={EmpForm.department.errmsg}
                      />
                      </div>
                       <div><Labelbox type="text" placeholder="Employee Code"
                        changeData={(data) => checkValidation(data, "employee_code")}
                        value={EmpForm.employee_code.value}
                        error={EmpForm.employee_code.error}
                        errmsg={EmpForm.employee_code.errmsg}
                       /></div>
                      
                      


                      </div>
                      <div className="upload_div">
                      {/* <div><Labelbox type="text" placeholder="Upload Document"/></div> */}
                       <div>
                      {/* <Upload {...props} className="upload_tag"
                      action= 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    //   onChange= {(info)=>handleChange(info) } 
                    //   fileList={fileListData}
                    >
                      
                          <div className="upload_file_inside"><label>Click to upload</label><PublishIcon/></div>
                     </Upload>, */}
                   
                 <input type="file" onChange={onFileChange} id="pdfupload"/> <PublishIcon/>

              

               
            
                      </div>  

                      </div>
                      <div className="employeeform_save"><Button onClick={onSubmit}>Save</Button></div>
                     
                      
        </div>
    )
}



export default Employeeform;