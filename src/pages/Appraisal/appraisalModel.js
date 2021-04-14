import react, { useEffect, useState } from 'react';
import './appraisal.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import { PinDropSharp } from '@material-ui/icons';
import CustomButton from '../../component/Butttons/button';


function AppraisalModel(props) {
    const [modelTitle, setModelTitle] = useState()
    useEffect(() => {
        setModelTitle(props.modelTitle)
    }, [props])
    return (
        <div>
            <div className="modelbox">
                <div className="appModeltitle">{modelTitle}</div>
                <div className="reasonscmt">
                    <Labelbox type="textarea"
                    // changeData={(data) =>
                    //     checkValidation(data, "comment")
                    // }
                    // value={Appraisal.comment.value}
                    // error={Appraisal.comment.error}
                    // errmsg={Appraisal.comment.errmsg}
                    />
                </div>
            </div>
            <div className="appraisalBtn">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_save" />
            </div>

        </div>
    )
}
export default AppraisalModel;