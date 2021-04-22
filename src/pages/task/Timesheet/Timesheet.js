import React from 'react'
import Labelbox from '../../../helpers/labelbox/labelbox'
import './Timesheet.scss'
import CustomButton from '../../../component/Butttons/button';
export default function EditTimeSheet(props){
    return(
        <>
        <div>
            <div className="edit_time_sheet">
            <div><div className="time_col_head">Start Date / Time</div><div className="time_col_values">05-Mar-2021 / 03:26 PM</div></div>
            <div><div className="time_col_head">3 Hrs 20 Mins</div></div>
            <div><div className="time_col_head">End Date / Time</div><div  className="time_col_values">05-Mar-2021 / 06:26 PM</div></div>
            </div>
            {/* labelbox */}
            <div className="time_sheet_labels">
                <Labelbox type="timepicker"/>
                <Labelbox type="timepicker"/>
                <Labelbox type="text"  placeholder={"3 Hrs 20 Mins"}/>
            </div>
            <div className="time_save_btndiv">
            <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save"  onBtnClick={()=>props.closemodal(false)}/>
            </div>
        </div>
        </>
    )
}