import react, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import Edit from "../../images/editable.svg";
import ValidationLibrary from "../../helpers/validationfunction";
import { getLeaveType } from "../../actions/MasterDropdowns";
import { insertLeaveForm, getProfessionalCourse, SubjectList, getEmpAvailableBalance, getLeaveForm, deleteLeaveForm } from '../../actions/LeaveFormAction';
import { useDispatch, connect } from "react-redux";
import { getEmployeeList, getClientlist } from '../../actions/MasterDropdowns';
import PlusIcon from "../../images/plusIcon.svg";
import PublishIcon from '@material-ui/icons/Publish';
import Delete from '../../images/dashboard/delete.svg';



import './leaveupdate.scss';
const headCells = [
    { id: 'leavetype', label: 'Leave Type' },
    { id: 'fromdate', label: 'From Date' },
    { id: 'todate', label: 'To Date' },
    { id: 'fromtime', label: 'From Time' },
    { id: 'totime', label: 'To Time' },
    { id: 'status', label: 'Status' },
    { id: 'img', label: 'Action' }


];



function LeaveForm(props) {
    const dispatch = useDispatch();
    const [leaveType, setLeaveType] = useState({})
    const [professional, setProfessional] = useState({})
    const [subjectList, setSubjectList] = useState({})
    const [examSchedule, setExamSchedule] = useState([])
    const [editExam, setEditExam] = useState([])
    const [empLeaveBal, setEmpLeaveBal] = useState("")
    const [clientlist, setClientlist] = useState({})
    const [noOfDays, setNoOfDays] = useState(0)
    const [employeeList, setEmployeeList] = useState({});

    const [editBtn, setEditBtn] = useState(false)

    const [leaveFormTable, setLeaveFormTable] = useState({});
    const [Leave_Form, setLeaveForm] = useState({
        leavetype: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        fromdate: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        todate: {
            value: "",
            validation: [{ "name": "required" }],
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

        fromtime: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        totime: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        client: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        assignedby: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
       
        referred_by: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        profess_course: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        tot_leave: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        exam_days: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        other_days: {
            value: "",
            validation: [{ "name": "required" }],
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
        dispatch(getLeaveForm());
        dispatch(SubjectList());
        dispatch(getClientlist())
    }, [])

    useEffect(() => {
        dispatch(getEmpAvailableBalance(localStorage.getItem("empId"), Leave_Form.leavetype.value))
        // if(Leave_Form.leavetype.value===35||Leave_Form.leavetype.value)
    }, [Leave_Form.leavetype.value])

    useEffect(() => {
        props.getEmpLeaveBal.length > 0 ? setEmpLeaveBal(props.getEmpLeaveBal[0].current_balance) : setEmpLeaveBal("")
    }, [Leave_Form.leavetype.value, props.getEmpLeaveBal])

    useEffect(() => {
        var diff = Math.floor((Date.parse(Leave_Form.fromdate.value) - Date.parse(Leave_Form.todate.value)) / 86400000)
        console.log(diff, "diff")
        isNaN(diff) ? setNoOfDays(0) : setNoOfDays(diff)
    }, [Leave_Form.fromdate.value, Leave_Form.todate.value])

    console.log(Leave_Form.leavetype.name, "type")
    const onFileChange = () => {

    }

    function onDeleteLeaveForm(emp_leave_id) {
        console.log(emp_leave_id, "emp_leave_id")
        dispatch(deleteLeaveForm(emp_leave_id))
    }

    const onEditLeaveForm = (val) => {
        console.log(val , "valval")

        Leave_Form.leavetype.value = val.leave_type_id || ""
        Leave_Form.fromdate.value = val.from_date || ""
        Leave_Form.todate.value = val.to_date || ""
        Leave_Form.fromtime.value = val.from_time || ""
        Leave_Form.totime.value = val.to_time || ""
        Leave_Form.reasoncmt.value = val.leave_reason || ""
        Leave_Form.address.value = val.address || ""
        Leave_Form.contactperson.value = val.contact_number || ""
        Leave_Form.client.value = val.client_id || ""
        Leave_Form.assignedby.value = val.assigned_by || ""


        setLeaveForm(prevState => ({
            ...prevState,
        }));
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

        //EmployeeList
        let EmployeeList = [];
        props.EmployeeList.map((data) =>
            EmployeeList.push({ value: data.name, id: data.emp_id })
        );
        setEmployeeList({ EmployeeList });

        // getClientlist
        let Clientlist = [];
        props.getClientlist.map((data) =>
            Clientlist.push({ value: data.client, id: data.client_id })
        );
        setClientlist({ Clientlist });



    }, [props.LeaveType, props.SubjectList, props.stateDemo, props.EmployeeList, props.getClientlist])

    function checkValidation(data, key) {
        if (key === "fromtime") {
            console.log("timeformat", data)
        }

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

        if (key === "leavetype" && data) {
            handleCancel()

            // setLeavetypeName(data);
            setEditBtn(false)
            console.log(data)

            let From_key = [
                "fromdate", "todate", "reasoncmt", "address", "contactperson", "fromtime", "totime", "client", "assignedby", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date",


            ];

            From_key.map((data) => {
                try {
                    Leave_Form[data].error = null;
                } catch (error) {
                    throw error;
                }
            });

            setLeaveForm((prevState) => ({
                ...prevState,
            }));

        }



        setLeaveForm((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const viewexamschedule = () => {

        examSchedule.push({
            subject: subjectList.SubjectList.map((data) => {
                if (data.id === Leave_Form.subject.value) {
                    return (
                        data.value
                    )
                }
            }), date: Leave_Form.exam_date.value
        })
        setExamSchedule([...examSchedule])


        Leave_Form["exam_date"].value = ""
        Leave_Form["subject"].value = ""
        setLeaveForm(prevState => ({
            ...prevState,
        }));

    }



    useEffect(() => {

        let TableData = [];

        props.getLeaveForm.map((data, index) => TableData.push(data));
        var updatelist = [];
        for (var m = 0; m < TableData.length; m++) {
            const index = m;
            var listarray = {
                leavetype: TableData[m].status,
                fromdate: TableData[m].from_date === 0 ? '0' : TableData[m].from_date,
                todate: TableData[m].to_date === 0 ? '0' : TableData[m].to_date,
                fromtime: TableData[m].from_time === 0 ? '0' : TableData[m].from_time,
                totime: TableData[m].to_time === 0 ? '0' : TableData[m].to_time,
                status: TableData[m].approve_status === 1 ? 'Approved' : "Pending",
                action: (
                    <>
                        <img src={Edit} className="editImage" style={{ cursor: 'pointer' }} onClick={() => onEditLeaveForm(TableData[index])} />{" "}
                        <img src={Delete} className="editImage" style={{ cursor: 'pointer' }} onClick={() => onDeleteLeaveForm(TableData[index].emp_leave_id)} />
                    </>
                ),
            };
            updatelist.push(listarray);
        }
        setLeaveFormTable(updatelist);

    }, [props.getLeaveForm])


    const hideValidation = (From_key) => {
        From_key.map((data) => {
            try {
                Leave_Form[data].validation = [];
            } catch (error) {
                throw error;
            }
        });

        setLeaveForm((prevState) => ({
            ...prevState,
        }));
    }

    function onSubmit() {
        if (Leave_Form.leavetype.value) {
            // const Form_key = []
            if (Leave_Form.leavetype.value === 35 || Leave_Form.leavetype.value === 36 || Leave_Form.leavetype.value === 37) {
                const From_key = [
                    "fromtime", "totime", "client", "assignedby", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date",
                ];
                hideValidation(From_key)

            } else if (Leave_Form.leavetype.value === 38) {
                const From_key = [
                    "todate", "address", "client", "assignedby", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date",
                ];
                hideValidation(From_key)
            } else if (Leave_Form.leavetype.value === 39) {
                const From_key = [
                    "todate", "reasoncmt", "address", "contactperson", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date",
                ];
                hideValidation(From_key)

            }



        }

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

        if (filtererr.length > 0) {

        } else {
            dispatch(insertLeaveForm(Leave_Form)).then(() => {
                dispatch(getLeaveForm(Leave_Form.leavetype.value));
                handleCancel()
            })
        }
        setLeaveForm((prevState) => ({
            ...prevState,
        }));
    }
    console.log(leaveFormTable, "leaveFormTable")

    const handleCancel = () => {
        let From_key = [
            "fromdate",
            "todate",
            "reasoncmt",
            "address",
            "contactperson",
            "fromtime",
            "totime",
            "client",
            "assignedby",
            "referred_by",
            "profess_course",
            "tot_leave",
            "exam_days",
            "other_days",
            "subject",
            "exam_date",
        ];

        From_key.map((data) => {
            try {
                Leave_Form[data].value = "";
            } catch (error) {
                throw error;
            }
        });

        setLeaveForm((prevState) => ({
            ...prevState,
        }));
    };

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
                                <Grid item xs={7}>

                                    <div className="leaveFieldheading">Available Balance</div>
                                    <div>{empLeaveBal} </div>
                                </Grid>
                                <Grid item xs={5}>

                                    <div className="leaveFieldheading">No.of days</div>
                                    <div>{noOfDays} </div>
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
                                            checkValidation(data, "fromdate")
                                        }
                                        value={Leave_Form.fromdate.value}
                                        error={Leave_Form.fromdate.error}
                                        errmsg={Leave_Form.fromdate.errmsg}
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
                                    <Labelbox type="timepicker"
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
                                            dropdown={clientlist.Clientlist}
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
                                            dropdown={employeeList.EmployeeList}
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
                                                    checkValidation(data, "reasoncmt")
                                                }
                                                value={Leave_Form.reasoncmt.value}
                                                error={Leave_Form.reasoncmt.error}
                                                errmsg={Leave_Form.reasoncmt.errmsg}
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
                                                    checkValidation(data, "reasoncmt")
                                                }
                                                value={Leave_Form.reasoncmt.value}
                                                error={Leave_Form.reasoncmt.error}
                                                errmsg={Leave_Form.reasoncmt.errmsg}
                                            />
                                        </div>
                                    </Grid>


                                </Grid>
                                <Grid item xs={6} container direction="row" spacing={2}>
                                    {examSchedule.length > 0 && <div className="examinfotable">
                                        <div>
                                            <div className="examfieldSubject">Subject</div>
                                            <div className="examfieldDate">Date</div>
                                            <div className="examfieldEdit"></div>
                                        </div>

                                        {examSchedule.length > 0 && examSchedule.map((data, index) => {
                                            return (
                                                <div className="examdate">
                                                    <div className="subvalue">{data.subject}</div>
                                                    <div className="subvalue">{data.date}</div>
                                                    {/* <img src={EditIcon} onClick={() => editExamDetails(index)} /> */}

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
                <EnhancedTable headCells={headCells} tabletitle={"Leave Status"}
                    rows={leaveFormTable.length == 0 ? leaveFormTable : leaveFormTable}
                // rows={rows}
                />
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
    getEmpLeaveBal: state.LeaveFormReducer.getEmpAvailableBalance || [],
    getLeaveForm: state.LeaveFormReducer.getLeaveForm || [],
    getClientlist: state.getOptions.getClientlist || [],

});

export default connect(mapStateToProps)(LeaveForm);

  // const editExamDetails = (indexNum) => {
    //     console.log(examSchedule[indexNum], "index")
    //     examSchedule.filter((data, index) => {

    //     })

    // }

    // useEffect(() => {
    //     let TableData = [];
    //     props.getLeaveForm.map((data) =>

    //     TableData.push({
    //         leavetype: <a href={"#"} className="linktable">{data.leave_type}</a>, 
    //         fromdate: data.from_date ,
    //         todate: data.to_date ,
    //         fromtime: data.from_time ,
    //         totime: data.to_time ,
    //         status: data.approve_status===1?"Approved":"Pending",
    //         img:<><img src={Edit} className="editImage" /> <img src={Delete} className="editImage"  /></> ,

    //     }),
    //     // console.log(data,"data")
    //     );
    //     setLeaveFormTable( {TableData });

    // }, [props.getLeaveForm])

    // useEffect(() => {

    //     let TableData = [];
    //     props.getLeaveForm.map((data) =>
    //     TableData.push({ 
    //         leavetype: <a href={"#"} className="linktable">{data.leave_type}</a>, 
    //         fromdate: data.from_date ,
    //         todate: data.to_date ,
    //         fromtime: data.from_time ,
    //         totime: data.to_time ,
    //         status: data.approve_status===1?"Approved":"Pending",
    //         img:<><img src={Edit} className="editImage" /> <img src={Delete} className="editImage"  /></> ,       
    //      })
    //     );
    //     setLeaveFormTable({ TableData });

    // }, [props.getLeaveForm])   