import React, { useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import { Redirect, Link } from "react-router-dom";
import './onlinetest.scss'
function TestTemplate() {
    const [pathname, setPathName] = useState(window.location.pathname)
    return (
        <div>
            <div className="AQTitle">Test Template</div>
            <div className="TTContainer">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={3} container direction="column">
                        <div>Template Name</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div>Maximum Questions</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div>Duration (In Mins)</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                </Grid>
                <div className="TTcategory">
                    <Grid item xs={12} container direction="row" spacing={2}>
                        <Grid item xs={3} container direction="column">
                            <div>Category</div>
                            <Labelbox type="select"></Labelbox>
                        </Grid>
                        <Grid item xs={3} container direction="column">
                            <div>Sub Category</div>
                            <Labelbox type="select"></Labelbox>
                        </Grid>
                        <Grid item xs={3} container direction="column">
                            <div>No .of Questions</div>
                            <Labelbox type="select"></Labelbox>
                        </Grid>
                        <Grid item xs={1} container direction="row" justify="center" alignItems="center">
                            <img src={PlusIcon} className="plusicon" />
                        </Grid>
                    </Grid>
                </div>
                <div id="TTbtns">
                <Link to="/onlinetest"><CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={()=>setPathName("/onlinetest")} /></Link>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
                </div>
            </div>
        </div>
    )
}
export default TestTemplate;