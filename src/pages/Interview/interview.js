import React,{ useState , useEffect} from "react";
import { Grid } from "@material-ui/core";
import './interview.scss'
import { BackTop, Select,Input } from 'antd';
import Eyes from '../../images/neweye.svg'
import SelectionIcon from '../../images/select.svg'
import DynModel from './model'
import {apiurl} from "../../App";
import Axios from "axios";




// const style = {
//     height: 40,
//     width: 40,
//     lineHeight: '40px',
//     borderRadius: 4,
//     backgroundColor: '#1088e9',
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 14,
// };

function InerviewScreen() {
    const [ modelOpen, setModelOpen ] = useState(false)

    const [getdata, setgetData]= useState([])

    useEffect(()=>{
            Axios({
                method: 'GET',
                url: apiurl +'/get_questions',
               
            })
            .then((response) => {
                setgetData(response.data.data)
            
            })
            .catch((error) => {
                // alert(JSON.stringify(error))
            })
    },[])
const [postdata, setpostData]=useState([])
  const  sumbitData=()=>{
      alert("saxdasx")
      debugger
        Axios({
            method:'POST',
            url: apiurl + '/insert_interview_scores',
        })
        .then((response)=>{
            console.log(response,"post")
        })
    }

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
                    {getdata.map((get,index)=>{
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
                    <div className="candidatesList">
                        List of Candidates

                    </div>
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
                <Select suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />} showSearch placeholder="Interview Status"
                    optionFilterProp="children" filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    className="SelectionInput" style={{ width: "50%" }} >

                </Select>

            </Grid>
            <Grid item xs={12} spacing={1} container direction="row" justify="center" alignItems="center" className="interviewScore">
                <Grid item xs={2} className="ContainerInput" container direction="row" justify="center">
                    <Input placeholder="Initial Score"  style={{height:"70px",width:"60%"}}/>
                </Grid>
                <Grid item xs={5} className="ContainerInput" container direction="row" justify="center">
                    <Input placeholder="comment"  style={{height:"80px",width:"100%"}}/>
                </Grid>
                <Grid item xs={2} className="ContainerInput" container direction="row" justify="center">
                    <Input placeholder="Initial Score"  style={{height:"70px",width:"60%"}}/>
                </Grid>
                <Grid item xs={3} className="ContainerInput" container direction="row" justify="center">
                    <div className="interviewSubmit" onClick={sumbitData}>Submit</div>
                </Grid>


            </Grid>
        </div>
    )
}

export default InerviewScreen;