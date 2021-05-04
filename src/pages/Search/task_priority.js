import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
function TaskPriority() {
    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div>
            <div className="radio_btns">
            <FormControl component="fieldset">
                <RadioGroup aria-label="task" name="task_pri" value={value} onChange={handleChange}>
                    <FormControlLabel value="high" control={<Radio />} label="High" style={{borderBottom:"1px solid #f5efef",width:"275px"}}/>
                    <FormControlLabel value="medium" control={<Radio />} label="Medium" style={{borderBottom:"1px solid #f5efef",width:"275px"}}/>
                    <FormControlLabel value="low" control={<Radio />} label="Low" style={{width:"275px"}}/>
                    {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                </RadioGroup>
            </FormControl>
            </div>
        </div>
    )
}
export default TaskPriority;