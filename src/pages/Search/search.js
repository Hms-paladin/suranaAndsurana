import React, { useState, useEffect } from "react";
import { Radio, Select, Checkbox } from 'antd';
import { useDispatch, connect } from "react-redux";
import { useLocation } from "react-router-dom"
import './search.scss'
import Resumesearch from "./resumesearch";
import Projectsearch from "./projectsearch";
import TaskSearch from "./TaskSearch";
import TimeSheetModel from './timesheet';
import HrSearch from './hrsearch';



function Search(props) {

    const location = useLocation()
    //Usestate used loaction only for redirect from dashboard ...Note: directly injected bcz of too many reRenders
    const [value, setValue] = React.useState(location.state?.value);

    // if (location.state?.value) {
    //     setValue(4)

    // }
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    }
    return (
        <div>
            <div className="radioBoxContainer">
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Resume</Radio>
                    <Radio value={2}>Project / Case</Radio>
                    <Radio value={3}>HR</Radio>
                    <Radio value={4}>Task</Radio>
                    {/* <Radio value={5}>Label 4</Radio>
                    <Radio value={6}>Label 6</Radio> */}
                </Radio.Group>
            </div>
            {value === 1 && <Resumesearch />}
            {value === 2 && <Projectsearch />}
            {value === 3 && <HrSearch />}
            {value === 4 && <TaskSearch />}

            {value === 5 && <TimeSheetModel />}

        </div>
    )
}
export default (Search);
