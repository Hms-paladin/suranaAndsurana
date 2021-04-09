import react, { useEffect, useState } from 'react';
import './timesheets.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../../helpers/labelbox/labelbox';
import CustomButton from '../../../component/Butttons/button';
import ValidationLibrary from "../../../helpers/validationfunction";
import { getActivity, getSubactivity } from "../../../actions/MasterDropdowns";
import { useDispatch, connect } from "react-redux";


function TimeSheetStartModel(props) {
    const [changeStop, setChangeStop] = useState(true)
    const [activity, setActivity] = useState({});
    const [subActivity, setSubActivity] = useState({});
    const dispatch = useDispatch();
    const [TIME_SHEET, setTimeSheet] = useState({
        timepickerDeadline: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        activity: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        },
        sub_Activity: {
            value: "",
            validation: [],
            error: null,
            errmsg: null,
        }
    })

    useEffect(() => {
        dispatch(getActivity());
    }, [])

    useEffect(() => {
        // Activity
        let Activity = [];
        props.Activity.map((data) =>
            Activity.push({ id: data.activity_id, value: data.activity })
        );
        setActivity({ Activity });


    }, [props.Activity,])


    const submitstop = () => {
        setChangeStop(false)

    }
    const submitstart = () => {
        setChangeStop(true)
    }


    function checkValidation(data, key) {
        console.log(data, key, "dataValue")

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            TIME_SHEET[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: TIME_SHEET[key].validation,
        };

        //Process type

        if (key === "activity" && data) {
            let values = {
                Activity: TIME_SHEET.activity.value,
            };
            dispatch(getSubactivity(values));
        }

        setTimeSheet((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    useEffect(() => {
        // Sub Activity
        let SubActivity = [];
        props.SubActivity.map((data) =>
            SubActivity.push({ id: data.sub_activity_id, value: data.sub_activity })
        );
        setSubActivity({ SubActivity });

    }, [props.SubActivity])


    function onSubmit() {
        var mainvalue = {};
        var targetkeys = Object.keys(TIME_SHEET);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                TIME_SHEET[targetkeys[i]].value,
                TIME_SHEET[targetkeys[i]].validation
            );
            TIME_SHEET[targetkeys[i]].error = !errorcheck.state;
            TIME_SHEET[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = TIME_SHEET[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => TIME_SHEET[obj].error == true);
        // console.log(filtererr.length);
        // console.log(educationList.length, "educationList.length")
        if (filtererr.length > 0) {
        } {
        }

        setTimeSheet((prevState) => ({
            ...prevState,
        }));
    }


    return (
        <div className="timeSheetStartContainer">
            {changeStop ?
                <div>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={4}>IP Project</Grid>

                        <Grid item xs={4}>Project Name</Grid>

                        <Grid item xs={4}>Johnson & Johnson </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Activity"}
                                dropdown={activity.Activity}
                                changeData={(data) =>
                                    checkValidation(data, "activity")
                                }
                                value={TIME_SHEET.activity.value}
                                error={TIME_SHEET.activity.error}
                                errmsg={TIME_SHEET.activity.errmsg}

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"sub Activity"}
                                dropdown={subActivity.SubActivity}
                                changeData={(data) =>
                                    checkValidation(data, "sub_Activity")
                                }
                                value={TIME_SHEET.sub_Activity.value}
                                error={TIME_SHEET.sub_Activity.error}
                                errmsg={TIME_SHEET.sub_Activity.errmsg}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Assign To"}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Priority"}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Tag"}
                            /></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                placeholder={" Deadline "}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="timepicker"
                                placeholder={"Deadline"}
                                changeData={(data) =>
                                    checkValidation(data, "timepickerDeadline")
                                }
                                value={TIME_SHEET.timepickerDeadline.value}
                                error={TIME_SHEET.timepickerDeadline.error}
                                errmsg={TIME_SHEET.timepickerDeadline.errmsg}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                placeholder={" Deadline "}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            End Time
                            </Grid>

                    </Grid>
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"} />
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" />
                        <CustomButton btnName={"Start"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnClick={submitstop} />
                        {/* <CustomButton btnName={"START"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnclick={props.changeStop}/> */}

                    </div>
                </div>
                :
                <div>
                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={4}>IP Project</Grid>

                        <Grid item xs={4}>Project Name</Grid>

                        <Grid item xs={4}>Johnson & Johnson </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Activity"}
                                dropdown={activity.Activity}
                                changeData={(data) =>
                                    checkValidation(data, "activity")
                                }
                                value={TIME_SHEET.activity.value}
                                error={TIME_SHEET.activity.error}
                                errmsg={TIME_SHEET.activity.errmsg}

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"sub Activity"}
                                dropdown={subActivity.SubActivity}
                                changeData={(data) =>
                                    checkValidation(data, "sub_Activity")
                                }
                                value={TIME_SHEET.sub_Activity.value}
                                error={TIME_SHEET.sub_Activity.error}
                                errmsg={TIME_SHEET.sub_Activity.errmsg}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Assign To"}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Priority"}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Labelbox type="select"
                                placeholder={"Tag"}
                            /></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                placeholder={" Deadline "}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="timepicker"
                                placeholder={"Deadline"}
                                changeData={(data) =>
                                    checkValidation(data, "timepickerDeadline")
                                }
                                value={TIME_SHEET.timepickerDeadline.value}
                                error={TIME_SHEET.timepickerDeadline.error}
                                errmsg={TIME_SHEET.timepickerDeadline.errmsg}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Labelbox type="datepicker"
                                placeholder={" Deadline "}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            End Time
                            </Grid>

                    </Grid>
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"} />
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" />
                        <CustomButton btnName={"STOP"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnclick={submitstart} />
                    </div>
                    {/* <Grid item xs={12} container direction="row" spacing={3}>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={12}>IP Project</Grid>
                            <Grid item xs={12}>
                                <Labelbox type="select"
                                    placeholder={"Activity"}
                                // changeData={(data) =>
                                //     checkValidation(data, "timepickerDeadline")
                                // }
                                // value={TIME_SHEET.timepickerDeadline.value}
                                // error={TIME_SHEET.timepickerDeadline.error}
                                // errmsg={TIME_SHEET.timepickerDeadline.errmsg}
                                />
                            </Grid>
                            <Grid item xs={12}>Priority</Grid>
                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={12}>Project Name </Grid>
                            <Grid item xs={12}>First Cut Draft</Grid>
                            <Grid item xs={12}>Tag</Grid>

                        </Grid>
                        <Grid item xs={4} container direction="column" spacing={1}>
                            <Grid item xs={12}>Johnson & Johnson</Grid>
                            <Grid item xs={12}>Assign To</Grid>
                            <Grid item xs={12}>Description</Grid>

                        </Grid>

                    </Grid>
                    <div className="timeSheetDatesFormat">
                        <Grid item xs={12} container direction="row" spacing={5}>

                            <Grid item xs={5} container direction="row" justify="center" spacing={4}>
                                <Grid item xs={6}>(5-Mar-2021)</Grid>
                                <Grid item xs={6}>3.20 PM</Grid>

                            </Grid>
                            <Grid item xs={7} container direction="row" spacing={5}>

                                <Grid item xs={6}>
                                    <Labelbox type="datepicker"
                                        placeholder={"Deadline"}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Labelbox type="timepicker"
                                        placeholder={"Deadline"}
                                        changeData={(data) =>
                                            checkValidation(data, "timepickerDeadline")
                                        }
                                        value={TIME_SHEET.timepickerDeadline.value}
                                        error={TIME_SHEET.timepickerDeadline.error}
                                        errmsg={TIME_SHEET.timepickerDeadline.errmsg}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="timeSheetComments">
                        <Labelbox type="textarea" placeholder={"comments"} />
                    </div>
                    <div className="customiseButton">
                        <CustomButton btnName={"CANCEL"} custombtnCSS="timeSheetButtons" />
                        <CustomButton btnName={"STOP"} btnCustomColor="customPrimary" custombtnCSS="timeSheetButtons" onBtnclick={submitstart} />

                    </div> */}
                </div>
            }

        </div>

    )
}
const mapStateToProps = (state) =>
// console.log(state,"statestatestate")
({
    Activity: state.getOptions.getActivity,
    SubActivity: state.getOptions.getSubactivity || [],


});

export default connect(mapStateToProps)(TimeSheetStartModel);
