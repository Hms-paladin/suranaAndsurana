import React, { useState } from 'react'
import CustomButton from "../../component/Butttons/button";
import { Redirect, Link } from "react-router-dom";
import './onlinetest.scss'
function InstructionModal() {
    const [pathnameQA,setpathnameQA]=useState(window.location.pathname)
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
                <div>
                    <div className="showcontainer">
                        <div>Name Of The Test</div>
                        <div>Duration Of Test</div>
                        <div>No. Of Questions</div>
                    </div>
                    <div className="showcontainer spl">
                        <div>Online Test</div>
                        <div>15 Mins</div>
                        <div>8</div>
                    </div>
                </div>
                <div>
                    <Link to="/onlineQA">
                    <CustomButton btnName={"Start Test"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary"  onBtnClick={()=>setpathnameQA("/onlineQA")} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default InstructionModal;