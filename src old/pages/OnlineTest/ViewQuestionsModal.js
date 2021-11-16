import React, { useState } from 'react'
import EnhancedTable from '../../component/DynTable/table';
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import { Redirect, Link } from "react-router-dom";
import './onlinetest.scss'

function ViewQuestionsModal(){
    const headCells=[
        {id:"question",label:"Question"},
        {id:"option",label:"Options"},
        {id:"answer",label:"Answer"}
    ];
    const rows=[
        {question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit Pulvinar id nulla tortor sed ac",option:"Option 1, option 2, option3",answer:"Option 1"},
        {question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit Pulvinar id nulla tortor sed ac",option:"Option 1, option 2, option3",answer:"Option 2"},
    ]
    return(
        <div>
              <div className="viewques_container">
                <div className="viewques_head">
                    <div>Category</div>
                    <div>Sub Category</div>
                    <div>Question Type</div>
                    <div>No. Of Question</div>
                </div>
                <div className="viewques_values">
                    <div>Category</div>
                    <div>Sub Category</div>
                    <div>Question Type</div>
                    <div>02</div>
                </div>
            </div>
            <div>
                <EnhancedTable headCells={headCells} rows={rows} aligncss="usergroupcss"></EnhancedTable>
            </div>
        </div>
    )
}
export default ViewQuestionsModal;