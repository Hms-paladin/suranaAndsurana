import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import './search.scss'
import { Radio, Select } from 'antd';
import EnhancedTable from './table'
import DynModel from './model'
import { apiurl } from '../../utils/baseUrl'
import { useDispatch, connect } from "react-redux";
import { ResumeSearchStatus } from "../../actions/ResumeSearchAction"
import Axios from 'axios'

const { Option } = Select;
const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
    { id: 'gender', label: 'Gender' },
    { id: 'basic', label: 'Basic Quailification' },
    { id: 'language', label: 'Languages Known' },
    { id: 'certification', label: 'Certification' },
    { id: 'specialization', label: 'Specialization' },
    { id: 'acheivements', label: 'Acheivements' },
    { id: 'talents', label: 'Talents' },

];

const rows = [
    { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },
    { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },
    { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },
    { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },
    { name: 'Ranjith', age: 23, gender: "male", basic: "BE", language: 'tamil', certification: "-", specialization: "Nil", acheivements: 'none', talents: "coder" },
];
function Search(props) {
    const [value, setValue] = React.useState(1);
    const [modelOpen, setModelOpen] = useState(false)
    const dispatch = useDispatch();
    const [optionvalues, setoptionvalues] = useState([]);
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    }
    useEffect(() => {

        dispatch(ResumeSearchStatus())
        // get value from redux store
        Axios({
            method: "get",
            url: apiurl + "get_Interview_Status",
        }).then((response) => {
            setoptionvalues(response.data.data.map((data) => ({
                name: data.status
            })))
        })

    }, [dispatch])

    return (
        <div>
            <div className="radioBoxContainer">
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Resume</Radio>
                    <Radio value={2}>Project</Radio>
                    <Radio value={3}>HR</Radio>
                    <Radio value={4}>Label 4</Radio>
                    <Radio value={5}>Label 5</Radio>
                    <Radio value={6}>Label 6</Radio>
                </Radio.Group>
            </div>

            <div className="searchBoxContainer">
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <div>
                            <div>Skills</div>
                            <Labelbox type="select" /> 
                        </div>
                    </Grid>
                    <Grid item xs={3} >
                        <Labelbox type="select" />
                    </Grid>
                    <Grid item xs={3} >
                        <Labelbox type="select" />
                    </Grid>
                    <Grid item xs={3} >
                        <Labelbox type="select" />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Labelbox type="select" />
                    </Grid>
                    <Grid item xs={3} >
                        <Labelbox type="select" />
                    </Grid>
                    <Grid item xs={3} >
                        <Labelbox type="select" />
                    </Grid>
                    <Grid item xs={3} >
                        <Labelbox type="select" />
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}
const mapStateToProps = state => ({
    ResumeSearchStatus: state.ResumeSearchStatus
})

export default connect(mapStateToProps)(Search);


{/* <EnhancedTable headCells={headCells} rows={rows} tabletitle={""} />
            <div className="searchinterviewbtn"><Button onClick={() => setModelOpen(true)} >Interview Details</Button></div>
            <DynModel modelTitle={"Interview Details"} handleChangeModel={modelOpen} handleChangeCloseModel={(bln) => setModelOpen(bln)} /> */}
