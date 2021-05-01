import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
import PlusIcon from "../../images/plusIcon.svg";
import { useDispatch, connect } from "react-redux";
import { Checkbox, Collapse } from 'antd';
import AppraisalModel from './appraisalModel';
import DynModel from "../../component/Model/model";
import RatingModel from './ratingModel';
import { useParams } from "react-router-dom";
import './appraisal.scss';

const { Panel } = Collapse;

function AppraisalView() {

    const [changeYesNo, setYesNo] = useState(false)
    const [ModalOpen, setModalOpen] = useState(false)
    const [ModalTitle, setModalTitle] = useState()
    function callback(key) {
        console.log(key);
    }
    function toggleYesNo() {
        setYesNo(!changeYesNo)
    }
    function appraisalModelOpen(data) {
        setModalOpen(true)
        setModalTitle(data)
    }
    return (
        <div>
            <div>Appraisal</div>
            <div className="appraisalContainer">
                <div className="empDetails">
                    <div>
                        <div>Employee Name</div>
                        <div>Rajesh</div>
                    </div>
                    <div>
                        <div>DOB</div>
                        <div>14-Jan-1989</div>
                    </div>
                    <div>
                        <div>DOJ</div>
                        <div>21-Feb-2017</div>
                    </div>
                    <div>
                        <div>Period</div>
                        <div>April 2021 to March 2021</div>
                    </div>
                </div>

                <div className="employeeApprisal_Container">
                    <div className="employeeApprisal_Child_Container">
                        <div className="TitleChildDiv">
                            <div>Qualification</div>
                            <div>Date</div>
                        </div>
                        <div className="ValueChildDiv">
                            <div>LLB</div>
                            <div>Mar 2021</div>
                        </div>
                        <div className="ValueChildDiv">
                            <div>Diploma in Law</div>
                            <div>Dec 2021</div>
                        </div>
                    </div>
                    <div className="employeeApprisal_Child_Container">
                        <div className="TitleChildDiv">
                            <div>Program</div>
                            <div>Date</div>
                        </div>
                        <div className="ValueChildDiv">
                            <div>Legal Practice</div>
                            <div>Jan 2021</div>
                        </div>
                    </div>
                    <div className="employeeApprisal_Child_Container">
                        <div className="TitleChildDiv">
                            <div>Seminar</div>
                            <div>Date</div>
                        </div>
                        <div className="ValueChildDiv">
                            <div>Seminar 1</div>
                            <div>Feb 2021</div>
                        </div>
                    </div>
                </div>
            </div>

            <>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Area of Specialization" ><div>Area of Specialization</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Self work descripition (List out the details of works carried and the frequency)" ><div>Self work descripition (List out the details of works carried and the frequency)</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Out of the above, list out your current duties/work, which is your opinion, are not you competency" ><div>Out of the above, list out your current duties/work, which is your opinion, are not you competency</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Major Achievements in the review period" ><div>Major Achievements in the review period</div></Panel></Collapse>
                </div>
                <div className="linkChoose">
                    <div>Was your comfort level in your current responsibilities was adequate </div>
                    <div style={{ cursor: "pointer", color: "blue" }}>Yes</div>
                    {/* <div><Checkbox /> No</div> */}
                </div>

                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Urge to learn" ><div>Urge to learn</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Do you feel any specific training is required to enhance your productivity? if so, please specify" ><div>Do you feel any specific training is required to enhance your productivity? if so, please specify</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Suggestions, If any for improvement at SSIA" ><div>Suggestions, If any for improvement at SSIA</div></Panel></Collapse>
                </div>
                <div className="chooseleave">
                    <div className="linkChooseOption">
                        <div>Is your potential utilized fully in the current assignment </div>
                        {/* <div>Yes</div> */}
                        <div onClick={toggleYesNo} style={{ cursor: "pointer", color: "blue" }}>No</div>
                    </div>
                    {changeYesNo &&
                        <div className="reasonBox">
                            <div>Reason for why the potential was not fully utilized</div>
                            <div className="reasonscmt">
                                <Labelbox type="textarea" text=" A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world." />
                            </div>
                        </div>
                    }
                </div>

                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Any other specific opinion/remarks" ><div>Any other specific opinion/remarks</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Spell out your growth plan for the next three years" ><div>Spell out your growth plan for the next three years</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Spell out your growth plan for the next five years" ><div>Spell out your growth plan for the next five years</div></Panel></Collapse>
                </div>
            </>
            <>
                <div className="commentLine">------------------------------------------------------------- Appraisal Section -------------------------------------------------------------------</div>
            </>
            <>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Appraiser Comments"><div>Appraiser Comments</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Instruction/Advice"><div>Instruction/Advice</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Advice to Managing Partner"><div>Advice to Managing Partner</div></Panel></Collapse>
                </div>

            </>
            <>
                <div className="commentLine">------------------------------------------------------------- Managing Partner -------------------------------------------------------------------</div>
            </>
            <>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Advice/Instruction to Appraise"><div>Advice/Instruction to Appraise</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Advice to HOD"><div>Advice to HOD</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Instruction to head Admin/HOD"><div>Instruction to head Admin/HOD</div></Panel></Collapse>
                </div>
                <div className="appraisal_collapse">
                    <Collapse onChange={callback}><Panel header="Feedback of Managing Partner"><div>Feedback of Managing Partner</div></Panel></Collapse>
                </div>
            </>
            <>
                <div className="commentLine">------------------------------------------------------------- Rating -------------------------------------------------------------------</div>
            </>

            <div className="RatingContainer">
                <div className="heading">Punctuality</div>
                <div style={{ padding: "10px 35px 10px 5px" }}>
                    <div className="RatingContentBox">
                        <div>Unable to keep up with times and Requires constant reminder to complete the tasks</div>
                        <div className="RateBox">3</div>
                    </div>
                    <div className="RatingContentBox">
                        <div>Maintains the time and completes the tasks with few reminders</div>
                        <div className="RateBox">-</div>
                    </div>
                    <div className="RatingContentBox">
                        <div>Always on time and complete the task well and ahead of time</div>
                        <div className="RateBox">-</div>
                    </div>
                </div>
                <div className="heading">Communication</div>
                <div style={{ padding: "10px 35px 10px 5px" }}>
                    <div className="RatingContentBox">
                        <div>Unable to keep up with times and Requires constant reminder to complete the tasks</div>
                        <div className="RateBox">-</div>
                    </div>
                    <div className="RatingContentBox">
                        <div>Maintains the time and completes the tasks with few reminders</div>
                        <div className="RateBox">6</div>
                    </div>
                    <div className="RatingContentBox">
                        <div>Always on time and complete the task well and ahead of time</div>
                        <div className="RateBox">-</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default AppraisalView;