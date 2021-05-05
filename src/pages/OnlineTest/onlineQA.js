import React, { useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DynModel from "../../component/Model/model";
import { Redirect, Link } from "react-router-dom";
import InerviewScreen from '../Interview/interview';
import './onlinetest.scss'
function OnlineQA() {
    const [value, setValue] = React.useState('');
    const no_of_questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const [pathname, setPathName] = useState(window.location.pathname)
    // const[intermodal,setInterModal]=useState(false)
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div>
            <div className="AQTitle">Online Test</div>
            <div className="online_qa">
                <div className="QAPanel">
                    <div className="QAContainer">
                        <div id="QAcount">Q.2 | Question 2 of 8</div>
                        <div id="QAduration">11 : 50 Mins</div>
                    </div>
                    <div id="Question">What is Felonies ?</div>
                    <div className="options">
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                <FormControlLabel value="female" control={<Radio />} label="A crime regarded in the US and many other judicial systems as more serious than a misdemeanour." />
                                <FormControlLabel value="male" control={<Radio />} label="Not a Crime" />
                                <FormControlLabel value="other" control={<Radio />} label="Not an illegal Act" />
                                {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div id="TTbtns">
                        <CustomButton btnName={"Previous"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                        <CustomButton btnName={"Save & Exit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                    </div>
                    <div className="QAStatusPane"></div>
                </div>
                <div className="question_traverse">
                    <div className="question_flows">
                        {no_of_questions.map(noq => <div>{noq}</div>)}
                    </div>
                    <div className="color_initmation">
                        <div className="color_circles">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div id="_vis">
                            <div>Visited</div>
                            <div>Not Answered</div>
                            <div>Not Visited</div>
                        </div>
                    </div>
                    <div id="answer_btns">
                    <CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick="" />
                    {/* <Link to="/interview"><CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={()=>setPathName("/interview")} /></Link> */}
                    <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OnlineQA;