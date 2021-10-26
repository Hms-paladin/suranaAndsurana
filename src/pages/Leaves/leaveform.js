import react, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import Edit from "../../images/editable.svg";
import ValidationLibrary from "../../helpers/validationfunction";
import { getLeaveType } from "../../actions/MasterDropdowns";
import { insertLeaveForm, getProfessionalCourse, SubjectList, getEmpAvailableBalance, getLeaveForm, deleteLeaveForm, updateLeaveFrom, insertLeaveCep, updateLeaveCep } from '../../actions/LeaveFormAction';
import { useDispatch, connect } from "react-redux";
import { getEmpListDepartment, getClientlist } from '../../actions/MasterDropdowns';
import PlusIcon from "../../images/plusIcon.svg";
import PublishIcon from '@material-ui/icons/Publish';
import Delete from '../../images/dashboard/delete.svg';
import dateFormat from 'dateformat';

import { notification } from "antd";
import moment from 'moment';
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
    const [empLeaveBal, setEmpLeaveBal] = useState("")
    const [clientlist, setClientlist] = useState({})
    const [noOfDays, setNoOfDays] = useState(0)
    const [filedata, setFileData] = useState({})
    const [minDate, setMinDate] = useState(new Date())

    const [plusicon, setPlusicon] = useState(0)
    const [employeeList, setEmployeeList] = useState({});
    const [editBtn, setEditBtn] = useState(false)
    const [leaveFormTable, setLeaveFormTable] = useState({});
    const [emp_leave_id, setEmp_leave_id] = useState(0)
    const [availabledates, setAvailableDates] = useState([])

    const [timeexceed, setTimeexceed] = useState(false)
    const [SubjectIndex, setSubjectIndex] = useState('')
    var duplicateDate = false
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
            // minDate:new Date()
        },
        todate: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
            minDate: new Date()
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
            validation: [{ "name": "required" }, { "name": "allowNumaricOnly" }],
            error: null,
            errmsg: null,
        },
        exam_days: {
            value: "",
            validation: [{ "name": "required" }, { "name": "custommaxValue", "params": "0" }, { "name": "allowNumaricOnly" }],
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
        remarks: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },


    })

    useEffect(() => {
        dispatch(getLeaveType());
        dispatch(getProfessionalCourse());
        dispatch(getEmpListDepartment());
        dispatch(getLeaveForm());
        dispatch(SubjectList());
        dispatch(getClientlist())
    }, [])

    useEffect(() => {
        dispatch(getEmpAvailableBalance(localStorage.getItem("empId"), Leave_Form.leavetype.value))
    }, [Leave_Form.leavetype.value])

    useEffect(() => {
        if (props.getEmpLeaveBal && props.getEmpLeaveBal.length > 0) {
            setEmpLeaveBal(props.getEmpLeaveBal[0].current_balance)
            setAvailableDates({ start_date: props.getEmpLeaveBal[0].start_date, end_date: props.getEmpLeaveBal[0].end_date })
            Leave_Form.todate.minDate = moment(`${props.getEmpLeaveBal[0].start_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()
        }
        else {
            setEmpLeaveBal("")
        }
        setLeaveForm(prevState => ({
            ...prevState,
        }));
    }, [Leave_Form.leavetype.value, props.getEmpLeaveBal])

    useEffect(() => {
        var diff = Math.floor((Date.parse(Leave_Form.todate.value) - Date.parse(Leave_Form.fromdate.value)) / 86400000)
        isNaN(diff) ? setNoOfDays(0) : setNoOfDays(diff + 1)

        if (Leave_Form["leavetype"].value === 40) {
            Leave_Form["tot_leave"].value = isNaN(diff) ? "" : (diff + 1)
            Leave_Form.exam_days.validation = [{ "name": "required" }, { "name": "custommaxValue", "params": "0" }, { "name": "allowNumaricOnly" }]
            setLeaveForm(prevState => ({
                ...prevState,
            }));
            Leave_Form.exam_days.validation[1].params = isNaN(diff) ? 0 : (diff + 1)
        }
        setLeaveForm(prevState => ({
            ...prevState,
        }));

    }, [Leave_Form.fromdate.value, Leave_Form.todate.value])

    const onFileChange = (event) => {
        setFileData(event.target.files[0])
        console.log(event, "filedata")
    }
    const onFileDelete = () => {
        setFileData({})
        console.log(filedata, "filedata")
    }

    useEffect(() => {
        if (Leave_Form.tot_leave.value === "" && Leave_Form.exam_days.value === "") {
            Leave_Form.other_days.value = "";
        } else {
            let otherdays = Leave_Form.tot_leave.value - Leave_Form.exam_days.value;
            console.log(otherdays, "otherdays")
            Leave_Form.other_days.value = Leave_Form.tot_leave.value < Leave_Form.exam_days.value ? 0 : otherdays;
        }

        setLeaveForm((prevState) => ({
            ...prevState,
        }));
    }, [Leave_Form.tot_leave.value, Leave_Form.exam_days.value])
    // Leave_Form.other_days.value = other_days;


    function onDeleteLeaveForm(emp_leave_id) {
        dispatch(deleteLeaveForm(emp_leave_id))
    }

    function timeToEpoch(time) {
        // var time = time
        // var array = time.split(":");
        // var seconds = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60) + parseInt(array[2], 10)
        // console.log(seconds,"seconds")
        var d = new Date("12-30-2017 " + time)
        // d.setTime(seconds);
        console.log(d, "Leave_Form")
        return d
    }

    const onEditLeaveForm = (val) => {
        handleCancel()
        setEditBtn(true)
        console.log(val.subject_details, "valval")
        Leave_Form.leavetype.value = val.leave_type_id || ""
        Leave_Form.fromdate.value = val.from_date || ""
        Leave_Form.todate.value = val.to_date || ""
        Leave_Form.fromtime.value = val.from_time != null ? timeToEpoch(val.from_time) : ""
        Leave_Form.totime.value = val.to_time != null ? timeToEpoch(val.to_time) : ""
        Leave_Form.reasoncmt.value = val.leave_reason || ""
        Leave_Form.address.value = val.address || ""
        Leave_Form.contactperson.value = val.contact_number || ""
        Leave_Form.client.value = val.client_id || ""
        Leave_Form.assignedby.value = val.assigned_by || ""

        Leave_Form.profess_course.value = val.professional_course_id || ""
        Leave_Form.referred_by.value = val.referred_by_id || ""
        Leave_Form.tot_leave.value = val.total_days_leave || ""
        Leave_Form.exam_days.value = val.no_exam_days || ""
        Leave_Form.other_days.value = val.no_other_days || ""
        Leave_Form.reasoncmt.value = val.leave_reason || ""
        Leave_Form.remarks.value = val.remarks || ""
        setFileData(val.hall_ticket)
        val.subject_details && val.subject_details != "" ? setExamSchedule(val.subject_details) : setExamSchedule([])

        // setEmp_leave_cep_sub_id(val.emp_leave_cep_sub_id)
        setEmp_leave_id(val.emp_leave_id)

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

        if (key === "fromtime" || key === "totime") {
            var startTime = Leave_Form.fromtime.value
            if (key === "fromtime")
                startTime = moment(data).format('HH:mm:ss')

            var endTime = Leave_Form.totime.value
            if (key === "totime")
                endTime = moment(data).format('HH:mm:ss')
            // var duration = moment.duration(endTime.diff(startTime));
            var duration = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("HH")
            // // duration in hours
            // var hours = parseInt(duration.asHours());
            if (duration > empLeaveBal) {
                setTimeexceed(true)
                notification.success({
                    message: 'Time Hours not more than available hours',
                });
            } else {
                setTimeexceed(false)
            }

        }

        if (key === "fromdate") {
            Leave_Form.todate.minDate = data
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

        // if (data && key == "tot_leave") {
        //     Leave_Form.exam_days.validation[1].params = data
        //     setLeaveForm((prevState) => ({
        //         ...prevState,
        //     }));
        // }

        if (key === "leavetype" && data) {
            handleCancel()
            setEditBtn(false)
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
            setExamSchedule([])
            // setLeaveForm((prevState) => ({
            //     ...prevState,
            // }));
        }

        if (key === "fromdate") {
            setMinDate(data)
        }
        setLeaveForm((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    const editsubjectdetails = (leave_form, index) => {
        setPlusicon(1)
        if (leave_form !== '') {
            Leave_Form.subject.value = leave_form.subject_id
            Leave_Form.exam_date.value = leave_form.subject_date
            setSubjectIndex(index)
            setPlusicon(1)
            setLeaveForm(prevState => ({
                ...prevState,
            }));
        }
    }
    const deletesubjectdetails = (index) => {
        if (index > -1) {
            examSchedule.splice(index, 1);
        }
        setExamSchedule([...examSchedule]);
    }

    const viewexamschedule = () => {
        // console.log(SubjectIndex,"examSchedule")

        const From_key = ["subject", "exam_date"]
        From_key.map((data) => {
            if (Leave_Form[data].value === "") {
                let dynObj = {
                    value: Leave_Form[data].value,
                    error: true,
                    errmsg: "Field required",
                    validation: [{ "name": "required" }],
                };
                setLeaveForm((prevState) => ({
                    ...prevState,
                    [data]: dynObj,
                }));
            }
        });

        if (Leave_Form["subject"].value !== "" && Leave_Form["exam_date"].value !== "") {

            var sub_date = examSchedule.find((val) => {
                return (
                    Leave_Form["exam_date"].value == val.subject_date
                )
            })
            if (sub_date) {
                notification.success({
                    message: "Cannot add same date",
                });
                return
            }
            // console.log(sub_date,"sub_date")
            if (examSchedule[SubjectIndex] && SubjectIndex !== '') {

                examSchedule[SubjectIndex].subject = subjectList.SubjectList.map((data) => {
                    if (data.id === Leave_Form.subject.value) {
                        return (
                            data.value
                        )
                    }
                });
                examSchedule[SubjectIndex].subject_id = Leave_Form.subject.value;
                examSchedule[SubjectIndex].subject_date = Leave_Form.exam_date.value;
                setSubjectIndex('')
            } else {


                examSchedule.push({
                    subject: subjectList.SubjectList.map((data) => {
                        if (data.id === Leave_Form.subject.value) {
                            return (
                                data.value
                            )
                        }
                    }),
                    subject_id: Leave_Form.subject.value,
                    subject_date: Leave_Form.exam_date.value
                })

                setExamSchedule([...examSchedule])
            }
            Leave_Form["exam_date"].value = ""
            Leave_Form["subject"].value = ""

            setLeaveForm(prevState => ({
                ...prevState,
            }));

            setPlusicon(0)
        }
    }

    useEffect(() => {
        let TableData = [];
        props.getLeaveForm && props.getLeaveForm.map((data, index) => TableData.push(data));
        var updatelist = [];
        for (var m = 0; m < TableData.length; m++) {
            const index = m;
            var listarray = {
                leavetype: TableData[m].status,
                fromdate: (TableData[m].from_date === "0000-00-00" || TableData[m].from_date === null) ? 0 : moment(TableData[m].from_date).format("DD-MM-YYYY"),
                todate: (TableData[m].to_date === "0000-00-00" || TableData[m].to_date === null) ? 0 : moment(TableData[m].to_date).format("DD-MM-YYYY"),
                fromtime: (TableData[m].from_time === "00:00:00" || TableData[m].from_time === null) ? 0 : moment(TableData[m].from_time, "HH:mm:ss").format("hh:mm A"),
                totime: (TableData[m].to_time === "00:00:00" || TableData[m].to_time === null) ? 0 : moment(TableData[m].to_time, "HH:mm:ss").format("hh:mm A"),
                status: TableData[m].approve_status === null ? 'Pending' : TableData[m].approve_status === 0 ? "Rejected" : 'Approved',
                action: TableData[m].approve_status === null && TableData[m].approve_status !== 1 && TableData[m].approve_status !== 0 && (
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

    // const handletempbtn = () => {
    //     let dates_arr = []
    //     leaveFormTable.map((data) => {
    //         dates_arr.push({ from: data.fromdate, to: data.todate })
    //     })
    //     setSameDateVal(dates_arr)
    // }

    // console.log(samedateval, "datatemp")

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

    function onSubmit(value) {
        console.log(Leave_Form.fromtime.value, "valuetype")

        //Expired date validation
        let starttime = moment(Leave_Form["fromtime"].value, "HH:mm:ss").format("hh:mm:ss A")
        let endtime = moment(Leave_Form["totime"].value, "HH:mm:ss").format("hh:mm:ss A")
        let timeVal = false
        if (Date.parse('01/01/2011 ' + endtime) < Date.parse('01/01/2011 ' + starttime)) {
            timeVal = true
        }

        if (Leave_Form.leavetype.value) {
            if (Leave_Form.leavetype.value === 35 || Leave_Form.leavetype.value === 36 || Leave_Form.leavetype.value === 37) {
                const From_key = [
                    "fromtime", "totime", "client", "assignedby", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date", "remarks",
                ];
                hideValidation(From_key)
            } else if (Leave_Form.leavetype.value === 38) {
                const From_key = [
                    "todate", "address", "client", "assignedby", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date", "remarks",
                ];
                hideValidation(From_key)
            } else if (Leave_Form.leavetype.value === 39) {
                const From_key = [
                    "todate", "reasoncmt", "address", "contactperson", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date", "remarks",
                ];
                hideValidation(From_key)
            }
            else if (Leave_Form.leavetype.value === 40) {
                const From_key = [
                    "fromtime", "totime", "client", "assignedby", "address", "contactperson", "exam_date",
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

        }
        else if (timeexceed) {
            notification.success({
                message: "Time Hours not more than available hours.",
            });
        }
        else if (timeVal) {
            notification.success({
                message: "To time should not less than the From time.",
            });
        }
        else if (empLeaveBal < noOfDays) {
            notification.success({
                message: "No. of leave days not more than available days",
            });
        }
        else if (duplicateDate) { }
        else {
            if (Leave_Form.leavetype.value === 40) {
                dispatch(insertLeaveCep(Leave_Form, examSchedule, filedata)).then(() => {
                    // dispatch(getLeaveForm(Leave_Form.leavetype.value));
                    handleCancel()
                })
            } else {
                console.log(Leave_Form, "Leave_Form")
                dispatch(insertLeaveForm(Leave_Form)).then(() => {
                    // dispatch(getLeaveForm(Leave_Form.leavetype.value));
                    handleCancel()
                })
            }


        }
        setLeaveForm((prevState) => ({
            ...prevState,
        }));
    }

    const onUpdate = (value) => {

        //Expired date validation
        // let curdate = moment(new Date()).format("DD-MM-YYYY")
        // // let curdate = Math.floor(Date.now())
        // let fromdateval = Date.parse(moment(Leave_Form["fromdate"].value).format("DD-MM-YYYY"))
        // let todateval = Date.parse(moment(Leave_Form["todate"].value).format("DD-MM-YYYY"))
        // let dateVal = false

        // if (fromdateval < curdate || todateval < curdate) {
        //     dateVal = true
        // }
    //    console.log(fromdateval,todateval,curdate,Date(curdate),"wwwwwwwwwwwwwwwww")
        //Time compare validation
        let starttime = moment(Leave_Form["fromtime"].value, "HH:mm:ss").format("hh:mm:ss A")
        let endtime = moment(Leave_Form["totime"].value, "HH:mm:ss").format("hh:mm:ss A")
        let timeVal = false
        if (Date.parse('01/01/2011 ' + endtime) < Date.parse('01/01/2011 ' + starttime)) {
            timeVal = true
        }


        if (Leave_Form.leavetype.value) {
            if (Leave_Form.leavetype.value === 35 || Leave_Form.leavetype.value === 36 || Leave_Form.leavetype.value === 37) {
                const From_key = [
                    "fromtime", "totime", "client", "assignedby", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date", "remarks",
                ];
                hideValidation(From_key)
            } else if (Leave_Form.leavetype.value === 38) {
                const From_key = [
                    "todate", "address", "client", "assignedby", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date", "remarks",
                ];
                hideValidation(From_key)
            } else if (Leave_Form.leavetype.value === 39) {
                const From_key = [
                    "todate", "reasoncmt", "address", "contactperson", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date", "remarks",
                ];
                hideValidation(From_key)
            }
            else if (Leave_Form.leavetype.value === 40) {
                const From_key = [
                    "fromtime", "totime", "client", "assignedby", "address", "contactperson", "exam_date",
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
        console.log(filtererr.length, "filtererr.length")
        if (filtererr.length > 0) {

        }
        // else if (dateVal) { console.log("ddddddddddd") }
        else if (timeexceed) {
            notification.success({
                message: "Time Hours not more than available hours.",
            });
        }
        else if (timeVal) {
            notification.success({
                message: "To time should not less than the From time.",
            });
        }
        else if (empLeaveBal < noOfDays) {
            notification.success({
                message: "No. of leave days not more than available days",
            });
        }
        else {
            if (value === "othertype") {
                dispatch(updateLeaveFrom(Leave_Form, emp_leave_id)).then((response) => {
                    handleCancel();
                });

            } else {
                dispatch(updateLeaveCep(Leave_Form, examSchedule, filedata, emp_leave_id)).then(() => {
                    // dispatch(getLeaveForm(Leave_Form.leavetype.value));
                    handleCancel()
                })
            }
        }

        setLeaveForm((prevState) => ({
            ...prevState,
        }));
    }

    const handleCancel = () => {
        setEditBtn(false)
        let From_key = [
            "leavetype", "fromdate", "todate", "reasoncmt", "address", "contactperson", "fromtime", "totime", "client", "assignedby", "referred_by", "profess_course", "tot_leave", "exam_days", "other_days", "subject", "exam_date", "remarks"
        ];

        From_key.map((data) => {
            try {
                Leave_Form[data].value = "";
            } catch (error) {
                throw error;
            }
        });
        setExamSchedule([])
        setLeaveForm((prevState) => ({
            ...prevState,
        }));
    };

    const [saveRights, setSaveRights] = useState([])

    ///***********user permission**********/
    useEffect(() => {
        if (props.UserPermission.length > 0 && props.UserPermission) {
            let data_res_id = props.UserPermission.find((val) => {
                return (
                    "Apply Leave - Save" == val.control
                )
            })
            setSaveRights(data_res_id)


        }

    }, [props.UserPermission]);

    function handleChange(data) {
        debugger;
        console.log("data Handle change", data);
        // setFromDate(data);
    }
    console.log(filedata, "filedata")
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
                                changeData={(data) => checkValidation(data, "leavetype")}
                                value={Leave_Form.leavetype.value}
                                error={Leave_Form.leavetype.error}
                                errmsg={Leave_Form.leavetype.errmsg} />
                        </div>
                    </Grid>
                    {(Leave_Form.leavetype.value === 35 || Leave_Form.leavetype.value === 36 || Leave_Form.leavetype.value === 37) && <> <Grid item xs={3}>
                        <div className="leaveFieldheading">From Date</div>
                        <div>  <Labelbox type="datepicker"
                            changeData={(data) => checkValidation(data, "fromdate")}
                            value={Leave_Form.fromdate.value}
                            minDate={moment(`${availabledates.start_date && availabledates.start_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                            maxDate={moment(`${availabledates.end_date && availabledates.end_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                            disabled={availabledates.start_date && availabledates.end_date ? false : true}
                            error={Leave_Form.fromdate.error}
                            errmsg={Leave_Form.fromdate.errmsg}
                        />
                        </div>
                    </Grid>
                        <Grid item xs={3}>
                            <div className="leaveFieldheading">To Date</div>
                            <div> <Labelbox type="datepicker"
                                changeData={(data) => checkValidation(data, "todate")}
                                value={Leave_Form.todate.value}
                                // minDate={Leave_Form.leavetype.value!==37&&new Date()}
                                minDate={Leave_Form.todate.minDate}
                                // minDate={moment(`${availabledates.start_date&&availabledates.start_date} 11:00:00 AM`,"YYYY-MM-DD HH:mm:ss A").format()}
                                maxDate={moment(`${availabledates.end_date && availabledates.end_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                disabled={availabledates.start_date && availabledates.end_date ? false : true}
                                error={Leave_Form.todate.error}
                                errmsg={Leave_Form.todate.errmsg} />
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
                                    changeData={(data) => checkValidation(data, "reasoncmt")}
                                    value={Leave_Form.reasoncmt.value}
                                    error={Leave_Form.reasoncmt.error}
                                    errmsg={Leave_Form.reasoncmt.errmsg} />
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className="leaveFieldheading">Address</div>
                            <div className="reasonscmt">
                                <Labelbox type="textarea"
                                    changeData={(data) => checkValidation(data, "address")}
                                    value={Leave_Form.address.value}
                                    error={Leave_Form.address.error}
                                    errmsg={Leave_Form.address.errmsg} />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="leaveFieldheading">Contact Number</div>
                            <div><Labelbox type="text"
                                changeData={(data) => checkValidation(data, "contactperson")}
                                value={Leave_Form.contactperson.value}
                                error={Leave_Form.contactperson.error}
                                errmsg={Leave_Form.contactperson.errmsg} />
                            </div>
                        </Grid>
                    </>
                    }
                    {(Leave_Form.leavetype.value === 38 || Leave_Form.leavetype.value === 39) &&
                        <> <Grid item xs={2}>
                            <div className="leaveFieldheading"> Date</div>
                            <div>
                                <Labelbox type="datepicker"
                                    //  minDate={new Date()}
                                    minDate={moment(`${availabledates.start_date && availabledates.start_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                    maxDate={moment(`${availabledates.end_date && availabledates.end_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                    disabled={availabledates.start_date && availabledates.end_date ? false : true}
                                    changeData={(data) => checkValidation(data, "fromdate")}
                                    value={Leave_Form.fromdate.value}
                                    error={Leave_Form.fromdate.error}
                                    errmsg={Leave_Form.fromdate.errmsg} />
                            </div>
                        </Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading"> From Time</div>
                                <div><Labelbox type="timepicker"
                                    changeData={(data) => checkValidation(data, "fromtime")}
                                    value={Leave_Form.fromtime.value}
                                    error={Leave_Form.fromtime.error}
                                    errmsg={Leave_Form.fromtime.errmsg}
                                />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading"> To Time</div>
                                <div><Labelbox type="timepicker"
                                    changeData={(data) => checkValidation(data, "totime")}
                                    value={Leave_Form.totime.value}
                                    error={Leave_Form.totime.error}
                                    errmsg={Leave_Form.totime.errmsg} />

                                </div>
                            </Grid>
                            <Grid item xs={2} ><div className="leaveFieldheading">Available Balance</div><div>{empLeaveBal === "" ? 0 : empLeaveBal} </div> </Grid>
                            {Leave_Form.leavetype.value === 39 ?
                                <><Grid item xs={5}>
                                    <div className="leaveFieldheading">Client</div>
                                    <Labelbox type="select"
                                        dropdown={clientlist.Clientlist}
                                        changeData={(data) => checkValidation(data, "client")}
                                        value={Leave_Form.client.value}
                                        error={Leave_Form.client.error}
                                        errmsg={Leave_Form.client.errmsg} />
                                </Grid>
                                    <Grid item xs={3}>
                                        <div className="leaveFieldheading">Assigned By</div>
                                        <Labelbox type="select"
                                            dropdown={employeeList.EmployeeList}
                                            changeData={(data) => checkValidation(data, "assignedby")}
                                            value={Leave_Form.assignedby.value}
                                            error={Leave_Form.assignedby.error}
                                            errmsg={Leave_Form.assignedby.errmsg} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <div className="leaveFieldheading">Assignment Description</div>
                                        <div className="reasonscmt">
                                            <Labelbox type="textarea"
                                                changeData={(data) => checkValidation(data, "reasoncmt")}
                                                value={Leave_Form.reasoncmt.value}
                                                error={Leave_Form.reasoncmt.error}
                                                errmsg={Leave_Form.reasoncmt.errmsg} />
                                        </div>
                                    </Grid>
                                </> :
                                <>
                                    <Grid item xs={5}>
                                        <div className="leaveFieldheading">Reason for Permission</div>
                                        <div className="reasonscmt">
                                            <Labelbox type="textarea"
                                                changeData={(data) => checkValidation(data, "reasoncmt")}
                                                value={Leave_Form.reasoncmt.value}
                                                error={Leave_Form.reasoncmt.error}
                                                errmsg={Leave_Form.reasoncmt.errmsg} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={5}></Grid>
                                    <Grid item xs={3}>
                                        <div className="leaveFieldheading">Contact Number</div>
                                        <div><Labelbox type="text"
                                            changeData={(data) => checkValidation(data, "contactperson")}
                                            value={Leave_Form.contactperson.value}
                                            error={Leave_Form.contactperson.error}
                                            errmsg={Leave_Form.contactperson.errmsg} />
                                        </div>
                                    </Grid>
                                </>
                            }
                        </>
                    }
                    {Leave_Form.leavetype.value === 40 &&
                        <>

                            <Grid item xs={3}>
                                <div className="leaveFieldheading">From Date</div>
                                <div>  <Labelbox type="datepicker"
                                    changeData={(data) => checkValidation(data, "fromdate")}
                                    value={Leave_Form.fromdate.value}
                                    minDate={moment(`${availabledates.start_date && availabledates.start_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                    maxDate={moment(`${availabledates.end_date && availabledates.end_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                    disabled={availabledates.start_date && availabledates.end_date ? false : true}
                                    error={Leave_Form.fromdate.error}
                                    errmsg={Leave_Form.fromdate.errmsg}
                                />
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className="leaveFieldheading">To Date</div>
                                <div> <Labelbox type="datepicker"
                                    changeData={(data) => checkValidation(data, "todate")}
                                    value={Leave_Form.todate.value}
                                    minDate={moment(`${availabledates.start_date && availabledates.start_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                    maxDate={moment(`${availabledates.end_date && availabledates.end_date} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                    disabled={availabledates.start_date && availabledates.end_date ? false : true}
                                    error={Leave_Form.todate.error}
                                    errmsg={Leave_Form.todate.errmsg} />
                                </div>
                            </Grid>
                            <Grid item xs={2} ><div className="leaveFieldheading">Available Balance</div><div>{empLeaveBal === "" ? 0 : empLeaveBal} </div> </Grid>
                            <Grid item xs={12}><div className="leaveMainHeader">Managing Partner Permission Date </div></Grid>
                            <Grid item xs={3}><Labelbox type="select"
                                placeholder="Referred By"
                                changeData={(data) => checkValidation(data, "referred_by")}
                                dropdown={employeeList.EmployeeList}
                                value={Leave_Form.referred_by.value}
                                error={Leave_Form.referred_by.error}
                                errmsg={Leave_Form.referred_by.errmsg} />
                            </Grid>
                            <Grid item xs={3}> <Labelbox type="select"
                                changeData={(data) => checkValidation(data, "profess_course")}
                                placeholder="Professional course"
                                dropdown={professional.ProfessoionalCourse}
                                value={Leave_Form.profess_course.value}
                                error={Leave_Form.profess_course.error}
                                errmsg={Leave_Form.profess_course.errmsg} />
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading">Total Days of Leave</div>
                                <div> <Labelbox type="text"
                                    disabled={true}
                                    changeData={(data) => checkValidation(data, "tot_leave")}
                                    value={Leave_Form.tot_leave.value}
                                    error={Leave_Form.tot_leave.error}
                                    errmsg={Leave_Form.tot_leave.errmsg}
                                    maxlength={3}
                                />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading">No. of Exam Days</div>
                                <div>
                                    <Labelbox type="text"
                                        changeData={(data) => checkValidation(data, "exam_days")}
                                        value={Leave_Form.exam_days.value}
                                        error={Leave_Form.exam_days.error}
                                        errmsg={Leave_Form.exam_days.errmsg}
                                        maxlength={3}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="leaveFieldheading">No. of Other Days</div>
                                <div>
                                    <Labelbox type="text"
                                        disabled={true}
                                        changeData={(data) => checkValidation(data, "other_days")}
                                        value={Leave_Form.other_days.value}
                                        error={Leave_Form.other_days.error}
                                        errmsg={Leave_Form.other_days.errmsg} />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <div>
                                        <div className="leaveFieldheading">Upload Hall Ticket</div>
                                        <div className="uploadleave_form">
                                            <div>

                                                <input type="file" accept=".doc, .docx,.ppt, .pptx,.txt,.pdf"
                                                    onChange={(data) => onFileChange(data)} id="pdfupload" /> <PublishIcon />

                                            </div>


                                        </div>
                                    </div>
                                    {filedata && filedata.length > 0 && editBtn && <div className="image_box">
                                        <div className="image_text">
                                            {filedata.length > 0 ? filedata.substr(35) : ''}
                                        </div>
                                        <div><img src={Delete} onClick={onFileDelete} style={{ width: '20px', cursor: 'pointer' }} /> </div>
                                    </div>}
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
                                                changeData={(data) => checkValidation(data, "subject")}
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
                                                minDate={Leave_Form.fromdate.value}
                                                maxDate={Leave_Form.todate.value}
                                                changeData={(data) => checkValidation(data, "exam_date")}
                                                value={Leave_Form.exam_date.value}
                                                error={Leave_Form.exam_date.error}
                                                errmsg={Leave_Form.exam_date.errmsg} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <br />
                                        {editBtn && (((examSchedule && examSchedule.length < Leave_Form.exam_days.value) || plusicon === 1) ? <img src={PlusIcon} className="plusicon" onClick={viewexamschedule} /> : '')}
                                        {!editBtn && (examSchedule && examSchedule.length == Leave_Form.exam_days.value ? "" : <img src={PlusIcon} className="plusicon" onClick={viewexamschedule} />)}
                                    </Grid>

                                    <Grid item xs={10}>
                                        <div className="leaveFieldheading">Assignment Description</div>
                                        <div className="reasonscmt">
                                            <Labelbox type="textarea"
                                                changeData={(data) => checkValidation(data, "reasoncmt")}
                                                value={Leave_Form.reasoncmt.value}
                                                error={Leave_Form.reasoncmt.error}
                                                errmsg={Leave_Form.reasoncmt.errmsg} />
                                        </div>
                                    </Grid> </Grid>

                                <Grid item xs={6} container direction="row" spacing={2}>

                                    {(examSchedule && examSchedule.length > 0 || examSchedule && examSchedule[0] && examSchedule[0].length > 0) && <div className="examinfotable">
                                        <div>
                                            <div className="examfieldSubject">Subject</div>
                                            <div className="examfieldDate">Date</div>
                                            <div className="examfieldDate">Action</div>
                                        </div>

                                        {examSchedule && examSchedule.length > 0 && examSchedule.map((data, index) => {

                                            return (
                                                <div className="examdate">
                                                    <div className="subvalue">{data.subject}</div>
                                                    <div className="subvalue">{data.subject_date}</div>
                                                    <img src={Edit} className="editImage" style={{ cursor: 'pointer' }} onClick={() => editsubjectdetails(data, index)} />

                                                    <img src={Delete} className="editImage" style={{ cursor: 'pointer' }} onClick={() => deletesubjectdetails(index)} />

                                                </div>
                                            )
                                        })
                                        }

                                    </div>}
                                </Grid>

                            </Grid>

                            <Grid item xs={5}>
                                <div className="leaveFieldheading">Remarks</div>
                                <div className="reasonscmt">
                                    <Labelbox type="textarea"
                                        changeData={(data) =>
                                            checkValidation(data, "remarks")}
                                        value={Leave_Form.remarks.value}
                                        error={Leave_Form.remarks.error}
                                        errmsg={Leave_Form.remarks.errmsg}
                                    />
                                </div></Grid>

                        </>
                    }
                    <Grid item xs={5} container direction="row" spacing={2}>
                        <Grid item xs={4}>
                            {editBtn ? <CustomButton btnName={"Update"} btnCustomColor="customPrimary" btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} custombtnCSS="custom_save" onBtnClick={() => onUpdate(Leave_Form.leavetype.value === 40 ? "ceptype" : "othertype")} /> :
                                Leave_Form.leavetype.value >= 35 && <CustomButton btnName={"Save"} btnDisable={!saveRights || saveRights.display_control && saveRights.display_control === 'N' ? true : false} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={() => onSubmit(Leave_Form.leavetype.value === 40 ? "ceptype" : "othertype")} />}</Grid>
                        {Leave_Form.leavetype.value >= 35 && <Grid item xs={4}><CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={handleCancel} /></Grid>}
                    </Grid></Grid>
            </div>
            {/* {Leave_Form.leavetype.value !== 40 &&  */}
            <div className="leavetableformat">
                <EnhancedTable headCells={headCells} tabletitle={"Leave Status"} rows={leaveFormTable.length == 0 ? leaveFormTable : leaveFormTable} />
            </div>
            {/* } */}
        </div>
    )
}
const mapStateToProps = (state) =>
({
    LeaveType: state.getOptions.getLeaveType,
    ProfessoionalCourse: state.LeaveFormReducer.leaveformstatus,
    SubjectList: state.LeaveFormReducer.leavefromsubject || [],
    EmployeeList: state.getOptions.getEmpListDepartment || [],
    getEmpLeaveBal: state.LeaveFormReducer.getEmpAvailableBalance || [],
    getLeaveForm: state.LeaveFormReducer.getLeaveForm || [],
    getClientlist: state.getOptions.getClientlist || [],
    updateLeaveFrom: state.LeaveFormReducer.updateLeaveFrom || [],
    UserPermission: state.UserPermissionReducer.getUserPermission,
});
export default connect(mapStateToProps)(LeaveForm);