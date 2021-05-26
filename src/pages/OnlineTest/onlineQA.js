import React, { useEffect, useState } from 'react'
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


function OnlineQA(props) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
    const no_of_questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const [pathname, setPathName] = useState(window.location.pathname)
    const [countdown, setCountdown] = useState()
    const [Hours, setHours] = useState()
    const [templateRowdata, setTemplateRowdata] = useState([])

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    // const [timestart, setTimestart] = useState({
    //     isActive: false,
    //     secondsElapsed: 1800000 / 1000
    // })
    let { starttime } = useParams()

    useEffect(() => {
        dispatch(GettemplateQuetions(starttime))
    }, [])

    useEffect(() => {
        setTemplateRowdata(props.GettemplateQuetions)
    }, [props.GettemplateQuetions])

    useEffect(() => {
        if (starttime) {
            const interval = setInterval(() => {
                console.log('This will run every second!');
                startTimer()
            }, 1000);
            // return () => clearInterval(interval);

        }
    }, []);


    function startTimer() {
        var h = moment().add(0, 0, 'hours', 'minutes').format('hh:mm A');
        setHours(h);
    }


    // useEffect(() => {
    //     let test = setInterval(startTimer, 1000)

    // }, [])
    console.log(Hours, "Hours")



    // function getHours() {
    //     return ("0" + Math.floor(timestart.secondsElapsed / 3600)).slice(-2);
    // }

    // function getMinutes() {
    //     return ("0" + Math.floor((timestart.secondsElapsed % 3600) / 60)).slice(
    //         -2
    //     );
    // }

    // function getSeconds() {
    //     return ("0" + (timestart.secondsElapsed % 60)).slice(-2);
    // }

    // function startTime() {
    //     setTimestart({ isActive: true });

    //     let countdowns = setInterval(() => {
    //         setTimestart({ secondsElapsed: timestart.secondsElapsed - 1 });
    //     }, 1000)

    //     setCountdown(countdowns)
    // }
    // console.log(countdown, "timestart")
    // console.log(timestart, "timestart")


    // function resetTime() {
    //     clearInterval(countdown);
    //     setTimestart({
    //         secondsElapsed: 1800000 / 1000,
    //         isActive: false
    //     });
    // };

    // function pauseTime() {
    //     clearInterval(countdown);
    //     setTimestart({ isActive: false });
    // };


    return (
        <div>
            <div className="AQTitle">Online Test</div>
            <div className="online_qa">
                <div className="QAPanel">
                    <div className="QAContainer">
                        <div id="QAcount">Q.2 | Question 2 of 8</div>
                        <div id="QAduration">
                            {Hours}
                            {/* <div>{getHours}</div>
                            <div>{getMinutes}</div>
                            <div>{getSeconds}</div> */}
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