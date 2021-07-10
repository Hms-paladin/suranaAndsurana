import react, { useState, useEffect } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox'
import './Timesheet.scss'
import CustomButton from '../../../component/Butttons/button';
import ValidationLibrary from "../../../helpers/validationfunction";
import moment from 'moment';

export default function EditTimeSheet(props){

    const [noofhours,setNoOHours]=useState()
    const [Timesheet, setTimesheet] = useState({
    fromtime: {
        value: "",
        // validation: [{ "name": "required" }],
        error: null,
        errmsg: null,
    },
    totime: {
        value: "",
        // validation: [{ "name": "required" }],
        error: null,
        errmsg: null,
    },
})
    // console.log(props.edit_timesheet&&props.edit_timesheet,noofhours,"edit_timesheet")

    function timesheet_edit(){
        // props.closemodal(false)
        props.edit_timesheet.start_time=Timesheet.fromtime.value
        props.edit_timesheet.end_time=Timesheet.totime.value
        console.log(props.edit_timesheet,"edit_timesheet")
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

        
        // if(key==='noofdays'){
        //     setEligible_leave(data)
        // }
        // if(key==='leavetype'){
        //     setEligible_leave("")
        //     // setTimesheetEdit(false)
        //     setEditBtn(false)
        // }
       
        setTimesheet((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));

        // console.log(moment(Timesheet.totime.value),"edit_timesheet")

        var diff = Math.floor((Date.parse(moment(Timesheet.totime.value).format('DD-MM-YYYY hh:mm:ss A')) - Date.parse(moment(Timesheet.fromtime.value).format('DD-MM-YYYY hh:mm:ss A'))) / 86400000)
        isNaN(diff) ? setNoOHours(0) : setNoOHours(diff)
        console.log(Date.parse(moment(Timesheet.totime.value).format('DD-MM-YYYY hh:mm:ss A')),diff,"edit_timesheet")
    }
    return(
        <>
        <div>
            <div className="edit_time_sheet">
            <div><div className="time_col_head">Start Date / Time</div><div className="time_col_values">{props.edit_timesheet&&props.edit_timesheet.start_date} / {props.edit_timesheet&&props.edit_timesheet.start_time}</div></div>
            <div><div className="time_col_head">End Date / Time</div><div  className="time_col_values">{props.edit_timesheet&&props.edit_timesheet.end_date} / {props.edit_timesheet&&props.edit_timesheet.end_time}</div></div>
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
                <Labelbox type="text" value={noofhours} />
            </div>
            <div className="time_save_btndiv">
            <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"  onBtnClick={()=>timesheet_edit ()}/>
            </div>
        </div>
        </>
    )
}