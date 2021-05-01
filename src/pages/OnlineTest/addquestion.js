import React, { useSate } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import EnhancedTable from '../../component/DynTable/table';
import { useParams, Link } from 'react-router-dom';
import { Collapse } from 'antd';
import Eyes from "../../images/neweye.svg";
import './onlinetest.scss'
function AddQuestion() {
    const headCells = [
        { id: "category", label: "Category" },
        { id: "subcategory", label: "SubCategory" },
        { id: "QType", label: "Question Type" },
        { id: "NOQ", label: "No.of Question" },
        { id: "action", label: "Action" }
    ];
    const rows = [
        { category: "Category 1", subcategory: "SubCategory 1", QType: "Question Type 1", NOQ: "02", action: <img src={Eyes} className="eyesview"></img> },
        { category: "Category 2", subcategory: "SubCategory 2", QType: "Question Type 2", NOQ: "04", action: <img src={Eyes} className="eyesview"></img> },
        { category: "Category 2", subcategory: "SubCategory 3", QType: "Question Type 3", NOQ: "06", action: <img src={Eyes} className="eyesview"></img> }
    ];
    return (
        <div>
            <div className="AQTitle">Add Question</div>
            <div className="AQContainer">
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={3} spacing={1}>
                        <Labelbox type="select" placeholder="Category"></Labelbox>
                    </Grid>
                    <Grid item xs={3} spacing={1}>
                        <Labelbox type="select" placeholder="Sub-Category"></Labelbox>
                    </Grid>
                    <Grid item xs={3} spacing={1}>
                        <Labelbox type="select" placeholder="Question Type"></Labelbox>
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={9}>
                        <Labelbox type="textarea" placeholder="Type Question" ></Labelbox>
                    </Grid>
                </Grid>
                <Grid item xs={12} container direction="row" spacing={3}>
                    <Grid item xs={6} spacing={1}>
                        <Labelbox type="text" placeholder="Option"></Labelbox>
                    </Grid>
                    <Grid item xs={3} spacing={1}>
                        <Labelbox type="text" placeholder="Answer"></Labelbox>
                    </Grid>
                    <Grid item xs={2} spacing={1}>
                        <CustomButton btnName={"Add"} btnCustomColor="customPrimary" custombtnCSS="AQAddbtn" onBtnClick="" />
                    </Grid>
                </Grid>
                <div className="egCss">(For Eg Option1,Option2,Option3...)</div>
                <div>
                    <EnhancedTable headCells={headCells} rows={rows} aligncss="usergroupcss"></EnhancedTable>
                </div>
            </div>
        </div>
    )
}
export default AddQuestion;