import react, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import Edit from "../../images/editable.svg";
import ValidationLibrary from "../../helpers/validationfunction";
import { getLeaveType } from "../../actions/MasterDropdowns";
import { getProfessionalCourse, SubjectList } from '../../actions/LeaveFormAction';
import { useDispatch, connect } from "react-redux";
import { getEmployeeList } from '../../actions/MasterDropdowns';
import PlusIcon from "../../images/plusIcon.svg";
import PublishIcon from '@material-ui/icons/Publish';



import './leaveupdate.scss';
const headCells = [
    { id: 'leavetype', label: 'Leave Type' },
    { id: 'fromdate', label: 'From Dtae' },
    { id: 'todate', label: 'To Date' },
    { id: 'fromtime', label: 'From Time' },
    { id: 'totime', label: 'To Time' },
    { id: 'status', label: 'Status' }

];

const rows = [
    { leavetype: "Casual leave", fromdate: "2-mar-2021", todate: "20-mar-2021", fromtime: "", totime: "", status: "pending", img: <img src={Edit} className="editImage" /> },
    { leavetype: "On Duty", fromdate: "2-mar-2021", todate: "", fromtime: "02.00 pm", totime: "04.00 pm", status: "pending", img: <img src={Edit} className="editImage" /> },
]


function LeaveForm(props) {
    const dispatch = useDispatch();
    const [leaveType, setLeaveType] = useState({})
    const [professional, setProfessional] = useState({})
    const [subjectList, setSubjectList] = useState({})
    const [examSchedule, setExamSchedule] = useState([])
    const [employeeList, setEmployeeList] = useState({});
    const [Leave_Form, setLeaveForm] = useState({
        leavetype: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        fromdate: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        todate: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        reasoncmt: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        address: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        contactperson: {
            value: "",
            validation: [{ "name": "required" }, { "name": "mobileSurana" }],
            error: null,
            errmsg: null,
        },
        date: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        fromtime: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        totime: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        client: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        assignedby: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        ass_description: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        referred_by: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        profess_course: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        tot_leave: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        exam_days: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        other_days: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        subject: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        exam_date: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },

    })

    useEffect(() => {
        dispatch(getLeaveType());
        dispatch(getProfessionalCourse());
        dispatch(getEmployeeList());
    }, [])

    const onFileChange = () => {

    }


    useEffect(() => {
        // Leave Type
        let LeaveType = [];
        props.LeaveType.map((data) =>
            LeaveType.push({ id: data.status_id, value: data.leave_type })
        );
        setLeaveType({ LeaveType });

        // Professional course
        let ProfessoionalCourse = [];
        props.ProfessoionalCourse.map((data) =>
            ProfessoionalCourse.push({ id: data.professional_course_id, value: data.professional_course })
        );
        setProfessional({ ProfessoionalCourse });
        // subject type

        let SubjectList = [];
        props.SubjectList.map((data) =>
            SubjectList.push({ id: data.subject_id, value: data.subject })
        );
        setSubjectList({ SubjectList });


        let EmployeeList = [];
        props.EmployeeList.map((data) =>
            EmployeeList.push({ value: data.name, id: data.emp_id })

        );
        setEmployeeList({ EmployeeList });
    }, [props.LeaveType, props.SubjectList, props.stateDemo, props.EmployeeList])

    function checkValidation(data, key) {
        console.log(data, key, "dataValue")

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Leave_Form[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Leave_Form[key].validation,
        };

        if (key === "profess_course" && data) {

            dispatch(SubjectList(data));
        }


        setLeaveForm((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const viewexamschedule = () => {
        examSchedule.push({ subject: Leave_Form.subject.value, date: Leave_Form.exam_date.value })
        console.log("demo", examSchedule)
        setExamSchedule([...examSchedule])

    }

    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Leave_Form);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Leave_Form[targetkeys[i]].value,
                Leave_Form[targetkeys[i]].validation
            );
            Leave_Form[targetkeys[i]].error = !errorcheck.state;
            Leave_Form[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Leave_Form[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => Leave_Form[obj].error == true);
        // console.log(filtererr.length);
        // console.log(educationList.length, "educationList.length")
        if (filtererr.length > 0) {
        } {
        }

        console.log(Leave_Form.exam_days.value, "Leave_Form")
        console.log(Leave_Form.subject.value, "Leave_Form")
        console.log(Leave_Form.exam_date.value, "Leave_Form")


        setLeaveForm((prevState) => ({
            ...prevState,
        }));
    }
    console.log(Leave_Form.leavetype.value, "Leave_Form.leavetype.value")

    return (
        <div>
            <div className="leaveMainHeader">Leave Form </div>
            <div className="leaveFields">

                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={3}>
                        <div className="leaveFieldheading">Leave Type</div>
                        <div>
                            <Labelbox type="select"
                                dropdown={leaveType.LeaveType}
                                changeData={(data) =>
                                    checkValidation(data, "leavetype")
                                }
                                value={Leave_Form.leavetype.value}
                                error={Leave_Form.leavetype.error}
                                errmsg={Leave_Form.leavetype.errmsg}
                            />
                        </div>
                    </Grid>
                    {(Leave_Form.leavetype.value === 35 || Leave_Form.leavetype.value === 36 || Leave_Form.leavetype.value === 37) &&
                        <>
                            <Grid item xs={3}>
                                <div className="leaveFieldheading">From Date</div>
                                <div>
                                    <Labelbox type="datepicker"
                                        changeData={(data) =>
                                            checkValidation(data, "fromdate")
                                        }
                                        value={Leave_Form.fromdate.value}
                                        error={Leave_Form.fromdate.error}
                                        errmsg={Leave_Form.fromdate.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className="leaveFieldheading">To Date</div>
                                <div>
                                    <Labelbox type="datepicker"
                                        changeData={(data) =>
                                            checkValidation(data, "todate")
                                        }
                                        value={Leave_Form.todate.value}
                                        error={Leave_Form.todate.error}
                                        errmsg={Leave_Form.todate.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={3} container direction="row">
                                <Grid item xs={6}>

                                    <div className="leaveFieldheading">Available Balance</div>
                                    <div>10 </div>
                                </Grid>
                                <Grid item xs={6}>

                                    <div className="leaveFieldheading">No.of days</div>
                                    <div>10 </div>
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>
                                <div className="leaveFieldheading">Reason for Leave</div>
                                <div className="reasonscmt">
                                    <Labelbox type="textarea"
                                        changeData={(data) =>
                                            checkValidation(data, "reasoncmt")
                                        }
                                        value={Leave_Form.reasoncmt.value}
                                        error={Leave_Form.reasoncmt.error}
                                        errmsg={Leave_Form.reasoncmt.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div className="leaveFieldheading">Address</div>
                                <div className="reasonscmt">
                                    <Labelbox type="textarea"
                                        changeData={(data) =>
                                            checkValidation(data, "address")
                                        }
                                        value={Leave_Form.address.value}
                                        error={Leave_Form.address.error}
                                        errmsg={Leave_Form.address.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className="leaveFieldheading">Contact Number</div>
                                <div>
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            checkValidation(data, "contactperson")
                                        }
                                        value={Leave_Form.contactperson.value}
                                        error={Leave_Form.contactperson.error}
                                        errmsg={Leave_Form.contactperson.errmsg}
                                    />
                                </div>
                            </Grid>

                        </>

                    }
                    {(Leave_Form.leavetype.value === 38 || Leave_Form.leavetype.value === 39) &&
                        <>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading"> Date</div>
                                <div>
                                    <Labelbox type="datepicker"
                                        changeData={(data) =>
                                            checkValidation(data, "date")
                                        }
                                        value={Leave_Form.date.value}
                                        error={Leave_Form.date.error}
                                        errmsg={Leave_Form.date.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading"> From Time</div>
                                <div>
                                    <Labelbox type="timepicker"
                                        changeData={(data) =>
                                            checkValidation(data, "fromtime")
                                        }
                                        value={Leave_Form.fromtime.value}
                                        error={Leave_Form.fromtime.error}
                                        errmsg={Leave_Form.fromtime.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading"> To Time</div>
                                <div>
                                    <Labelbox type="datepicker"
                                        changeData={(data) =>
                                            checkValidation(data, "totime")
                                        }
                                        value={Leave_Form.totime.value}
                                        error={Leave_Form.totime.error}
                                        errmsg={Leave_Form.totime.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={2} >
                                <div className="leaveFieldheading">Available Balance</div>
                                <div>10 </div>
                            </Grid>
                            {Leave_Form.leavetype.value === 39 ?
                                <>
                                    <Grid item xs={5}>
                                        <div className="leaveFieldheading">Client</div>
                                        <Labelbox type="select"
                                            changeData={(data) =>
                                                checkValidation(data, "client")
                                            }
                                            value={Leave_Form.client.value}
                                            error={Leave_Form.client.error}
                                            errmsg={Leave_Form.client.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className="leaveFieldheading">Assigned By</div>
                                        <Labelbox type="select"
                                            changeData={(data) =>
                                                checkValidation(data, "assignedby")
                                            }
                                            value={Leave_Form.assignedby.value}
                                            error={Leave_Form.assignedby.error}
                                            errmsg={Leave_Form.assignedby.errmsg}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <div className="leaveFieldheading">Assignment Description</div>
                                        <div className="reasonscmt">
                                            <Labelbox type="textarea"
                                                changeData={(data) =>
                                                    checkValidation(data, "ass_description")
                                                }
                                                value={Leave_Form.ass_description.value}
                                                error={Leave_Form.ass_description.error}
                                                errmsg={Leave_Form.ass_description.errmsg}
                                            />
                                        </div>
                                    </Grid>



                                </> :
                                <>
                                    <Grid item xs={5}>
                                        <div className="leaveFieldheading">Reason for Permission</div>
                                        <div className="reasonscmt">
                                            <Labelbox type="textarea"
                                                changeData={(data) =>
                                                    checkValidation(data, "reasoncmt")
                                                }
                                                value={Leave_Form.reasoncmt.value}
                                                error={Leave_Form.reasoncmt.error}
                                                errmsg={Leave_Form.reasoncmt.errmsg}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={5}>

                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className="leaveFieldheading">Contact Number</div>
                                        <div>
                                            <Labelbox type="text"
                                                changeData={(data) =>
                                                    checkValidation(data, "contactperson")
                                                }
                                                value={Leave_Form.contactperson.value}
                                                error={Leave_Form.contactperson.error}
                                                errmsg={Leave_Form.contactperson.errmsg}
                                            />
                                        </div>
                                    </Grid>
                                </>
                            }

                        </>
                    }
                    {Leave_Form.leavetype.value === 40 &&
                        <>
                            <Grid item xs={9}>

                            </Grid>
                            <Grid item xs={12}>
                                <div className="leaveMainHeader">Managing Partner Permission Date </div>
                            </Grid>
                            <Grid item xs={3}>
                                <Labelbox type="select"
                                    placeholder="Referred By"
                                    changeData={(data) =>
                                        checkValidation(data, "referred_by")
                                    }
                                    dropdown={employeeList.EmployeeList}
                                    value={Leave_Form.referred_by.value}
                                    error={Leave_Form.referred_by.error}
                                    errmsg={Leave_Form.referred_by.errmsg}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Labelbox type="select"
                                    changeData={(data) =>
                                        checkValidation(data, "profess_course")
                                    }
                                    placeholder="Professional course"
                                    dropdown={professional.ProfessoionalCourse}
                                    value={Leave_Form.profess_course.value}
                                    error={Leave_Form.profess_course.error}
                                    errmsg={Leave_Form.profess_course.errmsg}

                                />
                            </Grid>
                            <Grid item xs={6}>

                            </Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading">Total Days of Leave</div>
                                <div>
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            checkValidation(data, "tot_leave")
                                        }
                                        value={Leave_Form.tot_leave.value}
                                        error={Leave_Form.tot_leave.error}
                                        errmsg={Leave_Form.tot_leave.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading">No. of Exam Days</div>
                                <div>
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            checkValidation(data, "exam_days")
                                        }
                                        value={Leave_Form.exam_days.value}
                                        error={Leave_Form.exam_days.error}
                                        errmsg={Leave_Form.exam_days.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading">No. of Other Days</div>
                                <div>
                                    <Labelbox type="text"
                                        changeData={(data) =>
                                            checkValidation(data, "other_days")
                                        }
                                        value={Leave_Form.other_days.value}
                                        error={Leave_Form.other_days.error}
                                        errmsg={Leave_Form.other_days.errmsg}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="leaveFieldheading">Upload Hall Ticket</div>
                                <div className="uploadleave_form">
                                    <div>

                                        <input type="file" accept=".doc, .docx,.ppt, .pptx,.txt,.pdf"
                                            onChange={onFileChange} id="pdfupload" /> <PublishIcon />
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="leaveMainHeader">Examination Schedule </div>
                            </Grid>
                            <Grid item xs={12} container direction="row" spacing={2}>
                                <Grid item xs={6} container direction="row" spacing={1}>
                                    <Grid item xs={5}>
                                        <div className="leaveFieldheading">Subject</div>
                                        <div>
                                            <Labelbox type="select"
                                                changeData={(data) =>
                                                    checkValidation(data, "subject")
                                                }
                                                dropdown={subjectList.SubjectList}
                                                value={Leave_Form.subject.value}
                                                error={Leave_Form.subject.error}
                                                errmsg={Leave_Form.subject.errmsg}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <div className="leaveFieldheading">Date</div>
                                        <div>
                                            <Labelbox type="datepicker"
                                                changeData={(data) =>
                                                    checkValidation(data, "exam_date")
                                                }
                                                value={Leave_Form.exam_date.value}
                                                error={Leave_Form.exam_date.error}
                                                errmsg={Leave_Form.exam_date.errmsg}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <br />
                                        {examSchedule.length == Leave_Form.exam_days.value ? "" : <img src={PlusIcon} className="plusicon" onClick={viewexamschedule} />}
                                    </Grid>

                                    <Grid item xs={10}>
                                        <div className="leaveFieldheading">Assignment Description</div>
                                        <div className="reasonscmt">
                                            <Labelbox type="textarea"
                                                changeData={(data) =>
                                                    checkValidation(data, "ass_description")
                                                }
                                                value={Leave_Form.ass_description.value}
                                                error={Leave_Form.ass_description.error}
                                                errmsg={Leave_Form.ass_description.errmsg}
                                            />
                                        </div>
                                    </Grid>


                                </Grid>
                                <Grid item xs={6} container direction="row" spacing={2}>
                                    {examSchedule.length > 0 && <div className="examinfotable">
                                        <div>
                                            <div className="examfield">Subject</div>
                                            <div className="examfield">Date</div>
                                        </div>

                                        {examSchedule.length > 0 && examSchedule.map((data) => {
                                            return (
                                                <div className="examdate">
                                                    <div>{data.subject}</div>
                                                    <div>{data.date}</div>
                                                </div>
                                            )
                                        })}


                                    </div>}

                                </Grid>

                            </Grid>
                            <Grid item xs={5}>
                                <div className="leaveFieldheading">Remarks</div>
                                <div className="reasonscmt">
                                    <Labelbox type="textarea"
                                        changeData={(data) =>
                                            checkValidation(data, "ass_description")
                                        }
                                        value={Leave_Form.ass_description.value}
                                        error={Leave_Form.ass_description.error}
                                        errmsg={Leave_Form.ass_description.errmsg}
                                    />
                                </div>
                            </Grid>





                        </>
                    }
                    <Grid item xs={5} container direction="row" spacing={2}>
                        <Grid item xs={4}>
                            <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSubmit} />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            {Leave_Form.leavetype.value !== 40 && <div className="leavetableformat">
                <EnhancedTable headCells={headCells} rows={rows} tabletitle={"Leave Status"} />
            </div>}

        </div>
    )
}
const mapStateToProps = (state) =>
// console.log(state,"statestatestate")
({
    LeaveType: state.getOptions.getLeaveType,
    ProfessoionalCourse: state.LeaveFormReducer.leaveformstatus,
    SubjectList: state.LeaveFormReducer.leavefromsubject || [],
    EmployeeList: state.getOptions.getEmployeeList || [],


});

export default connect(mapStateToProps)(LeaveForm);

