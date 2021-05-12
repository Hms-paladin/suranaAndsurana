import React, { useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import { Redirect, Link } from "react-router-dom";
import AddQuestions from "../../component/AddQuestion/addQuestion"
import Delete from '../../images/dashboard/delete.svg';
import './onlinetest.scss'
function TestTemplate(props) {
    const [pathname, setPathName] = useState(window.location.pathname)
    const [addcontrols, setAddControls] = useState(false)
    const [MultipleQuestion, setMultipleQuestion] = useState([])
    var [multiple, setMultiple] = useState([])
    const QuesObj={
        comp:<AddQuestions/>,
        index:0
    }
    function addcontrolsfunc() {        
        // multiple.push(QuesObj)
        // console.log("MultipleQuestion", multiple)
        const component_arr = [...MultipleQuestion,<AddQuestions/>]
        setMultipleQuestion(component_arr)
    }
    const deletecomp = (index) => {
        // const del=multiple
        // del.splice(index,1)
        // multiple=del
        // console.log("MultipleQuestion", multiple)
        let temp = [...MultipleQuestion]
        temp.splice(index,1)
        setMultipleQuestion(temp)
    }
   
    return (
        <div>
            <div className="AQTitle">Test Template</div>
            <div className="TTContainer">
                <Grid item xs={12} container direction="row" spacing={2}>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Template Name</div>
                        <Labelbox type="text"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Maximum Questions</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                    <Grid item xs={3} container direction="column">
                        <div className="TThead">Duration (In Mins)</div>
                        <Labelbox type="select"></Labelbox>
                    </Grid>
                </Grid>

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
                            <img src={PlusIcon} className="plusicon" onClick={addcontrolsfunc} />
                        </Grid>
                    </Grid>
                </div>


               
                {MultipleQuestion.map((data, index) =>{
                    return (
                    <div className="TTcategory" key={index}>
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
                                <img src={Delete} className="plusicon" onClick={() => deletecomp(index)} />
                            </Grid>
                        </Grid>
                    </div>
                )}
                )}
                <div id="TTbtns">
                    <Link to="/onlinetest"><CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={() => setPathName("/onlinetest")} /></Link>
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
                </div>
            </div>
        </div>
    )
}
export default TestTemplate;