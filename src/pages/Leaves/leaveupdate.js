import react, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import Edit from "../../images/editable.svg";
import ValidationLibrary from "../../helpers/validationfunction";
import './leaveupdate.scss';

const headCells = [
    { id: 'leavetype', label: 'Leave Type' },
    { id: 'previousbalance', label: 'Previous Balance' },
    { id: 'eligible', label: 'Eligible' },
    { id: 'currentbalance', label: 'Current Balance' }
];

const rows = [
    { leavetype: "Casual leave", previousbalance: 2, eligible: 10, currentbalance: 12, img: <img src={Edit} className="editImage" /> },
    { leavetype: "Annual leave", previousbalance: 4, eligible: 10, currentbalance: 14, img: <img src={Edit} className="editImage" /> },
    { leavetype: "On duty", previousbalance: 8, eligible: 10, currentbalance: 43, img: <img src={Edit} className="editImage" /> }
]

function LeaveUpdate() {

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

    })

    // useEffect(() => {
    //     dispatch(getActivity());
    // }, [])

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
                    <Grid item xs={3}>
                        <div className="leaveFieldheading">Employee Id</div>
                        <div>
                            <Labelbox type="text" />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="leaveFieldheading">Name</div>
                        <div>
                            Rajesh
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="leaveFieldheading">Leave Type</div>
                        <div>
                            <Labelbox type="timepicker"
                                changeData={(data) =>
                                    checkValidation(data, "timepicker")
                                }
                                value={Leave_Update.timepicker.value}
                                error={Leave_Update.timepicker.error}
                                errmsg={Leave_Update.timepicker.errmsg} />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="leaveFieldheading">Add No.of Days</div>
                        <div>
                            <Labelbox type="text" />
                        </div>
                    </Grid>
                    <Grid item xs={5} container direction="row" spacing={2}>
                        <Grid item xs={4}>
                            <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onSubmit}/>
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
export default LeaveUpdate;