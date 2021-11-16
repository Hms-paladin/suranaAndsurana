import React, { useCallback, useEffect, useState } from 'react'
import EnhancedTable from '../../component/DynTable/table'
import Labelbox from '../../helpers/labelbox/labelbox';
import { useDispatch, connect } from "react-redux";
import { getEmployeeList } from '../../actions/MasterDropdowns';
import { getCheckListsView } from '../../actions/CheckListAction';
import { UpdateCheckListNoTaskLink } from "../../actions/VariableRateMaster"
import moment from 'moment';
import { Collapse } from "antd";
import { Checkbox } from 'antd'
import ValidationLibrary from "../../helpers/validationfunction";
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../component/Butttons/button';
import { useParams } from "react-router-dom";
import DynModel from '../../component/Model/model';

function CheckListView(props) {
    const { Panel } = Collapse;
    let { rowId } = useParams()
    const dispatch = useDispatch();
    const [employeeId, setEmployeeId] = useState()
    const [employeelist, setEmployeelist] = useState({})
    const [rowData, setRowData] = useState([])
    const [multiplePanel, setMultiplePanel] = useState([]);
    const [IndexArr, setIndexArr] = useState("");
    const [ChecklistDetails, setChecklistDetails] = useState([])
    const [ChecklistChange, setChecklistChange] = useState(false);
    const [TaskItemModel, setTaskItemModel] = useState(false);
    const [TaskItemModelID, setTaskItemModelID] = useState(0);
    const [ChecklistView, setChecklistView] = useState({

        checklist_item_date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,

        }

    })

    useEffect(() => {
        dispatch(getEmployeeList())
        dispatch(getCheckListsView(localStorage.getItem("empId")))
    }, [])

    const onTaskItemClick = (e, data, index, index1, data1) => {
        setIndexArr([index, index1, data1.start_date, data1.end_date])
        if (e.target.checked === true) {
            ChecklistDetails[index].details[index1].checked = true
        }
        else {
            ChecklistDetails[index].details[index1].checked = false
        }
        ChecklistView.checklist_item_date.value = data1.end_date;
        setChecklistChange(!ChecklistChange)

        setTaskItemModel(true)
        setTaskItemModelID(data)
        setChecklistView((prevState) => ({
            ...prevState,
        }));
    }

    const onTaskItemComplete = async () => {
        var mainvalue = {};
        var targetkeys = Object.keys(ChecklistView);

        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                ChecklistView[targetkeys[i]].value,
                ChecklistView[targetkeys[i]].validation
            );
            ChecklistView[targetkeys[i]].error = !errorcheck.state;
            ChecklistView[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = ChecklistView[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => ChecklistView[obj].error == true
        );

        if (filtererr.length > 0) {
            // setInsertTaskForm({ error: true });
        } else {
            await dispatch(UpdateCheckListNoTaskLink(TaskItemModelID, rowId, ChecklistView.checklist_item_date.value, employeeId))
            setTaskItemModel(false)

            ChecklistView.checklist_item_date.value = ""

        }
        setChecklistView((prevState) => ({
            ...prevState,
        }));
    }

    const onTaskItemCancel = async () => {
        ChecklistDetails[IndexArr[0]].details[IndexArr[1]].checked = false
        setChecklistDetails((prevState) => ([
            ...prevState,
        ]));
        setTaskItemModel(false)
        setChecklistChange(!ChecklistChange)
        ChecklistView.checklist_item_date.value = ""
        setChecklistView((prevState) => ({
            ...prevState,
        }));
    }

    useEffect(() => {

        if (props.getCheckListsView) {
            setChecklistDetails(props.getCheckListsView)
        }
    }, [props.getCheckListsView])

    useEffect(() => {

        let multipleTab = [];
        ChecklistDetails.map((data, index) => {

            multipleTab.push(
                <Panel
                    header={`${data.check_list} ( ${data.check_list_type} )`}
                    key={index + 1}
                >
                    <div>
                        <div className="taskitem_heading">
                            <div style={{ whiteSpace: 'nowrap' }} >Task Item</div>
                            <div >Status</div>
                            <div >Assigned To</div>
                            <div >Task Start Date</div>
                            <div >Task End Date</div>
                        </div>
                        {data.details.map((data1, index1) => {
                            return (<>
                                <div className="taskitem_div">
                                    <div >{data1.check_list}</div>
                                    <div >{(data.check_list_type === "No Task Linked" && data1.status === "In Progress") ? <Checkbox onClick={(e) => onTaskItemClick(e, data1.check_list_details_id, index, index1, data)} checked={data1.checked ? true : false} /> : <div className="status_Btn">{data1.status}</div>} </div>
                                    <div >{data1.name}</div>
                                    <div >{moment(data1.start_date).format("DD-MMM-YYYY")}</div>
                                    <div >{data.check_list_type === "No Task Linked" && data1.status === "In Progress" ? ' - ' : moment(data1.end_date).format("DD-MMM-YYYY")}</div>
                                </div>
                            </>
                            )
                        })}
                    </div>
                </Panel>
            );


        });

        setMultiplePanel(multipleTab);
    }, [ChecklistDetails, ChecklistChange])

    useEffect(() => {
        let EmployeeList = []
        props.getEmployeeList.map((data, index) => {
            EmployeeList.push({
                value: data.name,
                id: data.emp_id,
            });
        });
        setEmployeelist({ EmployeeList })

        setEmployeeId(Number(localStorage.getItem("empId")))
    }, [props.getEmployeeList])


    const checkValidation = (data, key) => {

        if (key === "employee") {
            dispatch(getCheckListsView(data))
            setEmployeeId(data)
        } else if (key === "checklist_item_date") {
            ChecklistView.checklist_item_date.value = data
            setChecklistView((prevState) => ({
                ...prevState
            }));
        }
    }



    return (
        <div>
            <div className="mainHeading">CheckList Assigning View</div>
            <div className="clAssignFields_card">
                <div className="label_div_card">
                    <Labelbox
                        type="select"
                        labelname="Employee"
                        changeData={(data) => checkValidation(data, "employee")}
                        dropdown={employeelist.EmployeeList}
                        value={employeeId}
                    />
                </div>
                {/* <EnhancedTable
                    headCells={header}
                    rows={rowData}
                    aligncss="aligncss" /> */}
                <div className="checklist_collapse">
                    <Collapse >{multiplePanel}</Collapse>
                </div>
            </div>
            <DynModel
                modelTitle={"TaskItem Completion"}
                handleChangeModel={TaskItemModel}
                handleChangeCloseModel={onTaskItemCancel}
                content={
                    <div className="successModel">
                        <div>
                            {" "}
                            <label className="notfound_label">
                                Do You Want Complete This Item ?
                            </label>
                        </div>
                        <Grid item xs={12} container direction="row" style={{ justifyContent: 'center', marginTop: 10 }} spacing={2}>
                            <Grid item xs={9} container direction="column">
                                <Labelbox
                                    type="datepicker"
                                    // disablePast={true}
                                    minDate={moment(`${IndexArr[2]} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                    maxDate={moment(`${IndexArr[3]} 11:00:00 AM`, "YYYY-MM-DD HH:mm:ss A").format()}
                                    changeData={(data) =>
                                        checkValidation(data, "checklist_item_date")
                                    }
                                    value={ChecklistView.checklist_item_date.value}
                                    error={ChecklistView.checklist_item_date.error}
                                    errmsg={ChecklistView.checklist_item_date.errmsg} />
                            </Grid>
                        </Grid>
                        <div className="customNotFoundbtn">
                            <CustomButton btnName={"Yes"} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={onTaskItemComplete} />
                            <CustomButton btnName={"No "} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={onTaskItemCancel} />
                        </div>
                    </div>
                }
                width={400}
            />
        </div>
    )
}

const mapStateToProps = (state) =>
(
    {
        getEmployeeList: state.getOptions.getEmployeeList,
        getCheckListsView: state.CheckListReducer.getCheckListsView,
    });
export default connect(mapStateToProps)(CheckListView);
