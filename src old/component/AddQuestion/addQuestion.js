import React, { useState } from 'react'
import CustomButton from "../Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import { Redirect, Link } from "react-router-dom";
import Delete from '../../images/dashboard/delete.svg';
import TestTemplate from '../../pages/OnlineTest/testtemplate'
function AddQuestions(props){
 
    return(
        <div className="TTcategory">
        <Grid item xs={12} container direction="row" spacing={2}>
            <Grid item xs={3} container direction="column">
                <div className="TThead">Category</div>
                <Labelbox type="select"></Labelbox>
            </Grid>
            <Grid item xs={3} container direction="column">
                <div className="TThead">Sub Category</div>
                <Labelbox type="select"></Labelbox>
            </Grid>
            <Grid item xs={3} container direction="column">
                <div className="TThead">No .of Questions</div>
                <Labelbox type="select"></Labelbox>
            </Grid>
            <Grid item xs={1} container direction="row" justify="center" alignItems="center">
                <img src={Delete} className="plusicon" onClick=""/>
            </Grid>
        </Grid>
    </div>
    )
}
export default AddQuestions;