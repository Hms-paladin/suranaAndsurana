import React, { useCallback, useEffect, useState, useRef } from 'react'
import CustomButton from "../../component/Butttons/button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DynModel from "../../component/Model/model";
import { Redirect, Link, useHistory } from "react-router-dom";
import InerviewScreen from '../Interview/interview';
import './onlinetest.scss'
import moment from 'moment';
import { useParams } from "react-router-dom";
import { GettemplateQuetions, onlinetest } from '../../actions/OnlineTestAction';
import { useDispatch, connect } from "react-redux";
import { SettingsBackupRestore } from '@material-ui/icons';


function OnlineQA(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = React.useState('');
    const no_of_questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const [pathname, setPathName] = useState(window.location.pathname)
    const [text, setText] = useState()
    const [ques_no, setQues_no] = useState([])
    const [btnchange, setBtnchange] = useState(false)
    const [ques_length, setQues_length] = useState()
    const [questions, setQuestions] = useState([])
    const [submitData, setSubmitData] = useState([])
    const [increament, setIncreament] = useState(1)
    const [designationId, setDesignation] = useState()
    const [candidateId, setCandidate] = useState()

    const [exitOnlineTestModel, setExitOnlineTest] = useState(false);
    const [confirmmodel, setConfirmModel] = useState(false);

    const runTime = useRef({
        runSec: 60, runMin: 0
    });
    const setCount = useRef({
        count: 0
    })



    const [templateRowdata, setTemplateRowdata] = useState([])

    const handleChange = (event) => {
        setValue(event.target.value);
        questions[increament - 1].checked = event.target.value
        // console.log(event.target.value,"event.target.value")
    };


    let { testTemplateId, designation, candidate } = useParams()

    useEffect(() => {
        setDesignation(designation)
        setCandidate(candidate)
        dispatch(GettemplateQuetions(testTemplateId))
    }, [])

    useEffect(() => {
        // setCount.current.count = props.GettemplateQuetions[0]?.Duration
        runTime.current.runMin = props.GettemplateQuetions[0]?.Duration - 1 || 0
        setTemplateRowdata(props.GettemplateQuetions)
        setQuestions(props.GettemplateQuetions[0]?.testQuestionDetails)
        setQues_length(props.GettemplateQuetions[0]?.testQuestionDetails.length)

        if (props.GettemplateQuetions[0]?.testQuestionDetails.length > 0) {
            var updatelist = []
            for (var i = 0; i < props.GettemplateQuetions[0]?.testQuestionDetails.length; i++) {
                var listarray = {
                    testTempId: props.GettemplateQuetions[0].TestTempId,
                    quesId: props.GettemplateQuetions[0]?.testQuestionDetails[i].QuesId,
                    answer: ''
                }
                updatelist.push(listarray);
            }
            //  console.log(updatelist, "arrarrarrarrarrarr")
            setSubmitData(updatelist)
        }


    }, [props.GettemplateQuetions])

    // console.log(submitData, "templateRowdata")

    // templateRowdata
    useEffect(() => {
        let myInterval = setInterval(() => {
            // console.log(props.GettemplateQuetions[0]?.Duration, setCount.current.count, runTime.current.runMin > props.GettemplateQuetions[0]?.Duration, "testQuestionDetails")

            // console.log(runTime.current.runMin, setCount.current.count, runTime.current.runSec, "timing")

            if (runTime.current.runMin === setCount.current.count && runTime.current.runSec === 1) {

                clearInterval(myInterval);
                // runTime.current.runMin += 1
                // runTime.current.runSec = 0
                let digitmin = runTime.current.runMin < 10 ? "0" : ""
                let digitsec = runTime.current.runSec < 10 ? "0" : ""
                const timer = digitmin + runTime.current.runMin + ":" + digitsec + 0

                setText(timer)
                submitOnlineTest()
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

        if (runTime.current.runSec > 0) {
            console.log(runTime.current.runSec - 1, "time")
            runTime.current.runSec = runTime.current.runSec - 1
        } else {
            runTime.current.runSec = 0
        }

        if (runTime.current.runSec === 0) {
            runTime.current.runMin = runTime.current.runMin - 1
            if (runTime.current.runMin != props.GettemplateQuetions[0]?.Duration) {
                runTime.current.runSec = 59
            }
            if (runTime.current.runMin === 0) {
                runTime.current.runSec = 59
            }

        }

        setText(timer)

    }, [])

    // useEffect(() => {
    //     if (increament === ques_length) {

    //     }
    // }, [])

    const submitAnswer = useCallback(() => {
        if (increament <= ques_length) {
            setBtnchange(true)
            if (increament !== ques_length) {
                let testvalue = questions[increament]
                setQues_no(testvalue)
                setIncreament(increament + 1)
            }
            submitData[increament - 1].answer = questions[increament - 1].checked ? questions[increament - 1].checked : ''
            // no_of_questions.map((data) => {
            //     alert("tset")
            //     console.log(data, "datadatagdjsfjdk")
            // })

            console.log(questions[increament - 1], "datadatagdjsfjdk")
        }
        if (questions[increament - 1].checked)
            questions[increament - 1].visited = 'submited'
        else
            questions[increament - 1].visited = 'visited'


    })

    const submitOnlineTest = useCallback(() => {

        dispatch(onlinetest(designationId, candidateId, submitData)).then(() => {
            history.push("/onlinetest");
        })

    })

    const previousQuestion = useCallback(() => {

        setIncreament(increament - 1)

        // console.log(increament,"increamentincreament")

        var inc = increament - 2
        let testvalue = questions[inc]
        setQues_no(testvalue)
        console.log(testvalue, inc, "increament")

        if (questions[increament - 1].checked) {
            if (submitData[increament - 1].answer !== '')
                questions[increament - 1].visited = 'submited'
        }
        else
            questions[increament - 1].visited = 'visited'


    })


    //  console.log((increament === 1&&props.GettemplateQuetions[0]?.testQuestionDetails[0]?.Choice.split(','))||(ques_no.Choice?.split(',')), "increamentincreament")
    // console.log(submitData,"22222222222222222222")
    // console.log(questions&&questions.length>0&&questions[increament- 1].checked?questions[increament- 1].checked:'uncheck',"testttttt")
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

    var names = '';
    return (
        <div>
            <div className="AQTitle">Online Test</div>
            <div className="online_qa">
                <div className="QAPanel">
                    <div className="QAContainer">
                        <div id="QAcount">Q.{increament} | Question {increament} of {ques_length}</div>
                        <div id="QAduration">
                            {text === undefined ? "00:00 " : text} Mins
                        </div>
                    </div>

                    <div id="Question">{increament === 1 ? props.GettemplateQuetions[0]?.testQuestionDetails[0].Question : ques_no.Question}</div>
                    <div className="options">

                        {/* {console.log(ques_no,"ques_noques_noques_no")} */}
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" value={questions && questions.length > 0 && questions[increament - 1].checked ? questions[increament - 1].checked : 'uncheck'} onChange={handleChange}>

                                {(increament === 1 && props.GettemplateQuetions[0]?.testQuestionDetails[0]?.Choice || ques_no.Choice && ques_no.Choice || names).split(',').map((data) => {
                                    if (data === '') { return }
                                    return (
                                        <FormControlLabel value={data} unchecked control={<Radio />} label={data} />
                                    )
                                }
                                )}
                                {/* <FormControlLabel value={increament === 1 ?props.GettemplateQuetions[0]?.testQuestionDetails[0].Choice?.split(',')[0]:ques_no.Choice?.split(',')[0]} unchecked control={<Radio />} label={increament === 1 ?props.GettemplateQuetions[0]?.testQuestionDetails[0].Choice?.split(',')[0]:ques_no.Choice?.split(',')[0]} />
                                            <FormControlLabel value={increament === 1 ?props.GettemplateQuetions[0]?.testQuestionDetails[0].Choice?.split(',')[1]:ques_no.Choice?.split(',')[1]} unchecked control={<Radio />} label={increament === 1 ?props.GettemplateQuetions[0]?.testQuestionDetails[0].Choice?.split(',')[1]:ques_no.Choice?.split(',')[1]} />
                                            <FormControlLabel value={increament === 1 ?props.GettemplateQuetions[0]?.testQuestionDetails[0].Choice?.split(',')[2]:ques_no.Choice?.split(',')[2]} unchecked control={<Radio />} label={increament === 1 ?props.GettemplateQuetions[0]?.testQuestionDetails[0].Choice?.split(',')[2]:ques_no.Choice?.split(',')[2]} /> */}

                            </RadioGroup>
                        </FormControl>
                        {/* </>
                            )
                        })} */}



                    </div>

                    <div id="TTbtns">
                        {btnchange && increament !== 1 &&
                            <CustomButton btnName={"Previous"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={previousQuestion} />

                        }
                        <CustomButton btnName={"Save "} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={() => submitAnswer()} />
                    </div>
                    <div className="QAStatusPane"></div>
                </div>
                <div className="question_traverse">
                    <div className="question_flows">
                        {/* {console.log(props.GettemplateQuetions[0]?.testQuestionDetails,"hhhhhhhhhhhhhhhhhhhhhh")} */}
                        {props.GettemplateQuetions[0] && questions && questions.map((noq, index) =>
                            <div style={{ backgroundColor: noq.visited && noq.visited === "submited" ? '#14D756' : noq.visited === "visited" ? 'white' : '#D77E4D', color: noq.visited && noq.visited === "submited" ? 'white' : noq.visited === "visited" ? 'blue' : 'white' }} >{index + 1}</div>)}
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
                        <CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={() => setConfirmModel(true)} />
                        {/* <Link to="/interview"><CustomButton btnName={"Submit"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={()=>setPathName("/interview")} /></Link> */}
                        <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={() => setExitOnlineTest(true)} />
                    </div>
                </div>
            </div>



            <DynModel
                modelTitle={"Exit Online Test"}
                handleChangeModel={exitOnlineTestModel}
                handleChangeCloseModel={(bln) => setExitOnlineTest(bln)}
                content={
                    <div className="successModel">
                        <div>
                            {" "}
                            <label className="notfound_label">
                                Do You Really Want to Exit this Online Test?This Process cannot be undone
                            </label>
                        </div>
                        <div className="customNotFoundbtn">
                            <CustomButton btnName={"EXIT"} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={() => history.push('/onlinetest')} />
                            <CustomButton btnName={"CANCEL "} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={() => setExitOnlineTest(false)} />
                        </div>
                    </div>
                }
                width={500}
            />

            <DynModel
                modelTitle={"Confirm Online Test"}
                handleChangeModel={confirmmodel}
                handleChangeCloseModel={(bln) => setConfirmModel(bln)}
                content={
                    <div className="successModel">
                        <div>
                            {" "}
                            <label className="notfound_label">
                                Are You Confirm to Submit this Online Test ?
                            </label>
                        </div>
                        <div className="customNotFoundbtn">
                            <CustomButton btnName={"YES"} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={submitOnlineTest} />
                            <CustomButton btnName={"NO "} btnCustomColor="customPrimary" custombtnCSS={"btnNotFound"} onBtnClick={() => setConfirmModel(false)} />
                        </div>
                    </div>
                }
                width={500}
            />
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        GettemplateQuetions: state.OnlineTest.GettemplateQuetions || []
    }
);

export default connect(mapStateToProps)(OnlineQA);