import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../../component/Buttons/button';
import Tabs from '../../../component/TradeMarkTabIcons/trademarktabIcons';
import DynModel from '../../../component/Model/model';
import ProjectTaskModel from '../ProjectTaskModel/projecttaskModel';
import IndiaFilling from './Application/IndiaFilling';
import InternationalFilling from './Application/InternationalFilling';
import CancelFiled from './Cancellation/CancelFiled';
import CancelDefended from "./Cancellation/CancelDefended";
import RectificationFiled from './Rectification/RectificationFiled';
import RectificationDefended from './Rectification/RectificationDefended';

export default function Patent(props) {

    const [modelOpen, setModelOpen] = useState(false)

    function projectTaskModel(boxName) {
        boxName === "TASKS" && setModelOpen(true)
    }
    const modelContent = () => {
        return (
            <ProjectTaskModel />
        )
    }

    return (
        <div>
            <Tabs onChangeTabBox={(data) => projectTaskModel(data)} />
            <DynModel modelTitle={"Project Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} width={800} />

            {
                props.Type.process_type.value === '' && props.Type.filling_type.value == '' &&
                <IndiaFilling />
            }
            {
                props.Type.process_type.value === '1' && props.Type.filling_type.value == '1' &&
                <IndiaFilling />
            }
            {
                props.Type.process_type.value === '1' && props.Type.filling_type.value == '2' &&
                <InternationalFilling />
            }
            {
                props.Type.process_type.value === '2' && props.Type.filling_type.value == '1' &&
                <CancelFiled />
            }
            {
                props.Type.process_type.value === '2' && props.Type.filling_type.value == '2' &&
                <CancelDefended />
            }
            {
                props.Type.process_type.value === '3' && props.Type.filling_type.value == '1' &&
                <RectificationFiled />
            }
            {
                props.Type.process_type.value === '3' && props.Type.filling_type.value == '2' &&
                <RectificationDefended />
            }

            <Grid item xs={12} container justify="flex-end" className="patent_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
            </Grid>
        </div>
    )
}