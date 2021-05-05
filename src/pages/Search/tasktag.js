import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
function TaskTag() {
    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <>
            <div className="radio_btns">
            <FormControl component="fieldset">
                <RadioGroup aria-label="task" name="task_tag" value={value} onChange={handleChange}>
                    <FormControlLabel value="radio_km" control={<Radio />} label="Knowledge Management" style={{borderBottom:"1px solid #f5efef",width:"275px"}}/>
                    <FormControlLabel value="radio_acheivement" control={<Radio />} label="Acheivement" style={{width:"275px"}}/>
                    {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                </RadioGroup>
            </FormControl>
            </div>
        </>
    )
}
export default TaskTag;