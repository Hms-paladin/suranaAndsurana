import React, { useEffect, useState } from "react";
import EditIcon from "../../images/editable.svg";
import CustomButton from '../../component/Butttons/button';
import './appraisal.scss';
function MPRating() {
    return (
        <div>
            <div className="MP_Details">
                <div>
                    <div>Employee Name</div>
                    <div>Period</div>
                </div>
                <div>
                    <div>Rajesh</div>
                    <div>April 2021 to March 2021</div>
                </div>
            </div>
            <div className="MPRatingContainer">
                <div className="heading">Punctuality</div>
                <div style={{ padding: "10px 35px 10px 5px" }}>
                    <div className="MP_RatingContentBox">
                        <div>Unable to keep up with times and Requires constant reminder to complete the tasks</div>
                        <div className="edit_rate">
                            <div className="RateBox">3</div>
                            <img className="img_rate" src={EditIcon}></img>
                        </div>
                    </div>
                    <div className="MP_RatingContentBox">
                        <div>Maintains the time and completes the tasks with few reminders</div>
                        <div className="edit_rate">
                            <div className="RateBox">-</div>
                        </div>
                    </div>
                    <div className="MP_RatingContentBox">
                        <div>Always on time and complete the task well and ahead of time</div>
                        <div className="edit_rate">
                            <div className="RateBox">-</div>
                        </div>
                    </div>
                </div>
                <div className="heading">Communication</div>
                <div style={{ padding: "10px 35px 10px 5px" }}>
                    <div className="MP_RatingContentBox">
                        <div>Unable to keep up with times and Requires constant reminder to complete the tasks</div>
                        <div className="edit_rate">
                            <div className="RateBox">-</div>
                        </div>
                    </div>
                    <div className="MP_RatingContentBox">
                        <div>Maintains the time and completes the tasks with few reminders</div>
                        <div className="edit_rate">
                            <div className="RateBox">6</div>
                            <img className="img_rate" src={EditIcon}></img>
                        </div>
                    </div>
                    <div className="MP_RatingContentBox">
                        <div>Always on time and complete the task well and ahead of time</div>
                        <div className="edit_rate">
                            <div className="RateBox">-</div>
                        </div>
                    </div>
                </div>
                <div className="heading">Criteria 3</div>
                <div style={{ padding: "10px 35px 10px 5px" }}>
                    <div className="MP_RatingContentBox">
                        <div>Unable to keep up with times and Requires constant reminder to complete the tasks</div>
                        <div className="edit_rate">
                            <div className="RateBox">-</div>
                        </div>
                    </div>
                    <div className="MP_RatingContentBox">
                        <div>Maintains the time and completes the tasks with few reminders</div>
                        <div className="edit_rate">
                            <div className="RateBox">-</div>
                        </div>
                    </div>
                    <div className="MP_RatingContentBox">
                        <div>Always on time and complete the task well and ahead of time</div>
                        <div className="edit_rate">
                            <div className="RateBox">7</div>
                            <img className="img_rate" src={EditIcon}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="MP_btns">
                <CustomButton btnName={"Approve"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
            </div>
        </div>
    )
}
export default MPRating;