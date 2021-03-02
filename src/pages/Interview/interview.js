import React, {useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import './interview.scss'
import Eyes from '../../images/neweye.svg'
import DynModel from './model'
import {useDispatch,connect} from "react-redux";
import { getInterviewquestions } from "../../actions/interviewActions";
import { insertInterviewquestions} from "../../actions/interviewActions";
import { Button } from "@material-ui/core";
import CustomButton from '../../component/Butttons/button';
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";


function InerviewScreen(props) {
    const [ modelOpen, setModelOpen ] = useState(false)
    const [getdata, setgetData]= useState([])
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
        final_score : {
            value: "",
            validation: [{ "name": "required" }],
            error: null,
            errmsg: null,
        },

     })
 

    const dispatch = useDispatch();

    useEffect(()=>{
            
            dispatch(getInterviewquestions())

            // get value from redux store
            // console.log(props.getInterviewquestions,"getInterviewquestions")
            console.log(props.getInterviewquestions,"getquestions")

    },[dispatch])

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

        // // only for multi select (start)

        // let multipleIdList = []

        // if (multipleId) {
        //     multipleId.map((item) => {
        //         for (let i = 0; i < data.length; i++) {
        //             if (data[i] === item.value) {
        //                 multipleIdList.push(item.id)
        //             }
        //         }
        //     })
        //     dynObj.valueById = multipleIdList.toString()
        // }
        // // (end)

        setpostData(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
        // var filtererr = targetkeys.filter(
        //     (obj) =>
        //         postData[obj].error == true ||
        //         postData[obj].error == null
        // );
        // if (filtererr.length > 0) {
        //     setpostData({ error: true, errordummy: false });
        // } else {
        //     setpostData({ error: false });
        // }
    };
    
    function onSubmit() {
        alert("d")
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



//     useEffect(()=>{
//         Axios({
//             method: 'POST',
//             url: apiurl +'get_candidate_details_by_id',
//             data:{
//                 "resume_id":"2"
//             },
//         })
//         .then((response) => {
//             setgetData(response.data.data)
//         })
//         .catch((error) => {
//             alert(JSON.stringify(error))
//         })
// },[])


    // const handleSubmit=(e)=>{
    //     // alert(comment)
        
    //     e.preventDefault();
    //     // dispatch(insertInterviewquestions({ }))
    //     dispatch(insertInterviewquestions({scoreInitial:scoreInitial,comment:comment,scoreFinal:scoreFinal}))
    //     console.log(props.insertInterviewquestions,"inserttddt")


    //     console.log(scoreInitial)
    // }


    return (
        <div>
            <Grid item xs={12} container direction="row" justify="space-around" alignItems="center" spacing={1} >
                <Grid item xs={5}>
                    <div className="interviewTitle">Proposed Interview Date</div>
                    <div className="interviewTitle">11-jan-2021</div>

                </Grid>
                <Grid item xs={3}>
                    <div className="interviewTitle">Designation</div>
                    <div className="interviewTitle">Antony</div>

                </Grid>
                <Grid item xs={4}>
                    <div className="interviewTitle">No of  Candidates</div>
                    <div className="interviewTitle">5</div>

                </Grid>

            </Grid>
            <Grid item xs={12} container direction="row" justify="left" alignItems="left" className="interviewQuesions">
                <Grid item xs={8} className="scrollbar">
                    <div >List of guiding questions</div><br />
                    {
                    getdata.map((get,index)=>{
                            // debugger
                             return(
                                 <>
                                <li>{get.questions}</li>
                                </>
                            )
                        })
                    }


                    {/* <div >List of guiding questions</div><br />

                    <div> How Did You Hear About This Position?</div>
                    <div>Why Do You Want to Work at This Company?</div>
                    <div>Why Do You Want This Job?</div>
                    <div>Why Should We Hire You?</div>
                    <div> What Are Your Greatest Strengths?</div>
                    <div> What Do You Consider to Be Your Weaknesses?</div>
                    <div>What Is Your Greatest Professional Achievement?</div>
                    <div>Tell Me About a Challenge or Conflict You’ve Faced at Work, and How You Dealt With It.</div>
                    <div>Tell Me About a Time You Demonstrated Leadership Skills.</div>
                    <div>What’s a Time You Disagreed With a Decision That Was Made at Work?</div>
                    <div>Tell Me About a Time You Made a Mistake.</div>
                    <div>Tell Me About a Time You Failed.</div>
                    <div>Why Are You Leaving Your Current Job?</div>
                    <div>Why Were You Fired?</div> */}

                </Grid>
                <Grid item xs={3} className="candidateBox">
                    <div className="candidatesList"> List of Candidates </div>
                    <div className="scrollerCandidates">
                        <Grid item xs={12} container direction="column" justify="left" alignItems="left" >
                            <Grid xs={12} container direction="row" justify="center" alignItems="left" display="flex" className="ordercandidates">
                                <Grid item xs={10} className="candidateName">Santino</Grid>
                                <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)} /></Grid>

                            </Grid>
                            <Grid xs={12} container direction="row" justify="left" alignItems="left" display="flex" className="ordercandidates">
                                <Grid item xs={10} className="candidateName">Antonio</Grid>
                                <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)}/></Grid>

                            </Grid>
                            <Grid xs={12} container direction="row" justify="left" alignItems="left" display="flex" className="ordercandidates">
                                <Grid item xs={10} className="candidateName">Gianna</Grid>
                                <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)} /></Grid>

                            </Grid>
                            <Grid xs={12} container direction="row" justify="left" alignItems="left" display="flex" className="ordercandidates">
                                <Grid item xs={10} className="candidateName">Julius</Grid>
                                <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)} /></Grid>

                            </Grid>
                            <Grid xs={12} container direction="row" justify="left" alignItems="left" display="flex" className="ordercandidates">
                                <Grid item xs={10} className="candidateName">Alisa</Grid>
                                <Grid item xs={2}><img src={Eyes} className="viewCandidatesList" onClick={()=>setModelOpen(true)} /></Grid>

                            </Grid>
                            <DynModel modelTitle={"Candidate's Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln)=>setModelOpen(bln)} />
                        </Grid>
                    </div>

                </Grid>

            </Grid>
            <Grid item xs={9} container direction="row" justify="center" alignItems="left" className="interviewstatus" >
                       <Labelbox type="select"
                                placeholder={"Type of Resource"}
                                // dropdown={resumeGetList.candidateList}
                                // changeData={(data) => checkValidation(data, "candidate")}
                                // value={postData.candidate.value}
                                // error={postData.candidate.error}
                                // errmsg={postData.candidate.errmsg}
                            />

            </Grid>
            <Grid item xs={12} spacing={1} container direction="row" justify="center" className="interviewScore">
                <Grid item xs={2} className="ContainerInput" container direction="row" justify="center">
                    <Labelbox type="text"
                     placeholder="Initial Score"
                     changeData={(data) => checkValidation(data, "initial_score")}
                     value={postData.initial_score.value}
                     error={postData.initial_score.error}
                     errmsg={postData.initial_score.errmsg}
                     />
                </Grid>
                <Grid item xs={5} className="ContainerInput textarea_height" container direction="row" justify="center">
                    <Labelbox type="textarea"
                     placeholder="Comment"
                          changeData={(data) => checkValidation(data, "comment")}
                          value={postData.comment.value}
                          error={postData.comment.error}
                          errmsg={postData.comment.errmsg}
                          />

                </Grid>
                <Grid item xs={2} className="ContainerInput" container direction="row" justify="center">
                    <Labelbox type="text"
                     placeholder="Final Score"
                          changeData={(data) => checkValidation(data, "final_score")}
                          value={postData.final_score.value}
                          error={postData.final_score.error}
                          errmsg={postData.final_score.errmsg}
                          />

                </Grid>
                <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
                   <CustomButton  btnName={"Save"} btnCustomColor="customPrimary" onBtnClick={onSubmit}/>
                </Grid>

            </Grid>
        </div>
    )
}

// const mapStateToProps = state => ({
//     getInterviewquestions: state.getInterviewquestions,
//     // insertInterviewquestions:state.insertInterviewquestions
//   })
  
  
export default InerviewScreen;