import react, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import Edit from "../../images/editable.svg";
import ValidationLibrary from "../../helpers/validationfunction";
import { getLeaveType } from "../../actions/MasterDropdowns";
import { useDispatch, connect } from "react-redux";
import './leaveupdate.scss';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Delete from '../../images/dashboard/delete.svg';


const { Search } = Input;

const headCells = [
    { id: 'leavetype', label: 'Leave Type' },
    { id: 'previousbalance', label: 'Previous Balance' },
    { id: 'eligible', label: 'Eligible' },
    { id: 'currentbalance', label: 'Current Balance' },
    { id: 'img', label: 'Action' }

];

const rows = [
    { leavetype: <a href={"#"} className="linktable">Casual leave</a>, previousbalance: 2, eligible: 10, currentbalance: 12, img: <><img src={Edit} className="editImage" /> <img src={Delete} className="editImage" /></> },
    { leavetype: <a href={"#"} className="linktable">Annual leave</a>, previousbalance: 4, eligible: 10, currentbalance: 14, img: <><img src={Edit} className="editImage" /> <img src={Delete} className="editImage" /></> },
    { leavetype: <a href={"#"} className="linktable">On duty</a>, previousbalance: 8, eligible: 10, currentbalance: 43, img: <><img src={Edit} className="editImage" /> <img src={Delete} className="editImage" /></> }
]

function LeaveUpdate(props) {
    const dispatch = useDispatch();
    const [leaveType, setLeaveType] = useState({})
    const [Leave_Update, setleaveUpdate] = useState({
        timepickerfrom: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        timepickerto: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        timepicker: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        leavetype: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },

    })

    useEffect(() => {
        dispatch(getLeaveType());
    }, [])

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 20,
                color: '#1890ff',
            }}
        />
    );

    useEffect(() => {
        //Leave type
        let LeaveType = [];
        props.LeaveType.map((data) =>
            LeaveType.push({ id: data.status_id, value: data.leave_type })
        );
        setLeaveType({ LeaveType });

    }, [props.LeaveType])

    function checkValidation(data, key) {
        console.log(data, key, "dataValue")

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Leave_Update[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Leave_Update[key].validation,
        };


        setleaveUpdate((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }



    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(Leave_Update);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Leave_Update[targetkeys[i]].value,
                Leave_Update[targetkeys[i]].validation
            );
            Leave_Update[targetkeys[i]].error = !errorcheck.state;
            Leave_Update[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Leave_Update[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => Leave_Update[obj].error == true);
        // console.log(filtererr.length);
        // console.log(educationList.length, "educationList.length")
        if (filtererr.length > 0) {
        } {
        }

        setleaveUpdate((prevState) => ({
            ...prevState,
        }));
    }
    return (
        <div>
            <div className="leaveMainHeader">Leave Balance Update</div>
            <div className="leaveFields">
                <Grid item xs={12} container direction="row" spacing={2}>
                    {Leave_Update.leavetype.value !== 38 && Leave_Update.leavetype.value !== "" &&
                        <>

                            <Grid item xs={3}>
                                <div className="leaveFieldheading">From</div>
                                <div>
                                    <Labelbox type="datepicker"
                                        changeData={(data) =>
                                            checkValidation(data, "timepickerfrom")
                                        }
                                        value={Leave_Update.timepickerfrom.value}
                                        error={Leave_Update.timepickerfrom.error}
                                        errmsg={Leave_Update.timepickerfrom.errmsg} />
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className="leaveFieldheading">To</div>
                                <div>
                                    <Labelbox type="datepicker"
                                        changeData={(data) =>
                                            checkValidation(data, "timepickerto")
                                        }
                                        value={Leave_Update.timepickerto.value}
                                        error={Leave_Update.timepickerto.error}
                                        errmsg={Leave_Update.timepickerto.errmsg} />
                                </div>
                            </Grid>


                        </>}
                    {(Leave_Update.leavetype.value !== 38 || Leave_Update.leavetype.value === 38) && Leave_Update.leavetype.value !== "" && <>
                        <Grid item xs={3}>
                            <div className="leaveFieldheading">Employee Id</div>
                            <div className="searchbtnChange">
                                <Search enterButton />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="leaveFieldheading">Name</div>
                            <div>
                                Rajesh
                        </div>
                        </Grid>
                        {Leave_Update.leavetype.value === 38 &&
                            <>
                                <Grid item xs={6}></Grid>

                            </>
                        }
                    </>}

                    <Grid item xs={3}>
                        <div className="leaveFieldheading">Leave Type</div>
                        <div>
                            <Labelbox type="select"
                                dropdown={leaveType.LeaveType}
                                changeData={(data) =>
                                    checkValidation(data, "leavetype")
                                }
                                value={Leave_Update.leavetype.value}
                                error={Leave_Update.leavetype.error}
                                errmsg={Leave_Update.leavetype.errmsg} />
                        </div>
                    </Grid>
                    {Leave_Update.leavetype.value !== 38 && Leave_Update.leavetype.value !== "" && <>
                        <Grid item xs={3}>
                            <div className="leaveFieldheading">Add No.of Days</div>
                            <div>
                                <Labelbox type="text" />
                            </div>
                        </Grid>
                    </>}



                    {Leave_Update.leavetype.value === 38 &&
                        <>
                            <Grid item xs={3}>
                                <div className="leaveFieldheading">Add No. of Hours/Per Month</div>
                                <div>
                                    <Labelbox type="text" />
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
            <div className="leavetableformat">
                <EnhancedTable headCells={headCells} rows={rows} />
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
({
    LeaveType: state.getOptions.getLeaveType,
});
export default connect(mapStateToProps)(LeaveUpdate);

