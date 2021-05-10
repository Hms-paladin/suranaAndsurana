import react, { useEffect, useState } from 'react';
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
import { notification } from "antd";

const { Panel } = Collapse;

function Appraisal(props) {
    let { rowId } = useParams()


    // useEffect(() => {
    // dispatch(getProjectDetails(rowId))
    // }, [])
    const dispatch = useDispatch();
    const rowIdtw = ""
    const [addemployeeDetails, setAddemployeeDetails] = useState([])
    const [changeCheckbox, setChangeCheckbox] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)
    const [ratingModelOpen, setRatingModelOpen] = useState(false)
    const [modelTitle, setModelTitle] = useState()
    const [rowID, setRowID] = useState(rowId)
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

    function callback(key) {
        console.log(key);
    }

    // useEffect(() => {
    //     setRowID(rowId)

    // },[])


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
    // console.log(rowID, "rowID")

    const [permission, setPermission] = useState([])

    ///*****user permission**********/
    useEffect(() => {
        if(props.UserPermission.length>0&&props.UserPermission[0].item[0].item){
        let data_res_id = props.UserPermission[0].item[0].item.find((val) => { 
        return (
            "Appraisal Apply & view" == val.screen_name
        ) 
        })
        setPermission(data_res_id)
        if(data_res_id.allow_view==='N')
        rights()

        }
    }, [props.UserPermission]);
    /////////////
    console.log(permission,"props.UserPermission")
    function rights(){
        notification.success({
            message: "You Dont't Have Rights To Access This",
        });
    }
    return (
        <div>
       {/* { permission.allow_view==='Y'&& <div> */}
            <div>Appraisal</div>
            <div className="appraisalContainer">
                <div className="empDetails">
                    <div>
                        <div>Employee Name</div>
                        <div>Rajesh</div>
                    </div>
                    {(rowID == 1 || rowIdtw == 2) && <div>
                        <div>DOB</div>
                        <div>14-Jan-1989</div>
                    </div>}
                    {(rowID == 1 || rowIdtw == 2) && <div>
                        <div>DOJ</div>
                        <div>21-Feb-2017</div>
                    </div>}
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

                {/* <div>
                    <Grid item xs={12} container direction="row" spacing={2}>

                        <Grid item xs={3}>
                            <div className="appraisalFieldheading"> Area of Development</div>
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

                </div> */}
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


            { rowID == 1 ?
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
                        <div><Checkbox /> Yes</div>
                        <div><Checkbox /> No</div>
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
                : <>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Area of Specialization")}>Area of Specialization</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Self work descripition (List out the details of works carried and the frequency)")}>Self work descripition (List out the details of works carried and the frequency)</div>
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
                </>}
            <DynModel modelTitle={"Appraisal"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={<AppraisalModel modelTitle={modelTitle} />} />

            {(rowID == 1 || rowIdtw == 2) &&
                <>
                    <div className="commentLine">------------------------------------------------------------- Your comment -------------------------------------------------------------------</div>
                </>}
            {rowID == 1 &&
                <>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Appraiser Comments")}>Appraiser Comments</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Instruction/Advice")}>Instruction/Advice</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Advice to Managing Partner")}>Advice to Managing Partner</div>
                    </div>
                </>
            }


            {
                rowIdtw == 2 &&
                <>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Advice/Instruction to Appraise")}>Advice/Instruction to Appraise</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Advice to HOD")}>Advice to HOD</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Instruction to Head Admin/HOD")}>Instruction to Head Admin/HOD</div>
                    </div>
                    <div className="linkingModel">
                        <div className="linkview" onClick={() => appraisalModelOpen("Feedback of Managing Partner")}>Feedback of Managing Partner</div>
                    </div>

                </>
            }

            <div className="appraisalBtn">
                {rowID == 1 && <CustomButton btnName={"Rating"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={() => setRatingModelOpen(true)} />}
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <DynModel modelTitle={"Rating"} handleChangeModel={ratingModelOpen} handleChangeCloseModel={(bln) => setRatingModelOpen(bln)} content={<RatingModel />} width={700} />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
            </div>



        {/* </div > } */}
        </div>
    )
}

const mapStateToProps = (state) =>
    ({
        UserPermission: state.UserPermissionReducer.getUserPermission,
    });
export default connect(mapStateToProps) (Appraisal);