import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import { Upload, message } from 'antd';
import PublishIcon from '@material-ui/icons/Publish';
import Axios from 'axios';
import { apiurl } from '../../utils/baseUrl'
import ValidationLibrary from "../../helpers/validationfunction";
import { notification } from 'antd';
import moment from "moment";
import { getHrTaskList } from "../../actions/TodoListAction";
import { connect, useDispatch } from "react-redux";
import { getDesignationList, getDepartment, getInterviewers } from '../../actions/MasterDropdowns'
import { GetCandiateDetails, GetEmployeeDetails, getBankName } from '../../actions/CandidateAndEmployeeDetails';
import DynModelView from '../Interview/model';
import './employeeform.scss'
function Employeeform(props) {
    const dispatch = useDispatch();
    const [getDetails, setgetDetails] = useState([])
    const [getdata, setgetData] = useState([])

    const [bankNames, setBankNames] = useState([])
    const [dept, setdept] = useState({})
    const [sup_name, setsup_name] = useState({})
    const [file, setfile] = useState("")
    const [fileList, setfileList] = useState("")
    const [EmpForm, setEmpFrom] = useState({
        desgination: {
            value: props.emp_form_id.designation_id,
            validation: [],
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
            validation: [{ "name": "required" }, { "name": "email" }],
            error: null,
            errmsg: null,
        },
        supervisor_ph: {
            value: "",
            validation: [{ "name": "required" }, { "name": "mobile" }],
            error: null,
            errmsg: null,
        },
        EmpOfficialEmail: {
            value: "",
            validation: [{ "name": "required" }, { "name": "email" }],
            error: null,
            errmsg: null,
        },
        EmpOfficialContact: {
            value: "",
            validation: [{ "name": "required" }, { "name": "mobileSurana" }],
            error: null,
            errmsg: null,
        },
        employee_code: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        account_no: {
            value: "",
            validation: [{ "name": "required" }, { "name": "custommaxLength", "params": "16" }, { "name": "allowNumaricOnly1" }],
            error: null,
            errmsg: null,
        },
        ifsc_code: {
            value: "",
            validation: [{ "name": "required" }, { "name": "custommaxLength", "params": "11" }, { "name": "alphaNumaricOnly" }],
            error: null,
            errmsg: null,
        },
        bank_name: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })

    //Dropdowns
    useEffect(() => {
        dispatch(getDesignationList());
        dispatch(getDepartment());
        dispatch(getBankName());
        dispatch(getInterviewers());
    }, [])

    console.log(props, "emp_form_id")
    //CandidateDetails

    useEffect(() => {
        if (!props.emp_list) {
            EmpForm.desgination.value = props.emp_form_id.designation_id
            dispatch(GetCandiateDetails(props.emp_form_id.int_status_id));
        } else {
            dispatch(GetEmployeeDetails(props.emp_form_id.int_status_id));
        }
    }, [props.emp_form_id])

    //SETCandidateDetails
    useEffect(() => {
        setgetDetails(props.getCandidatesDetails)
        console.log("empformempform", props.getCandidatesDetails)

    }, [props.getCandidatesDetails])

    useEffect(() => {
        setgetDetails(props.getCandidatesDetails)
        console.log("empformempform", props.getCandidatesDetails)

    }, [props.getCandidatesDetails])

    useEffect(() => {
        setgetDetails(props.getEmployeeDetails)
        console.log("setgetDetails", props.getEmployeeDetails)

    }, [props.getEmployeeDetails])

    ///bank name
    useEffect(() => {
        let BankName = [];
        props.getBankNameDetails.map((data, index) =>
            BankName.push({ id: data.bank_id, value: data.bank_name })
        );
        setBankNames({ BankName });

    }, [props.getBankNameDetails])
    ///

    //SETDropdowns 
    useEffect(() => {
        let Designation = [];
        props.getDesignationList.map((data, index) =>
            Designation.push({ id: data.designation_id, value: data.designation })
        );
        setgetData({ Designation });

        let Department = [];
        props.getDepartment.map((data, index) =>
            Department.push({ id: data.department_id, value: data.department })
        );
        setdept({ Department });
        let Supervisor = [];
        props.getInterviewersList.map((data, index) =>
            Supervisor.push({ id: data.emp_id, value: data.name })
        );

        setsup_name({ Supervisor });
    }, [
        props.getDesignationList,
        props.getDepartment,
        props.getInterviewersList,
    ]);
    //SETEmployeeDetails  
    function Sup_nameGetId(data) {
        Axios({
            method: "post",
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            url: apiurl + "get_employee_by_id",
            data: {
                "emp_id": data
            }
        }).then((response) => {
            let empData = []
            response.data.data.map((data, index) =>
                empData.push(data)
            )
            setEmpFrom(prevState => ({
                ...prevState,
                supervisor_email: { value: empData[0].official_email },
                supervisor_ph: { value: empData[0].official_contact }
            }));
        })
    }
    // useEffect(() => {
    //     let empData = []
    //     props.getEmployeeDetails.map((data, index) =>
    //             empData.push(data)
    //         )
    //         setEmpFrom(prevState => ({
    //             ...prevState,
    //                 supervisor_email:{value:empData[0].official_email || ""},
    //                 supervisor_ph:{value:empData[0].official_contact || ""}
    //         }));
    // }, [props.getEmployeeDetails])
    function InsertApi() {
        const getEmployeeFormDetails = getDetails[0] || []

        let formData = new FormData();

        formData.append("resume_id", props.getCandidatesDetails && props.getCandidatesDetails[0].resume_id);
        formData.append("designation", EmpForm.desgination.value);
        formData.append("doj", EmpForm.date_of_birth.value);
        formData.append("supervisor", EmpForm.supervisor_name.value);
        formData.append("official_email", EmpForm.EmpOfficialEmail.value);
        formData.append("official_contact", EmpForm.EmpOfficialContact.value);
        formData.append("department", EmpForm.department.value);
        formData.append("employee_code", EmpForm.employee_code.value);
        formData.append("upload_document", file);
        formData.append("account_number", EmpForm.account_no.value);
        formData.append("ifsc_code", EmpForm.ifsc_code.value);
        formData.append("bank_id", EmpForm.bank_name.value);
        formData.append("created_on", moment().format("YYYY-MM-DD HH:m:s"));
        formData.append("created_by", localStorage.getItem("empId"));
        formData.append("task_id", props.emp_form_id && props.emp_form_id.task_id);
        formData.append("supervisor_email", EmpForm.supervisor_email.value);
        // console.log(formData,"formData")
        Axios({
            method: "post",
            url: apiurl + "insert_employee",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.data.status === 1) {
                    props.closemodal()
                    notification.success({
                        message: 'Record Added Successfully',
                    });
                    dispatch(getHrTaskList())
                }

            })
        handleCancel()
    }

    const onSubmit = () => {
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

    const handleCancel = () => {
        let From_key = [
            "account_no", "ifsc_code", "bank_name", "date_of_birth", "supervisor_name", "supervisor_email", "supervisor_ph", "EmpOfficialContact", "EmpOfficialEmail", "employee_code", "department"
        ]

        From_key.map((data) => {
            EmpForm[data].value = ""
        })
        From_key.map((data) => {
            EmpForm[data].error = null
        })
        setEmpFrom(prevState => ({
            ...prevState,
        }));

    }
    function onFileChange(e) {
        setfileList(e.target.files[0])
        setfile(e.target.files[0].name)
    }


    function checkValidation(data, key, multipleId) {
        if (data && key === "supervisor_name") {

            if (props.getInterviewersList.length > 0 && props.getInterviewersList) {
                let data_res_id = props.getInterviewersList.find((val) => {
                    return (
                        data == val.emp_id
                    )
                })

            }

            Sup_nameGetId(data)
            // dispatch(GetEmployeeDetails(data))
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
        handleCancel()
    }, [props.stateClear])

    return (

        <div>
            <div style={{ marginBottom: "10px", fontSize: '16px', fontWeight: "600" }}>Employee form</div>
            {getDetails && getDetails.length > 0 && getDetails.map((val, index) => {
                console.log(val.skill_name, "skill_name")
                return (
                    <div className="Employee_formdiv">

                        {!props.emp_list && <div className="employeeform_row2">

                            <div className="employeeform_row2flex1">
                                <div className="employeeform_r1"><div className="headcolor">Name</div><div className="employeecont">{val.name ? val.name : "-"}</div></div>
                                <div className="employeeform_r1"><div className="headcolor">Resume ID</div><div className="employeecont">{val.resume_id ? val.resume_id : ""}</div></div>
                                <div className="employeeform_r1"><div className="headcolor">Date of Birth</div><div className="employeecont">{val.dob ? moment(val.dob).format("DD-MMM-YYYY") : "-"}</div></div>
                                <div className="employeeform_r1"><div className="headcolor">Gender</div><div className="employeecont">{val.gender === 1 || val.gender === "M" ? "Male" : "Female"}</div></div>
                            </div>
                            <div className="employeeform_row2flex2">
                                <div className="employeeform_r2"><div className="headcolor">Skills</div><div className="employeecont">{val.skill_name ? val.skill_name : "-"}</div></div>
                                <div className="employeeform_r2 traitsdiv"><div className="headcolor">Traits</div><div className="employeecont">{val.traits ? val.traits : "-"}</div></div>
                            </div>
                        </div>}
                        {props.emp_list && <div>
                            <div className="employeeform_row3">
                                <div className="employeeform_r2"><div className="headcolor">Employee Code</div><div className="employeecont">{val.employee_code ? val.employee_code : "-"}</div></div>
                                <div className="employeeform_r2"><div className="headcolor">Name</div><div className="employeecont">{val.name ? val.name : "-"}</div></div>
                                <div className="employeeform_r2"><div className="headcolor">Date of Birth</div><div className="employeecont">{val.dob ? moment(val.dob).format("DD-MMM-YYYY") : "-"}</div></div>
                                <div className="employeeform_r2"><div className="headcolor">Gender</div><div className="employeecont">{val.gender === 1 || val.gender === "M" ? "Male" : "Female"}</div></div>
                            </div>
                            <div className="employeeform_row3">
                                <div className="employeeform_r2 "><div className="headcolor">Date of Joining</div><div className="employeecont">{val.doj ? val.doj : "-"}</div></div>
                                <div className="employeeform_r2"><div className="headcolor">Designation</div><div className="employeecont">{val.senior_associate ? val.senior_associate : "-"}</div></div>
                                <div className="employeeform_r2 "><div className="headcolor">Department</div><div className="employeecont">{val.department ? val.department : "-"}</div></div>
                                <div className="employeeform_r2 "><div className="headcolor">Supervisor</div><div className="employeecont">{val.supervisor_name ? val.supervisor_name : "-"}</div></div>
                            </div>
                        </div>}
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

                        {props.emp_list && <div>
                            <div className="employeeform_row3">
                                <div className="employeeform_r2 " ><div className="headcolor">Skills</div><div className="employeecont">{val.skill_name ? val.skill_name : "-"}</div></div>
                                <div className="employeeform_r2 "><div className="headcolor">Traits</div><div className="employeecont">{val.traits ? val.traits : "-"}</div></div>
                            </div>
                        </div>}

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
                                        <div className="employeerows">
                                            <div>{index + 1}</div>
                                            <div>{values.industry || "-"}</div>
                                            <div>{values.company_name || "-"}</div>
                                            <div>{values.city || "-"}</div>
                                            <div>{values.department_id ||values.department || "-"}</div>
                                            <div>{values.designation_id ||values.designation || "-"}</div>
                                            <div>{values.period_from ? moment(values.period_from,"YYYY-MM-DD").format('DD-MMM-YYYY') : "-"}</div>
                                            <div>{values.period_to ? moment(values.period_to,"YYYY-MM-DD").format('DD-MMM-YYYY') : "-"}</div>
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
                            {/* {!props.emp_list && <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Postel Address</div><div className="employeecont">{val.email_addr ? val.postal_addr : "-"}</div></div>} */}
                            <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Address</div><div className="employeecont">{val.address ? val.address : "-"}</div></div>
                        </div>
                        {!props.emp_list && <div className="employeeform_row6">
                            <div className="employeeform_r2"><div className="headcolor">State of Domicile</div><div className="employeecont">{val.state_of_domecile ? val.state_of_domecile : "-"}</div></div>
                            <div className="employeeform_r2 traitsdiv"><div className="headcolor">City</div><div className="employeecont">{val.city ? val.city : "-"}</div></div>
                            <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Languages Known</div><div className="employeecont">{val.lang_known ? val.lang_known : "-"}</div></div>
                            <div className="employeeform_r2 traitsdiv"><div className="headcolor">Interview Status</div><div className="employeecont">{val.status_resource ? val.status_resource : "-"}</div></div>

                        </div>}

                        {props.emp_list && <div className="employeeform_row5">
                            <div className="employeeform_r2"><div className="headcolor">Account Number</div><div className="employeecont">{val.account_number ? val.account_number : "-"}</div></div>
                            <div className="employeeform_r2 traitsdiv"><div className="headcolor">IFSC Code</div><div className="employeecont">{val.ifsc_code ? val.ifsc_code : "-"}</div></div>
                            <div className="employeeform_r2 traitsdiv"><div className="headcolor"> Bank Name</div><div className="employeecont">{val.bank_name ? val.bank_name : "-"}</div></div>
                        </div>}
                    </div>
                )
            })
            }

            {!props.emp_list && <div className="employeeform_row7">
                <div>
                    <Labelbox type="select" placeholder="Designation"
                        disabled={true}
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


            </div>}

            {!props.emp_list && <div className="employeeform_row8">
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

                <div className="upload_div">
                    <div>
                   
                        <input type="file" accept=".doc, .docx,.ppt, .pptx,.txt,.pdf"
                            onChange={onFileChange} id="pdfupload" /> <PublishIcon />
                    </div>

                </div>

            </div>}
            {!props.emp_list && <div className="employeeform_row9">
                <div><Labelbox type="text" placeholder="Account Number"
                    changeData={(data) => checkValidation(data, "account_no")}
                    value={EmpForm.account_no.value}
                    error={EmpForm.account_no.error}
                    errmsg={EmpForm.account_no.errmsg}
                /></div>

                <div><Labelbox type="text" placeholder="IFSC Code"
                    changeData={(data) => checkValidation(data, "ifsc_code")}
                    value={EmpForm.ifsc_code.value}
                    error={EmpForm.ifsc_code.error}
                    errmsg={EmpForm.ifsc_code.errmsg}
                /></div>

                <div><Labelbox type="select"
                    placeholder="Bank Name"
                    dropdown={bankNames.BankName}
                    changeData={(data) => checkValidation(data, "bank_name")}
                    value={EmpForm.bank_name.value}
                    error={EmpForm.bank_name.error}
                    errmsg={EmpForm.bank_name.errmsg}
                /></div>


            </div>}
            {!props.emp_list &&
                <div className="employeeform_save"><Button onClick={onSubmit}>Save</Button></div>}



        </div>
    )
}

const mapStateToProps = (state) => (
    {
        getDesignationList: state.getOptions.getDesignationList || [],
        getDepartment: state.getOptions.getDepartment || [],
        getInterviewersList: state.getOptions.getInterviewersList || [],
        getCandidatesDetails: state.CandidateAndEmployeeDetails.getCandidatesDetails || [],
        getEmployeeDetails: state.CandidateAndEmployeeDetails.getEmployeeDetails || [],
        getBankNameDetails: state.CandidateAndEmployeeDetails.getBankName || [],
    }
);

export default connect(mapStateToProps)(Employeeform);
