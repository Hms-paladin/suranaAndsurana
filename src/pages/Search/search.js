import React from "react";
import { Radio } from 'antd';

import { useLocation } from "react-router-dom"
import './search.scss'
import Resumesearch from "./resumesearch";
import Projectsearch from "./projectsearch";
import TaskSearch from "./TaskSearch";
import TimeSheetModel from './timesheet';
import HrSearch from './hrsearch';
import Client from './clientsearch';


function Search(props) {

    const location = useLocation()
    //Usestate used loaction only for redirect from dashboard ...Note: directly injected bcz of too many reRenders
    const [value, setValue] = React.useState(location.state?.value);

    const onChange = e => {
       
        setValue(e.target.value);
    }
    return (
        <div>
            <div className="radioBoxContainer">
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Resume</Radio>
                    <Radio value={2}>Project / Case</Radio>
                    <Radio value={3}>Client</Radio>
                    <Radio value={4}>HR</Radio>
                    <Radio value={5}>Task</Radio>
                    {/* <Radio value={5}>Label 4</Radio>
                    <Radio value={6}>Label 6</Radio> */}
                </Radio.Group>
            </div>
            {value === 1 && <Resumesearch />}
            {value === 2 && <Projectsearch />}
            {value === 3 && <Client />}
            {value === 4 && <HrSearch />}
            {value === 5 && <TaskSearch />}
            {value === 6 && <TimeSheetModel />}

        </div>
    )
}
export default (Search);
