import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import '../Project IP1/Patent/Patent.scss'
import CustomButton from '../../component/Butttons/button';
import Tabs from '../../component/TradeMarkTabIcons/trademarktabIcons';
import Labelbox from "../../helpers/labelbox/labelbox";
import DynModel from '../../component/Model/model';
import ProjectTaskModel from '../Project IP1/ProjectTaskModel/projecttaskModel';

export default function CopyRight() {
    const [modelOpen, setModelOpen] = useState(false)



    function projectTaskModel() {
        setModelOpen(true)
    }
    const modelContent = () => {
        return (
            <ProjectTaskModel />
        )
    }
    return (
        <div >
            <Tabs task={projectTaskModel}/>
            <DynModel modelTitle={"Project Task"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} content={modelContent()} width={800} />
            <div className="copyright_div">
                <Labelbox type="text" placeholder={"Name of Opponent"} />
                <Labelbox type="datepicker" placeholder={"Opposition Filled Date"} />
                <Labelbox type="text" placeholder={"Upload Image"} />
                <Labelbox type="text" placeholder={"Reference"} />
                <Labelbox type="text" placeholder={"Status"} />
            </div>
            <Grid item xs={12} container justify="flex-end" className="patent_btns">
                <CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" />
            </Grid>
        </div>
    )
}