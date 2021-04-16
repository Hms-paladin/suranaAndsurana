import react, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import EnhancedTable from '../../component/DynTable/table';
import ValidationLibrary from "../../helpers/validationfunction";
import PlusIcon from "../../images/plusIcon.svg";
import { useDispatch, connect } from "react-redux";
import { Checkbox } from 'antd';
import AppraisalModel from './appraisalModel';
import DynModel from "../../component/Model/model";


import './appraisal.scss';


function Appraisal() {
    const dispatch = useDispatch();
    const [addemployeeDetails, setAddemployeeDetails] = useState([])
    const [changeCheckbox, setChangeCheckbox] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)
    const [modelTitle, setModelTitle] = useState()
    const [Appraisal, setAppraisal] = useState({
        area_dev: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        details: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        date: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        comment: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })

    const AddempDetails = () => {
        addemployeeDetails.push({ details: Appraisal.details.value, date: Appraisal.date.value })
        setAddemployeeDetails([...addemployeeDetails])

    }


    function checkValidation(data, key) {
        console.log(data, key, "dataValue")

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Appraisal[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Appraisal[key].validation,
        };


        setAppraisal((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    const linkChoose = () => {
        setChangeCheckbox(!changeCheckbox)
    }
    const appraisalModelOpen = (data) => {
        setModelOpen(true)
        setModelTitle(data)
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
                        <div>Period</div>
                        <div>April 2021 to March 2021</div>
                    </div>
                </div>
                <div>
                    <Grid item xs={12} container direction="row" spacing={2}>

                        <Grid item xs={3}>
                            <div className="appraisalFieldheading"> Area of Developement</div>
                            <div>
                                <Labelbox type="select"
                                    changeData={(data) =>
                                        checkValidation(data, "area_dev")
                                    }
                                    value={Appraisal.area_dev.value}
                                    error={Appraisal.area_dev.error}
                                    errmsg={Appraisal.area_dev.errmsg}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="appraisalFieldheading"> Details</div>
                            <div>
                                <Labelbox type="text"
                                    changeData={(data) =>
                                        checkValidation(data, "details")
                                    }
                                    value={Appraisal.details.value}
                                    error={Appraisal.details.error}
                                    errmsg={Appraisal.details.errmsg}

                                />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="appraisalFieldheading">Date</div>
                            <div>
                                <Labelbox type="datepicker"
                                    changeData={(data) =>
                                        checkValidation(data, "date")
                                    }
                                    value={Appraisal.date.value}
                                    error={Appraisal.date.error}
                                    errmsg={Appraisal.date.errmsg}

                                />
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <br />
                            <img src={PlusIcon} onClick={AddempDetails} className="plusiconview" />
                        </Grid>
                    </Grid>

                </div>
                {addemployeeDetails.length > 0 &&
                    <div className="appraisalTable" >
                        <div className="appraisaldetails">
                            <div>Qualification</div>
                            <div>Date</div>
                        </div>

                        {addemployeeDetails.map((data) => {
                            return (
                                <div className="appraisaldata">
                                    <div>{data.details}</div>
                                    <div>{data.date}</div>
                                </div>
                            )
                        })}

                    </div>}
            </div>
            <div className="linkingModel">
                <div className="linkview" onClick={() => appraisalModelOpen("Area of Specialization")}>Area of Specialization</div>
            </div>
            <div className="linkingModel">
                <div className="linkview"onClick={() => appraisalModelOpen("Self work descripition (List out the details of works carried and the frequency)")}>Self work descripition (List out the details of works carried and the frequency)</div>
            </div>
            <div className="linkingModel">
                <div className="linkview" onClick={() => appraisalModelOpen("Out of the above, list out your current duties/work, which is your opinion, are not you competency")}>Out of the above, list out your current duties/work, which is your opinion, are not you competency</div>
            </div>
            <div className="linkingModel">
                <div className="linkview" onClick={() => appraisalModelOpen("Major Achievements in the review period")}>Major Achievements in the review period</div>
            </div>
            <div className="subheading">In your opinion</div>
            <div className="linkChoose">
                <div>Was your comfort level in your current responsibilities was adequate </div>
                <div><Checkbox /> Yes</div>
                <div><Checkbox /> No</div>
            </div>
            <div className="linkingModel">
                <div className="linkview" onClick={() => appraisalModelOpen("Urge to learn")}>Urge to learn</div>
            </div>
            <div className="linkingModel">
                <div className="linkview" onClick={() => appraisalModelOpen("Do you feel any specific training is required to enhance your productivity? if so, please specify")}>Do you feel any specific training is required to enhance your productivity? if so, please specify</div>
            </div>
            <div className="linkingModel">
                <div className="linkview" onClick={() => appraisalModelOpen("Suggestions, If any for improvement at SSIA")}>Suggestions, If any for improvement at SSIA</div>
            </div>
            <div className="chooseleave">
                <div className="linkChooseOption">
                    <div>Is your potential utilized fully in the current assignment </div>
                    <div><Checkbox /> Yes</div>
                    <div><Checkbox onChange={linkChoose} /> No</div>
                </div>
                {changeCheckbox &&
                    <div className="reasonBox">
                        <div>Reason for why the potential was not fully utilized</div>
                        <div className="reasonscmt">
                            <Labelbox type="textarea"
                                changeData={(data) =>
                                    checkValidation(data, "comment")
                                }
                                value={Appraisal.comment.value}
                                error={Appraisal.comment.error}
                                errmsg={Appraisal.comment.errmsg}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className="linkingModel">
                <div className="linkview" onClick={() => appraisalModelOpen("Any other specific opinion/remarks")}>Any other specific opinion/remarks</div>
            </div>
            <div className="linkingModel">
                <div className="linkview" onClick={() => appraisalModelOpen("Spell out your growth plan for the next three years")}>Spell out your growth plan for the next three years</div>
            </div>
            <div className="linkingModel">
                <div className="linkview" onClick={() => appraisalModelOpen("Spell out your growth plan for the next five years")}>Spell out your growth plan for the next five years</div>
            </div>
            <DynModel modelTitle={"Appraisal"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={<AppraisalModel modelTitle={modelTitle}/>} />


            <div className="appraisalBtn">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
            </div>

        </div>
    )
}

export default Appraisal;