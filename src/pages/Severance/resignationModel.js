import react, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import { Checkbox } from 'antd'
import { useDispatch, connect } from 'react-redux'
import moment from 'moment'
import {
    GetResignationApproval, InsertResignation, GetSeverance,
    UpdateItNoc, UpdateAdminNoc, UpdateHrNoc, UpdateReleiving, UpdateFinaceNoc
} from '../../actions/ExitSeveranceAction'
import './severance.scss';
import ValidationLibrary from "../../helpers/validationfunction";
import severance from './severance';

function ResignationApproveval(props) {
    const [modeltitles, setModeltitles] = useState()
    const [severanceData, setseveranceData] = useState([])
    const [Datehide, setDatehide] = useState(new Date())
    const [checked, setChecked] = useState(false)
    const [Resignation, setResignation] = useState({
        accept_date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        releive_date: {
            value: "",
            validation: [{ name: "required" }],
            error: null,
            errmsg: null,
        },
        actualdate_relieving: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        }
    })
    let dispatch = useDispatch()
    useEffect(() => {
        setModeltitles(props.modelTitles)
        dispatch(GetResignationApproval(props.severanceId))
        dispatch(GetSeverance(props.severanceId.employee_id))

    }, [props.modelTitles, props.severanceId])
    useEffect(() => {
        props.GetSeverance.length > 0 && props.GetSeverance.map((data) => {
            setseveranceData({
                empname: data.name === null ? "-" : data.name,
                designation: data.designation === null ? "-" : data.designation,
                department: data.department == null ? "-" : data.department,
                severanceId: data.severece_id,
                resignationDate: moment(data.date_of_resignation).format("DD-MMM-YYYY"),
                res_accepted_on: moment(data.resignation_accepted_on === null ? "-" : data.resignation_accepted_on).format("DD-MMM-YYYY"),
                releive_date: moment(data.proposed_date_relieving === null ? "-" : data.proposed_date_relieving).format("DD-MMM-YYYY"),
                it_noc_date: moment(data.it_noc_date === null ? "-" : data.it_noc_date).format("DD-MMM-YYYY"),
                hr_noc_date: moment(data.hr_noc_date === null ? "-" : data.hr_noc_date).format("DD-MMM-YYYY"),
                admin_noc_date: moment(data.admin_noc_date === null ? "-" : data.admin_noc_date).format("DD-MMM-YYYY")
            })
        })
    }, [props.GetSeverance])
    console.log("props", props)
    function checkValidation(data, key) {
        if (key === "accept_date") {
            setDatehide(data)
        }
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Resignation[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Resignation[key].validation,
        };
        setResignation((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    function ResignationApproval(name) {
        var mainvalue = {};
        var targetkeys = Object.keys(Resignation);
        for (var i in targetkeys) {
            if (name === "reject")
                Resignation[targetkeys[i]].validation = []
            else
                Resignation[targetkeys[i]].validation = [{ name: "required" }]


            Resignation['actualdate_relieving'].validation = []
            var errorcheck = ValidationLibrary.checkValidation(
                Resignation[targetkeys[i]].value,
                Resignation[targetkeys[i]].validation
            );
            Resignation[targetkeys[i]].error = !errorcheck.state;
            Resignation[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Resignation[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => Resignation[obj].error == true);
        if (filtererr.length > 0) {
            console.log(filtererr.length)
        } else {
            let status = false
            if (name === "accept") {
                status = true
            } if (name === "reject") {
                Resignation.accept_date.value = '00-00-0000'
                Resignation.releive_date.value = '00-00-0000'
                status = false
            }
            dispatch(InsertResignation(status, Resignation, props.GetSeverance[0] && props.GetSeverance[0].employee_id, props.severanceId.severece_id)).then(() => {
                props.closemodal()
                HandleCancel()
            })
        }
        setResignation((prevState) => ({
            ...prevState,
        }));
    }
    function HandleCancel() {
        let key = ["accept_date", "releive_date", "actualdate_relieving"]
        key.map((data) => {
            Resignation[data].value = ""
        })
        setResignation((prevState) => ({
            ...prevState,
        }));
    }
    function HandleChange() {
        setChecked(!checked)
    }
    function Update_Noc(task) {

        if (task === "It_NOC") {
            dispatch(UpdateItNoc(checked, props.GetSeverance[0] && props.GetSeverance[0].employee_id, task)).then(() => {
                props.closemodal()
                setChecked(false)
            })
        }
        if (task === "Admin_NOC") {
            dispatch(UpdateAdminNoc(checked, props.GetSeverance[0] && props.GetSeverance[0].employee_id)).then(() => {
                props.closemodal()
                setChecked(false)
            })
        }
        if (task === "Hr_NOC") {
            dispatch(UpdateHrNoc(checked, props.GetSeverance[0] && props.GetSeverance[0].employee_id)).then(() => {
                props.closemodal()
                setChecked(false)
            })
        }
        if (task === "Finance_NOC") {
            dispatch(UpdateFinaceNoc(checked, props.GetSeverance[0] && props.GetSeverance[0].employee_id, task)).then(() => {
                props.closemodal()
                setChecked(false)
            })
        }
        if (task === "Final Relieving") {
            dispatch(UpdateReleiving(Resignation, props.GetSeverance[0] && props.GetSeverance[0].employee_id)).then(() => {
                props.closemodal()
                setChecked(false)
            })
        }


    }
    console.log("dfghj", props.GetSeverance[0] && props.GetSeverance[0].employee_id)
    return (
        <div>
            <div className="severancemodelsContainer">
                <div>
                    <div>Employee</div>
                    <div className="severanceData">{severanceData.empname}</div>
                </div>
                <div>
                    <div>Designation</div>
                    <div className="severanceData">{severanceData.designation}</div>
                </div>
                <div>
                    <div>Department</div>
                    <div className="severanceData">{severanceData.department}</div>
                </div>
                {props.TaskModelTitle === "Resignation Approval" &&
                    <div>
                        <div>Date of Resignation</div>
                        <div className="severanceData">{severanceData.resignationDate}</div>
                    </div>
                }
                {(props.TaskModelTitle === "Hr_NOC" || props.TaskModelTitle === "It_NOC" || props.TaskModelTitle === "Admin_NOC" || props.TaskModelTitle === "Finance_NOC") &&
                    <div>
                        <div>Noc</div>
                        <div><Checkbox onChange={HandleChange} checked={checked} /></div>
                    </div>}
            </div>
            {console.log("checking", checked)}


            {props.TaskModelTitle === "Resignation Approval" && <div className="ResigContent">
                <Grid item xs={12} container direction="row" spacing={3}>

                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Resignation accepted on</div>
                        <div>
                            <Labelbox type="datepicker"
                                changeData={(data) =>
                                    checkValidation(data, "accept_date")
                                }
                                minDate={new Date()}
                                value={Resignation.accept_date.value}
                                error={Resignation.accept_date.error}
                                errmsg={Resignation.accept_date.errmsg}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="appraisalFieldheading"> Proposed date of relieving</div>
                        <div>
                            <Labelbox type="datepicker"
                                changeData={(data) =>
                                    checkValidation(data, "releive_date")
                                }
                                minDate={Datehide}
                                value={Resignation.releive_date.value}
                                error={Resignation.releive_date.error}
                                errmsg={Resignation.releive_date.errmsg}
                            />
                        </div>
                    </Grid>
                </Grid>
                <div className="appraisalBtn">
                    <CustomButton btnName={"Reject"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={() => ResignationApproval("reject")} />
                    <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={() => ResignationApproval("accept")} />
                </div>

            </div>}
            {(props.TaskModelTitle === "Hr_NOC" || props.TaskModelTitle === "It_NOC" || props.TaskModelTitle === "Admin_NOC" || props.TaskModelTitle === "Finance_NOC") && <div className="appraisalBtn">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={() => Update_Noc(props.TaskModelTitle)} />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" onBtnClick={() => props.closemodal()} />
            </div>}


            {props.TaskModelTitle === "Final Relieving" &&
                <>
                    <div className="severancemodelsContainer">
                        <div>
                            <div>Date of resignation</div>
                            <div className="severanceData">{severanceData.resignationDate}</div>
                        </div>
                        <div>
                            <div>Resignation accepted on</div>
                            <div className="severanceData">{severanceData.res_accepted_on}</div>
                        </div>
                        <div>
                            <div>Proposed date for relieving</div>
                            <div className="severanceData">{severanceData.releive_date}</div>
                        </div>
                    </div>
                    <div className="severancemodelsContainer">
                        <div>
                            <div>IT Date of NOC</div>
                            <div className="severanceData">{severanceData.it_noc_date}</div>
                        </div>
                        <div>
                            <div>HR Date of NOC</div>
                            <div className="severanceData">{severanceData.hr_noc_date}</div>
                        </div>
                        <div>
                            <div>Admin Date of NOC</div>
                            <div className="severanceData">{severanceData.admin_noc_date}</div>
                        </div>
                        <div>
                            <div>Finance Date of NOC</div>
                            <div className="severanceData">{"TEST"}</div>
                        </div>
                    </div>

                    <div className="finalmodeldate">
                        <div className="appraisalFieldheading"> Actual Date of relieving</div>
                        <div>
                            <Labelbox type="datepicker"
                                changeData={(data) =>
                                    checkValidation(data, "actualdate_relieving")
                                }
                                minDate={new Date()}
                                value={Resignation.actualdate_relieving.value}
                                error={Resignation.actualdate_relieving.error}
                                errmsg={Resignation.actualdate_relieving.errmsg}
                            />
                        </div>
                    </div>

                    <div className="appraisalBtn">
                        <CustomButton btnName={"SAVE"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={() => Update_Noc(props.TaskModelTitle)} />
                        <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" onBtnClick={() => props.closemodal()} />
                    </div>

                </>
            }


        </div >
    )
}
const mapStateToProps = state => (
    {
        GetResignation: state.ExitSeverance.getResignation,
        GetSeverance: state.ExitSeverance.GetSeverance,
        Update_ItNoc: state.ExitSeverance.Update_ItNoc,
        Update_HrNoc: state.ExitSeverance.Update_HrNoc,
        Update_AdminNoc: state.ExitSeverance.Update_AdminNoc,
        Update_FinanceNoc: state.ExitSeverance.Update_FinanceNoc
    }
)

export default connect(mapStateToProps)(ResignationApproveval);