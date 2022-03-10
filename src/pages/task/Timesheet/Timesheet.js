import react, { useState, useEffect } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox'
import './Timesheet.scss'
import CustomButton from '../../../component/Buttons/button';
import ValidationLibrary from "../../../helpers/validationfunction";
import moment from 'moment';

export default function EditTimeSheet(props) {

    const [noofhours, setNoOHours] = useState()
    const [Timesheet, setTimesheet] = useState({
        fromtime: {
            value: new Date(moment(props.edit_timesheet && props.edit_timesheet.start_time, 'HH:mm:ss').format()),
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        totime: {
            value: new Date(moment(props.edit_timesheet && props.edit_timesheet.end_time, 'HH:mm:ss').format()),
            // validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })

    useEffect(() => {
        setNoOHours(props.edit_timesheet && props.edit_timesheet.no_of_hrs)

    }, [props.edit_timesheet]);

    useEffect(() => {
        let st = Timesheet.fromtime.value;
        let et = Timesheet.totime.value;
        let time;
        if (et != "" && st != "") {
            var diff = (et.getTime() - st.getTime()) / 1000;
            diff /= 60;
            var num = Math.abs(Math.round(diff));
            var Hours = Math.floor(num / 60)
            var min = num % 60
            time = (Hours < 10 ? '0' + Hours : Hours) + ":" + (min < 10 ? '0' + min : min)
            setNoOHours(time)

        }
    }, [Timesheet.fromtime.value, Timesheet.totime.value]);

    function timesheet_edit() {

        props.edit_timesheet.start_time = moment(Timesheet.fromtime.value, 'HH:mm:ss').format('HH:mm:ss')
        props.edit_timesheet.end_time = moment(Timesheet.totime.value, 'HH:mm:ss').format('HH:mm:ss')
        props.edit_timesheet.no_of_hrs = noofhours
        props.update_data(props.edit_timesheet)
        props.closemodal(false)

    }

    function checkValidation(data, key) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Timesheet[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Timesheet[key].validation,
        };

        setTimesheet((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));

    }

    return (
        <>
            <div>
                <div className="edit_time_sheet">
                    <div><div className="time_col_head">Start Date / Time</div><div className="time_col_values">{props.edit_timesheet && props.edit_timesheet.start_date} / {props.edit_timesheet && props.edit_timesheet.start_time}</div></div>
                    <div><div className="time_col_head">End Date / Time</div><div className="time_col_values">{props.edit_timesheet && props.edit_timesheet.end_date} / {props.edit_timesheet && props.edit_timesheet.end_time}</div></div>
                    <div><div className="time_col_head">No of Hours</div></div>
                </div>
                {/* labelbox */}
                <div className="time_sheet_labels">
                    <Labelbox type="timepicker"
                        changeData={(data) => checkValidation(data, "fromtime")}
                        value={Timesheet.fromtime.value}
                        //   minDate={moment(`${availabledates.start_date&&availabledates.start_date} 11:00:00 AM`,"YYYY-MM-DD HH:mm:ss A").format()}
                        //  maxDate={moment(`${availabledates.end_date&&availabledates.end_date} 11:00:00 AM`,"YYYY-MM-DD HH:mm:ss A").format()}
                        //  disabled={availabledates.start_date&&availabledates.end_date?false:true}
                        error={Timesheet.fromtime.error}
                        errmsg={Timesheet.fromtime.errmsg}
                    />
                    {/* <Labelbox type="timepicker"/> */}
                    <Labelbox type="timepicker"
                        changeData={(data) => checkValidation(data, "totime")}
                        value={Timesheet.totime.value}
                        //   minDate={moment(`${availabledates.start_date&&availabledates.start_date} 11:00:00 AM`,"YYYY-MM-DD HH:mm:ss A").format()}
                        //  maxDate={moment(`${availabledates.end_date&&availabledates.end_date} 11:00:00 AM`,"YYYY-MM-DD HH:mm:ss A").format()}
                        //  disabled={availabledates.start_date&&availabledates.end_date?false:true}
                        error={Timesheet.totime.error}
                        errmsg={Timesheet.totime.errmsg}
                    />
                    {/* <Labelbox type="timepicker"/> */}
                    <Labelbox type="text" value={noofhours} disabled={true} />
                </div>
                <div className="time_save_btndiv">
                    <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={() => timesheet_edit()} />
                </div>
            </div>
        </>
    )
}