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
    const[addcontrols,setAddControls]=useState(false)
    const[MultipleQuestion,setMultipleQuestion]=useState([])
    const additionals={controls:[]};

    function addcontrolsfunc(){
        let multipleTab ={}
        multipleTab.questions=<AddQuestions/>
        setMultipleQuestion((prevState) => ([
            ...prevState,multipleTab["questions"]
        ]));
        // setMultipleQuestion(multipleTab)
        console.log("MultipleQuestion",MultipleQuestion)
    }
    function deletecontrolsfunc(){
        // var splice=MultipleQuestion.pop();
       var splice=MultipleQuestion.pop();
       console.log(splice,"splice")
       alert(splice)
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
                            {/* <img src={Delete} className="plusicon" onClick={deletecontrolsfunc} /> */}
                        </Grid>
                    </Grid>
                </div>
              <div>{MultipleQuestion}</div>
                <div id="TTbtns">
                <Link to="/onlinetest"><CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={()=>setPathName("/onlinetest")} /></Link>
                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
                </div>
            </div>
        </div>
    )
}
export default TestTemplate;