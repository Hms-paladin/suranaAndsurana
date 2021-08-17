import React, { useEffect, useState } from 'react'
import './RecruitmentModal.scss'
import CustomButton from '../../component/Butttons/button';
import Grid from '@material-ui/core/Grid';
import { useDispatch, connect } from "react-redux";
import { getRecruitmentTicket, updateTicketStatus } from '../../actions/TicketCreationAction';
import Moment from 'moment';
import DynModel from "../../component/Model/model";

function RecruitmentModal(props) {
    const dispatch = useDispatch();
    const [ticket_id, setticket_id] = useState();
    const [recruitmentData, setRecruitmentData] = useState({});
    const [process, setProcess] = useState(false);
    const [ticketConfirmationModal, setTicketConfirmationModal] = useState(false);

    useEffect(() => {
        dispatch(getRecruitmentTicket(props.ticket_id))
        setticket_id(props.ticket_id)
    }, [props.ticket_id])

    useEffect(() => {
        let dept_id = localStorage.getItem("department_id")
        setRecruitmentData(props.getRecruitmentTicket)
        console.log(props.recruitmentDa.assigned_by, props.recruitmentDa.assignee_id, "props.recruitmentData")
        if ((props.recruitmentDa.assigned_by === props.recruitmentDa.assignee_id)) {
            setProcess(true)
        }
        else if (dept_id == "\"6\"") {
            setProcess(true)
        }
        else {
            setProcess(false)
        }
    }, [props.getRecruitmentTicket, props.recruitmentDa])


    const closeRecruitmant = () => {
        dispatch(updateTicketStatus(ticket_id)).then((response) => {
            props.closemodal()
        })
        setTicketConfirmationModal(false)
    }

    const cancelRecruitmant = () => {
        setTicketConfirmationModal(false)
    }



    return (
        <div>
            {console.log(localStorage.getItem("department_id"), "id dept")}
            {recruitmentData.length > 0 && recruitmentData.map((data) => {
                return (
                    <Grid container spacing={2} style={{ width: "100%" }}>
                        <Grid item xs={12} container direction="row" alignItems="center" spacing={2} className="fst_item_grid_rec">
                            <div>
                                <div >No.of Positions</div>
                                <div>{data.number_of_position}</div>
                            </div>
                            <div><div>Required by</div><div>{Moment(data.required_by).format('DD-MMM-yyyy')}</div></div>
                            <div><div>Requirement Location</div><div>{data.location ? data.location : " --- "}</div></div>
                        </Grid>
                        <Grid item xs={12} container direction="row" alignItems="center" spacing={2} className="snd_item_grid_rec">
                            <div><div>Department</div><div>{data.department}</div></div>
                            <div><div>Designation</div><div>{data.designation}</div></div>
                            <div><div>Qualification</div><div>{data.qual_name}</div></div>
                            <div><div>Age Limit</div><div>{data.age_limit}</div></div>

                            <div><div>State </div><div>{data.state}</div></div>

                        </Grid>
                        <Grid item xs={12} container direction="row" alignItems="center" spacing={2} >
                            <Grid item xs={4} className="third_item_grid_rec">
                                <div><div>Skills</div><div>{data.skill_name}</div></div>
                                <div><div>Certification</div><div>{data.certification}</div></div>
                                <div><div>Capabilites</div><div>{data.capability}</div></div>

                            </Grid>
                            <Grid item xs={4} className="third_item_grid_rec">
                                <div><div>Traits</div><div>{data.traits}</div></div>
                                <div><div>Specialization</div><div>{data.specilization}</div></div>
                                <div><div>Talents </div><div>{data.talent}</div></div>
                            </Grid>
                            <Grid item xs={4} className="third_item_grid_rec">
                                <div><div>Languages Known</div><div>{data.language}</div></div>
                                <div><div>Experience</div><div>{data.experience}</div></div>
                                <div><div>Remarks</div><div>{data.remarks ? data.remarks : " --- "}</div></div>
                            </Grid>
                        </Grid>
                    </Grid>


                )
            })}


            {process ?
                <div className="status_div_close">
                    <div className="status_inner_div"><label>Status :</label><label>Progress</label></div>
                </div>
                :
                <>
                    <div className="btn_div_close">
                        <CustomButton btnName={"Requirement Completed"} btnCustomColor="customPrimary" custombtnCSS="custom_close_re" onBtnClick={(bln) => setTicketConfirmationModal(bln)} />
                    </div>
                    <DynModel modelTitle={"REQUIREMENT REQUEST"} handleChangeModel={ticketConfirmationModal} handleChangeCloseModel={(bln) => setTicketConfirmationModal(bln)} content={
                        <div className="deleteBtn">
                            <div>Are you sure want to Close this Ticket?</div>
                            <div>
                                <CustomButton btnName={"Cancel"} custombtnCSS="custom_cancel" onBtnClick={cancelRecruitmant} />
                                <CustomButton btnName={"Ok"} custombtnCSS="custom_cancel" btnCustomColor="customPrimary" onBtnClick={closeRecruitmant} />
                            </div>
                        </div>}
                    />
                </>

            }
        </div>
    )
}
const mapStateToProps = (state) => ({

    getRecruitmentTicket: state.TicketCreationReducer.getRecruitmentTicket || [],
    updateTicketStatus: state.TicketCreationReducer.updateTicketStatus || [],


});

export default connect(mapStateToProps)(RecruitmentModal);

