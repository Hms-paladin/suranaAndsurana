import react, { useEffect, useState } from 'react';
import './leaveupdate.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';

const examDetails = [{ subject: "Human Rights", date: "12-Mar-2021" },
{ subject: "Environment Law", date: "13-Mar-2021" },
{ subject: "Property Law", date: "14-Mar-2021" },];

function LeaveApproval(props) {
    const [leaveModelTitle, setLeaveModelTitle] = useState()
    const [changebtn, setChangebtn] = useState(true)


    useEffect(() => {
        setLeaveModelTitle(props.modelTitles)
        setChangebtn(true)
    }, [props.modelTitles])


    const rejectbtn = () => {
        setChangebtn(false)
    }

    return (
        <div className="leaveContainer">
            <div className="leaveModelFields">
                <div>
                    <div>Employee Name</div>
                    <div className="fielddataView">Rajesh</div>
                </div>
                <div>
                    <div>Leave Type</div>
                    <div className="fielddataView">{leaveModelTitle}</div>
                </div>
                {leaveModelTitle === "CEP Approval" &&
                    <> <div>
                        <div>Referred by</div>
                        <div className="fielddataView">George</div>
                    </div>
                        <div>
                            <div>Professional Course</div>
                            <div className="fielddataView">Law</div>
                        </div></>}
            </div>
            <div className="leaveModelFields">
            { leaveModelTitle === "Permission" &&
                    <>
                        <div>
                            <div>Date</div>
                            <div className="fielddataView">13-mar-2021</div>
                        </div>
                        <div>
                            <div>From </div>
                            <div className="fielddataView">09:01 AM</div>
                        </div>
                        <div>
                            <div>To</div>
                            <div className="fielddataView">10:15 Am</div>
                        </div>

                    </>}
                {(leaveModelTitle === "Casual Leave" || leaveModelTitle === "On Duty") &&
                    <>
                        <div>
                            <div>From</div>
                            <div className="fielddataView">13-mar-2021</div>
                        </div>
                        <div>
                            <div>To </div>
                            <div className="fielddataView">14-mar-2021</div>
                        </div>
                        <div>
                            <div>Balance</div>
                            <div className="fielddataView">5</div>
                        </div>

                    </>}
                {leaveModelTitle === "CEP Approval" && <> <div>
                    <div>Total No. of Days</div>
                    <div className="fielddataView">1</div>
                </div>
                    <div>
                        <div>No. of Exam days </div>
                        <div className="fielddataView">3</div>
                    </div>
                    <div>
                        <div>No. of Other Days</div>
                        <div className="fielddataView">23</div>
                    </div>
                </>}
            </div>
            <div className="leaveModelFields">
                {(leaveModelTitle === "Casual Leave" || leaveModelTitle === "On Duty") &&
                    <>
                        <div>
                            <div>Client</div>
                            <div className="fielddataView">Paladin</div>
                        </div>
                        <div>
                            <div>Assigned by </div>
                            <div className="fielddataView">14-mar-2021</div>
                        </div>


                    </>}
            </div>
            <div>
                {(leaveModelTitle === "Casual Leave" || leaveModelTitle === "On Duty" || leaveModelTitle === "Permission") && <>
                    <div className="otherLeaves">
                        <div>Reason for Leave</div>
                        <div className="fielddataView">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit est pretium, tristique sed diam. In donec turpis laoreet neque ornare massa commodo. </div></div>
                </>}
            </div>
            <div className="middleContent">

                {leaveModelTitle === "CEP Approval" &&
                    <><div>
                        <div>Assignment Description</div>
                        <div className="fielddataView">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit est pretium, tristique sed diam. </div><br />
                        <div>Remarks</div>
                        <div className="fielddataView">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit est pretium.</div>
                    </div>
                        <div className="examInfobox">
                            <div className="subjectDetailsbox">
                                <div className="subjectDetails">
                                    <div>Subject</div>
                                    <div>Date</div>
                                </div>
                                <div>
                                    {examDetails.map((data) => {
                                        return (
                                            <div className="subjectDate">
                                                <div>{data.subject}</div>
                                                <div>{data.date}</div>
                                            </div>

                                        )
                                    })}
                                </div>

                            </div>
                            <div className="btnAlign">
                                <CustomButton btnName={"Download Hall Ticket"} btnCustomColor="customPrimary" custombtnCSS="customBtndwn" />
                            </div>
                        </div>
                    </>}
            </div>
            {changebtn ? <></>
                :
                <div className="rejectLeaveReasonBox">
                    <div>Reason for Reject</div>
                    <div className="reasonscmt">
                        <Labelbox type="textarea"
                        // changeData={(data) =>
                        //     checkValidation(data, "comment")
                        // }
                        // value={Appraisal.comment.value}
                        // error={Appraisal.comment.error}
                        // errmsg={Appraisal.comment.errmsg}
                        />
                    </div>

                </div>}
            <div className="appraisalBtn">
                <CustomButton btnName={"Reject"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={rejectbtn} />
                {changebtn && <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="custom_save" />}
            </div>
        </div >
    )
}

export default LeaveApproval;