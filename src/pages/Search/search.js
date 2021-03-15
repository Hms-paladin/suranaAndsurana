import React, { useState, useEffect } from "react";
import { Radio, Select, Checkbox } from 'antd';
import { useDispatch, connect } from "react-redux";

import './search.scss'
import Resumesearch from "./resumesearch";
import Projectsearch from "./projectsearch";
<<<<<<< HEAD
import TaskSearch from "./TaskSearch";
=======
import TimeSheetModel from './timesheet'
>>>>>>> f89a563e59ec89b57c844dd9a23d15d770d2e95f



function Search(props) {
  
    const [value, setValue] = React.useState();

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    }
    return (
        <div>
<div className="radioBoxContainer">
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Resume</Radio>
                    <Radio value={2}>Project</Radio>
                    <Radio value={3}>Task</Radio>
                    <Radio value={4}>Label 4</Radio>
                    <Radio value={5}>Label 5</Radio>
                    <Radio value={6}>Label 6</Radio>
                </Radio.Group>
            </div>
            {value ===1 && <Resumesearch/>}
            {value ===2 && <Projectsearch/>}
<<<<<<< HEAD
            {value ===3 && <TaskSearch/>}
=======
            {value ===4 && <TimeSheetModel/>}

>>>>>>> f89a563e59ec89b57c844dd9a23d15d770d2e95f

            </div>
    )
}
            export default (Search);
