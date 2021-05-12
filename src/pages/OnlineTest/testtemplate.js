import React, { useState,useEffect} from 'react'
import CustomButton from "../../component/Butttons/button";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import PlusIcon from "../../images/plusIcon.svg";
import { Redirect, Link } from "react-router-dom";
import Delete from '../../images/dashboard/delete.svg';
import './onlinetest.scss'
function TestTemplate(props) {
    const [pathname, setPathName] = useState(window.location.pathname)
    const [MultipleQuestion, setMultipleQuestion] = useState([])
    const [count,setCount]=useState(0)
    // function addcontrolsfunc() {    
    //     setCount(count+1)    
    //     const component_arr = [...MultipleQuestion,<AddQuestions/>]
    //     setMultipleQuestion(component_arr)
    //     console.log("MultipleQuestion", MultipleQuestion)
    // }
    useEffect(() => {        
        if(count>0){
        setMultipleQuestion([...MultipleQuestion,{index:count}])
        console.log("MultipleQuestion", MultipleQuestion)}
    }, [count])
    const deletecomp = (index) => {
        const temp=[...MultipleQuestion]
        temp.splice(index,1)
        setMultipleQuestion(temp)
        console.log("MultipleQuestion", MultipleQuestion)
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
                            <img src={PlusIcon} className="plusicon" onClick={()=>setCount(count+1)} />
                        </Grid>
                    </Grid>
                </div>
               
                {MultipleQuestion.length>0 && MultipleQuestion.map((data,index) =>{
                    return (
                        <div className="TTcategory" key={data.index}>
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
                                <img src={Delete} className="plusicon" onClick={()=>deletecomp(index)}/>
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