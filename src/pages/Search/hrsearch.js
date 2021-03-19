import react,{useEffect, useState} from 'react';
import './search.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import EnhancedTable from "../../component/DynTable/table";
import {  searchRowdata } from "../../actions/HrSearchAction";
import { Checkbox } from 'antd';
import DynModel from '../../component/Model/model';
import HrInterviewModel from './hrinterviewmodel.js';
import { useDispatch, connect } from "react-redux";
import Axios from 'axios';
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from "../../utils/baseUrl";

const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
    { id: 'gender', label: 'Gender' },
    { id: 'basicqualification', label: 'Basic Qualification' },
    { id: 'interviewedby', label: 'Interviewed by' },
    { id: 'intervieweddate', label: 'Interviewed Date' },
    { id: 'score', label: 'Score' },
    { id: 'round', label: 'Round' },
    { id: 'result', label: 'Result' },

];   
function Hrsearch(props) {
    const dispatch = useDispatch();
    const [hrmodelOpen, setHRModelOpen] = useState(false)
    const[roundDropdownValues,setroundDropdownValues] =useState({})
    const [designationdata, setdesignationdata] = useState([]);
    const [multipleTable, setMultipleTable] = useState([]);
    const [interviewStatus, setinterviewStatus] = useState([]);
    const [checkList, setCheckedList] = useState({})
    const [selectedCandidateId, setSelectedCandidateId] = useState([]);
    const [deignationID, setDeignationID] = useState([]);
    const [hrSearchList, setGetList] = useState({})
    const [test, setTest] = useState(true)
    const [HrSearch_Form, setHrSearchFrom] = useState({
      designation_id: {
          value: "",
          validation: [],
          error: null,
          errmsg: null,
      },
      round: {
          value: "",
          validation: [],
          error: null,
          errmsg: null,
      },
      status_id: {
          value: "",
          validation: [],
          error: null,
          errmsg: null,
      },
  })
  
    useEffect(()=>{

      dispatch(searchRowdata({
        "designation_id":"0",
        "round":"0",
        "status_id":"0"
    },[]))
    },[])

useEffect(() => {

  const rowData =[
    {
     designation_id:1,
     designation:"test",
    result:[
    {
    resume_id:1,
    name:"Brindha",
    age:"23",
    gender:"F",
    basic_quali:"test",
    interviewed_by:"test",
    interviewed_date:"test",
    score:"test",
    interviewed_date:"test",
    score:"20",
    round:"1",
    result:"selected",designation_id:1,
    
    },
    
    {
      resume_id:2,
      name:"Brins",
      age:"23",
      gender:"F",
      basic_quali:"test",
      interviewed_by:"test",
      interviewed_date:"test",
      score:"test",
      interviewed_date:"test",
      score:"20",
      round:"1",
      result:"selected",designation_id:1,
      
      },    {
        resume_id:3,
        name:"Brins",
        age:"23",
        gender:"F",
        basic_quali:"test",
        interviewed_by:"test",
        interviewed_date:"test",
        score:"test",
        interviewed_date:"test",
        score:"20",
        round:"1",
        result:"selected",designation_id:1,
        
        },    {
          resume_id:4,
          name:"Brins",
          age:"23",
          gender:"F",
          basic_quali:"test",
          interviewed_by:"test",
          interviewed_date:"test",
          score:"test",
          interviewed_date:"test",
          score:"20",
          round:"1",
          result:"selected",designation_id:1,
          
          },    {
            resume_id:5,
            name:"Brins",
            age:"23",
            gender:"F",
            basic_quali:"test",
            interviewed_by:"test",
            interviewed_date:"test",
            score:"test",
            interviewed_date:"test",
            score:"20",
            round:"1",
            result:"selected",designation_id:1,
            
            },    {
              resume_id:6,
              name:"Brins",
              age:"23",
              gender:"F",
              basic_quali:"test",
              interviewed_by:"test",
              interviewed_date:"test",
              score:"test",
              interviewed_date:"test",
              score:"20",
              round:"1",
              result:"selected",designation_id:1,
              
              },
    
    ]
    },
    {
      designation_id:2,
      designation:"test2",
     result:[
     {
     resume_id:11,
     name:"Asraf",
     age:"23",
     gender:"M",
     basic_quali:"test",
     interviewed_by:"test",
     interviewed_date:"test",
     score:"test",
     interviewed_date:"test",
     score:"20",
     round:"1",
     result:"selected",designation_id:1,
     
     },
     
     {
       resume_id:21,
       name:"Mushraf",
       age:"23",
       gender:"M",
       basic_quali:"test",
       interviewed_by:"test",
       interviewed_date:"test",
       score:"test",
       interviewed_date:"test",
       score:"20",
       round:"1",
       result:"selected",designation_id:1,
       
       },
     
     ]
     },

    ];

     let multipleTable = []

     props.GetRowData.map((data)=>{
        
    // rowData.map((data)=>{
 let rowDataList = []

        data.result.map((data,index) => {
            rowDataList.push({ name: data.name, age: data.age, gender: data.gender === "M" ? "Male" : "Female", 
            basic: data.basic_qualifciation, interviewedby: data.interviewed_by, interviewed_date: data.interviewed_date, 
            score: data.score, round: data.round, result: data.result,
            box:<Checkbox onClick={(event)=>handleCheck(event,data.resume_id,data.designation_id)} name={"checked"+data.resume_id}
             checked={checkList["checked"+data.resume_id]} value={checkList["checked"+data.resume_id]} />
            })
        }) 
       multipleTable.push(
        <EnhancedTable
        headCells={headCells}
         rows={rowDataList}
         tabletitle={data.designation}
       />
       )
     })

     setMultipleTable(multipleTable)

}, [test])
const handleCheck = (event,resume_id,designation_id) => {
  console.log("resume_idclicked",resume_id)
  if(selectedCandidateId.includes(resume_id)){
      selectedCandidateId.map((data,index)=>{
          if ( data === resume_id) { 
              selectedCandidateId.splice(index, 1);
              console.log("selectedCandidateIdif",selectedCandidateId) 
          }
      })

  }else{
    selectedCandidateId.push(resume_id)
    setDeignationID(designation_id)
    console.log("selectedCandidateIdelse",selectedCandidateId) 
  }
     
    setCheckedList(
      prevState => ({
          ...prevState,
          [event.target.name]: !checkList[event.target.name],
      })
  )
  console.log(checkList,"setCheckedList")
  setTest(!test)
}
    useEffect(()=> {
      
        Axios({
            method: 'GET',
            url: apiurl +'get_round',
        }).then((response) => {
                    let hr_round = []
                response.data.data.map((data, index) =>
                hr_round.push({ 
                    id: data.status_id,
                    value: data.status
                  
                   })
                )
                setroundDropdownValues({hr_round})
                console.log(roundDropdownValues.hr_round,"hr_round")
        })
        Axios({
            method: "GET",
            url: apiurl + "get_s_tbl_m_designation",
        }).then((response) => {
            let Designation = []
            response.data.data.map((data, index) =>
                Designation.push({ id: data.designation_id, value: data.designation }))
    
            setdesignationdata({ Designation })

            Axios({
                method: "get",
                url: apiurl + "get_Interview_Status",
              }).then((response) => {
                let interview_status = [];
                response.data.data.map((data, index) =>
                  interview_status.push({ value: data.status, id: data.status_id })
                );
                setinterviewStatus({ interview_status });
              });

    }, [dispatch])
    // setGetList({hr_round},{ Designation },{ interview_status })

},[])
useEffect(() => {

  const rowData =[
    {
     designation_id:1,
     designation:"test",
    result:[
    {
    resume_id:1,
    name:"Brindha",
    age:"23",
    gender:"F",
    basic_quali:"test",
    interviewed_by:"test",
    interviewed_date:"test",
    score:"test",
    interviewed_date:"test",
    score:"20",
    round:"1",
    result:"selected",designation_id:1,
    
    },
    
    {
      resume_id:2,
      name:"Brins",
      age:"23",
      gender:"F",
      basic_quali:"test",
      interviewed_by:"test",
      interviewed_date:"test",
      score:"test",
      interviewed_date:"test",
      score:"20",
      round:"1",
      result:"selected",designation_id:1,
      
      },    {
        resume_id:3,
        name:"Brins",
        age:"23",
        gender:"F",
        basic_quali:"test",
        interviewed_by:"test",
        interviewed_date:"test",
        score:"test",
        interviewed_date:"test",
        score:"20",
        round:"1",
        result:"selected",designation_id:1,
        
        },    {
          resume_id:4,
          name:"Brins",
          age:"23",
          gender:"F",
          basic_quali:"test",
          interviewed_by:"test",
          interviewed_date:"test",
          score:"test",
          interviewed_date:"test",
          score:"20",
          round:"1",
          result:"selected",designation_id:1,
          
          },    {
            resume_id:5,
            name:"Brins",
            age:"23",
            gender:"F",
            basic_quali:"test",
            interviewed_by:"test",
            interviewed_date:"test",
            score:"test",
            interviewed_date:"test",
            score:"20",
            round:"1",
            result:"selected",designation_id:1,
            
            },    {
              resume_id:6,
              name:"Brins",
              age:"23",
              gender:"F",
              basic_quali:"test",
              interviewed_by:"test",
              interviewed_date:"test",
              score:"test",
              interviewed_date:"test",
              score:"20",
              round:"1",
              result:"selected",designation_id:1,
              
              },
    
    ]
    },
    {
      designation_id:2,
      designation:"test2",
     result:[
     {
     resume_id:11,
     name:"Asraf",
     age:"23",
     gender:"M",
     basic_quali:"test",
     interviewed_by:"test",
     interviewed_date:"test",
     score:"test",
     interviewed_date:"test",
     score:"20",
     round:"1",
     result:"selected",designation_id:1,
     
     },
     
     {
       resume_id:21,
       name:"Mushraf",
       age:"23",
       gender:"M",
       basic_quali:"test",
       interviewed_by:"test",
       interviewed_date:"test",
       score:"test",
       interviewed_date:"test",
       score:"20",
       round:"1",
       result:"selected",designation_id:1,
       
       },
     
     ]
     },

    ];

     let multipleTable = []

     props.GetRowData.map((data)=>{
        
    // rowData.map((data)=>{
 let rowDataList = []

        data.result.map((data,index) => {
            rowDataList.push({ name: data.name, age: data.age, gender: data.gender === "M" ? "Male" : "Female", 
            basic: data.basic_qualifciation, interviewedby: data.interviewed_by, interviewed_date: data.interviewed_date, 
            score: data.score, round: data.round, result: data.status,
            box:<Checkbox onClick={(event)=>handleCheck(event,data.resume_id,data.designation_id)} name={"checked"+data.resume_id}
             checked={checkList["checked"+data.resume_id]} value={checkList["checked"+data.resume_id]} />
            })
        }) 
       multipleTable.push(
        <EnhancedTable
        headCells={headCells}
         rows={rowDataList}
         tabletitle={data.designation}
       />
       )
     })

     setMultipleTable(multipleTable)

}, [  props.GetRowData,test])
function checkValidation(data, key) {

  var errorcheck = ValidationLibrary.checkValidation(
      data,
      HrSearch_Form[key].validation
  );
  let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: HrSearch_Form[key].validation
  }


  setHrSearchFrom(prevState => ({
      ...prevState,
      [key]: dynObj,
  }));

};


   function scheduleInterview(){
    setHRModelOpen(true)
    }

    function onSearch() {
      dispatch(searchRowdata({
          "designation_id":HrSearch_Form.designation_id.value ? HrSearch_Form.designation_id.value : "0",
          "round":HrSearch_Form.round.value ? HrSearch_Form.round.value : "0",
          "status_id":HrSearch_Form.status_id.value ? HrSearch_Form.status_id.value : "0",
      
      }))
  }

    return (
      <div className="hrContainer">
        <div className="hrHeader">
          <Grid item xs={12} container direction="row" spacing={1}>
            <Grid item xs={3}>
              {" "}
              <Labelbox
                type="select"
                placeholder="Designation"
                dropdown={designationdata.Designation}
                changeData={(data) => checkValidation(data, "designation_id")}
                value={HrSearch_Form.designation_id.value}
              />
            </Grid>
            <Grid item xs={3}>
              <Labelbox
                type="select"
                placeholder="Rounds"
                dropdown={roundDropdownValues.hr_round}
                changeData={(data) => checkValidation(data, "round")}
                value={HrSearch_Form.round.value}
              />
            </Grid>
            <Grid item xs={3}>
              <Labelbox
                type="select"
                placeholder="Status"
                dropdown={interviewStatus.interview_status}
                changeData={(data) => checkValidation(data, "status_id")}
                value={HrSearch_Form.status_id.value}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomButton btnName={"Go"} btnCustomColor="customPrimary" onBtnClick={onSearch} />
            </Grid>
          </Grid>
        </div>
        {multipleTable}
        <div className="hrsearchbtn">
          <CustomButton
            btnName={"Schedule Interview"}
            btnCustomColor="customPrimary"
            custombtnCSS={"goSearchbtn"}
            onBtnClick={() => scheduleInterview()}
          />
          <DynModel
            modelTitle={"Interview Details"}
            handleChangeModel={hrmodelOpen}
            handleChangeCloseModel={(bln) => setHRModelOpen(bln)}
            content={
              <HrInterviewModel
                handleChangeCloseModel={(bln) => setHRModelOpen(bln)}
                selectedId={selectedCandidateId}
                selectedDesignationID={deignationID}
              />
            }
          />
        </div>
      </div>
    );
}


const mapStateToProps = state => (  
  {
  // console.log("state",state)

  GetRowData: state.HrSearchRowData
}
)

 
export default connect(mapStateToProps)(Hrsearch);