import react,{useState} from 'react';
import './search.scss';
import Grid from '@material-ui/core/Grid';
import Labelbox from "../../helpers/labelbox/labelbox";
import CustomButton from "../../component/Butttons/button";
import EnhancedTable from "../../component/DynTable/table";
import { Checkbox } from 'antd';
import DynModel from '../../component/Model/model';
import HrInterviewModel from './hrinterviewmodel.js';


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

const rows = [
    { name: 'Ranjith', age: 23, gender: "male", basicqualification: "BE", interviewedby: 'tamil', intervieweddate: "-", score: "Nil", round: 'none', result: "coder", box: <Checkbox /> },
    { name: 'Ranjith', age: 23, gender: "male", basicqualification: "BE", interviewedby: 'tamil', intervieweddate: "-", score: "Nil", round: 'none', result: "coder", box: <Checkbox /> },
    { name: 'Ranjith', age: 23, gender: "male", basicqualification: "BE", interviewedby: 'tamil', intervieweddate: "-", score: "Nil", round: 'none', result: "coder", box: <Checkbox /> },
    { name: 'Ranjith', age: 23, gender: "male", basicqualification: "BE", interviewedby: 'tamil', intervieweddate: "-", score: "Nil", round: 'none', result: "coder", box: <Checkbox /> },
    { name: 'Ranjith', age: 23, gender: "male", basicqualification: "BE", interviewedby: 'tamil', intervieweddate: "-", score: "Nil", round: 'none', result: "coder", box: <Checkbox /> },
    { name: 'Ranjith', age: 23, gender: "male", basicqualification: "BE", interviewedby: 'tamil', intervieweddate: "-", score: "Nil", round: 'none', result: "coder", box: <Checkbox /> },
    { name: 'Ranjith', age: 23, gender: "male", basicqualification: "BE", interviewedby: 'tamil', intervieweddate: "-", score: "Nil", round: 'none', result: "coder", box: <Checkbox /> },];

   
function Hrsearch() {
  const [hrmodelOpen, setHRModelOpen] = useState(false)


   function scheduleInterview(){
    setHRModelOpen(true)
    }

 

    return (
        <div className="hrContainer">
            <div className="hrHeader">
                <Grid item xs={12} container direction="row" spacing={1}>
                    <Grid item xs={3}>  <Labelbox type="select" placeholder="Designation" /></Grid>
                    <Grid item xs={3}><Labelbox type="select" placeholder="Rounds" /></Grid>
                    <Grid item xs={3}><Labelbox type="select" placeholder="Status" /></Grid>
                    <Grid item xs={3}><CustomButton btnName={"Go"} btnCustomColor="customPrimary" /></Grid>
                </Grid>
            </div>
            <EnhancedTable headCells={headCells} rows={rows} tabletitle={"Designation"} />
            <div className="hrsearchbtn">
                <CustomButton btnName={"Schedule Interview"} btnCustomColor="customPrimary" custombtnCSS={"goSearchbtn"} onBtnClick={()=>scheduleInterview()} />
                <DynModel modelTitle={"Interview Details"} handleChangeModel={hrmodelOpen} handleChangeCloseModel={(bln)=>setHRModelOpen(bln)} content={<HrInterviewModel />} />
            </div>
          

        </div>
    )
}

export default Hrsearch;


// onBtnClick={} 