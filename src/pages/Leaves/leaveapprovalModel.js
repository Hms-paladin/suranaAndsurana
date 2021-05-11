import react, { useEffect, useState } from 'react';
import './leaveupdate.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../component/Butttons/button';
import {connect,useDispatch} from 'react-redux'
import moment from "moment";
import {getEmpApproval,EmployeeLeaveApprove} from '../../actions/LeaveFormAction'
const examDetails = [{ subject: "Human Rights", date: "12-Mar-2021" },
{ subject: "Environment Law", date: "13-Mar-2021" },
{ subject: "Property Law", date: "14-Mar-2021" },];

function LeaveApproval(props) {
    const [leaveModelTitle, setLeaveModelTitle] = useState()
    const [changebtn, setChangebtn] = useState(true)
    const [ApprovalData,setApprovalData]=useState(true)
    const [Leave_status,setLeave_status]=useState(false)

    let dispatch=useDispatch()
    useEffect(() => {
        dispatch(getEmpApproval(props.LeaveData))
        // setLeaveModelTitle(props.modelTitles)
        setChangebtn(true)
    }, [props.LeaveData])
   
    useEffect(() => {
        let Approvaldata=[]
        props.getLeaveApproval.map((data)=>
          {
            Approvaldata.push({
                empname:data.name===null?"-":data.name,
                leavetype:data.leave_type,
                from:moment(data.from_date).format("DD-MMM-YYYY"),to:moment(data.to_date).format("DD-MMM-YYYY"),
                balance:data.current_balance===null?"-":data.current_balance,
                leavereason:data.leave_reason===null?"-":data.leave_reason,
                remarks:data.remarks===null?"-":data.remarks,
                empId:data.emp_leave_id,
                assginedby:data.assigned_by===null?"-":data.assigned_by,
                professionalcourse:data.professional_course===null?"-":data.professional_course,
                subject:data.subject===null?"-":data.subject,
                subjectdate:moment(data.subject_date===null?"-":data.subject_date).format("DD-MMM-YYYY"),
                leave_typeId:data.leave_type_id,
                client:data.client===null?"-":data.client,
                fromtime:data.from_time===null?"-":data.from_time,
                totime:data.to_time===null?"-":data.to_time,
                noofdaysleave:data.total_days_leave===null?"-":data.total_days_leave,
                examdays:data.no_exam_days==null?"-":data.no_exam_days,
                otherdays:data.no_other_days===null?"-":data.no_other_days,
            })
          }
        )
        setApprovalData(Approvaldata)
    },[props.getLeaveApproval])

    const rejectbtn = () => {
        setChangebtn(false)
    }
    const EmployeeApprove = (data) => {

        if (data === "approve") {
            setLeave_status(true)
        }
        if (data === "reject") {
            setLeave_status(false)
        }

        dispatch(EmployeeLeaveApprove(Leave_status,props.getLeaveApproval[0]&&props.getLeaveApproval[0].emp_leave_id,props.getLeaveApproval[0]&&props.getLeaveApproval[0].approve_status)).then((response) => {
            props.closemodal()
        })
    //     setLeave_status(prevState =>({
    //   ...prevState,
    //     }))
    
    }
   console.log("propsid",props.LeaveData)    
    return (
        <div className="leaveContainer">
            <div className="leaveModelFields">
                <div>
                    <div>Employee Name</div>
                    <div className="fielddataView">{ApprovalData[0]?ApprovalData[0].empname:"-"}</div>
                </div>
                <div>
                    <div>Leave Type</div>
                    <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].leavetype}</div>
                </div>
                {ApprovalData[0]&&ApprovalData[0].leave_typeId === 40 &&
                    <> <div>
                        <div>Referred by</div>
                        <div className="fielddataView">-</div>
                    </div>
                        <div>
                            <div>Professional Course</div>
                            <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].professionalcourse}</div>
                        </div></>}
            </div>
            <div className="leaveModelFields">
            { ApprovalData[0]&&ApprovalData[0].leave_typeId === 38 &&
                    <>
                        <div>
                            <div>Date</div>
                            <div className="fielddataView">-</div>
                        </div>
                        <div>
                            <div>From </div>
                            <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].fromtime}</div>
                        </div>
                        <div>
                            <div>To</div>
                            <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].totime}</div>
                        </div>

                    </>}
                {(ApprovalData[0]&&ApprovalData[0].leave_typeId === 35  || ApprovalData[0]&&ApprovalData[0].leave_typeId === 39 ||
                ApprovalData[0]&&ApprovalData[0].leave_typeId === 36 || ApprovalData[0]&&ApprovalData[0].leave_typeId === 37) &&
                    <>
                        <div>
                            <div>From</div>
                            <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].from}</div>
                        </div>
                        <div>
                            <div>To </div>
                            <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].to}</div>
                        </div>
                        <div>
                            <div>Balance</div>
                            <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].balance}</div>
                        </div>

                    </>}
                {ApprovalData[0]&&ApprovalData[0].leave_typeId === 40 && <> <div>
                    <div>Total No. of Days</div>
                    <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].noofdaysleave}</div>
                </div>
                    <div>
                        <div>No. of Exam days </div>
                        <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].examdays}</div>
                    </div>
                    <div>
                        <div>No. of Other Days</div>
                        <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].otherdays}</div>
                    </div>
                </>}
            </div>
            <div className="leaveModelFields">
                {(ApprovalData[0]&&ApprovalData[0].leave_typeId === 35  || ApprovalData[0]&&ApprovalData[0].leave_typeId === 39 ||
                ApprovalData[0]&&ApprovalData[0].leave_typeId === 36 || ApprovalData[0]&&ApprovalData[0].leave_typeId === 37) &&
                    <>
                        <div>
                            <div>Client</div>
                            <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].client}</div>
                        </div>
                        <div>
                            <div>Assigned by </div>
                            <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].assginedby}</div>
                        </div>


                    </>}
            </div>
            <div>
                {(ApprovalData[0]&&ApprovalData[0].leave_typeId === 35  || ApprovalData[0]&&ApprovalData[0].leave_typeId === 39 || 
                    ApprovalData[0]&&ApprovalData[0].leave_typeId === 38 || ApprovalData[0]&&ApprovalData[0].leave_typeId === 36 ||
                    ApprovalData[0]&&ApprovalData[0].leave_typeId === 37) && <>
                    <div className="otherLeaves">
                        <div>Reason for Leave</div>
                        <div className="fielddataView">{ApprovalData[0]?ApprovalData[0].leavereason:"-"}</div></div>
                </>}
            </div>
            <div className="middleContent">

                {ApprovalData[0]&&ApprovalData[0].leave_typeId === 40 &&
                    <><div>
                        <div>Assignment Description</div>
                        <div className="fielddataView">-</div><br />
                        <div>Remarks</div>
                        <div className="fielddataView">{ApprovalData[0]&&ApprovalData[0].remarks}</div>
                    </div>
                        <div className="examInfobox">
                            <div className="subjectDetailsbox">
                                <div className="subjectDetails">
                                    <div>Subject</div>
                                    <div>Date</div>
                                </div>
                                <div>
                                     {props.getLeaveApproval[0]&&props.getLeaveApproval[0].subject_details.map((data) => {
                                        return (
                                            <div className="subjectDate">
                                                <div>{data.subject}</div>
                                                <div>{moment(data.subject_date).format("DD-MMM-YYYY")}</div>
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
            {changebtn===false?<CustomButton btnName={"Reject"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={(data)=>EmployeeApprove(data,"reject")}/>:
                <CustomButton btnName={"Reject"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={rejectbtn} />}
                {changebtn && <CustomButton btnName={"Approve"} btnCustomColor="customPrimary" custombtnCSS="custom_save" onBtnClick={(data)=>EmployeeApprove(data,"approve")}/>}
            </div>
        </div >
    )
}
const mapStateToProps = (state) =>
({
    getLeaveApproval: state.LeaveFormReducer.getLeaveApproval,
});
export default connect(mapStateToProps) (LeaveApproval);