import React, { useState, useEffect } from 'react'
import Back from '../../images/Vector.svg'
import './InterviewApprover.scss'
import EnhancedTable from "../../component/DynTable/table";
import { Grid } from "@material-ui/core";
import { Select,Input} from 'antd';
import { useDispatch, connect} from "react-redux";
import { apiurl } from '../../utils/baseUrl'
import SelectionIcon from '../../images/select.svg'
import Axios from 'axios';
import CustomButton from '../../component/Butttons/button';
import ValidationLibrary from "../../helpers/validationfunction";
import Labelbox from "../../helpers/labelbox/labelbox";
// import { InsertApprove } from "../../actions/InterviewApproveraction";


export default function InterviewApprover() {
    const { Option } = Select;

    const rows = [
        { date: '11-Jan-2020', score: 45, cmts: "Comments about the candiates", viewer: "Ranjith" },
        { date: '11-Jan-2020', score: 45, cmts: "Comments about the candiates", viewer: "Ranjith" },
        { date: '11-Jan-2020', score: 45, cmts: "Comments about the candiates", viewer: "Ranjith" },

    ];
    const Header = [
        { label: 'Date' }, { label: 'Initial Score' }, { label: 'Comments' }, { label: 'Interviewer' }
    ];

    const [modelOpen, setModelOpen] = useState(false)
    // approve form
    const [ApproveForm, setApproveForm] = useState({
        final_score:'',
        comment:'',
        status:''

    })
    //   interview dropdown api function

    const [optionvalues, setoptionvalues] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        let values = []
        Axios({
            method: "get",
            url: apiurl + "get_Interview_Status",
        }).then((response) => {
            console.log(response,"ss")
            let interview_status=[]
        response.data.data.map((data) =>
        interview_status.push({value: data.status }))
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
            
            // dispatch(InsertApprove(ApproveForm))
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
                <Labelbox type="select" placeholder="Designation"
                                dropdown={optionvalues.interview_status}
                                changeData={(data) => checkValidation(data, "status")}
                                value={ApproveForm.status.value}
                                error={ApproveForm.status.error}
                                errmsg={ApproveForm.status.errmsg}
                         /> 
                {/* <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Interview Status"
                    optionFilterProp="children" filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    className="SelectionInput" style={{ width: "40%" }}
                >
                    {interview_status.map((data, index) => (
                        <Option value={data.name} key={index}>{data.name}</Option>))}
                </Select> */}

            </Grid>
           
            <Grid item xs={12} spacing={1} container direction="row" justify="center" alignItems="center" className="interviewScore">
                <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
                    <Labelbox type="text"
                        placeholder={"Final Score"}
                        changeData={(data) => checkValidation(data,"final_score")}
                        value={ApproveForm.final_score.value}
                        error={ApproveForm.final_score.error}
                        errmsg={ApproveForm.final_score.errmsg}
                    />
                    <Input placeholder="Final Score" style={{ height: "70px", width: "60%" }} />
                </Grid>
                <Grid item xs={6} className="ContainerInput" container direction="row" justify="center">
                    <Labelbox  type="textarea"
                        placeholder={"Comment"}
                        changeData={(data) => checkValidation(data,"comment")}
                        value={ApproveForm.comment.value}
                        error={ApproveForm.comment.error}
                        errmsg={ApproveForm.comment.errmsg}
                    />
                </Grid>
                <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
                    <CustomButton  btnName={"Approve "} btnCustomColor="customPrimary" onBtnClick={Submit_approve}/>
                    <div className="interviewapprove">Approve</div>
                </Grid>
            </Grid>
                       
            {/* </DynModel> */}
        </div>
    )
}



// import React, { useState, useEffect } from 'react'
// import Back from '../../images/Vector.svg'
// import './InterviewApprover.scss'
// import EnhancedTable from "../../component/DynTable/table";
// import { Grid } from "@material-ui/core";
// import { Select } from 'antd';
// import { useDispatch, connect } from "react-redux";
// import { apiurl } from '../../utils/baseUrl'
// import SelectionIcon from '../../images/select.svg'
// import Axios from 'axios';
// import CustomButton from '../../component/Butttons/button';
// import ValidationLibrary from "../../helpers/validationfunction";
// import Labelbox from "../../helpers/labelbox/labelbox";
// import { InsertApprove } from "../../actions/InterviewApproveraction";


// export default function InterviewApprover() {
//     const { Option } = Select;

//     const rows = [
//         { date: '11-Jan-2020', score: 45, cmts: "Comments about the candiates", viewer: "Ranjith" },
//         { date: '11-Jan-2020', score: 45, cmts: "Comments about the candiates", viewer: "Ranjith" },
//         { date: '11-Jan-2020', score: 45, cmts: "Comments about the candiates", viewer: "Ranjith" },

//     ];
//     const Header = [
//         { label: 'Date' }, { label: 'Initial Score' }, { label: 'Comments' }, { label: 'Interviewer' }
//     ];

//     const [modelOpen, setModelOpen] = useState(false)
//     // approve form
  
//     //   interview dropdown api function

//     const [optionvalues, setoptionvalues] = useState({
        
//     });
//     const dispatch = useDispatch();
//     useEffect(() => {
//         let values = []
//         Axios({
//             method: "get",
//             url: apiurl + "get_Interview_Status",
//         }).then((response) => {
//             console.log(response,"ss")
//             let interview_status=[]
//         response.data.data.map((data) => 
//         interview_status.push({name: data.status }))
//         setoptionvalues({interview_status})

//         })
//     }, [dispatch])

    

    
//     return (
//         <div className="interviewapprove_root">
//             {/* <DynModel modelTitle={"Interview Approver"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} contents={<div>sdfghjkl</div>}> */}
//             <div><img src={Back} style={{ width: "30px" }} /></div>
//             <div className="interview_head">

//                 <div><label>Interview Id:3</label></div>
//                 <div><label>Designation:Attorney</label></div>
//             </div>
//             <EnhancedTable headCells={Header} rows={rows} />
//             <Grid item xs={12} container direction="row" justify="center" alignItems="center" className="interviewstatus" >
//                 <Labelbox type="select" placeholder="Designation"
//                                 dropdown={optionvalues.interview_status}
//                                 // changeData={(data) => checkValidation(data, "desgination")}
//                                 // value={EmpForm.desgination.value}
//                                 // error={EmpForm.desgination.error}
//                                 // errmsg={EmpForm.desgination.errmsg}
//                          /> 
//                 {/* <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Interview Status"
//                     optionFilterProp="children" filterOption={(input, option) =>
//                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                     }
//                     className="SelectionInput" style={{ width: "40%" }}
//                 >
//                     {interview_status.map((data, index) => (
//                         <Option value={data.name} key={index}>{data.name}</Option>))}
//                 </Select> */}

//             </Grid>
           
//             <Grid item xs={12} spacing={1} container direction="row" justify="center" alignItems="center" className="interviewScore">
//                 <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
//                     <Labelbox type="text"
//                         placeholder={"Final Score"}
                    
//                     />
//                 </Grid>
//                 <Grid item xs={6} className="ContainerInput" container direction="row" justify="center">
//                     <Labelbox  type="textarea"
//                         placeholder={"Comment"}
                   
//                     />
//                 </Grid>
//                 <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
//                     <CustomButton  btnName={"Approve "} btnCustomColor="customPrimary" />
//                 </Grid>
//             </Grid>
                       
//             {/* </DynModel> */}
//         </div>
//     )
// }
