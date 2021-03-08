// import React, {useState, useEffect } from "react";
// import { Grid } from "@material-ui/core";
// import './interview.scss'
// import Eyes from '../../images/neweye.svg'
// import DynModel from './model'
// import {useDispatch,connect} from "react-redux";
// import { insertInterviewquestions } from "../../actions/interviewActions";
// import { Button } from "@material-ui/core";
// import CustomButton from '../../component/Butttons/button';
// import Labelbox from "../../helpers/labelbox/labelbox";
// import ValidationLibrary from "../../helpers/validationfunction";
// import {apiurl} from "../../utils/baseUrl";
// import Axios from 'axios';


// function InerviewScreen(props) {
//     const [ modelOpen, setModelOpen ] = useState(false)
//     const [getdata, setgetData]= useState([])
//      const [postData, setpostData] = useState({
//         // init_status: {
//         //     value: "",
//         //     validation: [{ "name": "required" }],
//         //     error: null,
//         //     errmsg: null,
//         // },
//         initial_score: {
//             value: "",
//             validation: [{ "name": "required" }],
//             error: null,
//             errmsg: null,
//         },
//         comment: {
//             value: "",
//             validation: [{ "name": "required" }],
//             error: null,
//             errmsg: null,
//         },
//         final_score : {
//             value: "",
//             validation: [{ "name": "required" }],
//             error: null,
//             errmsg: null,
//         },

//      })


//     const dispatch = useDispatch();

//     useEffect(()=>{

//         Axios({
//             method:"GET",
//             url: apiurl + '/get_questions',         

//         })
//         .then((response)=>{
//             setgetData(response.data.data)

//         })
//     },[])

//     function checkValidation(data, key) {

//         var errorcheck = ValidationLibrary.checkValidation(
//             data,
//             postData[key].validation
//         );
//         let dynObj = {
//             value: data,
//             error: !errorcheck.state,
//             errmsg: errorcheck.msg,
//             validation: postData[key].validation
//         }

//         setpostData(prevState => ({
//             ...prevState,
//             [key]: dynObj,
//         }));
//     };

//     function onSubmit() {
//         alert("d")
//         var mainvalue = {};
//         var targetkeys = Object.keys(postData);
//         for (var i in targetkeys) {
//             var errorcheck = ValidationLibrary.checkValidation(
//                 postData[targetkeys[i]].value,
//                 postData[targetkeys[i]].validation
//             );
//             postData[targetkeys[i]].error = !errorcheck.state;
//             postData[targetkeys[i]].errmsg = errorcheck.msg;
//             mainvalue[targetkeys[i]] = postData[targetkeys[i]].value;
//         }
//         var filtererr = targetkeys.filter(
//             (obj) => postData[obj].error == true
//         );
//         console.log(filtererr.length);
//         if (filtererr.length > 0) {
//             // setpostData({ error: true });
//         } else {
//             // setpostData({ error: false });

//             dispatch(insertInterviewquestions(postData))
//         }
//         console.log(postData,"posttt")

//         setpostData(prevState => ({
//             ...prevState
//         }));
//     };

//     return (
//         <div>
//             <Grid item xs={12} container direction="row" justify="space-around" alignItems="center" spacing={1} >
//                 <Grid item xs={5}>
//                     <div className="interviewTitle">Proposed Interview Date</div>
//                     <div className="interviewTitle">11-jan-2021</div>

//                 </Grid>
//                 <Grid item xs={3}>
//                     <div className="interviewTitle">Designation</div>
//                     <div className="interviewTitle">Antony</div>

//                 </Grid>
//                 <Grid item xs={4}>
//                     <div className="interviewTitle">No of  Candidates</div>
//                     <div className="interviewTitle">5</div>

//                 </Grid>

//             </Grid>
//             <Grid item xs={12} container direction="row" justify="left" alignItems="left" className="interviewQuesions">
//                 <Grid item xs={8} className="scrollbar">
//                     <div >List of guiding questions</div><br />
//                     {
//                     getdata.map((get,index)=>{
//                             // debugger
//                              return(
//                                  <>
//                                 <li>{get.questions}</li>
//                                 </>
//                             )
//                         })
//                     }
//                 </Grid>
//                 <Grid item xs={3} className="candidateBox">
//                     <div className="candidatesList"> List of Candidates </div>
//                     <div className="scrollerCandidates">
//                         <Grid item xs={12} container direction="column" justify="left" alignItems="left" >
//                             <Grid xs={12} container direction="row" justify="center" alignItems="left" display="flex" className="ordercandidates">
//                                 <Grid item xs={10} className="candidateName">Santino</Grid>
//                                 <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)} /></Grid>

//                             </Grid>
//                             <Grid xs={12} container direction="row" justify="left" alignItems="left" display="flex" className="ordercandidates">
//                                 <Grid item xs={10} className="candidateName">Antonio</Grid>
//                                 <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)}/></Grid>

//                             </Grid>
//                             <Grid xs={12} container direction="row" justify="left" alignItems="left" display="flex" className="ordercandidates">
//                                 <Grid item xs={10} className="candidateName">Gianna</Grid>
//                                 <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)} /></Grid>

//                             </Grid>
//                             <Grid xs={12} container direction="row" justify="left" alignItems="left" display="flex" className="ordercandidates">
//                                 <Grid item xs={10} className="candidateName">Julius</Grid>
//                                 <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)} /></Grid>

//                             </Grid>
//                             <Grid xs={12} container direction="row" justify="left" alignItems="left" display="flex" className="ordercandidates">
//                                 <Grid item xs={10} className="candidateName">Alisa</Grid>
//                                 <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)} /></Grid>

//                             </Grid>
//                             <DynModel modelTitle={"Candidate's Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} />
//                         </Grid>
//                     </div>

//                 </Grid>

//             </Grid>
//             <Grid item xs={9} container direction="row" justify="center" alignItems="left" className="interviewstatus" >
//                        <Labelbox type="select"
//                                 placeholder={"Type of Resource"}
//                                 // dropdown={resumeGetList.candidateList}
//                                 // changeData={(data) => checkValidation(data, "candidate")}
//                                 // value={postData.candidate.value}
//                                 // error={postData.candidate.error}
//                                 // errmsg={postData.candidate.errmsg}
//                             />

//             </Grid>
//             <Grid item xs={12} spacing={1} container direction="row" justify="center" className="interviewScore">
//                 <Grid item xs={2} className="ContainerInput" container direction="row" justify="center">
//                     <Labelbox type="text"
//                      placeholder="Initial Score"
//                      changeData={(data) => checkValidation(data, "initial_score")}
//                      value={postData.initial_score.value}
//                      error={postData.initial_score.error}
//                      errmsg={postData.initial_score.errmsg}
//                      />
//                 </Grid>
//                 <Grid item xs={5} className="ContainerInput textarea_height" container direction="row" justify="center">
//                     <Labelbox type="textarea"
//                      placeholder="Comment"
//                           changeData={(data) => checkValidation(data, "comment")}
//                           value={postData.comment.value}
//                           error={postData.comment.error}
//                           errmsg={postData.comment.errmsg}
//                           />

//                 </Grid>
//                 <Grid item xs={2} className="ContainerInput" container direction="row" justify="center">
//                     <Labelbox type="text"
//                      placeholder="Final Score"
//                           changeData={(data) => checkValidation(data, "final_score")}
//                           value={postData.final_score.value}
//                           error={postData.final_score.error}
//                           errmsg={postData.final_score.errmsg}
//                           />

//                 </Grid>
//                 <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
//                    <CustomButton  btnName={"Save"} btnCustomColor="customPrimary" onBtnClick={onSubmit}/>
//                 </Grid>

//             </Grid>
//         </div>
//     )
// }

// // const mapStateToProps = state => ({
// //     getInterviewquestions: state.getInterviewquestions,
// //     // insertInterviewquestions:state.insertInterviewquestions
// //   })


// export default InerviewScreen;







import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import './interview.scss'
import Eyes from '../../images/neweye.svg'
import DynModel from './model'
import { useDispatch, connect } from "react-redux";
import { insertInterviewquestions, GetCandiateDetails } from "../../actions/interviewActions";
import { Button } from "@material-ui/core";
import CustomButton from '../../component/Butttons/button';
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from "../../utils/baseUrl";
import moment from "moment";
import Axios from 'axios';
function InerviewScreen(props) {
    const dispatch = useDispatch();
    const [modelOpen, setModelOpen] = useState(false)
    const [getdata, setgetData] = useState([])
    const [cand_data, setcand_data] = useState([])
    const [data_id, setdata_id] = useState([])
    const [int_details, setint_details] = useState({})
    const [optionvalues, setoptionvalues] = useState({});
    const [postData, setpostData] = useState({
        init_status: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },
        initial_score: {
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
        final_score: {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },

    })



    useEffect(() => {
    
        let values = []
        Axios({
            method: "get",
            url: apiurl + "get_Interview_Status",
        }).then((response) => {
            console.log(response, "status")
            let interview_status = []
            response.data.data.map((data, index) =>
                interview_status.push({ value: data.status, id: data.status_id }))
            setoptionvalues({ interview_status })

        })

        Axios({
            method: "GET",
            url: apiurl + '/get_questions',

        })
            .then((response) => {
                setgetData(response.data.data)

            })

        // for candiate post api
        dispatch(GetCandiateDetails())
        var candiate = []
        Axios({
            method: "POST",
            url: apiurl + 'get_selected_candidates',
            data: {
                "int_detail_id":props.interviewer_id&&props.interviewer_id.int_details_id
            }
        })
            .then((response) => {
                const Intview_data=[]
                response.data.data.map((data)=>
                Intview_data.push({date:moment(data.prop_date_time).format("DD-MM-YYYY"),
                    designation:data.designation,candiates:data.total_number_candidates})
                )
            setcand_data(response.data.data[0].output)
            // setint_details(props.interviewer_id.map((data,index)=>{
            //     // console.log("datacheck",data),
            //     return(
            //     ({id:data.int_details_id})
            //     // propsdata.push(data)
            //     )}))
                setint_details({Intview_data})
              
             
            })
           
            let propsdata=[]
           
            console.log("detais",int_details)

    }, [dispatch,props])


    function ViewCandiate(id) {
        setModelOpen(true)
        setdata_id(cand_data.find((data) => {
            return (
                id == data.resume_id
            )
        }))
        setdata_id(prevState => ({
            ...prevState,
        }));
       
    }

    function checkValidation(data, key) {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            postData[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: postData[key].validation
        }

        setpostData(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    };

    function onSubmit() {

        var mainvalue = {};
        var targetkeys = Object.keys(postData);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                postData[targetkeys[i]].value,
                postData[targetkeys[i]].validation
            );
            postData[targetkeys[i]].error = !errorcheck.state;
            postData[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = postData[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter(
            (obj) => postData[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
            // setpostData({ error: true });
        } else {
            // setpostData({ error: false });

            dispatch(insertInterviewquestions(postData))

        }


        setpostData(prevState => ({
            ...prevState
        }));
    };
    console.log(props,"props")
    return (
        <div>
            <Grid item xs={12} container direction="row" justify="space-around" alignItems="center" spacing={1} >
                <Grid item xs={5}>
                    <div className="interviewTitle">Proposed Interview Date</div>
                    <div className="interview_cont">{int_details.Intview_data?int_details.Intview_data[0].date:"-"}</div>

                </Grid>
                <Grid item xs={3}>
                    <div className="interviewTitle">Designation</div>
                    <div className="interview_cont">{int_details.Intview_data?int_details.Intview_data[0].designation:"-"}</div>

                </Grid>
                <Grid item xs={4}>
                    <div className="interviewTitle">No of  Candidates</div>
                    <div className="interview_cont">{int_details.Intview_data?int_details.Intview_data[0].candiates:"-"}</div>

                </Grid>

            </Grid>
            <Grid item xs={12} container direction="row" justify="left" alignItems="left" className="interviewQuesions">
                <Grid item xs={8} className="scrollbar">
                    <div >List of guiding questions</div>
                    <ul>
                        {
                           getdata.map((get, index) => {
                                return (
                                    <>
                                        <li>{get.questions}</li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </Grid>
                <Grid item xs={3} className="candidateBox">
                    <div className="candidatesList"> List of Candidates </div>
                    <div className="scrollerCandidates">
                        <Grid item xs={12} container direction="column" justify="left" alignItems="left" >
                        {
                        // cand_data.length===0&& cand_data.length>=0&& 
                        cand_data.map((data, index) =>{
                        return(
                                <Grid xs={12} container direction="row" justify="center" alignItems="left" display="flex" className="ordercandidates">
                                    <Grid item xs={10} className="candidateName">{data.name}</Grid>
                                    <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={() => ViewCandiate(data.resume_id)} /></Grid>

                                </Grid>
                        )}
                            )}

                            <DynModel modelTitle={"Candidate's Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} data_id={data_id} />
                        </Grid>
                    </div>

                </Grid>

            </Grid>
                <div className="inter_status_div">
                <Labelbox type="select"
                    placeholder={"Interview Status"}
                    dropdown={optionvalues.interview_status}
                    changeData={(data) => checkValidation(data, "init_status")}
                    value={postData.init_status.value}
                    error={postData.init_status.error}
                    errmsg={postData.init_status.errmsg}
                />
                </div>
           
            <Grid  xs={12} spacing={1} container  className="interviewScore">
                    <div className="score_div"><Labelbox type="text"
                        placeholder="Initial Score"
                        changeData={(data) => checkValidation(data, "initial_score")}
                        value={postData.initial_score.value}
                        error={postData.initial_score.error}
                        errmsg={postData.initial_score.errmsg}
                    /></div>
                    <div  className="int_comments_div"><Labelbox type="textarea"
                        placeholder="Comment"
                        changeData={(data) => checkValidation(data, "comment")}
                        value={postData.comment.value}
                        error={postData.comment.error}
                        errmsg={postData.comment.errmsg}
                    /></div>

                    <div  className="score_div"><Labelbox type="text"
                        placeholder="Final Score"
                        changeData={(data) => checkValidation(data, "final_score")}
                        value={postData.final_score.value}
                        error={postData.final_score.error}
                        errmsg={postData.final_score.errmsg}
                    /></div>       
            <div style={{textAlign:"end"}}><CustomButton btnName={"Save"} btnCustomColor="customPrimary" custombtnCSS="int_btn_save" onBtnClick={onSubmit} /></div>

            </Grid>


        </div>
    )
}

const mapStateToProps = state => ({
    getInterviewquestions: state,
    GetCandiateDetails: state.getcandiate,
})


export default connect(mapStateToProps)(InerviewScreen);