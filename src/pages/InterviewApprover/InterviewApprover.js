import React, { useState, useEffect } from 'react'
import Back from '../../images/Vector.svg'
import './InterviewApprover.scss'
import EnhancedTable from "../../component/DynTable/table";
import { Grid } from "@material-ui/core";
import { Select } from 'antd';
import { useDispatch, connect } from "react-redux";
import { apiurl } from '../../utils/baseUrl'
import SelectionIcon from '../../images/select.svg'
import Axios from 'axios';
import CustomButton from '../../component/Butttons/button';
import ValidationLibrary from "../../helpers/validationfunction";
import Labelbox from "../../helpers/labelbox/labelbox";
import { InsertApprove, interviewApproverTableData } from "../../actions/InterviewApproveraction";
import logo from "../../images/Approvelogo.png"
import moment from "moment";
import { Button } from "@material-ui/core";
    const { Option } = Select;




function InterviewApprover(props) {

    // const rows = [
    //     { date: '11-Jan-2020', score: 45, cmts: "Comments about the candiates", viewer: "Ranjith" },
    //     { date: '11-Jan-2020', score: 45, cmts: "Comments about the candiates", viewer: "Ranjith" },
    //     { date: '11-Jan-2020', score: 45, cmts: "Comments about the candiates", viewer: "Ranjith" },

    // ];
    const Header = [
        { label: 'Date' }, { label: 'Initial Score' }, { label: 'Comments' }, { label: 'Interviewer' }
    ];

    const [modelOpen, setModelOpen] = useState(false)
    const [ rows, setRows ] = useState([])

    // approve form
    const [ApproveForm, setApproveForm] = useState({
        final_score: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        comment: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        init_status: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
    })
    //   interview dropdown api function

    const [optionvalues, setoptionvalues] = useState({
        
    });
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(interviewApproverTableData())
    },[])

    useEffect(()=>{

        let interviewList = []

        props.interviewData.map((data)=>{
            interviewList.push({ date: data.Date ? moment(data.Date).format('DD-MMM-YYYY') : null, score: data.score_inital, cmts: data.comment, viewer: data.designation })
        })
        setRows(interviewList)

    },[props.interviewData])


    useEffect(() => {
        let values = []
        Axios({
            method: "get",
            url: apiurl + "get_Interview_Status",
        }).then((response) => {
            console.log(response,"ss")
            let interview_status=[]
        response.data.data.map((data,index) => 
        interview_status.push({value: data.status, id: data.status_id}))
        setoptionvalues({interview_status})

        })
    }, [dispatch])

    function checkValidation(data, key) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            ApproveForm[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: ApproveForm[key].validation
        }

        setApproveForm(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    };


    //  insert approve
    function Submit_approve(){
        var mainvalue = {};
        var targetkeys = Object.keys(ApproveForm);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                ApproveForm[targetkeys[i]].value,
                ApproveForm[targetkeys[i]].validation
            );
            ApproveForm[targetkeys[i]].error = !errorcheck.state;
            ApproveForm[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = ApproveForm[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => ApproveForm[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setResumeFrom({ error: true });
        } else {
            // setResumeFrom({ error: false });
            
            dispatch(InsertApprove(ApproveForm))
        }

        setApproveForm(prevState => ({
            ...prevState
        }));

    }

    
    return (
        
        <div className="interviewapprove_root">
            {/* <DynModel modelTitle={"Interview Approver"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} contents={<div>sdfghjkl</div>}> */}
            <div><img src={Back} style={{ width: "30px" }} /></div>
            <div className="interview_head">

                <div><label>Interview Id:3</label></div>
                <div><label>Designation:Attorney</label></div>
            </div>
            <EnhancedTable headCells={Header} rows={rows} />
            <Grid item xs={12} container direction="row" justify="center" alignItems="center" className="interviewstatus" >
                <div className="interviewstats_drop">
                <Labelbox type="select"
                        placeholder="Interview Status"
                                dropdown={optionvalues.interview_status}
                                changeData={(data) => checkValidation(data, "init_status")}
                                value={ApproveForm.init_status.value}
                                error={ApproveForm.init_status.error}
                                errmsg={ApproveForm.init_status.errmsg}
                         /> 
         </div>
            </Grid>
           
            <Grid item xs={12} spacing={1} container direction="row" justify="center"  className="interviewScore">
                <Grid item xs={3} className="ContainerInput input_change" container direction="row" justify="center"  >
                    <Labelbox type="text"
                        placeholder={"Final Score"}
                        changeData={(data) => checkValidation(data,"final_score")}
                        value={ApproveForm.final_score.value}
                        error={ApproveForm.final_score.error}
                        errmsg={ApproveForm.final_score.errmsg}
                    />
                </Grid>
                <Grid item xs={6} className="ContainerInput textarea_height" container direction="row" justify="center"  >
                    <Labelbox  type="textarea" rows={"100"}        
                        placeholder={"Comment"}
                        changeData={(data) => checkValidation(data,"comment")}
                        value={ApproveForm.comment.value}
                        error={ApproveForm.comment.error}
                        errmsg={ApproveForm.comment.errmsg}
                    />
                </Grid>
                <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
                    <Button  className="submit_approve" onClick={Submit_approve}>
                               <img src={logo}/>
                    </Button>
                </Grid>
            </Grid>
                       
            {/* </DynModel> */}
        </div>
    )
}


const mapStateToProps = state => ({
    interviewData:state.interviewApproverTableData
})


export default connect(mapStateToProps)(InterviewApprover);















