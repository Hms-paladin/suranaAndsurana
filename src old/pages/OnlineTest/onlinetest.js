import React, { useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import { Redirect, Link } from "react-router-dom";
import DynModel from "../../component/Model/model";
import InstructionModal from '../OnlineTest/instructionModal'
import './onlinetest.scss'
function OnlineTest() {
    const [pathname, setPathName] = useState(window.location.pathname)
    const[instModal,setInstModal]=useState(false)
    return (
        <div>
            <div className="AQTitle">Online Test</div>
            <div className="TTContainer">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={4}>
                        <Labelbox type="select" placeholder="Candidate Name"></Labelbox>
                    </Grid>
                    <Grid item xs={4}>
                        <Labelbox type="select" placeholder="Designation"></Labelbox>
                    </Grid>
                    <Grid item xs={4}>
                        <Labelbox type="select" placeholder="Template Name"></Labelbox>
                    </Grid>
                </Grid>
                <div id="TTbtns">
                <CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={()=>setInstModal(true)} />
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
                <DynModel modelTitle="Online Test Instructions" handleChangeModel={instModal} handleChangeCloseModel={(bln) => setInstModal(bln)} width={700} 
                content={<InstructionModal />} closeModel={()=>setInstModal(false)}/>
                </div>
            </div>
        </div>
    )
}
export default OnlineTest;