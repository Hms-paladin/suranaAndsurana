import React, { useCallback, useEffect, useState, useRef } from 'react'
import CustomButton from "../../component/Butttons/button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DynModel from "../../component/Model/model";
import { Redirect, Link } from "react-router-dom";
import InerviewScreen from '../Interview/interview';
import './onlinetest.scss'
import moment from 'moment';
import { useParams } from "react-router-dom";
import { GettemplateQuetions } from '../../actions/OnlineTestAction';
import { useDispatch, connect } from "react-redux";
import { SettingsBackupRestore } from '@material-ui/icons';

function OnlineQA(props) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const no_of_questions = ["apple", "orange", "mango"];
    // const [pathname, setPathName] = useState(window.location.pathname)
    const [text, setText] = useState()
    const [ques_no, setQues_no] = useState()
    const [btnchange, setBtnchange] = useState(false)
    const [increament, setIncreament] = useState(1)
    const runTime = useRef({
        runSec: 0, runMin: 0
    });
    const setCount = useRef({
        count: 0
    })



    const [templateRowdata, setTemplateRowdata] = useState([])

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    let { starttime } = useParams()

    useEffect(() => {
        dispatch(GettemplateQuetions(starttime))
    }, [])

    useEffect(() => {
        setCount.current.count = props.GettemplateQuetions[0]?.Duration
        setTemplateRowdata(props.GettemplateQuetions)
    }, [props.GettemplateQuetions])


    // templateRowdata
    useEffect(() => {

        let myInterval = setInterval(() => {
            console.log(props.GettemplateQuetions[0]?.Duration, setCount.current.count, runTime.current.runMin > props.GettemplateQuetions[0]?.Duration, "testQuestionDetails")

            if (runTime.current.runMin > setCount.current.count - 1) {
                clearInterval(myInterval);
                // runTime.current.runMin += 1
                // runTime.current.runSec = 0
                let digitmin = runTime.current.runMin < 10 ? "0" : ""
                let digitsec = runTime.current.runSec < 10 ? "0" : ""
                const timer = digitmin + runTime.current.runMin + ":" + digitsec + runTime.current.runSec

                setText(timer)
            }
            else {
                test1()
            }
        }, 1000)

    }, []);


    const test1 = useCallback(() => {
        let digitmin = runTime.current.runMin < 10 ? "0" : ""
        let digitsec = runTime.current.runSec < 10 ? "0" : ""
        const timer = digitmin + runTime.current.runMin + ":" + digitsec + runTime.current.runSec

        if (runTime.current.runSec < 59) {
            runTime.current.runSec += 1
        } else {
            runTime.current.runSec = 0
        }

        if (runTime.current.runSec === 0) {
            runTime.current.runMin += 1
        }

        setText(timer)

    }, [])


    // useEffect(() => {

    // }, [])

    const submitAnswer = () => {
        setBtnchange(true)
        let testvalue = no_of_questions[increament]
        setQues_no(testvalue)
        setIncreament(increament + 1)
    }


    // const mapingdata = () => {


    //     no_of_questions.map((data, index) => {
    //         // let testvalue = no_of_questions.find((val) => {
    //         console.log(data, "no_of_questions")

    //         // return (
    //         //     val == val.id
    //         // )
    //         // })
    //     })

    // }

    console.log(ques_no, "setQues_no")

    return (
        <div>
            <div className="AQTitle">Online Test</div>
            <div className="online_qa">
                <div className="QAPanel">
                    <div className="QAContainer">
                        <div id="QAcount">Q.2| Question 2 of {templateRowdata[0]?.testQuestionDetails.length}</div>
                        <div id="QAduration">
                            {text + " Mins"}
                        </div>
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
                        {btnchange &&
                            <CustomButton btnName={"Previous"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={test1} />

                        }
                        <CustomButton btnName={"Save "} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={() => submitAnswer()} />
                    </div>
                    <div className="QAStatusPane"></div>
                </div>
                <div className="question_traverse">
                    <div className="question_flows">
                        {no_of_questions.map(noq => <div>{noq.name}</div>)}
                    </div>
                    <div className="color_initmation">
                        <div className="color_circles">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div id="_vis">
                            <div>Visited</div>
                            <div>Answered</div>
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

const mapStateToProps = (state) => (
    {
        GettemplateQuetions: state.OnlineTest.GettemplateQuetions || []
    }
);

export default connect(mapStateToProps)(OnlineQA);