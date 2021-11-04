import react, { useEffect, useState } from 'react';
import './appraisal.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import { PinDropSharp } from '@material-ui/icons';
import CustomButton from '../../component/Butttons/button';


function AppraisalModel(props) {
    const [modelTitle, setModelTitle] = useState()
    const [appraisalcmt, setAppraisalcmt] = useState()
    const [test, setTest] = useState(true)
    const [changeanswer, setChangeanswer] = useState({})
    const [cmdId, setCmdId] = useState()

    const cmdid = ["area_of_speci", "self_work_des,current_duties", "major_achievement", "urge_to_learn", "enhance_your_productivity", "improvement_ssia", "opinion_remark", "growth_plan_three_yrs", "growth_plan_five_yrs", "appraisar_comments", "instruction_action", "advice_manage_parter", "instruction_to_appraise", "advice_to_hod", "instruction_to_admin_hod", "fb_managing_parter"]

    useEffect(() => {
        setModelTitle(props.modelTitle)
        setTest(true)

        Object.keys(props.modelComment).map((val) => {
            if (val === props.modelCommentID) {
                setAppraisalcmt(props.modelComment[val].value)
            }
        })

        Object.keys(props.supmodelComment).map((val) => {
            if (val === props.modelCommentID) {
                setAppraisalcmt(props.supmodelComment[val].value)
            }
        })

        Object.keys(props.managemodelComment).map((val) => {
            if (val === props.modelCommentID) {
                setAppraisalcmt(props.managemodelComment[val].value)
            }
        })


        if (props.modelCommentID === "area_of_speci") {
            setChangeanswer(props.modelComment.area_of_speci.value)
        } else if (props.modelCommentID === "self_work_des") {
            setChangeanswer(props.modelComment.self_work_des.value)
        } else if (props.modelCommentID === "current_duties") {
            setChangeanswer(props.modelComment.current_duties.value)
        } else if (props.modelCommentID === "major_achievement") {
            setChangeanswer(props.modelComment.major_achievement.value)
        } else if (props.modelCommentID === "urge_to_learn") {
            setChangeanswer(props.modelComment.urge_to_learn.value)
        } else if (props.modelCommentID === "enhance_your_productivity") {
            setChangeanswer(props.modelComment.enhance_your_productivity.value)
        } else if (props.modelCommentID === "improvement_ssia") {
            setChangeanswer(props.modelComment.improvement_ssia.value)
        } else if (props.modelCommentID === "opinion_remark") {
            setChangeanswer(props.modelComment.opinion_remark.value)
        } else if (props.modelCommentID === "growth_plan_three_yrs") {
            setChangeanswer(props.modelComment.growth_plan_three_yrs.value)
        } else if (props.modelCommentID === "growth_plan_five_yrs") {
            setChangeanswer(props.modelComment.growth_plan_five_yrs.value)
        } else if (props.modelCommentID === "appraisar_comments") {
            setChangeanswer(props.supmodelComment.appraisar_comments.values)
        } else if (props.modelCommentID === "instruction_action") {
            setChangeanswer(props.supmodelComment.instruction_action.values)
        } else if (props.modelCommentID === "advice_manage_parter") {
            setChangeanswer(props.supmodelComment.advice_manage_parter.values)
        } else if (props.modelCommentID === "instruction_to_appraise") {
            setChangeanswer(props.managemodelComment.instruction_to_appraise.value)
        } else if (props.modelCommentID === "advice_to_hod") {
            setChangeanswer(props.managemodelComment.advice_to_hod.value)
        } else if (props.modelCommentID === "instruction_to_admin_hod") {
            setChangeanswer(props.managemodelComment.instruction_to_admin_hod.value)
        } else if (props.modelCommentID === "fb_managing_parter") {
            setChangeanswer(props.managemodelComment.fb_managing_parter.value)
        }
    }, [props])

    const checkValidation = (data, key) => {
        setChangeanswer(data)
    }

    const onsubmit = () => {
        props.addAppraisalcmt(changeanswer, props.modelCommentID)
        props.handleChangeCloseModel()
        setTest(false)

    }
    return (
        <div>
            <div className="modelbox">
                <div className="appModeltitle">{modelTitle}</div>
                <div className="reasonscmt">
                    <Labelbox type="textarea"
                        changeData={(data) =>
                            checkValidation(data, "comment")
                        }
                        value={changeanswer}
                    />
                </div>
            </div>
            <div className="appraisalBtn">
                <CustomButton btnName={appraisalcmt !== "" ? "Update" : "Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={onsubmit} />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" onBtnClick={() => setAppraisalcmt("")} />
            </div>

        </div>
    )
}
export default AppraisalModel;