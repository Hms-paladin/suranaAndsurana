import React, { useEffect, useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import './onlinetest.scss';
import { GettemplateQuetions } from '../../actions/OnlineTestAction';



function InstructionModal(props) {
    const dispatch = useDispatch();
    const [pathnameQA, setpathnameQA] = useState(window.location.pathname)
    const [templateRowdata, setTemplateRowdata] = useState([])
    const [testTemplateId, setTestTemplateId] = useState()
    const [designation, setDesignation] = useState()
    const [candidate, setCandidate] = useState()

    useEffect(() => {
        dispatch(GettemplateQuetions(props.test_data.temp_name.value))
        setTestTemplateId(props.test_data.temp_name.value)
        setDesignation(props.test_data.designation.value)
        setCandidate(props.test_data.candidate.value)
        // props.handle_hancel()
    }, [props.test_data])

    useEffect(() => {
        setTemplateRowdata(props.GettemplateQuetions)
    }, [props.GettemplateQuetions])
console.log(props.test_data,"temp_nametest_data")
    return (
        <div>
            <div className="Instruction_Modal_Container">
                <div id="steps">Steps For Accessing Your Exam Online</div>
                <ul>
                    <li>Close All Programs,Inlcuding Email</li>
                    <li>Click On The Click Here To Open The Exam Link Provided In The Email From The College</li>
                    <li>Click 'Login For Your Exam Here' At The Bottom of Screen</li>
                    <li>Have your proctor enter the Username and password provided in the mail from The College and click enter</li>
                    <li>To begin the exam,click on the link to the appropriate exam listed under Online Assessments</li>
                    <li>Before starting the exam:</li>
                    <li>Please verify that the student's last name appears correctly within the User ID box.</li>
                </ul>
                <div id="testinfo">Test Information</div>

                {templateRowdata && templateRowdata.map((val) => {
                    return (
                        <div>
                            <div className="showcontainer">
                                <div>Name Of The Test</div>
                                <div>Duration Of Test</div>
                                <div>No. Of Questions</div>
                            </div>
                            <div className="showcontainer spl">
                                <div>Online Test</div>
                                <div>{val.Duration + "  minutes"}</div>
                                <div>{val.MaximumQuestions}</div>
                            </div>
                        </div>
                    )
                })}

                <div>
                    <Link to={`/onlineQA/${designation}/${candidate}/${testTemplateId}`}>
                        <CustomButton btnName={"Start Test"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary"  />
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
    console.log(state, "checkscheckstatetates"),
    {
        GettemplateQuetions: state.OnlineTest.GettemplateQuetions || []


    }
);

export default connect(mapStateToProps)(InstructionModal);