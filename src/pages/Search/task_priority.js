import react, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { getPriorityList } from "../../actions/projectTaskAction";
import { connect, useDispatch } from "react-redux";
import { apiurl } from "../../utils/baseUrl.js";
import axios from "axios";
import { notification } from "antd";
function TaskPriority(props) {
    const [priorityList, setpriorityList] = useState({})
    const [value, setValue] = useState('')
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    useEffect(() => {
        dispatch(getPriorityList());
    
      }, []);
      useEffect(() => {
       
    
        let priorityTypeData = []
        props.prioritysList.map((data) =>
          priorityTypeData.push({
            value: data.status,
            id: data.status_id
          })
        )
        setpriorityList({ priorityTypeData })
        setValue(props.rowData.priority_id)
    
    
      }, [props.prioritysList,props.rowData
      ]);
  function handelCheck(e,val ){
    setValue(val.status_id);
    var val ={
      "task_id":props.rowData.task_id,
      "priority_id":val.status_id
  }
try {
  axios({
      method: 'PUT',
      url: apiurl + 'update_task_priority',
      data: val
  })
      .then(function (response) {
          if (response.data.status === 1) {
              notification.success({
                  message: ' Updated Successfully',
              });
              return Promise.resolve();
          }
      });

} catch (err) {
  notification.error({
      message: 'Record Not Added',
  });
}
}

    return (
        <div>
            <div className="radio_btns">
            <FormControl component="fieldset">
            {props.prioritysList.length > 0 && props.prioritysList.map((data) => {
                return (
                //<RadioGroup aria-label="task" name="task_pri" value={value} onChange={handleChange}>
                     <RadioGroup aria-label="task" name="task_pri" value={value} >
                    <FormControlLabel value={data.status_id} 
                    onClick={(event) => handelCheck(event,data)}
                    control={<Radio />} label={data.status} style={{borderBottom:"1px solid #f5efef",width:"275px"}}/>
                    
                </RadioGroup>
                )
            })} 
            </FormControl>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>
// console.log(state.getOptions.getProcessType, "getProcessType")
({
  prioritysList: state.projectTasksReducer.prioritysList || [],
});

export default connect(mapStateToProps)(TaskPriority);
